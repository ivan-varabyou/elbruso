#!/usr/bin/env python3
"""
Elbruso Context MCP Server
Provides tools for agent memory management via MCP protocol.
Uses local embeddings via HuggingFace transformers.
"""

import json
import logging
import os
import sys
from datetime import datetime
from typing import Optional, List

# Silence transformers and torch logging
os.environ["TRANSFORMERS_VERBOSITY"] = "error"
os.environ["TOKENIZERS_PARALLELISM"] = "false"
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import torch
from mcp.server.fastmcp import FastMCP
from qdrant_client import QdrantClient
from qdrant_client.models import PointStruct, VectorParams, Distance, PointIdsList
from transformers import AutoTokenizer, AutoModel
from transformers import logging as transformers_logging

from logging_config import setup_logging
from graph_generator import generate_memory_graph

# Настройка логирования
logger = setup_logging()
transformers_logging.set_verbosity_error()

# Убрать шумные логи torch и transformers
logging.getLogger("transformers").setLevel(logging.ERROR)
logging.getLogger("torch").setLevel(logging.ERROR)
logging.getLogger("accelerate").setLevel(logging.ERROR)

mcp = FastMCP("elbruso-memory")

qdrant_url = os.getenv("QDRANT_URL", "http://localhost:7999")
project_name = os.getenv("PROJECT_NAME", "")
prefix = f"{project_name}_" if project_name else ""

collection_core = prefix + os.getenv("AGENT_CORE_COLLECTION", "agent_core")
collection_tasks = prefix + os.getenv("TASKS_COLLECTION", "task_summaries")
collection_knowledge = prefix + os.getenv("KNOWLEDGE_COLLECTION", "knowledge_base")
embedding_model_name = os.getenv("EMBEDDING_MODEL", "BAAI/bge-small-en-v1.5")

logger.info(f"Loading model: {embedding_model_name}")
tokenizer = AutoTokenizer.from_pretrained(embedding_model_name)
model = AutoModel.from_pretrained(embedding_model_name)
model.eval()
EMBEDDING_DIM = model.config.hidden_size
logger.info(f"Model loaded: {embedding_model_name} (dim: {EMBEDDING_DIM})")

try:
    logger.info("Generating initial memory graph...")
    generate_memory_graph(output_path="../../docs/memory-graph.html")
    logger.info("Memory graph generated successfully")
except Exception as e:
    logger.warning(f"Could not generate initial memory graph: {e}")

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


@mcp.tool()
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

    results = client.query_points(
        collection_name=actual_collection,
        query=query_vector,
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


@mcp.tool()
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
    point_id = f"{context_type}_{datetime.now().isoformat()}"

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

    try:
        generate_memory_graph(output_path="../../docs/memory-graph.html")
    except Exception as e:
        logger.warning(f"Could not update memory graph: {e}")

    return json.dumps(
        {
            "status": "success",
            "id": point_id,
            "collection": collection,
            "type": context_type,
        },
        indent=2,
    )


@mcp.tool()
async def memory_save_task_summary(
    task: str, summary: str, outcomes: list[str], decisions: list[str]
) -> str:
    content = f"Task: {task}\nSummary: {summary}\nDecisions: {'; '.join(decisions)}\nOutcomes: {'; '.join(outcomes)}"

    result = await memory_save_context(
        content=content,
        context_type="task",
        metadata={"task": task, "decisions": decisions, "outcomes": outcomes},
    )
    return result


@mcp.tool()
async def memory_save_knowledge(
    title: str, content: str, topic: str, importance: str = "medium"
) -> str:
    full_content = f"# {title}\n\n{content}"

    result = await memory_save_context(
        content=full_content,
        context_type="knowledge",
        metadata={"title": title, "topic": topic, "importance": importance},
    )
    return result


@mcp.tool()
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


@mcp.tool()
async def memory_set_core_memory(content: str, memory_type: str) -> str:
    result = await memory_save_context(
        content=content, context_type="core", metadata={"memory_type": memory_type}
    )
    return result


@mcp.tool()
async def memory_list_collections() -> str:
    collections = client.get_collections().collections

    output = {
        "status": "success",
        "collections": [{"name": c.name} for c in collections],
    }
    return json.dumps(output, indent=2)


@mcp.tool()
async def memory_delete_context(ids: list[str], collection: str = "core") -> str:
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

    try:
        generate_memory_graph(output_path="../../docs/memory-graph.html")
    except Exception as e:
        logger.warning(f"Could not update memory graph: {e}")

    return json.dumps(
        {"status": "success", "deleted_ids": ids, "collection": actual_collection},
        indent=2,
    )


@mcp.tool()
async def memory_health_check() -> str:
    try:
        client.get_collections()
        return json.dumps(
            {"status": "healthy", "qdrant": "connected", "model": embedding_model_name},
            indent=2,
        )
    except Exception as e:
        return json.dumps({"status": "unhealthy", "error": str(e)}, indent=2)


if __name__ == "__main__":
    mcp.run(transport="stdio")
