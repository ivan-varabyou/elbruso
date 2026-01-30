"use client";

import { useState, useEffect } from "react";
import { Search, Plus, Trash2, Edit2, Layers, MoreHorizontal, Trophy } from "lucide-react";
import { Button } from "@/shared/ui";
import { Reference } from "@/shared";
import { cn } from "@/shared/lib/utils";
import type { IndicatorGroup } from "@/shared";
import { IndicatorGroupModal } from "./IndicatorGroupModal";

export function IndicatorGroupsList() {
  const referenceApi = new Reference();
  const [groups, setGroups] = useState<IndicatorGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<IndicatorGroup | null>(null);

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const groupsResponse = (await referenceApi.indicatorsControllerGetGroups()) as any;
      setGroups(groupsResponse.data);
    } catch (error) {
      console.error("Failed to fetch groups:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleDelete = async (id: number) => {
    if (
      !confirm(
        "Вы уверены, что хотите удалить эту группу? Это не удалит индикаторы, но они перестанут быть к ней привязаны.",
      )
    )
      return;
    try {
      await referenceApi.indicatorsControllerDeleteGroup(id);
      setGroups((prev) => prev.filter((g) => g.id !== id));
    } catch (error) {
      console.error("Failed to delete group:", error);
    }
  };

  const filteredGroups = groups.filter(
    (g) =>
      g.name_ru.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.code.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-zinc-50/50 p-4 rounded-2xl border border-zinc-100">
        <div className="relative w-full sm:w-72 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            placeholder="Поиск по группам..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm group-hover:border-zinc-300"
          />
        </div>

        <Button
          variant="primary"
          className="h-10 gap-2 shadow-sm"
          onClick={() => {
            setEditingGroup(null);
            setIsModalOpen(true);
          }}
        >
          <Plus className="h-4 w-4" />
          Добавить группу индикаторов
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-32 bg-zinc-100 animate-pulse rounded-2xl border border-zinc-200"
            />
          ))
        ) : filteredGroups.length > 0 ? (
          filteredGroups.map((group) => (
            <div
              key={group.id}
              className="group bg-white p-5 rounded-2xl border border-zinc-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex items-start justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Layers className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-900 group-hover:text-blue-700 transition-colors">
                      {group.name_ru}
                    </h3>
                    <code className="text-[10px] font-mono text-zinc-400 uppercase tracking-tight">
                      {group.code}
                    </code>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => {
                      setEditingGroup(group);
                      setIsModalOpen(true);
                    }}
                    className="p-1.5 text-zinc-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(group.id)}
                    className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {group.description && (
                <p className="mt-3 text-sm text-zinc-500 line-clamp-2 leading-relaxed">
                  {group.description}
                </p>
              )}

              <div className="mt-4 pt-4 border-t border-zinc-50 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  {group.sport_id ? (
                    <span className="flex items-center gap-1 text-blue-500">
                      <Trophy className="h-3 w-3" />
                      Вид спорта
                    </span>
                  ) : (
                    <span>Глобальная</span>
                  )}
                </div>
                <span className="text-[10px] font-mono text-zinc-300">#{group.id}</span>
              </div>

              {/* Decorative background element */}
              <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                <Layers className="h-24 w-24" />
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-zinc-50/50 rounded-3xl border border-dashed border-zinc-200">
            <Layers className="h-12 w-12 text-zinc-300 mx-auto mb-3 opacity-20" />
            <h3 className="text-zinc-900 font-semibold">Группы не найдены</h3>
            <p className="text-sm text-zinc-500 mt-1">
              Создайте новую группу, чтобы начать классификацию
            </p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <IndicatorGroupModal
          group={editingGroup}
          onClose={() => {
            setIsModalOpen(false);
            setEditingGroup(null);
          }}
          onSuccess={() => {
            fetchGroups();
            setIsModalOpen(false);
            setEditingGroup(null);
          }}
        />
      )}
    </div>
  );
}
