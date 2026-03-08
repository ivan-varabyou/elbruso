"use client";

import { apiClient } from "@frontend/api/admin/client";
import { ApiResponse } from "@frontend/types/api-response";
import { ProfilePageLayout } from "@frontend/ui/layout/ProfilePageLayout/ProfilePageLayout";
import { Button } from "@heroui/react";
import type { AxiosError } from "axios";
import { Save } from "lucide-react";
import { Database } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ColumnSettingsModal, ColumnStructureGrid, DictionarySettingsForm } from "./components";
import type { ColumnDef } from "./types";

interface ReferenceManagerFormProps {
  tableKey?: string;
}

type AvailableTables = Record<string, { label: string; columns: { key: string; label: string }[] }>;

export function ReferenceManagerForm({ tableKey: initialTableKey }: ReferenceManagerFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [availableTables, setAvailableTables] = useState<AvailableTables>({});
  const [isColumnSettingsOpen, setIsColumnSettingsOpen] = useState(false);
  const [activeColIndex, setActiveColIndex] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    tableKey: initialTableKey || "",
    label: "",
    icon: "BookOpen",
    category: "general",
    type: "user" as "system" | "user",
    hasIsActive: true,
    hasIsSystem: false,
    hasSortOrder: false,
    permissionCode: "",
  });

  const [columns, setColumns] = useState<ColumnDef[]>([
    { key: "name_ru", label: "Название", type: "string", required: true, editable: true },
    { key: "code", label: "Код", type: "string", required: false, editable: true },
  ]);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const resp = await apiClient.get<ApiResponse<AvailableTables>>("reference/data/tables");
        if (resp.data.data) {
          setAvailableTables(resp.data.data);
        }

        if (initialTableKey) {
          const tableResp = await apiClient.get<ApiResponse<Record<string, unknown>>>(
            `reference/management/${initialTableKey}`,
          );
          if (tableResp.data.data) {
            const data = tableResp.data.data;
            setFormData({
              tableKey: data.table_key as string,
              label: data.label as string,
              icon: (data.icon as string) || "BookOpen",
              category: (data.category as string) || "general",
              type: (data.type as "system" | "user") || "user",
              hasIsActive: data.has_is_active as boolean,
              hasIsSystem: data.has_is_system as boolean,
              hasSortOrder: data.has_sort_order as boolean,
              permissionCode: (data.permission_code as string) || "",
            });
            setColumns((data.columns as ColumnDef[]) || []);
          }
        }
      } catch (error) {
        console.error("Failed to fetch tables metadata:", error);
      }
    };
    fetchMetadata();
  }, [initialTableKey]);

  const addColumn = () => {
    const newIdx = columns.length;
    setColumns([
      ...columns,
      { key: "", label: "", type: "string", required: false, editable: true },
    ]);
    setActiveColIndex(newIdx);
    setIsColumnSettingsOpen(true);
  };

  const removeColumn = (index: number) => {
    setColumns(columns.filter((_, i) => i !== index));
  };

  const updateColumn = (index: number, data: Partial<ColumnDef>) => {
    const newCols = [...columns];
    newCols[index] = { ...newCols[index], ...data };
    setColumns(newCols);
  };

  const handleSubmit = async () => {
    if (!formData.tableKey || !formData.label) {
      alert("Заполните название и ключ таблицы");
      return;
    }

    if (columns.some((c) => !c.key || !c.label)) {
      alert("Заполните все поля в колонках");
      return;
    }

    setLoading(true);
    try {
      if (initialTableKey) {
        await apiClient.patch(`reference/management/${initialTableKey}`, {
          ...formData,
          columns,
        });
        alert("Справочник успешно обновлен");
      } else {
        const finalTableKey = formData.tableKey.startsWith("ref_")
          ? formData.tableKey.replace("ref_", "")
          : formData.tableKey;
        await apiClient.post("reference/management", {
          ...formData,
          tableKey: finalTableKey,
          columns,
        });
        alert("Справочник успешно создан");
      }
      router.push("/reference/management");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      alert(`Ошибка: ${err.response?.data?.message || "Не удалось сохранить справочник"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProfilePageLayout
      title={formData.label || "Новый справочник"}
      icon={Database}
      description="Определите структуру колонок и настройте справочник"
      actions={
        <div className="flex gap-2">
          <Button
            variant="flat"
            size="sm"
            className="font-bold bg-zinc-100"
            onClick={() => router.push("/reference/management")}
          >
            Отмена
          </Button>
          <Button
            variant="solid"
            color="primary"
            size="sm"
            className="font-bold shadow-lg shadow-primary/20 px-8"
            startContent={<Save className="h-4 w-4" />}
            isLoading={loading}
            onClick={handleSubmit}
          >
            {initialTableKey ? "Сохранить изменения" : "Создать справочник"}
          </Button>
        </div>
      }
    >
      <div className="flex gap-8 items-start">
        {/* Left Sidebar: Settings */}
        <div className="w-[320px] shrink-0 sticky top-4">
          <div className="bg-white border border-zinc-100 rounded-3xl p-6 shadow-sm shadow-zinc-200/50 space-y-6">
            <DictionarySettingsForm
              formData={formData}
              isInitialTableKey={!!initialTableKey}
              onFormDataChange={setFormData}
            />
          </div>
        </div>

        {/* Right Area: Fields */}
        <div className="flex-1 space-y-6">
          <ColumnStructureGrid
            columns={columns}
            availableTables={availableTables}
            onAddColumn={addColumn}
            onColumnSettingsClick={(idx) => {
              setActiveColIndex(idx);
              setIsColumnSettingsOpen(true);
            }}
          />
        </div>
      </div>

      {/* Column Settings Modal */}
      <ColumnSettingsModal
        isOpen={isColumnSettingsOpen}
        onClose={() => setIsColumnSettingsOpen(false)}
        columns={columns}
        activeColIndex={activeColIndex}
        availableTables={availableTables}
        onSelectColumn={setActiveColIndex}
        onAddColumn={addColumn}
        onUpdateColumn={updateColumn}
        onDeleteColumn={removeColumn}
      />
    </ProfilePageLayout>
  );
}
