#!/bin/bash

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "========================================"
echo "        Dry Run Migration              "
echo "========================================"
echo "Project Root: $PROJECT_ROOT"
echo "Mode: DRY-RUN (no changes will be made)"
echo "========================================"
echo ""

cd "$PROJECT_ROOT"

if [ -f "$SCRIPT_DIR/migrate.mjs" ]; then
    node "$SCRIPT_DIR/migrate.mjs" --dry-run "$@"
else
    echo "Error: migrate.mjs not found in $SCRIPT_DIR"
    exit 1
fi

echo ""
echo "========================================"
echo "        Dry Run Complete               "
echo "========================================"
echo "Review the changes above before running"
echo "the actual migration without --dry-run"
echo "========================================"
