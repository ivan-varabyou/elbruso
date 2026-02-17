"use client";

import { EventResponseDto } from "@frontend/api/data-contracts";
import { Pencil, Trash2, Calendar } from "lucide-react";

interface EventsListProps {
  events: EventResponseDto[];
  onEdit: (event: EventResponseDto) => void;
  onDelete: (id: number) => void;
}

export function EventsList({ events, onEdit, onDelete }: EventsListProps) {
  if (events.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-zinc-200 text-zinc-500">
        <Calendar className="h-12 w-12 mx-auto mb-4 opacity-20" />
        События не найдены
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
              <th className="py-3 px-4 text-sm font-semibold text-zinc-900">Тип</th>
              <th className="py-3 px-4 text-sm font-semibold text-zinc-900">Уровень</th>
              <th className="py-3 px-4 text-sm font-semibold text-zinc-900">Статус</th>
              <th className="py-3 px-4 text-sm font-semibold text-zinc-900 text-right">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-zinc-50/50 transition-colors">
                <td className="py-3 px-4">
                  <div className="text-xs font-mono text-zinc-500">#{event.id}</div>
                  <div className="text-sm font-medium text-zinc-900">{event.code}</div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-sm font-medium text-zinc-900">{event.name_ru}</div>
                  {event.short_name_ru && (
                    <div className="text-xs text-zinc-500">{event.short_name_ru}</div>
                  )}
                </td>
                <td className="py-3 px-4 text-sm text-zinc-600">
                  {event.event_type_id || '—'}
                </td>
                <td className="py-3 px-4 text-sm text-zinc-600">
                  {event.level_id || '—'}
                </td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    event.is_active 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-zinc-100 text-zinc-800'
                  }`}>
                    {event.is_active ? 'Активно' : 'Неактивно'}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onEdit(event)}
                      className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-all"
                      title="Редактировать"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete(event.id)}
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
