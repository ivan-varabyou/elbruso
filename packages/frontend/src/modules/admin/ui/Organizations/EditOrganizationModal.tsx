"use client";

import { Organization, useOrganizationsStore } from "@frontend/stores/useOrganizationsStore";
import { Modal } from "@frontend/ui/primitives";
import { Button } from "@heroui/react";
import { useEffect, useState } from "react";

interface EditOrganizationModalProps {
  isOpen: boolean;
  organization: Organization;
  onClose: () => void;
}

export function EditOrganizationModal({
  isOpen,
  organization,
  onClose,
}: EditOrganizationModalProps) {
  const {
    updateOrganization,
    types,
    levels,
    organizations,
    countries,
    regions,
    sports,
    fetchTypes,
    fetchLevels,
    fetchOrganizations,
    fetchCountries,
    fetchRegions,
    fetchSports,
  } = useOrganizationsStore();

  const [formData, setFormData] = useState({
    name_ru: organization.name_ru,
    abbreviation_ru: organization.abbreviation_ru || "",
    type_id: organization.type_id,
    level_id: organization.level_id,
    parent_id: organization.parent_id,
    sport_id: organization.sport_id,
    region_id: organization.region_id,
    country_id: organization.country_id,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchTypes();
      fetchLevels();
      fetchOrganizations();
      fetchCountries();
      fetchRegions();
      fetchSports();
    }
  }, [isOpen]);

  useEffect(() => {
    setFormData({
      name_ru: organization.name_ru,
      abbreviation_ru: organization.abbreviation_ru || "",
      type_id: organization.type_id,
      level_id: organization.level_id,
      parent_id: organization.parent_id,
      sport_id: organization.sport_id,
      region_id: organization.region_id,
      country_id: organization.country_id,
    });
  }, [organization]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await updateOrganization(organization.id, formData);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка при обновлении организации");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Редактировать организацию"
      size="lg"
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="flat" onClick={onClose}>
            Отмена
          </Button>
          <Button variant="solid" isLoading={loading} type="submit" form="edit-org-form">
            Сохранить
          </Button>
        </div>
      }
    >
      <form id="edit-org-form" onSubmit={handleSubmit} className="space-y-4">
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
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-zinc-700 mb-1">Аббревиатура</label>
            <input
              type="text"
              value={formData.abbreviation_ru}
              onChange={(e) => setFormData({ ...formData, abbreviation_ru: e.target.value })}
              className="w-full px-3 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
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
              onChange={(e) =>
                setFormData({
                  ...formData,
                  parent_id: e.target.value ? parseInt(e.target.value) : null,
                })
              }
              className="w-full px-3 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
            >
              <option value="">Нет (корневая)</option>
              {organizations
                .filter((org) => org.id !== organization.id)
                .map((org) => (
                  <option key={org.id} value={org.id}>
                    {org.name_ru}
                  </option>
                ))}
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-zinc-700 mb-1">Вид спорта</label>
            <select
              value={formData.sport_id || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  sport_id: e.target.value ? parseInt(e.target.value) : null,
                })
              }
              className="w-full px-3 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
            >
              <option value="">Не указан</option>
              {sports.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name_ru || s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Страна</label>
            <select
              value={formData.country_id || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  country_id: e.target.value ? parseInt(e.target.value) : null,
                })
              }
              className="w-full px-3 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
            >
              <option value="">Не указана</option>
              {countries.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name_ru || c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Регион</label>
            <select
              value={formData.region_id || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  region_id: e.target.value ? parseInt(e.target.value) : null,
                })
              }
              className="w-full px-3 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
            >
              <option value="">Не указан</option>
              {regions.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name_ru || r.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
    </Modal>
  );
}
