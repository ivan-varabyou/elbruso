#!/bin/bash
# Production Setup Script for Elbruso
# This script generates secrets and creates .env.production from the template
# Safe to run multiple times - will ask before overwriting existing files

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
ENV_TEMPLATE="$PROJECT_ROOT/apps/api/.env.production.example"
ENV_FILE="$PROJECT_ROOT/apps/api/.env.production"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo_color() {
    color=$1
    message=$2
    echo -e "${color}${message}${NC}"
}

echo_banner() {
    echo ""
    echo_color $GREEN "═══════════════════════════════════════════════════════════"
    echo_color $GREEN "  Elbruso Production Setup"
    echo_color $GREEN "═══════════════════════════════════════════════════════════"
    echo ""
}

check_openssl() {
    if ! command -v openssl &> /dev/null; then
        echo_color $RED "Error: openssl is not installed"
        echo "Please install openssl first:"
        echo "  macOS: brew install openssl"
        echo "  Linux: apt install openssl"
        echo "  Windows: winget install OpenSSL.OpenSSL"
        exit 1
    fi
}

generate_secrets() {
    echo_color $YELLOW "Generating secrets..."
    
    JWT_SECRET=$(openssl rand -hex 32)
    ADMIN_JWT_SECRET=$(openssl rand -hex 32)
    ADMIN_REFRESH_SECRET=$(openssl rand -hex 32)
    
    echo "✓ JWT_SECRET generated"
    echo "✓ ADMIN_JWT_SECRET generated"
    echo "✓ ADMIN_REFRESH_SECRET generated"
    
    export JWT_SECRET
    export ADMIN_JWT_SECRET
    export ADMIN_REFRESH_SECRET
}

create_env_file() {
    if [ -f "$ENV_FILE" ]; then
        echo_color $YELLOW "⚠️  $ENV_FILE already exists"
        read -p "Do you want to overwrite it? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            echo_color $GREEN "Keeping existing .env.production"
            return 0
        fi
    fi
    
    echo_color $GREEN "Creating $ENV_FILE from template..."
    
    if [ ! -f "$ENV_TEMPLATE" ]; then
        echo_color $RED "Error: Template file not found: $ENV_TEMPLATE"
        exit 1
    fi
    
    # Replace placeholder values with generated secrets
    sed -e "s|^JWT_SECRET=.*|JWT_SECRET=$JWT_SECRET|" \
        -e "s|^ADMIN_JWT_SECRET=.*|ADMIN_JWT_SECRET=$ADMIN_JWT_SECRET|" \
        -e "s|^ADMIN_REFRESH_SECRET=.*|ADMIN_REFRESH_SECRET=$ADMIN_REFRESH_SECRET|" \
        "$ENV_TEMPLATE" > "$ENV_FILE"
    
    # Remove comments for generated values
    sed -i '/^# Generate with:/d' "$ENV_FILE"
    
    echo_color $GREEN "✓ Created $ENV_FILE"
}

verify_env_file() {
    echo ""
    echo_color $YELLOW "Verifying .env.production..."
    
    local missing=0
    
    # Check DATABASE_URL is not empty and not placeholder
    if grep -q "^DATABASE_URL=" "$ENV_FILE"; then
        local db_url=$(grep "^DATABASE_URL=" "$ENV_FILE" | cut -d= -f2 | xargs)
        if [ -z "$db_url" ]; then
            echo_color $RED "✗ DATABASE_URL is empty"
            missing=1
        elif echo "$db_url" | grep -q "user:password@hostname"; then
            echo_color $RED "✗ DATABASE_URL contains placeholder values"
            missing=1
        else
            echo_color $GREEN "✓ DATABASE_URL configured"
        fi
    else
        echo_color $RED "✗ DATABASE_URL not found"
        missing=1
    fi
    
    # Check JWT_SECRET is set (64 hex chars)
    if grep -q "^JWT_SECRET=" "$ENV_FILE"; then
        local jwt=$(grep "^JWT_SECRET=" "$ENV_FILE" | cut -d= -f2 | xargs)
        if [ -z "$jwt" ]; then
            echo_color $RED "✗ JWT_SECRET is empty"
            missing=1
        elif [ ${#jwt} -lt 32 ]; then
            echo_color $RED "✗ JWT_SECRET too short (${#jwt} chars, min 32)"
            missing=1
        else
            echo_color $GREEN "✓ JWT_SECRET configured (${#jwt} chars)"
        fi
    else
        echo_color $RED "✗ JWT_SECRET not found"
        missing=1
    fi
    
    # Check ADMIN_JWT_SECRET is set
    if grep -q "^ADMIN_JWT_SECRET=" "$ENV_FILE"; then
        local admin_jwt=$(grep "^ADMIN_JWT_SECRET=" "$ENV_FILE" | cut -d= -f2 | xargs)
        if [ -z "$admin_jwt" ]; then
            echo_color $RED "✗ ADMIN_JWT_SECRET is empty"
            missing=1
        elif [ ${#admin_jwt} -lt 32 ]; then
            echo_color $RED "✗ ADMIN_JWT_SECRET too short (${#admin_jwt} chars)"
            missing=1
        else
            echo_color $GREEN "✓ ADMIN_JWT_SECRET configured (${#admin_jwt} chars)"
        fi
    else
        echo_color $RED "✗ ADMIN_JWT_SECRET not found"
        missing=1
    fi
    
    # Check NODE_ENV is production
    if grep -q "^NODE_ENV=production" "$ENV_FILE"; then
        echo_color $GREEN "✓ NODE_ENV=production"
    else
        echo_color $YELLOW "⚠️  NODE_ENV is not set to production"
    fi
    
    if [ $missing -eq 0 ]; then
        echo ""
        echo_color $GREEN "✓ Production environment is ready!"
        echo_color $YELLOW "Note: Review DATABASE_URL and other values before deployment"
    else
        echo ""
        echo_color $YELLOW "⚠️  Please review $ENV_FILE and fix missing values"
    fi
}

print_next_steps() {
    echo ""
    echo_color $YELLOW "Next steps:"
    echo "  1. Review and customize $ENV_FILE"
    echo "  2. Configure your database and other services"
    echo "  3. Run: cd apps/api && pnpm install && pnpm build"
    echo "  4. Start: pnpm --filter @elbruso/api start"
    echo ""
}

main() {
    echo_banner
    check_openssl
    generate_secrets
    create_env_file
    verify_env_file
    print_next_steps
}

main
