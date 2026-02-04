import type { CellUpdate } from "@elbruso/modules/table/types";
import { useTableStore } from "@elbruso/stores";

import type { CellData, CellStyle } from "../types/cell.types";
import { tableGridApiService } from "./table-grid-api.service";

/**
 * Service for applying cell formatting (bold, italic, colors, alignment, etc.)
 */
class CellFormattingService {
  /**
   * Helper to apply formatting to selected ranges
   */
  private applyFormatting(formatter: (currentData: CellData) => CellData) {
    const api = tableGridApiService.getGridApi();
    if (!api) return;

    const selectedRanges = api.getCellRanges();
    if (!selectedRanges || selectedRanges.length === 0) return;

    const { cells, batchUpdateCells } = useTableStore.getState();
    const updates: CellUpdate[] = [];

    selectedRanges.forEach((range) => {
      const startRow = Math.min(range.startRow?.rowIndex ?? 0, range.endRow?.rowIndex ?? 0);
      const endRow = Math.max(range.startRow?.rowIndex ?? 0, range.endRow?.rowIndex ?? 0);

      const columns = range.columns;

      for (let rowIndex = startRow; rowIndex <= endRow; rowIndex++) {
        columns.forEach((column) => {
          const colId = column.getColId();
          if (colId === "rowNumber" || colId === "addColumn") return;

          const colIndex = parseInt(colId.split("_")[1]);
          const currentData = cells.get(`${rowIndex}_${colIndex}`) || {};

          const updatedData = formatter(currentData);

          updates.push({
            row: rowIndex,
            col: colIndex,
            data: updatedData,
          });
        });
      }
    });

    if (updates.length > 0) {
      batchUpdateCells(updates);
    }
  }

  /**
   * Apply bold formatting to selected cells
   */
  applyBold(isBold: boolean) {
    this.applyFormatting((current) => ({
      ...current,
      style: {
        ...(current.style || {}),
        fontWeight: isBold ? "bold" : "normal",
      },
    }));
  }

  /**
   * Apply italic formatting to selected cells
   */
  applyItalic(isItalic: boolean) {
    this.applyFormatting((current) => ({
      ...current,
      style: {
        ...(current.style || {}),
        fontStyle: isItalic ? "italic" : "normal",
      },
    }));
  }

  /**
   * Apply underline formatting
   */
  applyUnderline(isUnderline: boolean) {
    this.applyFormatting((current) => ({
      ...current,
      style: {
        ...(current.style || {}),
        textDecoration: isUnderline ? "underline" : "none",
      },
    }));
  }

  /**
   * Apply text color to selected cells
   */
  applyTextColor(color: string) {
    this.applyFormatting((current) => ({
      ...current,
      style: {
        ...(current.style || {}),
        textColor: color,
      },
    }));
  }

  /**
   * Apply background color to selected cells
   */
  applyBackgroundColor(color: string) {
    this.applyFormatting((current) => ({
      ...current,
      style: {
        ...(current.style || {}),
        backgroundColor: color,
      },
    }));
  }

  /**
   * Apply text alignment to selected cells
   */
  applyAlignment(alignment: "left" | "center" | "right") {
    this.applyFormatting((current) => ({
      ...current,
      style: {
        ...(current.style || {}),
        textAlign: alignment,
      },
    }));
  }

  /**
   * Get current formatting of selected cell
   */
  getCurrentFormatting(): Partial<CellStyle> {
    const api = tableGridApiService.getGridApi();
    if (!api) return {};

    const focusedCell = api.getFocusedCell();
    if (!focusedCell) return {};

    const { cells } = useTableStore.getState();
    const colId = focusedCell.column.getColId();
    if (colId === "rowNumber" || colId === "addColumn") return {};

    const colIndex = parseInt(colId.split("_")[1]);
    const cellData = cells.get(`${focusedCell.rowIndex}_${colIndex}`);

    return cellData?.style || {};
  }
}

export const cellFormattingService = new CellFormattingService();
