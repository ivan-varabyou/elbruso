"use client";

import { DynamicTableComponent as DynamicTable } from "@elbruso/modules/table/ui";
import { useState } from "react";

export default function TablesTestPage() {
  const [tableId] = useState("test-table-123");
  const [workspaceId] = useState("test-workspace-456");

  return (
    <div className="h-screen flex flex-col bg-zinc-50">
      <div className="bg-white border-b border-zinc-200 px-4 py-4">
        <h1 className="text-2xl font-bold text-zinc-900">Dynamic Tables Test</h1>
        <p className="text-sm text-zinc-500 mt-1">Testing ag-Grid + HyperFormula integration</p>
      </div>

      <div className="flex-1 p-6">
        <div className="h-full bg-white rounded-lg shadow-sm border border-zinc-200 overflow-hidden">
          <DynamicTable tableId={tableId} workspaceId={workspaceId} />
        </div>
      </div>

      <div className="bg-white border-t border-zinc-200 px-6 py-3">
        <div className="flex items-center gap-4 text-sm text-zinc-600">
          <div>
            <span className="font-medium">Table ID:</span> {tableId}
          </div>
          <div>
            <span className="font-medium">Workspace ID:</span> {workspaceId}
          </div>
          <div className="ml-auto text-xs text-zinc-400">
            Phase 4: Dynamic Tables Implementation
          </div>
        </div>
      </div>
    </div>
  );
}
