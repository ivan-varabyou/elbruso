"use client";

import { useEffect, useState } from "react";
import { 
  Users, 
  Plus, 
  MoreVertical, 
  Shield, 
  ShieldCheck, 
  ShieldAlert,
  Loader2,
  Trash2,
  Edit
} from "lucide-react";
import { useAdminSettingsStore } from "../../../../stores/useAdminSettings.store";
import { useAdminAuthStore } from "../../../../stores/useAdminAuth.store";
import { AdminUser } from "../../../../types";
import { AdminRole } from "../../../../types/enums";

export function UserManagement() {
  const { users, fetchUsers, deleteUser, isLoading } = useAdminSettingsStore();
  const { user: profile } = useAdminAuthStore();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (profile?.role === AdminRole.SUPER_ADMIN) {
      fetchUsers();
    }
  }, [profile, fetchUsers]);

  if (profile?.role !== AdminRole.SUPER_ADMIN) return null;

  const getRoleIcon = (role: AdminRole) => {
    switch (role) {
      case AdminRole.SUPER_ADMIN: return <ShieldAlert className="h-4 w-4 text-red-500" />;
      case AdminRole.ADMIN: return <ShieldCheck className="h-4 w-4 text-blue-500" />;
      default: return <Shield className="h-4 w-4 text-zinc-400" />;
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Вы уверены, что хотите удалить этого администратора?")) {
      await deleteUser(id);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-zinc-500" />
          <h3 className="font-bold text-zinc-900">Управление администраторами</h3>
        </div>
        <button
          className="flex items-center gap-1.5 bg-zinc-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-zinc-800 transition-all"
          onClick={() => alert("Функционал добавления будет реализован в следующем шаге")}
        >
          <Plus className="h-3.5 w-3.5" />
          Добавить
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50/30 border-b border-zinc-100">
              <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Имя / Email</th>
              <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Роль</th>
              <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Статус</th>
              <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider text-right">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {isLoading && users.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto text-zinc-300" />
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-zinc-500 text-sm">
                  Нет зарегистрированных администраторов
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-zinc-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-zinc-900">{user.name}</span>
                      <span className="text-xs text-zinc-500">{user.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs font-medium text-zinc-600">
                      {getRoleIcon(user.role)}
                      {user.role}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      user.is_active ? 'bg-green-100 text-green-700' : 'bg-zinc-100 text-zinc-500'
                    }`}>
                      {user.is_active ? 'Активен' : 'Отключен'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleDelete(user.id)}
                        disabled={user.id === profile?.id}
                        className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all disabled:opacity-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
