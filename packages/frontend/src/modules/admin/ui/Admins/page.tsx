"use client";

import { cn } from "@frontend/lib";
import { useAdminAuth } from "@frontend/modules/admin/auth";
import { useToast } from "@frontend/modules/notifications/hooks";
import { useAdminSettingsStore } from "@frontend/stores/useAdminSettings.store";
import { AdminRole } from "@frontend/types/enums";
import { ProfilePageLayout } from "@frontend/ui/layout/ProfilePageLayout/ProfilePageLayout";
import { Button } from "@frontend/ui/primitives";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
} from "@frontend/ui/primitives";
import { ChevronDown, ChevronUp, Pencil, Plus, Search, Trash2, User, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { CreateAdminData, CreateAdminModal } from "../AdminSettings/CreateAdminModal";
import { EditAdminData, EditAdminModal } from "../AdminSettings/EditAdminModal";

export function AdminsPage() {
  const { user: profile } = useAdminAuth();
  const { users, deleteUser, updateUser, isLoading, fetchUsers, createUser } =
    useAdminSettingsStore();
  const { showToast } = useToast();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<(typeof users)[0] | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<AdminRole | "all">("all");
  const [sortBy, setSortBy] = useState<"name" | "email" | "role" | null>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const roleOptions = [
    { value: "all", label: "Все роли" },
    { value: AdminRole.SUPER_ADMIN, label: "Super Admin" },
    { value: AdminRole.ADMIN, label: "Admin" },
    { value: AdminRole.MODERATOR, label: "Moderator" },
  ] as const;

  const handleSort = (column: "name" | "email" | "role") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const filteredUsers = useMemo(() => {
    let result = [...users];

    if (search.trim()) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(searchLower) || u.email.toLowerCase().includes(searchLower),
      );
    }

    if (roleFilter !== "all") {
      result = result.filter((u) => u.role === roleFilter);
    }

    if (sortBy) {
      result.sort((a, b) => {
        let aVal: string, bVal: string;
        if (sortBy === "role") {
          const roleOrder = {
            [AdminRole.SUPER_ADMIN]: 0,
            [AdminRole.ADMIN]: 1,
            [AdminRole.MODERATOR]: 2,
          };
          aVal = String(roleOrder[a.role]);
          bVal = String(roleOrder[b.role]);
        } else {
          aVal = String(a[sortBy]).toLowerCase();
          bVal = String(b[sortBy]).toLowerCase();
        }
        if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
        if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [users, search, roleFilter, sortBy, sortOrder]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = async (id: string) => {
    if (!confirm("Вы уверены, что хотите удалить этого администратора?")) {
      return;
    }

    try {
      await deleteUser(id);
      showToast("success", "Администратор успешно удален");
      await fetchUsers();
    } catch (error) {
      console.error("Delete admin error:", error);
      showToast("error", "Ошибка при удалении администратора");
    }
  };

  const handleCreateAdmin = async (data: CreateAdminData) => {
    try {
      await createUser(data);
      showToast("success", "Администратор успешно создан");
      await fetchUsers();
    } catch (error: unknown) {
      console.error("Create admin error:", error);
      throw error;
    }
  };

  const handleEdit = (admin: (typeof users)[0]) => {
    setEditingAdmin(admin);
    setIsEditModalOpen(true);
  };

  const handleUpdateAdmin = async (data: EditAdminData) => {
    if (!editingAdmin) return;
    try {
      await updateUser(editingAdmin.id, data);
      showToast("success", "Администратор успешно обновлен");
      await fetchUsers();
    } catch (error: unknown) {
      console.error("Update admin error:", error);
      throw error;
    }
  };

  const getRoleBadgeColor = (role: AdminRole) => {
    switch (role) {
      case AdminRole.SUPER_ADMIN:
        return "bg-purple-100 text-purple-700 border-purple-200";
      case AdminRole.ADMIN:
        return "bg-blue-100 text-blue-700 border-blue-200";
      case AdminRole.MODERATOR:
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-zinc-100 text-zinc-700 border-zinc-200";
    }
  };

  const actions = profile?.role === AdminRole.SUPER_ADMIN && (
    <Button variant="solid" size="sm" onClick={() => setIsCreateModalOpen(true)}>
      <Plus className="h-4 w-4" />
      Добавить администратора
    </Button>
  );

  const SortIcon = ({ column }: { column: "name" | "email" | "role" }) => {
    if (sortBy !== column) return null;
    return sortOrder === "asc" ? (
      <ChevronUp className="h-4 w-4 text-zinc-900" />
    ) : (
      <ChevronDown className="h-4 w-4 text-zinc-900" />
    );
  };

  return (
    <ProfilePageLayout title="Администраторы" icon={Users} actions={actions}>
      <div>
        <div className="mb-4 relative flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Поиск по имени или email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
            />
          </div>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="flat" className="h-10">
                {roleFilter === "all" ? "Все роли" : roleFilter}
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              items={roleOptions}
              selectedKeys={[roleFilter]}
              onSelectionChange={(keys) => setRoleFilter(Array.from(keys)[0] as AdminRole | "all")}
              disallowEmptySelection
              selectionMode="single"
            >
              {(item) => <DropdownItem key={item.value}>{item.label}</DropdownItem>}
            </DropdownMenu>
          </Dropdown>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-zinc-500">
            <div className="animate-spin h-8 w-8 border-4 border-zinc-200 border-t-zinc-900 rounded-full mx-auto mb-3" />
            <p className="text-sm">Загрузка...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-12 text-zinc-500">
            <Users className="h-12 w-12 mx-auto mb-3 text-zinc-300" />
            <p className="text-sm">Нет администраторов</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableColumn
                className="cursor-pointer hover:text-zinc-900 transition-colors"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center gap-1">
                  Пользователь
                  <SortIcon column="name" />
                </div>
              </TableColumn>
              <TableColumn
                className="cursor-pointer hover:text-zinc-900 transition-colors"
                onClick={() => handleSort("role")}
              >
                <div className="flex items-center gap-1">
                  Роль
                  <SortIcon column="role" />
                </div>
              </TableColumn>
              <TableColumn className="text-right">Действия</TableColumn>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                          admin.is_active
                            ? "bg-green-500 text-white"
                            : "bg-transparent border-2 border-zinc-300 text-zinc-400",
                        )}
                      >
                        <User className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-zinc-900">{admin.name}</span>
                        <span
                          className={cn(
                            "text-sm",
                            admin.is_active ? "text-green-600" : "text-zinc-400",
                          )}
                        >
                          {admin.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border",
                        getRoleBadgeColor(admin.role),
                      )}
                    >
                      <span className="uppercase tracking-wide">
                        {admin.role === AdminRole.SUPER_ADMIN
                          ? "Super Admin"
                          : admin.role === AdminRole.ADMIN
                            ? "Admin"
                            : "Moderator"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-0.5">
                      <Button
                        variant="light"
                        size="sm"
                        className="h-6 w-6 min-w-0 px-0"
                        onClick={() => handleEdit(admin)}
                      >
                        <Pencil className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="light"
                        size="sm"
                        className="h-6 w-6 min-w-0 px-0"
                        onClick={() => handleDelete(admin.id)}
                        disabled={admin.id === profile?.id}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <CreateAdminModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateAdmin}
      />

      <EditAdminModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleUpdateAdmin}
        admin={editingAdmin}
      />
    </ProfilePageLayout>
  );
}
