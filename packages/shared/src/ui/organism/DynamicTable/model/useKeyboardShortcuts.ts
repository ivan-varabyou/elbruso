import { useEffect, useCallback, type RefObject } from 'react';
import type { AgGridReact } from 'ag-grid-react';
import { useHistoryStore } from '@/shared/stores';

interface UseKeyboardShortcutsProps {
  gridRef: RefObject<AgGridReact>;
  tableId: string;
  onUndo?: () => void;
  onRedo?: () => void;
}

export function useKeyboardShortcuts({ 
  gridRef, 
  tableId,
  onUndo,
  onRedo 
}: UseKeyboardShortcutsProps) {
  const { undo, redo, canUndo, canRedo } = useHistoryStore();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Ctrl+Z - Undo
    if (e.ctrlKey && e.key === 'z' && !e.shiftKey) {
      e.preventDefault();
      if (canUndo()) {
        const entry = undo();
        if (entry && onUndo) {
          onUndo();
        }
      }
    }

    // Ctrl+Shift+Z or Ctrl+Y - Redo
    if ((e.ctrlKey && e.shiftKey && e.key === 'z') || (e.ctrlKey && e.key === 'y')) {
      e.preventDefault();
      if (canRedo()) {
        const entry = redo();
        if (entry && onRedo) {
          onRedo();
        }
      }
    }

    // Ctrl+C - Copy
    if (e.ctrlKey && e.key === 'c') {
      gridRef.current?.api.copySelectedRangeToClipboard();
    }

    // Ctrl+V - Paste
    if (e.ctrlKey && e.key === 'v') {
      // ag-Grid handles paste automatically
    }

    // Delete - Clear cell
    if (e.key === 'Delete') {
      const selectedCells = gridRef.current?.api.getCellRanges();
      if (selectedCells && selectedCells.length > 0) {
        // Clear selected cells
        selectedCells.forEach(range => {
          const startRow = Math.min(range.startRow?.rowIndex ?? 0, range.endRow?.rowIndex ?? 0);
          const endRow = Math.max(range.startRow?.rowIndex ?? 0, range.endRow?.rowIndex ?? 0);
          
          range.columns.forEach(column => {
            for (let row = startRow; row <= endRow; row++) {
              const rowNode = gridRef.current?.api.getDisplayedRowAtIndex(row);
              if (rowNode) {
                rowNode.setDataValue(column.getColId(), '');
              }
            }
          });
        });
      }
    }

    // Ctrl+A - Select all
    if (e.ctrlKey && e.key === 'a') {
      e.preventDefault();
      gridRef.current?.api.selectAll();
    }

    // Escape - Deselect
    if (e.key === 'Escape') {
      gridRef.current?.api.deselectAll();
    }

    // F2 - Edit mode
    if (e.key === 'F2') {
      e.preventDefault();
      const focusedCell = gridRef.current?.api.getFocusedCell();
      if (focusedCell) {
        gridRef.current?.api.startEditingCell({
          rowIndex: focusedCell.rowIndex,
          colKey: focusedCell.column.getColId(),
        });
      }
    }
  }, [gridRef, canUndo, canRedo, undo, redo, onUndo, onRedo]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
