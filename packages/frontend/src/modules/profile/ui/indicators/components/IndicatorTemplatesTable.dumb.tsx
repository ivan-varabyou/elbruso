"use client";

import { Button } from "@frontend/ui";
import { Edit2, FileType, Trash2, Trophy } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@frontend/ui/primitives/Table";
import { cn } from "@frontend/lib";

export interface IndicatorTemplatesTableProps {
  templates: any[];
  onEditTemplate: (template: any) => void;
  onDeleteTemplate: (templateId: number) => void;
  onCreateTemplate: () => void;
  loading?: boolean;
}

export function IndicatorTemplatesTableDumb({
  templates,
  onEditTemplate,
  onDeleteTemplate,
  onCreateTemplate,
  loading,
}: IndicatorTemplatesTableProps) {
  if (templates.length === 0 && !loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="p-3 bg-zinc-100 rounded-full mb-3">
          <FileType className="h-6 w-6 text-zinc-400" />
        </div>
        <p className="text-sm text-zinc-500">Шаблоны генерации не найдены</p>
        <p className="text-xs text-zinc-400 mt-1 mb-4">Создайте первый шаблон для генерации индикаторов</p>
        <Button variant="primary" size="sm" onClick={onCreateTemplate}>
          Новый шаблон
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-zinc-900">Шаблоны генерации</h2>
        <Button variant="primary" size="sm" onClick={onCreateTemplate}>
          Новый шаблон
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">ID</TableHead>
            <TableHead>Название (ru)</TableHead>
            <TableHead className="w-48">Паттерн названия</TableHead>
            <TableHead className="w-48">Паттерн кода</TableHead>
            <TableHead className="w-32">Тип</TableHead>
            <TableHead className="w-32">Вид спорта</TableHead>
            <TableHead className="w-28 text-right">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8">
                <div className="flex items-center justify-center gap-2 text-zinc-500">
                  <div className="h-4 w-4 border-2 border-zinc-300 border-t-zinc-600 rounded-full animate-spin" />
                  Загрузка...
                </div>
              </TableCell>
            </TableRow>
          ) : (
            templates.map((template) => (
              <TableRow key={template.id}>
                <TableCell>
                  <span className="font-mono text-xs text-zinc-400">#{template.id}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-blue-50 rounded-lg">
                      <FileType className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="font-medium text-zinc-900">{template.name_ru}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <code className="text-[11px] bg-zinc-100 px-1.5 py-0.5 rounded text-zinc-600 truncate block max-w-[180px]" title={template.name_pattern}>
                    {template.name_pattern}
                  </code>
                </TableCell>
                <TableCell>
                  <code className="text-[11px] bg-zinc-100 px-1.5 py-0.5 rounded text-zinc-600 truncate block max-w-[180px]" title={template.code_pattern}>
                    {template.code_pattern}
                  </code>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-zinc-600 capitalize">{template.value_type}</span>
                </TableCell>
                <TableCell>
                  {template.sport_id ? (
                    <div className="flex items-center gap-1.5 text-blue-600">
                      <Trophy className="h-3.5 w-3.5" />
                      <span className="text-sm">#{template.sport_id}</span>
                    </div>
                  ) : (
                    <span className="text-sm text-zinc-400">Любой</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onEditTemplate(template)}
                      className="p-1.5 text-zinc-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Редактировать"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Вы уверены, что хотите удалить этот шаблон?")) {
                          onDeleteTemplate(template.id);
                        }
                      }}
                      className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Удалить"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
