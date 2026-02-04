#!/usr/bin/env python3
"""
Test script for MCP memory functions.
Tests the renamed functions directly without stdio transport.
"""

import asyncio
import os
import sys
import json
from datetime import datetime
from typing import Optional, List

os.environ["TRANSFORMERS_VERBOSITY"] = "error"
os.environ["TOKENIZERS_PARALLELISM"] = "false"
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"
os.environ["QDRANT_URL"] = "http://localhost:7999"
os.environ["PROJECT_NAME"] = "elbruso"

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import torch
from qdrant_client import QdrantClient
from qdrant_client.models import PointStruct, VectorParams, Distance
from transformers import AutoTokenizer, AutoModel

from logging_config import setup_logging

logger = setup_logging()

qdrant_url = os.getenv("QDRANT_URL", "http://localhost:7999")
project_name = os.getenv("PROJECT_NAME", "")
prefix = f"{project_name}_" if project_name else ""

collection_core = prefix + os.getenv("AGENT_CORE_COLLECTION", "agent_core")
collection_tasks = prefix + os.getenv("TASKS_COLLECTION", "task_summaries")
collection_knowledge = prefix + os.getenv("KNOWLEDGE_COLLECTION", "knowledge_base")
embedding_model_name = os.getenv("EMBEDDING_MODEL", "BAAI/bge-small-en-v1.5")

print(f"Loading model: {embedding_model_name}")
tokenizer = AutoTokenizer.from_pretrained(embedding_model_name)
model = AutoModel.from_pretrained(embedding_model_name)
model.eval()
EMBEDDING_DIM = model.config.hidden_size
print(f"Model loaded: {embedding_model_name} (dim: {EMBEDDING_DIM})")

client = QdrantClient(url=qdrant_url)


def mean_pooling(model_output, attention_mask):
    token_embeddings = model_output[0]
    input_mask_expanded = (
        attention_mask.unsqueeze(-1).expand(token_embeddings.size()).float()
    )
    return torch.sum(token_embeddings * input_mask_expanded, 1) / torch.clamp(
        input_mask_expanded.sum(1), min=1e-9
    )


def get_embedding(text: str) -> List[float]:
    encoded = tokenizer(
        text, return_tensors="pt", padding=True, truncation=True, max_length=512
    )
    with torch.no_grad():
        output = model(**encoded)
    embedding = mean_pooling(output, encoded["attention_mask"])
    return embedding[0].tolist()


def ensure_collection(name: str):
    collections = client.get_collections().collections
    names = [c.name for c in collections]
    if name not in names:
        client.create_collection(
            collection_name=name,
            vectors_config=VectorParams(size=EMBEDDING_DIM, distance=Distance.COSINE),
        )


async def memory_health_check():
    try:
        client.get_collections()
        return json.dumps(
            {"status": "healthy", "qdrant": "connected", "model": embedding_model_name},
            indent=2,
        )
    except Exception as e:
        return json.dumps({"status": "unhealthy", "error": str(e)}, indent=2)


async def memory_save_context(
    content: str, context_type: str, metadata: Optional[dict] = None
) -> str:
    valid_types = {
        "core": collection_core,
        "task": collection_tasks,
        "knowledge": collection_knowledge,
    }
    collection = valid_types.get(context_type, collection_core)

    ensure_collection(collection)

    vector = get_embedding(content)
    import uuid

    point_id = str(uuid.uuid4())

    point = PointStruct(
        id=point_id,
        vector=vector,
        payload={
            "content": content,
            "type": context_type,
            "created_at": datetime.now().isoformat(),
            "metadata": metadata or {},
        },
    )

    client.upsert(collection_name=collection, points=[point])

    return json.dumps(
        {
            "status": "success",
            "id": point_id,
            "collection": collection,
            "type": context_type,
        },
        indent=2,
    )


async def memory_get_core_memory() -> str:
    ensure_collection(collection_core)

    results = client.scroll(collection_name=collection_core, limit=100)[0]

    if not results:
        return json.dumps({"status": "empty", "message": "No core memory set"})

    output = {
        "status": "success",
        "core_memory": [
            {
                "id": r.id,
                "content": r.payload.get("content", ""),
                "metadata": r.payload.get("metadata", {}),
            }
            for r in results
        ],
    }
    return json.dumps(output, indent=2)


async def memory_set_core_memory(content: str, memory_type: str) -> str:
    result = await memory_save_context(
        content=content, context_type="core", metadata={"memory_type": memory_type}
    )
    return result


async def memory_list_collections() -> str:
    collections = client.get_collections().collections

    output = {
        "status": "success",
        "collections": [{"name": c.name} for c in collections],
    }
    return json.dumps(output, indent=2)


async def memory_search_context(
    query: str, collection: str = "core", limit: int = 5
) -> str:
    valid_collections = {
        "core": collection_core,
        "tasks": collection_tasks,
        "knowledge": collection_knowledge,
    }
    actual_collection = valid_collections.get(collection, collection_core)

    ensure_collection(actual_collection)

    query_vector = get_embedding(query)

    results = client.search(
        collection_name=actual_collection,
        query_vector=query_vector,
        limit=limit,
        score_threshold=0.5,
    )

    if not results:
        return json.dumps(
            {"status": "no_results", "message": "No relevant context found"}
        )

    output = {
        "status": "success",
        "query": query,
        "collection": actual_collection,
        "results": [
            {
                "id": r.id,
                "score": r.score,
                "content": r.payload.get("content", ""),
                "metadata": r.payload.get("metadata", {}),
            }
            for r in results
        ],
    }
    return json.dumps(output, indent=2)


async def memory_delete_context(ids: list[str], collection: str = "core") -> str:
    from qdrant_client.models import PointIdsList

    valid_collections = {
        "core": collection_core,
        "tasks": collection_tasks,
        "knowledge": collection_knowledge,
    }
    actual_collection = valid_collections.get(collection, collection_core)

    client.delete(
        collection_name=actual_collection,
        points_selector=PointIdsList(points=ids),
    )

    return json.dumps(
        {"status": "success", "deleted_ids": ids, "collection": actual_collection},
        indent=2,
    )


async def main():
    import asyncio

    print("\n" + "=" * 60)
    print("MCP Memory Functions Test")
    print("=" * 60)

    print("\n1. Testing memory_health_check()...")
    result = await memory_health_check()
    print(result)

    print("\n2. Testing memory_list_collections()...")
    result = await memory_list_collections()
    print(result)

    print("\n3. Testing memory_set_core_memory()...")
    result = await memory_set_core_memory(
        content="User's name: Иван (Ivan)", memory_type="user_info"
    )
    print(result)

    print("\n4. Testing memory_get_core_memory()...")
    result = await memory_get_core_memory()
    print(result)

    print("\n5. Testing memory_search_context()...")
    result = await memory_search_context(query="user name", collection="core")
    print(result)

    print("\n" + "=" * 60)
    print("All tests completed!")
    print("=" * 60 + "\n")


if __name__ == "__main__":
    asyncio.run(main())
