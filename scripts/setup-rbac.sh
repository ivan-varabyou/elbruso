#!/bin/bash

# RBAC Setup Script for Elbruso
# This script sets up RBAC system with proper permissions

set -e

echo "=== RBAC Setup Script ==="
echo ""

# Check if PostgreSQL is running
if ! docker exec elbruso-postgres psql -U postgres -d elbruso -c "SELECT 1" &>/dev/null; then
    echo "Starting PostgreSQL..."
    docker start elbruso-postgres 2>/dev/null || docker compose up -d postgres 2>/dev/null
    sleep 3
fi

# Run RBAC migration
echo "Running RBAC migration..."
docker exec -i elbruso-postgres psql -U postgres -d elbruso < docs/database/104_rbac_system.sql

echo ""
echo "RBAC migration completed!"

# Verify roles
echo ""
echo "Created roles:"
docker exec -i elbruso-postgres psql -U postgres -d elbruso -c "SELECT code, name, type, is_system FROM rbac_roles ORDER BY type, name;"

echo ""
echo "Created permissions:"
docker exec -i elbruso-postgres psql -U postgres -d elbruso -c "SELECT code, name, group_name FROM rbac_permissions ORDER BY group_name, code LIMIT 10;"

echo ""
echo "=== Setup Complete ==="
echo ""
echo "To test RBAC API:"
echo "1. Get JWT token from /v1/admin/auth/login"
echo "2. Call RBAC endpoints with Authorization header"
echo ""
echo "Example:"
echo '  curl -X POST http://localhost:7100/v1/admin/auth/login \'
echo '    -H "Content-Type: application/json" \'
echo '    -d '\''{"email":"admin@elbruso.com","password":"admin123"}'\'''
echo ""
echo '  curl http://localhost:7100/v1/rbac/admin/roles \'
echo '    -H "Authorization: Bearer <TOKEN>"'
