"use client";

import { TableFormulaEngine } from "@frontend/modules/table/lib/engine";
import { extractTableReferences } from "@frontend/modules/table/lib/TableReferenceParser";
import type { CellData } from "@frontend/modules/table/types/cell.types";
import { ChevronDown, ExternalLink, Link2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface FormulaBarProps {
  tableId: string;
  row: number;
  col: number;
  formulaEngine: TableFormulaEngine;
  onUpdate: (row: number, col: number, data: CellData) => void;
  selectedRange?: string;
  onRangeSelect?: (range: string) => void;
  onInsertAddress?: (address: string) => void;
}

export function FormulaBar({
  tableId,
  row,
  col,
  formulaEngine,
  onUpdate,
  selectedRange,
  onRangeSelect,
  onInsertAddress,
}: FormulaBarProps) {
  const [value, setValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [crossTableRefs, setCrossTableRefs] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const cellAddress = selectedRange || formatCellAddress(row, col);

  // Update value when selected cell changes
  useEffect(() => {
    const formula = formulaEngine.getCellFormula(tableId, row, col);
    const cellValue = formulaEngine.getCellValue(tableId, row, col);

    if (formula) {
      setValue(formula);
      // Extract cross-table references for highlighting
      const refs = extractTableReferences(formula);
      setCrossTableRefs(
        refs.map(
          (ref: {
            isCrossWorkspace?: boolean;
            isCrossTable?: boolean;
            tableName?: string;
            workspaceId?: string;
            startCell: string;
          }) => {
            if (ref.isCrossWorkspace && ref.tableName) {
              return `${ref.workspaceId || ""}:${ref.tableName}!${ref.startCell}`;
            } else if (ref.isCrossTable && ref.tableName) {
              return `${ref.tableName}!${ref.startCell}`;
            }
            return ref.startCell;
          },
        ),
      );
    } else {
      setValue(cellValue?.toString() || "");
      setCrossTableRefs([]);
    }
    setValidationError(null);
  }, [tableId, row, col, formulaEngine]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (newValue.startsWith("=")) {
      const validation = formulaEngine.validateFormula(newValue);
      if (!validation.isValid) {
        setValidationError(validation.error || "Invalid formula");
      } else {
        setValidationError(null);
        // Extract cross-table references for highlighting
        const refs = extractTableReferences(newValue);
        setCrossTableRefs(
          refs.map(
            (ref: {
              isCrossWorkspace?: boolean;
              isCrossTable?: boolean;
              tableName?: string;
              workspaceId?: string;
              startCell: string;
            }) => {
              if (ref.isCrossWorkspace && ref.tableName) {
                return `${ref.workspaceId || ""}:${ref.tableName}!${ref.startCell}`;
              } else if (ref.isCrossTable && ref.tableName) {
                return `${ref.tableName}!${ref.startCell}`;
              }
              return ref.startCell;
            },
          ),
        );
      }
    } else {
      setValidationError(null);
      setCrossTableRefs([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  const handleSubmit = () => {
    if (validationError) return;
    const cellData: CellData = value.startsWith("=") ? { formula: value } : { value };
    onUpdate(row, col, cellData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    const formula = formulaEngine.getCellFormula(tableId, row, col);
    const cellValue = formulaEngine.getCellValue(tableId, row, col);
    setValue(formula || cellValue?.toString() || "");
    setIsEditing(false);
    setValidationError(null);
  };

  const handleFocus = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    if (!validationError) {
      handleSubmit();
    }
  };

  // Insert address at cursor position
  const insertAddress = useCallback(
    (address: string) => {
      if (inputRef.current) {
        const cursorPos = inputRef.current.selectionStart || 0;
        const newValue = value.slice(0, cursorPos) + address + value.slice(cursorPos);
        setValue(newValue);
        inputRef.current.focus();
        inputRef.current.setSelectionRange(cursorPos + address.length, cursorPos + address.length);
      }
    },
    [value],
  );

  // Highlight cross-table references in formula
  const renderHighlightedValue = () => {
    if (!value.startsWith("=") || crossTableRefs.length === 0) {
      return null;
    }

    let content = value;
    crossTableRefs.forEach((ref) => {
      const regex = new RegExp(ref.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
      content = content.replace(regex, `%%${ref}%%`);
    });

    const parts = content.split("%%");
    return (
      <div className="absolute inset-0 px-2 py-1 text-[13px] font-['Roboto'] pointer-events-none whitespace-nowrap flex items-center">
        {parts.map((part, i) => {
          if (crossTableRefs.includes(part)) {
            return (
              <span
                key={i}
                className="text-blue-600 bg-blue-50 px-1 rounded flex items-center gap-0.5"
              >
                <Link2 className="w-3 h-3" />
                {part}
              </span>
            );
          }
          return <span key={i}>{part}</span>;
        })}
      </div>
    );
  };

  return (
    <div className="border-b border-[#e2e2e2] bg-white px-4 py-1.5 flex items-center gap-3">
      {/* Cell Address Display */}
      <div className="flex items-center gap-1 min-w-[80px]">
        <div
          className="text-[13px] font-medium text-[#3c4043] px-2 py-1 border border-[#dadce0] rounded bg-white cursor-pointer hover:bg-gray-50"
          title={cellAddress}
          onClick={() => onRangeSelect?.(cellAddress)}
        >
          {cellAddress}
        </div>
        <button className="p-1 hover:bg-gray-100 rounded" title="Name box options">
          <ChevronDown className="w-3 h-3 text-[#5f6368]" />
        </button>
      </div>

      <div className="w-px h-5 bg-[#dadce0]" />

      {/* Functions Button */}
      <button
        type="button"
        className="px-2 py-1 text-[14px] font-medium text-[#5f6368] hover:bg-gray-100 rounded transition-colors"
        title="Insert function"
      >
        ƒₓ
      </button>

      {/* Formula Input */}
      <div className="flex-1 relative">
        {isEditing ? (
          <>
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder=""
              className={`w-full px-2 py-1 text-[13px] font-['Roboto'] border-0 focus:outline-none bg-white ${
                validationError ? "text-red-600" : ""
              }`}
            />
            {validationError && (
              <div className="absolute top-full left-0 mt-1 text-[11px] text-red-600 bg-red-50 px-2 py-1 rounded border border-red-200 shadow-sm z-10">
                ⚠️ {validationError}
              </div>
            )}
          </>
        ) : (
          <div className="w-full px-2 py-1 text-[13px] font-['Roboto'] bg-transparent flex items-center gap-1">
            {value.startsWith("=") && crossTableRefs.length > 0 ? (
              <div className="flex items-center gap-1 flex-wrap">
                <span>=</span>
                {value
                  .slice(1)
                  .split(
                    /(Table![A-Z]+[0-9]+(?::[A-Z]+[0-9]+)?|Workspace:[^!]+![A-Z]+[0-9]+(?::[A-Z]+[0-9]+)?)/g,
                  )
                  .map((part, i) => {
                    const isRef = part.startsWith("Table!") || part.startsWith("Workspace:");
                    if (isRef) {
                      return (
                        <span
                          key={i}
                          className="text-blue-600 bg-blue-50 px-1 rounded flex items-center gap-0.5"
                        >
                          <Link2 className="w-3 h-3" />
                          {part}
                        </span>
                      );
                    }
                    return <span key={i}>{part}</span>;
                  })}
              </div>
            ) : (
              <span>{value}</span>
            )}
          </div>
        )}
      </div>

      {/* Cross-table indicator */}
      {crossTableRefs.length > 0 && (
        <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">
          <ExternalLink className="w-3 h-3" />
          {crossTableRefs.length} linked
        </div>
      )}
    </div>
  );
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
