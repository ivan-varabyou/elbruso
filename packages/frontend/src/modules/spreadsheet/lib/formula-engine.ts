import { 
  CellValue, 
  ConfigParams, 
  HyperFormula} from 'hyperformula';

import {Sheet } from '../types/spreadsheet.types';

export class FormulaEngine {
  private hf: HyperFormula;
  private sheetMap: Map<string, number> = new Map(); // id to HF sheet index

  constructor() {
    const config: Partial<ConfigParams> = {
      licenseKey: 'gpl-v3',
      useArrayArithmetic: true,
      useColumnIndex: true,
    };
    this.hf = HyperFormula.buildEmpty(config);
  }

  /**
   * Synchronizes engine state with current sheets data
   */
  public syncSheets(sheets: Sheet[]): void {
    // Current sheets in HF
    const currentHfSheets = this.hf.getSheetNames();
    
    // Add missing sheets
    for (const sheet of sheets) {
      if (!currentHfSheets.includes(sheet.name)) {
        this.hf.addSheet(sheet.name);
      }
      
      const sheetIndex = this.hf.getSheetId(sheet.name);
      if (sheetIndex !== undefined) {
        this.sheetMap.set(sheet.id, sheetIndex);
        
        // Load initial values/formulas
        if (sheet.cells) {
          const grid: CellValue[][] = [];
          // Fill grid with nulls first
          for (let r = 0; r < sheet.row_count; r++) {
            grid[r] = new Array(sheet.col_count).fill(null);
          }
          
          // Populate with data
          for (const cell of sheet.cells) {
            grid[cell.row_index][cell.col_index] = (cell.formula || cell.raw_value) as any;
          }
          
          this.hf.setSheetContent(sheetIndex, grid);
        }
      }
    }
  }

  public setCellValue(sheetId: string, row: number, col: number, value: any): void {
    const sheetIndex = this.sheetMap.get(sheetId);
    if (sheetIndex === undefined) return;
    
    this.hf.setCellContents({ sheet: sheetIndex, row, col }, [[value]]);
  }

  public getCellValue(sheetId: string, row: number, col: number): CellValue {
    const sheetIndex = this.sheetMap.get(sheetId);
    if (sheetIndex === undefined) return null;
    
    return this.hf.getCellValue({ sheet: sheetIndex, row, col });
  }

  public getCellFormula(sheetId: string, row: number, col: number): string | undefined {
    const sheetIndex = this.sheetMap.get(sheetId);
    if (sheetIndex === undefined) return undefined;
    
    return this.hf.getCellFormula({ sheet: sheetIndex, row, col });
  }

  public addSheet(name: string): number {
    return this.hf.addSheet(name);
  }

  public renameSheet(oldName: string, newName: string): void {
    this.hf.renameSheet(oldName, newName);
  }

  public destroy(): void {
    this.hf.destroy();
  }
}

export const formulaEngine = new FormulaEngine();
