"use client";

import "ag-grid-community/styles/ag-theme-quartz.css";
import "./TableTheme.css";

import {
  AllCommunityModule,
  CellClickedEvent,
  CellValueChangedEvent,
  ColDef,
  GridReadyEvent,
  ModuleRegistry,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// Register all community modules
ModuleRegistry.registerModules([AllCommunityModule]);

import { WorkspaceTableTabs } from "@elbruso/modules/profile/ui";
import {
  useFormattingStore,
  useFormulaStore,
  useHistoryStore,
  useSelectionStore,
  useTableStore,
} from "@elbruso/stores";

import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts.hook";
import { TableFormulaEngine } from "../lib/engine";
import {
  cellFormattingService,
  tableGridApiService,
  tableService,
} from "../services/table.service";
import type { CellData } from "../types/cell.types";
import { ContextMenu } from "./ContextMenu.smart";
import { FormulaBar } from "./FormulaBar.smart";
import { MainToolbar } from "./MainToolbar.dumb";
import { TableHeader } from "./TableHeader.smart";

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
  const error = useTableStore((state) => state.error);
  const loadTable = useTableStore((state) => state.loadTable);
  const insertRow = useTableStore((state) => state.insertRow);
  const deleteRow = useTableStore((state) => state.deleteRow);
  const insertColumn = useTableStore((state) => state.insertColumn);
  const deleteColumn = useTableStore((state) => state.deleteColumn);
  const updateCell = useTableStore((state) => state.updateCell);

  const [formulaEngine] = useState(() => new TableFormulaEngine());

  // Selection store
  const selectedCell = useSelectionStore((state) => state.selectedCell);
  const selectionStart = useSelectionStore((state) => state.selectionStart);
  const selectionEnd = useSelectionStore((state) => state.selectionEnd);
  const selectedRange = useSelectionStore((state) => state.selectedRange);
  const isSelecting = useSelectionStore((state) => state.isSelecting);
  const dragStartCell = useSelectionStore((state) => state.dragStartCell);
  const setSelectedCell = useSelectionStore((state) => state.setSelectedCell);
  const startSelection = useSelectionStore((state) => state.startSelection);
  const updateSelection = useSelectionStore((state) => state.updateSelection);
  const endSelection = useSelectionStore((state) => state.endSelection);
  const setSelectedRange = useSelectionStore((state) => state.setSelectedRange);

  // Formatting store
  const isBold = useFormattingStore((state) => state.isBold);
  const isItalic = useFormattingStore((state) => state.isItalic);
  const isUnderline = useFormattingStore((state) => state.isUnderline);
  const alignment = useFormattingStore((state) => state.alignment);
  const setBold = useFormattingStore((state) => state.setBold);
  const setItalic = useFormattingStore((state) => state.setItalic);
  const setUnderline = useFormattingStore((state) => state.setUnderline);
  const setAlignment = useFormattingStore((state) => state.setAlignment);

  // Formula store
  const currentFormula = useFormulaStore((state) => state.currentFormula);
  const displayValue = useFormulaStore((state) => state.displayValue);
  const validationErrors = useFormulaStore((state) => state.validationErrors);
  const crossTableRefs = useFormulaStore((state) => state.crossTableRefs);
  const setFormula = useFormulaStore((state) => state.setFormula);
  const validateFormula = useFormulaStore((state) => state.validateFormula);
  const evaluateFormula = useFormulaStore((state) => state.evaluateFormula);
  const resetFormula = useFormulaStore((state) => state.resetFormula);

  // History store
  const addEntry = useHistoryStore((state) => state.addEntry);
  const undo = useHistoryStore((state) => state.undo);
  const canUndo = useHistoryStore((state) => state.canUndo);
  const canRedo = useHistoryStore((state) => state.canRedo);

  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);

  const gridRef = useRef<AgGridReact<unknown>>(null) as React.MutableRefObject<
    AgGridReact<unknown>
  >;

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

    const dataCols: ColDef[] = columns.map((col: { width?: number }, idx: number) => ({
      field: `col_${idx}`,
      headerName: String.fromCharCode(65 + idx), // A, B, C, D...
      width: col.width || 150,
      editable: true,
      cellEditor: "agTextCellEditor",
      cellClassRules: {
        "range-selection-start": (params: { node: { rowIndex: number | null } }) => {
          if (!selectionStart || !selectionEnd) return false;
          const row = params.node.rowIndex;
          const col = idx;
          return row === selectionStart.row && col === selectionStart.col;
        },
        "range-selection-end": (params: { node: { rowIndex: number | null } }) => {
          if (!selectionStart || !selectionEnd) return false;
          const row = params.node.rowIndex;
          const col = idx;
          return row === selectionEnd.row && col === selectionEnd.col;
        },
        "range-selection-middle": (params: { node: { rowIndex: number | null } }) => {
          if (!selectionStart || !selectionEnd) return false;
          const row = params.node.rowIndex;
          const col = idx;
          const minRow = Math.min(selectionStart.row, selectionEnd.row);
          const maxRow = Math.max(selectionStart.row, selectionEnd.row);
          const minCol = Math.min(selectionStart.col, selectionEnd.col);
          const maxCol = Math.max(selectionStart.col, selectionEnd.col);
          return (
            row !== null &&
            row >= minRow &&
            row <= maxRow &&
            col >= minCol &&
            col <= maxCol &&
            !(row === selectionStart.row && col === selectionStart.col) &&
            !(row === selectionEnd.row && col === selectionEnd.col)
          );
        },
      },
      cellStyle: (params: { node: { rowIndex: number | null | undefined } }) => {
        const rowIdx = params.node.rowIndex;
        if (rowIdx === null || rowIdx === undefined) return null;
        const cellData = (cells as Map<string, CellData>).get(`${rowIdx}_${idx}`);
        if (!cellData?.style) return null;

        const style = cellData.style;
        return {
          fontWeight: style.fontWeight || "normal",
          fontStyle: style.fontStyle || "normal",
          textDecoration: style.textDecoration || "none",
          textAlign: style.textAlign || "left",
          color: style.textColor || "inherit",
          backgroundColor: style.backgroundColor || "transparent",
        };
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

  // Handle cell mouse down - start drag selection
  const onCellMouseDown = useCallback(
    (event: {
      node?: { rowIndex: number | null | undefined };
      colDef?: { field?: string };
      data?: { isAddRow?: boolean };
      shiftKey?: boolean;
    }) => {
      const rowIndex = event.node?.rowIndex;
      const colDef = event.colDef;
      const colId = colDef?.field;

      if (rowIndex === null || rowIndex === undefined) return;
      if (colId === "addColumn" || colId === "rowNumber" || colId === undefined) return;
      if (event.data?.isAddRow) return;

      const col = parseInt(colId.split("_")[1]);
      const cell = { row: rowIndex, col };

      // Start drag selection (only if not holding Shift)
      if (!event.shiftKey) {
        startSelection(cell);
      }
    },
    [startSelection],
  );

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

    const col = parseInt(colId.split("_")[1]);
    setSelectedCell({ row, col });

    // Start range selection if Shift is pressed
    const nativeEvent = (event as unknown as { nativeEvent?: { shiftKey?: boolean } }).nativeEvent;
    if ((event as unknown as { shiftKey?: boolean }).shiftKey || nativeEvent?.shiftKey) {
      if (selectedCell) {
        startSelection(selectedCell);
        updateSelection({ row, col });
      }
    }
  };

  // Register grid API when ready
  const onGridReady = (params: GridReadyEvent) => {
    tableGridApiService.setGridApi(params.api);
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
  const onCellMouseOver = (event: {
    colDef?: { field?: string };
    rowIndex: number | null | undefined;
  }) => {
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

  // Handle drag selection via document-level mouse events
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isSelecting || !dragStartCell || !gridRef.current) return;

      // Find cell under cursor
      const target = document.elementFromPoint(e.clientX, e.clientY);
      const cellElement = target?.closest(".ag-cell");

      if (cellElement) {
        const rowElement = cellElement.closest(".ag-row");
        const rowIndex = rowElement ? parseInt(rowElement.getAttribute("row-index") || "-1") : -1;
        const colId = cellElement.getAttribute("col-id");

        if (rowIndex >= 0 && colId && colId.startsWith("col_")) {
          const col = parseInt(colId.split("_")[1]);
          updateSelection({ row: rowIndex, col });
        }
      }
    };

    const handleMouseUp = () => {
      if (isSelecting) {
        endSelection();
      }
    };

    if (isSelecting) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isSelecting, dragStartCell]);

  // Position fill handle when selected cell changes
  useEffect(() => {
    if (!selectedCell) return;

    const fillHandle = document.getElementById("fill-handle");
    const cellElement = document.querySelector(
      `.ag-row[row-index="${selectedCell.row}"] .ag-cell[col-id="col_${selectedCell.col}"]`,
    );

    if (fillHandle && cellElement) {
      const cellRect = cellElement.getBoundingClientRect();

      const container = document.querySelector(".ag-theme-quartz");
      if (container) {
        const containerRect = container.getBoundingClientRect();
        fillHandle.style.left = `${cellRect.right - containerRect.left - 4}px`;
        fillHandle.style.top = `${cellRect.bottom - containerRect.top - 4}px`;
        fillHandle.style.display = "block";
        fillHandle.style.position = "absolute";
      }
    }
  }, [selectedCell, cells]);

  // Fill handle drag functionality
  useEffect(() => {
    const fillHandle = document.getElementById("fill-handle");
    if (!fillHandle || !selectedCell) return;

    let isFilling = false;
    let fillStartCell: { row: number; col: number } | null = null;

    const handleFillMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      isFilling = true;
      fillStartCell = selectedCell;
    };

    const handleFillMouseMove = (e: MouseEvent) => {
      if (!isFilling || !fillStartCell || !gridRef.current) return;

      const target = document.elementFromPoint(e.clientX, e.clientY);
      const cellElement = target?.closest(".ag-cell");

      if (cellElement) {
        const rowElement = cellElement.closest(".ag-row");
        const rowIndex = rowElement ? parseInt(rowElement.getAttribute("row-index") || "-1") : -1;
        const colId = cellElement.getAttribute("col-id");

        if (rowIndex >= 0 && colId && colId.startsWith("col_")) {
          const col = parseInt(colId.split("_")[1]);

          // Visual feedback - highlight fill range
          if (fillStartCell) {
            startSelection(fillStartCell);
            updateSelection({ row: rowIndex, col });
          }
        }
      }
    };

    const handleFillMouseUp = async (e: MouseEvent) => {
      if (!isFilling || !fillStartCell) return;

      const target = document.elementFromPoint(e.clientX, e.clientY);
      const cellElement = target?.closest(".ag-cell");

      if (cellElement) {
        const rowElement = cellElement.closest(".ag-row");
        const rowIndex = rowElement ? parseInt(rowElement.getAttribute("row-index") || "-1") : -1;
        const colId = cellElement.getAttribute("col-id");

        if (rowIndex >= 0 && colId && colId.startsWith("col_")) {
          const col = parseInt(colId.split("_")[1]);

          // TODO: Implement fill range functionality
          console.log("Fill range from", fillStartCell, "to", { row: rowIndex, col });
        }
      }

      isFilling = false;
      fillStartCell = null;
    };

    fillHandle.addEventListener("mousedown", handleFillMouseDown);
    document.addEventListener("mousemove", handleFillMouseMove);
    document.addEventListener("mouseup", handleFillMouseUp);

    return () => {
      fillHandle.removeEventListener("mousedown", handleFillMouseDown);
      document.removeEventListener("mousemove", handleFillMouseMove);
      document.removeEventListener("mouseup", handleFillMouseUp);
    };
  }, [selectedCell, tableId]);

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
  const getContextMenuItems = (): Array<{
    label: string;
    action: () => void;
    shortcut?: string;
    separator?: boolean;
    disabled?: boolean;
  }> => {
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
      { label: "", action: () => {}, separator: true },
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
      { label: "", action: () => {}, separator: true },
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
      { label: "", action: () => {}, separator: true },
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
        <div className="text-zinc-500">{error?.message || "Table not found"}</div>
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

      {/* Workspace Table Tabs */}
      <WorkspaceTableTabs workspaceId={workspaceId} />

      {/* Main Toolbar */}
      <MainToolbar
        onFormatBold={() => {
          setBold(!isBold);
          cellFormattingService.applyBold(!isBold);
        }}
        onFormatItalic={() => {
          setItalic(!isItalic);
          cellFormattingService.applyItalic(!isItalic);
        }}
        onFormatUnderline={() => setUnderline(!isUnderline)}
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
          onRangeSelect={(range) => setSelectedRange(range)}
          onInsertAddress={(address) => {
            // Handle inserting address into formula (can be used for clipboard operations)
            console.log("Insert address:", address);
          }}
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
          // Undo/Redo
          undoRedoCellEditing={true}
          undoRedoCellEditingLimit={20}
          // Events
          onCellClicked={(event) => {
            onCellClicked(event);
            // Also set selectedCell directly to ensure FormulaBar shows
            const row = event.rowIndex;
            if (row === null || row === undefined) return;
            const colId = event.column.getColId();
            if (colId === "addColumn" || colId === "rowNumber") return;
            const col = parseInt(colId.split("_")[1]);
            setSelectedCell({ row, col });
          }}
          onCellMouseDown={onCellMouseDown}
          onCellFocused={(event: {
            rowIndex: number | null | undefined;
            colDef?: { field?: string };
          }) => {
            const rowIndex = event.rowIndex;
            const colDef = event.colDef;
            if (rowIndex === null || rowIndex === undefined) return;
            const colId = colDef?.field;
            if (!colId || colId === "addColumn" || colId === "rowNumber") return;
            const col = parseInt(colId.split("_")[1]);
            setSelectedCell({ row: rowIndex, col });
          }}
          onCellValueChanged={onCellValueChanged}
          onCellMouseOver={onCellMouseOver}
          onCellMouseOut={onCellMouseOut}
        />
      </div>

      {/* Custom Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={getContextMenuItems()}
          onClose={() => setContextMenu(null)}
        />
      )}

      {/* Fill Handle - appears in bottom-right corner of selected cell */}
      {selectedCell && !isSelecting && (
        <div
          id="fill-handle"
          className="absolute w-3 h-3 bg-blue-500 cursor-crosshair z-10"
          style={{ display: "none" }}
          title="Drag to fill values"
        />
      )}
    </div>
  );
}
