"use client";

import { useReferenceStore, useUserStore, useWorkspaceStore } from "@frontend/stores";
import type { Season } from "@frontend/types/reference.types";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, ChevronDown, Layout, Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";

interface CreateWorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateWorkspaceModal({ isOpen, onClose }: CreateWorkspaceModalProps) {
  const { createWorkspace, isLoading: isCreating } = useWorkspaceStore();
  const { user } = useUserStore();
  const { seasons, fetchSeasons, isLoading: isRefsLoading } = useReferenceStore();

  const [name, setName] = useState("");
  const [seasonId, setSeasonId] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchSeasons();
    }
  }, [isOpen, fetchSeasons]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Название обязательно");
      return;
    }

    try {
      await createWorkspace({
        name,
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
    setSeasonId("");
    setError(null);
  };

  const isLoading = isCreating || isRefsLoading;

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
                  <Layout className="h-4 w-4" />
                </div>
                <h2 className="text-[16px] font-bold text-zinc-900">Новая рабочая область</h2>
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
                    placeholder="Напр. Аналитика сезона 2024/25"
                    className="w-full rounded-lg border border-zinc-200 bg-white px-3.5 py-2 text-sm placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-4 focus:ring-zinc-900/[0.03] transition-all"
                  />
                  {error && <p className="text-[11px] text-red-500 font-medium">! {error}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                    Сезон / Год
                  </label>
                  <div className="relative">
                    <select
                      value={seasonId}
                      onChange={(e) => setSeasonId(e.target.value)}
                      className="w-full appearance-none rounded-lg border border-zinc-200 bg-white pl-9 pr-8 py-2 text-sm focus:border-zinc-900 focus:outline-none focus:ring-4 focus:ring-zinc-900/[0.03] transition-all"
                    >
                      <option value="">Выберите сезон...</option>
                      {seasons.map((s: Season) => (
                        <option key={s.id} value={s.id}>
                          {s.name_ru}
                        </option>
                      ))}
                    </select>
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400 pointer-events-none" />
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
