import { Modal } from "@frontend/ui/primitives";
import {
  Button,
  Chip,
  Input,
  Switch,
} from "@heroui/react";
import type { LucideProps } from "lucide-react";
import { BookOpen, Eye, Hash, Link2, Plus, Type, X } from "lucide-react";

import type { ColumnDef } from "../../types";

interface ColumnSettingsModalDumbProps {
  isOpen: boolean;
  onClose: () => void;
  columns: ColumnDef[];
  activeColIndex: number | null;
  availableTables: Record<string, { label: string; columns: { key: string; label: string }[] }>;
  activeTab: "general" | "validation" | "relation";
  tableSearch: string;
  onTabChange: (tab: "general" | "validation" | "relation") => void;
  onTableSearchChange: (search: string) => void;
  onSelectColumn: (index: number) => void;
  onAddColumn: () => void;
  onUpdateColumn: (index: number, data: Partial<ColumnDef>) => void;
  onDeleteColumn: (index: number) => void;
}

const COLUMN_TYPES: {
  label: string;
  value: ColumnDef["type"];
  icon: React.ComponentType<LucideProps>;
}[] = [
  { label: "Текст", value: "string", icon: Type },
  { label: "Число", value: "number", icon: Hash },
  { label: "Логика", value: "boolean", icon: Eye },
  { label: "Дата", value: "date", icon: BookOpen },
];

export function ColumnSettingsModalDumb({
  isOpen,
  onClose,
  columns,
  activeColIndex,
  availableTables,
  activeTab,
  tableSearch,
  onTabChange,
  onTableSearchChange,
  onSelectColumn,
  onAddColumn,
  onUpdateColumn,
  onDeleteColumn,
}: ColumnSettingsModalDumbProps) {
  if (activeColIndex === null) return null;
  const column = columns[activeColIndex];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Настройка полей"
      size="full"
      className="max-w-5xl h-[800px]"
      footer={
        <div className="flex justify-between items-center w-full">
          <Button
            variant="flat"
            color="danger"
            size="sm"
            className="font-bold h-9"
            isDisabled={columns.length === 1}
            onPress={() => {
              onDeleteColumn(activeColIndex);
              onClose();
            }}
          >
            Удалить поле
          </Button>
          <div className="flex gap-2">
            <Button variant="flat" size="sm" className="font-bold h-9 bg-zinc-100" onPress={onClose}>
              Отмена
            </Button>
            <Button
              color="primary"
              variant="solid"
              size="sm"
              className="font-bold shadow-lg shadow-primary/20 px-8 h-9"
              onPress={onClose}
            >
              Сохранить
            </Button>
          </div>
        </div>
      }
    >
      <div className="flex flex-row h-full">
        {/* Sidebar */}
        <div className="w-64 border-r border-zinc-100 flex flex-col h-full shrink-0 -ml-6">
          <div className="p-4 border-b border-zinc-100/50">
            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest pl-2">
              Список полей
            </span>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {columns.map((col, idx) => {
              const TypeIcon = COLUMN_TYPES.find((t) => t.value === col.type)?.icon ?? Type;
              const isActive = activeColIndex === idx;
              return (
                <div
                  key={idx}
                  onClick={() => onSelectColumn(idx)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                    isActive
                      ? "bg-zinc-100 text-primary"
                      : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700"
                  }`}
                >
                  <div
                    className={`p-1.5 rounded-lg shrink-0 ${
                      isActive ? "bg-primary text-white" : "bg-zinc-100 text-zinc-400"
                    }`}
                  >
                    {col.relation ? (
                      <Link2 className="h-3.5 w-3.5" />
                    ) : (
                      <TypeIcon className="h-3.5 w-3.5" />
                    )}
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-xs font-bold truncate">
                      {col.label || "Без названия"}
                    </span>
                    <span className="text-[10px] font-mono opacity-40 truncate">
                      {col.key || "no-key"}
                    </span>
                  </div>
                </div>
              );
            })}
            <Button
              variant="light"
              fullWidth
              startContent={<Plus className="h-4 w-4" />}
              className="text-xs font-bold text-primary mt-2 h-10 justify-start px-3 hover:bg-primary/5 rounded-xl"
              onPress={onAddColumn}
            >
              Добавить поле
            </Button>
          </div>
        </div>

        {/* Form area */}
        <div className="flex-1 overflow-hidden flex flex-col bg-white -mr-6">
          {/* Tabs */}
          <div className="flex border-b border-zinc-100/50 px-8 pt-4 gap-6 shrink-0">
            {(["general", "validation", "relation"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className={`pb-3 text-xs font-bold uppercase tracking-wider transition-all relative ${
                  activeTab === tab ? "text-primary" : "text-zinc-400 hover:text-zinc-600"
                }`}
              >
                {tab === "general" && "Основное"}
                {tab === "validation" && "Валидация"}
                {tab === "relation" && "Связь"}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-10">
            {activeTab === "general" && (
              <div className="space-y-10 max-w-2xl">
                <div className="grid grid-cols-2 gap-8">
                  <Input
                    label="Название"
                    labelPlacement="outside"
                    placeholder="Напр. Название организации"
                    value={column.label}
                    onValueChange={(v) => onUpdateColumn(activeColIndex, { label: v })}
                    variant="bordered"
                    size="sm"
                    classNames={{ label: "text-[10px] font-black uppercase tracking-widest text-zinc-400" }}
                  />
                  <Input
                    label="DB Ключ"
                    labelPlacement="outside"
                    placeholder="org_name"
                    value={column.key}
                    onValueChange={(v) =>
                      onUpdateColumn(activeColIndex, {
                        key: v.toLowerCase().replace(/[^a-z0-9_]/g, ""),
                      })
                    }
                    variant="bordered"
                    size="sm"
                    className="font-mono"
                    classNames={{ label: "text-[10px] font-black uppercase tracking-widest text-zinc-400" }}
                  />
                </div>

                <div className="space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                    Тип данных
                  </span>
                  <div className="grid grid-cols-4 gap-3">
                    {COLUMN_TYPES.map((t) => (
                      <div
                        key={t.value}
                        onClick={() => onUpdateColumn(activeColIndex, { type: t.value })}
                        className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center gap-2.5 ${
                          column.type === t.value
                            ? "bg-primary/[0.03] border-primary"
                            : "bg-white border-zinc-100 hover:border-zinc-200"
                        }`}
                      >
                        <div
                          className={`p-2 rounded-lg ${
                            column.type === t.value
                              ? "bg-primary text-white"
                              : "bg-zinc-100 text-zinc-400"
                          }`}
                        >
                          <t.icon className="h-4 w-4" />
                        </div>
                        <span
                          className={`text-[9px] font-black uppercase tracking-widest text-center ${
                            column.type === t.value ? "text-primary" : "text-zinc-500"
                          }`}
                        >
                          {t.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "validation" && (
              <div className="space-y-10 max-w-2xl">
                <div className="grid grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <ToggleRow
                      label="Обязательное"
                      checked={column.required}
                      onChange={(v) => onUpdateColumn(activeColIndex, { required: v })}
                    />
                    <ToggleRow
                      label="Редактируемое"
                      checked={column.editable}
                      onChange={(v) => onUpdateColumn(activeColIndex, { editable: v })}
                    />
                  </div>
                  <div className="space-y-6">
                    <Input
                      label="Плейсхолдер"
                      labelPlacement="outside"
                      placeholder="Напр. Введите..."
                      value={column.placeholder ?? ""}
                      onValueChange={(v) => onUpdateColumn(activeColIndex, { placeholder: v })}
                      variant="bordered"
                      size="sm"
                      classNames={{ label: "text-[10px] font-black uppercase tracking-widest text-zinc-400" }}
                    />
                    <Input
                      label="Описание"
                      labelPlacement="outside"
                      placeholder="Подсказка для поля"
                      value={column.description ?? ""}
                      onValueChange={(v) => onUpdateColumn(activeColIndex, { description: v })}
                      variant="bordered"
                      size="sm"
                      classNames={{ label: "text-[10px] font-black uppercase tracking-widest text-zinc-400" }}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "relation" && (
              <RelationTab
                column={column}
                availableTables={availableTables}
                tableSearch={tableSearch}
                onTableSearchChange={onTableSearchChange}
                onUpdate={(data) => onUpdateColumn(activeColIndex, data)}
              />
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

function RelationTab({
  column,
  availableTables,
  tableSearch,
  onTableSearchChange,
  onUpdate,
}: {
  column: ColumnDef;
  availableTables: Record<string, { label: string; columns: { key: string; label: string }[] }>;
  tableSearch: string;
  onTableSearchChange: (s: string) => void;
  onUpdate: (data: Partial<ColumnDef>) => void;
}) {
  const filteredTables = Object.entries(availableTables).filter(
    ([key, meta]) =>
      meta.label.toLowerCase().includes(tableSearch.toLowerCase()) ||
      key.toLowerCase().includes(tableSearch.toLowerCase()),
  );

  return (
    <div className="space-y-8 max-w-2xl">
      <div className="space-y-4">
        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
          Текущая связь
        </span>
        {column.relation ? (
          <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 border border-zinc-200/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Link2 className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-900">
                  {availableTables[column.relation.table]?.label ?? column.relation.table}
                </p>
                <div className="flex items-center gap-1.5 opacity-60">
                  <code className="text-[10px] font-mono text-primary">{column.relation.table}</code>
                  <span className="text-[10px]">::</span>
                  <code className="text-[10px] font-mono">{column.relation.labelField}</code>
                </div>
              </div>
            </div>
            <Button
              isIconOnly
              size="sm"
              variant="flat"
              className="rounded-lg bg-white border border-zinc-200"
              onPress={() => onUpdate({ relation: undefined })}
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
        ) : (
          <div className="p-10 rounded-3xl border-2 border-dashed border-zinc-100 flex flex-col items-center justify-center text-center gap-3">
            <div className="p-3 bg-zinc-50 rounded-2xl text-zinc-300">
              <Link2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-400">Связь не установлена</p>
              <p className="text-[10px] text-zinc-300 uppercase tracking-widest font-black">
                Выберите таблицу из списка ниже
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <Input
          placeholder="Поиск таблицы..."
          value={tableSearch}
          onValueChange={onTableSearchChange}
          variant="bordered"
          startContent={<Link2 className="h-4 w-4 text-zinc-400" />}
          size="sm"
          classNames={{ inputWrapper: "rounded-xl border-zinc-100" }}
        />

        <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
          {filteredTables.map(([key, meta]) => {
            const isSelected = column.relation?.table === key;
            return (
              <div
                key={key}
                className={`group rounded-2xl border transition-all cursor-pointer p-4 ${
                  isSelected
                    ? "border-primary bg-primary/[0.03]"
                    : "border-zinc-100 bg-white hover:border-zinc-300"
                }`}
                onClick={() => {
                  const defaultField = meta.columns.find(
                    (c) => c.key === "name_ru" || c.key === "name" || c.key === "label",
                  );
                  onUpdate({
                    relation: {
                      table: key,
                      labelField: defaultField?.key ?? meta.columns[0]?.key ?? "id",
                    },
                  });
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${isSelected ? "bg-primary" : "bg-zinc-200"}`} />
                    <span className="text-sm font-bold">{meta.label}</span>
                    <span className="text-[10px] font-mono text-zinc-400 group-hover:text-primary transition-colors">
                      {key}
                    </span>
                  </div>
                  <Chip size="sm" variant="flat" className="text-[9px] font-black uppercase h-5 bg-zinc-100">
                    {meta.columns.length} полей
                  </Chip>
                </div>

                {isSelected && (
                  <div className="mt-4 pt-3 border-t border-primary/10 animate-in fade-in slide-in-from-top-1">
                    <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-3">
                      Поле для отображения:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {meta.columns
                        .filter((c) => c.key !== "id")
                        .map((c) => (
                          <button
                            key={c.key}
                            onClick={(e) => {
                              e.stopPropagation();
                              onUpdate({ relation: { table: key, labelField: c.key } });
                            }}
                            className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
                              column.relation?.labelField === c.key
                                ? "bg-primary text-white shadow-md shadow-primary/20"
                                : "bg-white border border-zinc-200 text-zinc-500 hover:border-zinc-400"
                            }`}
                          >
                            {c.label}
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 border border-zinc-100/50">
      <span className="text-xs font-bold text-zinc-700">{label}</span>
      <Switch size="sm" isSelected={checked} onValueChange={onChange} />
    </div>
  );
}
