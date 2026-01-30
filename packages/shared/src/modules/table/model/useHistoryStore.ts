import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export interface HistoryEntry {
  action:
    | "cell_update"
    | "row_insert"
    | "column_insert"
    | "row_delete"
    | "column_delete"
    | "batch_update";
  data: unknown;
  timestamp: Date;
  tableId: string;
}

interface HistoryStore {
  past: HistoryEntry[];
  future: HistoryEntry[];
  maxHistory: number;

  addEntry: (entry: HistoryEntry) => void;
  undo: () => HistoryEntry | null;
  redo: () => HistoryEntry | null;
  canUndo: () => boolean;
  canRedo: () => boolean;
  clear: () => void;
  clearTable: (tableId: string) => void;
  setMaxHistory: (max: number) => void;
}

export const useHistoryStore = create<HistoryStore>()(
  subscribeWithSelector((set, get) => ({
    past: [],
    future: [],
    maxHistory: 50,

    addEntry: (entry) => {
      set((state) => {
        const newPast = [...state.past, entry];
        if (newPast.length > state.maxHistory) {
          newPast.shift();
        }
        return {
          past: newPast,
          future: [],
        };
      });
    },

    undo: () => {
      const { past, future } = get();
      if (past.length === 0) return null;

      const entry = past[past.length - 1];

      set({
        past: past.slice(0, -1),
        future: [entry, ...future],
      });

      return entry;
    },

    redo: () => {
      const { past, future } = get();
      if (future.length === 0) return null;

      const entry = future[0];

      set({
        past: [...past, entry],
        future: future.slice(1),
      });

      return entry;
    },

    canUndo: () => get().past.length > 0,
    canRedo: () => get().future.length > 0,

    clear: () => set({ past: [], future: [] }),

    clearTable: (tableId) => {
      set((state) => ({
        past: state.past.filter((e) => e.tableId !== tableId),
        future: state.future.filter((e) => e.tableId !== tableId),
      }));
    },

    setMaxHistory: (maxHistory) => set({ maxHistory }),
  })),
);
