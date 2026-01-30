import { HyperFormula, ConfigParams, CellValue } from "hyperformula";
import type { CellData, FormulaAST, FormulaState } from "../../types";
import {
  extractTableReferences,
  parseCellAddress,
  formatCellAddress,
  type TableReference,
} from "../../../lib/table/TableReferenceParser";

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
      licenseKey: "gpl-v3",
      ...config,
    });
  }

  /**
   * Добавить таблицу в движок
   */
  addTable(tableId: string, data: CellData[][]): void {
    const sheetName = `TABLE_${tableId}`;

    let sheetId: number | undefined;
    try {
      sheetId = this.hf.getSheetId(sheetName);
    } catch (e) {
      // Ignore
    }

    if (sheetId === undefined) {
      this.hf.addSheet(sheetName);
      sheetId = this.hf.getSheetId(sheetName);
    }

    if (sheetId !== undefined) {
      this.sheetMap.set(tableId, sheetId);
    }

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
   * Получить значение ячейки
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
      const tempSheetName = "TEMP_VALIDATION";
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
  getDependencies(
    tableId: string,
    row: number,
    col: number,
  ): Array<{ tableId: string; row: number; col: number }> {
    const sheetId = this.sheetMap.get(tableId);
    if (sheetId === undefined) return [];
    const deps = this.hf.getCellDependents({ sheet: sheetId, row, col });

    return deps.map((dep: any) => {
      const depTableId = Array.from(this.sheetMap.entries()).find(
        ([, id]) => id === dep.sheet,
      )?.[0];

      return {
        tableId: depTableId || "",
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
  subscribe(
    tableId: string,
    row: number,
    col: number,
    callback: (value: CellValue) => void,
  ): () => void {
    const key = `${tableId}_${row}_${col}`;

    if (!this.cellListeners.has(key)) {
      this.cellListeners.set(key, new Set());
    }

    this.cellListeners.get(key)!.add(callback);
    return () => {
      this.cellListeners.get(key)?.delete(callback);
    };
  }

  /**
   * Кэшировать данные workspace
   */
  cacheWorkspaceData(workspaceId: string, tableName: string, cells: Map<string, CellData>): void {
    const cacheKey = `${workspaceId}_${tableName}`;
    this.workspaceCache.set(cacheKey, {
      cells,
      loadedAt: new Date(),
    });
  }

  /**
   * Получить значение из кэша
   */
  getCachedWorkspaceValue(workspaceId: string, tableName: string, cellRef: string): CellValue {
    const cacheKey = `${workspaceId}_${tableName}`;
    const cached = this.workspaceCache.get(cacheKey);

    if (!cached) {
      return null;
    }

    const addr = parseCellAddressSync(cellRef);
    if (!addr) return null;

    return (cached.cells.get(`${addr.row}_${addr.col}`)?.value as CellValue) || null;
  }

  /**
   * Очистить кэш workspace
   */
  invalidateWorkspaceCache(workspaceId: string, tableName?: string): void {
    if (tableName) {
      this.workspaceCache.delete(`${workspaceId}_${tableName}`);
    } else {
      Array.from(this.workspaceCache.keys())
        .filter((key) => key.startsWith(`${workspaceId}_`))
        .forEach((key) => this.workspaceCache.delete(key));
    }
  }

  /**
   * Извлечь cross-table ссылки из формулы
   */
  extractCrossTableRefs(formula: string): TableReference[] {
    return extractTableReferences(formula);
  }

  /**
   * Трансформировать формулу для HyperFormula
   * TableName!A1 -> TABLE_TableName!A1
   */
  transformFormulaForEngine(formula: string): string {
    const refs = this.extractCrossTableRefs(formula);

    let transformed = formula;

    refs.forEach((ref) => {
      let originalRef = "";

      if (ref.isCrossWorkspace && ref.tableName) {
        originalRef = `${ref.workspaceId || ""}:${ref.tableName}!${ref.startCell}`;
        if (ref.isRange) originalRef += `:${ref.endCell}`;
      } else if (ref.isCrossTable && ref.tableName) {
        originalRef = `${ref.tableName}!${ref.startCell}`;
        if (ref.isRange) originalRef += `:${ref.endCell}`;
      }

      if (originalRef) {
        const newRef = `TABLE_${ref.tableName || ref.tableId}!${ref.startCell}`;
        transformed = transformed.split(originalRef).join(newRef);
      }
    });

    return transformed;
  }

  /**
   * Добавить связанную таблицу
   */
  addLinkedTable(
    workspaceId: string,
    tableId: string,
    tableName: string,
    data: CellData[][],
  ): void {
    const sheetName = `TABLE_${tableName}`;

    let sheetId: number | undefined;
    try {
      sheetId = this.hf.getSheetId(sheetName);
    } catch (e) {}

    if (sheetId === undefined) {
      this.hf.addSheet(sheetName);
      sheetId = this.hf.getSheetId(sheetName);
    }

    if (sheetId !== undefined) {
      this.sheetMap.set(tableName, sheetId);
      this.sheetMap.set(`${workspaceId}:${tableName}`, sheetId);
    }

    data.forEach((row, rowIdx) => {
      row.forEach((cell, colIdx) => {
        if (cell.formula) {
          this.hf.setCellContents({ sheet: sheetId!, row: rowIdx, col: colIdx }, [[cell.formula]]);
        } else if (cell.value !== undefined && cell.value !== null) {
          // Преобразуем unknown в примитив для HyperFormula
          const cellValue = cell.value as string | number | boolean;
          this.hf.setCellContents({ sheet: sheetId!, row: rowIdx, col: colIdx }, [[cellValue]]);
        } else {
          this.hf.setCellContents({ sheet: sheetId!, row: rowIdx, col: colIdx }, [[""]]);
        }
      });
    });
  }

  /**
   * Получить значение по гибкому адресу
   */
  getValueByFlexibleAddress(currentTableId: string, address: string): CellValue {
    const ref = parseTableReferenceSync(address);

    if (!ref) return null;

    if (!ref.isCrossTable && !ref.isCrossWorkspace) {
      const addr = parseCellAddressSync(ref.startCell);
      if (addr) return this.getCellValue(currentTableId, addr.row, addr.col);
      return null;
    }

    const cacheKey = `${ref.workspaceId || ""}_${ref.tableName || ""}`;
    const cached = this.workspaceCache.get(cacheKey);

    if (cached) {
      const addr = parseCellAddressSync(ref.startCell);
      if (addr) return (cached.cells.get(`${addr.row}_${addr.col}`)?.value as CellValue) || null;
    }

    return null;
  }
}

// Синхронные версии для внутреннего использования
function parseCellAddressSync(address: string): { row: number; col: number } | null {
  const match = address.match(/^([A-Z]+)([0-9]+)$/i);
  if (!match) return null;

  const colLetters = match[1].toUpperCase();
  const rowNum = parseInt(match[2], 10) - 1;

  let col = 0;
  for (let i = 0; i < colLetters.length; i++) {
    col = col * 26 + (colLetters.charCodeAt(i) - 64);
  }

  return { row: rowNum, col: col - 1 };
}

function parseTableReferenceSync(input: string): TableReference | null {
  const trimmed = input.trim();

  const crossWorkspaceMatch = trimmed.match(/^([^:]+):([^!]+)!([A-Z]+[0-9]+(?::[A-Z]+[0-9]+)?)$/);
  if (crossWorkspaceMatch) {
    const [, workspacePart, tablePart, cellPart] = crossWorkspaceMatch;
    const addr = parseCellAddressSync(cellPart.split(":")[0]);
    return {
      workspaceId: workspacePart,
      tableName: tablePart,
      startCell: cellPart.split(":")[0],
      endCell: cellPart.includes(":") ? cellPart.split(":")[1] : undefined,
      isRange: cellPart.includes(":"),
      isCrossWorkspace: true,
      isCrossTable: true,
      startRow: addr?.row,
      startCol: addr?.col,
    };
  }

  const crossTableMatch = trimmed.match(/^([^!]+)!([A-Z]+[0-9]+(?::[A-Z]+[0-9]+)?)$/);
  if (crossTableMatch) {
    const [, tablePart, cellPart] = crossTableMatch;
    const addr = parseCellAddressSync(cellPart.split(":")[0]);
    return {
      tableName: tablePart,
      startCell: cellPart.split(":")[0],
      endCell: cellPart.includes(":") ? cellPart.split(":")[1] : undefined,
      isRange: cellPart.includes(":"),
      isCrossWorkspace: false,
      isCrossTable: true,
      startRow: addr?.row,
      startCol: addr?.col,
    };
  }

  const cellMatch = trimmed.match(/^([A-Z]+[0-9]+(?::[A-Z]+[0-9]+)?)$/);
  if (cellMatch) {
    const addr = parseCellAddressSync(cellMatch[1]);
    if (addr) {
      return {
        startCell: cellMatch[1].split(":")[0],
        endCell: cellMatch[1].includes(":") ? cellMatch[1].split(":")[1] : undefined,
        isRange: cellMatch[1].includes(":"),
        isCrossWorkspace: false,
        isCrossTable: false,
        startRow: addr.row,
        startCol: addr.col,
      };
    }
  }

  return null;
}
