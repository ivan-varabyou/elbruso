"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTableStore, useWorkspaceStore } from "@/shared/stores";
import { DynamicTable } from "@/shared/ui";
import { WorkspaceTableTabs } from "@/shared/ui/organism/profile/WorkspaceTree/WorkspaceTableTabs";

export default function TablePage() {
  const params = useParams();
  const router = useRouter();
  const tableId = params?.id as string;
  const { activeTable, loadTable, tables, fetchTables } = useTableStore();
  const { workspaces, fetchWorkspaces, selectWorkspace } = useWorkspaceStore();

  useEffect(() => {
    if (tableId) {
      loadTable(tableId);
    }
  }, [tableId, loadTable]);

  // Get workspaceId from activeTable or first workspace
  const workspaceId =
    activeTable?.workspace_id || (workspaces.length > 0 ? workspaces[0].id : null);

  useEffect(() => {
    if (workspaceId) {
      selectWorkspace(workspaceId);
      fetchWorkspaces();
      fetchTables(workspaceId);
    }
  }, [workspaceId, selectWorkspace, fetchWorkspaces, fetchTables]);

  const handleWorkspaceChange = (newWorkspaceId: string) => {
    selectWorkspace(newWorkspaceId);
    fetchTables(newWorkspaceId);
    // Navigate to first table in workspace
    const workspaceTables = tables.filter((t) => t.workspace_id === newWorkspaceId);
    if (workspaceTables.length > 0) {
      router.push(`/tables/${workspaceTables[0].id}`);
    }
  };

  if (!tableId) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-zinc-500">Invalid table ID</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      {workspaceId && <WorkspaceTableTabs workspaceId={workspaceId} />}
      <div className="flex-1 overflow-hidden">
        <DynamicTable tableId={tableId} workspaceId={workspaceId || "default"} />
      </div>
    </div>
  );
}
