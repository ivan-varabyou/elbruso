"use client";

import { useOrganizationsStore } from "@frontend/stores/useOrganizationsStore";
import { X } from "lucide-react";
import { useEffect,useState } from "react";

interface CreateOrganizationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateOrganizationModal({ isOpen, onClose }: CreateOrganizationModalProps) {
  const { 
    createOrganization, 
    types, 
    levels, 
    organizations,
    fetchTypes, 
    fetchLevels, 
    fetchOrganizations 
  } = useOrganizationsStore();

  const [formData, setFormData] = useState({
    name_ru: '',
    abbreviation_ru: '',
    type_id: 0,
    level_id: 0,
    parent_id: null as number | null,
    sport_id: null as number | null,
    region_id: null as number | null,
    country_id: null as number | null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchTypes();
      fetchLevels();
      fetchOrganizations();
    }
  }, [isOpen, fetchTypes, fetchLevels, fetchOrganizations]);

  // Set default values when types/levels are loaded
  useEffect(() => {
    if (types.length > 0 && formData.type_id === 0) {
      setFormData(prev => ({ ...prev, type_id: types[0].id }));
    }
    if (levels.length > 0 && formData.level_id === 0) {
      setFormData(prev => ({ ...prev, level_id: levels[0].id }));
    }
  }, [types, levels, formData.type_id, formData.level_id]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createOrganization(formData);
      onClose();
      setFormData({
        name_ru: '',
        abbreviation_ru: '',
        type_id: types[0]?.id || 0,
        level_id: levels[0]?.id || 0,
        parent_id: null,
        sport_id: null,
        region_id: null,
        country_id: null,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при создании организации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200">
          <h2 className="text-lg font-semibold text-zinc-900">Создать организацию</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-zinc-100 rounded transition-colors"
          >
            <X className="h-5 w-5 text-zinc-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Название <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name_ru}
                onChange={(e) => setFormData({ ...formData, name_ru: e.target.value })}
                className="w-full px-3 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
                placeholder="Введите название организации"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Аббревиатура
              </label>
              <input
                type="text"
                value={formData.abbreviation_ru || ''}
                onChange={(e) => setFormData({ ...formData, abbreviation_ru: e.target.value })}
                className="w-full px-3 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
                placeholder="Введите аббревиатуру"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Тип <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.type_id}
                onChange={(e) => setFormData({ ...formData, type_id: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
              >
                {types.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name_ru}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Уровень <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.level_id}
                onChange={(e) => setFormData({ ...formData, level_id: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
              >
                {levels.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name_ru}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Вышестоящая организация
              </label>
              <select
                value={formData.parent_id || ""}
                onChange={(e) => setFormData({ ...formData, parent_id: e.target.value ? parseInt(e.target.value) : null })}
                className="w-full px-3 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
              >
                <option value="">Нет (корневая)</option>
                {organizations.map((org) => (
                  <option key={org.id} value={org.id}>
                    {org.name_ru}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 rounded transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm bg-zinc-900 text-white rounded hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Создание...' : 'Создать'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
