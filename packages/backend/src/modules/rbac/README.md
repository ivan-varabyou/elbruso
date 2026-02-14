# RBAC System

## Overview

Централизованная система управления ролями и разрешениями (RBAC) для монолита с подготовкой к микросервисам.

## Структура

```
packages/backend/src/modules/rbac/
├── entities/
│   ├── rbac-role.entity.ts
│   └── rbac-permission.entity.ts
├── enums/
│   └── permission.enum.ts          # RbacPermission, RbacAppType enums
├── types/
│   └── rbac.types.ts               # TypeScript interfaces
├── services/
│   ├── rbac.service.ts             # Core RBAC service
│   └── rbac-cache.service.ts       # Cache service (Redis-ready)
├── guards/
│   ├── rbac.guard.ts               # Main permission guard
│   └── require-permissions.decorator.ts
├── controllers/
│   └── rbac.controller.ts          # RBAC API endpoints
└── dto/
    └── rbac.dto.ts                 # DTOs
```

## Database

Файл: `docs/database/104_rbac_system.sql`

### Tables

- `rbac_roles` - Роли (admin/user)
- `rbac_permissions` - Справочник разрешений
- `rbac_user_roles` - Связь пользователей с ролями

### Seed Data

**Admin Roles:**

- `super_admin` - Полный доступ
- `admin` - Расширенный доступ
- `moderator` - Базовый доступ

**User Roles:**

- `owner` - Владелец организации
- `admin` - Администратор
- `manager` - Менеджер
- `viewer` - Читатель

## Usage

### Guards

```typescript
// Одиночное разрешение
@UseGuards(JwtAuthGuard, RbacGuard)
@Permissions('admin:users:read')
@Get('users')
async getUsers() { ... }

// Несколько разрешений (все нужны)
@UseGuards(JwtAuthGuard, RbacGuard)
@Permissions('admin:users:read', 'admin:users:write')
@Post('users')
async createUser() { ... }
```

### RbacService

```typescript
// Проверка доступа
const result = await rbacService.canAccess(userId, ["admin:users:read"]);

// Получение роли
const role = await rbacService.getRoleById(roleId);

// Обновление разрешений
await rbacService.updateRolePermissions(roleId, {
  users: ["read", "write"],
  tables: ["read"],
});
```

## API Endpoints

### Admin Roles

```
GET    /rbac/admin/roles           - Список ролей
GET    /rbac/admin/roles/:id       - Роль по ID
POST   /rbac/admin/roles           - Создать роль
PUT    /rbac/admin/roles/:id       - Обновить роль
PUT    /rbac/admin/roles/:id/permissions - Обновить разрешения
DELETE /rbac/admin/roles/:id      - Удалить роль
```

### User Roles

```
GET    /rbac/user/roles            - Список ролей
GET    /rbac/user/roles/:id        - Роль по ID
POST   /rbac/user/roles           - Создать роль
PUT    /rbac/user/roles/:id        - Обновить роль
PUT    /rbac/user/roles/:id/permissions - Обновить разрешения
DELETE /rbac/user/roles/:id       - Удалить роль
```

### Permissions

```
GET    /rbac/permissions/tree?appType=admin   - Дерево разрешений
```

### User Assignments

```
GET    /rbac/user/:userId/role?appType=webapp  - Роль пользователя
PUT    /rbac/user/:userId/role                 - Назначить роль
```

## Frontend

```
packages/frontend/src/
├── types/
│   └── rbac.ts                    # TypeScript types
├── api/
│   └── rbac.api.ts                # API client
└── ui/primitives/
    ├── PermissionsTree/            # Tree component
    ├── RoleCard/                  # Role card
    ├── RolePermissionsEditor/     # Permissions modal
    └── Checkbox/                  # Checkbox primitive
```

## Migration from Old System

```sql
-- Старая таблица admin_roles мигрирована в rbac_roles
-- Данные сохранены, новая структура расширена

-- Удаление старой таблицы
DROP TABLE IF EXISTS admin_roles CASCADE;
```

## Super Admin Bypass

Пользователи с ролью `super_admin` имеют полный доступ ко всем ресурсам и игнорируют проверку `organization.is_blocked`.

## Organization Blocking

Для пользователей WebApp (не admin) проверяется `organization.is_blocked`:

- Заблокированная организация → все пользователи получают 403 -邀请 (invite) также заблокирован для заблокированных организаций

## Future: Microservices

При переходе на микросервисы:

1. RBAC выносится в отдельный сервис
2. Коммуникация через gRPC
3. Redis для кэширования
4. Service Discovery (Consul)
