"use client";

import { AdminLayout } from "@frontend/modules/admin/ui";

export default function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
