export enum SpreadsheetStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export enum SpreadsheetType {
  TABLE = 'table',
  REFERENCE = 'reference',
  INDICATOR = 'indicator',
  CUSTOM_REFERENCE = 'custom_reference',
}

export enum DataSourceType {
  REFERENCE = 'reference',
  INDICATOR = 'indicator',
  MANUAL = 'manual',
}

export interface CellStyle {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  fontSize?: number;
  color?: string;
  backgroundColor?: string;
  textAlign?: 'left' | 'center' | 'right';
  borderTop?: string;
  borderRight?: string;
  borderBottom?: string;
  borderLeft?: string;
}

export interface CellData {
  id: string;
  sheet_id: string;
  row_index: number;
  col_index: number;
  raw_value: string | null;
  computed_value: string | null;
  formula: string | null;
  value_type: 'text' | 'number' | 'date' | 'boolean' | 'formula' | 'error';
  style: CellStyle;
  is_locked: boolean;
  lock_reason: string | null;
}

export interface MergedRegion {
  id: string;
  sheet_id: string;
  start_row: number;
  start_col: number;
  end_row: number;
  end_col: number;
}

export interface ColumnConfig {
  id: string;
  sheet_id: string;
  col_index: number;
  header_name: string | null;
  width: number;
  data_type: 'text' | 'number' | 'date' | 'reference' | 'indicator';
  data_source_id: string | null;
  data_source_column: string | null;
  validation: Record<string, unknown>;
}

export interface Sheet {
  id: string;
  spreadsheet_id: string;
  name: string;
  sort_order: number;
  row_count: number;
  col_count: number;
  settings: Record<string, unknown>;
  cells?: CellData[];
  merged_regions?: MergedRegion[];
  column_configs?: ColumnConfig[];
}

export interface Spreadsheet {
  id: string;
  name: string;
  description: string | null;
  status: SpreadsheetStatus;
  type: SpreadsheetType;
  workspace_id: string | null;
  group_id: string | null;
  is_template: boolean;
  organization_id: number | null;
  sport_id: number | null;
  metadata: Record<string, unknown>;
  sheets?: Sheet[];
  created_at: string;
  updated_at: string;
}

export interface DataSource {
  id: string;
  source_type: DataSourceType;
  source_key: string;
  display_column: string | null;
  value_column: string | null;
  config: Record<string, unknown>;
}
