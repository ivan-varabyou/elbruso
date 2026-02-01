"use client";

import { useReferenceStore } from "@elbruso/stores";
import type { Season } from "@elbruso/types/reference.types";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Trophy, X } from "lucide-react";
import { useEffect, useState } from "react";

interface SeasonModalProps {
  isOpen: boolean;
  onClose: () => void;
  season?: Season; // If provided, edit mode
}

export function SeasonModal({ isOpen, onClose, season }: SeasonModalProps) {
  const { createSeason, updateSeason, sports, fetchSports, isLoading } = useReferenceStore();

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sportId, setSportId] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchSports();
      if (season) {
        setName(season.name_ru);
        setStartDate(season.start_date.split("T")[0]);
        setEndDate(season.end_date.split("T")[0]);
        setSportId(season.sports?.[0]?.id ? String(season.sports[0].id) : "");
      } else {
        setName("");
        setStartDate("");
        setEndDate("");
        setSportId("");
      }
      setError(null);
    }
  }, [isOpen, season, fetchSports]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !startDate || !endDate) {
      setError("Все основные поля обязательны");
      return;
    }

    try {
      const data = {
        name,
        start_date: new Date(startDate).toISOString(),
        end_date: new Date(endDate).toISOString(),
        sport_id: sportId || undefined,
      };

      if (season) {
        await updateSeason(String(season.id), data);
      } else {
        await createSeason(data);
      }
      onClose();
    } catch (err: unknown) {
      const error = err as { message?: string };
      setError(error?.message || "Ошибка при сохранении");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl border border-zinc-200"
          >
            <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4">
              <h2 className="text-[16px] font-bold text-zinc-900">
                {season ? "Редактировать сезон" : "Новый сезон"}
              </h2>
              <button
                onClick={onClose}
                className="rounded-full p-1.5 hover:bg-zinc-100 transition-colors text-zinc-400"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                  Название
                </label>
                <input
                  type="text"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Напр. 2024/25"
                  className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:border-zinc-900 focus:outline-none focus:ring-4 focus:ring-zinc-900/[0.03] transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                    Дата начала
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:border-zinc-900 focus:outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                    Дата окончания
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:border-zinc-900 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                  Вид спорта (необязательно)
                </label>
                <div className="relative">
                  <select
                    value={sportId}
                    onChange={(e) => setSportId(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-zinc-200 bg-white pl-9 pr-4 py-2 text-sm focus:border-zinc-900 focus:outline-none transition-all"
                  >
                    <option value="">Глобальный (все виды)</option>
                    {sports.map((s: { id: string | number; name_ru: string }) => (
                      <option key={s.id} value={s.id}>
                        {s.name_ru}
                      </option>
                    ))}
                  </select>
                  <Trophy className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                </div>
              </div>

              {error && <p className="text-[11px] text-red-500 font-medium">{error}</p>}

              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-zinc-600 hover:bg-zinc-100 transition-colors"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center gap-2 rounded-lg bg-zinc-900 px-6 py-2 text-sm font-bold text-white hover:bg-zinc-800 transition-all disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Сохранить"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
