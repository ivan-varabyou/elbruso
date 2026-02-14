# RBAC System API

## Overview

The RBAC (Role-Based Access Control) system provides centralized permission management for both Admin App and Web App users.

## Base URL

```
http://localhost:7100/v1/rbac
```

## Authentication

All endpoints require JWT authentication via Bearer token:

```
Authorization: Bearer <token>
```

---

## Permissions Tree

### GET /permissions/tree

Get all available permissions grouped by resource.

**Query Parameters:**

- `appType` (optional): `"admin"` or `"user"`, defaults to `"admin"`

**Response:**

```json
{
  "data": {
    "appType": "admin",
    "groups": [
      {
        "name": "users",
        "permissions": [
          {
            "code": "admin:users:read",
            "name": "View Users",
            "description": "View list of users",
            "group": "users",
            "appType": "admin",
            "actions": ["read"]
          }
        ]
      }
    ]
  }
}
```

---

## Admin Roles

### GET /admin/roles

Get all admin roles.

**Response:**

```json
{
  "data": [
    {
      "id": "uuid",
      "type": "admin",
      "code": "super_admin",
      "name": "Super Admin",
      "description": "Full system access",
      "permissions": {
        "*": ["*"]
      },
      "isSystem": true,
      "isEditable": false
    }
  ]
}
```

### GET /admin/roles/:id

Get admin role by ID.

### POST /admin/roles

Create new admin role.

**Body:**

```json
{
  "code": "custom_role",
  "name": "Custom Role",
  "description": "Custom description",
  "permissions": {
    "users": ["read", "write"],
    "settings": ["read"]
  }
}
```

### PUT /admin/roles/:id

Update admin role name/description.

### PUT /admin/roles/:id/permissions

Update admin role permissions.

**Body:**

```json
{
  "users": ["read", "write", "delete"],
  "settings": ["read"]
}
```

### DELETE /admin/roles/:id

Delete admin role (only non-system roles).

---

## User Roles

### GET /user/roles

Get all user roles (for Web App).

### GET /user/roles/:id

Get user role by ID.

### POST /user/roles

Create new user role.

### PUT /user/roles/:id

Update user role.

### PUT /user/roles/:id/permissions

Update user role permissions.

### DELETE /user/roles/:id

Delete user role.

---

## User Role Assignments

### GET /user/:userId/role

Get role assignment for a user.

**Query Parameters:**

- `appType` (optional): `"admin"` or `"webapp"`, defaults to `"webapp"`

### PUT /user/:userId/role

Assign role to a user.

**Body:**

```json
{
  "roleId": "uuid",
  "appType": "webapp"
}
```

---

## Permission Format

Permissions are stored as JSONB with resource-action pairs:

```json
{
  "users": ["read", "write", "delete"],
  "settings": ["read", "write"],
  "workspaces": ["create", "read", "write", "delete"]
}
```

Wildcard for full access:

```json
{
  "*": ["*"]
}
```

---

## Default Roles

### Admin Roles

| Code          | Name        | Permissions                |
| ------------- | ----------- | -------------------------- |
| `super_admin` | Super Admin | Full access (`"*": ["*"]`) |
| `admin`       | Admin       | Extended access            |
| `moderator`   | Moderator   | Basic access               |

### User Roles

| Code      | Name          | Permissions                      |
| --------- | ------------- | -------------------------------- |
| `owner`   | Owner         | Full organization access         |
| `admin`   | Administrator | Manage users, workspaces, tables |
| `manager` | Manager       | Manage workspaces                |
| `viewer`  | Viewer        | Read-only access                 |

---

## Testing

```bash
# Login as admin
TOKEN=$(curl -s -X POST http://localhost:7100/v1/admin/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@elbruso.com","password":"password"}' | \
  python3 -c "import sys,json; print(json.load(sys.stdin)['data']['access_token'])")

# Get admin roles
curl http://localhost:7100/v1/rbac/admin/roles \
  -H "Authorization: Bearer $TOKEN"

# Get permissions tree
curl "http://localhost:7100/v1/rbac/permissions/tree?appType=admin" \
  -H "Authorization: Bearer $TOKEN"
```
