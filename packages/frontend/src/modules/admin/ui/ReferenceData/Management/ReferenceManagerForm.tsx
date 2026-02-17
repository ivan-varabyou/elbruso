"use client";


import { apiClient } from "@frontend/api/admin/client";
import { ApiResponse } from "@frontend/types/api-response";
import { 
  Button,
  Divider,
  Input, 
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select, 
  Selection,
  SelectItem,
  Switch,
  useDisclosure
} from "@heroui/react";
import { 
  AllCommunityModule,
  GridApi,
  GridReadyEvent,
  ModuleRegistry,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { AxiosError } from "axios";
import { 
  AlertCircle,
  ArrowLeft, 
  BookOpen, 
  ChevronRight,
  Database, 
  Eye, 
  Hash, 
  Link as LinkIcon, 
  LucideProps, 
  Plus, 
  Save, 
  Settings2, 
  Table,
  Type 
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

// Register all community modules
ModuleRegistry.registerModules([AllCommunityModule]);

interface ColumnDef {
  key: string;
  label: string;
  type: 'string' | 'number' | 'boolean' | 'date';
  required: boolean;
  editable: boolean;
  placeholder?: string;
  description?: string;
  defaultValue?: string;
  relation?: {
    table: string;
    labelField: string;
  };
}

const COLUMN_TYPES: { label: string; value: ColumnDef['type']; icon: React.ComponentType<LucideProps> }[] = [
  { label: "Текст", value: "string", icon: Type },
  { label: "Число", value: "number", icon: Hash },
  { label: "Логика", value: "boolean", icon: Eye },
  { label: "Дата", value: "date", icon: BookOpen },
];

export function ReferenceManagerForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [availableTables, setAvailableTables] = useState<Record<string, { label: string; columns: { key: string; label: string }[] }>>({});
  const { isOpen: isRelationOpen, onOpen: onRelationOpen, onClose: onRelationClose } = useDisclosure();
  const [activeColIndex, setActiveColIndex] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    tableKey: "",
    label: "",
    icon: "BookOpen",
    category: "general",
    type: "user" as "system" | "user",
    hasIsActive: true,
    hasIsSystem: false,
    hasSortOrder: false,
    permissionCode: "",
  });



  const { isOpen: isColumnSettingsOpen, onOpen: onColumnSettingsOpen, onClose: onColumnSettingsClose } = useDisclosure();

  const [columns, setColumns] = useState<ColumnDef[]>([
    { key: "name_ru", label: "Название", type: "string", required: true, editable: true }
  ]);

  const gridApiRef = useRef<GridApi | null>(null);

  const onGridReady = (params: GridReadyEvent) => {
    gridApiRef.current = params.api;
  };

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const resp = await apiClient.get<ApiResponse<Record<string, { label: string; columns: { key: string; label: string }[] }>>>("reference/data/tables");
        if (resp.data.data) {
          setAvailableTables(resp.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch tables metadata:", error);
      }
    };
    fetchMetadata();
  }, []);

  const addColumn = () => {
    const newIdx = columns.length;
    setColumns([...columns, { key: "", label: "", type: "string", required: false, editable: true }]);
    setActiveColIndex(newIdx);
    onColumnSettingsOpen();
  };

  const removeColumn = (index: number) => {
    setColumns(columns.filter((_, i) => i !== index));
  };

  const updateColumn = (index: number, data: Partial<ColumnDef>) => {
    const newCols = [...columns];
    newCols[index] = { ...newCols[index], ...data };
    setColumns(newCols);
  };

  const toggleColumnSettings = (index: number) => {
    setActiveColIndex(index);
    onColumnSettingsOpen();
  };

  const saveRelation = (table: string, labelField: string) => {
    if (activeColIndex !== null) {
      const currentLabel = columns[activeColIndex].label;
      const currentKey = columns[activeColIndex].key;

      const updates: Partial<ColumnDef> = { 
        relation: table ? { table, labelField } : undefined 
      };

      // Auto-fill label and key if empty
      if (table && (!currentLabel || currentLabel === "Колонка..." || currentLabel === "Без названия")) {
        updates.label = availableTables[table]?.label || table;
      }
      if (table && (!currentKey || currentKey === "no-key" || currentKey === "")) {
        const sanitizedKey = (availableTables[table]?.label || table)
          .toLowerCase()
          .replace(/[^a-z0-9]/g, '_') + "_id";
        updates.key = sanitizedKey;
      }

      updateColumn(activeColIndex, updates);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number, field: string) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (index < columns.length - 1) {
        const nextInput = document.getElementById(`col-${index + 1}-${field}`) as HTMLInputElement;
        nextInput?.focus();
        nextInput?.select();
      } else {
        addColumn();
        setTimeout(() => {
          const nextInput = document.getElementById(`col-${index + 1}-${field}`) as HTMLInputElement;
          nextInput?.focus();
          nextInput?.select();
        }, 50);
      }
    } else if (e.key === 'ArrowUp' && index > 0) {
      e.preventDefault();
      const prevInput = document.getElementById(`col-${index - 1}-${field}`) as HTMLInputElement;
      prevInput?.focus();
      prevInput?.select();
    } else if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (index === columns.length - 1) {
        addColumn();
        setTimeout(() => {
          const nextInput = document.getElementById(`col-${index + 1}-label`) as HTMLInputElement;
          nextInput?.focus();
        }, 50);
      } else {
        const nextInput = document.getElementById(`col-${index + 1}-label`) as HTMLInputElement;
        nextInput?.focus();
        nextInput?.select();
      }
    }
  };

  const handleSubmit = async () => {
    if (!formData.tableKey || !formData.label) {
      alert("Заполните название и ключ таблицы");
      return;
    }

    if (columns.some(c => !c.key || !c.label)) {
      alert("Заполните все поля в колонках");
      return;
    }

    setLoading(true);
    try {
      const tableKey = formData.tableKey.startsWith("ref_") ? formData.tableKey : `ref_${formData.tableKey}`;
      await apiClient.post("reference/management", {
        ...formData,
        tableKey,
        columns
      });
      alert("Справочник успешно создан");
      router.push("/reference/management");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      alert(`Ошибка: ${err.response?.data?.message || "Не удалось создать таблицу"}`);
    } finally {
      setLoading(false);
    }
  };

  const demoRows = useMemo(() => [
    { 
      id: 1, 
      ...Object.fromEntries(columns.map(c => {
        if (c.relation) {
          const tableName = availableTables[c.relation.table]?.label || c.relation.table;
          return [c.key || 'temp', `[Связь: ${tableName}]` ];
        }
        return [c.key || 'temp', c.type === 'number' ? 123 : c.type === 'boolean' ? true : c.type === 'date' ? '2024-01-01' : 'Демо-данная'];
      })) 
    },
    { 
      id: 2, 
      ...Object.fromEntries(columns.map(c => {
        if (c.relation) {
          const tableName = availableTables[c.relation.table]?.label || c.relation.table;
          return [c.key || 'temp', `[Связь: ${tableName}]` ];
        }
        return [c.key || 'temp', c.type === 'number' ? 456 : c.type === 'boolean' ? false : c.type === 'date' ? '2024-12-31' : 'Пример текста'];
      })) 
    },
  ], [columns, availableTables]);

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 pb-20 px-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button isIconOnly variant="flat" onPress={() => router.push("/reference/management")} radius="full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-extrabold text-zinc-900 tracking-tight flex items-center gap-3">
              <span className="bg-primary/10 text-primary p-2 rounded-m">
                 <Database className="h-6 w-6" />
              </span>
              {formData.label || "Новый справочник"}
            </h1>
            <p className="text-zinc-500 text-sm font-medium mt-1">Определите структуру колонок и настройте справочник</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="flat" className="font-semibold" onPress={() => router.push("/reference/management")}>Отмена</Button>
          <Button color="primary" className="font-bold shadow-lg shadow-primary/30" startContent={<Save className="h-4 w-4" />} isLoading={loading} onPress={handleSubmit}>
            Создать и опубликовать
          </Button>
        </div>
      </div>

      <div className="space-y-12">
        {/* Global Table Settings Section */}
        <section className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm space-y-8">
          <div className="flex items-center gap-2 font-bold text-zinc-500 text-[11px] uppercase tracking-[0.2em] mb-2">
            <Settings2 className="h-3.5 w-3.5" /> Настройки справочника
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Input 
              label="Название справочника" 
              labelPlacement="outside"
              placeholder="Напр. Список отделов"
              value={formData.label}
              onValueChange={(v) => setFormData({ ...formData, label: v })}
              variant="bordered"
              size="lg"
              className="font-bold"
            />
            
            <Input 
              label="Системный ключ (DB)" 
              labelPlacement="outside"
              placeholder="departments"
              value={formData.tableKey}
              onValueChange={(v) => setFormData({ ...formData, tableKey: v.toLowerCase().replace(/[^a-z0-0_]/g, '') })}
              variant="bordered"
              size="lg"
              startContent={<span className="text-zinc-400 text-xs font-mono">ref_</span>}
              className="font-mono"
            />

            <Select 
              label="Тип справочника"
              labelPlacement="outside"
              size="lg"
              selectedKeys={[formData.type]}
              onSelectionChange={(keys: Selection) => setFormData({ ...formData, type: Array.from(keys as Set<string>)[0] as "system" | "user" })}
              variant="bordered"
            >
              <SelectItem key="user" startContent={<Eye className="h-4 w-4" />}>Пользовательский</SelectItem>
              <SelectItem key="system" startContent={<Settings2 className="h-4 w-4" />}>Системный</SelectItem>
            </Select>

            <Select 
              label="Категория"
              labelPlacement="outside"
              size="lg"
              selectedKeys={[formData.category]}
              onSelectionChange={(keys: Selection) => setFormData({ ...formData, category: Array.from(keys as Set<string>)[0] })}
              variant="bordered"
            >
              <SelectItem key="general" startContent={<BookOpen className="h-4 w-4" />}>Общие</SelectItem>
              <SelectItem key="geo" startContent={<Database className="h-4 w-4" />}>География</SelectItem>
              <SelectItem key="sport" startContent={<Plus className="h-4 w-4" />}>Спорт</SelectItem>
              <SelectItem key="orgs" startContent={<Settings2 className="h-4 w-4" />}>Организации</SelectItem>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <Input 
                label="Код доступа (Permission)" 
                labelPlacement="outside"
                placeholder="reference:manage"
                value={formData.permissionCode}
                onValueChange={(v) => setFormData({ ...formData, permissionCode: v })}
                variant="bordered"
              />
            </div>
            
            <div className="flex flex-wrap gap-8 items-end h-full">
              <div className="flex items-center gap-3">
                <Switch size="sm" isSelected={formData.hasIsActive} onValueChange={(v) => setFormData({ ...formData, hasIsActive: v })} />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-zinc-700">Активность</span>
                  <span className="text-[10px] text-zinc-400 font-mono">is_active</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Switch size="sm" isSelected={formData.hasSortOrder} onValueChange={(v) => setFormData({ ...formData, hasSortOrder: v })} />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-zinc-700">Сортировка</span>
                  <span className="text-[10px] text-zinc-400 font-mono">sort_order</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Switch size="sm" isSelected={formData.hasIsSystem} onValueChange={(v) => setFormData({ ...formData, hasIsSystem: v })} />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-zinc-700">Системный флаг</span>
                  <span className="text-[10px] text-zinc-400 font-mono">is_system</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Structure Editor Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
             <div className="flex items-center gap-2 font-bold text-zinc-500 text-[11px] uppercase tracking-[0.2em]">
               <BookOpen className="h-3.5 w-3.5" /> Структура колонок
             </div>
             <p className="text-[10px] text-zinc-400">Нажмите на заголовок колонки для детальной настройки</p>
          </div>

          <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-2xl shadow-zinc-100 ring-1 ring-zinc-100/50 h-[400px]">
             <div className="ag-theme-quartz h-full w-full">
                <AgGridReact
                  onGridReady={onGridReady}
                  rowData={demoRows}
                  columnDefs={[
                    { 
                      headerName: "ID", 
                      valueGetter: "node.rowIndex + 1", 
                      width: 70, 
                      pinned: "left",
                      cellStyle: { backgroundColor: '#f9fafb', color: '#9ca3af', fontWeight: 'bold' }
                    },
                    ...columns.map((col, idx) => ({
                      headerName: col.label || "...",
                      field: col.key,
                      flex: 1,
                      minWidth: 150,
                      headerComponent: () => (
                        <div 
                          className="flex items-center justify-between w-full group cursor-pointer"
                          onClick={() => toggleColumnSettings(idx)}
                        >
                          <div className="flex items-center gap-2">
                            {(() => {
                              const TypeIcon = COLUMN_TYPES.find(t => t.value === col.type)?.icon || Type;
                              return <TypeIcon className="h-3.5 w-3.5 text-zinc-400" />;
                            })()}
                            <span className="truncate">{col.label || "Колонка..."}</span>
                          </div>
                          <Settings2 className="h-3 w-3 text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      )
                    })),
                    {
                      headerName: "",
                      field: "add_column",
                      width: 60,
                      pinned: "right",
                      headerComponent: () => (
                        <div 
                          className="flex items-center justify-center w-full h-full cursor-pointer hover:bg-zinc-100/50 transition-colors" 
                          onClick={addColumn}
                        >
                           <Plus className="h-5 w-5 text-primary" />
                        </div>
                      ),
                      cellRenderer: () => null
                    }
                  ]}
                  defaultColDef={{
                    resizable: true,
                    sortable: false,
                    filter: false,
                  }}
                  rowSelection="multiple"
                  suppressMovableColumns={true}
                  headerHeight={56}
                  rowHeight={56}
                />
             </div>
          </div>
        </section>
      </div>


      {/* Advanced Column Configurator Modal */}
      <Modal 
        isOpen={isColumnSettingsOpen} 
        onOpenChange={onColumnSettingsClose} 
        size="5xl" 
        scrollBehavior="inside"
        classNames={{
          base: "max-h-[85vh] h-[800px]",
          header: "border-b border-zinc-100 px-8 py-6",
          body: "p-0 overflow-hidden",
          footer: "border-t border-zinc-100 px-8 py-4"
        }}
      >
        <ModalContent>
           {activeColIndex !== null && (
             <>
               <ModalHeader className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-3 text-primary">
                     <Settings2 className="h-6 w-6" />
                     <span className="text-2xl font-black tracking-tight uppercase">Конфигуратор полей</span>
                  </div>
                  <p className="text-zinc-400 text-[11px] font-bold uppercase tracking-[0.2em]">Профессиональная настройка структуры данных</p>
               </ModalHeader>
               <ModalBody className="flex flex-row">
                  {/* Modal Sidebar - Column List */}
                  <div className="w-72 border-r border-zinc-100 bg-zinc-50/50 flex flex-col h-full shrink-0">
                    <div className="p-4 border-b border-zinc-100 bg-white">
                      <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Список колонок</span>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-1 excel-scrollbar">
                      {columns.map((col, idx) => {
                        const TypeIcon = COLUMN_TYPES.find(t => t.value === col.type)?.icon || Type;
                        return (
                          <div 
                            key={idx}
                            onClick={() => setActiveColIndex(idx)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-m cursor-pointer transition-all border ${activeColIndex === idx ? "bg-white border-zinc-200 shadow-sm ring-1 ring-primary/5 text-primary" : "border-transparent text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700"}`}
                          >
                            <div className={`p-1.5 rounded-lg ${activeColIndex === idx ? "bg-primary text-white" : "bg-zinc-200 text-zinc-400"}`}>
                              <TypeIcon className="h-3.5 w-3.5" />
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-xs font-bold truncate">{col.label || "Без названия"}</span>
                              <span className="text-[10px] font-mono opacity-50 truncate">{col.key || "no-key"}</span>
                            </div>
                          </div>
                        );
                      })}
                      <Button 
                        variant="light" 
                        fullWidth 
                        startContent={<Plus className="h-4 w-4" />}
                        className="text-xs font-bold text-primary mt-2 h-11 justify-start px-4 hover:bg-primary/5"
                        onPress={addColumn}
                      >
                        Добавить поле
                      </Button>
                    </div>
                  </div>

                  {/* Modal Main Content - Settings */}
                  <div className="flex-1 overflow-y-auto p-10 space-y-12 bg-white excel-scrollbar">
                    {/* Basic Info */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-6 bg-primary rounded-full" />
                        <h4 className="text-sm font-black text-zinc-900 uppercase tracking-widest">Основная информация</h4>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6">
                        <Input 
                           label="Отображаемое название (Display Label)" 
                           labelPlacement="outside"
                           placeholder="Напр. Название организации"
                           value={columns[activeColIndex].label}
                           onValueChange={(v) => updateColumn(activeColIndex, { label: v })}
                           variant="bordered"
                           size="lg"
                           className="font-bold"
                         />
                         <Input 
                           label="Системный ключ (Field ID)" 
                           labelPlacement="outside"
                           placeholder="org_name"
                           value={columns[activeColIndex].key}
                           onValueChange={(v) => updateColumn(activeColIndex, { key: v.toLowerCase().replace(/[^a-z0-0_]/g, '') })}
                           variant="bordered"
                           size="lg"
                           className="font-mono"
                         />
                      </div>

                      <div className="space-y-3">
                        <span className="text-sm font-bold text-zinc-700">Тип данных</span>
                        <div className="grid grid-cols-4 gap-4">
                           {COLUMN_TYPES.map((t) => (
                             <div 
                               key={t.value}
                               onClick={() => updateColumn(activeColIndex!, { type: t.value })}
                               className={`p-4 rounded-l border-2 transition-all cursor-pointer flex flex-col items-center gap-3 ${columns[activeColIndex!]?.type === t.value ? "bg-primary/5 border-primary shadow-sm" : "bg-white border-zinc-100 hover:border-zinc-200"}`}
                             >
                                <div className={`p-2.5 rounded-m ${columns[activeColIndex!]?.type === t.value ? "bg-primary text-white" : "bg-zinc-100 text-zinc-400"}`}>
                                   <t.icon className="h-5 w-5" />
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-widest ${columns[activeColIndex!]?.type === t.value ? "text-primary" : "text-zinc-500"}`}>
                                   {t.label}
                                </span>
                             </div>
                           ))}
                        </div>
                      </div>
                    </div>

                    <Divider className="opacity-50" />

                    {/* Meta & Validation */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-6 bg-zinc-400 rounded-full" />
                        <h4 className="text-sm font-black text-zinc-900 uppercase tracking-widest">Поведение и валидация</h4>
                      </div>

                      <div className="grid grid-cols-2 gap-8">
                         <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-l bg-zinc-50 border border-zinc-100/50">
                               <div className="space-y-0.5">
                                  <span className="text-xs font-bold text-zinc-700">Обязательное поле</span>
                                  <p className="text-[10px] text-zinc-400">Enforce non-empty value</p>
                               </div>
                               <Switch size="sm" isSelected={columns[activeColIndex].required} onValueChange={(v) => updateColumn(activeColIndex!, { required: v })} />
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-l bg-zinc-50 border border-zinc-100/50">
                               <div className="space-y-0.5">
                                  <span className="text-xs font-bold text-zinc-700">Редактируемое</span>
                                  <p className="text-[10px] text-zinc-400">Allow users to modify</p>
                               </div>
                               <Switch size="sm" isSelected={columns[activeColIndex].editable} onValueChange={(v) => updateColumn(activeColIndex!, { editable: v })} />
                            </div>
                         </div>
                         <div className="space-y-4">
                           <Input 
                              label="Подсказка (Placeholder)" 
                              labelPlacement="outside"
                              placeholder="Введите название..."
                              value={columns[activeColIndex].placeholder || ""}
                              onValueChange={(v) => updateColumn(activeColIndex, { placeholder: v })}
                              variant="bordered"
                            />
                            <Input 
                              label="Значение по умолчанию" 
                              labelPlacement="outside"
                              placeholder="Напр. 0 или 'Без имени'"
                              value={columns[activeColIndex].defaultValue || ""}
                              onValueChange={(v) => updateColumn(activeColIndex, { defaultValue: v })}
                              variant="bordered"
                            />
                         </div>
                      </div>
                    </div>

                    <Divider className="opacity-50" />

                    {/* Relationship Engine */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
                        <h4 className="text-sm font-black text-zinc-900 uppercase tracking-widest">Связи данных (Relationships)</h4>
                      </div>

                      <div className={`p-8 rounded-3xl border-2 transition-all ${columns[activeColIndex].relation ? "bg-blue-50/30 border-blue-200/50 shadow-inner" : "bg-zinc-50 border-zinc-100"}`}>
                        <div className="flex items-center justify-between mb-8">
                           <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-m ${columns[activeColIndex].relation ? "bg-blue-500 text-white" : "bg-zinc-200 text-zinc-400"}`}>
                                <LinkIcon className="h-5 w-5" />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-sm font-bold text-zinc-700">Внешняя связь</span>
                                <span className="text-[10px] text-zinc-400 font-medium">Связать это поле с другой таблицей справочника</span>
                              </div>
                           </div>
                           <Switch 
                              size="md" 
                              isSelected={!!columns[activeColIndex].relation} 
                              onValueChange={(v) => v ? onRelationOpen() : updateColumn(activeColIndex!, { relation: undefined })}
                           />
                        </div>
                        
                        {columns[activeColIndex].relation ? (
                          <div className="flex items-center gap-4 bg-white p-6 rounded-l border border-blue-100 shadow-sm relative overflow-hidden group">
                             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform" />
                             <div className="flex-1 flex items-center justify-between px-4">
                                <div className="flex flex-col text-center">
                                   <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Текущая таблица</span>
                                   <span className="text-sm font-bold text-zinc-900">{formData.label || "Новая"}</span>
                                </div>
                                <div className="flex flex-col items-center">
                                   <div className="w-12 h-0.5 bg-blue-200 rounded-full relative">
                                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full" />
                                   </div>
                                   <span className="text-[9px] font-black text-blue-500 uppercase tracking-[0.2em] mt-2">Foreign Link</span>
                                </div>
                                <div className="flex flex-col text-center">
                                   <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Справочник: {columns[activeColIndex].relation?.table}</span>
                                   <span className="text-sm font-bold text-blue-600">{availableTables[columns[activeColIndex].relation!.table]?.label || "..."}</span>
                                </div>
                             </div>
                             <Button size="sm" variant="flat" color="primary" className="font-bold shrink-0 ml-4" onPress={onRelationOpen}>Изменить связь</Button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center py-4 border-2 border-dashed border-zinc-200 rounded-l bg-white/50">
                             <p className="text-[11px] text-zinc-400 font-medium italic">Связи не определены. Включите переключатель выше для настройки.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
               </ModalBody>
               <ModalFooter className="flex justify-between items-center">
                  <Button variant="flat" color="danger" className="font-bold border border-danger/10" isDisabled={columns.length === 1} onPress={() => { removeColumn(activeColIndex!); onColumnSettingsClose(); }}>
                     Удалить поле
                  </Button>
                  <div className="flex gap-3">
                    <Button variant="flat" className="font-bold" onPress={onColumnSettingsClose}>Отмена</Button>
                    <Button color="primary" className="font-bold shadow-lg shadow-primary/20 px-10 h-10" onPress={onColumnSettingsClose}>Сохранить изменения</Button>
                  </div>
               </ModalFooter>
             </>
           )}
        </ModalContent>
      </Modal>

      {/* Professional Relation Modal */}
      <Modal isOpen={isRelationOpen} onOpenChange={onRelationClose} size="2xl" scrollBehavior="inside">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 border-b border-zinc-100 py-6 px-8">
             <div className="flex items-center gap-3 text-blue-600">
                <LinkIcon className="h-6 w-6" />
                <span className="text-xl font-black uppercase tracking-tight">Настройка внешней связи</span>
             </div>
             <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em]">Укажите источник данных для этого поля</p>
          </ModalHeader>
          <ModalBody className="p-8 space-y-8">
             {/* Visual Flow Representation */}
             <div className="flex items-center justify-center gap-6 py-8 bg-zinc-50 rounded-3xl border border-zinc-100 shadow-inner relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-zinc-200/50 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
                
                <div className="z-10 flex flex-col items-center gap-2">
                   <div className="w-16 h-16 rounded-l bg-white border-2 border-zinc-200 shadow-sm flex items-center justify-center">
                      <Database className="h-8 w-8 text-zinc-400" />
                   </div>
                   <span className="text-[10px] font-black text-zinc-500 uppercase">{formData.label || "ТЕКУЩАЯ"}</span>
                </div>

                <div className="z-10 flex flex-col items-center gap-1">
                   <div className="h-0.5 w-24 bg-gradient-to-r from-zinc-200 via-blue-400 to-blue-200 rounded-full relative">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-sm" />
                   </div>
                   <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">СВЯЗЬ</span>
                </div>

                <div className="z-10 flex flex-col items-center gap-2">
                   <div className={`w-16 h-16 rounded-l border-2 transition-all flex items-center justify-center ${activeColIndex !== null && columns[activeColIndex]?.relation?.table ? "bg-blue-600 border-blue-400 shadow-lg shadow-blue-200 text-white" : "bg-white border-dashed border-zinc-300 text-zinc-300"}`}>
                      <Table className="h-8 w-8" />
                   </div>
                   <span className="text-[10px] font-black text-zinc-500 uppercase">
                     {activeColIndex !== null && columns[activeColIndex]?.relation?.table ? (availableTables[columns[activeColIndex]!.relation!.table]?.label || "ЦЕЛЬ") : "ЦЕЛЬ"}
                   </span>
                </div>
             </div>

             <div className="space-y-6">
                <div className="space-y-3">
                   <div className="flex items-center justify-between">
                     <span className="text-xs font-black text-zinc-400 uppercase tracking-widest">1. Выбор справочника</span>
                     <span className="text-[10px] text-zinc-400 font-bold uppercase">{Object.keys(availableTables).length} доступно</span>
                   </div>
                   <Select 
                     placeholder="Найдите таблицу..."
                     selectedKeys={activeColIndex !== null && columns[activeColIndex]?.relation?.table ? [columns[activeColIndex]!.relation!.table] : []}
                     onSelectionChange={(keys) => {
                       if (keys === "all" || keys.size === 0) return;
                       const table = Array.from(keys)[0] as string;
                       const firstCol = availableTables[table]?.columns[0]?.key || "id";
                       saveRelation(table, firstCol);
                     }}
                     variant="bordered"
                     size="lg"
                     classNames={{
                        trigger: "h-14 rounded-l font-bold",
                     }}
                   >
                     {Object.entries(availableTables).map(([key, meta]) => (
                       <SelectItem key={key} textValue={meta.label}>
                         <div className="flex items-center justify-between w-full">
                           <div className="flex flex-col">
                             <span className="font-bold">{meta.label}</span>
                             <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-tighter">{key}</span>
                           </div>
                           <ChevronRight className="h-4 w-4 text-zinc-300" />
                         </div>
                       </SelectItem>
                     ))}
                   </Select>
                </div>

                {activeColIndex !== null && columns[activeColIndex]?.relation?.table && (
                  <div className="space-y-3 animate-in fade-in slide-in-from-top-4 duration-500">
                    <span className="text-xs font-black text-zinc-400 uppercase tracking-widest">2. Поле для отображения (Label)</span>
                    <Select 
                      placeholder="Выберите текстовое поле..."
                      selectedKeys={columns[activeColIndex]!.relation?.labelField ? [columns[activeColIndex]!.relation!.labelField] : []}
                      onSelectionChange={(keys) => {
                        if (keys === "all" || keys.size === 0) return;
                        const field = Array.from(keys)[0] as string;
                        const table = columns[activeColIndex!]?.relation?.table;
                        if (table) {
                          saveRelation(table, field);
                        }
                      }}
                      variant="bordered"
                      size="lg"
                      classNames={{
                         trigger: "h-14 rounded-l font-bold",
                      }}
                    >
                      {(availableTables[columns[activeColIndex]!.relation!.table]?.columns || []).map((col) => (
                        <SelectItem key={col.key} textValue={col.label || col.key}>
                          <div className="flex flex-col">
                             <span className="font-bold">{col.label || col.key}</span>
                             <span className="text-[10px] font-mono text-zinc-400">{col.key}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                )}
             </div>

             <div className="p-4 bg-amber-50 rounded-l border border-amber-100 flex gap-3">
                <div className="p-2 bg-amber-100 rounded-m">
                   <AlertCircle className="h-4 w-4 text-amber-600" />
                </div>
                <div className="space-y-1">
                   <p className="text-xs font-bold text-amber-900">Важное замечание</p>
                   <p className="text-[10px] text-amber-700 leading-relaxed">
                      Связь позволяет выбирать значения из другого справочника. 
                      В базе данных будет храниться ID записи, а в интерфейсе отобразится выбранное поле.
                   </p>
                </div>
             </div>
          </ModalBody>
          <ModalFooter className="border-t border-zinc-100 p-6 flex justify-between gap-4">
             <Button variant="light" color="danger" className="font-bold" onPress={() => { saveRelation("", ""); onRelationClose(); }}>Удалить связь</Button>
             <div className="flex gap-3">
                <Button variant="flat" className="font-bold" onPress={onRelationClose}>Отмена</Button>
                <Button color="primary" className="font-bold px-8" onPress={onRelationClose}>Закрыть</Button>
             </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
