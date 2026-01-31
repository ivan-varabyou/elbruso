import type { CellFormatType, FontWeight, FontStyle, TextAlign } from "../../../types/enums";

export interface CellData {
  value?: unknown;
  formula?: string;
  format?: CellFormat;
  style?: CellStyle;
  validation?: ValidationResult;
  metadata?: Record<string, unknown>;
}

export interface CellFormat {
  type: CellFormatType;
  decimals?: number;
  currency?: string;
  dateFormat?: string;
  timeFormat?: string;
}

export interface CellStyle {
  backgroundColor?: string;
  textColor?: string;
  fontWeight?: FontWeight;
  fontStyle?: FontStyle;
  textAlign?: TextAlign;
  border?: BorderStyle;
  fontSize?: number;
  fontFamily?: string;
  textDecoration?: string;
}

export interface BorderStyle {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors?: string[];
}

export interface TableCell {
  id: string;
  version_id: string;
  row_index: number;
  col_index: number;
  cell_data: CellData;
  is_locked: boolean;
  locked_at?: string;
  locked_by?: string;
  lock_reason?: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
}

export interface MergedCell {
  id: string;
  version_id: string;
  start_row: number;
  start_col: number;
  end_row: number;
  end_col: number;
  cell_data: CellData;
  created_at: string;
}

export interface CellUpdate {
  row: number;
  col: number;
  data: CellData;
}
