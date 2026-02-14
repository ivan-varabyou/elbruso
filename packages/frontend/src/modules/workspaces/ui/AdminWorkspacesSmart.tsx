"use client";

import { useReferenceStore } from "@frontend/stores/useReference.store";
import { useWorkspaceTemplateStore } from "@frontend/stores/useWorkspaceTemplate.store";
import { FileText, Loader2, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import { CreateTemplateModal } from "../../admin/ui/AdminTemplateTree/CreateTemplateModal.smart";

export function AdminWorkspacesSmart() {
  const { templates, fetchAdminTemplates, isLoading, deleteTemplate } = useWorkspaceTemplateStore();
  const { organizations, sports, countries, fetchOrganizations, fetchSports, fetchCountries } = useReferenceStore();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    organization_id: "",
    sport_id: "",
    country_id: "",
  });

  useEffect(() => {
    fetchAdminTemplates();
    fetchOrganizations();
    fetchSports();
    fetchCountries();
  }, [fetchAdminTemplates, fetchOrganizations, fetchSports, fetchCountries]);

  const filteredTemplates = Array.isArray(templates)
    ? templates.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()))
    : [];

  const handleDelete = async (id: string) => {
    if (window.confirm("Вы уверены, что хотите удалить этот шаблон?")) {
      await deleteTemplate(id);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Шаблоны рабочих областей</h1>
          <p className="text-zinc-500 text-sm">
            Управление системными шаблонами для новых пользователей
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-lg font-semibold hover:bg-zinc-800 transition-all"
        >
          <Plus className="h-4 w-4" />
          Создать шаблон
        </button>
      </div>

      {/* Filters bar */}
      <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-xl border border-zinc-200">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Поиск по названию..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all"
          />
        </div>

        <select
          value={filters.organization_id}
          onChange={(e) => setFilters((prev) => ({ ...prev, organization_id: e.target.value }))}
          className="flex-1 max-w-[200px] bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
        >
          <option value="">Все организации</option>
          {Array.isArray(organizations) &&
            organizations.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name_ru}
              </option>
            ))}
        </select>

        <select
          value={filters.sport_id}
          onChange={(e) => setFilters((prev) => ({ ...prev, sport_id: e.target.value }))}
          className="bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
        >
          <option value="">Все виды спорта</option>
          {Array.isArray(sports) &&
            sports.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name_ru}
              </option>
            ))}
        </select>

        <select
          value={filters.country_id}
          onChange={(e) => setFilters((prev) => ({ ...prev, country_id: e.target.value }))}
          className="bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
        >
          <option value="">Все страны</option>
          {Array.isArray(countries) &&
            countries.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name_ru}
              </option>
            ))}
        </select>
      </div>

      {/* Templates List */}
      <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex flex-col items-center justify-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
            <p className="text-sm text-zinc-500">Загрузка шаблонов...</p>
          </div>
        ) : filteredTemplates.length === 0 ? (
          <div className="p-12 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-zinc-50 text-zinc-400 mb-4">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="text-zinc-900 font-semibold">Шаблоны не найдены</h3>
            <p className="text-zinc-500 text-sm">
              Попробуйте изменить параметры поиска или создайте новый шаблон
            </p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200">
                <th className="px-6 py-3 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                  Название
                </th>
                <th className="px-6 py-3 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                  Организация
                </th>
                <th className="px-6 py-3 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                  Вид спорта
                </th>
                <th className="px-6 py-3 text-[11px] font-bold text-zinc-400 uppercase tracking-wider text-right">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredTemplates.map((template) => (
                <tr key={template.id} className="hover:bg-zinc-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-500">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-zinc-900">{template.name}</div>
                        {template.description && (
                          <div className="text-xs text-zinc-500 line-clamp-1">
                            {template.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-600">
                    {Array.isArray(organizations)
                      ? organizations.find((o) => Number(o.id) === template.organization_id)
                          ?.name_ru || "—"
                      : "—"}
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-600">
                    {Array.isArray(sports)
                      ? sports.find((s) => Number(s.id) === template.sport_id)?.name_ru || "—"
                      : "—"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleDelete(template.id)}
                        className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Удалить"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <CreateTemplateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
