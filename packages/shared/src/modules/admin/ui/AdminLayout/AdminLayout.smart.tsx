"use client";

import { useState } from "react";
import { AdminLeftPanel } from "../AdminLeftPanel/AdminLeftPanel.smart";
import { AdminRightPanel } from "./AdminRightPanel.smart";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(false);
  const [isRightPanelCollapsed, setIsRightPanelCollapsed] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50">
      <AdminLeftPanel
        isCollapsed={isLeftPanelCollapsed}
        onToggle={() => setIsLeftPanelCollapsed(!isLeftPanelCollapsed)}
      />

      <main className="flex-1 overflow-auto bg-white">
        <div className="h-full">{children}</div>
      </main>

      <AdminRightPanel
        isCollapsed={isRightPanelCollapsed}
        onToggle={() => setIsRightPanelCollapsed(!isRightPanelCollapsed)}
      />
    </div>
  );
}
