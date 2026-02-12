#!/usr/bin/env python3
"""
Get Memory Point Script
Retrieves a specific point from memory by ID.

Usage:
    python3 get_memory.py --id 100
    python3 get_memory.py --id "uuid-here"
"""

import os
import sys
import json
import argparse
from qdrant_client import QdrantClient

os.environ["QDRANT_URL"] = "http://localhost:7999"
os.environ["PROJECT_NAME"] = "elbruso"

QDRANT_URL = os.getenv("QDRANT_URL")
PROJECT_NAME = os.getenv("PROJECT_NAME")
COLLECTION_NAME = f"{PROJECT_NAME}_agent_core" if PROJECT_NAME else "agent_core"


def get_memory(point_id: str):
    """Get a specific point from memory."""
    client = QdrantClient(url=QDRANT_URL)

    result = client.retrieve(collection_name=COLLECTION_NAME, ids=[point_id])

    return result[0] if result else None


def main():
    parser = argparse.ArgumentParser(description="Get specific memory point")
    parser.add_argument("--id", required=True, help="Point ID")
    parser.add_argument("--json", action="store_true", help="Output as JSON")

    args = parser.parse_args()

    try:
        point = get_memory(args.id)

        if not point:
            print(f"Point not found: {args.id}")
            return

        if args.json:
            output = {
                "id": str(point.id),
                "type": point.payload.get("context_type", "unknown"),
                "text": point.payload.get("text", ""),
                "created": point.payload.get("created_at", ""),
                "metadata": point.payload.get("metadata", {}),
            }
            print(json.dumps(output, ensure_ascii=False, indent=2))
        else:
            print(f"Point: {point.id}")
            print(f"Type: {point.payload.get('context_type', 'unknown')}")
            print(f"Created: {point.payload.get('created_at', '')}")
            print(f"\nText:\n{point.payload.get('text', '')}")
            print(
                f"\nMetadata: {json.dumps(point.payload.get('metadata', {}), ensure_ascii=False, indent=2)}"
            )

    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
