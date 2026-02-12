"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Building2, ChevronDown, Globe, Layout, Loader2, Trophy, X } from "lucide-react";
import { useEffect, useState } from "react";

import { useReferenceStore } from "@frontend/stores/useReference.store";
import { useWorkspaceTemplateStore } from "@frontend/stores/useWorkspaceTemplate.store";
import type { Country, Organization, Sport } from "@frontend/types/reference.types";

interface CreateTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateTemplateModal({ isOpen, onClose }: CreateTemplateModalProps) {
  const { createTemplate, isLoading: isCreating } = useWorkspaceTemplateStore();
  const { 
    organizations, fetchOrganizations, 
    sports, fetchSports, 
    countries, fetchCountries,
    isLoading: isRefsLoading 
  } = useReferenceStore();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [organizationId, setOrganizationId] = useState<string>("");
  const [sportId, setSportId] = useState<string>("");
  const [countryId, setCountryId] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchOrganizations();
      fetchSports();
      fetchCountries();
    }
  }, [isOpen, fetchOrganizations, fetchSports, fetchCountries]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Название обязательно");
      return;
    }

    try {
      await createTemplate({
        name,
        description,
        organization_id: organizationId ? parseInt(organizationId) : undefined,
        sport_id: sportId ? parseInt(sportId) : undefined,
        country_id: countryId ? parseInt(countryId) : undefined,
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
    setOrganizationId("");
    setSportId("");
    setCountryId("");
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
                <h2 className="text-[16px] font-bold text-zinc-900">
                  Новый шаблон рабочей области
                </h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-1.5 hover:bg-zinc-100 transition-colors text-zinc-400 hover:text-zinc-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="space-y-4 max-h-[60vh] overflow-y-auto px-1">
                {/* Basic Info */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                    Название шаблона
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Напр. Шаблон аналитики"
                    className="w-full rounded-lg border border-zinc-200 bg-white px-3.5 py-2 text-sm focus:border-zinc-900 focus:outline-none focus:ring-4 focus:ring-zinc-900/[0.03] transition-all"
                  />
                  {error && <p className="text-[11px] text-red-500 font-medium">! {error}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                    Описание
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Описание предназначения шаблона..."
                    className="w-full rounded-lg border border-zinc-200 bg-white px-3.5 py-2 text-sm focus:border-zinc-900 focus:outline-none focus:ring-4 focus:ring-zinc-900/[0.03] transition-all min-h-[80px]"
                  />
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                      Организация
                    </label>
                    <div className="relative">
                      <select
                        value={organizationId}
                        onChange={(e) => setOrganizationId(e.target.value)}
                        className="w-full appearance-none rounded-lg border border-zinc-200 bg-white pl-9 pr-8 py-2 text-sm focus:border-zinc-900"
                      >
                        <option value="">Все организации</option>
                        {organizations.map((o: Organization) => (
                          <option key={o.id} value={o.id}>{o.name_ru}</option>
                        ))}
                      </select>
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                      Вид спорта
                    </label>
                    <div className="relative">
                      <select
                        value={sportId}
                        onChange={(e) => setSportId(e.target.value)}
                        className="w-full appearance-none rounded-lg border border-zinc-200 bg-white pl-9 pr-8 py-2 text-sm focus:border-zinc-900"
                      >
                        <option value="">Все виды спорта</option>
                        {sports.map((s: Sport) => (
                          <option key={s.id} value={s.id}>{s.name_ru}</option>
                        ))}
                      </select>
                      <Trophy className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                      Страна
                    </label>
                    <div className="relative">
                      <select
                        value={countryId}
                        onChange={(e) => setCountryId(e.target.value)}
                        className="w-full appearance-none rounded-lg border border-zinc-200 bg-white pl-9 pr-8 py-2 text-sm focus:border-zinc-900"
                      >
                        <option value="">Все страны</option>
                        {countries.map((c: Country) => (
                          <option key={c.id} value={c.id}>
                            {c.flag} {c.name}
                          </option>
                        ))}
                      </select>
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
                    </div>
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
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Создать шаблон"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
