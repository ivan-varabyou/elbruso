"use client";

import { ReferenceTablePage } from "@frontend/modules/admin/ui/ReferenceData/UniversalTable/ReferenceTablePage";
import { useParams } from "next/navigation";

export default function ReferenceDataPage() {
  const params = useParams();
  const tableKey = params.table as string;

  return <ReferenceTablePage tableKey={tableKey} />;
}
