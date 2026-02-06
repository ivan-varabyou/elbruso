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

# 2. API Gateway
generate_tree "$PROJECT_ROOT/apps/api-gateway" "$PROJECT_ROOT/apps/api-gateway/docs/PROJECT_TREE.md" "Структура проекта api-gateway"

# 3. App Web
generate_tree "$PROJECT_ROOT/apps/app-web" "$PROJECT_ROOT/apps/app-web/docs/PROJECT_TREE.md" "Структура проекта app-web"

# 4. App Admin
generate_tree "$PROJECT_ROOT/apps/app-admin" "$PROJECT_ROOT/apps/app-admin/docs/PROJECT_TREE.md" "Структура проекта app-admin"
