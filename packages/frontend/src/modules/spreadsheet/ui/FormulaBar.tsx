import React, { useState, useEffect } from 'react';
import { useSpreadsheetStore } from '../stores/useSpreadsheetStore';
import { formulaEngine } from '../lib/formula-engine';
import { toA1 } from '../lib/address-utils';

export const FormulaBar: React.FC = () => {
  const { 
    activeSheetId, 
    selectedCell, 
    updateCellLocal 
  } = useSpreadsheetStore();
  
  const [inputValue, setInputValue] = useState('');

  // Sync input value with selected cell
  useEffect(() => {
    if (activeSheetId && selectedCell) {
      const formula = formulaEngine.getCellFormula(activeSheetId, selectedCell.row, selectedCell.col);
      const value = formulaEngine.getCellValue(activeSheetId, selectedCell.row, selectedCell.col);
      setInputValue(formula || (value !== null ? String(value) : ''));
    } else {
      setInputValue('');
    }
  }, [activeSheetId, selectedCell]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && activeSheetId && selectedCell) {
      const { row, col } = selectedCell;
      
      // Update engine
      formulaEngine.setCellValue(activeSheetId, row, col, inputValue);
      
      // Update store
      updateCellLocal(activeSheetId, row, col, {
        raw_value: inputValue,
        // formula: inputValue.startsWith('=') ? inputValue : null
      });
      
      e.currentTarget.blur();
    }
  };

  const cellAddress = selectedCell ? toA1(selectedCell.row, selectedCell.col) : '';

  return (
    <div className="flex items-center gap-2 p-1 border-b bg-white">
      <div className="flex items-center justify-center w-12 h-8 font-mono text-sm bg-gray-100 border rounded">
        {cellAddress}
      </div>
      <div className="text-gray-400 font-italic px-2 text-lg">fx</div>
      <input
        type="text"
        className="flex-1 h-8 px-2 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter value or formula starting with ="
      />
    </div>
  );
};
