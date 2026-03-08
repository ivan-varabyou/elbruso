import { Button, Chip } from "@heroui/react";
import type { LucideProps } from "lucide-react";
import { BookOpen, Eye, Hash, Link2, MoveVertical, Plus, Settings2, Type } from "lucide-react";

import type { ColumnDef } from "../../types";

const COLUMN_TYPES: { label: string; value: ColumnDef["type"]; icon: React.ComponentType<LucideProps> }[] = [
  { label: "Текст", value: "string", icon: Type },
  { label: "Число", value: "number", icon: Hash },
  { label: "Логика", value: "boolean", icon: Eye },
  { label: "Дата", value: "date", icon: BookOpen },
];

export interface ColumnStructureGridProps {
  columns: ColumnDef[];
  availableTables: Record<string, { label: string; columns: { key: string; label: string }[] }>;
  onAddColumn: () => void;
  onColumnSettingsClick: (index: number) => void;
}

export function ColumnStructureGrid({
  columns,
  availableTables,
  onAddColumn,
  onColumnSettingsClick,
}: ColumnStructureGridProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest pl-1">
          Конфигурация полей
        </h3>
        <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest pr-1">
          {columns.length} полей
        </span>
      </div>

      <div className="bg-white border border-zinc-100 rounded-2xl overflow-hidden shadow-sm shadow-zinc-200/50">
        {/* Header */}
        <div className="grid grid-cols-[36px_1fr_120px_160px_64px] gap-0 border-b border-zinc-50 bg-zinc-50/30">
          <div className="px-4 py-3" />
          <div className="px-4 py-3 text-[10px] font-black text-zinc-400 uppercase tracking-widest">
            Название и ключ
          </div>
          <div className="px-4 py-3 text-[10px] font-black text-zinc-400 uppercase tracking-widest text-center">
            Тип данных
          </div>
          <div className="px-4 py-3 text-[10px] font-black text-zinc-400 uppercase tracking-widest">
            Связь (Relation)
          </div>
          <div className="px-4 py-3 text-[10px] font-black text-zinc-400 uppercase tracking-widest text-right">
            Опции
          </div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-zinc-50">
          {columns.map((col, idx) => (
            <FieldRow
              key={idx}
              col={col}
              idx={idx}
              availableTables={availableTables}
              onSettingsClick={() => onColumnSettingsClick(idx)}
            />
          ))}
        </div>

        {/* Add field button */}
        <div className="p-3 bg-zinc-50/20 border-t border-zinc-50">
          <Button
            variant="flat"
            size="sm"
            fullWidth
            startContent={<Plus className="h-4 w-4" />}
            className="h-10 text-xs font-bold text-primary bg-white hover:bg-zinc-50 border border-zinc-200/50 rounded-xl transition-all"
            onPress={onAddColumn}
          >
            Добавить новое поле
          </Button>
        </div>
      </div>
    </div>
  );
}

interface FieldRowProps {
  col: ColumnDef;
  idx: number;
  availableTables: Record<string, { label: string; columns: { key: string; label: string }[] }>;
  onSettingsClick: () => void;
}

function FieldRow({ col, idx, availableTables, onSettingsClick }: FieldRowProps) {
  const TypeIcon = COLUMN_TYPES.find((t) => t.value === col.type)?.icon ?? Type;
  const typeLabel = COLUMN_TYPES.find((t) => t.value === col.type)?.label ?? col.type;
  const relationLabel = col.relation
    ? availableTables[col.relation.table]?.label ?? col.relation.table
    : null;

  return (
    <div className="grid grid-cols-[36px_1fr_120px_160px_64px] gap-0 hover:bg-zinc-50/50 transition-colors group items-center">
      {/* Drag handle */}
      <div className="flex items-center justify-center text-zinc-200 group-hover:text-zinc-300 cursor-grab">
        <MoveVertical className="h-4 w-4" />
      </div>

      {/* Field info */}
      <div className="px-4 py-2.5 flex flex-col min-w-0">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-sm font-bold text-zinc-800 truncate">
            {col.label || <span className="text-zinc-300 font-normal italic">Без названия</span>}
          </span>
          {col.required && (
            <span className="text-[10px] text-amber-500 font-black shrink-0">*</span>
          )}
        </div>
        <code className="text-[10px] font-mono text-zinc-400 truncate opacity-60 group-hover:opacity-100 transition-opacity">
          {col.key || "no-key"}
        </code>
      </div>

      {/* Type badge */}
      <div className="px-4 py-2.5 flex justify-center">
        <Chip
          variant="flat"
          size="sm"
          startContent={<TypeIcon className="h-3 w-3" />}
          className="bg-zinc-100 text-zinc-500 text-[10px] font-black uppercase h-6 px-1.5"
        >
          {typeLabel}
        </Chip>
      </div>

      {/* Relation */}
      <div className="px-4 py-2.5">
        {relationLabel ? (
          <Chip
            variant="flat"
            size="sm"
            color="primary"
            startContent={<Link2 className="h-3 w-3" />}
            className="text-[10px] font-black uppercase h-6 bg-primary/10"
          >
            {relationLabel}
          </Chip>
        ) : (
          <span className="text-zinc-200 text-xs pl-2">—</span>
        )}
      </div>

      {/* Actions */}
      <div className="px-4 py-2.5 flex items-center justify-end">
        <Button
          isIconOnly
          size="sm"
          variant="light"
          className="text-zinc-300 hover:text-primary transition-colors hover:bg-primary/5 rounded-lg"
          onPress={onSettingsClick}
        >
          <Settings2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
