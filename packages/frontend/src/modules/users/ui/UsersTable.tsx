"use client";

import { useUsersPageStore } from "@frontend/modules/users/stores/useUsersPageStore";
import { Ban, Check, Edit, Shield, ShieldCheck, Trash2 } from "lucide-react";

import { useUsersPermissions } from "../hooks/useUsersPermissions";
import { User } from "../index";

export function UsersTable() {
  const { users, loading, blockUser, approveUser, deleteUser, setSelectedUser, setEditorOpen } =
    useUsersPageStore();
  const { canUpdate, canDelete, canApprove, canBlock } = useUsersPermissions();

  const getStatusBadge = (user: User) => {
    if (!user.is_active) {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-700">
          Заблокирован
        </span>
      );
    }
    if (!user.is_approved) {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-yellow-100 text-yellow-700">
          Ожидает
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-700">
        Активен
      </span>
    );
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "ADMIN":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-blue-100 text-blue-700">
            <ShieldCheck className="h-3 w-3" />
            ADMIN
          </span>
        );
      case "MANAGER":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-purple-100 text-purple-700">
            <Shield className="h-3 w-3" />
            MANAGER
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-700">
            <Shield className="h-3 w-3" />
            VIEWER
          </span>
        );
    }
  };

  const getFullName = (user: User) => {
    const parts = [user.last_name, user.first_name, user.middle_name].filter(Boolean);
    return parts.join(" ") || "—";
  };

  if (loading && users.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-6 w-6 border-2 border-zinc-200 border-t-zinc-900 rounded-full animate-spin" />
      </div>
    );
  }

  if (users.length === 0) {
    return <div className="text-center py-12 text-zinc-500">Пользователи не найдены</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-zinc-50/50 border-b border-zinc-100">
            <th className="px-4 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              ФИО
            </th>
            <th className="px-4 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              Email
            </th>
            <th className="px-4 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              Организация
            </th>
            <th className="px-4 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              Роль
            </th>
            <th className="px-4 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              Статус
            </th>
            <th className="px-4 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              Дата
            </th>
            <th className="px-4 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider text-right">
              Действия
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {Array.isArray(users) &&
            users.map((user) => (
              <tr key={user.id} className="hover:bg-zinc-50/50 transition-colors group">
                <td className="px-4 py-3">
                  <span className="text-sm font-medium text-zinc-900">{getFullName(user)}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-zinc-600">{user.email}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-zinc-600">{user.organization_name || "—"}</span>
                </td>
                <td className="px-4 py-3">{getRoleBadge(user.role)}</td>
                <td className="px-4 py-3">{getStatusBadge(user)}</td>
                <td className="px-4 py-3">
                  <span className="text-xs text-zinc-400">
                    {user.created_at ? new Date(user.created_at).toLocaleDateString("ru-RU") : "—"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {canUpdate && (
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setEditorOpen(true);
                        }}
                        className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-lg transition-all"
                        title="Редактировать"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    )}

                    {!user.is_approved && canApprove && (
                      <button
                        onClick={() => approveUser(user.id)}
                        className="p-1.5 text-zinc-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
                        title="Утвердить"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                    )}

                    {canBlock && (
                      <button
                        onClick={() => blockUser(user.id, user.is_active)}
                        className={`p-1.5 rounded-lg transition-all ${
                          user.is_active
                            ? "text-zinc-400 hover:text-red-600 hover:bg-red-50"
                            : "text-zinc-400 hover:text-green-600 hover:bg-green-50"
                        }`}
                        title={user.is_active ? "Заблокировать" : "Разблокировать"}
                      >
                        <Ban className="h-4 w-4" />
                      </button>
                    )}

                    {canDelete && (
                      <button
                        onClick={() => {
                          if (confirm("Удалить пользователя?")) {
                            deleteUser(user.id);
                          }
                        }}
                        className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Удалить"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
