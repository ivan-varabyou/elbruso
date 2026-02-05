import { PageLayout } from "@elbruso/ui";
import { LayoutDashboard } from "lucide-react";

export default function DashboardPage() {
  return (
    <PageLayout
      title="Dashboard"
      icon={LayoutDashboard}
      description="Основные индикаторы системы с привязкой к организации. Настроим позже."
    />
  );
}
