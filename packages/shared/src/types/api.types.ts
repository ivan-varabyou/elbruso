import type { CellData, ColumnDefinition, CellRange, LinkMetadata, SystemEntityType, LinkType, ReferenceScope } from './index';


// Cell operations
export interface CellUpdate {
  row: number;
  col: number;
  data: CellData;
}

export interface BatchUpdateResponse {
  updatedCount: number;
}

// Table DTOs
export interface CreateTableDto {
  name: string;
  description?: string;
  groupId?: string;
  initialRows?: number;
  initialColumns?: number;
}

export interface UpdateTableDto {
  name?: string;
  description?: string;
  groupId?: string;
}

// Version DTOs
export interface CreateVersionDto {
  columnDefinitions: ColumnDefinition[];
  copyDataFromVersion?: string;
  changeDescription?: string;
}

// Cell DTOs
export interface UpdateCellDto {
  rowIndex: number;
  colIndex: number;
  cellData: CellData;
}

export interface GetCellsQueryDto {
  startRow?: number;
  endRow?: number;
  startCol?: number;
  endCol?: number;
}

// Link DTOs
export interface CreateLinkDto {
  sourceTableId?: string;
  sourceSystemEntity?: SystemEntityType;
  linkType: LinkType;
  metadata?: LinkMetadata;
}

// Formula DTOs
export interface MatrixFormulaDto {
  range: CellRange;
  formula: string;
  description?: string;
}

// Reference DTOs
export interface ReferenceFilter {
  country_id?: string;
  sport_id?: string;
  organization_id?: string;
  search?: string;
  scope?: string;
}


export interface CreateReferenceDto {
  type: SystemEntityType;
  scope: ReferenceScope;
  sport_id?: string;
  organization_id?: string;
  data: unknown[];
}

export interface UpdateReferenceDto {
  data?: unknown[];
  is_active?: boolean;
}
