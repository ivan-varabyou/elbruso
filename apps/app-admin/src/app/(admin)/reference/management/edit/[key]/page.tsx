"use client";

import { ReferenceManagerForm } from "@frontend/modules/admin";
import { useParams } from "next/navigation";

export default function EditReferencePage() {
  const params = useParams();
  const key = params.key as string;

  return <ReferenceManagerForm tableKey={key} />;
}
