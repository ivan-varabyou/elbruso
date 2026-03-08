-- Add access_level_id to rbac_roles
ALTER TABLE rbac_roles ADD COLUMN IF NOT EXISTS access_level_id INTEGER;

-- Add access_level_id to reference_metadata
ALTER TABLE reference_metadata ADD COLUMN IF NOT EXISTS access_level_id INTEGER;

-- Add foreign key constraints if possible (optional but good practice)
-- ALTER TABLE rbac_roles ADD CONSTRAINT fk_rbac_roles_access_level FOREIGN KEY (access_level_id) REFERENCES organization_levels(id);
-- ALTER TABLE reference_metadata ADD CONSTRAINT fk_reference_metadata_access_level FOREIGN KEY (access_level_id) REFERENCES organization_levels(id);

-- Note: We don't strictly enforce FB for flexibility in early stages, but we can set defaults.
