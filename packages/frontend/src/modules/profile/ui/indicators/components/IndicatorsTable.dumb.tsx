"use client";

import { IndicatorResponseDto } from "@frontend/api/data-contracts";
import { Checkbox } from "@frontend/ui/primitives";
import { Pencil, Trash2 } from "lucide-react";

export interface IndicatorsTableDumbProps {
  indicators: IndicatorResponseDto[];
  selectedIds: Set<string>;
  onSelectRow: (id: string) => void;
  onRowClick: (indicator: IndicatorResponseDto) => void;
  onEdit: (indicator: IndicatorResponseDto) => void;
  onDelete: (id: string) => void;
}

export function IndicatorsTableDumb({
  indicators,
  selectedIds,
  onSelectRow,
  onRowClick,
  onEdit,
  onDelete,
}: IndicatorsTableDumbProps) {
  if (!Array.isArray(indicators) || indicators.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-muted-foreground">
        Нет данных для отображения
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-muted/50 border-b">
          <tr>
            <th className="w-12 p-3 text-left">
              <span className="sr-only">Выбрать</span>
            </th>
            <th className="p-3 text-left text-sm font-medium">ID</th>
            <th className="p-3 text-left text-sm font-medium">Код</th>
            <th className="p-3 text-left text-sm font-medium">Название</th>
            <th className="p-3 text-left text-sm font-medium">Вид спорта</th>
            <th className="p-3 text-left text-sm font-medium">Тип значения</th>
            <th className="p-3 text-left text-sm font-medium">Единица</th>
            <th className="p-3 text-left text-sm font-medium">Системный</th>
            <th className="w-24 p-3 text-center">
              <span className="sr-only">Действия</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {indicators.map((indicator) => {
            const isSelected = selectedIds.has(String(indicator.id));
            return (
              <tr
                key={indicator.id}
                className={`hover:bg-muted/50 cursor-pointer ${
                  isSelected ? "bg-muted/30" : ""
                }`}
                onClick={() => onRowClick(indicator)}
              >
                <td className="p-3" onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    isSelected={isSelected}
                    onChange={() => onSelectRow(String(indicator.id))}
                  />
                </td>
                <td className="p-3 text-sm">{indicator.id}</td>
                <td className="p-3 text-sm font-mono">{indicator.code}</td>
                <td className="p-3 text-sm">{indicator.name_ru}</td>
                <td className="p-3 text-sm">{indicator.sport_name || "-"}</td>
                <td className="p-3 text-sm">{indicator.value_type}</td>
                <td className="p-3 text-sm">{indicator.unit_name || "-"}</td>
                <td className="p-3 text-sm">
                  {indicator.is_system ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
                      Да
                    </span>
                  ) : (
                    <span className="text-muted-foreground">Нет</span>
                  )}
                </td>
                <td className="p-3" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-center gap-1">
                    <button
                      onClick={() => onEdit(indicator)}
                      className="p-1.5 hover:bg-muted rounded transition-colors"
                      title="Редактировать"
                    >
                      <Pencil className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                    </button>
                    <button
                      onClick={() => onDelete(String(indicator.id))}
                      className="p-1.5 hover:bg-muted rounded transition-colors"
                      title="Удалить"
                    >
                      <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
