"use client";

import { useReferenceStore } from "@frontend/stores";
import { AnimatePresence,motion } from "framer-motion";
import { Calendar,Loader2, Sparkles, Trophy, X } from "lucide-react";
import { useEffect,useState } from "react";

interface AutogenerateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AutogenerateModal({ isOpen, onClose }: AutogenerateModalProps) {
  const { generateSeasons, sports, fetchSports, isLoading } = useReferenceStore();

  const [startYear, setStartYear] = useState(new Date().getFullYear());
  const [endYear, setEndYear] = useState(new Date().getFullYear() + 5);
  const [sportId, setSportId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchSports();
      setSuccess(false);
      setError(null);
    }
  }, [isOpen, fetchSports]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (startYear > endYear) {
      setError("Год начала не может быть больше года окончания");
      return;
    }

    try {
      await generateSeasons({
        startYear,
        endYear,
        sportId: sportId || null,
      });
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err: unknown) {
      const error = err as { message?: string };
      setError(error?.message || "Ошибка при генерации");
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
            <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4 bg-zinc-50/50">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-lg shadow-indigo-200">
                  <Sparkles className="h-4 w-4" />
                </div>
                <h2 className="text-[16px] font-bold text-zinc-900">Автогенерация сезонов</h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-1.5 hover:bg-zinc-100 transition-colors text-zinc-400"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {success ? (
              <div className="p-10 flex flex-col items-center justify-center text-center gap-4">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zinc-900">Готово!</h3>
                  <p className="text-sm text-zinc-500">
                    Сезоны успешно сгенерированы без дубликатов
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-5 space-y-4">
                <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                  <p className="text-[11px] text-blue-700 leading-relaxed">
                    Система автоматически определит тип сезона (календарный или перекрестный) для
                    каждого вида спорта и создаст недостающие записи. Существующие сезоны не будут
                    перезаписаны.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                      С какого года
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={startYear}
                        onChange={(e) => setStartYear(parseInt(e.target.value))}
                        className="w-full rounded-lg border border-zinc-200 bg-white pl-9 pr-3 py-2 text-sm focus:border-zinc-900 focus:outline-none transition-all"
                      />
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                      По какой год
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={endYear}
                        onChange={(e) => setEndYear(parseInt(e.target.value))}
                        className="w-full rounded-lg border border-zinc-200 bg-white pl-9 pr-3 py-2 text-sm focus:border-zinc-900 focus:outline-none transition-all"
                      />
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                    Вид спорта
                  </label>
                  <div className="relative">
                    <select
                      value={sportId || ""}
                      onChange={(e) => setSportId(e.target.value || null)}
                      className="w-full appearance-none rounded-lg border border-zinc-200 bg-white pl-9 pr-4 py-2 text-sm focus:border-zinc-900 focus:outline-none transition-all"
                    >
                      <option value="">Все виды спорта (массово)</option>
                      {sports.map((s: { id: string; name_ru: string }) => (
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
                    className="flex items-center gap-2 rounded-lg bg-zinc-900 px-6 py-2 text-sm font-bold text-white hover:bg-zinc-800 transition-all shadow-lg shadow-zinc-200 disabled:opacity-50"
                  >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Запустить"}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
