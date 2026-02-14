-- Add 'read' permission to all role permissions that don't have it
-- This script updates the permissions JSONB column to include 'read' for each permission

DO $$
DECLARE
    role_record RECORD;
    updated_permissions JSONB;
    perm_key TEXT;
    perm_value JSONB;
BEGIN
    -- Loop through all roles
    FOR role_record IN SELECT id, code, permissions FROM rbac_roles LOOP
        updated_permissions := role_record.permissions;
        
        -- Loop through each permission in the role
        FOR perm_key, perm_value IN SELECT * FROM jsonb_each(role_record.permissions) LOOP
            -- Skip the wildcard permission
            IF perm_key = '*' THEN
                CONTINUE;
            END IF;
            
            -- Check if 'read' is not in the array
            IF NOT (perm_value ? 'read') THEN
                -- Add 'read' to the beginning of the array
                updated_permissions := jsonb_set(
                    updated_permissions,
                    ARRAY[perm_key],
                    jsonb_build_array('read') || perm_value
                );
                
                RAISE NOTICE 'Added read to % in role %', perm_key, role_record.code;
            END IF;
        END LOOP;
        
        -- Update the role with new permissions
        UPDATE rbac_roles 
        SET permissions = updated_permissions,
            updated_at = NOW()
        WHERE id = role_record.id;
        
        RAISE NOTICE 'Updated role: %', role_record.code;
    END LOOP;
END $$;

-- Verify the changes
SELECT code, name, permissions FROM rbac_roles ORDER BY code;
