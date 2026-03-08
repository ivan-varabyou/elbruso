"use client";

import {
  UserEditorModal,
  UsersFilters,
  UsersTable,
  useUsersPageStore,
  useUsersPermissions,
} from "@frontend/modules/users";
import { useAdminAuthStore } from "@frontend/stores/useAdminAuth.store";
import { ProfilePageLayout } from "@frontend/ui/layout/ProfilePageLayout/ProfilePageLayout";
import { Users } from "lucide-react";
import { useEffect } from "react";

export default function UsersPage() {
  const { fetchUsers, fetchOrganizations, loading, users, setSelectedUser, setEditorOpen } =
    useUsersPageStore();
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
    <ProfilePageLayout
      title="Пользователи системы"
      icon={Users}
      onAddClick={
        canRead
          ? () => {
              setSelectedUser(null);
              setEditorOpen(true);
            }
          : undefined
      }
    >
      <div className="space-y-6">
        <UsersFilters />

        <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-sm">
          <UsersTable />
        </div>

        <UserEditorModal />

        {loading && users.length === 0 && (
          <div className="flex items-center justify-center py-8">
            <div className="h-5 w-5 border-2 border-zinc-200 border-t-zinc-900 rounded-full animate-spin" />
          </div>
        )}
      </div>
    </ProfilePageLayout>
  );
}
