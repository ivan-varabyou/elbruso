#!/usr/bin/env python3
"""
List Memory Script
Lists all points in the elbruso memory database.

Usage:
    python3 list_memory.py
    python3 list_memory.py --limit 20
    python3 list_memory.py --type user_info
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


def list_memory(limit: int = 50, context_type: str = None):
    """List all points in memory."""
    client = QdrantClient(url=QDRANT_URL)

    result = client.scroll(collection_name=COLLECTION_NAME, limit=limit)

    points = result[0]

    if context_type:
        points = [p for p in points if p.payload.get("context_type") == context_type]

    return points


def main():
    parser = argparse.ArgumentParser(description="List memory database contents")
    parser.add_argument(
        "--limit", type=int, default=50, help="Max points (default: 50)"
    )
    parser.add_argument("--type", help="Filter by context type")
    parser.add_argument("--json", action="store_true", help="Output as JSON")

    args = parser.parse_args()

    try:
        points = list_memory(limit=args.limit, context_type=args.type)

        if not points:
            print("No points found")
            return

        if args.json:
            output = {
                "count": len(points),
                "points": [
                    {
                        "id": str(p.id),
                        "type": p.payload.get("context_type", "unknown"),
                        "text": p.payload.get("text", ""),
                        "created": p.payload.get("created_at", ""),
                        "metadata": p.payload.get("metadata", {}),
                    }
                    for p in points
                ],
            }
            print(json.dumps(output, ensure_ascii=False, indent=2))
        else:
            print(f"Points in {COLLECTION_NAME}: {len(points)}")
            if args.type:
                print(f"Filtered by type: {args.type}")
            print("=" * 70)

            for i, p in enumerate(points, 1):
                text = p.payload.get("text", "")[:60]
                ctx_type = p.payload.get("context_type", "unknown")
                created = p.payload.get("created_at", "")[:19]

                print(f"\n{i}. [{ctx_type}]")
                print(f"   ID: {p.id}")
                print(f"   {text}...")
                print(f"   Created: {created}")

            print("\n" + "=" * 70)

    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
