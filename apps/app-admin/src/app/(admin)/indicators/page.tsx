"use client";

import { Reference } from "@frontend/api";
import { cn } from "@frontend/lib";
import { useAuth } from "@frontend/modules/auth";
import {
  CreateIndicatorModal,
  FilterDropdown,
  GenerateIndicatorsModal,
  IndicatorsTableSmart,
  IndicatorGroupsTableSmart,
} from "@frontend/modules/profile/ui/indicators";
import type { Indicator } from "@frontend/types";
import { Button, ProfilePageLayout } from "@frontend/ui";
import { Filter, Globe, Plus, Trophy, TrendingUp, Wand2 } from "lucide-react";
import { useState } from "react";

export default function IndicatorsPage() {
  const { user } = useAuth();
  const referenceApi = new Reference();
  const [activeTab, setActiveTab] = useState<"indicators" | "groups">("indicators");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedScopes, setSelectedScopes] = useState<string[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);

  console.log("[IndicatorsPage] Mount", { activeTab, userId: user?.id });

  const filterOptions = [
    { value: "global", label: "Глобальные", icon: Globe },
    { value: "sport", label: "По виду спорта", icon: Trophy },
    { value: "federation", label: "Федеративные", icon: Trophy },
  ];

  const handleTabChange = (tab: "indicators" | "groups") => {
    console.log("[IndicatorsPage] Tab changed", { from: activeTab, to: tab });
    setActiveTab(tab);
  };

  return (
    <ProfilePageLayout
      title="Индикаторы"
      icon={TrendingUp}
      description="Управление каталогом показателей и автоматическая генерация."
      actions={
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="h-9 gap-2 text-zinc-600 border-zinc-200 hover:bg-zinc-50"
            onClick={() => setShowGenerateModal(true)}
          >
            <Wand2 className="h-4 w-4" />
            Генерация
          </Button>
          <Button
            variant="primary"
            className="h-9 gap-2 shadow-sm"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus className="h-4 w-4" />
            Создать индикатор
          </Button>
        </div>
      }
    >
      <div className="space-y-6 mt-4">
        <div className="flex items-center gap-1 p-1 bg-zinc-100/50 rounded-xl w-fit border border-zinc-200/50">
          <button
            onClick={() => handleTabChange("indicators")}
            className={cn(
              "px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300",
              activeTab === "indicators"
                ? "bg-white text-blue-600 shadow-sm border border-zinc-200/50"
                : "text-zinc-500 hover:text-zinc-700 hover:bg-zinc-200/30",
            )}
          >
            Список индикаторов
          </button>
          <button
            onClick={() => handleTabChange("groups")}
            className={cn(
              "px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300",
              activeTab === "groups"
                ? "bg-white text-blue-600 shadow-sm border border-zinc-200/50"
                : "text-zinc-500 hover:text-zinc-700 hover:bg-zinc-200/30",
            )}
          >
            Группы индикаторов
          </button>
        </div>

        {activeTab === "indicators" && (
          <IndicatorsTableSmart
            onCreate={() => setShowCreateModal(true)}
            onGenerate={() => setShowGenerateModal(true)}
            onEdit={(indicator) =>
              console.log("[IndicatorsPage] Edit indicator", { id: indicator.id })
            }
            onDelete={(id) => console.log("[IndicatorsPage] Delete indicator", { id })}
          />
        )}

        {activeTab === "groups" && (
          <IndicatorGroupsTableSmart
            onCreateGroup={() => console.log("[IndicatorsPage] Create group")}
            onEditGroup={(id) => console.log("[IndicatorsPage] Edit group", { id })}
            onDeleteGroup={(id) => console.log("[IndicatorsPage] Delete group", { id })}
          />
        )}
      </div>

      {showCreateModal && (
        <CreateIndicatorModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={(newIndicator: Indicator) => {
            console.log("[IndicatorsPage] New indicator created", { id: newIndicator.id });
            setShowCreateModal(false);
          }}
        />
      )}

      {showGenerateModal && (
        <GenerateIndicatorsModal
          onClose={() => setShowGenerateModal(false)}
          onSuccess={() => {
            console.log("[IndicatorsPage] Indicators generated");
            setShowGenerateModal(false);
          }}
        />
      )}
    </ProfilePageLayout>
  );
}
