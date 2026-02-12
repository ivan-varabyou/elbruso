"use client";

import { Alert } from "@heroui/react";
import { useToast } from "../hooks";
import type { Toast as ToastType } from "../types";

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 max-w-md pointer-events-auto">
      {toasts.map((toast) => (
        <Alert
          key={toast.id}
          color={
            toast.type === "error" ? "danger" : toast.type === "success" ? "success" : "primary"
          }
        >
          {toast.message}
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-2 text-zinc-500 hover:text-zinc-700"
            aria-label="Close"
          >
            ✕
          </button>
        </Alert>
      ))}
    </div>
  );
}
