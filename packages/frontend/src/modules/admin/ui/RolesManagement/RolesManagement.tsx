"use client";

import { rbacApi } from "@frontend/api/rbac.api";
import { toastService } from "@frontend/modules/notifications";
import type { PermissionGroup, RbacRole } from "@frontend/types/rbac";
import { ProfilePageLayout } from "@frontend/ui/layout/ProfilePageLayout/ProfilePageLayout";
import {
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@frontend/ui/primitives";
import { ConfirmDialog } from "@frontend/ui/primitives/ConfirmDialog";
import { RolePermissionsEditor } from "@frontend/ui/primitives/RolePermissionsEditor";
import { Settings2, Shield, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

interface RolesManagementProps {
  onAddRole: () => void;
}

export const RolesManagement: React.FC<RolesManagementProps> = ({ onAddRole }) => {
  const [roles, setRoles] = useState<RbacRole[]>([]);
  const [permissionsTree, setPermissionsTree] = useState<{ groups: PermissionGroup[] } | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState<RbacRole | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<RbacRole | null>(null);

  const loadRoles = async () => {
    try {
      const response = await rbacApi.getAdminRoles();
      // Robust data extraction: some APIs wrap data in another 'data' property
      const data = response.data;
      setRoles(Array.isArray(data) ? data : []);
    } catch (err) {
      toastService.error(err instanceof Error ? err.message : "Failed to load roles");
    }
  };

  const loadPermissions = async () => {
    try {
      const response = await rbacApi.getPermissionsTree();
      if (response && response.data) {
        const treeData = (response.data as any).groups ? response.data : (response.data as any).data;
        setPermissionsTree(treeData || null);
      }
    } catch (err) {
      console.error("Failed to load permissions:", err);
      toastService.error(err instanceof Error ? err.message : "Failed to load permissions");
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([loadRoles(), loadPermissions()]);
      setLoading(false);
    };
    init();
  }, []);

  const handleDeleteRole = async () => {
    if (!roleToDelete) return;
    try {
      await rbacApi.deleteAdminRole(roleToDelete.id);
      await loadRoles();
      toastService.success(`Роль "${roleToDelete.name}" успешно удалена`);
    } catch (err) {
      toastService.error(err instanceof Error ? err.message : "Failed to delete role");
    } finally {
      setDeleteConfirmOpen(false);
      setRoleToDelete(null);
    }
  };

  const handleEditPermissions = (role: RbacRole) => {
    setSelectedRole(role);
    setEditorOpen(true);
  };

  if (loading) {
    return (
      <ProfilePageLayout title="Роли администраторов" icon={Shield} onAddClick={onAddRole}>
        <div className="flex h-96 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-900 border-t-transparent" />
        </div>
      </ProfilePageLayout>
    );
  }

  // Ensure safe access to roles array
  const safeRoles = Array.isArray(roles) ? roles : [];

  return (
    <ProfilePageLayout title="Роли администраторов" icon={Shield} onAddClick={onAddRole}>
      <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-sm">
        <Table aria-label="Таблица ролей администраторов" removeWrapper className="min-w-full">
          <TableHeader>
            <TableColumn className="bg-zinc-50/50 text-zinc-500 font-semibold py-4 px-6 border-b border-zinc-100 whitespace-nowrap">
              Название
            </TableColumn>
            <TableColumn className="bg-zinc-50/50 text-zinc-500 font-semibold py-4 px-6 border-b border-zinc-100 whitespace-nowrap">
              Код
            </TableColumn>
            <TableColumn className="bg-zinc-50/50 text-zinc-500 font-semibold py-4 px-6 border-b border-zinc-100 whitespace-nowrap">
              Разрешения
            </TableColumn>
            <TableColumn className="bg-zinc-50/50 text-zinc-500 font-semibold py-4 px-6 border-b border-zinc-100 whitespace-nowrap text-center">
              Приоритет
            </TableColumn>
            <TableColumn className="bg-zinc-50/50 text-zinc-500 font-semibold py-4 px-6 border-b border-zinc-100 w-32 text-center whitespace-nowrap">
              Действия
            </TableColumn>
          </TableHeader>
          <TableBody emptyContent="Ни одной роли не создано">
            {safeRoles.map((role) => (
              <TableRow
                key={role.id}
                className="hover:bg-zinc-50/40 transition-colors border-b border-zinc-100 last:border-0"
              >
                <TableCell className="py-4 px-6">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-zinc-900">{role.name}</span>
                      {role.isSystem && (
                        <Chip
                          size="sm"
                          variant="flat"
                          color="default"
                          className="h-5 text-[10px] uppercase font-bold tracking-wider px-2 bg-zinc-100 text-zinc-600 border-none"
                        >
                          Системная
                        </Chip>
                      )}
                    </div>
                    {role.description && (
                      <span className="text-xs text-zinc-500 mt-0.5 max-w-md line-clamp-1">
                        {role.description}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <code className="text-xs font-mono font-medium bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded-md border border-zinc-200 uppercase tracking-tight">
                    {role.code}
                  </code>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium text-zinc-700">
                      {
                        new Set(Object.keys(role.permissions || {}).map((p) => p.split(":")[0]))
                          .size
                      }
                    </span>
                    <span className="text-xs text-zinc-500">модулей</span>
                  </div>
                </TableCell>
                <TableCell className="py-4 px-6 text-center">
                  <Chip
                    size="sm"
                    variant="flat"
                    className="h-6 font-mono font-bold bg-blue-50 text-blue-600 border-blue-100"
                  >
                    {role.weight}
                  </Chip>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <div className="flex items-center justify-center gap-1">
                    <Tooltip content="Настроить разрешения" delay={500}>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={() => handleEditPermissions(role)}
                        className="text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/50"
                      >
                        <Settings2 className="h-4 w-4" />
                      </Button>
                    </Tooltip>
                    {!role.isSystem && (
                      <Tooltip content="Удалить роль" color="danger" delay={500}>
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          color="danger"
                          onPress={() => {
                            setRoleToDelete(role);
                            setDeleteConfirmOpen(true);
                          }}
                          className="text-zinc-400 hover:text-danger hover:bg-danger-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </Tooltip>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedRole && permissionsTree && (
        <RolePermissionsEditor
          isOpen={editorOpen}
          onClose={() => {
            setEditorOpen(false);
            setSelectedRole(null);
          }}
          role={selectedRole}
          permissionsTree={permissionsTree}
          onSave={async (roleId, permissions, weight) => {
            try {
              const promises = [];

              // 1. Update permissions
              promises.push(rbacApi.updateAdminRolePermissions(roleId, permissions));

              // 2. Update weight (if it's different from the current one)
              if (selectedRole.weight !== weight) {
                promises.push(rbacApi.updateAdminRole(roleId, { weight }));
              }

              await Promise.all(promises);
              await loadRoles();
              toastService.success("Роль успешно обновлена");
            } catch (err) {
              toastService.error(err instanceof Error ? err.message : "Ошибка при сохранении");
            }
          }}
        />
      )}

      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        onClose={() => {
          setDeleteConfirmOpen(false);
          setRoleToDelete(null);
        }}
        onConfirm={handleDeleteRole}
        title="Удалить роль"
        message={
          roleToDelete
            ? `Вы действительно хотите безвозвратно удалить роль "${roleToDelete.name}"? Это действие нельзя будет отменить.`
            : ""
        }
        confirmText="Удалить"
        cancelText="Отмена"
        variant="danger"
      />
    </ProfilePageLayout>
  );
};

export default RolesManagement;
