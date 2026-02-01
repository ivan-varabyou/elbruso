"use client";

import { DynamicTableComponent as DynamicTable } from "@elbruso/modules/table/ui";
import { useTableStore, useWorkspaceStore } from "@elbruso/stores";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function TablePage() {
  const params = useParams();
  const tableId = params?.id as string;
  const { activeTable, loadTable } = useTableStore();
  const { workspaces, fetchWorkspaces, selectWorkspace } = useWorkspaceStore();

  useEffect(() => {
    if (tableId) {
      loadTable(tableId);
    }
  }, [tableId, loadTable]);

  const workspaceId =
    activeTable?.workspace_id || (workspaces.length > 0 ? workspaces[0].id : null);

  useEffect(() => {
    if (workspaceId) {
      selectWorkspace(workspaceId);
      fetchWorkspaces();
    }
  }, [workspaceId, selectWorkspace, fetchWorkspaces]);

  if (!tableId) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-zinc-500">Invalid table ID</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 overflow-hidden">
        <DynamicTable tableId={tableId} workspaceId={workspaceId || "default"} />
      </div>
    </div>
  );
}
