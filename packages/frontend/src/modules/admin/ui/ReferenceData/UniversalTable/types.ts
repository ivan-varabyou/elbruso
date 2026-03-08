/**
 * Shared types for the Universal Reference Table system.
 * These mirror the backend's `ColumnMeta` / `TableConfig` types.
 * The frontend receives these from the API — do not maintain a local copy.
 */

export interface ReferenceColumnMeta {
  key: string;
  label: string;
  type: "string" | "number" | "boolean" | "date";
  required?: boolean;
  editable?: boolean;
  hidden?: boolean;
  relation?: {
    /** Key in the reference tables registry */
    table: string;
    /** Field whose value is shown as the label */
    labelField: string;
  };
  /** Rendering hint for special formats */
  format?: "date" | "flag" | "select" | "boolean" | "enum";
  /** Options for enum-formatted fields */
  options?: Record<string, string>;
  /** Optional UI hint */
  placeholder?: string;
  /** Optional UI hint */
  description?: string;
}

export interface ReferenceTableConfig {
  tableKey: string;
  label: string;
  hasIsActive: boolean;
  hasIsSystem: boolean;
  hasSortOrder: boolean;
  hasNameEn?: boolean;
  permissionCode?: string;
  type?: "system" | "user";
  columns: ReferenceColumnMeta[];
}
