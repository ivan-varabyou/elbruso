'use client';

import { useState, useEffect, useRef } from 'react';
import { TableFormulaEngine } from '@/shared/lib/hyperformula';
import type { CellData } from '@/shared/types';
import { ChevronDown } from 'lucide-react';

interface FormulaBarProps {
  tableId: string;
  row: number;
  col: number;
  formulaEngine: TableFormulaEngine;
  onUpdate: (row: number, col: number, data: CellData) => void;
  selectedRange?: string; // e.g., "A1:B5" or "C3"
}

export function FormulaBar({ 
  tableId, 
  row, 
  col, 
  formulaEngine, 
  onUpdate,
  selectedRange 
}: FormulaBarProps) {
  const [value, setValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Get cell address (e.g., "A1" or range "A1:B5")
  const cellAddress = selectedRange || `${String.fromCharCode(65 + col)}${row + 1}`;

  // Update value when selected cell changes
  useEffect(() => {
    const formula = formulaEngine.getCellFormula(tableId, row, col);
    const cellValue = formulaEngine.getCellValue(tableId, row, col);
    
    if (formula) {
      setValue(formula);
    } else {
      setValue(cellValue?.toString() || '');
    }
    setValidationError(null);
  }, [tableId, row, col, formulaEngine]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    // Validate formula
    if (newValue.startsWith('=')) {
      const validation = formulaEngine.validateFormula(newValue);
      if (!validation.isValid) {
        setValidationError(validation.error || 'Invalid formula');
      } else {
        setValidationError(null);
      }
    } else {
      setValidationError(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleSubmit = () => {
    if (validationError) return;

    const cellData: CellData = value.startsWith('=')
      ? { formula: value }
      : { value };

    onUpdate(row, col, cellData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    const formula = formulaEngine.getCellFormula(tableId, row, col);
    const cellValue = formulaEngine.getCellValue(tableId, row, col);
    setValue(formula || cellValue?.toString() || '');
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

  return (
    <div className="border-b border-[#e2e2e2] bg-white px-4 py-1.5 flex items-center gap-3">
      {/* Cell Address Display */}
      <div className="flex items-center gap-1 min-w-[80px]">
        <div className="text-[13px] font-medium text-[#3c4043] px-2 py-1 border border-[#dadce0] rounded bg-white">
          {cellAddress}
        </div>
        <button 
          className="p-1 hover:bg-gray-100 rounded"
          title="Name box options"
        >
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
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder=""
          className={`w-full px-2 py-1 text-[13px] font-['Roboto'] border-0 focus:outline-none ${
            validationError
              ? 'text-red-600'
              : isEditing
              ? 'bg-white'
              : 'bg-transparent'
          }`}
        />
        {validationError && (
          <div className="absolute top-full left-0 mt-1 text-[11px] text-red-600 bg-red-50 px-2 py-1 rounded border border-red-200 shadow-sm z-10">
            ⚠️ {validationError}
          </div>
        )}
      </div>
    </div>
  );
}
