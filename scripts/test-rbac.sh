#!/bin/bash

# RBAC Test Script
# Tests RBAC API with admin user

echo "=== RBAC API Test ==="
echo ""

# 1. Login
echo "1. Getting JWT token..."
TOKEN=$(curl -s -X POST http://localhost:7100/v1/admin/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@elbruso.com","password":"password"}' | \
  python3 -c "import sys,json; print(json.load(sys.stdin)['data']['access_token'])" 2>/dev/null)

if [ -z "$TOKEN" ]; then
  echo "ERROR: Failed to get token"
  exit 1
fi

echo "Token received: ${TOKEN:0:30}..."
echo ""

# 2. Get admin roles
echo "2. GET /v1/rbac/admin/roles"
curl -s http://localhost:7100/v1/rbac/admin/roles \
  -H "Authorization: Bearer $TOKEN" | python3 -m json.tool | head -40

echo ""
echo "3. GET /v1/rbac/permissions/tree?appType=admin"
curl -s "http://localhost:7100/v1/rbac/permissions/tree?appType=admin" \
  -H "Authorization: Bearer $TOKEN" | python3 -m json.tool | head -50

echo ""
echo "=== Test Complete ==="
