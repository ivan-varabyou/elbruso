-- Migration: SpreadsheetEngine — new tables from scratch
-- Date: 2026-03-02

-- 1. Spreadsheets (top-level entity, like a Google Sheets document)
CREATE TABLE IF NOT EXISTS spreadsheets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'draft', -- draft, published, archived
  organization_id INTEGER REFERENCES organizations(id),
  sport_id INTEGER REFERENCES sports(id),
  metadata JSONB DEFAULT '{}',
  created_by VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_spreadsheets_status ON spreadsheets(status);
CREATE INDEX idx_spreadsheets_org ON spreadsheets(organization_id);
CREATE INDEX idx_spreadsheets_sport ON spreadsheets(sport_id);

COMMENT ON TABLE spreadsheets IS 'Spreadsheet documents (analogous to Google Sheets files)';
COMMENT ON COLUMN spreadsheets.status IS 'draft — only admins see; published — available to users; archived — hidden';

-- 2. Sheets (tabs inside a spreadsheet)
CREATE TABLE IF NOT EXISTS spreadsheet_sheets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  spreadsheet_id UUID NOT NULL REFERENCES spreadsheets(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL DEFAULT 'Лист 1',
  sort_order INTEGER NOT NULL DEFAULT 0,
  row_count INTEGER NOT NULL DEFAULT 100,
  col_count INTEGER NOT NULL DEFAULT 26,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ss_sheets_spreadsheet ON spreadsheet_sheets(spreadsheet_id);

COMMENT ON TABLE spreadsheet_sheets IS 'Sheets (tabs) within a spreadsheet';

-- 3. Cells (individual cell data)
CREATE TABLE IF NOT EXISTS spreadsheet_cells (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sheet_id UUID NOT NULL REFERENCES spreadsheet_sheets(id) ON DELETE CASCADE,
  row_index INTEGER NOT NULL,
  col_index INTEGER NOT NULL,
  raw_value TEXT,              -- raw user input (formula or value)
  computed_value TEXT,         -- computed result (for formula cells)
  formula TEXT,                -- formula string (e.g. =SUM(A1:A10))
  value_type VARCHAR(20) NOT NULL DEFAULT 'text', -- text, number, date, boolean, formula, error
  style JSONB DEFAULT '{}',   -- font, color, alignment, borders
  is_locked BOOLEAN DEFAULT false,
  lock_reason VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(sheet_id, row_index, col_index)
);

CREATE INDEX idx_ss_cells_sheet ON spreadsheet_cells(sheet_id);
CREATE INDEX idx_ss_cells_position ON spreadsheet_cells(sheet_id, row_index, col_index);

COMMENT ON TABLE spreadsheet_cells IS 'Cell data within a sheet';

-- 4. Merged regions (combined cells)
CREATE TABLE IF NOT EXISTS spreadsheet_merged_regions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sheet_id UUID NOT NULL REFERENCES spreadsheet_sheets(id) ON DELETE CASCADE,
  start_row INTEGER NOT NULL,
  start_col INTEGER NOT NULL,
  end_row INTEGER NOT NULL,
  end_col INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ss_merged_sheet ON spreadsheet_merged_regions(sheet_id);

COMMENT ON TABLE spreadsheet_merged_regions IS 'Merged cell regions within a sheet';

-- 5. Column configurations (data type, width, data source binding)
CREATE TABLE IF NOT EXISTS spreadsheet_column_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sheet_id UUID NOT NULL REFERENCES spreadsheet_sheets(id) ON DELETE CASCADE,
  col_index INTEGER NOT NULL,
  header_name VARCHAR(255),
  width INTEGER DEFAULT 120,
  data_type VARCHAR(30) NOT NULL DEFAULT 'text', -- text, number, date, reference, indicator
  data_source_id UUID,        -- FK to spreadsheet_data_sources
  data_source_column VARCHAR(255), -- which column from data source to display
  validation JSONB DEFAULT '{}', -- min, max, required, regex, allowed_values
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(sheet_id, col_index)
);

CREATE INDEX idx_ss_col_config_sheet ON spreadsheet_column_configs(sheet_id);

COMMENT ON TABLE spreadsheet_column_configs IS 'Column-level configuration: data type, width, data source binding';

-- 6. Data sources (unified reference/indicator binding)
CREATE TABLE IF NOT EXISTS spreadsheet_data_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_type VARCHAR(30) NOT NULL, -- reference, indicator
  source_key VARCHAR(255) NOT NULL, -- table_key for references, indicator code for indicators
  display_column VARCHAR(255),      -- column to show in dropdown
  value_column VARCHAR(255),        -- column to use as value
  config JSONB DEFAULT '{}',        -- extra configuration
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ss_data_sources_type ON spreadsheet_data_sources(source_type);
CREATE INDEX idx_ss_data_sources_key ON spreadsheet_data_sources(source_key);

COMMENT ON TABLE spreadsheet_data_sources IS 'Unified data sources for reference tables and indicators';

-- Add FK from column_configs to data_sources
ALTER TABLE spreadsheet_column_configs
  ADD CONSTRAINT fk_ss_col_config_data_source
  FOREIGN KEY (data_source_id) REFERENCES spreadsheet_data_sources(id) ON DELETE SET NULL;
