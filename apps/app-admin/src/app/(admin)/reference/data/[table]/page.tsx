"use client";

import { useParams } from "next/navigation";

import { ReferenceTablePage } from "@frontend/modules/admin/ui/ReferenceData/UniversalTable/ReferenceTablePage";

export default function ReferenceDataPage() {
  const params = useParams();
  const tableKey = params.table as string;

  return (
    <div className="p-6">
      <ReferenceTablePage tableKey={tableKey} />
    </div>
  );
}
