import { create } from 'zustand';
import { 
  Spreadsheet, 
  Sheet, 
  CellData, 
  SpreadsheetStatus 
} from '../types/spreadsheet.types';

interface SpreadsheetState {
  // Data
  spreadsheets: Spreadsheet[];
  activeSpreadsheet: Spreadsheet | null;
  activeSheetId: string | null;
  
  // UI State
  isLoading: boolean;
  error: string | null;
  
  // Selection/Focus
  selectedCell: { row: number; col: number } | null;
  selectedRange: { startRow: number; startCol: number; endRow: number; endCol: number } | null;
  
  // Actions - Spreadsheet
  setSpreadsheets: (spreadsheets: Spreadsheet[]) => void;
  setActiveSpreadsheet: (spreadsheet: Spreadsheet | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Actions - Sheets
  setActiveSheetId: (sheetId: string | null) => void;
  updateSheetData: (sheetId: string, data: Partial<Sheet>) => void;
  
  // Actions - Cells
  updateCellLocal: (sheetId: string, row: number, col: number, data: Partial<CellData>) => void;
  
  // Actions - Selection
  setSelectedCell: (cell: { row: number; col: number } | null) => void;
  setSelectedRange: (range: { startRow: number; startCol: number; endRow: number; endCol: number } | null) => void;
}

export const useSpreadsheetStore = create<SpreadsheetState>((set) => ({
  // Initial State
  spreadsheets: [],
  activeSpreadsheet: null,
  activeSheetId: null,
  isLoading: false,
  error: null,
  selectedCell: null,
  selectedRange: null,

  // Actions
  setSpreadsheets: (spreadsheets) => set({ spreadsheets }),
  setActiveSpreadsheet: (activeSpreadsheet) => set({ 
    activeSpreadsheet, 
    activeSheetId: activeSpreadsheet?.sheets?.[0]?.id || null 
  }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  
  setActiveSheetId: (activeSheetId) => set({ activeSheetId }),
  
  updateSheetData: (sheetId, data) => set((state) => {
    if (!state.activeSpreadsheet) return state;
    
    const updatedSheets = state.activeSpreadsheet.sheets?.map((s) => 
      s.id === sheetId ? { ...s, ...data } : s
    );
    
    return {
      activeSpreadsheet: {
        ...state.activeSpreadsheet,
        sheets: updatedSheets,
      }
    };
  }),

  updateCellLocal: (sheetId, row, col, data) => set((state) => {
    if (!state.activeSpreadsheet) return state;
    
    const sheet = state.activeSpreadsheet.sheets?.find(s => s.id === sheetId);
    if (!sheet) return state;
    
    // This is a simple implementation, a Map or specialized structure might be better for large grids
    const updatedCells = sheet.cells?.map(c => 
      (c.row_index === row && c.col_index === col) ? { ...c, ...data } : c
    ) || [];
    
    // If cell doesn't exist, we might need to add it, but usually the grid will have placeholder objects
    
    return {
      activeSpreadsheet: {
        ...state.activeSpreadsheet,
        sheets: state.activeSpreadsheet.sheets?.map(s => 
          s.id === sheetId ? { ...s, cells: updatedCells } : s
        )
      }
    };
  }),

  setSelectedCell: (selectedCell) => set({ selectedCell }),
  setSelectedRange: (selectedRange) => set({ selectedRange }),
}));
