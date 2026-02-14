import { rbacApi } from "@frontend/api/rbac.api";
import type { PermissionAction, PermissionsTree, RbacRole } from "@frontend/types/rbac";
import { Button } from "@frontend/ui/primitives";
import { RoleCard } from "@frontend/ui/primitives/RoleCard";
import { RolePermissionsEditor } from "@frontend/ui/primitives/RolePermissionsEditor";
import { Users } from "lucide-react";
import React, { useEffect, useState } from "react";

export const UserRolesPage: React.FC = () => {
  const [roles, setRoles] = useState<RbacRole[]>([]);
  const [permissionsTree, setPermissionsTree] = useState<PermissionsTree | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState<RbacRole | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadRoles = async () => {
    try {
      const response = await rbacApi.getUserRoles();
      if (response.data) {
        setRoles(response.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load roles");
    }
  };

  const loadPermissionsTree = async () => {
    try {
      const response = await rbacApi.getPermissionsTree("user");
      if (response.data) {
        setPermissionsTree(response.data);
      }
    } catch (err) {
      console.error("Failed to load permissions tree:", err);
    }
  };

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      await Promise.all([loadRoles(), loadPermissionsTree()]);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleEditRole = (role: RbacRole) => {
    setSelectedRole(role);
    setEditorOpen(true);
  };

  const handleDeleteRole = async (role: RbacRole) => {
    if (!confirm(`Удалить роль "${role.name}"?`)) {
      return;
    }

    try {
      await rbacApi.deleteUserRole(role.id);
      await loadRoles();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete role");
    }
  };

  const handleSavePermissions = async (
    roleId: string,
    permissions: Record<string, PermissionAction[]>,
  ) => {
    try {
      await rbacApi.updateUserRolePermissions(roleId, permissions);
      await loadRoles();
    } catch (err) {
      throw err;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin h-8 w-8 border-4 border-zinc-200 border-t-zinc-900 rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900">Роли пользователей</h1>
            <p className="text-sm text-zinc-500">Управление ролями для пользователей Web App</p>
          </div>
        </div>
        <Button variant="solid">Добавить роль</Button>
      </div>

      {/* Error */}
      {error && <div className="p-4 bg-red-50 text-red-700 rounded-lg">{error}</div>}

      {/* Roles Grid */}
      {roles.length === 0 ? (
        <div className="text-center py-12 text-zinc-500">
          <Users className="h-12 w-12 mx-auto mb-3 text-zinc-300" />
          <p>Роли не найдены</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {roles.map((role) => (
            <RoleCard
              key={role.id}
              role={role}
              onEdit={handleEditRole}
              onDelete={role.isSystem ? undefined : handleDeleteRole}
            />
          ))}
        </div>
      )}

      {/* Permissions Editor Modal */}
      {selectedRole && editorOpen && (
        <RolePermissionsEditor
          role={selectedRole}
          isOpen={editorOpen}
          onClose={() => {
            setEditorOpen(false);
            setSelectedRole(null);
          }}
          onSave={handleSavePermissions}
          permissionsTree={permissionsTree || undefined}
        />
      )}
    </div>
  );
};

export default UserRolesPage;
