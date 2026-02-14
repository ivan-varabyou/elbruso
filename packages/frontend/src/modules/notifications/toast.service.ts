"use client";

import { ToastType } from "./types";

type ToastListener = (type: ToastType, message: string, duration?: number) => void;

class ToastService {
  private listeners: ToastListener[] = [];

  subscribe(listener: ToastListener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private show(type: ToastType, message: string, duration?: number) {
    this.listeners.forEach((listener) => listener(type, message, duration));
  }

  success(message: string, duration?: number) {
    this.show("success", message, duration);
  }

  error(message: string, duration?: number) {
    this.show("error", message, duration);
  }

  info(message: string, duration?: number) {
    this.show("info", message, duration);
  }

  warning(message: string, duration?: number) {
    this.show("warning", message, duration);
  }
}

export const toastService = new ToastService();
