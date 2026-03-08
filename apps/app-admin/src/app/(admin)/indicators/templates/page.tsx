"use client";

import { useAuth } from "@frontend/modules/auth";
import { IndicatorTemplatesTableSmart } from "@frontend/modules/profile";
import { ProfilePageLayout } from "@frontend/ui";
import { FileType } from "lucide-react";

export default function IndicatorTemplatesPage() {
  const { user } = useAuth();

  console.log("[IndicatorTemplatesPage] Mount", { userId: user?.id });

  return (
    <ProfilePageLayout
      title="Шаблоны генерации индикаторов"
      icon={FileType}
      description="Управление шаблонами для массовой генерации индикаторов."
    >
      <div className="mt-4">
        <IndicatorTemplatesTableSmart
          onCreateTemplate={() => console.log("[IndicatorTemplatesPage] Create template")}
          onEditTemplate={(template: any) =>
            console.log("[IndicatorTemplatesPage] Edit template", { id: template.id })
          }
          onDeleteTemplate={(templateId: number) =>
            console.log("[IndicatorTemplatesPage] Delete template", { id: templateId })
          }
        />
      </div>
    </ProfilePageLayout>
  );
}
