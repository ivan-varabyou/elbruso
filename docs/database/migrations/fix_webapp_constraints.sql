-- Migration: Update RBAC schema to use 'webapp' instead of 'user'
-- Run this script to fix the database constraint error

-- 1. Update rbac_permissions table constraint
ALTER TABLE rbac_permissions DROP CONSTRAINT IF EXISTS rbac_permissions_app_type_check;
ALTER TABLE rbac_permissions ADD CONSTRAINT rbac_permissions_app_type_check CHECK (app_type IN ('admin', 'webapp', 'both'));

-- 2. Update rbac_roles table constraint
ALTER TABLE rbac_roles DROP CONSTRAINT IF EXISTS rbac_roles_type_check;
ALTER TABLE rbac_roles ADD CONSTRAINT rbac_roles_type_check CHECK (type IN ('admin', 'webapp'));

-- 3. Update any existing 'user' values to 'webapp' in rbac_permissions
UPDATE rbac_permissions SET app_type = 'webapp' WHERE app_type = 'user';

-- 4. Update any existing 'user' values to 'webapp' in rbac_roles
UPDATE rbac_roles SET type = 'webapp' WHERE type = 'user';

-- 5. Update any existing 'user' values to 'webapp' in rbac_user_roles (already has correct constraint)
-- No update needed, this table already uses 'webapp'

-- Verify the changes
SELECT 'rbac_permissions' as table_name, app_type, count(*) FROM rbac_permissions GROUP BY app_type
UNION ALL
SELECT 'rbac_roles' as table_name, type, count(*) FROM rbac_roles GROUP BY type;
