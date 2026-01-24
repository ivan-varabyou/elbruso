import { tableGridApi } from './tableGridApi';
import { tablesApi } from '@/shared/api/tables';
import type { CellData } from '@/shared/types';

/**
 * Table Service - Business logic for table operations
 * Coordinates between Grid API and Backend API
 */
export class TableService {
  // ========== Cell Operations ==========
  async updateCell(
    tableId: string,
    versionId: string,
    row: number,
    col: number,
    data: CellData
  ) {
    try {
      // 1. Быстрое обновление в гриде (Transaction) - работает как "сигнал"
      // Мы находим текущую строку и обновляем в ней только одно поле
      const rowNode = tableGridApi.getRowNode((row + 1).toString());
      if (rowNode) {
        const field = `col_${col}`;
        const updatedData = { ...rowNode.data, [field]: data.value };
        
        // applyTransaction не вызывает ререндер React-компонента
        tableGridApi.getGridApi()?.applyTransaction({ update: [updatedData] });
      }

      // 2. Фоновое обновление бэкенда
      await tablesApi.updateCell(versionId, {
        rowIndex: row,
        colIndex: col,
        cellData: data,
      });

      return { success: true };
    } catch (error) {
      // В случае ошибки сбрасываем состояние ячейки (опционально)
      console.error('Failed to update cell:', error);
      throw error;
    }
  }

  // ========== Row Operations ==========
  async insertRow(versionId: string, index: number) {
    await tablesApi.insertRow(versionId, index);
    // Grid will auto-refresh via store
  }

  async deleteRow(versionId: string, index: number) {
    await tablesApi.deleteRow(versionId, index);
  }

  // ========== Column Operations ==========
  async insertColumn(versionId: string, index: number) {
    await tablesApi.insertColumn(versionId, index);
  }

  async deleteColumn(versionId: string, index: number) {
    await tablesApi.deleteColumn(versionId, index);
  }

  // ========== Clipboard Operations ==========
  copySelection() {
    tableGridApi.copySelectedRangeToClipboard();
  }

  copyRows() {
    tableGridApi.copySelectedRowsToClipboard();
  }

  paste() {
    tableGridApi.pasteFromClipboard();
  }

  // ========== Undo/Redo ==========
  undo() {
    tableGridApi.undoCellEditing();
  }

  redo() {
    tableGridApi.redoCellEditing();
  }

  canUndo() {
    return tableGridApi.getCurrentUndoSize() > 0;
  }

  canRedo() {
    return tableGridApi.getCurrentRedoSize() > 0;
  }

  // ========== Export ==========
  exportToCsv(fileName: string) {
    tableGridApi.exportDataAsCsv({ fileName });
  }

  // ========== Selection ==========
  getSelectedCells() {
    return tableGridApi.getSelectedRows();
  }

  getSelectedRanges() {
    return tableGridApi.getCellRanges();
  }

  selectAll() {
    tableGridApi.selectAll();
  }

  clearSelection() {
    tableGridApi.deselectAll();
    tableGridApi.clearRangeSelection();
  }

  // ========== Navigation ==========
  goToCell(row: number, col: string) {
    tableGridApi.ensureIndexVisible(row, 'middle');
    tableGridApi.ensureColumnVisible(col);
    tableGridApi.setFocusedCell(row, col);
  }

  startEditingCell(row: number, col: string) {
    tableGridApi.startEditingCell(row, col);
  }

  stopEditing() {
    tableGridApi.stopEditing();
  }

  // ========== Layout ==========
  autoSizeColumns() {
    tableGridApi.autoSizeAllColumns(false);
  }

  fitColumnsToWidth() {
    tableGridApi.sizeColumnsToFit();
  }

  // ========== Refresh ==========
  refreshCells(force = false) {
    tableGridApi.refreshCells({ force });
  }
}

// Singleton instance
export const tableService = new TableService();
