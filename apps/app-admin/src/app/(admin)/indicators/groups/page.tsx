"use client";

import { useAuth } from "@frontend/modules/auth";
import { IndicatorGroupsTableSmart } from "@frontend/modules/profile";
import type { IndicatorGroup } from "@frontend/types";
import { ProfilePageLayout } from "@frontend/ui";
import { Layers } from "lucide-react";

export default function IndicatorGroupsPage() {
  const { user } = useAuth();

  console.log("[IndicatorGroupsPage] Mount", { userId: user?.id });

  return (
    <ProfilePageLayout
      title="Группы индикаторов"
      icon={Layers}
      description="Управление группами индикаторов."
    >
      <div className="mt-4">
        <IndicatorGroupsTableSmart
          onCreateGroup={() => console.log("[IndicatorGroupsPage] Create group")}
          onEditGroup={(group: IndicatorGroup) =>
            console.log("[IndicatorGroupsPage] Edit group", { id: group.id })
          }
          onDeleteGroup={(groupId: number) =>
            console.log("[IndicatorGroupsPage] Delete group", { id: groupId })
          }
        />
      </div>
    </ProfilePageLayout>
  );
}
