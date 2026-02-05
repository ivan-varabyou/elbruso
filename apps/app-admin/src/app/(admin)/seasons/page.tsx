"use client";

import { AutogenerateModal, SeasonModal } from "@elbruso/modules/seasons/ui";
import { useReferenceStore } from "@elbruso/stores";
import type { Season } from "@elbruso/types";
import { PageLayout } from "@elbruso/ui";
import { Calendar, Edit2, Loader2, Plus, Sparkles, Trash2, Trophy } from "lucide-react";
import { useEffect, useState } from "react";

export default function SeasonsPage() {
  const { seasons, fetchSeasons, deleteSeason, isLoading } = useReferenceStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAutoModalOpen, setIsAutoModalOpen] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState<Season | undefined>(undefined);

  useEffect(() => {
    fetchSeasons();
  }, [fetchSeasons]);

  const handleCreate = () => {
    setSelectedSeason(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (season: Season) => {
    setSelectedSeason(season);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string | number) => {
    if (
      confirm(
        "Вы уверены, что хотите удалить этот сезон? Это может повлиять на привязанные рабочие области.",
      )
    ) {
      try {
        await deleteSeason(id.toString());
      } catch (error) {
        console.error("Failed to delete season:", error);
      }
    }
  };

  return (
    <PageLayout
      title="Сезоны"
      icon={Calendar}
      actions={
        <>
          <button
            onClick={() => setIsAutoModalOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-white border border-indigo-200 text-indigo-600 px-3 py-1.5 text-xs font-bold hover:bg-indigo-50 transition-all shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Автогенерация</span>
          </button>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-zinc-800 transition-all shadow-sm"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Добавить сезон</span>
          </button>
        </>
      }
    >
      <div className="space-y-2">
        <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200">
                <th className="px-5 py-3 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                  Название
                </th>
                <th className="px-5 py-3 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                  Период
                </th>
                <th className="px-5 py-3 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                  Вид спорта
                </th>
                <th className="px-5 py-3 text-[11px] font-bold text-zinc-500 uppercase tracking-wider text-right">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {isLoading && seasons.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-10 text-center">
                    <div className="flex flex-col items-center gap-2 text-zinc-400">
                      <Loader2 className="h-6 w-6 animate-spin" />
                      <span className="text-sm">Загрузка сезонов...</span>
                    </div>
                  </td>
                </tr>
              ) : seasons.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-10 text-center text-zinc-400 italic text-sm">
                    Сезоны не найдены. Создайте свой первый сезон.
                  </td>
                </tr>
              ) : (
                seasons.map((season) => (
                  <tr key={season.id} className="hover:bg-zinc-50/50 transition-colors group">
                    <td className="px-5 py-4">
                      <div className="text-sm font-bold text-zinc-900">{season.name_ru}</div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="text-sm text-zinc-600">
                        {new Date(season.start_date).toLocaleDateString("ru-RU")} —{" "}
                        {new Date(season.end_date).toLocaleDateString("ru-RU")}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {season.sports && season.sports.length > 0 ? (
                          season.sports.map((sport: { id: string | number; name_ru: string }) => (
                            <div
                              key={sport.id}
                              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-100 uppercase"
                            >
                              <Trophy className="h-2.5 w-2.5" />
                              {sport.name_ru}
                            </div>
                          ))
                        ) : (
                          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 text-[10px] font-bold border border-zinc-200 uppercase">
                            Глобальный
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <div className="flex justify-end gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(season)}
                          className="p-1.5 rounded-md hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 transition-colors"
                          title="Редактировать"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(season.id)}
                          className="p-1.5 rounded-md hover:bg-red-50 text-zinc-500 hover:text-red-600 transition-colors"
                          title="Удалить"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <SeasonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        season={selectedSeason}
      />

      <AutogenerateModal isOpen={isAutoModalOpen} onClose={() => setIsAutoModalOpen(false)} />
    </PageLayout>
  );
}
