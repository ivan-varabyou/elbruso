import { ProfilePageLayout } from "@frontend/ui";
import { Briefcase } from "lucide-react";

export default function WorkspacesPage() {
  return (
    <ProfilePageLayout
      title="Рабочие области"
      icon={Briefcase}
      description="Список доступных рабочих областей с динамическими таблицами."
    />
  );
}
