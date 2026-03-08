-- Workspace and Spreadsheet Integration
-- Add type, workspace_id, and group_id to spreadsheets table

-- Add columns to spreadsheets
ALTER TABLE spreadsheets ADD COLUMN type VARCHAR(50) DEFAULT 'table' NOT NULL;
ALTER TABLE spreadsheets ADD COLUMN workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE;
ALTER TABLE spreadsheets ADD COLUMN group_id UUID REFERENCES workspace_groups(id) ON DELETE SET NULL;
ALTER TABLE spreadsheets ADD COLUMN is_template BOOLEAN DEFAULT false NOT NULL;

-- Create index for faster filtering
CREATE INDEX idx_spreadsheets_workspace_id ON spreadsheets(workspace_id);
CREATE INDEX idx_spreadsheets_group_id ON spreadsheets(group_id);
CREATE INDEX idx_spreadsheets_type ON spreadsheets(type);

-- Add comments for documentation
COMMENT ON COLUMN spreadsheets.type IS 'Entity type: table, reference, indicator, custom_reference';
COMMENT ON COLUMN spreadsheets.is_template IS 'Whether this spreadsheet is a template for copying';
