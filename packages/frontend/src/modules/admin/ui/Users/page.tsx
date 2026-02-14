"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button, Input } from "@frontend/ui/primitives";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@frontend/ui/primitives";
import { useAdminAuth } from "@frontend/modules/admin/auth";
import { AdminRole } from "@frontend/types/enums";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  organization_id: number | null;
}

export function UsersPage() {
  const { user: profile } = useAdminAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const canEdit = profile?.role === AdminRole.SUPER_ADMIN || profile?.role === AdminRole.ADMIN;
  const canDelete = profile?.role === AdminRole.SUPER_ADMIN;

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/users");
      const data = await response.json();
      setUsers(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка загрузки");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить пользователя?")) return;
    try {
      await fetch(`/users/${id}`, { method: "DELETE" });
      await loadUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка удаления");
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-zinc-900">Пользователи</h1>
        {canEdit && (
          <Button variant="solid">
            <Plus className="h-4 w-4" />
            Добавить пользователя
          </Button>
        )}
      </div>

      {error && <div className="p-4 bg-red-50 text-red-700 rounded-lg mb-4">{error}</div>}

      {loading ? (
        <div className="text-center py-12 text-zinc-500">Загрузка...</div>
      ) : users.length === 0 ? (
        <div className="text-center py-12 text-zinc-500">Нет пользователей</div>
      ) : (
        <Table>
          <TableHeader>
            <TableColumn>Пользователь</TableColumn>
            <TableColumn>Email</TableColumn>
            <TableColumn>Роль</TableColumn>
            <TableColumn className="text-right">Действия</TableColumn>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-zinc-100 rounded text-xs">{user.role}</span>
                </TableCell>
                <TableCell className="text-right">
                  {canDelete && user.id !== profile?.id && (
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(user.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
