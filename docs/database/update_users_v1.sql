-- Migration: Update users table with profile fields and roles, and fix dependent views
DO $$ 
BEGIN 
    -- 1. Add new columns
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='first_name') THEN
        ALTER TABLE users ADD COLUMN first_name VARCHAR(255);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='last_name') THEN
        ALTER TABLE users ADD COLUMN last_name VARCHAR(255);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='middle_name') THEN
        ALTER TABLE users ADD COLUMN middle_name VARCHAR(255);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='role') THEN
        ALTER TABLE users ADD COLUMN role VARCHAR(50) DEFAULT 'USER';
    END IF;

    -- 2. Migrate data from 'name' to 'first_name' and 'last_name'
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='name') THEN
        UPDATE users 
        SET 
            first_name = COALESCE(NULLIF(SPLIT_PART(name, ' ', 1), ''), 'User'),
            last_name = CASE 
                WHEN POSITION(' ' IN name) > 0 THEN SUBSTRING(name FROM POSITION(' ' IN name) + 1)
                ELSE ''
            END
        WHERE first_name IS NULL OR first_name = '';
    END IF;

END $$;

-- 3. Drop dependent views
DROP VIEW IF EXISTS v_user_activity CASCADE;
DROP VIEW IF EXISTS v_table_recent_changes CASCADE;
DROP VIEW IF EXISTS v_pages_with_stats CASCADE;
DROP VIEW IF EXISTS v_popular_charts CASCADE;
DROP VIEW IF EXISTS v_user_permissions CASCADE;

-- 4. Drop 'name' column
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='name') THEN
        ALTER TABLE users DROP COLUMN name;
    END IF;
END $$;

-- 5. Recreate views using new columns
CREATE OR REPLACE VIEW v_user_activity AS
  SELECT u.email,
     CONCAT_WS(' ', u.first_name, u.last_name) AS user_name,
     'cell_change'::text AS activity_type,
     ch.action,
     dt.name AS table_name,
     ch.row_index,
     ch.col_index,
     ch.changed_at,
     ch.change_reason
    FROM cell_history ch
      JOIN users u ON u.id = ch.changed_by
      JOIN table_versions tv ON tv.id = ch.version_id
      JOIN dynamic_tables dt ON dt.id = tv.table_id
 UNION ALL
  SELECT u.email,
     CONCAT_WS(' ', u.first_name, u.last_name) AS user_name,
     'formula_change'::text AS activity_type,
     fh.action,
     dt.name AS table_name,
     fh.start_row AS row_index,
     fh.start_col AS col_index,
     fh.changed_at,
     fh.change_reason
    FROM formula_history fh
      JOIN users u ON u.id = fh.changed_by
      JOIN table_versions tv ON tv.id = fh.version_id
      JOIN dynamic_tables dt ON dt.id = tv.table_id
   ORDER BY 8 DESC;

CREATE OR REPLACE VIEW v_table_recent_changes AS
  SELECT dt.id AS table_id,
     dt.name AS table_name,
     'cell'::text AS change_type,
     ch.action,
     ch.row_index,
     ch.col_index,
     CONCAT_WS(' ', u.first_name, u.last_name) AS changed_by_name,
     ch.changed_at
    FROM dynamic_tables dt
      JOIN table_versions tv ON tv.table_id = dt.id
      JOIN cell_history ch ON ch.version_id = tv.id
      JOIN users u ON u.id = ch.changed_by
 UNION ALL
  SELECT dt.id AS table_id,
     dt.name AS table_name,
     'formula'::text AS change_type,
     fh.action,
     fh.start_row AS row_index,
     fh.start_col AS col_index,
     CONCAT_WS(' ', u.first_name, u.last_name) AS changed_by_name,
     fh.changed_at
    FROM dynamic_tables dt
      JOIN table_versions tv ON tv.table_id = dt.id
      JOIN formula_history fh ON fh.version_id = tv.id
      JOIN users u ON u.id = fh.changed_by
   ORDER BY 8 DESC
  LIMIT 100;

CREATE OR REPLACE VIEW v_pages_with_stats AS
  SELECT p.id,
     p.workspace_id,
     p.parent_page_id,
     p.title,
     p.icon,
     p.cover_image,
     p.page_type,
     p.is_public,
     p.public_url,
     p.public_password,
     p.metadata,
     p.created_by,
     p.created_at,
     p.updated_by,
     p.updated_at,
     p.sort_order,
     p.view_count,
     p.last_viewed_at,
     count(DISTINCT b.id) AS block_count,
     count(DISTINCT
         CASE
             WHEN b.block_type::text = 'chart'::text THEN b.id
             ELSE NULL::uuid
         END) AS chart_count,
     CONCAT_WS(' ', u.first_name, u.last_name) AS created_by_name
    FROM pages p
      LEFT JOIN blocks b ON b.page_id = p.id
      LEFT JOIN users u ON u.id = p.created_by
   GROUP BY p.id, u.first_name, u.last_name;

CREATE OR REPLACE VIEW v_popular_charts AS
  SELECT c.id,
     c.workspace_id,
     c.name,
     c.description,
     c.data_source_type,
     c.data_source_id,
     c.chart_type,
     c.config,
     c.cached_data,
     c.cache_updated_at,
     c.cache_ttl,
     c.created_by,
     c.created_at,
     c.updated_by,
     c.updated_at,
     count(DISTINCT bc.block_id) AS usage_count,
     CONCAT_WS(' ', u.first_name, u.last_name) AS created_by_name
    FROM charts c
      LEFT JOIN block_charts bc ON bc.chart_id = c.id
      LEFT JOIN users u ON u.id = c.created_by
   GROUP BY c.id, u.first_name, u.last_name
   ORDER BY (count(DISTINCT bc.block_id)) DESC;

CREATE OR REPLACE VIEW v_user_permissions AS
  SELECT u.id AS user_id,
     u.email,
     CONCAT_WS(' ', u.first_name, u.last_name) AS user_name,
     o.name_ru AS organization_name,
     wp.workspace_id,
     w.name AS workspace_name,
     wp.permission_level AS workspace_permission,
     wp.can_share,
     wp.can_export,
     wp.can_create_tables,
     tp.table_id,
     dt.name AS table_name,
     tp.can_read AS table_can_read,
     tp.can_write AS table_can_write,
     tp.can_delete AS table_can_delete
    FROM users u
      LEFT JOIN organizations o ON o.id = u.organization_id
      LEFT JOIN workspace_permissions wp ON wp.user_id = u.id
      LEFT JOIN workspaces w ON w.id = wp.workspace_id
      LEFT JOIN table_permissions tp ON tp.user_id = u.id
      LEFT JOIN dynamic_tables dt ON dt.id = tp.table_id
   WHERE u.is_active = true;

-- Final touch: make sure at least one user is admin
UPDATE users SET role = 'ADMIN' WHERE id IN (SELECT id FROM users LIMIT 1);
