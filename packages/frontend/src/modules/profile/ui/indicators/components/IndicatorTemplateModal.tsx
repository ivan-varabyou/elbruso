"use client";

import { Reference } from "@frontend/api";
import { Button, Input, Select } from "@frontend/ui";
import { AlertCircle, FileType, X } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  template: any | null;
  onClose: () => void;
  onSuccess: () => void;
}

export function IndicatorTemplateModal({ template, onClose, onSuccess }: Props) {
  const referenceApi = new Reference();
  const [loading, setLoading] = useState(false);
  const [sports, setSports] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name_ru: template?.name_ru || "",
    name_pattern: template?.name_pattern || "",
    code_pattern: template?.code_pattern || "",
    description: template?.description || "",
    description_pattern: template?.description_pattern || "",
    sport_id: template?.sport_id ?? undefined,
    category_id: template?.category_id ?? undefined,
    measurement_unit_id: template?.measurement_unit_id ?? undefined,
    value_type: template?.value_type || "number",
    use_population: template?.use_population || false,
    generation_config: template?.generation_config ? JSON.stringify(template.generation_config, null, 2) : "",
  });

  useEffect(() => {
    const fetchReferenceData = async () => {
      try {
        const sportsResponse = (await referenceApi.sportsControllerFindAll()) as any;
        const data = Array.isArray(sportsResponse) ? sportsResponse : sportsResponse?.data;
        setSports(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch references:", err);
      }
    };
    fetchReferenceData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    let configJson = undefined;
    if (formData.generation_config) {
      try {
        configJson = JSON.parse(formData.generation_config);
      } catch (e) {
        setError("Generation config must be a valid JSON");
        setLoading(false);
        return;
      }
    }

    try {
      const payload: any = {
        name_ru: formData.name_ru,
        name_pattern: formData.name_pattern,
        code_pattern: formData.code_pattern,
        description: formData.description || undefined,
        description_pattern: formData.description_pattern || undefined,
        sport_id: formData.sport_id ? Number(formData.sport_id) : undefined,
        category_id: formData.category_id ? Number(formData.category_id) : undefined,
        measurement_unit_id: formData.measurement_unit_id ? Number(formData.measurement_unit_id) : undefined,
        value_type: formData.value_type,
        use_population: formData.use_population,
        generation_config: configJson,
      };

      if (template) {
        await referenceApi.indicatorsControllerUpdateTemplate(template.id, payload);
      } else {
        await referenceApi.indicatorsControllerCreateTemplate(payload);
      }
      onSuccess();
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Произошла ошибка при сохранении");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-8 py-6 bg-zinc-50 border-b border-zinc-100 flex flex-shrink-0 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-200">
              <FileType className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-zinc-900">
                {template ? "Редактировать шаблон" : "Новый шаблон генерации"}
              </h2>
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest mt-0.5">
                Генерация параметров
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-200/50 rounded-xl transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-8">
          <form id="template-form" onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="h-5 w-5 shrink-0" />
                {error}
              </div>
            )}

            <div className="space-y-4">
              <Input
                required
                label="Название шаблона"
                placeholder="Шаблон по категории и возрасту"
                value={formData.name_ru}
                onChange={(e) => setFormData((prev) => ({ ...prev, name_ru: e.target.value }))}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  required
                  label="Паттерн названия"
                  placeholder="[{category}] {sport} ({age_group})"
                  value={formData.name_pattern}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name_pattern: e.target.value }))}
                />

                <Input
                  required
                  label="Паттерн кода"
                  placeholder="{sport}_{category}_{age_group}"
                  value={formData.code_pattern}
                  onChange={(e) => setFormData((prev) => ({ ...prev, code_pattern: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Вид спорта (Ограничение)"
                  value={formData.sport_id?.toString() || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      sport_id: e.target.value ? Number(e.target.value) : undefined,
                    }))
                  }
                >
                  <option className="text-zinc-900" value="">Все виды спорта</option>
                  {Array.isArray(sports)
                    ? sports.map((s: any) => (
                        <option className="text-zinc-900" key={s.id} value={s.id}>
                          {s.name_ru || s.name}
                        </option>
                      ))
                    : null}
                </Select>

                <Select
                  label="Тип значения"
                  value={formData.value_type}
                  onChange={(e) => setFormData((prev) => ({ ...prev, value_type: e.target.value }))}
                >
                  <option className="text-zinc-900" value="number">Число</option>
                  <option className="text-zinc-900" value="text">Текст</option>
                  <option className="text-zinc-900" value="boolean">Логическое</option>
                  <option className="text-zinc-900" value="time">Время</option>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider ml-1">
                  Описание шаблона
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm resize-y"
                  placeholder="Общее описание для этого шаблона"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider ml-1">
                  Паттерн описания индикаторов
                </label>
                <textarea
                  value={formData.description_pattern}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description_pattern: e.target.value }))}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm resize-y"
                  placeholder="Для спортсменов {age_group} в {sport}"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 cursor-pointer p-4 bg-zinc-50 border border-zinc-200 rounded-2xl">
                  <input
                    type="checkbox"
                    checked={formData.use_population}
                    onChange={(e) => setFormData((prev) => ({ ...prev, use_population: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-zinc-900">Применять к популяции (использовать численность)</span>
                </label>
              </div>

              <div className="flex flex-col gap-2">
                <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider ml-1">
                  JSON-конфигурация генерации (необязательно)
                </label>
                <textarea
                  value={formData.generation_config}
                  onChange={(e) => setFormData((prev) => ({ ...prev, generation_config: e.target.value }))}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm min-h-[100px] resize-y font-mono"
                  placeholder={'{\n  "sports": [1, 2],\n  "age_groups": [3, 4]\n}'}
                />
              </div>

            </div>
          </form>
        </div>
        
        <div className="px-8 py-6 bg-white border-t border-zinc-100 flex flex-shrink-0 items-center gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1 h-12 rounded-2xl font-bold"
            onClick={onClose}
          >
            Отмена
          </Button>
          <Button
            type="submit"
            form="template-form"
            variant="primary"
            loading={loading}
            className="flex-[2] h-12 rounded-2xl font-bold shadow-lg shadow-blue-200/50"
          >
            {loading ? "Сохранение..." : template ? "Сохранить изменения" : "Создать шаблон"}
          </Button>
        </div>
      </div>
    </div>
  );
}
