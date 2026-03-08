"use client";

import { Modal } from "@frontend/ui/primitives";
import { Button, Checkbox } from "@heroui/react";
import { useState } from "react";

interface InlineEditConfirmationModalProps {
  isOpen: boolean;
  oldValue: unknown;
  newValue: unknown;
  columnLabel: string;
  onConfirm: (skipNextTime: boolean) => void;
  onCancel: () => void;
}

export function InlineEditConfirmationModal({
  isOpen,
  oldValue,
  newValue,
  columnLabel,
  onConfirm,
  onCancel,
}: InlineEditConfirmationModalProps) {
  const [skipNextTime, setSkipNextTime] = useState(false);

  // Format values for display
  const formatValue = (val: unknown) => {
    if (val === null || val === undefined || val === "") return "пусто";
    if (typeof val === "boolean") return val ? "ДА" : "НЕТ";
    return String(val);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title="Подтверждение изменения"
      size="sm"
    >
      <div className="space-y-4 py-2">
        <div className="text-sm text-zinc-600 leading-relaxed">
          Вы действительно хотите изменить значение в колонке{" "}
          <span className="font-bold text-zinc-900">"{columnLabel}"</span>?
        </div>

        <div className="flex flex-col gap-2 p-3 bg-zinc-50 rounded-lg border border-zinc-100">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-zinc-400 w-16">Было:</span>
            <span className="font-mono text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
              {formatValue(oldValue)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-zinc-400 w-16">Стало:</span>
            <span className="font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
              {formatValue(newValue)}
            </span>
          </div>
        </div>

        <Checkbox
          size="sm"
          isSelected={skipNextTime}
          onValueChange={setSkipNextTime}
          classNames={{
            label: "text-xs text-zinc-500",
          }}
        >
          Больше не спрашивать (запомнить выбор)
        </Checkbox>

        <div className="flex items-center justify-end gap-2 pt-2">
          <Button
            size="sm"
            variant="light"
            onPress={onCancel}
            className="font-bold uppercase tracking-wider text-[10px]"
          >
            Отмена
          </Button>
          <Button
            size="sm"
            color="primary"
            onPress={() => onConfirm(skipNextTime)}
            className="font-bold uppercase tracking-wider text-[10px]"
          >
            Принять
          </Button>
        </div>
      </div>
    </Modal>
  );
}
