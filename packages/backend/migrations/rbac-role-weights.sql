-- Set weights for system roles (using lowercase codes as found in DB)
UPDATE rbac_roles SET weight = 100 WHERE code = 'super_admin';
UPDATE rbac_roles SET weight = 80 WHERE code = 'admin';
UPDATE rbac_roles SET weight = 60 WHERE code = 'manager';
UPDATE rbac_roles SET weight = 40 WHERE code = 'moderator';
UPDATE rbac_roles SET weight = 20 WHERE code = 'owner';
UPDATE rbac_roles SET weight = 0 WHERE code = 'viewer';
