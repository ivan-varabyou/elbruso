"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useWorkspaceStore, useTableStore } from "@/shared/stores";
import { Table, Plus } from "lucide-react";
import { CreateTableModal } from "@/shared/ui";
import { useState } from "react";

export default function WorkspaceDashboardPage() {
  const params = useParams();
  const router = useRouter();
  const workspaceId = params?.workspaceId as string;
  const { workspaces, selectWorkspace } = useWorkspaceStore();
  const { tables, fetchTables } = useTableStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (workspaceId) {
      selectWorkspace(workspaceId);
      fetchTables(workspaceId);
    }
  }, [workspaceId, selectWorkspace, fetchTables]);

  const currentWorkspace = workspaces.find((w) => w.id === workspaceId);
  const workspaceTables = tables.filter((t) => t.workspace_id === workspaceId);

  const handleTableClick = (tableId: string) => {
    router.push(`/tables/${tableId}`);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-zinc-900">
          {currentWorkspace?.name || "Workspace"}
        </h1>
        <p className="text-zinc-500 mt-1">Manage your workspace tables and data</p>
      </div>

      {/* Quick Actions */}
      <div className="mb-6 flex gap-3">
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Create Table
        </button>
      </div>

      {/* Tables Grid */}
      {workspaceTables.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workspaceTables.map((table) => (
            <div
              key={table.id}
              onClick={() => handleTableClick(table.id)}
              className="p-4 border border-zinc-200 rounded-xl hover:border-zinc-300 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-zinc-100 rounded-lg">
                  <Table className="h-5 w-5 text-zinc-600" />
                </div>
                <div>
                  <h3 className="font-medium text-zinc-900">{table.name}</h3>
                  <p className="text-xs text-zinc-500">Dynamic table</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed border-zinc-200 rounded-xl">
          <Table className="h-12 w-12 text-zinc-300 mx-auto mb-3" />
          <p className="text-zinc-500">No tables yet</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-3 text-sm text-zinc-900 font-medium hover:underline"
          >
            Create your first table
          </button>
        </div>
      )}

      <CreateTableModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        workspaceId={workspaceId}
      />
    </div>
  );
}
