import { Injectable } from '@nestjs/common';
import { HyperFormula, ConfigParams } from 'hyperformula';

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

@Injectable()
export class FormulaService {
  private engine: HyperFormula;

  constructor() {
    const config: Partial<ConfigParams> = {
      licenseKey: 'gpl-v3',
      useArrayArithmetic: true,
      useColumnIndex: true,
    };

    this.engine = HyperFormula.buildEmpty(config);
  }

  /**
   * Parse and validate formula syntax
   */
  parseFormula(formula: string): { valid: boolean; error?: string } {
    try {
      // Remove leading = if present
      const cleanFormula = formula.startsWith('=')
        ? formula.substring(1)
        : formula;

      // Pre-process: Replace [Something]! or [Ws]![Table]! with EXT! 
      // so HyperFormula thinks it's a normal sheet reference for validation purposes.
      const normalizedFormula = cleanFormula.replace(
        /\[[^\]]+\]!(\[[^\]]+\]!)?/g,
        'EXT!',
      );

      // Create two sheets: one for the formula (temp), one for external refs (EXT)
      // to avoid circular dependencies if someone writes something like =temp!A1
      const extSheetName = this.engine.addSheet('EXT');
      const extSheetId = this.engine.getSheetId(extSheetName);
      
      const sheetName = this.engine.addSheet('temp');
      const sheetId = this.engine.getSheetId(sheetName);

      if (sheetId === undefined || extSheetId === undefined) {
        return { valid: false, error: 'Failed to create validation sheets' };
      }

      this.engine.setCellContents({ sheet: sheetId, col: 0, row: 0 }, [
        [`=${normalizedFormula}`],
      ]);

      const cellValue = this.engine.getCellValue({
        sheet: sheetId,
        col: 0,
        row: 0,
      });

      // Clean up
      this.engine.removeSheet(sheetId);
      this.engine.removeSheet(extSheetId);

      // Check if result is an error (except #REF! because we use empty dummy sheet)
      if (cellValue && typeof cellValue === 'object' && 'type' in cellValue) {
        // We ignore REF errors because EXT sheet is empty
        if (cellValue.type !== 'REF') {
          return { valid: false, error: cellValue.type };
        }
      }

      return { valid: true };
    } catch (error) {
      return {
        valid: false,
        error: error instanceof Error ? error.message : 'Invalid formula',
      };
    }
  }

  /**
   * Evaluate formula with given cell data
   */
  evaluateFormula(
    formula: string,
    cells: Map<string, CellData>,
    currentRow: number,
    currentCol: number,
  ): string | number | boolean | null {
    try {
      // Create a temporary sheet
      const sheetName = this.engine.addSheet('calc');
      const sheetId = this.engine.getSheetId(sheetName);

      if (sheetId === undefined) {
        return '#ERROR';
      }

      // Populate cells
      const maxRow = Math.max(
        ...Array.from(cells.keys()).map((k) => parseInt(k.split(':')[0])),
        currentRow,
      );
      const maxCol = Math.max(
        ...Array.from(cells.keys()).map((k) => parseInt(k.split(':')[1])),
        currentCol,
      );

      for (let row = 0; row <= maxRow; row++) {
        for (let col = 0; col <= maxCol; col++) {
          const key = `${row}:${col}`;
          const cellData = cells.get(key);

          if (cellData) {
            if (cellData.formula) {
              this.engine.setCellContents({ sheet: sheetId, col, row }, [
                [
                  cellData.formula.startsWith('=')
                    ? cellData.formula
                    : `=${cellData.formula}`,
                ],
              ]);
            } else if (
              cellData.value !== undefined &&
              cellData.value !== null
            ) {
              this.engine.setCellContents({ sheet: sheetId, col, row }, [
                [cellData.value],
              ]);
            }
          }
        }
      }

      // Set the formula to evaluate
      const cleanFormula = formula.startsWith('=') ? formula : `=${formula}`;
      this.engine.setCellContents(
        { sheet: sheetId, col: currentCol, row: currentRow },
        [[cleanFormula]],
      );

      // Get the result
      const result = this.engine.getCellValue({
        sheet: sheetId,
        col: currentCol,
        row: currentRow,
      });

      // Clean up
      this.engine.removeSheet(sheetId);

      // Handle errors
      if (result && typeof result === 'object' && 'type' in result) {
        return `#${result.type}`;
      }

      return result as string | number | boolean | null;
    } catch (error) {
      return '#ERROR';
    }
  }

  /**
   * Extract cell references from formula
   */
  getDependencies(formula: string): CellReference[] {
    const dependencies: CellReference[] = [];

    // Simple regex to find cell references (A1, B2, etc.)
    // This is a simplified version - HyperFormula handles complex cases internally
    const cellRefPattern = /([A-Z]+)(\d+)/g;
    const cleanFormula = formula.startsWith('=')
      ? formula.substring(1)
      : formula;

    let match;
    while ((match = cellRefPattern.exec(cleanFormula)) !== null) {
      const col = this.columnToIndex(match[1]);
      const row = parseInt(match[2]) - 1; // Convert to 0-based
      dependencies.push({ row, col });
    }

    return dependencies;
  }

  /**
   * Extract external references like [Table]!A1 or [Workspace]![Table]!A1
   */
  getExternalDependencies(formula: string): ExternalDependency[] {
    const externals: ExternalDependency[] = [];
    
    // Pattern 1: [Workspace]![Table]!Range
    const crossWorkspacePattern = /\[([^\]]+)\]!\[([^\]]+)\]!(\$?[A-Z]+\$?(\d+)?(?::\$?[A-Z]+\$?(\d+)?)?)/g;
    
    // Pattern 2: [Table]!Range
    const localTablePattern = /\[([^\]]+)\]!(\$?[A-Z]+\$?(\d+)?(?::\$?[A-Z]+\$?(\d+)?)?)/g;

    const cleanFormula = formula.startsWith('=') ? formula : `=${formula}`;

    let match;
    
    // Check cross-workspace first to avoid partial matches by local pattern
    while ((match = crossWorkspacePattern.exec(cleanFormula)) !== null) {
      externals.push({
        fullReference: match[0],
        workspace: match[1],
        table: match[2],
        range: match[3],
      });
    }

    // Check local tables, making sure we don't duplicate cross-workspace ones
    while ((match = localTablePattern.exec(cleanFormula)) !== null) {
      // If the match is already part of a cross-workspace reference, skip it
      const isCross = externals.some(e => e.fullReference.includes(match![0]));
      if (!isCross) {
        externals.push({
          fullReference: match[0],
          table: match[1],
          range: match[2],
        });
      }
    }

    return externals;
  }

  /**
   * Convert column letter to index (A=0, B=1, etc.)
   */
  private columnToIndex(column: string): number {
    let index = 0;
    for (let i = 0; i < column.length; i++) {
      index = index * 26 + (column.charCodeAt(i) - 'A'.charCodeAt(0) + 1);
    }
    return index - 1;
  }

  /**
   * Convert index to column letter (0=A, 1=B, etc.)
   */
  columnToLetter(index: number): string {
    let letter = '';
    let num = index + 1;

    while (num > 0) {
      const remainder = (num - 1) % 26;
      letter = String.fromCharCode('A'.charCodeAt(0) + remainder) + letter;
      num = Math.floor((num - 1) / 26);
    }

    return letter;
  }

  /**
   * Build dependency graph for cells
   */
  buildDependencyGraph(cells: Map<string, CellData>): Map<string, string[]> {
    const graph = new Map<string, string[]>();

    for (const [key, cellData] of cells.entries()) {
      if (cellData.formula) {
        const deps = this.getDependencies(cellData.formula);
        const depKeys = deps.map((d) => `${d.row}:${d.col}`);
        graph.set(key, depKeys);
      }
    }

    return graph;
  }

  /**
   * Get calculation order using topological sort
   */
  getCalculationOrder(cells: Map<string, CellData>): string[] {
    const graph = this.buildDependencyGraph(cells);
    const visited = new Set<string>();
    const order: string[] = [];

    const visit = (key: string) => {
      if (visited.has(key)) return;
      visited.add(key);

      const deps = graph.get(key) || [];
      for (const dep of deps) {
        visit(dep);
      }

      order.push(key);
    };

    for (const key of cells.keys()) {
      if (cells.get(key)?.formula) {
        visit(key);
      }
    }

    return order;
  }
}
