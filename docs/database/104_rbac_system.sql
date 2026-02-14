-- ============================================
-- RBAC System Tables
-- ============================================

-- 1. RBAC Roles Table (общая для admin и user)
CREATE TABLE IF NOT EXISTS rbac_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(20) NOT NULL CHECK (type IN ('admin', 'webapp')),
    code VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    permissions JSONB NOT NULL DEFAULT '{}',
    is_system BOOLEAN DEFAULT FALSE,
    is_editable BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(type, code)
);

-- 2. RBAC Permissions Table (справочник)
CREATE TABLE IF NOT EXISTS rbac_permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    group_name VARCHAR(50) NOT NULL,
    app_type VARCHAR(20) NOT NULL CHECK (app_type IN ('admin', 'webapp', 'both')),
    actions VARCHAR(50)[] DEFAULT '{}',
    is_system BOOLEAN DEFAULT TRUE
);

-- 3. RBAC User Roles Table (связь пользователей с ролями)
CREATE TABLE IF NOT EXISTS rbac_user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    app_type VARCHAR(20) NOT NULL CHECK (app_type IN ('admin', 'webapp')),
    role_id UUID NOT NULL REFERENCES rbac_roles(id),
    organization_id INTEGER,
    granted_by UUID,
    granted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    UNIQUE(user_id, app_type)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_rbac_roles_type ON rbac_roles(type);
CREATE INDEX IF NOT EXISTS idx_rbac_roles_code ON rbac_roles(code);
CREATE INDEX IF NOT EXISTS idx_rbac_permissions_code ON rbac_permissions(code);
CREATE INDEX IF NOT EXISTS idx_rbac_user_roles_user ON rbac_user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_rbac_user_roles_role ON rbac_user_roles(role_id);

-- ============================================
-- Seed: Admin Roles
-- ============================================
INSERT INTO rbac_roles (type, code, name, description, permissions, is_system, is_editable)
VALUES
    ('admin', 'SUPER_ADMIN', 'Super Admin', 'Полный доступ ко всему', '{"*": ["*"]}'::jsonb, TRUE, FALSE),
    ('admin', 'ADMIN', 'Admin', 'Расширенный доступ', '{"admin:users": ["read", "write"], "admin:roles": ["read"], "admin:organizations": ["read", "write"], "admin:settings": ["read"]}'::jsonb, TRUE, FALSE),
    ('admin', 'MODERATOR', 'Moderator', 'Базовый доступ', '{"admin:users": ["read"], "admin:organizations": ["read"]}'::jsonb, TRUE, FALSE)
ON CONFLICT (type, code) DO UPDATE SET permissions = EXCLUDED.permissions;

-- ============================================
-- Seed: User Roles
-- ============================================
INSERT INTO rbac_roles (type, code, name, description, permissions, is_system, is_editable)
VALUES
    ('user', 'OWNER', 'Владелец', 'Полный доступ к организации', '{"*": ["*"]}'::jsonb, TRUE, FALSE),
    ('user', 'USER_ADMIN', 'Администратор', 'Управление пользователями', '{"user:users": ["*"], "user:workspaces": ["*"], "user:tables": ["*"]}'::jsonb, TRUE, FALSE),
    ('user', 'MANAGER', 'Менеджер', 'Управление workspace', '{"user:workspaces": ["create", "read", "write"], "user:tables": ["create", "read", "write"]}'::jsonb, TRUE, FALSE),
    ('user', 'VIEWER', 'Читатель', 'Только просмотр', '{"user:workspaces": ["read"], "user:tables": ["read"]}'::jsonb, TRUE, FALSE)
ON CONFLICT (type, code) DO UPDATE SET permissions = EXCLUDED.permissions;

-- ============================================
-- Seed: Permissions Catalog
-- ============================================
TRUNCATE TABLE rbac_permissions;

INSERT INTO rbac_permissions (code, name, description, group_name, app_type, actions)
VALUES
    -- Admin permissions
    ('admin:users', 'Пользователи', 'Управление администраторами системы', 'users', 'admin', ARRAY['read', 'write', 'delete']),
    ('admin:roles', 'Роли и права', 'Управление ролями и правами доступа', 'roles', 'admin', ARRAY['read', 'write']),
    ('admin:organizations', 'Организации', 'Управление организациями, типами и уровнями', 'organizations', 'admin', ARRAY['read', 'write', 'delete']),
    ('admin:workspace-templates', 'Шаблоны Workspace', 'Управление системными шаблонами рабочих пространств', 'templates', 'admin', ARRAY['read', 'write', 'delete']),
    ('admin:settings', 'Настройки системы', 'Глобальные настройки, системные отчеты и журналы аудита', 'settings', 'admin', ARRAY['read', 'write']),
    ('admin:reference', 'Справочники', 'Управление странами, регионами и видами спорта', 'reference', 'admin', ARRAY['read', 'write']),

    -- User (WebApp) permissions
    ('user:workspaces', 'Рабочие пространства', 'Управление площадками и проектами', 'workspaces', 'user', ARRAY['create', 'read', 'write', 'delete']),
    ('user:tables', 'Таблицы', 'Управление структурами таблиц и колонок', 'tables', 'user', ARRAY['create', 'read', 'write', 'delete']),
    ('user:cells', 'Данные (ячейки)', 'Внесение и редактирование данных в ячейках', 'cells', 'user', ARRAY['read', 'write']),
    ('user:users', 'Сотрудники', 'Управление пользователями организации', 'users', 'user', ARRAY['read', 'write']),
    ('user:analytics', 'Аналитика организации', 'Доступ к статистике и аналитике организации', 'analytics', 'user', ARRAY['read']),
    ('user:export', 'Экспорт', 'Выгрузка данных в форматы Excel/PDF/CSV', 'export', 'user', ARRAY['read'])
ON CONFLICT (code) DO UPDATE SET 
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    actions = EXCLUDED.actions;
