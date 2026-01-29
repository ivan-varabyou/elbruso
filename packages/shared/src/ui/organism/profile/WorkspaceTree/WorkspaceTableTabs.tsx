"use client";

import { useRouter, useParams } from "next/navigation";
import { Table, Plus, X } from "lucide-react";
import { useWorkspaceStore, useTableStore } from "@/shared/stores";
import { useState } from "react";
import { CreateTableModal } from "../WorkspaceTree/CreateTableModal";

interface WorkspaceTableTabsProps {
  workspaceId: string;
}

export function WorkspaceTableTabs({ workspaceId }: WorkspaceTableTabsProps) {
  const router = useRouter();
  const params = useParams();
  const currentTableId = params?.id as string;
  const { workspaces, selectWorkspace } = useWorkspaceStore();
  const { tables, fetchTables } = useTableStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const workspace = workspaces.find((w) => w.id === workspaceId);
  const workspaceTables = tables.filter((t) => t.workspace_id === workspaceId);

  const handleTableClick = (tableId: string) => {
    router.push(`/tables/${tableId}`);
  };

  return (
    <>
      <div className="border-b border-[#e2e2e2] bg-white px-2 py-1.5 flex items-center gap-2">
        {/* Workspace name */}
        <div className="px-3 py-1 text-sm font-medium text-[#3c4043] bg-gray-100 rounded">
          {workspace?.name || "Workspace"}
        </div>

        {/* Table tabs */}
        <div className="flex items-center gap-1 flex-1 overflow-x-auto">
          {workspaceTables.map((table) => (
            <button
              key={table.id}
              onClick={() => handleTableClick(table.id)}
              className={`px-4 py-1.5 text-[13px] rounded-t transition-colors flex items-center gap-2 ${
                table.id === currentTableId
                  ? "bg-[#e8f0fe] text-[#1a73e8] font-medium border-b-2 border-[#1a73e8]"
                  : "text-[#3c4043] hover:bg-gray-100"
              }`}
            >
              <Table className="w-4 h-4" />
              {table.name}
            </button>
          ))}
        </div>

        {/* Add table button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="p-1.5 hover:bg-gray-100 rounded transition-colors"
          title="Create table"
        >
          <Plus className="w-5 h-5 text-[#5f6368]" />
        </button>
      </div>

      <CreateTableModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        workspaceId={workspaceId}
      />
    </>
  );
}
