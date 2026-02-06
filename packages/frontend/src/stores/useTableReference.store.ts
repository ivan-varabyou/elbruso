// TableReferenceStore - кэширует данные связанных таблиц для формул
// Поддерживает ленивую загрузку и автоматическое обновление при изменении данных

import { Tables, Versions } from "@frontend/api";
import type { TableReference } from "@frontend/modules/table/lib/TableReferenceParser";
import { create } from "zustand";

interface CachedTableData {
  tableId: string;
  tableName: string;
  workspaceId: string;
  cells: Map<string, unknown>;
  rowCount: number;
  colCount: number;
  lastUpdated: number;
  isLoading: boolean;
  error?: string;
}

interface TableReferenceStore {
  // Кэш таблиц
  cache: Map<string, CachedTableData>;

  // API для загрузки
  tablesApi: Tables;
  versionsApi: Versions;

  // Actions
  getTableData: (ref: TableReference) => Promise<CachedTableData | null>;
  getCellValue: (ref: TableReference, row: number, col: number) => Promise<unknown>;
  getRangeValues: (ref: TableReference) => Promise<unknown[][]>;
  invalidateTable: (tableId: string) => void;
  clearCache: () => void;

  // Утилиты
  buildCellKey: (row: number, col: number) => string;
  parseCellKey: (key: string) => { row: number; col: number };
}

const DEFAULT_CACHE_TTL = 5 * 60 * 1000; // 5 минут
const MAX_CACHE_SIZE = 100; // Максимум 100 таблиц в кэше

export const useTableReferenceStore = create<TableReferenceStore>((set, get) => ({
  cache: new Map(),
  tablesApi: new Tables(),
  versionsApi: new Versions(),

  getTableData: async (ref) => {
    const { cache, tablesApi, versionsApi, invalidateTable } = get();
    const cacheKey = generateCacheKey(ref);

    // Проверяем кэш
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.lastUpdated < DEFAULT_CACHE_TTL) {
      return cached;
    }

    // Находим tableId по имени, если нужно
    const tableId = ref.tableId;
    if (!tableId && ref.tableName) {
      // TODO: Загрузить список таблиц и найти по имени
      // Пока возвращаем null
      console.warn(`Table lookup by name not implemented: ${ref.tableName}`);
      return null;
    }

    if (!tableId) {
      console.warn("Table ID not found for reference");
      return null;
    }

    // Создаём или обновляем запись в кэше
    const newCache = new Map(cache);

    // Проверяем существующую запись
    let tableData = newCache.get(`id:${tableId}`);
    if (!tableData) {
      tableData = {
        tableId,
        tableName: ref.tableName || tableId,
        workspaceId: ref.workspaceId || "",
        cells: new Map(),
        rowCount: 0,
        colCount: 0,
        lastUpdated: Date.now(),
        isLoading: true,
        error: undefined,
      };
      newCache.set(`id:${tableId}`, tableData);
      set({ cache: newCache });
    } else {
      tableData.isLoading = true;
      tableData.error = undefined;
      set({ cache: newMap(newCache) });
    }

    try {
      // Загружаем данные таблицы
      const response = await tablesApi.dynamicTablesControllerFindOne(tableId);
      const table = response.data as unknown as {
        activeVersion?: { id: string };
        row_count?: number;
        column_count?: number;
      };

      // Загружаем ячейки активной версии
      if (table.activeVersion) {
        const cellsResponse = await versionsApi.dynamicTablesControllerGetCells(
          table.activeVersion.id,
        );

        const cells = new Map<string, unknown>();
        const cellsData =
          (
            cellsResponse.data as unknown as {
              data?: Array<{ row_index: number; col_index: number; cell_data: unknown }>;
            }
          )?.data || [];

        cellsData.forEach((cell) => {
          const key = `${cell.row_index}_${cell.col_index}`;
          cells.set(key, cell.cell_data);
        });

        // Обновляем кэш
        const updated = newMap(newCache);
        const entry = updated.get(`id:${tableId}`);
        if (entry) {
          entry.cells = cells;
          entry.rowCount = table.row_count || 1000;
          entry.colCount = table.column_count || 50;
          entry.lastUpdated = Date.now();
          entry.isLoading = false;
          entry.error = undefined;
        }
        set({ cache: updated });

        return entry!;
      }

      return null;
    } catch (error: unknown) {
      console.error(`Failed to load table ${tableId}:`, error);

      // Обновляем с ошибкой
      const updated = newMap(newCache);
      const entry = updated.get(`id:${tableId}`);
      if (entry) {
        entry.isLoading = false;
        entry.error = error instanceof Error ? error.message : "Failed to load table";
      }
      set({ cache: updated });

      return null;
    }
  },

  getCellValue: async (ref, row, col) => {
    const tableData = await get().getTableData(ref);
    if (!tableData) return null;

    const key = get().buildCellKey(row, col);
    return tableData.cells.get(key) || null;
  },

  getRangeValues: async (ref) => {
    const tableData = await get().getTableData(ref);
    if (!tableData) return [];

    const startAddr = ref.startCell;
    const endAddr = ref.endCell || ref.startCell;

    const start = parseCellAddress(startAddr);
    const end = parseCellAddress(endAddr);

    if (!start || !end) return [];

    const values: unknown[][] = [];

    for (let row = start.row; row <= end.row; row++) {
      const rowData: unknown[] = [];
      for (let col = start.col; col <= end.col; col++) {
        const key = get().buildCellKey(row, col);
        rowData.push(tableData.cells.get(key) || null);
      }
      values.push(rowData);
    }

    return values;
  },

  invalidateTable: (tableId) => {
    const { cache } = get();
    const newCache = new Map(cache);

    // Удаляем все записи с этим tableId
    newCache.forEach((_, key) => {
      if (key.startsWith(`id:${tableId}`)) {
        newCache.delete(key);
      }
    });

    set({ cache: newCache });
  },

  clearCache: () => {
    set({ cache: new Map() });
  },

  buildCellKey: (row, col) => `${row}_${col}`,

  parseCellKey: (key) => {
    const [row, col] = key.split("_").map(Number);
    return { row, col };
  },
}));

// Вспомогательная функция для создания новой Map
function newMap<T, U>(original: Map<T, U>): Map<T, U> {
  const result = new Map<T, U>();
  original.forEach((value, key) => result.set(key, value));
  return result;
}

// Утилита для парсинга адреса (дублируем чтобы избежать циклических зависимостей)
function parseCellAddress(address: string): { row: number; col: number } | null {
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

// Генерирует ключ кэша (дублируем чтобы избежать циклических зависимостей)
function generateCacheKey(ref: TableReference): string {
  const parts: string[] = [];
  if (ref.workspaceId) parts.push(`ws:${ref.workspaceId}`);
  if (ref.tableName) parts.push(`t:${ref.tableName}`);
  if (ref.tableId) parts.push(`id:${ref.tableId}`);
  parts.push(`c:${ref.startCell}`);
  if (ref.endCell) parts.push(`e:${ref.endCell}`);
  return parts.join("|");
}
