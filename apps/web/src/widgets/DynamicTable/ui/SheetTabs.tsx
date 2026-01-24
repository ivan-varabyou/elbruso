'use client';

import { Plus, ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react';

interface Sheet {
  id: string;
  name: string;
  order: number;
}

interface SheetTabsProps {
  sheets: Sheet[];
  activeSheetId: string;
  onSheetChange: (sheetId: string) => void;
  onAddSheet?: () => void;
  onRenameSheet?: (sheetId: string, newName: string) => void;
  onDeleteSheet?: (sheetId: string) => void;
}

export function SheetTabs({
  sheets,
  activeSheetId,
  onSheetChange,
  onAddSheet,
  onRenameSheet,
  onDeleteSheet,
}: SheetTabsProps) {
  return (
    <div className="border-t border-[#e2e2e2] bg-white h-9 flex items-center px-2 gap-2">
      {/* Navigation Buttons */}
      <div className="flex items-center gap-0.5">
        <button 
          className="p-1 hover:bg-gray-100 rounded disabled:opacity-40"
          title="Previous sheet"
          disabled
        >
          <ChevronLeft className="w-5 h-5 text-[#5f6368]" />
        </button>
        <button 
          className="p-1 hover:bg-gray-100 rounded disabled:opacity-40"
          title="Next sheet"
          disabled
        >
          <ChevronRight className="w-5 h-5 text-[#5f6368]" />
        </button>
      </div>

      {/* Sheet Tabs */}
      <div className="flex items-center gap-1 flex-1 overflow-x-auto">
        {sheets.map((sheet) => (
          <button
            key={sheet.id}
            onClick={() => onSheetChange(sheet.id)}
            className={`px-4 py-1 text-[13px] rounded-t transition-colors ${
              sheet.id === activeSheetId
                ? 'bg-[#e8f0fe] text-[#1a73e8] font-medium border-b-2 border-[#1a73e8]'
                : 'text-[#3c4043] hover:bg-gray-100'
            }`}
          >
            {sheet.name}
          </button>
        ))}
      </div>

      {/* Add Sheet Button */}
      <button
        onClick={onAddSheet}
        className="p-1.5 hover:bg-gray-100 rounded transition-colors"
        title="Add sheet"
      >
        <Plus className="w-5 h-5 text-[#5f6368]" />
      </button>

      {/* Menu Button */}
      <button
        className="p-1.5 hover:bg-gray-100 rounded transition-colors"
        title="All sheets"
      >
        <MoreVertical className="w-5 h-5 text-[#5f6368]" />
      </button>
    </div>
  );
}
