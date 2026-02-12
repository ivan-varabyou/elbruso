"use client";

import { Organization,useOrganizationsStore } from "@frontend/stores/useOrganizationsStore";
import { Pencil, Trash2 } from "lucide-react";

interface OrganizationsListProps {
  onEdit: (org: Organization) => void;
  onDelete: (org: Organization) => void;
}

export function OrganizationsList({ onEdit, onDelete }: OrganizationsListProps) {
  const { organizations } = useOrganizationsStore();

  if (organizations.length === 0) {
    return (
      <div className="text-center py-12 text-zinc-500">
        Организации не найдены
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-zinc-200">
            <th className="text-left py-3 px-4 text-sm font-medium text-zinc-600">ID</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-zinc-600">Название</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-zinc-600">Аббревиатура</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-zinc-600">Тип</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-zinc-600">Уровень</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-zinc-600">Статус</th>
            <th className="text-right py-3 px-4 text-sm font-medium text-zinc-600">Действия</th>
          </tr>
        </thead>
        <tbody>
          {organizations.map((org) => (
            <tr key={org.id} className="border-b border-zinc-100 hover:bg-zinc-50">
              <td className="py-3 px-4 text-sm text-zinc-900">{org.id}</td>
              <td className="py-3 px-4 text-sm text-zinc-900 font-medium">{org.name_ru}</td>
              <td className="py-3 px-4 text-sm text-zinc-600">{org.abbreviation_ru || '—'}</td>
              <td className="py-3 px-4 text-sm text-zinc-600">{org.type_id}</td>
              <td className="py-3 px-4 text-sm text-zinc-600">{org.level_id}</td>
              <td className="py-3 px-4 text-sm">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    org.is_active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {org.is_active ? 'Активна' : 'Неактивна'}
                </span>
              </td>
              <td className="py-3 px-4 text-sm text-right">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onEdit(org)}
                    className="p-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded transition-colors"
                    title="Редактировать"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(org)}
                    className="p-1.5 text-zinc-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
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
  );
}
