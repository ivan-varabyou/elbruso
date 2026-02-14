#!/bin/bash

# RBAC Test Setup Script
# Usage: bash scripts/setup-rbac-test.sh

set -e

echo "=== RBAC Test Setup ==="

# Create test admin user with known password (admin123)
docker exec -i elbruso-postgres psql -U postgres -d elbruso << 'SQL'
INSERT INTO admin_users (id, email, password_hash, name, role, is_active, created_at, updated_at)
VALUES (
  '550e8400-e29b-41d4-a716-446655440000',
  'admin@elbruso.com',
  '\$2b\$10\$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
  'Test Admin',
  'super_admin',
  true,
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;

SELECT id, email, name, role FROM admin_users WHERE id = '550e8400-e29b-41d4-a716-446655440000';
SQL

echo ""
echo "=== Test Credentials ==="
echo "Email: admin@elbruso.com"
echo "Password: admin123"
echo ""
echo "=== API Endpoints ==="
echo "POST /v1/admin/auth/login - Login"
echo "GET  /v1/rbac/admin/roles - Admin roles"
echo "GET  /v1/rbac/user/roles - User roles"
echo "GET  /v1/rbac/admin/roles/:id - Get role"
echo "PUT  /v1/rbac/admin/roles/:id/permissions - Update permissions"
echo "GET  /v1/rbac/permissions/tree?appType=admin - Admin permissions"
echo "GET  /v1/rbac/permissions/tree?appType=user - User permissions"
echo ""
echo "=== Test with JWT ==="
echo "TOKEN=\$(curl -s -X POST http://localhost:7100/v1/admin/auth/login \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{\"email\":\"admin@elbruso.com\",\"password\":\"admin123\"}' | jq -r '.data.accessToken')"
echo ""
echo "curl -H 'Authorization: Bearer \$TOKEN' http://localhost:7100/v1/rbac/admin/roles"
