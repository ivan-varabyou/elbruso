"use client";

import { useTableStore } from "@frontend/stores";
import { Plus, Table } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { CreateTableModal } from "../WorkspaceTree/CreateTableModal";

interface WorkspaceTableTabsProps {
  workspaceId: string;
}

export function WorkspaceTableTabs({ workspaceId }: WorkspaceTableTabsProps) {
  const router = useRouter();
  const params = useParams();
  const currentTableId = params?.id as string;
  const { tables, fetchTables } = useTableStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const workspaceTables = tables.filter(
    (t: { workspace_id: string; id: string; name: string }) => t.workspace_id === workspaceId,
  );

  const handleTableClick = (tableId: string) => {
    router.push(`/tables/${tableId}`);
  };

  return (
    <>
      <div className="border-b border-[#e2e2e2] bg-white px-2 py-1.5 flex items-center gap-1 overflow-x-auto">
        {workspaceTables.map((table: { id: string; name: string }) => (
          <button
            key={table.id}
            onClick={() => handleTableClick(table.id)}
            className={`px-4 py-1.5 text-[13px] rounded-t transition-colors flex items-center gap-2 whitespace-nowrap ${
              table.id === currentTableId
                ? "bg-[#e8f0fe] text-[#1a73e8] font-medium border-b-2 border-[#1a73e8]"
                : "text-[#3c4043] hover:bg-gray-100"
            }`}
          >
            <Table className="w-4 h-4 flex-shrink-0" />
            {table.name}
          </button>
        ))}

        {/* Add table button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="p-1.5 hover:bg-gray-100 rounded transition-colors flex-shrink-0"
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
