"use client";

import {
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@heroui/react";
import { useEffect, useState } from "react";

import type { ReferenceColumnMeta } from "./types";

interface ReferenceFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Record<string, unknown>) => void;
  columns: ReferenceColumnMeta[];
  initialData?: Record<string, unknown> | null;
  tableLabel: string;
  relatedData?: Record<string, Record<string, unknown>[]>;
}

export function ReferenceFormModal({
  isOpen,
  onClose,
  onSave,
  columns,
  initialData,
  tableLabel,
  relatedData = {},
}: ReferenceFormModalProps) {
  const [formData, setFormData] = useState<Record<string, unknown>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
    } else {
      // initialize defaults
      const defaults: Record<string, unknown> = {};
      for (const col of columns) {
        if (col.editable) {
          if (col.type === "boolean") defaults[col.key] = true;
          else if (col.type === "number") defaults[col.key] = undefined;
          else defaults[col.key] = "";
        }
      }
      setFormData(defaults);
    }
  }, [initialData, columns]);

  const editableColumns = columns.filter((c) => c.editable);

  const handleSubmit = () => {
    // Build clean payload with only editable fields
    const payload: Record<string, unknown> = {};
    for (const col of editableColumns) {
      const val = formData[col.key];
      if (val !== undefined && val !== "") {
        if (col.type === "number") {
          payload[col.key] = Number(val);
        } else {
          payload[col.key] = val;
        }
      }
    }
    onSave(payload);
  };

  const isEditing = !!initialData;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalContent>
        <ModalHeader className="text-base font-semibold">
          {isEditing ? `Редактировать — ${tableLabel}` : `Создать — ${tableLabel}`}
        </ModalHeader>
        <ModalBody>
          <div className="space-y-3">
            {editableColumns.map((col) => {
              if (col.type === "boolean") {
                return (
                  <Checkbox
                    key={col.key}
                    isSelected={!!formData[col.key]}
                    onValueChange={(checked) =>
                      setFormData((prev) => ({ ...prev, [col.key]: checked }))
                    }
                  >
                    {col.label}
                  </Checkbox>
                );
              }

              if (col.relation) {
                const relItems = relatedData[col.relation.table] || [];
                return (
                  <Select
                    key={col.key}
                    label={col.label}
                    placeholder={`Выберите ${col.label.toLowerCase()}`}
                    selectedKeys={
                      formData[col.key] !== undefined ? [String(formData[col.key])] : []
                    }
                    onSelectionChange={(keys) => {
                      const selected = Array.from(keys)[0];
                      setFormData((prev) => ({
                        ...prev,
                        [col.key]: selected ? Number(selected) : undefined,
                      }));
                    }}
                    variant="bordered"
                    size="sm"
                    isRequired={col.required}
                  >
                    {relItems.map((item) => (
                      <SelectItem
                        key={String(item.id)}
                        textValue={String(item[col.relation!.labelField])}
                      >
                        {String(item[col.relation!.labelField])}
                      </SelectItem>
                    ))}
                  </Select>
                );
              }

              if (col.format === "enum" && col.options) {
                return (
                  <Select
                    key={col.key}
                    label={col.label}
                    placeholder={`Выберите ${col.label.toLowerCase()}`}
                    selectedKeys={
                      formData[col.key] !== undefined ? [String(formData[col.key])] : []
                    }
                    onSelectionChange={(keys) => {
                      const selected = Array.from(keys)[0];
                      setFormData((prev) => ({ ...prev, [col.key]: selected }));
                    }}
                    variant="bordered"
                    size="sm"
                    isRequired={col.required}
                  >
                    {Object.entries(col.options).map(([val, label]) => (
                      <SelectItem key={val} textValue={label}>
                        {label}
                      </SelectItem>
                    ))}
                  </Select>
                );
              }

              return (
                <Input
                  key={col.key}
                  label={col.label}
                  type={
                    col.format === "date" || col.type === "date"
                      ? "date"
                      : col.type === "number"
                        ? "number"
                        : "text"
                  }
                  value={
                    formData[col.key] !== undefined && formData[col.key] !== null
                      ? String(formData[col.key]).split("T")[0] // Trim time for date input
                      : ""
                  }
                  isRequired={col.required}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      [col.key]: col.type === "number" && value ? Number(value) : value,
                    }));
                  }}
                  variant="bordered"
                  size="sm"
                />
              );
            })}
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            Отмена
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors"
          >
            {isEditing ? "Сохранить" : "Создать"}
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
