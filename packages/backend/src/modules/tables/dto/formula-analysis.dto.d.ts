export declare class AnalyzeFormulaDto {
    formula: string;
    workspaceId: string;
}
export declare class ExternalRefResponse {
    fullReference: string;
    workspaceId?: string;
    tableId: string;
    tableName: string;
    range: string;
    hasAccess: boolean;
}
export declare class FormulaAnalysisResponse {
    valid: boolean;
    error?: string;
    externalDependencies: ExternalRefResponse[];
}
