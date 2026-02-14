"use client";

import type { IndicatorGroup } from "@frontend/types/reference.types";
import { Button } from "@frontend/ui";
import { Edit2, Layers, Trash2, Trophy } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@frontend/ui/primitives/Table";
import { cn } from "@frontend/lib";

export interface IndicatorGroupsTableProps {
  groups: IndicatorGroup[];
  onEditGroup: (group: IndicatorGroup) => void;
  onDeleteGroup: (groupId: number) => void;
  onCreateGroup: () => void;
  loading?: boolean;
}

export function IndicatorGroupsTableDumb({
  groups,
  onEditGroup,
  onDeleteGroup,
  onCreateGroup,
  loading,
}: IndicatorGroupsTableProps) {
  if (groups.length === 0 && !loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="p-3 bg-zinc-100 rounded-full mb-3">
          <Layers className="h-6 w-6 text-zinc-400" />
        </div>
        <p className="text-sm text-zinc-500">Группы индикаторов не найдены</p>
        <p className="text-xs text-zinc-400 mt-1 mb-4">Добавьте первую группу индикаторов</p>
        <Button variant="primary" size="sm" onClick={onCreateGroup}>
          Добавить группу
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-zinc-900">Группы индикаторов</h2>
        <Button variant="primary" size="sm" onClick={onCreateGroup}>
          Добавить группу
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">ID</TableHead>
            <TableHead>Название</TableHead>
            <TableHead className="w-32">Код</TableHead>
            <TableHead>Описание</TableHead>
            <TableHead className="w-32">Вид спорта</TableHead>
            <TableHead className="w-24">Сортировка</TableHead>
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
            groups.map((group) => (
              <TableRow key={group.id}>
                <TableCell>
                  <span className="font-mono text-xs text-zinc-400">#{group.id}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-blue-50 rounded-lg">
                      <Layers className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="font-medium text-zinc-900">{group.name_ru}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <code className="text-xs bg-zinc-100 px-1.5 py-0.5 rounded text-zinc-600">
                    {group.code}
                  </code>
                </TableCell>
                <TableCell>
                  <p className="text-sm text-zinc-500 truncate max-w-[200px]">
                    {group.description || "-"}
                  </p>
                </TableCell>
                <TableCell>
                  {group.sport_id ? (
                    <div className="flex items-center gap-1.5 text-blue-600">
                      <Trophy className="h-3.5 w-3.5" />
                      <span className="text-sm">#{group.sport_id}</span>
                    </div>
                  ) : (
                    <span className="text-sm text-zinc-400">Глобальная</span>
                  )}
                </TableCell>
                <TableCell>
                  <span className="text-sm text-zinc-500">{group.sort_order ?? 0}</span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onEditGroup(group)}
                      className="p-1.5 text-zinc-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Редактировать"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Вы уверены, что хотите удалить эту группу?")) {
                          onDeleteGroup(group.id);
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
