import { ProfilePageLayout } from "@frontend/ui";
import { LayoutDashboard } from "lucide-react";

export default function DashboardPage() {
  return (
    <ProfilePageLayout
      title="Dashboard"
      icon={LayoutDashboard}
      description="Основные индикаторы системы с привязкой к организации. Настроим позже."
    />
  );
}
