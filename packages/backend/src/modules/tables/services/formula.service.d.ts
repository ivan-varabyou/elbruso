export interface CellData {
    value?: string | number | boolean | null;
    formula?: string;
    type?: 'string' | 'number' | 'boolean' | 'formula';
}
export interface CellReference {
    row: number;
    col: number;
}
export interface ExternalDependency {
    fullReference: string;
    workspace?: string;
    table: string;
    range: string;
}
export declare class FormulaService {
    private engine;
    constructor();
    parseFormula(formula: string): {
        valid: boolean;
        error?: string;
    };
    evaluateFormula(formula: string, cells: Map<string, CellData>, currentRow: number, currentCol: number): string | number | boolean | null;
    getDependencies(formula: string): CellReference[];
    getExternalDependencies(formula: string): ExternalDependency[];
    private columnToIndex;
    columnToLetter(index: number): string;
    buildDependencyGraph(cells: Map<string, CellData>): Map<string, string[]>;
    getCalculationOrder(cells: Map<string, CellData>): string[];
}
