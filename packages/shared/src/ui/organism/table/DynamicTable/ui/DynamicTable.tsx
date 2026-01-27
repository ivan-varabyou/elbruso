"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ColDef,
  CellValueChangedEvent,
  CellClickedEvent,
  GridReadyEvent,
  ModuleRegistry,
  AllCommunityModule,
} from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "./TableTheme.css";

// Register all community modules
ModuleRegistry.registerModules([AllCommunityModule]);

import { useTableStore } from "@/shared/stores";
import { TableFormulaEngine } from "@/shared/lib/hyperformula";
import { FormulaBar } from "./FormulaBar";
import { TableHeader } from "./TableHeader";
import { MainToolbar } from "./MainToolbar";
import { SheetTabs } from "./SheetTabs";
import { ContextMenu } from "./ContextMenu";
import { useKeyboardShortcuts } from "../model/useKeyboardShortcuts";
import { tableGridApi, tableService, cellFormattingService } from "@/shared/services";
import type { CellData } from "@/shared/types";

interface DynamicTableProps {
  tableId: string;
  workspaceId: string;
}

interface ContextMenuState {
  x: number;
  y: number;
  rowIndex: number | null;
  colId: string | null;
}

export function DynamicTable({ tableId, workspaceId }: DynamicTableProps) {
  // Use granular selectors to prevent full component re-renders
  const activeTable = useTableStore((state) => state.activeTable);
  const cells = useTableStore((state) => state.cells);
  const isLoading = useTableStore((state) => state.isLoading);
  const loadTable = useTableStore((state) => state.loadTable);
  const insertRow = useTableStore((state) => state.insertRow);
  const deleteRow = useTableStore((state) => state.deleteRow);
  const insertColumn = useTableStore((state) => state.insertColumn);
  const deleteColumn = useTableStore((state) => state.deleteColumn);
  const updateCell = useTableStore((state) => state.updateCell);

  const [formulaEngine] = useState(() => new TableFormulaEngine());
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);

  // Formatting state
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [alignment, setAlignment] = useState<"left" | "center" | "right">("left");
  const [selectedRange, setSelectedRange] = useState<string>("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gridRef = useRef<AgGridReact<any>>(null) as React.MutableRefObject<AgGridReact<any>>;

  // Keyboard shortcuts
  useKeyboardShortcuts({
    gridRef,
    tableId,
    onUndo: () => {
      loadTable(tableId);
    },
    onRedo: () => {
      loadTable(tableId);
    },
  });

  // Загрузить таблицу при монтировании
  useEffect(() => {
    loadTable(tableId);
  }, [tableId, loadTable]);

  // Синхронизировать с HyperFormula
  useEffect(() => {
    if (!activeTable || !cells) return;

    const data: CellData[][] = [];
    for (let row = 0; row < activeTable.row_count; row++) {
      data[row] = [];
      for (let col = 0; col < activeTable.column_count; col++) {
        const cellData = cells.get(`${row}_${col}`) || {};
        data[row][col] = cellData;
      }
    }

    formulaEngine.addTable(tableId, data);
  }, [activeTable, cells, tableId, formulaEngine]);

  // Column definitions
  const columnDefs = useMemo<ColDef[]>(() => {
    if (!activeTable?.activeVersion) return [];

    const columns = activeTable.activeVersion.columns;

    // Add row number column first
    const rowNumberCol: ColDef = {
      field: "rowNumber",
      headerName: "",
      width: 50,
      pinned: "left" as const,
      editable: false,
      cellStyle: {
        backgroundColor: "#fafafa",
        fontWeight: "500",
        color: "#71717a",
        textAlign: "center",
      },
    };

    const dataCols: ColDef[] = columns.map((col, idx) => ({
      field: `col_${idx}`,
      headerName: String.fromCharCode(65 + idx), // A, B, C, D...
      width: col.width || 150,
      editable: true,
      cellEditor: "agTextCellEditor",
      cellStyle: (params) => {
        const rowIdx = params.node.rowIndex;
        if (rowIdx === null || rowIdx === undefined) return {};
        const cellData = (cells as Map<string, CellData>).get(`${rowIdx}_${idx}`);
        if (!cellData?.style) return {};

        const style = cellData.style;
        return {
          fontWeight: style.fontWeight || "normal",
          fontStyle: style.fontStyle || "normal",
          textDecoration: style.textDecoration || "none",
          textAlign: style.textAlign || "left",
          color: style.textColor || "inherit",
          backgroundColor: style.backgroundColor || "transparent",
        } as any;
      },
    }));

    // Add "+" column at the end
    const addColumnBtn: ColDef = {
      headerName: "+",
      field: "addColumn",
      width: 40,
      editable: false,
      sortable: false,
      filter: false,
      resizable: false,
      cellStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        backgroundColor: "#fafafa",
        color: "#71717a",
        fontWeight: "bold",
      },
      onCellClicked: () => activeTable && insertColumn(activeTable.column_count),
    };

    return [rowNumberCol, ...dataCols, addColumnBtn];
  }, [activeTable, insertColumn]);

  // Row data - always show rows even if empty
  const rowData = useMemo(() => {
    if (!activeTable) return [];

    // Main rows
    const rows = Array.from({ length: activeTable.row_count }, (_, rowIdx) => {
      const row: Record<string, unknown> = {
        rowNumber: rowIdx + 1,
      };

      for (let colIdx = 0; colIdx < activeTable.column_count; colIdx++) {
        const cellData = cells.get(`${rowIdx}_${colIdx}`);
        row[`col_${colIdx}`] = cellData?.value ?? "";
      }

      row["addColumn"] = ""; // Empty for data rows
      return row;
    });

    // Add "+" row at the bottom
    const addRow: Record<string, unknown> = {
      rowNumber: "+",
      isAddRow: true,
    };

    // Fill other columns with empty strings
    for (let colIdx = 0; colIdx < activeTable.column_count; colIdx++) {
      addRow[`col_${colIdx}`] = "";
    }
    addRow["addColumn"] = "";

    return [...rows, addRow];
  }, [activeTable, cells]);

  // Handle cell selection
  const onCellClicked = (event: CellClickedEvent) => {
    if (event.data?.isAddRow) {
      if (activeTable) insertRow(activeTable.row_count);
      return;
    }

    const row = event.rowIndex;
    if (row === null || row === undefined) return;

    const colId = event.column.getColId();
    if (colId === "addColumn" || colId === "rowNumber") return;

    setSelectedCell({
      row,
      col: parseInt(colId.split("_")[1]),
    });
  };

  // Register grid API when ready
  const onGridReady = (params: GridReadyEvent) => {
    tableGridApi.setGridApi(params.api);
  };

  // Handle range selection changes for FormulaBar
  const onRangeSelectionChanged = (event: any) => {
    const ranges = event.api.getCellRanges();
    if (!ranges || ranges.length === 0) {
      setSelectedRange("");
      return;
    }

    const range = ranges[0];
    const startRowIndex = range.startRow?.rowIndex ?? 0;
    const endRowIndex = range.endRow?.rowIndex ?? 0;
    const startRow = Math.min(startRowIndex, endRowIndex) + 1;
    const endRow = Math.max(startRowIndex, endRowIndex) + 1;

    const colIds = range.columns.map((c: any) => c.getColId());
    const dataColIndices = colIds
      .filter((id: string) => id.startsWith("col_"))
      .map((id: string) => parseInt(id.split("_")[1]));

    if (dataColIndices.length === 0) {
      setSelectedRange("");
      return;
    }

    const startCol = String.fromCharCode(65 + Math.min(...dataColIndices));
    const endCol = String.fromCharCode(65 + Math.max(...dataColIndices));

    if (startRow === endRow && startCol === endCol) {
      setSelectedRange(`${startCol}${startRow}`);
    } else {
      setSelectedRange(`${startCol}${startRow}:${endCol}${endRow}`);
    }
  };

  // Handle cell value changed
  const onCellValueChanged = async (event: CellValueChangedEvent) => {
    const row = event.node?.rowIndex;
    if (row === undefined || row === null) return;

    const field = event.colDef.field;
    if (!field || field === "rowNumber") return;

    const colIndex = parseInt(field.split("_")[1]);
    if (isNaN(colIndex)) return;

    if (!activeTable?.activeVersion) return;

    await tableService.updateCell(tableId, activeTable.activeVersion.id, row, colIndex, {
      value: event.newValue,
    });
  };

  // Handle cell mouse enter for highlighting active cell and headers
  const onCellMouseOver = (event: any) => {
    const colId = event.colDef?.field;
    const rowIndex = event.rowIndex;

    if (!colId || rowIndex === null || rowIndex === undefined) return;

    // Remove previous highlights
    document
      .querySelectorAll(
        ".ag-cell.active-cell, .ag-cell.active-header, .ag-header-cell.active-header",
      )
      .forEach((el) => {
        el.classList.remove("active-cell", "active-header");
      });

    // Highlight only the active cell
    const activeCell = document.querySelector(
      `.ag-row[row-index="${rowIndex}"] .ag-cell[col-id="${colId}"]`,
    );
    if (activeCell) {
      activeCell.classList.add("active-cell");
    }

    // Highlight row number (parent)
    const rowNumberCell = document.querySelector(
      `.ag-row[row-index="${rowIndex}"] .ag-cell[col-id="rowNumber"]`,
    );
    if (rowNumberCell) {
      rowNumberCell.classList.add("active-header");
    }

    // Highlight column header (parent)
    const columnHeader = document.querySelector(`.ag-header-cell[col-id="${colId}"]`);
    if (columnHeader) {
      columnHeader.classList.add("active-header");
    }
  };

  // Handle mouse leave to remove highlights
  const onCellMouseOut = () => {
    document
      .querySelectorAll(
        ".ag-cell.active-cell, .ag-cell.active-header, .ag-header-cell.active-header",
      )
      .forEach((el) => {
        el.classList.remove("active-cell", "active-header");
      });
  };

  // Force grid refresh when cells change
  useEffect(() => {
    if (gridRef.current?.api) {
      gridRef.current.api.refreshCells({ force: true });
    }
  }, [cells]);

  // Handle context menu
  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();

    // Find the cell element
    const target = event.target as HTMLElement;
    const cellElement = target.closest(".ag-cell");

    if (cellElement) {
      const rowIndex = parseInt(cellElement.closest(".ag-row")?.getAttribute("row-index") || "-1");
      const colId = cellElement.getAttribute("col-id");

      if (rowIndex >= 0 && colId) {
        setContextMenu({
          x: event.clientX,
          y: event.clientY,
          rowIndex,
          colId,
        });
      }
    }
  };

  // Get context menu items
  const getContextMenuItems = () => {
    if (!contextMenu) return [];

    const items = [
      {
        label: "Копировать",
        action: () => tableService.copySelection(),
        shortcut: "Ctrl+C",
      },
      {
        label: "Вставить",
        action: () => tableService.paste(),
        shortcut: "Ctrl+V",
      },
      { separator: true } as any,
      {
        label: "Вставить строку выше",
        action: () => {
          if (contextMenu.rowIndex !== null) {
            insertRow(contextMenu.rowIndex);
          }
        },
      },
      {
        label: "Вставить строку ниже",
        action: () => {
          if (contextMenu.rowIndex !== null) {
            insertRow(contextMenu.rowIndex + 1);
          }
        },
      },
      {
        label: "Удалить строку",
        action: () => {
          if (contextMenu.rowIndex !== null) {
            deleteRow(contextMenu.rowIndex);
          }
        },
      },
      { separator: true } as any,
      {
        label: "Вставить столбец слева",
        action: () => {
          if (contextMenu.colId && contextMenu.colId.startsWith("col_")) {
            const colIndex = parseInt(contextMenu.colId.split("_")[1]);
            insertColumn(colIndex);
          }
        },
        disabled: contextMenu.colId === "rowNumber",
      },
      {
        label: "Вставить столбец справа",
        action: () => {
          if (contextMenu.colId && contextMenu.colId.startsWith("col_")) {
            const colIndex = parseInt(contextMenu.colId.split("_")[1]);
            insertColumn(colIndex + 1);
          }
        },
        disabled: contextMenu.colId === "rowNumber",
      },
      {
        label: "Удалить столбец",
        action: () => {
          if (contextMenu.colId && contextMenu.colId.startsWith("col_")) {
            const colIndex = parseInt(contextMenu.colId.split("_")[1]);
            deleteColumn(colIndex);
          }
        },
        disabled: contextMenu.colId === "rowNumber",
      },
      { separator: true } as any,
      {
        label: "Экспорт в CSV",
        action: () => tableService.exportToCsv("table-export.csv"),
      },
    ];

    return items;
  };

  // Show loader only on initial load (when we don't have table data yet)
  if (isLoading && !activeTable) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-500"></div>
        <div className="ml-3 text-zinc-500">Loading table...</div>
      </div>
    );
  }

  if (!activeTable && !isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-zinc-500">Table not found</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Table Header */}
      <TableHeader
        tableName={activeTable?.name || ""}
        description={activeTable?.description || ""}
        workspaceId={workspaceId}
      />

      {/* Main Toolbar */}
      <MainToolbar
        onFormatBold={() => {
          setIsBold(!isBold);
          cellFormattingService.applyBold(!isBold);
        }}
        onFormatItalic={() => {
          setIsItalic(!isItalic);
          cellFormattingService.applyItalic(!isItalic);
        }}
        onFormatUnderline={() => setIsUnderline(!isUnderline)}
        onAlignLeft={() => {
          setAlignment("left");
          cellFormattingService.applyAlignment("left");
        }}
        onAlignCenter={() => {
          setAlignment("center");
          cellFormattingService.applyAlignment("center");
        }}
        onAlignRight={() => {
          setAlignment("right");
          cellFormattingService.applyAlignment("right");
        }}
        onTextColor={(color) => cellFormattingService.applyTextColor(color)}
        onBackgroundColor={(color) => cellFormattingService.applyBackgroundColor(color)}
        isBold={isBold}
        isItalic={isItalic}
        isUnderline={isUnderline}
        alignment={alignment}
      />

      {/* Formula Bar - Always Visible */}
      {selectedCell && (
        <FormulaBar
          tableId={tableId}
          row={selectedCell.row}
          col={selectedCell.col}
          formulaEngine={formulaEngine}
          onUpdate={updateCell}
          selectedRange={selectedRange}
        />
      )}

      {/* AG Grid Container */}
      <div
        className="flex-1 ag-theme-quartz border-t border-[#e2e2e2] relative overflow-hidden"
        onContextMenu={handleContextMenu}
      >
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          // Grid Ready
          onGridReady={onGridReady}
          // Default column settings
          defaultColDef={{
            resizable: true,
          }}
          // Performance optimizations
          rowBuffer={10}
          suppressColumnVirtualisation={false}
          suppressRowVirtualisation={false}
          animateRows={false}
          suppressRowTransform={true}
          // Stable Row IDs
          getRowId={(params) => params.data.rowNumber.toString()}
          // Disable default context menu
          suppressContextMenu={true}
          // Cell Editing
          singleClickEdit={false}
          stopEditingWhenCellsLoseFocus={true}
          enterNavigatesVertically={true}
          enterNavigatesVerticallyAfterEdit={true}
          // Clipboard
          enableRangeSelection={true}
          enableFillHandle={true}
          fillHandleDirection="xy"
          // Undo/Redo
          undoRedoCellEditing={true}
          undoRedoCellEditingLimit={20}
          // Events
          onCellClicked={onCellClicked}
          onCellValueChanged={onCellValueChanged}
          onCellMouseOver={onCellMouseOver}
          onCellMouseOut={onCellMouseOut}
          onRangeSelectionChanged={onRangeSelectionChanged}
        />
      </div>

      {/* Sheet Tabs */}
      <SheetTabs
        sheets={[{ id: tableId, name: activeTable?.name || "Sheet1", order: 0 }]}
        activeSheetId={tableId}
        onSheetChange={(id) => console.log("Switch to sheet:", id)}
        onAddSheet={() => console.log("Add new sheet")}
      />

      {/* Custom Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={getContextMenuItems()}
          onClose={() => setContextMenu(null)}
        />
      )}
    </div>
  );
}
