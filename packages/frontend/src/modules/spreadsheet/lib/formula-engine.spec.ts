import { formulaEngine } from './formula-engine';
import { Sheet } from '../types/spreadsheet.types';
import { SpreadsheetStatus } from '../types/spreadsheet.types';

describe('FormulaEngine', () => {
  const mockSheet: Sheet = {
    id: 'sheet-1',
    spreadsheet_id: 'ss-1',
    name: 'Test Sheet',
    sort_order: 0,
    row_count: 10,
    col_count: 10,
    created_at: new Date(),
    updated_at: new Date(),
    cells: [
      {
        sheet_id: 'sheet-1',
        row_index: 0,
        col_index: 0,
        raw_value: '10',
        style: '{}',
        is_locked: false,
        updated_at: new Date()
      },
      {
        sheet_id: 'sheet-1',
        row_index: 0,
        col_index: 1,
        raw_value: '20',
        style: '{}',
        is_locked: false,
        updated_at: new Date()
      },
      {
        sheet_id: 'sheet-1',
        row_index: 0,
        col_index: 2,
        raw_value: '=A1+B1',
        style: '{}',
        is_locked: false,
        updated_at: new Date()
      }
    ]
  };

  beforeEach(() => {
    // We don't have a destroy method yet, but we can re-sync
    formulaEngine.syncSheets([mockSheet]);
  });

  it('should sync sheets and calculate simple formulas', () => {
    const value = formulaEngine.getCellValue('sheet-1', 0, 2);
    expect(value).toBe(30);
  });

  it('should update cell and recalculate dependencies', () => {
    formulaEngine.setCellValue('sheet-1', 0, 0, 50);
    const value = formulaEngine.getCellValue('sheet-1', 0, 2);
    expect(value).toBe(70);
  });

  it('should handle multi-sheet formulas', () => {
    const mockSheet2: Sheet = {
      ...mockSheet,
      id: 'sheet-2',
      name: 'Summary',
      cells: [
        {
          sheet_id: 'sheet-2',
          row_index: 0,
          col_index: 0,
          raw_value: "='Test Sheet'!C1 * 2",
          style: '{}',
          is_locked: false,
          updated_at: new Date()
        }
      ]
    };

    formulaEngine.syncSheets([mockSheet, mockSheet2]);
    const value = formulaEngine.getCellValue('sheet-2', 0, 0);
    expect(value).toBe(60);
  });
});
