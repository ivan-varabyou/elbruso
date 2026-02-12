#!/usr/bin/env python3
"""
Search Memory Script
Searches the elbruso memory database for relevant context.

Usage:
    python3 search_memory.py "your query here"
    python3 search_memory.py "иван" --limit 10
"""

import os
import sys
import json
import argparse
from datetime import datetime
from qdrant_client import QdrantClient
from qdrant_client.models import PointStruct
from transformers import AutoTokenizer, AutoModel
from transformers import logging as transformers_logging
import torch

os.environ["TRANSFORMERS_VERBOSITY"] = "error"
transformers_logging.set_verbosity_error()

QDRANT_URL = os.getenv("QDRANT_URL")
PROJECT_NAME = os.getenv("PROJECT_NAME")
COLLECTION_NAME = f"{PROJECT_NAME}_agent_core" if PROJECT_NAME else "agent_core"

tokenizer = AutoTokenizer.from_pretrained("BAAI/bge-small-en-v1.5")
model = AutoModel.from_pretrained("BAAI/bge-small-en-v1.5")
model.eval()


def mean_pooling(model_output, attention_mask):
    token_embeddings = model_output[0]
    input_mask_expanded = (
        attention_mask.unsqueeze(-1).expand(token_embeddings.size()).float()
    )
    return torch.sum(token_embeddings * input_mask_expanded, 1) / torch.clamp(
        input_mask_expanded.sum(1), min=1e-9
    )


def encode(texts):
    encoded = tokenizer(
        texts, padding=True, truncation=True, return_tensors="pt", max_length=512
    )
    with torch.no_grad():
        model_output = model(**encoded)
    embeddings = mean_pooling(model_output, encoded["attention_mask"])
    return embeddings.numpy().tolist()


def search_memory(query: str, limit: int = 5):
    """Search memory for relevant context."""
    client = QdrantClient(url=QDRANT_URL)

    query_vector = encode([query])[0]

    results = client.search(
        collection_name=COLLECTION_NAME, query_vector=query_vector, limit=limit
    )

    return results


def main():
    parser = argparse.ArgumentParser(description="Search memory database")
    parser.add_argument("query", help="Search query")
    parser.add_argument("--limit", type=int, default=5, help="Max results (default: 5)")
    parser.add_argument("--json", action="store_true", help="Output as JSON")

    args = parser.parse_args()

    try:
        results = search_memory(args.query, args.limit)

        if not results:
            print("No results found")
            return

        if args.json:
            output = {
                "query": args.query,
                "count": len(results),
                "results": [
                    {
                        "id": str(r.id),
                        "score": r.score,
                        "text": r.payload.get("text", ""),
                        "type": r.payload.get("context_type", "unknown"),
                        "created": r.payload.get("created_at", ""),
                    }
                    for r in results
                ],
            }
            print(json.dumps(output, ensure_ascii=False, indent=2))
        else:
            print(f"Search: '{args.query}'")
            print(f"Found: {len(results)} results")
            print("=" * 60)

            for i, r in enumerate(results, 1):
                text = r.payload.get("text", "")[:100]
                ctx_type = r.payload.get("context_type", "unknown")
                print(f"\n{i}. [{ctx_type}] Score: {r.score:.4f}")
                print(f"   ID: {r.id}")
                print(f"   {text}...")

            print("\n" + "=" * 60)

    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
