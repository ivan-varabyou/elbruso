import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { 
  CellFocusedEvent,
  ColDef, 
  GridReadyEvent, 
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import React, { useCallback,useMemo } from 'react';

import { indexToColumn } from '../lib/address-utils';
import { formulaEngine } from '../lib/formula-engine';
import { useSpreadsheetStore } from '../stores/useSpreadsheetStore';

interface SpreadsheetGridProps {
  sheetId: string;
  rowCount?: number;
  colCount?: number;
}

export const SpreadsheetGrid: React.FC<SpreadsheetGridProps> = ({ 
  sheetId, 
  rowCount = 100, 
  colCount = 26 
}) => {
  const { 
    activeSpreadsheet, 
    updateCellLocal, 
    setSelectedCell 
  } = useSpreadsheetStore();

  const sheet = useMemo(() => 
    activeSpreadsheet?.sheets?.find(s => s.id === sheetId),
    [activeSpreadsheet, sheetId]
  );

  // Column definitions
  const columnDefs = useMemo<ColDef[]>(() => {
    const defs: ColDef[] = [
      {
        headerName: '',
        valueGetter: 'node.rowIndex + 1',
        width: 50,
        pinned: 'left',
        suppressMovable: true,
        cellStyle: { backgroundColor: '#f4f4f4', textAlign: 'center', fontWeight: 'bold' },
      }
    ];

    for (let i = 0; i < (sheet?.col_count || colCount); i++) {
      const colName = indexToColumn(i);
      defs.push({
        headerName: colName,
        field: `col_${i}`,
        width: 100,
        editable: true,
        resizable: true,
        // custom cell renderer for styles and formulas
        cellStyle: (params) => {
          // TODO: Get style from store
          return {};
        },
        valueGetter: (params) => {
          const row = params.node?.rowIndex ?? 0;
          return formulaEngine.getCellValue(sheetId, row, i);
        },
        valueSetter: (params) => {
          const row = params.node?.rowIndex ?? 0;
          const newValue = params.newValue;
          
          // Update engine
          formulaEngine.setCellValue(sheetId, row, i, newValue);
          
          // Update store optimistically
          updateCellLocal(sheetId, row, i, {
            raw_value: String(newValue),
            // value_type: ...
          });
          
          return true;
        }
      });
    }
    return defs;
  }, [sheet, sheetId, colCount, updateCellLocal]);

  // Row data
  const rowData = useMemo(() => {
    const rows = [];
    for (let i = 0; i < (sheet?.row_count || rowCount); i++) {
      rows.push({ id: i });
    }
    return rows;
  }, [sheet, rowCount]);

  const onGridReady = (params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();
  };

  const onCellFocused = useCallback((event: CellFocusedEvent) => {
    if (event.rowIndex !== null && event.column && typeof event.column !== 'string' && event.column.getColId().startsWith('col_')) {
      const colIndex = parseInt(event.column.getColId().replace('col_', ''), 10);
      setSelectedCell({ row: event.rowIndex, col: colIndex });
    }
  }, [setSelectedCell]);

  return (
    <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        onGridReady={onGridReady}
        onCellFocused={onCellFocused}
        defaultColDef={{
          sortable: false,
          filter: false,
        }}
        headerHeight={32}
        rowHeight={24}
        suppressRowClickSelection={true}
        enableCellTextSelection={true}
        ensureDomOrder={true}
      />
    </div>
  );
};
