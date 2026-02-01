"use client";

import { useTableStore,useWorkspaceStore } from "@elbruso/stores";
import { ChevronDown, ChevronRight, FileText, Loader2, Table } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function WorkspaceTree() {
  const router = useRouter();
  const { workspaces, isLoading, fetchWorkspaces, selectWorkspace, selectedWorkspaceId } =
    useWorkspaceStore();
  const { tables, fetchTables } = useTableStore();
  const [expandedWorkspaces, setExpandedWorkspaces] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchWorkspaces();
  }, [fetchWorkspaces]);

  const toggleWorkspace = async (workspaceId: string) => {
    const newExpanded = new Set(expandedWorkspaces);
    if (newExpanded.has(workspaceId)) {
      newExpanded.delete(workspaceId);
    } else {
      newExpanded.add(workspaceId);
      await fetchTables(workspaceId);
    }
    setExpandedWorkspaces(newExpanded);
    selectWorkspace(workspaceId);
    router.push(`/workspace/${workspaceId}`);
  };

  const handleTableClick = (tableId: string) => {
    router.push(`/tables/${tableId}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <Loader2 className="h-4 w-4 animate-spin text-zinc-400" />
      </div>
    );
  }

  if (workspaces.length === 0) {
    return (
      <div className="px-2 py-3 text-center">
        <p className="text-xs text-zinc-400">Нет рабочих областей</p>
      </div>
    );
  }

  const workspaceTables = tables.filter(
    (t: { workspace_id: string }) => t.workspace_id === selectedWorkspaceId,
  );

  return (
    <div className="space-y-px">
      {workspaces.map((workspace: { id: string; name: string }) => {
        const isExpanded = expandedWorkspaces.has(workspace.id);
        const isActive = selectedWorkspaceId === workspace.id;
        const workspaceTables = tables.filter(
          (t: { workspace_id: string }) => t.workspace_id === workspace.id,
        );

        return (
          <div key={workspace.id}>
            <div
              onClick={() => toggleWorkspace(workspace.id)}
              className={`flex items-center gap-1.5 rounded px-2 py-1 text-[13px] transition-colors cursor-pointer ${
                isActive
                  ? "bg-zinc-100 text-zinc-900 font-medium"
                  : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
              }`}
            >
              {isExpanded ? (
                <ChevronDown className="h-3.5 w-3.5 flex-shrink-0" />
              ) : (
                <ChevronRight className="h-3.5 w-3.5 flex-shrink-0" />
              )}
              <FileText className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{workspace.name}</span>
            </div>

            {/* Tables under workspace */}
            {isExpanded && workspaceTables.length > 0 && (
              <div className="ml-6 mt-px space-y-px">
                {workspaceTables.map((table: { id: string; name: string }) => (
                  <div
                    key={table.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTableClick(table.id);
                    }}
                    className="flex items-center gap-1.5 rounded px-2 py-1 text-[13px] text-zinc-600 transition-colors cursor-pointer hover:bg-zinc-50 hover:text-zinc-900"
                  >
                    <Table className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="truncate">{table.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
