"use client";

import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@frontend/lib";
import { AnimatePresence, motion } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  position?: "center" | "top" | "bottom";
  closeOnOverlay?: boolean;
  closeOnEsc?: boolean;
  showClose?: boolean;
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  position = "center",
  closeOnOverlay = true,
  closeOnEsc = true,
  showClose = true,
  className,
}: ModalProps) {
  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && closeOnEsc) {
        onClose();
      }
    },
    [closeOnEsc, onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleEsc]);

  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-4xl",
  };

  const positions = {
    center: "items-center",
    top: "items-start pt-20",
    bottom: "items-end pb-20",
  };

  const modalContent = (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex justify-center w-full h-full",
        positions[position],
        className,
      )}
    >
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={closeOnOverlay ? onClose : undefined}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: position === "top" ? -20 : 0 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: position === "top" ? -20 : 0 }}
              transition={{ duration: 0.15 }}
              className={cn(
                "relative w-full bg-white rounded-xl shadow-2xl z-[110]",
                sizes[size],
                "mx-4",
              )}
            >
              {(title || showClose) && (
                <div className="flex items-center justify-between px-6 py-4 border-b">
                  {title && <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>}
                  {showClose && (
                    <button
                      onClick={onClose}
                      className="p-1 text-zinc-400 hover:text-zinc-600 rounded-lg hover:bg-zinc-100 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              )}
              <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">{children}</div>
              {footer && <div className="px-6 py-4 border-t bg-zinc-50 rounded-b-xl">{footer}</div>}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );

  return createPortal(modalContent, document.body);
}
