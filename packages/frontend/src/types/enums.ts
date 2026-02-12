// Shared Type Definitions - All Enums and Literal Types
export enum AdminRole {
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export type SystemEntityType = 'regions' | 'sports' | 'indicators' | 'indicator-groups' | 'organizations' | 'events' | 'seasons' | 'templates';

export type LinkType = 'vertical' | 'horizontal' | 'formula' | 'reference';
export type FontWeight = 'normal' | 'bold' | 'light' | 'medium' | 'semibold';
export type FontStyle = 'normal' | 'italic' | 'oblique';
export type TextAlign = 'left' | 'center' | 'right' | 'justify';
export type CellFormatType = 'number' | 'currency' | 'percentage' | 'date' | 'time' | 'datetime' | 'text' | 'boolean';
export type ColumnType = 'string' | 'number' | 'boolean' | 'date' | 'formula' | 'reference';
export type ValidationRuleType = 'required' | 'min' | 'max' | 'pattern' | 'custom' | 'unique';
export type ReferenceScope = 'global' | 'sport' | 'organization' | 'user';

// HyperFormula types
export interface FormulaAST {
  args: FormulaAST[];
  type: string;
  value?: string | number | boolean;
}

export interface FormulaState {
  sheet: number;
  row: number;
  col: number;
}

// Error types
export enum ErrorCode {
  NETWORK_ERROR = 'NETWORK_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  CONFLICT = 'CONFLICT',
  SERVER_ERROR = 'SERVER_ERROR',
}

export interface AppError {
  code: ErrorCode;
  message: string;
  details?: Record<string, unknown>;
  retryable: boolean;
}
