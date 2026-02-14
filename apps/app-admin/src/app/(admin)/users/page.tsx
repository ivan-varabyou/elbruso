"use client";

import { useUsersPermissions } from "@frontend/modules/users/hooks/useUsersPermissions";
import { useUsersPageStore } from "@frontend/modules/users/stores/useUsersPageStore";
import { UsersFilters } from "@frontend/modules/users/ui/UsersFilters";
import { UsersTable } from "@frontend/modules/users/ui/UsersTable";
import { useAdminAuthStore } from "@frontend/stores/useAdminAuth.store";
import { Users } from "lucide-react";
import { useEffect } from "react";

export default function UsersPage() {
  const { fetchUsers, fetchOrganizations, loading, users } = useUsersPageStore();
  const { canRead } = useUsersPermissions();
  const { isInitialized } = useAdminAuthStore();

  useEffect(() => {
    if (isInitialized && canRead) {
      fetchUsers();
      fetchOrganizations();
    }
  }, [fetchUsers, fetchOrganizations, canRead, isInitialized]);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 border-4 border-zinc-200 border-t-zinc-900 rounded-full animate-spin" />
      </div>
    );
  }

  if (!canRead) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-zinc-500">Доступ запрещён</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="bg-white rounded-lg border border-zinc-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-zinc-500" />
            <h3 className="font-bold text-zinc-900">Пользователи системы</h3>
          </div>
          {canRead && (
            <span className="text-xs font-black uppercase tracking-widest text-zinc-400 bg-zinc-100 px-2 py-1 rounded">
              Система
            </span>
          )}
        </div>

        <div className="p-6">
          <UsersFilters />

          <UsersTable />

          {loading && users.length === 0 && (
            <div className="flex items-center justify-center py-8">
              <div className="h-5 w-5 border-2 border-zinc-200 border-t-zinc-900 rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
