"use client";

import { Building2 } from "lucide-react";
import { ProfilePageLayout } from "@frontend/ui";
import { OrganizationsSmart } from "@frontend/modules/admin/ui/Organizations/OrganizationsSmart";

export default function OrganizationsPage() {
  return (
    <ProfilePageLayout title="Организации" icon={Building2}>
      <OrganizationsSmart />
    </ProfilePageLayout>
  );
}
