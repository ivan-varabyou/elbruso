import { tablesApi } from '../../api';
import type { CellData } from '../../types';

interface CachedWorkspaceData {
  cells: Map<string, CellData>;
  loadedAt: Date;
}

export class CrossWorkspaceResolver {
  private cache: Map<string, CachedWorkspaceData> = new Map();
  private loadingPromises: Map<string, Promise<void>> = new Map();

  /**
   * Загрузить данные workspace/table
   */
  async loadWorkspaceData(workspaceId: string, tableName: string): Promise<void> {
    const cacheKey = `${workspaceId}_${tableName}`;

    // Если уже загружается, ждем завершения
    const existingPromise = this.loadingPromises.get(cacheKey);
    if (existingPromise) {
      return existingPromise;
    }

    // Если уже в кэше и свежие данные (< 5 минут), не перезагружаем
    const cached = this.cache.get(cacheKey);
    if (cached) {
      const age = Date.now() - cached.loadedAt.getTime();
      if (age < 5 * 60 * 1000) {
        return;
      }
    }

    // Загружаем данные
    const loadPromise = this.fetchAndCache(workspaceId, tableName);
    this.loadingPromises.set(cacheKey, loadPromise);

    try {
      await loadPromise;
    } finally {
      this.loadingPromises.delete(cacheKey);
    }
  }

  /**
   * Загрузить и закэшировать данные
   */
  private async fetchAndCache(workspaceId: string, tableName: string): Promise<void> {
    try {
      const tables = await tablesApi.getAll(workspaceId);
      const table = tables.find(t => t.name === tableName);

      if (!table?.activeVersion) {
        throw new Error(`Table ${tableName} not found in workspace ${workspaceId}`);
      }

      const cellsData = await tablesApi.getCells(table.activeVersion.id);

      const cellsMap = new Map<string, CellData>();
      cellsData.forEach(cell => {
        cellsMap.set(`${cell.row_index}_${cell.col_index}`, cell.cell_data);
      });

      const cacheKey = `${workspaceId}_${tableName}`;
      this.cache.set(cacheKey, {
        cells: cellsMap,
        loadedAt: new Date(),
      });
    } catch (error) {
      console.error(`Failed to load workspace ${workspaceId} table ${tableName}:`, error);
      throw error;
    }
  }

  /**
   * Получить значение ячейки
   */
  getCellValue(workspaceId: string, tableName: string, cellRef: string): unknown {
    const cacheKey = `${workspaceId}_${tableName}`;
    const cached = this.cache.get(cacheKey);

    if (!cached) {
      console.warn(`Workspace ${workspaceId} table ${tableName} not loaded. Call loadWorkspaceData first.`);
      return null;
    }

    const { row, col } = this.parseCellRef(cellRef);
    return cached.cells.get(`${row}_${col}`)?.value ?? null;
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

    // Convert column letters to number
    let col = 0;
    for (let i = 0; i < colStr.length; i++) {
      col = col * 26 + (colStr.charCodeAt(i) - 65 + 1);
    }
    col -= 1;

    const row = parseInt(rowStr, 10) - 1;

    return { row, col };
  }

  /**
   * Инвалидировать кэш
   */
  invalidateCache(workspaceId: string, tableName?: string): void {
    if (tableName) {
      this.cache.delete(`${workspaceId}_${tableName}`);
    } else {
      Array.from(this.cache.keys())
        .filter(key => key.startsWith(`${workspaceId}_`))
        .forEach(key => this.cache.delete(key));
    }
  }

  /**
   * Очистить весь кэш
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Получить статистику кэша
   */
  getCacheStats(): { size: number; entries: string[] } {
    return {
      size: this.cache.size,
      entries: Array.from(this.cache.keys()),
    };
  }
}
