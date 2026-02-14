#!/bin/bash

# RBAC Setup Script for Elbruso
# Creates test admin user with SUPER_ADMIN role

set -e

POSTGRES_CONTAINER="elbruso-postgres"
DB_NAME="elbruso"
DB_USER="postgres"
ADMIN_EMAIL="admin@elbruso.com"
ADMIN_PASSWORD="admin123"
ADMIN_ID="550e8400-e29b-41d4-a716-446655440000"

echo "=== RBAC Setup Script ==="
echo "Creating test admin user: $ADMIN_EMAIL"

# Create admin user with known password hash
docker exec -i "$POSTGRES_CONTAINER" psql -U "$DB_USER" -d "$DB_NAME" << EOF
INSERT INTO admin_users (id, email, password_hash, name, role, is_active, created_at, updated_at)
VALUES (
  '$ADMIN_ID',
  '$ADMIN_EMAIL',
  '\$2b\$10\$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
  'Admin User',
  'super_admin',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  password_hash = EXCLUDED.password_hash,
  name = EXCLUDED.name,
  role = EXCLUDED.role;

SELECT id, email, name, role FROM admin_users WHERE email = '$ADMIN_EMAIL';
EOF

echo ""
echo "=== Testing RBAC API ==="

# Get JWT token
echo "Getting JWT token..."
TOKEN=$(curl -s -X POST http://localhost:7100/v1/admin/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$ADMIN_EMAIL\",\"password\":\"$ADMIN_PASSWORD\"}" | python3 -c "import sys,json; print(json.load(sys.stdin).get('data',{}).get('token',''))" 2>/dev/null)

if [ -z "$TOKEN" ]; then
  echo "Failed to get JWT token. Trying without v1 prefix..."
  TOKEN=$(curl -s -X POST http://localhost:7100/admin/auth/login \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"$ADMIN_EMAIL\",\"password\":\"$ADMIN_PASSWORD\"}" | python3 -c "import sys,json; print(json.load(sys.stdin).get('data',{}).get('token',''))" 2>/dev/null)
fi

if [ -z "$TOKEN" ]; then
  echo "ERROR: Failed to authenticate. Check credentials."
  exit 1
fi

echo "JWT Token obtained successfully!"

# Test RBAC endpoints
echo ""
echo "=== Testing RBAC Endpoints ==="

echo ""
echo "1. GET /v1/rbac/admin/roles"
curl -s -X GET http://localhost:7100/v1/rbac/admin/roles \
  -H "Authorization: Bearer $TOKEN" | python3 -m json.tool | head -50

echo ""
echo "2. GET /v1/rbac/permissions/tree?appType=admin"
curl -s -X GET "http://localhost:7100/v1/rbac/permissions/tree?appType=admin" \
  -H "Authorization: Bearer $TOKEN" | python3 -m json.tool | head -80

echo ""
echo "=== RBAC Setup Complete ==="
echo "Test admin user: $ADMIN_EMAIL"
echo "Password: $ADMIN_PASSWORD"
echo "RBAC API available at: http://localhost:7100/v1/rbac/"
