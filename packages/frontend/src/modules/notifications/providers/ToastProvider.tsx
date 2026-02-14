"use client";

import React, { createContext, ReactNode, useCallback, useState } from "react";

import { toastService } from "../toast.service";
import type { Toast, ToastContextValue, ToastType } from "../types";

export const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (type: ToastType, message: string, duration = 5000) => {
      const id = Math.random().toString(36).substring(7);
      const toast: Toast = { id, type, message, duration };

      setToasts((prev) => [...prev, toast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast],
  );

  React.useEffect(() => {
    return toastService.subscribe((type, message, duration) => {
      showToast(type, message, duration);
    });
  }, [showToast]);

  const value: ToastContextValue = { toasts, showToast, removeToast };

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}
