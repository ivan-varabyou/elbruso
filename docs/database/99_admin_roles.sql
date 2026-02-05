-- Admin Roles Table
CREATE TABLE IF NOT EXISTS admin_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    permissions JSONB NOT NULL DEFAULT '[]',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Add role_id to admin_users
ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS role_id UUID REFERENCES admin_roles(id);

-- Seed default roles
INSERT INTO admin_roles (name, description, permissions) VALUES
    ('super_admin', 'Полный доступ', '["*"]'),
    ('admin', 'Администратор', '["users:*", "roles:read", "settings:read"]'),
    ('moderator', 'Модератор', '["users:read", "roles:read"]')
ON CONFLICT (name) DO NOTHING;

-- Update existing admin to super_admin role
UPDATE admin_users
SET role_id = (SELECT id FROM admin_roles WHERE name = 'super_admin' LIMIT 1)
WHERE role_id IS NULL;
