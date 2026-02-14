# RBAC System Documentation

## Overview

The RBAC (Role-Based Access Control) system provides centralized permission management for both Admin App and Web App users.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      RBAC Service                          │
├─────────────────────────────────────────────────────────────┤
│  • Permission checks                                        │
│  • Role management                                         │
│  • User role assignments                                   │
│  • Organization blocking                                   │
└─────────────────────────────────────────────────────────────┘
                           │
         ┌─────────────────┼─────────────────┐
         ▼                 ▼                 ▼
┌────────────────┐ ┌────────────────┐ ┌────────────────┐
│   Admin App    │ │   Web App      │ │   Frontend     │
│   (backend)    │ │   (backend)    │ │   (components) │
└────────────────┘ └────────────────┘ └────────────────┘
```

## Database Schema

### rbac_roles

| Column      | Type         | Description                            |
| ----------- | ------------ | -------------------------------------- |
| id          | UUID         | Primary key                            |
| type        | VARCHAR(20)  | 'admin' or 'user'                      |
| code        | VARCHAR(50)  | Unique role code                       |
| name        | VARCHAR(100) | Human-readable name                    |
| description | TEXT         | Role description                       |
| permissions | JSONB        | { "resource": ["action1", "action2"] } |
| is_system   | BOOLEAN      | System roles cannot be deleted         |
| is_editable | BOOLEAN      | Editable permissions                   |

### rbac_permissions

| Column      | Type          | Description                                |
| ----------- | ------------- | ------------------------------------------ |
| id          | UUID          | Primary key                                |
| code        | VARCHAR(100)  | Permission code (e.g., 'admin:users:read') |
| name        | VARCHAR(200)  | Human-readable name                        |
| description | TEXT          | Permission description                     |
| group_name  | VARCHAR(50)   | Permission group                           |
| app_type    | VARCHAR(20)   | 'admin', 'user', or 'both'                 |
| actions     | VARCHAR(50)[] | Available actions                          |

### rbac_user_roles

| Column          | Type        | Description             |
| --------------- | ----------- | ----------------------- |
| id              | UUID        | Primary key             |
| user_id         | UUID        | Reference to user       |
| app_type        | VARCHAR(20) | 'admin' or 'webapp'     |
| role_id         | UUID        | Reference to rbac_roles |
| organization_id | INTEGER     | Organization context    |
| granted_at      | TIMESTAMP   | When role was assigned  |

## Default Roles

### Admin Roles

| Code        | Name        | Permissions                                           |
| ----------- | ----------- | ----------------------------------------------------- |
| super_admin | Super Admin | All (\*)                                              |
| admin       | Admin       | users: [read, write], roles: [read], settings: [read] |
| moderator   | Moderator   | users: [read], roles: [read]                          |

### User Roles (Web App)

| Code    | Name          | Permissions                                                      |
| ------- | ------------- | ---------------------------------------------------------------- |
| owner   | Владелец      | All (\*)                                                         |
| admin   | Администратор | users: [*], workspaces: [*], tables: [*]                         |
| manager | Менеджер      | workspaces: [create, read, write], tables: [create, read, write] |
| viewer  | Читатель      | workspaces: [read], tables: [read]                               |

## API Endpoints

### Admin Roles

```
GET    /v1/rbac/admin/roles                    - List admin roles
GET    /v1/rbac/admin/roles/:id              - Get role by ID
POST   /v1/rbac/admin/roles                   - Create role
PUT    /v1/rbac/admin/roles/:id               - Update role
DELETE /v1/rbac/admin/roles/:id               - Delete role
PUT    /v1/rbac/admin/roles/:id/permissions   - Update permissions
```

### User Roles

```
GET    /v1/rbac/user/roles                     - List user roles
GET    /v1/rbac/user/roles/:id                - Get role by ID
POST   /v1/rbac/user/roles                    - Create role
PUT    /v1/rbac/user/roles/:id                - Update role
DELETE /v1/rbac/user/roles/:id                - Delete role
PUT    /v1/rbac/user/roles/:id/permissions    - Update permissions
```

### Permissions

```
GET /v1/rbac/permissions/tree?appType=admin  - Admin permissions tree
GET /v1/rbac/permissions/tree?appType=user   - User permissions tree
```

## Usage

### Using the Guard

```typescript
import { RbacGuard, Permissions } from './rbac/guards/rbac.guard';

@Controller('tables')
@UseGuards(JwtAuthGuard, RbacGuard)
export class TablesController {
  @Permissions('tables:read')
  @Get()
  async findAll() { ... }

  @Permissions('tables:write')
  @Post()
  async create() { ... }
}
```

### Service Methods

```typescript
// Check permission
const result = await rbacService.canAccess(userId, ["tables:read"]);

// Get role permissions
const permissions = await rbacService.getRolePermissions(roleId);

// Update role permissions
await rbacService.updateRolePermissions(roleId, {
  tables: ["read", "write", "delete"],
});
```

## Testing

### Setup Test Admin

```bash
# Create test admin with password "password"
bash scripts/setup-rbac-test.sh
```

### Test API

```bash
# Get token
TOKEN=$(curl -s -X POST http://localhost:7100/v1/admin/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@elbruso.com","password":"password"}' | \
  python3 -c "import sys,json; print(json.load(sys.stdin)['data']['access_token'])")

# Test endpoints
curl http://localhost:7100/v1/rbac/admin/roles \
  -H "Authorization: Bearer $TOKEN"
```

## Permissions Format

Permissions are stored as JSONB:

```json
{
  "users": ["read", "write", "delete"],
  "workspaces": ["create", "read", "write", "delete"],
  "tables": ["read", "write"]
}
```

Wildcard for all permissions:

```json
{
  "*": ["*"]
}
```

## Organization Blocking

When an organization is blocked, all users in that organization lose access (except SUPER_ADMIN).

```typescript
// Check in RBAC service
const org = await organizationsService.findById(user.organizationId);
if (org.isBlocked && roleCode !== "super_admin") {
  return { allowed: false, reason: "Organization is blocked" };
}
```

## Migration

```bash
# Run migration
docker exec -i elbruso-postgres psql -U postgres -d elbruso < docs/database/104_rbac_system.sql
```

## Files Reference

### Backend

- `packages/backend/src/modules/rbac/` - Main RBAC module
- `packages/backend/src/modules/rbac/enums/permission.enum.ts` - Permission enums
- `packages/backend/src/modules/rbac/services/rbac.service.ts` - Core service
- `packages/backend/src/modules/rbac/guards/rbac.guard.ts` - Guard

### Frontend

- `packages/frontend/src/types/rbac.ts` - TypeScript types
- `packages/frontend/src/api/rbac.api.ts` - API client
- `packages/frontend/src/ui/primitives/PermissionsTree/` - Permission tree UI
- `packages/frontend/src/ui/primitives/RoleCard/` - Role card UI
- `packages/frontend/src/modules/admin/ui/RolesManagement/` - Admin roles page

### Database

- `docs/database/104_rbac_system.sql` - Migration and seed
