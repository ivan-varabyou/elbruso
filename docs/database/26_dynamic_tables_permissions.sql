-- ================================
-- Блок 26: Система прав доступа для динамических таблиц
-- ================================
-- Многоуровневая система прав с поддержкой иерархии организаций

-- ================================
-- 1. РОЛИ
-- ================================

CREATE TABLE IF NOT EXISTS roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    
    -- Права роли
    permissions JSONB DEFAULT '{}'::jsonb,
    -- {
    --   "workspaces": {"create": true, "delete": false},
    --   "tables": {"create": true, "edit": true, "delete": false},
    --   "cells": {"edit": true, "lock": false},
    --   "formulas": {"edit": true, "protect": false},
    --   "permissions": {"manage": false}
    -- }
    
    is_system BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_roles_code ON roles(code);

COMMENT ON TABLE roles IS 'Роли пользователей с набором прав';

-- Базовые роли
INSERT INTO roles (code, name, description, permissions, is_system) VALUES
('system_admin', 'Системный администратор', 'Полный доступ ко всему', 
 '{"workspaces": {"create": true, "delete": true}, "tables": {"create": true, "edit": true, "delete": true}, "cells": {"edit": true, "lock": true}, "formulas": {"edit": true, "protect": true}, "permissions": {"manage": true}}'::jsonb, 
 TRUE),
 
('workspace_owner', 'Владелец workspace', 'Полный доступ к своему workspace',
 '{"workspaces": {"create": true, "delete": true}, "tables": {"create": true, "edit": true, "delete": true}, "cells": {"edit": true, "lock": true}, "formulas": {"edit": true, "protect": true}, "permissions": {"manage": true}}'::jsonb,
 TRUE),
 
('editor', 'Редактор', 'Может редактировать таблицы и ячейки',
 '{"workspaces": {"create": false, "delete": false}, "tables": {"create": true, "edit": true, "delete": false}, "cells": {"edit": true, "lock": false}, "formulas": {"edit": true, "protect": false}, "permissions": {"manage": false}}'::jsonb,
 TRUE),
 
('viewer', 'Наблюдатель', 'Только просмотр',
 '{"workspaces": {"create": false, "delete": false}, "tables": {"create": false, "edit": false, "delete": false}, "cells": {"edit": false, "lock": false}, "formulas": {"edit": false, "protect": false}, "permissions": {"manage": false}}'::jsonb,
 TRUE)
ON CONFLICT (code) DO NOTHING;

-- ================================
-- 2. ПРАВА НА WORKSPACE
-- ================================

CREATE TABLE IF NOT EXISTS workspace_permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    
    -- Субъект прав (один из трех)
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    organization_id INTEGER REFERENCES organizations(id) ON DELETE CASCADE,
    
    -- Уровень доступа
    permission_level VARCHAR(20) NOT NULL,  -- 'owner', 'editor', 'viewer'
    
    -- Дополнительные права
    can_share BOOLEAN DEFAULT FALSE,
    can_export BOOLEAN DEFAULT TRUE,
    can_create_tables BOOLEAN DEFAULT FALSE,
    
    -- Наследование прав
    inherit_to_tables BOOLEAN DEFAULT TRUE,
    
    granted_by UUID REFERENCES users(id) ON DELETE SET NULL,
    granted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    
    CONSTRAINT chk_wp_permission_level CHECK (permission_level IN ('owner', 'editor', 'viewer')),
    CONSTRAINT chk_wp_subject CHECK (
        (user_id IS NOT NULL AND role_id IS NULL AND organization_id IS NULL) OR
        (user_id IS NULL AND role_id IS NOT NULL AND organization_id IS NULL) OR
        (user_id IS NULL AND role_id IS NULL AND organization_id IS NOT NULL)
    )
);

CREATE INDEX idx_workspace_permissions_workspace ON workspace_permissions(workspace_id);
CREATE INDEX idx_workspace_permissions_user ON workspace_permissions(user_id);
CREATE INDEX idx_workspace_permissions_role ON workspace_permissions(role_id);
CREATE INDEX idx_workspace_permissions_organization ON workspace_permissions(organization_id);
CREATE INDEX idx_workspace_permissions_level ON workspace_permissions(permission_level);

COMMENT ON TABLE workspace_permissions IS 'Права доступа к workspace на уровне пользователя, роли или организации';
COMMENT ON COLUMN workspace_permissions.inherit_to_tables IS 'Наследовать права на все таблицы в workspace';

-- ================================
-- 3. ПРАВА НА ТАБЛИЦЫ
-- ================================

CREATE TABLE IF NOT EXISTS table_permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_id UUID NOT NULL REFERENCES dynamic_tables(id) ON DELETE CASCADE,
    
    -- Субъект прав
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    organization_id INTEGER REFERENCES organizations(id) ON DELETE CASCADE,
    
    -- Права
    can_read BOOLEAN DEFAULT TRUE,
    can_write BOOLEAN DEFAULT FALSE,
    can_delete BOOLEAN DEFAULT FALSE,
    can_lock_cells BOOLEAN DEFAULT FALSE,
    can_edit_formulas BOOLEAN DEFAULT FALSE,
    
    granted_by UUID REFERENCES users(id) ON DELETE SET NULL,
    granted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    
    CONSTRAINT chk_tp_subject CHECK (
        (user_id IS NOT NULL AND role_id IS NULL AND organization_id IS NULL) OR
        (user_id IS NULL AND role_id IS NOT NULL AND organization_id IS NULL) OR
        (user_id IS NULL AND role_id IS NULL AND organization_id IS NOT NULL)
    )
);

CREATE INDEX idx_table_permissions_table ON table_permissions(table_id);
CREATE INDEX idx_table_permissions_user ON table_permissions(user_id);
CREATE INDEX idx_table_permissions_role ON table_permissions(role_id);
CREATE INDEX idx_table_permissions_organization ON table_permissions(organization_id);

COMMENT ON TABLE table_permissions IS 'Права доступа к конкретным таблицам';

-- ================================
-- 4. ПРАВА НА ЯЧЕЙКИ (ДИАПАЗОНЫ)
-- ================================

CREATE TABLE IF NOT EXISTS cell_permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_id UUID NOT NULL REFERENCES dynamic_tables(id) ON DELETE CASCADE,
    
    -- Диапазон ячеек
    start_row INTEGER,
    end_row INTEGER,
    start_col INTEGER,
    end_col INTEGER,
    
    -- Субъект прав
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    organization_id INTEGER REFERENCES organizations(id) ON DELETE CASCADE,
    
    -- Права
    can_read BOOLEAN DEFAULT TRUE,
    can_write BOOLEAN DEFAULT FALSE,
    can_delete BOOLEAN DEFAULT FALSE,
    
    -- Условия доступа (опционально)
    access_condition JSONB,
    -- {
    --   "type": "region_match",
    --   "field": "region_id",
    --   "match": "user.organization.region_id"
    -- }
    
    granted_by UUID REFERENCES users(id) ON DELETE SET NULL,
    granted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    
    CONSTRAINT chk_cp_range CHECK (
        (start_row IS NULL AND end_row IS NULL AND start_col IS NULL AND end_col IS NULL) OR
        (start_row IS NOT NULL AND end_row IS NOT NULL AND start_col IS NOT NULL AND end_col IS NOT NULL AND
         start_row <= end_row AND start_col <= end_col)
    ),
    CONSTRAINT chk_cp_subject CHECK (
        (user_id IS NOT NULL AND role_id IS NULL AND organization_id IS NULL) OR
        (user_id IS NULL AND role_id IS NOT NULL AND organization_id IS NULL) OR
        (user_id IS NULL AND role_id IS NULL AND organization_id IS NOT NULL)
    )
);

CREATE INDEX idx_cell_permissions_table ON cell_permissions(table_id);
CREATE INDEX idx_cell_permissions_user ON cell_permissions(user_id);
CREATE INDEX idx_cell_permissions_role ON cell_permissions(role_id);
CREATE INDEX idx_cell_permissions_organization ON cell_permissions(organization_id);
CREATE INDEX idx_cell_permissions_range ON cell_permissions(table_id, start_row, end_row, start_col, end_col);

COMMENT ON TABLE cell_permissions IS 'Права доступа к диапазонам ячеек';
COMMENT ON COLUMN cell_permissions.access_condition IS 'Условия доступа (например, только к своему региону)';

-- ================================
-- 5. ФУНКЦИЯ: Проверка прав на workspace
-- ================================

CREATE OR REPLACE FUNCTION check_workspace_permission(
    p_workspace_id UUID,
    p_user_id UUID,
    p_required_level VARCHAR
)
RETURNS BOOLEAN LANGUAGE plpgsql AS $$
DECLARE
    v_user_org_id INTEGER;
    v_parent_org_id INTEGER;
    v_has_permission BOOLEAN := FALSE;
BEGIN
    -- Получаем организацию пользователя
    SELECT organization_id INTO v_user_org_id
    FROM users
    WHERE id = p_user_id;
    
    -- Проверяем прямые права пользователя
    SELECT EXISTS(
        SELECT 1 FROM workspace_permissions
        WHERE workspace_id = p_workspace_id
          AND user_id = p_user_id
          AND permission_level >= p_required_level
          AND (expires_at IS NULL OR expires_at > CURRENT_TIMESTAMP)
    ) INTO v_has_permission;
    
    IF v_has_permission THEN
        RETURN TRUE;
    END IF;
    
    -- Проверяем права организации
    SELECT EXISTS(
        SELECT 1 FROM workspace_permissions
        WHERE workspace_id = p_workspace_id
          AND organization_id = v_user_org_id
          AND permission_level >= p_required_level
          AND (expires_at IS NULL OR expires_at > CURRENT_TIMESTAMP)
    ) INTO v_has_permission;
    
    IF v_has_permission THEN
        RETURN TRUE;
    END IF;
    
    -- Проверяем права родительской организации
    SELECT parent_id INTO v_parent_org_id
    FROM organizations
    WHERE id = v_user_org_id;
    
    IF v_parent_org_id IS NOT NULL THEN
        SELECT EXISTS(
            SELECT 1 FROM workspace_permissions
            WHERE workspace_id = p_workspace_id
              AND organization_id = v_parent_org_id
              AND permission_level >= p_required_level
              AND (expires_at IS NULL OR expires_at > CURRENT_TIMESTAMP)
        ) INTO v_has_permission;
    END IF;
    
    RETURN v_has_permission;
END;
$$;

COMMENT ON FUNCTION check_workspace_permission IS 'Проверяет права пользователя на workspace с учетом иерархии организаций';

-- ================================
-- 6. ФУНКЦИЯ: Проверка прав на ячейку
-- ================================

CREATE OR REPLACE FUNCTION check_cell_permission(
    p_table_id UUID,
    p_row INTEGER,
    p_col INTEGER,
    p_user_id UUID,
    p_permission_type VARCHAR  -- 'read', 'write', 'delete'
)
RETURNS BOOLEAN LANGUAGE plpgsql AS $$
DECLARE
    v_user_org_id INTEGER;
    v_has_permission BOOLEAN := FALSE;
    v_workspace_id UUID;
BEGIN
    -- Получаем workspace_id таблицы
    SELECT workspace_id INTO v_workspace_id
    FROM dynamic_tables
    WHERE id = p_table_id;
    
    -- Проверяем права на workspace
    IF check_workspace_permission(v_workspace_id, p_user_id, 'editor') THEN
        RETURN TRUE;
    END IF;
    
    -- Получаем организацию пользователя
    SELECT organization_id INTO v_user_org_id
    FROM users
    WHERE id = p_user_id;
    
    -- Проверяем права на ячейку
    SELECT EXISTS(
        SELECT 1 FROM cell_permissions
        WHERE table_id = p_table_id
          AND (
              (start_row IS NULL) OR 
              (p_row >= start_row AND p_row <= end_row AND p_col >= start_col AND p_col <= end_col)
          )
          AND (user_id = p_user_id OR organization_id = v_user_org_id)
          AND (
              (p_permission_type = 'read' AND can_read = TRUE) OR
              (p_permission_type = 'write' AND can_write = TRUE) OR
              (p_permission_type = 'delete' AND can_delete = TRUE)
          )
          AND (expires_at IS NULL OR expires_at > CURRENT_TIMESTAMP)
    ) INTO v_has_permission;
    
    RETURN v_has_permission;
END;
$$;

COMMENT ON FUNCTION check_cell_permission IS 'Проверяет права пользователя на конкретную ячейку';

-- ================================
-- 7. ПРЕДСТАВЛЕНИЕ: Права пользователя
-- ================================

CREATE OR REPLACE VIEW v_user_permissions AS
SELECT 
    u.id as user_id,
    u.email,
    u.name as user_name,
    o.name_ru as organization_name,
    
    -- Workspace permissions
    wp.workspace_id,
    w.name as workspace_name,
    wp.permission_level as workspace_permission,
    wp.can_share,
    wp.can_export,
    wp.can_create_tables,
    
    -- Table permissions
    tp.table_id,
    dt.name as table_name,
    tp.can_read as table_can_read,
    tp.can_write as table_can_write,
    tp.can_delete as table_can_delete
    
FROM users u
LEFT JOIN organizations o ON o.id = u.organization_id
LEFT JOIN workspace_permissions wp ON wp.user_id = u.id
LEFT JOIN workspaces w ON w.id = wp.workspace_id
LEFT JOIN table_permissions tp ON tp.user_id = u.id
LEFT JOIN dynamic_tables dt ON dt.id = tp.table_id
WHERE u.is_active = TRUE;

COMMENT ON VIEW v_user_permissions IS 'Все права пользователей';

-- ================================
-- ПРИМЕРЫ ИСПОЛЬЗОВАНИЯ
-- ================================

-- Пример 1: Выдать права организации на workspace
/*
INSERT INTO workspace_permissions (
    workspace_id,
    organization_id,
    permission_level,
    can_share,
    can_create_tables,
    granted_by
) VALUES (
    'workspace-uuid',
    (SELECT id FROM organizations WHERE internal_code = 'RFB'),  -- РФБ
    'editor',
    TRUE,
    TRUE,
    'admin-user-uuid'
);
*/

-- Пример 2: Выдать права региональной федерации только на свои строки
/*
INSERT INTO cell_permissions (
    table_id,
    start_row,
    end_row,
    start_col,
    end_col,
    organization_id,
    can_read,
    can_write,
    access_condition,
    granted_by
) VALUES (
    'table-uuid',
    0,
    84,  -- Все строки
    0,
    10,  -- Все колонки
    (SELECT id FROM organizations WHERE internal_code = 'RFB_IRK'),  -- Иркутская область
    TRUE,
    TRUE,
    '{"type": "region_match", "field": "region_id", "match": "user.organization.region_id"}'::jsonb,
    'admin-user-uuid'
);
*/

-- Пример 3: Головная организация выдает права дочерним
/*
-- РФБ (головная) выдает права всем региональным федерациям
INSERT INTO workspace_permissions (
    workspace_id,
    organization_id,
    permission_level,
    can_create_tables,
    granted_by
)
SELECT 
    'workspace-uuid',
    o.id,
    'editor',
    FALSE,
    'rfb-admin-uuid'
FROM organizations o
WHERE o.parent_id = (SELECT id FROM organizations WHERE internal_code = 'RFB')
  AND o.type_id = (SELECT id FROM organization_types WHERE code = 'federation_regional');
*/

COMMENT ON TABLE workspace_permissions IS 
'Права доступа к workspace.
Поддерживает 3 типа субъектов:
1. user_id - конкретный пользователь
2. role_id - все пользователи с ролью
3. organization_id - все пользователи организации

Уровни доступа:
- owner: полный контроль
- editor: редактирование
- viewer: только просмотр

Наследование: права на workspace могут наследоваться на все таблицы';

COMMENT ON TABLE table_permissions IS 
'Права доступа к конкретным таблицам.
Переопределяют права workspace для конкретной таблицы';

COMMENT ON TABLE cell_permissions IS 
'Права доступа к диапазонам ячеек.
Самый гранулярный уровень прав.
Поддерживает условный доступ (например, только к своему региону)';
