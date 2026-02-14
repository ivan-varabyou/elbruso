"use client";

import { Modal } from "../Modal/Modal";
import { Button } from "../Button/Button.dumb";
import { cn } from "@frontend/lib";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
  loading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Подтверждение",
  message,
  confirmText = "Подтвердить",
  cancelText = "Отмена",
  variant = "info",
  loading = false,
}: ConfirmDialogProps) {
  const variantStyles = {
    danger: "text-red-600 hover:bg-red-50",
    warning: "text-orange-600 hover:bg-orange-50",
    info: "text-blue-600 hover:bg-blue-50",
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" showClose={false}>
      <div className="text-center">
        {title && <h3 className="text-lg font-semibold text-zinc-900 mb-2">{title}</h3>}
        {message && <p className="text-sm text-zinc-600">{message}</p>}
        <div className="flex items-center justify-center gap-3 mt-6">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            {cancelText}
          </Button>
          <Button
            variant="primary"
            onClick={onConfirm}
            loading={loading}
            className={cn(variantStyles[variant])}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
