#!/bin/bash

# Function to generate project tree documentation
# Usage: generate_tree <target_dir> <output_file> <title>
generate_tree() {
    local target_dir=$1
    local output_file=$2
    local title=$3
    local depth=10
    local excludes='node_modules|.git|dist|.turbo'

    echo "Generating tree for $title..."
    
    mkdir -p "$(dirname "$output_file")"
    
    echo "# $title" > "$output_file"
    echo "" >> "$output_file"
    echo "Генерировано: $(date)" >> "$output_file"
    echo "" >> "$output_file"
    
    tree -L $depth --dirsfirst -I "$excludes" "$target_dir" >> "$output_file"
    
    echo "Готово! Файл: $output_file"
}

# Base project directory
PROJECT_ROOT="/home/ivan/git/elbruso"

# 1. Root Project
generate_tree "$PROJECT_ROOT" "$PROJECT_ROOT/docs/PROJECT_TREE.md" "Структура проекта"

# 2. apps/web
generate_tree "$PROJECT_ROOT/apps/web" "$PROJECT_ROOT/apps/web/docs/PROJECT_TREE.md" "Структура проекта web"

# 3. apps/api
generate_tree "$PROJECT_ROOT/apps/api" "$PROJECT_ROOT/apps/api/docs/PROJECT_TREE.md" "Структура проекта api"

# 4. packages/shared
generate_tree "$PROJECT_ROOT/packages/shared" "$PROJECT_ROOT/packages/shared/docs/PROJECT_TREE.md" "Структура проекта shared"
