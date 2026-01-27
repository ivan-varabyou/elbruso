import { create } from 'zustand';
import { tablesApi } from '../api';
import { ErrorHandler } from '../lib/errors/errorHandler';
import type { 
  DynamicTable, 
  TableCell, 
  CellData,
  CellUpdate,
  CreateTableDto,
  UpdateTableDto,
  AppError,
} from '../types';

interface TableStore {
  // State
  tables: DynamicTable[];
  activeTable: DynamicTable | null;
  cells: Map<string, CellData>;
  isLoading: boolean;
  error: AppError | null;

  // Actions
  fetchTables: (workspaceId: string, groupId?: string) => Promise<void>;
  loadTable: (tableId: string) => Promise<void>;
  createTable: (workspaceId: string, dto: CreateTableDto) => Promise<DynamicTable>;
  updateTable: (id: string, dto: UpdateTableDto) => Promise<void>;
  deleteTable: (id: string) => Promise<void>;
  
  // Cell operations with optimistic updates
  updateCell: (row: number, col: number, data: CellData) => Promise<void>;
  batchUpdateCells: (updates: CellUpdate[]) => Promise<void>;
  getCellValue: (row: number, col: number) => CellData | undefined;
  
  // Row/Column operations
  insertRow: (index: number) => Promise<void>;
  deleteRow: (index: number) => Promise<void>;
  insertColumn: (index: number) => Promise<void>;
  deleteColumn: (index: number) => Promise<void>;
  
  // Utility
  clearError: () => void;
  reset: () => void;
}

export const useTableStore = create<TableStore>((set, get) => ({
  tables: [],
  activeTable: null,
  cells: new Map(),
  isLoading: false,
  error: null,

  fetchTables: async (workspaceId, groupId) => {
    set({ isLoading: true, error: null });
    try {
      const tables = await tablesApi.getAll(workspaceId, groupId);
      set({ tables, isLoading: false });
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError, isLoading: false });
    }
  },

  loadTable: async (tableId) => {
    set({ isLoading: true, error: null });
    try {
      const table = await tablesApi.getById(tableId);
      
      if (!table.activeVersion) {
        throw new Error('No active version found');
      }

      const cellsData = await tablesApi.getCells(table.activeVersion.id);
      
      const cellsMap = new Map<string, CellData>();
      cellsData.forEach(cell => {
        const key = `${cell.row_index}_${cell.col_index}`;
        cellsMap.set(key, cell.cell_data);
      });

      set({ 
        activeTable: table, 
        cells: cellsMap, 
        isLoading: false 
      });
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError, isLoading: false });
    }
  },

  createTable: async (workspaceId, dto) => {
    set({ isLoading: true, error: null });
    try {
      const table = await tablesApi.create(workspaceId, dto);
      set(state => ({ 
        tables: [...state.tables, table],
        isLoading: false 
      }));
      return table;
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError, isLoading: false });
      throw appError;
    }
  },

  updateTable: async (id, dto) => {
    set({ isLoading: true, error: null });
    try {
      const updated = await tablesApi.update(id, dto);
      set(state => ({
        tables: state.tables.map(t => t.id === id ? updated : t),
        activeTable: state.activeTable?.id === id ? updated : state.activeTable,
        isLoading: false,
      }));
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError, isLoading: false });
    }
  },

  deleteTable: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await tablesApi.delete(id);
      set(state => ({
        tables: state.tables.filter(t => t.id !== id),
        activeTable: state.activeTable?.id === id ? null : state.activeTable,
        isLoading: false,
      }));
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError, isLoading: false });
    }
  },

  // Optimistic update for cells
  updateCell: async (row, col, data) => {
    const { activeTable } = get();
    if (!activeTable?.activeVersion) return;

    // 1. Optimistic update
    const cells = new Map(get().cells);
    const previousValue = cells.get(`${row}_${col}`);
    cells.set(`${row}_${col}`, data);
    set({ cells });

    try {
      // 2. Server update
      await tablesApi.updateCell(activeTable.activeVersion.id, {
        rowIndex: row,
        colIndex: col,
        cellData: data,
      });
    } catch (error) {
      // 3. Rollback on error
      const rollbackCells = new Map(get().cells);
      if (previousValue) {
        rollbackCells.set(`${row}_${col}`, previousValue);
      } else {
        rollbackCells.delete(`${row}_${col}`);
      }
      const appError = ErrorHandler.handle(error);
      set({ cells: rollbackCells, error: appError });
    }
  },

  batchUpdateCells: async (updates) => {
    const { activeTable } = get();
    if (!activeTable?.activeVersion) return;

    // 1. Optimistic update
    const cells = new Map(get().cells);
    const previousValues = new Map<string, CellData | undefined>();
    
    updates.forEach(u => {
      const key = `${u.row}_${u.col}`;
      previousValues.set(key, cells.get(key));
      cells.set(key, u.data);
    });
    set({ cells });

    try {
      // 2. Server update
      const dtos = updates.map(u => ({
        rowIndex: u.row,
        colIndex: u.col,
        cellData: u.data,
      }));

      await tablesApi.batchUpdateCells(activeTable.activeVersion.id, dtos);
    } catch (error) {
      // 3. Rollback on error
      const rollbackCells = new Map(get().cells);
      previousValues.forEach((value, key) => {
        if (value) {
          rollbackCells.set(key, value);
        } else {
          rollbackCells.delete(key);
        }
      });
      const appError = ErrorHandler.handle(error);
      set({ cells: rollbackCells, error: appError });
    }
  },

  getCellValue: (row, col) => {
    return get().cells.get(`${row}_${col}`);
  },

  insertRow: async (index) => {
    const { activeTable } = get();
    if (!activeTable?.activeVersion) return;

    try {
      await tablesApi.insertRow(activeTable.activeVersion.id, index);
      await get().loadTable(activeTable.id);
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError });
    }
  },

  deleteRow: async (index) => {
    const { activeTable } = get();
    if (!activeTable?.activeVersion) return;

    try {
      await tablesApi.deleteRow(activeTable.activeVersion.id, index);
      await get().loadTable(activeTable.id);
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError });
    }
  },

  insertColumn: async (index) => {
    const { activeTable } = get();
    if (!activeTable?.activeVersion) return;

    try {
      await tablesApi.insertColumn(activeTable.activeVersion.id, index);
      await get().loadTable(activeTable.id);
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError });
    }
  },

  deleteColumn: async (index) => {
    const { activeTable } = get();
    if (!activeTable?.activeVersion) return;

    try {
      await tablesApi.deleteColumn(activeTable.activeVersion.id, index);
      await get().loadTable(activeTable.id);
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError });
    }
  },

  clearError: () => set({ error: null }),
  reset: () => set({ tables: [], activeTable: null, cells: new Map(), error: null }),
}));
