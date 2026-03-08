import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  SelectItem,
} from "@heroui/react";
import type { Selection } from "@heroui/react";
import { LinkIcon, Database, Table, AlertCircle } from "lucide-react";

interface RelationModalProps {
  isOpen: boolean;
  onClose: () => void;
  columnLabel?: string;
  availableTables: Record<string, { label: string; columns: { key: string; label: string }[] }>;
  selectedTable?: string;
  onSelectTable: (table: string, labelField: string) => void;
  onRemoveRelation: () => void;
}

export function RelationModal({
  isOpen,
  onClose,
  columnLabel,
  availableTables,
  selectedTable,
  onSelectTable,
  onRemoveRelation,
}: RelationModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onModalClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 border-b border-zinc-100 py-6 px-8">
              <div className="flex items-center gap-3 text-blue-600">
                <LinkIcon className="h-6 w-6" />
                <div>
                  <span className="text-xl font-black uppercase tracking-tight block">
                    Настройка внешней связи
                  </span>
                  <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                    Укажите источник данных для этого поля
                  </p>
                </div>
              </div>
            </ModalHeader>
            <ModalBody className="p-8 space-y-8">
              <VisualFlowDiagram
                columnLabel={columnLabel}
                targetTable={selectedTable ? availableTables[selectedTable]?.label : undefined}
              />

              <TableSelector
                availableTables={availableTables}
                selectedTable={selectedTable}
                onSelect={onSelectTable}
              />

              <InfoNotice />
            </ModalBody>
            <ModalFooter className="border-t border-zinc-100 p-6 flex justify-between gap-4">
              <Button
                variant="light"
                color="danger"
                className="font-bold"
                onPress={() => {
                  onRemoveRelation();
                  onModalClose();
                }}
              >
                Удалить связь
              </Button>
              <div className="flex gap-3">
                <Button variant="flat" className="font-bold" onPress={onModalClose}>
                  Отмена
                </Button>
                <Button variant="solid" color="primary" className="font-bold px-8" onPress={onModalClose}>
                  Закрыть
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

interface VisualFlowDiagramProps {
  columnLabel?: string;
  targetTable?: string;
}

function VisualFlowDiagram({ columnLabel, targetTable }: VisualFlowDiagramProps) {
  return (
    <div className="flex items-center justify-center gap-6 py-8 bg-zinc-50 rounded-3xl border border-zinc-100 shadow-inner relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-zinc-200/50 [mask-image:linear-gradient(to_bottom,white,transparent)]" />

      <div className="z-10 flex flex-col items-center gap-2">
        <div className="w-16 h-16 rounded-lg bg-white border-2 border-zinc-200 shadow-sm flex items-center justify-center">
          <Database className="h-8 w-8 text-zinc-400" />
        </div>
        <span className="text-[10px] font-black text-zinc-500 uppercase">
          {columnLabel || "ТЕКУЩАЯ"}
        </span>
      </div>

      <div className="z-10 flex flex-col items-center gap-1">
        <div className="h-0.5 w-24 bg-gradient-to-r from-zinc-200 via-blue-400 to-blue-200 rounded-full relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-sm" />
        </div>
        <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">
          СВЯЗЬ
        </span>
      </div>

      <div className="z-10 flex flex-col items-center gap-2">
        <div
          className={`w-16 h-16 rounded-lg border-2 transition-all flex items-center justify-center ${
            targetTable
              ? "bg-blue-600 border-blue-400 shadow-lg shadow-blue-200 text-white"
              : "bg-white border-dashed border-zinc-300 text-zinc-300"
          }`}
        >
          <Table className="h-8 w-8" />
        </div>
        <span className="text-[10px] font-black text-zinc-500 uppercase">
          {targetTable || "ЦЕЛЬ"}
        </span>
      </div>
    </div>
  );
}

interface TableSelectorProps {
  availableTables: Record<string, { label: string; columns: { key: string; label: string }[] }>;
  selectedTable?: string;
  onSelect: (table: string, labelField: string) => void;
}

function TableSelector({ availableTables, selectedTable, onSelect }: TableSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-black text-zinc-400 uppercase tracking-widest">
          1. Выбор справочника
        </span>
        <span className="text-[10px] text-zinc-400 font-bold uppercase">
          {Object.keys(availableTables).length} доступно
        </span>
      </div>
      <Select
        placeholder="Найдите таблицу..."
        selectedKeys={selectedTable ? [selectedTable] : []}
        onSelectionChange={(keys: Selection) => {
          if (keys === "all" || keys.size === 0) return;
          const table = Array.from(keys)[0] as string;
          const firstCol = availableTables[table]?.columns[0]?.key || "id";
          onSelect(table, firstCol);
        }}
        variant="bordered"
        size="lg"
        classNames={{
          trigger: "h-14 rounded-lg font-bold",
        }}
      >
        {Object.entries(availableTables).map(([key, meta]) => (
          <SelectItem key={key} textValue={meta.label}>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-zinc-900">{meta.label}</span>
                <span className="text-[10px] text-zinc-400 font-mono">{key}</span>
              </div>
              <span className="text-xs text-zinc-500">{meta.columns.length} колонок</span>
            </div>
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}

function InfoNotice() {
  return (
    <div className="p-4 bg-amber-50 rounded-lg border border-amber-100 flex gap-3">
      <div className="p-2 bg-amber-100 rounded-lg">
        <AlertCircle className="h-4 w-4 text-amber-600" />
      </div>
      <div className="space-y-1">
        <p className="text-xs font-bold text-amber-900">Важное замечание</p>
        <p className="text-[10px] text-amber-700 leading-relaxed">
          Связь позволяет выбирать значения из другого справочника. В базе данных будет
          храниться ID записи, а в интерфейсе отобразится выбранное поле.
        </p>
      </div>
    </div>
  );
}
