export interface ColumnDef {
  key: string;
  label: string;
  type: 'string' | 'number' | 'boolean' | 'date';
  required: boolean;
  editable: boolean;
  placeholder?: string;
  description?: string;
  defaultValue?: string;
  relation?: {
    table: string;
    labelField: string;
  };
}
