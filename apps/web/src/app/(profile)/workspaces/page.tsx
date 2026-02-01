import { PageLayout } from "@elbruso/ui";
import { Briefcase } from "lucide-react";

export default function WorkspacesPage() {
  return (
    <PageLayout
      title="Рабочие области"
      icon={Briefcase}
      description="Список доступных рабочих областей с динамическими таблицами."
    />
  );
}
