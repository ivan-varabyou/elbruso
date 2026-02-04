import { type RefObject,useEffect } from "react";

export function useKeyboardShortcuts(params: {
  onUndo?: () => void;
  onRedo?: () => void;
  onDelete?: () => void;
  gridRef?: RefObject<unknown>;
  tableId?: string;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault();
        if (e.shiftKey) {
          params.onRedo?.();
        } else {
          params.onUndo?.();
        }
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "y") {
        e.preventDefault();
        params.onRedo?.();
      }
      if (e.key === "Delete" || e.key === "Backspace") {
        params.onDelete?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [params.onUndo, params.onRedo, params.onDelete]);
}
