import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { TableFormulaEngine } from "../lib/engine";
import { TableReference, extractTableReferences } from "../../../lib/table/TableReferenceParser";
import { CellData } from "../types";

export interface FormulaState {
  formulaEngine: TableFormulaEngine;
  currentFormula: string;
  displayValue: string | null;
  validationErrors: string[];
  crossTableRefs: TableReference[];
  isEditing: boolean;
  lastCalculatedCell: string | null;

  setFormula: (formula: string) => void;
  setDisplayValue: (value: string | null) => void;
  setValidationErrors: (errors: string[]) => void;
  setCrossTableRefs: (refs: TableReference[]) => void;
  setEditing: (editing: boolean) => void;
  setLastCalculatedCell: (cell: string | null) => void;
  resetFormula: () => void;
  validateFormula: (formula: string) => { isValid: boolean; error?: string };
  evaluateFormula: (
    formula: string,
    tableId: string,
    row: number,
    col: number,
  ) => Promise<string | null>;
  addCrossTableData: (tableId: string, data: CellData[][]) => void;
  extractCrossTableRefs: (formula: string) => TableReference[];
}

function formatCellAddressFromRC(row: number, col: number): string {
  let colLetter = "";
  let colNum = col;
  while (colNum >= 0) {
    colLetter = String.fromCharCode(65 + (colNum % 26)) + colLetter;
    colNum = Math.floor(colNum / 26) - 1;
  }
  return `${colLetter}${row + 1}`;
}

export const useFormulaStore = create<FormulaState>()(
  subscribeWithSelector((set, get) => ({
    formulaEngine: new TableFormulaEngine(),
    currentFormula: "",
    displayValue: null,
    validationErrors: [],
    crossTableRefs: [],
    isEditing: false,
    lastCalculatedCell: null,

    setFormula: (formula) => {
      set({ currentFormula: formula });
      const refs = extractTableReferences(formula);
      set({ crossTableRefs: refs });
    },

    setDisplayValue: (value) => set({ displayValue: value }),

    setValidationErrors: (errors) => set({ validationErrors: errors }),

    setCrossTableRefs: (refs) => set({ crossTableRefs: refs }),

    setEditing: (editing) => set({ isEditing: editing }),

    setLastCalculatedCell: (cell) => set({ lastCalculatedCell: cell }),

    resetFormula: () =>
      set({
        currentFormula: "",
        displayValue: null,
        validationErrors: [],
        crossTableRefs: [],
        isEditing: false,
      }),

    validateFormula: (formula) => {
      const { formulaEngine } = get();
      return formulaEngine.validateFormula(formula);
    },

    evaluateFormula: async (formula, tableId, row, col) => {
      const { formulaEngine } = get();

      try {
        const validation = formulaEngine.validateFormula(formula);
        if (!validation.isValid) {
          set({
            validationErrors: validation.error ? [validation.error] : [],
            displayValue: null,
          });
          return null;
        }

        formulaEngine.setCellContent(tableId, row, col, { formula });
        const value = formulaEngine.getCellValue(tableId, row, col);

        const display =
          value instanceof Error
            ? `#ERROR: ${value.message}`
            : typeof value === "number"
              ? value.toLocaleString()
              : String(value ?? "");

        set({
          displayValue: display,
          validationErrors: [],
          lastCalculatedCell: formatCellAddressFromRC(row, col),
        });

        return display;
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        set({
          validationErrors: [message],
          displayValue: null,
        });
        return null;
      }
    },

    addCrossTableData: (tableId, data) => {
      const { formulaEngine } = get();
      formulaEngine.addTable(tableId, data);
    },

    extractCrossTableRefs: (formula) => {
      return extractTableReferences(formula);
    },
  })),
);
