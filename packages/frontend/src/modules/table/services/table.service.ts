export { tableGridApiService } from "./table-grid-api.service";
import { Tables, Versions } from "@frontend/api";

import type { CellData } from "../types/cell.types";
import { tableGridApiService } from "./table-grid-api.service";

export { cellFormattingService } from "./cell-formatting.service";

const tablesApi = new Tables();
const versionsApi = new Versions();

/**
 * Table Service - Business logic for table operations
 * Coordinates between Grid API and Backend API
 */
export class TableService {
  // ========== Cell Operations ==========
  async updateCell(tableId: string, versionId: string, row: number, col: number, data: CellData) {
    try {
      // 1. Быстрое обновление в гриде (Transaction) - работает как "сигнал"
      // Мы находим текущую строку и обновляем в ней только одно поле
      const rowNode = tableGridApiService.getRowNode((row + 1).toString());
      if (rowNode) {
        const field = `col_${col}`;
        const updatedData = { ...rowNode.data, [field]: data.value };

        // applyTransaction не вызывает ререндер React-компонента
        tableGridApiService.getGridApi()?.applyTransaction({ update: [updatedData] });
      }

      // 2. Фоновое обновление бэкенда
      await versionsApi.dynamicTablesControllerUpdateCell(versionId, row, col);

      return { success: true };
    } catch (error) {
      // В случае ошибки сбрасываем состояние ячейки (опционально)
      console.error("Failed to update cell:", error);
      throw error;
    }
  }

  // ========== Row Operations ==========
  async insertRow(versionId: string, index: number) {
    await versionsApi.dynamicTablesControllerInsertRow(versionId, index);
    // Grid will auto-refresh via store
  }

  async deleteRow(versionId: string, index: number) {
    await versionsApi.dynamicTablesControllerDeleteRow(versionId, index);
  }

  // ========== Column Operations ==========
  async insertColumn(versionId: string, index: number) {
    await versionsApi.dynamicTablesControllerInsertColumn(versionId, index);
  }

  async deleteColumn(versionId: string, index: number) {
    await versionsApi.dynamicTablesControllerDeleteColumn(versionId, index);
  }

  // ========== Clipboard Operations ==========
  copySelection() {
    tableGridApiService.copySelectedRangeToClipboard();
  }

  copyRows() {
    tableGridApiService.copySelectedRowsToClipboard();
  }

  paste() {
    tableGridApiService.pasteFromClipboard();
  }

  // ========== Undo/Redo ==========
  undo() {
    tableGridApiService.undoCellEditing();
  }

  redo() {
    tableGridApiService.redoCellEditing();
  }

  canUndo() {
    return tableGridApiService.getCurrentUndoSize() > 0;
  }

  canRedo() {
    return tableGridApiService.getCurrentRedoSize() > 0;
  }

  // ========== Export ==========
  exportToCsv(fileName: string) {
    tableGridApiService.exportDataAsCsv({ fileName });
  }

  // ========== Selection ==========
  getSelectedCells() {
    return tableGridApiService.getSelectedRows();
  }

  getSelectedRanges() {
    return tableGridApiService.getCellRanges();
  }

  selectAll() {
    tableGridApiService.selectAll();
  }

  clearSelection() {
    tableGridApiService.deselectAll();
    tableGridApiService.clearRangeSelection();
  }

  // ========== Navigation ==========
  goToCell(row: number, col: string) {
    tableGridApiService.ensureIndexVisible(row, "middle");
    tableGridApiService.ensureColumnVisible(col);
    tableGridApiService.setFocusedCell(row, col);
  }

  startEditingCell(row: number, col: string) {
    tableGridApiService.startEditingCell(row, col);
  }

  stopEditing() {
    tableGridApiService.stopEditing();
  }

  // ========== Layout ==========
  autoSizeColumns() {
    tableGridApiService.autoSizeAllColumns(false);
  }

  fitColumnsToWidth() {
    tableGridApiService.sizeColumnsToFit();
  }

  // ========== Refresh ==========
  refreshCells(force = false) {
    tableGridApiService.refreshCells({ force });
  }
}

// Singleton instance
export const tableService = new TableService();
