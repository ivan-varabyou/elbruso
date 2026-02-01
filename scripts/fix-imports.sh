#!/bin/bash
# Fix imports to use aliases instead of relative paths
# Usage: ./scripts/fix-imports.sh [--dry-run]

set -e

DRY_RUN=false
if [ "$1" = "--dry-run" ]; then
  DRY_RUN=true
  echo "🔍 Dry run mode - no changes will be made"
fi

SRC_DIR="apps/api/src"

# Mapping of relative paths to aliases
declare -A ALIASES=(
  ["$SRC_DIR/modules/"]="@modules/"
  ["$SRC_DIR/gateway/"]="@gateway/"
  ["$SRC_DIR/shared/"]="@shared/"
  ["$SRC_DIR/config.ts"]="@config"
  ["$SRC_DIR/database/"]="@database/"
)

# Files to skip (inside modules - relative imports allowed)
SKIP_PATTERNS=(
  "modules/auth/"
  "modules/users/"
  "modules/workspace/"
  "modules/tables/"
  "modules/reference/"
  "gateway/"
  "shared/"
  "database/"
)

should_skip() {
  local file=$1
  for pattern in "${SKIP_PATTERNS[@]}"; do
    if [[ "$file" == *"$pattern"* ]]; then
      return 0  # Skip this file
    fi
  done
  return 1  # Don't skip
}

fix_file() {
  local file=$1
  local content=$(cat "$file")
  local original_content="$content"
  
  # Fix imports pointing to modules, gateway, shared, database
  # Pattern: from '../../modules/...' -> from '@modules/...'
  # Pattern: from '../../../gateway/...' -> from '@gateway/...'
  
  # Fix ../../modules/ -> @modules/
  content=$(echo "$content" | sed -E 's|from "\.\./\.\./(modules|gateway|shared|database)/|from "@\1/|g')
  
  # Fix ../../config -> @config
  content=$(echo "$content" | sed -E 's|from "\.\./\.\./config"|from "@config"|g')
  
  # Fix ../config -> @config (from gateway/)
  content=$(echo "$content" | sed -E 's|from "\.\./config"|from "@config"|g')
  
  # Fix ../modules/ -> @modules/ (from gateway/)
  content=$(echo "$content" | sed -E 's|from "\.\./(modules|gateway|shared|database)/|from "@\1/|g')
  
  if [ "$content" != "$original_content" ]; then
    if [ "$DRY_RUN" = true ]; then
      echo "📝 Would fix: $file"
    else
      echo "✅ Fixed: $file"
      echo "$content" > "$file"
    fi
  fi
}

echo "🔧 Fixing imports in $SRC_DIR..."
echo ""

fixed_count=0
total_count=0

while IFS= read -r file; do
  total_count=$((total_count + 1))
  
  if should_skip "$file"; then
    continue
  fi
  
  if fix_file "$file"; then
    fixed_count=$((fixed_count + 1))
  fi
done < <(find "$SRC_DIR" -name "*.ts" -type f)

echo ""
echo "📊 Summary:"
echo "   Total files scanned: $total_count"
echo "   Files fixed: $fixed_count"

if [ "$DRY_RUN" = true ]; then
  echo ""
  echo "💡 Run without --dry-run to apply changes"
fi
