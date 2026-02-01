#!/bin/bash
# Generate secure secrets for Elbruso
# Usage: ./generate-secrets.sh [jwt|admin|api-key|all]

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo_color() {
    color=$1
    message=$2
    echo -e "${color}${message}${NC}"
}

case "${1:-all}" in
    jwt)
        echo_color $GREEN "Generating JWT secret..."
        echo "JWT_SECRET=$(openssl rand -hex 32)"
        ;;
    admin)
        echo_color $GREEN "Generating admin JWT secrets..."
        echo "ADMIN_JWT_SECRET=$(openssl rand -hex 32)"
        echo "ADMIN_REFRESH_SECRET=$(openssl rand -hex 32)"
        ;;
    api-key)
        echo_color $GREEN "Generating API key..."
        echo "API_KEY=$(openssl rand -hex 16)"
        ;;
    all)
        echo_color $YELLOW "Generating all secrets for Elbruso..."
        echo ""
        echo "# JWT Secrets (add to .env or .env.production)"
        echo "JWT_SECRET=$(openssl rand -hex 32)"
        echo "ADMIN_JWT_SECRET=$(openssl rand -hex 32)"
        echo "ADMIN_REFRESH_SECRET=$(openssl rand -hex 32)"
        echo ""
        echo_color $GREEN "Secrets generated successfully!"
        echo_color $YELLOW "Note: These secrets are generated fresh each time."
        ;;
    help|--help|-h)
        echo "Usage: $0 {jwt|admin|api-key|all}"
        echo ""
        echo "Commands:"
        echo "  jwt      - Generate JWT secret"
        echo "  admin    - Generate admin JWT and refresh secrets"
        echo "  api-key  - Generate API key"
        echo "  all      - Generate all secrets"
        ;;
    *)
        echo_color $RED "Unknown command: $1"
        echo "Usage: $0 {jwt|admin|api-key|all}"
        exit 1
        ;;
esac
