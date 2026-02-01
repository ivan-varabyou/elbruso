import type { ColumnType,ValidationRuleType } from "../../../types/enums";

export interface DynamicTable {
  id: string;
  workspace_id: string;
  group_id?: string;
  name: string;
  description?: string;
  is_active: boolean;
  is_reference: boolean;
  reference_type?: string;
  row_count: number;
  column_count: number;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  created_by: string;
  activeVersion?: TableVersion;
}

export interface TableVersion {
  id: string;
  table_id: string;
  version_number: number;
  columns: ColumnDefinition[];
  column_definitions?: Record<string, unknown>;
  matrix_formulas?: MatrixFormula[];
  is_active: boolean;
  is_frozen: boolean;
  frozen_at?: string;
  change_description?: string;
  created_at: string;
  created_by: string;
}

export interface ColumnDefinition {
  name: string;
  type: ColumnType;
  width: number;
  editable?: boolean;
  frozen?: boolean;
  format?: string;
  validation?: ValidationRule;
}

export interface ValidationRule {
  type: ValidationRuleType;
  value: unknown;
  message: string;
}

export interface MatrixFormula {
  range: CellRange;
  formula: string;
  description?: string;
}

export interface CellRange {
  startRow: number;
  startCol: number;
  endRow: number;
  endCol: number;
}
