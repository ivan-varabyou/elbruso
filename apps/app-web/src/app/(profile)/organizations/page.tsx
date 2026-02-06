import { ProfilePageLayout } from "@frontend/ui";
import { Building2 } from "lucide-react";

export default function OrganizationsPage() {
  return (
    <ProfilePageLayout
      title="Организации"
      icon={Building2}
      description="Список организаций в подчинении с привязкой к субъектам РФ."
    />
  );
}
