"use client";

import { cn } from "@frontend/lib";
import { OrganizationTree, ProfileForm, SecurityForm } from "@frontend/modules/profile";
import { ProfilePageLayout } from "@frontend/ui";
import { Building2, Shield, User } from "lucide-react";
import { useState } from "react";

type TabType = "profile" | "security" | "organization";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("profile");

  const tabs = [
    { id: "profile", label: "Профиль", icon: User },
    { id: "security", label: "Безопасность", icon: Shield },
    { id: "organization", label: "Организация", icon: Building2 },
  ] as const;

  return (
    <ProfilePageLayout title="Настройки" icon={Shield}>
      <div className=" mx-auto space-y-8">
        <div className="px-4">
          <div className="flex gap-1 border-b border-zinc-100">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px",
                    isActive
                      ? "text-zinc-900 border-zinc-900"
                      : "text-zinc-500 border-transparent hover:text-zinc-700 hover:border-zinc-300",
                  )}
                >
                  <Icon className="h-[18px] w-[18px]" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="px-4 pb-20">
          {activeTab === "profile" && <ProfileForm />}
          {activeTab === "security" && <SecurityForm />}
          {activeTab === "organization" && <OrganizationTree />}
        </div>
      </div>
    </ProfilePageLayout>
  );
}
