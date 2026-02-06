export declare class CreateTableDto {
    name: string;
    description?: string;
    groupId?: string;
    initialRows?: number;
    initialColumns?: number;
}
export declare class UpdateTableDto {
    name?: string;
    description?: string;
    groupId?: string | null;
}
export declare class ColumnDefinition {
    name: string;
    type: string;
    width?: number;
}
export declare class CreateVersionDto {
    columnDefinitions: ColumnDefinition[];
    copyDataFromVersion?: string;
}
export declare class CellDataDto {
    value?: string | number | boolean | null;
    formula?: string;
    type?: string;
    format?: Record<string, unknown>;
}
export declare class UpdateCellDto {
    rowIndex: number;
    colIndex: number;
    cellData: CellDataDto;
}
export declare class BatchCellUpdate {
    rowIndex: number;
    colIndex: number;
    cellData: CellDataDto;
}
export declare class BatchUpdateCellsDto {
    cells: BatchCellUpdate[];
}
export declare class GetCellsQueryDto {
    startRow?: number;
    endRow?: number;
    startCol?: number;
    endCol?: number;
}
export declare class LinkFieldMapping {
    sourceField: string;
    targetColIndex: number;
}
export declare class LinkMetadata {
    sourceColumn?: string;
    targetColumn?: string;
    mappings?: LinkFieldMapping[];
    filter?: Record<string, any>;
}
export declare class CreateLinkDto {
    sourceTableId?: string;
    sourceSystemEntity?: string;
    linkType: string;
    metadata?: LinkMetadata;
}
export declare class MatrixFormulaDto {
    range: string;
    formula: string;
    step?: number;
}
