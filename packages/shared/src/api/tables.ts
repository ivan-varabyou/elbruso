import { apiClient } from './client';
import { API_ENDPOINTS } from './endpoints';
import { ErrorHandler } from '../lib/errors/errorHandler';
import type { 
  DynamicTable, 
  TableVersion, 
  TableCell,
  TableLink,
  MergedCell,
  CreateTableDto,
  UpdateTableDto,
  CreateVersionDto,
  UpdateCellDto,
  GetCellsQueryDto,
  CreateLinkDto,
  MatrixFormulaDto,
  BatchUpdateResponse,
} from '../types';

export const tablesApi = {
  // Tables CRUD
  create: async (workspaceId: string, dto: CreateTableDto): Promise<DynamicTable> => {
    return ErrorHandler.retry(async () => {
      const response = await apiClient.post(API_ENDPOINTS.WORKSPACE_TABLES(workspaceId), dto);
      return response.data;
    });
  },

  getAll: async (workspaceId: string, groupId?: string): Promise<DynamicTable[]> => {
    return ErrorHandler.retry(async () => {
      const response = await apiClient.get(API_ENDPOINTS.WORKSPACE_TABLES(workspaceId), {
        params: { groupId },
      });
      return response.data;
    });
  },

  getById: async (id: string): Promise<DynamicTable> => {
    return ErrorHandler.retry(async () => {
      const response = await apiClient.get(API_ENDPOINTS.TABLE(id));
      return response.data;
    });
  },

  update: async (id: string, dto: UpdateTableDto): Promise<DynamicTable> => {
    const response = await apiClient.patch(API_ENDPOINTS.TABLE(id), dto);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.TABLE(id));
  },

  // Versions
  createVersion: async (tableId: string, dto: CreateVersionDto): Promise<TableVersion> => {
    const response = await apiClient.post(API_ENDPOINTS.TABLE_VERSIONS(tableId), dto);
    return response.data;
  },

  getVersionHistory: async (tableId: string): Promise<TableVersion[]> => {
    const response = await apiClient.get(API_ENDPOINTS.TABLE_VERSIONS(tableId));
    return response.data;
  },

  activateVersion: async (versionId: string): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.VERSION_ACTIVATE(versionId));
  },

  // Cells
  getCells: async (versionId: string, query: GetCellsQueryDto = {}): Promise<TableCell[]> => {
    return ErrorHandler.retry(async () => {
      const response = await apiClient.get(API_ENDPOINTS.VERSION_CELLS(versionId), {
        params: query,
      });
      return response.data;
    });
  },

  updateCell: async (versionId: string, dto: UpdateCellDto): Promise<void> => {
    const url = `/versions/${versionId}/cells/${dto.rowIndex}/${dto.colIndex}`;
    await apiClient.patch(url, dto.cellData);
  },

  batchUpdateCells: async (versionId: string, cells: UpdateCellDto[]): Promise<BatchUpdateResponse> => {
    const response = await apiClient.post(API_ENDPOINTS.VERSION_CELLS_BATCH(versionId), { cells });
    return response.data;
  },

  // Row/Column operations
  deleteRow: async (versionId: string, index: number): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.VERSION_ROW(versionId, index));
  },

  deleteColumn: async (versionId: string, index: number): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.VERSION_COLUMN(versionId, index));
  },

  insertRow: async (versionId: string, index: number): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.VERSION_ROW(versionId, index));
  },

  insertColumn: async (versionId: string, index: number): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.VERSION_COLUMN(versionId, index));
  },

  // Merged Cells
  mergeCells: async (versionId: string, range: { startRow: number; startCol: number; endRow: number; endCol: number }): Promise<MergedCell> => {
    const response = await apiClient.post(API_ENDPOINTS.VERSION_MERGE_CELLS(versionId), range);
    return response.data;
  },

  unmergeCells: async (versionId: string, mergedCellId: string): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.VERSION_UNMERGE_CELLS(versionId, mergedCellId));
  },

  getMergedCells: async (versionId: string): Promise<MergedCell[]> => {
    const response = await apiClient.get(API_ENDPOINTS.VERSION_MERGED_CELLS(versionId));
    return response.data;
  },

  // Links
  createLink: async (tableId: string, dto: CreateLinkDto): Promise<TableLink> => {
    const response = await apiClient.post(API_ENDPOINTS.TABLE_LINKS(tableId), dto);
    return response.data;
  },

  syncLink: async (linkId: string): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.LINK_SYNC(linkId));
  },

  // Formulas
  updateMatrixFormulas: async (versionId: string, formulas: MatrixFormulaDto[]): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.VERSION_FORMULAS(versionId), { formulas });
  },
};
