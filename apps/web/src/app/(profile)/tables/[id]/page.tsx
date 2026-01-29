"use client";

import { useParams } from "next/navigation";
import { DynamicTable } from "@/shared/ui";

export default function TablePage() {
  const params = useParams();
  const tableId = params?.id as string;
  const workspaceId = (params?.workspaceId as string) || "default";

  if (!tableId) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-zinc-500">Invalid table ID</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <DynamicTable tableId={tableId} workspaceId={workspaceId} />
    </div>
  );
}
