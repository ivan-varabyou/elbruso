#!/usr/bin/env python3
"""
Save to Memory Script
Saves new points to the elbruso memory database.

Usage:
    python3 save_memory.py --text "Your text here" --type user_info
    python3 save_memory.py --text "Fact" --type knowledge --metadata '{"key": "value"}'
"""

import os
import sys
import json
import uuid
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


def save_memory(
    text: str, context_type: str, metadata: dict = None, point_id: str = None
):
    """Save a new point to memory."""
    client = QdrantClient(url=QDRANT_URL)

    vector = encode([text])[0]

    point_id = point_id or str(uuid.uuid4())

    point = PointStruct(
        id=point_id,
        vector=vector,
        payload={
            "text": text,
            "context_type": context_type,
            "created_at": datetime.now().isoformat(),
            "metadata": metadata or {},
        },
    )

    client.upsert(collection_name=COLLECTION_NAME, points=[point])

    return point_id


def main():
    parser = argparse.ArgumentParser(description="Save to memory database")
    parser.add_argument("--text", required=True, help="Text to save")
    parser.add_argument(
        "--type", required=True, help="Context type (user_info, knowledge, task, etc.)"
    )
    parser.add_argument("--metadata", default="{}", help="JSON metadata")
    parser.add_argument("--id", help="Custom point ID")
    parser.add_argument("--json", action="store_true", help="Output as JSON")

    args = parser.parse_args()

    try:
        metadata = json.loads(args.metadata) if args.metadata else {}

        point_id = save_memory(
            text=args.text, context_type=args.type, metadata=metadata, point_id=args.id
        )

        if args.json:
            print(
                json.dumps(
                    {
                        "success": True,
                        "point_id": point_id,
                        "text": args.text[:50] + "...",
                        "type": args.type,
                    },
                    ensure_ascii=False,
                    indent=2,
                )
            )
        else:
            print(f"✓ Saved to memory")
            print(f"  ID: {point_id}")
            print(f"  Type: {args.type}")
            print(f"  Text: {args.text[:50]}...")

    except json.JSONDecodeError as e:
        print(f"Error: Invalid JSON in metadata: {e}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
