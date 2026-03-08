import { BookOpen, Database, Eye, Globe, LayoutGrid, Settings2, Trophy } from "lucide-react";
import { Input, Select, SelectItem, Switch } from "@heroui/react";

export interface DictionarySettingsFormProps {
  formData: {
    tableKey: string;
    label: string;
    icon: string;
    category: string;
    type: "system" | "user";
    hasIsActive: boolean;
    hasIsSystem: boolean;
    hasSortOrder: boolean;
    permissionCode: string;
  };
  isInitialTableKey: boolean;
  onFormDataChange: (data: DictionarySettingsFormProps["formData"]) => void;
}

const CATEGORY_OPTIONS = [
  { value: "general", label: "Общие", icon: LayoutGrid },
  { value: "geo", label: "География", icon: Globe },
  { value: "sport", label: "Спорт", icon: Trophy },
  { value: "orgs", label: "Организации", icon: Database },
];

const TYPE_OPTIONS = [
  { value: "user", label: "Пользовательский", icon: Eye },
  { value: "system", label: "Системный", icon: Settings2 },
];

export function DictionarySettingsForm({
  formData,
  isInitialTableKey,
  onFormDataChange,
}: DictionarySettingsFormProps) {
  const updateField = <K extends keyof typeof formData>(
    field: K,
    value: (typeof formData)[K],
  ) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  return (
    <div className="flex flex-col gap-4">
      <SidebarSection title="Идентификация">
        <Input
          label="Название"
          placeholder="Напр. Список отделов"
          value={formData.label}
          onChange={(e) => updateField("label", e.target.value)}
          variant="bordered"
          size="sm"
          labelPlacement="outside"
          classNames={{ label: "text-[10px] font-black uppercase tracking-widest text-zinc-400" }}
        />
        <Input
          label="Системный ключ (DB)"
          placeholder="departments"
          value={formData.tableKey}
          onChange={(e) =>
            updateField("tableKey", e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))
          }
          variant="bordered"
          size="sm"
          labelPlacement="outside"
          className="font-mono"
          isDisabled={isInitialTableKey}
          classNames={{ label: "text-[10px] font-black uppercase tracking-widest text-zinc-400" }}
        />
      </SidebarSection>

      <SidebarSection title="Категория и тип">
        <Select
          label="Тип"
          selectedKeys={[formData.type]}
          onSelectionChange={(keys) => {
            const value = Array.from(keys)[0] as "system" | "user";
            updateField("type", value);
          }}
          variant="bordered"
          size="sm"
          labelPlacement="outside"
          classNames={{ label: "text-[10px] font-black uppercase tracking-widest text-zinc-400" }}
        >
          {TYPE_OPTIONS.map((option) => {
            const IconComponent = option.icon;
            return (
              <SelectItem key={option.value} startContent={<IconComponent className="h-4 w-4" />}>
                {option.label}
              </SelectItem>
            );
          })}
        </Select>

        <Select
          label="Категория"
          selectedKeys={[formData.category]}
          onSelectionChange={(keys) => {
            const value = Array.from(keys)[0] as string;
            updateField("category", value);
          }}
          variant="bordered"
          size="sm"
          labelPlacement="outside"
          classNames={{ label: "text-[10px] font-black uppercase tracking-widest text-zinc-400" }}
        >
          {CATEGORY_OPTIONS.map((option) => {
            const IconComponent = option.icon;
            return (
              <SelectItem key={option.value} startContent={<IconComponent className="h-4 w-4" />}>
                {option.label}
              </SelectItem>
            );
          })}
        </Select>
      </SidebarSection>

      <SidebarSection title="Флаги и поведение">
        <div className="space-y-2">
          <ToggleRow
            label="Активность"
            code="is_active"
            checked={formData.hasIsActive}
            onChange={(v) => updateField("hasIsActive", v)}
          />
          <ToggleRow
            label="Сортировка"
            code="sort_order"
            checked={formData.hasSortOrder}
            onChange={(v) => updateField("hasSortOrder", v)}
          />
          <ToggleRow
            label="Системный флаг"
            code="is_system"
            checked={formData.hasIsSystem}
            onChange={(v) => updateField("hasIsSystem", v)}
          />
        </div>
      </SidebarSection>

      <SidebarSection title="Доступ">
        <Input
          label="Permission код"
          placeholder="reference:manage"
          value={formData.permissionCode}
          onChange={(e) => updateField("permissionCode", e.target.value)}
          variant="bordered"
          size="sm"
          labelPlacement="outside"
          classNames={{ label: "text-[10px] font-black uppercase tracking-widest text-zinc-400" }}
        />
      </SidebarSection>

      {/* Schema info block */}
      <div className="mt-auto p-3 rounded-xl bg-zinc-50 border border-zinc-100 space-y-1">
        <p className="text-[9px] font-black text-zinc-300 uppercase tracking-widest">
          Авто-поля
        </p>
        {[
          { key: "id", label: "Primary Key", icon: "🔑" },
          { key: "created_at", label: "Дата создания", icon: "📅" },
          { key: "updated_at", label: "Дата изменения", icon: "🔄" },
          ...(formData.hasIsActive ? [{ key: "is_active", label: "Активен", icon: "✅" }] : []),
          ...(formData.hasSortOrder ? [{ key: "sort_order", label: "Порядок", icon: "↕" }] : []),
          ...(formData.hasIsSystem ? [{ key: "is_system", label: "Системный", icon: "⚙" }] : []),
        ].map((f) => (
          <div key={f.key} className="flex items-center gap-1.5">
            <span className="text-[10px]">{f.icon}</span>
            <code className="text-[9px] text-zinc-400 font-mono">{f.key}</code>
            <span className="text-[9px] text-zinc-300 ml-auto">{f.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SidebarSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-1.5">
        <div className="w-1 h-3.5 bg-primary rounded-full" />
        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

function ToggleRow({
  label,
  code,
  checked,
  onChange,
}: {
  label: string;
  code: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-1.5 px-2.5 rounded-lg hover:bg-zinc-50 transition-colors">
      <div className="flex flex-col">
        <span className="text-xs font-semibold text-zinc-700">{label}</span>
        <code className="text-[9px] text-zinc-400">{code}</code>
      </div>
      <Switch size="sm" isSelected={checked} onValueChange={onChange} />
    </div>
  );
}

// Re-export BookOpen for DictionarySettingsForm consumers
export { BookOpen };
