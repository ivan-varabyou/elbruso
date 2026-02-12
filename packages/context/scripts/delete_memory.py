#!/usr/bin/env python3
"""
Delete Memory Point Script
Deletes a specific point from memory by ID.

Usage:
    python3 delete_memory.py --id 100
    python3 delete_memory.py --id "uuid-here" --confirm
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


def delete_memory(point_id: str, confirm: bool = False):
    """Delete a point from memory."""
    client = QdrantClient(url=QDRANT_URL)

    if not confirm:
        return point_id

    client.delete(collection_name=COLLECTION_NAME, points=[point_id])

    return True


def main():
    parser = argparse.ArgumentParser(description="Delete memory point")
    parser.add_argument("--id", required=True, help="Point ID to delete")
    parser.add_argument(
        "--confirm", action="store_true", help="Confirm deletion (required)"
    )
    parser.add_argument("--json", action="store_true", help="Output as JSON")

    args = parser.parse_args()

    try:
        if not args.confirm:
            print(f"Would delete point: {args.id}")
            print("Use --confirm to actually delete")
            if args.json:
                print(
                    json.dumps(
                        {"id": args.id, "deleted": False, "reason": "confirm_required"}
                    )
                )
            return

        result = delete_memory(args.id, confirm=True)

        if args.json:
            print(json.dumps({"id": args.id, "deleted": True}, ensure_ascii=False))
        else:
            print(f"✓ Deleted point: {args.id}")

    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
