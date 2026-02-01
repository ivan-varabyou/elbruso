import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export interface CellAddress {
  row: number;
  col: number;
}

export interface SelectionState {
  selectedCell: CellAddress | null;
  selectionStart: CellAddress | null;
  selectionEnd: CellAddress | null;
  selectedRange: string;
  isSelecting: boolean;
  dragStartCell: CellAddress | null;

  setSelectedCell: (cell: CellAddress | null) => void;
  setSelectedRange: (range: string) => void;
  startSelection: (cell: CellAddress) => void;
  updateSelection: (cell: CellAddress) => void;
  endSelection: () => void;
  setRangeFromStartEnd: (start: CellAddress, end: CellAddress) => void;
  clearSelection: () => void;
}

function formatCellAddress(row: number, col: number): string {
  let colLetter = "";
  let colNum = col;
  while (colNum >= 0) {
    colLetter = String.fromCharCode(65 + (colNum % 26)) + colLetter;
    colNum = Math.floor(colNum / 26) - 1;
  }
  return `${colLetter}${row + 1}`;
}

function getSelectedRange(start: CellAddress, end: CellAddress): string {
  const minRow = Math.min(start.row, end.row);
  const maxRow = Math.max(start.row, end.row);
  const minCol = Math.min(start.col, end.col);
  const maxCol = Math.max(start.col, end.col);

  const startAddr = formatCellAddress(minRow, minCol);
  const endAddr = formatCellAddress(maxRow, maxCol);

  return startAddr === endAddr ? startAddr : `${startAddr}:${endAddr}`;
}

export const useSelectionStore = create<SelectionState>()(
  subscribeWithSelector((set, get) => ({
    selectedCell: { row: 0, col: 0 },
    selectionStart: null,
    selectionEnd: null,
    selectedRange: "A1",
    isSelecting: false,
    dragStartCell: null,

    setSelectedCell: (cell) => {
      set({ selectedCell: cell });
      if (cell) {
        set({ selectedRange: formatCellAddress(cell.row, cell.col) });
      }
    },

    setSelectedRange: (range: string) => set({ selectedRange: range }),

    startSelection: (cell) => {
      set({
        selectionStart: cell,
        selectionEnd: cell,
        dragStartCell: cell,
        isSelecting: true,
        selectedCell: cell,
      });
    },

    updateSelection: (cell) => {
      const { selectionStart, isSelecting } = get();
      if (!isSelecting || !selectionStart) return;

      set({
        selectionEnd: cell,
        selectedRange: getSelectedRange(selectionStart, cell),
      });
    },

    endSelection: () => {
      const { selectionEnd } = get();
      if (selectionEnd) {
        set({ selectedCell: selectionEnd });
      }
      set({
        isSelecting: false,
        dragStartCell: null,
      });
    },

    setRangeFromStartEnd: (start, end) => {
      set({
        selectionStart: start,
        selectionEnd: end,
        selectedRange: getSelectedRange(start, end),
      });
    },

    clearSelection: () => {
      set({
        selectedCell: null,
        selectionStart: null,
        selectionEnd: null,
        selectedRange: "",
        isSelecting: false,
        dragStartCell: null,
      });
    },
  })),
);
