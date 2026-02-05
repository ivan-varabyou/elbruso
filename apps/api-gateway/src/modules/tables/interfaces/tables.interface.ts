export interface TableCreationParams {
  workspaceId: string;
  name: string;
  description?: string;
  groupId?: string;
  initialRows?: number;
  initialColumns?: number;
}

export interface TableUpdateParams {
  name?: string;
  description?: string;
  groupId?: string | null;
}

export interface CellUpdateParams {
  rowIndex: number;
  colIndex: number;
  cellData: {
    value?: string | number | boolean | null;
    formula?: string;
    type?: 'string' | 'number' | 'boolean' | 'formula';
    format?: Record<string, unknown>;
  };
}

export interface VersionCreationParams {
  columnDefinitions: {
    name: string;
    type: 'string' | 'number' | 'boolean' | 'date';
    width?: number;
  }[];
  copyDataFromVersion?: string;
}

export interface LinkCreationParams {
  sourceTableId?: string;
  sourceSystemEntity?: string;
  linkType:
    | 'cell_reference'
    | 'lookup_reference'
    | 'aggregation'
    | 'shared_keys';
  metadata?: {
    sourceColumn?: string;
    targetColumn?: string;
    mappings?: {
      sourceField: string;
      targetColIndex: number;
    }[];
    filter?: Record<string, any>;
  };
}

export interface MatrixFormulaParams {
  range: string;
  formula: string;
  step?: number;
}

export interface DonorStatusResult {
  linkId: string;
  source: string;
  status: 'up_to_date' | 'outdated';
  lastUpdated?: Date;
}
