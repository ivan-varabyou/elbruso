"use client";

import { useTableStore } from "@frontend/stores";
import { AnimatePresence,motion } from "framer-motion";
import { Loader2, Table,X } from "lucide-react";
import { useState } from "react";

interface CreateTableModalProps {
  isOpen: boolean;
  onClose: () => void;
  workspaceId: string;
}

export function CreateTableModal({ isOpen, onClose, workspaceId }: CreateTableModalProps) {
  const { createTable, isLoading } = useTableStore();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [initialRows, setInitialRows] = useState(10);
  const [initialColumns, setInitialColumns] = useState(5);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Название обязательно");
      return;
    }

    try {
      await createTable(workspaceId, {
        name: name.trim(),
        description: description.trim() || undefined,
        initialRows,
        initialColumns,
      });
      onClose();
      resetForm();
    } catch (err: unknown) {
      const error = err as { message?: string };
      setError(error?.message || "Ошибка при создании");
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setInitialRows(10);
    setInitialColumns(5);
    setError(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-2xl border border-zinc-200"
          >
            <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white">
                  <Table className="h-4 w-4" />
                </div>
                <h2 className="text-[16px] font-bold text-zinc-900">Новая таблица</h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-1.5 hover:bg-zinc-100 transition-colors text-zinc-400 hover:text-zinc-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-5">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="name"
                    className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider"
                  >
                    Название
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Напр. Результаты матчей"
                    className="w-full rounded-lg border border-zinc-200 bg-white px-3.5 py-2 text-sm placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-4 focus:ring-zinc-900/[0.03] transition-all"
                  />
                  {error && <p className="text-[11px] text-red-500 font-medium">! {error}</p>}
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="description"
                    className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider"
                  >
                    Описание
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Описание таблицы..."
                    rows={3}
                    className="w-full rounded-lg border border-zinc-200 bg-white px-3.5 py-2 text-sm placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-4 focus:ring-zinc-900/[0.03] transition-all resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                      Строк
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={1000}
                      value={initialRows}
                      onChange={(e) => setInitialRows(Number(e.target.value))}
                      className="w-full rounded-lg border border-zinc-200 bg-white px-3.5 py-2 text-sm focus:border-zinc-900 focus:outline-none focus:ring-4 focus:ring-zinc-900/[0.03] transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                      Колонок
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={initialColumns}
                      onChange={(e) => setInitialColumns(Number(e.target.value))}
                      className="w-full rounded-lg border border-zinc-200 bg-white px-3.5 py-2 text-sm focus:border-zinc-900 focus:outline-none focus:ring-4 focus:ring-zinc-900/[0.03] transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl px-5 py-2 text-[14px] font-semibold text-zinc-600 hover:bg-zinc-100 transition-colors"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  disabled={isLoading || !name.trim()}
                  className="flex items-center gap-2 rounded-xl bg-zinc-900 px-7 py-2 text-[14px] font-bold text-white hover:bg-zinc-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Создать"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
