#!/bin/bash

# Script to automatically replace @elbruso/* aliases with new project aliases
# Usage: ./scripts/fix-aliases.sh [--dry-run]

DRY_RUN=false
if [[ "$1" == "--dry-run" ]]; then
    DRY_RUN=true
    echo "=== DRY RUN MODE ==="
fi

# Define replacement rules: pattern → replacement
declare -A REPLACEMENTS=(
    # Packages → @frontend
    ["@elbruso/ui"]="@frontend/ui"
    ["@elbruso/lib"]="@frontend/lib"
    ["@elbruso/stores"]="@frontend/stores"
    ["@elbruso/api"]="@frontend/api"
    ["@elbruso/types"]="@frontend/types"
    ["@elbruso/app"]="@frontend/app"
    ["@elbruso/shared/app"]="@frontend/app"
    ["@elbruso/shared/modules"]="@frontend/modules"

    # @elbruso/modules/* → @frontend/modules/*
    ["@elbruso/modules"]="@frontend/modules"

    # @elbruso/api/* → @frontend/api/*
    ["@elbruso/api/hooks"]="@frontend/api/hooks"
    ["@elbruso/api/admin"]="@frontend/api/admin"
    ["@elbruso/api/admin.client"]="@frontend/api/admin.client"

    # @elbruso/ui/* → @frontend/ui/*
    ["@elbruso/ui/primitives"]="@frontend/ui/primitives"
    ["@elbruso/ui/layout"]="@frontend/ui/layout"

    # Backend packages → @backend
    ["@elbruso/database"]="@database"
)

# Files to process
EXTENSIONS="ts tsx"

echo "Replacing @elbruso/* aliases..."
echo ""

for ext in $EXTENSIONS; do
    echo "Processing .$ext files..."

    while IFS= read -r -d '' file; do
        echo "  File: $file"

        # Apply each replacement
        for pattern in "${!REPLACEMENTS[@]}"; do
            replacement="${REPLACEMENTS[$pattern]}"

            if grep -q "$pattern" "$file" 2>/dev/null; then
                if [[ "$DRY_RUN" == "true" ]]; then
                    echo "    [DRY] Would replace: $pattern → $replacement"
                else
                    sed -i "s|$pattern|$replacement|g" "$file"
                    echo "    Replaced: $pattern → $replacement"
                fi
            fi
        done
    done < <(find /home/ivan/git/elbruso -type f -name "*.$ext" -not -path "*/node_modules/*" -print0)
done

echo ""
echo "=== Additional fixes ==="

# Fix @modules/* → @backend/modules/* (only in api-gateway)
echo "Processing @modules/* → @backend/modules/* in api-gateway..."
find /home/ivan/git/elbruso/apps/api-gateway -name "*.ts" -not -path "*/node_modules/*" | while read -r file; do
    if grep -q "@modules/" "$file" 2>/dev/null; then
        if [[ "$DRY_RUN" == "true" ]]; then
            echo "  [DRY] Would replace @modules/ → @backend/modules/ in $file"
        else
            sed -i "s|@modules/|@backend/modules/|g" "$file"
            echo "  Fixed: $file"
        fi
    fi
done

# Fix @config → @apigateway/config (only in api-gateway)
echo "Processing @config → @apigateway/config in api-gateway..."
find /home/ivan/git/elbruso/apps/api-gateway -name "*.ts" -not -path "*/node_modules/*" | while read -r file; do
    if grep -q '"@config"' "$file" 2>/dev/null; then
        if [[ "$DRY_RUN" == "true" ]]; then
            echo "  [DRY] Would replace @config → @apigateway/config in $file"
        else
            sed -i 's|"@config"|@apigateway/config|g' "$file"
            echo "  Fixed: $file"
        fi
    fi
done

echo ""
if [[ "$DRY_RUN" == "true" ]]; then
    echo "=== DRY RUN COMPLETE ==="
    echo "Run without --dry-run to apply changes"
else
    echo "=== ALIAS FIX COMPLETE ==="
fi
