import type { CreateTableDto, UpdateTableDto } from "@frontend/api";
import { Tables, Versions, Workspaces, CellDataDto, BatchCellUpdate } from "@frontend/api";
import { ErrorHandler } from "@frontend/api/error";
import type { CellData, CellUpdate } from "@frontend/modules/table/types";
import type { AppError } from "@frontend/types/enums";
import { create } from "zustand";

import type { DynamicTable } from "../modules/table/types/table.types";

const tablesApi = new Tables();
const workspacesApi = new Workspaces();
const versionsApi = new Versions();

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
      const response = await workspacesApi.dynamicTablesControllerFindAll(workspaceId, { groupId });
      set({ tables: response.data as unknown as DynamicTable[], isLoading: false });
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError, isLoading: false });
    }
  },

  loadTable: async (tableId) => {
    set({ isLoading: true, error: null });
    try {
      const table = await tablesApi.dynamicTablesControllerFindOne(tableId);
      const tableData = table.data as unknown as DynamicTable;

      if (!tableData.activeVersion) {
        throw new Error("No active version found");
      }

      const cellsData = await versionsApi.dynamicTablesControllerGetCells(
        tableData.activeVersion.id,
      );

      const cellsMap = new Map<string, CellData>();
      (
        cellsData.data as unknown as Array<{
          row_index: number;
          col_index: number;
          cell_data: CellData;
        }>
      ).forEach((cell) => {
        const key = `${cell.row_index}_${cell.col_index}`;
        cellsMap.set(key, cell.cell_data);
      });

      set({
        activeTable: tableData,
        cells: cellsMap,
        isLoading: false,
      });
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError, isLoading: false });
    }
  },

  createTable: async (workspaceId, dto) => {
    set({ isLoading: true, error: null });
    try {
      const table = await workspacesApi.dynamicTablesControllerCreate(workspaceId, dto);
      const tableData = table.data as unknown as DynamicTable;
      set((state) => ({
        tables: [...state.tables, tableData],
        isLoading: false,
      }));
      return tableData;
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError, isLoading: false });
      throw appError;
    }
  },

  updateTable: async (id, dto) => {
    set({ isLoading: true, error: null });
    try {
      const updated = await tablesApi.dynamicTablesControllerUpdate(id, dto);
      const updatedData = updated.data as unknown as DynamicTable;
      set((state) => ({
        tables: state.tables.map((t) => (t.id === id ? updatedData : t)),
        activeTable: state.activeTable?.id === id ? updatedData : state.activeTable,
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
      await tablesApi.dynamicTablesControllerDelete(id);
      set((state) => ({
        tables: state.tables.filter((t) => t.id !== id),
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
      await versionsApi.dynamicTablesControllerUpdateCell(activeTable.activeVersion.id, row, col);
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

    updates.forEach((u) => {
      const key = `${u.row}_${u.col}`;
      previousValues.set(key, cells.get(key));
      cells.set(key, u.data);
    });
    set({ cells });

    try {
      // 2. Server update
      await versionsApi.dynamicTablesControllerBatchUpdateCells(activeTable.activeVersion.id, {
        cells: updates.map(
          (u): BatchCellUpdate => ({
            rowIndex: u.row,
            colIndex: u.col,
            cellData: { value: u.data } as CellDataDto,
          }),
        ),
      });
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
      await versionsApi.dynamicTablesControllerInsertRow(activeTable.activeVersion.id, index);
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
      await versionsApi.dynamicTablesControllerDeleteRow(activeTable.activeVersion.id, index);
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
      await versionsApi.dynamicTablesControllerInsertColumn(activeTable.activeVersion.id, index);
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
      await versionsApi.dynamicTablesControllerDeleteColumn(activeTable.activeVersion.id, index);
      await get().loadTable(activeTable.id);
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError });
    }
  },

  clearError: () => set({ error: null }),
  reset: () => set({ tables: [], activeTable: null, cells: new Map(), error: null }),
}));
