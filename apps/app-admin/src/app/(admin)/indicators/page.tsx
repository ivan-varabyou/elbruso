"use client";

import { Reference } from "@frontend/api";
import { IndicatorResponseDto } from "@frontend/api/data-contracts";
import { useAuth } from "@frontend/modules/auth";
import {
  CreateIndicatorModal,
  GenerateIndicatorsModal,
  IndicatorsTableSmart,
} from "@frontend/modules/profile";
import type { Indicator } from "@frontend/types";
import { Button, ProfilePageLayout } from "@frontend/ui";
import { Globe, TrendingUp, Trophy, Wand2 } from "lucide-react";
import { useState } from "react";

export default function IndicatorsPage() {
  const { user } = useAuth();
  const referenceApi = new Reference();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedScopes, setSelectedScopes] = useState<string[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);

  console.log("[IndicatorsPage] Mount", { userId: user?.id });

  const filterOptions = [
    { value: "global", label: "Глобальные", icon: Globe },
    { value: "sport", label: "По виду спорта", icon: Trophy },
    { value: "federation", label: "Федеративные", icon: Trophy },
  ];

  return (
    <ProfilePageLayout
      title="Индикаторы"
      icon={TrendingUp}
      onAddClick={() => setShowCreateModal(true)}
      actions={
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => setShowGenerateModal(true)}
        >
          <Wand2 className="h-4 w-4" />
          Генерация
        </Button>
      }
    >
      <div className="space-y-6 mt-4">
        <IndicatorsTableSmart
          onCreate={() => setShowCreateModal(true)}
          onGenerate={() => setShowGenerateModal(true)}
          onEdit={(indicator: IndicatorResponseDto) =>
            console.log("[IndicatorsPage] Edit indicator", { id: indicator.id })
          }
          onDelete={(id: string) => console.log("[IndicatorsPage] Delete indicator", { id })}
        />
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
