import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Button, Spinner } from '@heroui/react';
import { useSpreadsheetStore } from '../stores/useSpreadsheetStore';
import { spreadsheetApi } from '../api/spreadsheet.api';
import { formulaEngine } from '../lib/formula-engine';
import { SpreadsheetGrid } from './SpreadsheetGrid';
import { FormulaBar } from './FormulaBar';

interface SpreadsheetEditorProps {
  spreadsheetId: string;
}

export const SpreadsheetEditor: React.FC<SpreadsheetEditorProps> = ({ spreadsheetId }) => {
  const { 
    activeSpreadsheet, 
    setActiveSpreadsheet, 
    activeSheetId, 
    setActiveSheetId,
    isLoading,
    setLoading,
    setError 
  } = useSpreadsheetStore();

  const [isInitializing, setIsInitializing] = useState(true);

  // Initialize spreadsheet data
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const data = await spreadsheetApi.getSpreadsheet(spreadsheetId);
        setActiveSpreadsheet(data);
        
        // Sync formula engine
        if (data.sheets) {
          formulaEngine.syncSheets(data.sheets);
        }
        
        setIsInitializing(false);
      } catch (err: any) {
        setError(err.message || 'Failed to load spreadsheet');
      } finally {
        setLoading(false);
      }
    };
    init();

    return () => {
      // formulaEngine.destroy(); // Optional: destroy if we want a fresh start next time
    };
  }, [spreadsheetId, setActiveSpreadsheet, setLoading, setError]);

  if (isInitializing || isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner label="Загрузка редактора..." />
      </div>
    );
  }

  if (!activeSpreadsheet) {
    return (
      <div className="flex items-center justify-center h-full text-danger">
        Spreadsheet not found
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-hidden">
      {/* Header/Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b bg-white">
        <div>
          <h1 className="text-lg font-bold">{activeSpreadsheet.name}</h1>
          <p className="text-xs text-gray-500">{activeSpreadsheet.description}</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" color="primary">Сохранить</Button>
          <Button size="sm" variant="flat">Поделиться</Button>
        </div>
      </div>

      {/* Formula Bar */}
      <FormulaBar />

      {/* Main Grid Area */}
      <div className="flex-1 overflow-hidden relative">
        {activeSheetId ? (
          <SpreadsheetGrid sheetId={activeSheetId} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Выберите лист для редактирования
          </div>
        )}
      </div>

      {/* Sheet Tabs */}
      <div className="bg-white border-t px-2">
        <Tabs 
          aria-label="Листы" 
          variant="underlined"
          selectedKey={activeSheetId || ''}
          onSelectionChange={(key) => setActiveSheetId(key as string)}
          size="sm"
        >
          {activeSpreadsheet.sheets?.map((sheet) => (
            <Tab key={sheet.id} title={sheet.name} />
          ))}
          {/* Add Sheet Button could go here or as a separate component */}
        </Tabs>
      </div>
    </div>
  );
};
