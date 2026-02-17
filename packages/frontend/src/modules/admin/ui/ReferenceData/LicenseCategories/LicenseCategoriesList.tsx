"use client";

import { LicenseCategoryResponseDto } from "@frontend/api/data-contracts";
import { Pencil, Trash2, Shield } from "lucide-react";

interface LicenseCategoriesListProps {
  categories: LicenseCategoryResponseDto[];
  onEdit: (category: LicenseCategoryResponseDto) => void;
  onDelete: (id: number) => void;
}

export function LicenseCategoriesList({ categories, onEdit, onDelete }: LicenseCategoriesListProps) {
  if (categories.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-zinc-200 text-zinc-500">
        <Shield className="h-12 w-12 mx-auto mb-4 opacity-20" />
        Категории не найдены
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50/50 border-b border-zinc-200">
              <th className="py-3 px-4 text-sm font-semibold text-zinc-900">ID / Код</th>
              <th className="py-3 px-4 text-sm font-semibold text-zinc-900">Название</th>
              <th className="py-3 px-4 text-sm font-semibold text-zinc-900">Тип персонала</th>
              <th className="py-3 px-4 text-sm font-semibold text-zinc-900">Уровень</th>
              <th className="py-3 px-4 text-sm font-semibold text-zinc-900">Статус</th>
              <th className="py-3 px-4 text-sm font-semibold text-zinc-900 text-right">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-zinc-50/50 transition-colors">
                <td className="py-3 px-4">
                  <div className="text-xs font-mono text-zinc-500">#{category.id}</div>
                  <div className="text-sm font-medium text-zinc-900">{category.code}</div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-sm font-medium text-zinc-900">{category.name_ru}</div>
                  {category.short_name_ru && (
                    <div className="text-xs text-zinc-500">{category.short_name_ru}</div>
                  )}
                </td>
                <td className="py-3 px-4 text-sm text-zinc-600">
                  {category.personnel_type === 'referee' ? 'Судья' : 'Персонал'}
                </td>
                <td className="py-3 px-4 text-sm text-zinc-600">
                  {category.level}
                </td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    category.is_active 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-zinc-100 text-zinc-800'
                  }`}>
                    {category.is_active ? 'Активна' : 'Неактивна'}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onEdit(category)}
                      className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-all"
                      title="Редактировать"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete(category.id)}
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
      </div>
    </div>
  );
}
