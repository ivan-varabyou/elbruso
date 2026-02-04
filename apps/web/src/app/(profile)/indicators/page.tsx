"use client";

import { Reference } from "@elbruso/api";
import { cn } from "@elbruso/lib";
import { useAuth } from "@elbruso/modules/auth";
import {
  CreateIndicatorModal,
  FilterDropdown,
  GenerateIndicatorsModal,
  IndicatorGroupsList,
} from "@elbruso/modules/profile/ui/indicators";
import type { Indicator } from "@elbruso/types";
import { Button, PageLayout } from "@elbruso/ui";
import {
  Activity,
  Building2,
  Edit2,
  Filter,
  Globe,
  MoreHorizontal,
  Plus,
  Search,
  Shield,
  Trash2,
  TrendingUp,
  Trophy,
  User,
  Users,
  Wand2,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function IndicatorsPage() {
  const { user } = useAuth();
  const referenceApi = new Reference();
  const [activeTab, setActiveTab] = useState<"indicators" | "groups">("indicators");
  const [indicators, setIndicators] = useState<Indicator[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedScopes, setSelectedScopes] = useState<string[]>([]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);

  const fetchIndicators = async () => {
    setLoading(true);
    try {
      const indicatorsResponse = await referenceApi.indicatorsControllerFindAll({
        search: searchQuery,
        scopes: selectedScopes.length > 0 ? selectedScopes : undefined,
      });
      setIndicators((indicatorsResponse as { data?: Indicator[] })?.data || []);
    } catch (error) {
      console.error("Failed to fetch indicators:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "indicators") {
      fetchIndicators();
    }
  }, [selectedScopes, searchQuery, activeTab]);

  const handleDelete = async (id: string | number) => {
    if (!confirm("Вы уверены, что хотите удалить этот индикатор?")) return;
    try {
      await referenceApi.indicatorsControllerDelete(typeof id === "string" ? Number(id) : id);
      setIndicators((prev) => prev.filter((i) => i.id !== id));
    } catch (error) {
      console.error("Failed to delete indicator:", error);
    }
  };

  const getScopeDisplay = (indicator: Indicator) => {
    if (indicator.organization_id) {
      return { label: "Организация", color: "bg-indigo-100 text-indigo-700", icon: Building2 };
    }
    if (indicator.sport_id) {
      return { label: "Вид спорта", color: "bg-blue-100 text-blue-700", icon: Trophy };
    }
    return { label: "Глобальный", color: "bg-gray-200 text-gray-700", icon: Globe };
  };

  const filterOptions = [
    { value: "global", label: "Глобальные", icon: Globe },
    { value: "sport", label: "По виду спорта", icon: Trophy },
    { value: "federation", label: "Федеративные", icon: Building2 },
  ];

  return (
    <PageLayout
      title="Индикаторы"
      icon={TrendingUp}
      description="Управление каталогом показателей и автоматическая генерация."
      actions={
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="h-9 gap-2 text-zinc-600 border-zinc-200 hover:bg-zinc-50"
            onClick={() => setShowGenerateModal(true)}
          >
            <Wand2 className="h-4 w-4" />
            Генерация
          </Button>
          <Button
            variant="primary"
            className="h-9 gap-2 shadow-sm"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus className="h-4 w-4" />
            Создать индикатор
          </Button>
        </div>
      }
    >
      <div className="space-y-6 mt-4">
        {/* Tabs */}
        <div className="flex items-center gap-1 p-1 bg-zinc-100/50 rounded-xl w-fit border border-zinc-200/50">
          <button
            onClick={() => setActiveTab("indicators")}
            className={cn(
              "px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300",
              activeTab === "indicators"
                ? "bg-white text-blue-600 shadow-sm border border-zinc-200/50"
                : "text-zinc-500 hover:text-zinc-700 hover:bg-zinc-200/30",
            )}
          >
            Список
          </button>
          <button
            onClick={() => setActiveTab("groups")}
            className={cn(
              "px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300",
              activeTab === "groups"
                ? "bg-white text-blue-600 shadow-sm border border-zinc-200/50"
                : "text-zinc-500 hover:text-zinc-700 hover:bg-zinc-200/30",
            )}
          >
            Группы индикаторов
          </button>
        </div>

        {activeTab === "indicators" ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Marketplace-style Filters */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-zinc-50/50 p-4 rounded-2xl border border-zinc-100">
              <div className="flex flex-wrap items-center gap-3">
                <FilterDropdown
                  label="Тип доступа"
                  icon={Filter}
                  options={filterOptions}
                  selected={selectedScopes}
                  onChange={setSelectedScopes}
                />

                {selectedScopes.length > 0 && (
                  <button
                    onClick={() => setSelectedScopes([])}
                    className="text-xs text-zinc-400 hover:text-zinc-600 underline underline-offset-4 px-2"
                  >
                    Сбросить
                  </button>
                )}
              </div>

              <div className="relative w-full sm:w-72 group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Поиск по названию или коду..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm group-hover:border-zinc-300"
                />
              </div>
            </div>

            {/* Indicators Table */}
            <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-zinc-50/30 border-b border-zinc-100">
                    <th className="px-6 py-4 font-semibold text-zinc-500 uppercase tracking-wider text-[10px]">
                      Индикатор
                    </th>
                    <th className="px-6 py-4 font-semibold text-zinc-500 uppercase tracking-wider text-[10px]">
                      Статус / Область
                    </th>
                    <th className="px-6 py-4 font-semibold text-zinc-500 uppercase tracking-wider text-[10px] text-center">
                      Вес
                    </th>
                    <th className="px-6 py-4 font-semibold text-zinc-500 uppercase tracking-wider text-[10px] text-right">
                      Управление
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {loading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td className="px-6 py-5">
                          <div className="h-5 bg-zinc-100 rounded-lg w-2/3"></div>
                          <div className="h-3 bg-zinc-50 rounded mt-2 w-1/4"></div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="h-6 bg-zinc-100 rounded-full w-24"></div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="h-5 bg-zinc-100 rounded-lg w-8 mx-auto"></div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="h-8 bg-zinc-100 rounded-lg w-20 ml-auto"></div>
                        </td>
                      </tr>
                    ))
                  ) : indicators.length > 0 ? (
                    indicators.map((indicator) => {
                      const scope = getScopeDisplay(indicator);
                      const ScopeIcon = scope.icon;
                      const canDelete = !indicator.is_system || user?.id === indicator.created_by;

                      return (
                        <tr
                          key={indicator.id}
                          className="hover:bg-blue-50/30 transition-colors group/row"
                        >
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="font-medium text-zinc-900 group-hover/row:text-blue-700 transition-colors">
                                {indicator.name_ru}
                              </span>
                              <code className="text-[10px] text-zinc-400 font-mono mt-1 px-1.5 py-0.5 bg-zinc-50 rounded-md w-fit group-hover/row:bg-blue-100/50 group-hover/row:text-blue-500 transition-colors">
                                {indicator.code}
                              </code>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap items-center gap-2">
                              <div
                                className={cn(
                                  "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold",
                                  scope.color,
                                )}
                              >
                                <ScopeIcon className="h-3 w-3" />
                                {scope.label}
                              </div>

                              {indicator.gender_name && (
                                <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-pink-50 text-pink-700 rounded-md border border-pink-100 text-[10px] font-medium transition-transform hover:scale-105 select-none">
                                  <User className="h-2.5 w-2.5" />
                                  {indicator.gender_name}
                                </div>
                              )}

                              {indicator.age_group_name && (
                                <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-md border border-emerald-100 text-[10px] font-medium transition-transform hover:scale-105 select-none">
                                  <Users className="h-2.5 w-2.5" />
                                  {indicator.age_group_name}
                                </div>
                              )}

                              {indicator.discipline_name && (
                                <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-700 rounded-md border border-amber-100 text-[10px] font-medium transition-transform hover:scale-105 select-none">
                                  <Activity className="h-2.5 w-2.5" />
                                  {indicator.discipline_name}
                                </div>
                              )}

                              {indicator.is_system && (
                                <div className="p-1 px-1.5 bg-orange-50 text-orange-600 rounded-md border border-orange-100 text-[9px] font-bold uppercase tracking-tight flex items-center gap-1">
                                  <Shield className="h-2.5 w-2.5" />
                                  Система
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="inline-flex h-7 w-9 items-center justify-center bg-zinc-100 text-zinc-700 rounded-lg text-xs font-bold border border-zinc-200/50">
                              {indicator.weight || "1.0"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover/row:opacity-100 transition-all transform translate-x-2 group-hover/row:translate-x-0">
                              <button className="p-2 text-zinc-400 hover:text-blue-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-blue-100 rounded-xl transition-all">
                                <Edit2 className="h-4 w-4" />
                              </button>
                              {canDelete && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(indicator.id);
                                  }}
                                  className="p-2 text-zinc-400 hover:text-red-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-red-100 rounded-xl transition-all"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              )}
                              <button className="p-2 text-zinc-400 hover:text-zinc-600 border border-transparent rounded-xl transition-all">
                                <MoreHorizontal className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-20 text-center">
                        <div className="flex flex-col items-center gap-3 text-zinc-400">
                          <div className="h-16 w-16 bg-zinc-50 rounded-full flex items-center justify-center border border-dashed border-zinc-200 mb-2">
                            <TrendingUp className="h-8 w-8 opacity-20" />
                          </div>
                          <p className="text-zinc-500 font-medium">Индикаторы не найдены</p>
                          <p className="text-xs max-w-[200px]">
                            Попробуйте изменить фильтры или поисковый запрос
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-4"
                            onClick={() => {
                              setSelectedScopes([]);
                              setSearchQuery("");
                            }}
                          >
                            Сбросить фильтры
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <IndicatorGroupsList />
          </div>
        )}
      </div>

      {showCreateModal && (
        <CreateIndicatorModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={(newIndicator: Indicator) => {
            setIndicators((prev) => [newIndicator, ...prev]);
            fetchIndicators();
          }}
        />
      )}

      {showGenerateModal && (
        <GenerateIndicatorsModal
          onClose={() => setShowGenerateModal(false)}
          onSuccess={() => fetchIndicators()}
        />
      )}
    </PageLayout>
  );
}
