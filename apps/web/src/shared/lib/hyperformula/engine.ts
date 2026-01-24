import { HyperFormula, ConfigParams, CellValue } from 'hyperformula';
import type { CellData, FormulaAST, FormulaState } from '../../types';

interface CellAddress {
  sheet: number;
  row: number;
  col: number;
}

interface CachedWorkspaceData {
  cells: Map<string, CellData>;
  loadedAt: Date;
}

export class TableFormulaEngine {
  private hf: HyperFormula;
  private sheetMap: Map<string, number> = new Map();
  private cellListeners: Map<string, Set<(value: CellValue) => void>> = new Map();
  private workspaceCache: Map<string, CachedWorkspaceData> = new Map();

  constructor(config?: Partial<ConfigParams>) {
    this.hf = HyperFormula.buildEmpty({
      licenseKey: 'gpl-v3',
      ...config,
    });
  }

  /**
   * Добавить таблицу в движок
   */
  addTable(tableId: string, data: CellData[][]): void {
    const sheetName = `TABLE_${tableId}`;
    
    // Check if sheet already exists
    let sheetId: number | undefined;
    try {
      sheetId = this.hf.getSheetId(sheetName);
    } catch (e) {
      // Ignore error if sheet doesn't exist
    }

    if (sheetId === undefined) {
      this.hf.addSheet(sheetName);
      sheetId = this.hf.getSheetId(sheetName);
    }
    
    if (sheetId !== undefined) {
      this.sheetMap.set(tableId, sheetId);
    }

    // Заполнить ячейки
    data.forEach((row, rowIdx) => {
      row.forEach((cell, colIdx) => {
        this.setCellContent(tableId, rowIdx, colIdx, cell);
      });
    });
  }

  /**
   * Удалить таблицу
   */
  removeTable(tableId: string): void {
    const sheetId = this.sheetMap.get(tableId);
    if (sheetId !== undefined) {
      this.hf.removeSheet(sheetId);
      this.sheetMap.delete(tableId);
    }
  }

  /**
   * Установить содержимое ячейки
   */
  setCellContent(tableId: string, row: number, col: number, cell: CellData): void {
    const sheetId = this.sheetMap.get(tableId);
    if (sheetId === undefined) return;

    const address: CellAddress = { sheet: sheetId, row, col };

    if (cell.formula) {
      this.hf.setCellContents(address, [[cell.formula]]);
    } else if (cell.value !== undefined && cell.value !== null) {
      this.hf.setCellContents(address, [[cell.value as any]]);
    } else {
      this.hf.setCellContents(address, [[null]]);
    }
  }

  /**
   * Получить значение ячейки (вычисленное)
   */
  getCellValue(tableId: string, row: number, col: number): CellValue {
    const sheetId = this.sheetMap.get(tableId);
    if (sheetId === undefined) return null;

    return this.hf.getCellValue({ sheet: sheetId, row, col });
  }

  /**
   * Получить формулу ячейки
   */
  getCellFormula(tableId: string, row: number, col: number): string | null {
    const sheetId = this.sheetMap.get(tableId);
    if (sheetId === undefined) return null;

    const formula = this.hf.getCellFormula({ sheet: sheetId, row, col });
    return formula || null;
  }

  /**
   * Валидация формулы
   */
  validateFormula(formula: string): { isValid: boolean; error?: string } {
    try {
      const tempSheetName = 'TEMP_VALIDATION';
      let tempSheetId = this.hf.getSheetId(tempSheetName);
      if (tempSheetId === undefined) {
        this.hf.addSheet(tempSheetName);
        tempSheetId = this.hf.getSheetId(tempSheetName);
      }
      
      if (tempSheetId !== undefined) {
        this.hf.setCellContents({ sheet: tempSheetId, row: 0, col: 0 }, [[formula]]);
        const value = this.hf.getCellValue({ sheet: tempSheetId, row: 0, col: 0 });
        if (value instanceof Error) {
          return { isValid: false, error: value.message };
        }
      }

      return { isValid: true };
    } catch (error) {
      return { isValid: false, error: (error as Error).message };
    }
  }

  /**
   * Получить зависимости формулы
   */
  getDependencies(tableId: string, row: number, col: number): Array<{tableId: string; row: number; col: number}> {
    const sheetId = this.sheetMap.get(tableId);
    if (sheetId === undefined) return [];

    const deps = this.hf.getCellDependents({ sheet: sheetId, row, col });
    
    return deps.map((dep: any) => {
      const depTableId = Array.from(this.sheetMap.entries())
        .find(([, id]) => id === dep.sheet)?.[0];
      
      return {
        tableId: depTableId || '',
        row: dep.row,
        col: dep.col,
      };
    });
  }

  /**
   * Пересчитать все формулы
   */
  recalculate(): void {
    this.hf.rebuildAndRecalculate();
  }

  /**
   * Подписаться на изменения ячейки
   */
  subscribe(tableId: string, row: number, col: number, callback: (value: CellValue) => void): () => void {
    const key = `${tableId}_${row}_${col}`;
    
    if (!this.cellListeners.has(key)) {
      this.cellListeners.set(key, new Set());
    }
    
    this.cellListeners.get(key)!.add(callback);

    // Вернуть функцию отписки
    return () => {
      this.cellListeners.get(key)?.delete(callback);
    };
  }

  /**
   * Уведомить подписчиков об изменении
   */
  private notifyListeners(tableId: string, row: number, col: number): void {
    const key = `${tableId}_${row}_${col}`;
    const value = this.getCellValue(tableId, row, col);
    
    this.cellListeners.get(key)?.forEach(callback => callback(value));
  }

  /**
   * Кэшировать данные workspace для cross-workspace формул
   */
  cacheWorkspaceData(workspaceId: string, tableName: string, cells: Map<string, CellData>): void {
    const cacheKey = `${workspaceId}_${tableName}`;
    this.workspaceCache.set(cacheKey, {
      cells,
      loadedAt: new Date(),
    });
  }

  /**
   * Получить значение из кэша workspace
   */
  getCachedWorkspaceValue(workspaceId: string, tableName: string, cellRef: string): CellValue {
    const cacheKey = `${workspaceId}_${tableName}`;
    const cached = this.workspaceCache.get(cacheKey);
    
    if (!cached) {
      console.warn(`Workspace ${workspaceId} table ${tableName} not loaded`);
      return null;
    }
    
    const { row, col } = this.parseCellRef(cellRef);
    return cached.cells.get(`${row}_${col}`)?.value as CellValue || null;
  }

  /**
   * Парсинг cell reference (A1 -> {row: 0, col: 0})
   */
  private parseCellRef(cellRef: string): { row: number; col: number } {
    const match = cellRef.match(/^([A-Z]+)(\d+)$/);
    if (!match) {
      throw new Error(`Invalid cell reference: ${cellRef}`);
    }

    const colStr = match[1];
    const rowStr = match[2];

    // Convert column letters to number (A=0, B=1, ..., Z=25, AA=26, etc.)
    let col = 0;
    for (let i = 0; i < colStr.length; i++) {
      col = col * 26 + (colStr.charCodeAt(i) - 65 + 1);
    }
    col -= 1; // 0-indexed

    const row = parseInt(rowStr, 10) - 1; // 0-indexed

    return { row, col };
  }

  /**
   * Очистить кэш workspace
   */
  invalidateWorkspaceCache(workspaceId: string, tableName?: string): void {
    if (tableName) {
      this.workspaceCache.delete(`${workspaceId}_${tableName}`);
    } else {
      // Invalidate all tables in workspace
      Array.from(this.workspaceCache.keys())
        .filter(key => key.startsWith(`${workspaceId}_`))
        .forEach(key => this.workspaceCache.delete(key));
    }
  }
}
