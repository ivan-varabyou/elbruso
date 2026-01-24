import { GridApi } from 'ag-grid-community';

/**
 * Service wrapper for AG Grid API
 * Provides typed methods for all grid operations
 */
export class TableGridApiService {
  private gridApi: GridApi | null = null;

  setGridApi(api: GridApi) {
    this.gridApi = api;
  }

  getGridApi(): GridApi | null {
    return this.gridApi;
  }

  // ========== Editing ==========
  startEditingCell(row: number, col: string) {
    this.gridApi?.startEditingCell({
      rowIndex: row,
      colKey: col,
    });
  }

  stopEditing() {
    this.gridApi?.stopEditing();
  }

  getCellEditorInstances() {
    return this.gridApi?.getCellEditorInstances() || [];
  }

  // ========== Clipboard ==========
  copySelectedRangeToClipboard() {
    this.gridApi?.copySelectedRangeToClipboard();
  }

  copySelectedRowsToClipboard() {
    this.gridApi?.copySelectedRowsToClipboard();
  }

  pasteFromClipboard() {
    this.gridApi?.pasteFromClipboard();
  }

  // ========== Selection ==========
  getSelectedRows() {
    return this.gridApi?.getSelectedRows() || [];
  }

  getSelectedNodes() {
    return this.gridApi?.getSelectedNodes() || [];
  }

  selectAll() {
    this.gridApi?.selectAll();
  }

  deselectAll() {
    this.gridApi?.deselectAll();
  }

  // ========== Refresh ==========
  refreshCells(params?: { force?: boolean; rowNodes?: any[] }) {
    this.gridApi?.refreshCells(params);
  }

  redrawRows(params?: { rowNodes?: any[] }) {
    this.gridApi?.redrawRows(params);
  }

  // ========== Undo/Redo ==========
  undoCellEditing() {
    this.gridApi?.undoCellEditing();
  }

  redoCellEditing() {
    this.gridApi?.redoCellEditing();
  }

  getCurrentUndoSize() {
    return this.gridApi?.getCurrentUndoSize() || 0;
  }

  getCurrentRedoSize() {
    return this.gridApi?.getCurrentRedoSize() || 0;
  }

  // ========== Export ==========
  exportDataAsCsv(params?: { fileName?: string }) {
    this.gridApi?.exportDataAsCsv(params);
  }

  // ========== Scrolling ==========
  ensureIndexVisible(index: number, position?: 'top' | 'bottom' | 'middle') {
    this.gridApi?.ensureIndexVisible(index, position);
  }

  ensureColumnVisible(col: string) {
    this.gridApi?.ensureColumnVisible(col);
  }

  // ========== Row/Column Operations ==========
  applyTransaction(transaction: { add?: any[]; remove?: any[]; update?: any[] }) {
    return this.gridApi?.applyTransaction(transaction);
  }

  getDisplayedRowCount() {
    return this.gridApi?.getDisplayedRowCount() || 0;
  }

  getRowNode(id: string) {
    return this.gridApi?.getRowNode(id);
  }

  forEachNode(callback: (node: any) => void) {
    this.gridApi?.forEachNode(callback);
  }

  // ========== Size ==========
  sizeColumnsToFit() {
    this.gridApi?.sizeColumnsToFit();
  }

  autoSizeAllColumns(skipHeader?: boolean) {
    this.gridApi?.autoSizeAllColumns(skipHeader);
  }

  // ========== Focus ==========
  setFocusedCell(rowIndex: number, colKey: string) {
    this.gridApi?.setFocusedCell(rowIndex, colKey);
  }

  getFocusedCell() {
    return this.gridApi?.getFocusedCell();
  }

  // ========== Range Selection ==========
  getCellRanges() {
    return this.gridApi?.getCellRanges() || [];
  }

  clearRangeSelection() {
    this.gridApi?.clearRangeSelection();
  }
}

// Singleton instance
export const tableGridApi = new TableGridApiService();
