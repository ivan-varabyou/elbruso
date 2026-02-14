"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Settings } from "lucide-react";
import { Button } from "@frontend/ui/primitives";
import { useAdminAuth } from "@frontend/modules/admin/auth";
import { AdminRole } from "@frontend/types/enums";
import type { RbacRole } from "@frontend/types/rbac";

interface Role {
  id: string;
  code: string;
  name: string;
  description: string | null;
  permissions: Record<string, string[]>;
  isSystem: boolean;
  isEditable: boolean;
}

export function UserRolesPage() {
  const { user: profile } = useAdminAuth();
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const canEdit = profile?.role === AdminRole.SUPER_ADMIN || profile?.role === AdminRole.ADMIN;

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    try {
      setLoading(true);
      const response = await fetch("/rbac/user/roles");
      const data = await response.json();
      setRoles(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка загрузки");
    } finally {
      setLoading(false);
    }
  };

  const getPermissionCount = (permissions: Record<string, string[]>) => {
    return Object.values(permissions).reduce((acc, actions) => acc + actions.length, 0);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-zinc-900">Роли пользователей Web App</h1>
        {canEdit && (
          <Button variant="solid">
            <Plus className="h-4 w-4" />
            Добавить роль
          </Button>
        )}
      </div>

      {error && <div className="p-4 bg-red-50 text-red-700 rounded-lg mb-4">{error}</div>}

      {loading ? (
        <div className="text-center py-12 text-zinc-500">Загрузка...</div>
      ) : roles.length === 0 ? (
        <div className="text-center py-12 text-zinc-500">Нет ролей</div>
      ) : (
        <div className="space-y-4">
          {roles.map((role) => (
            <div key={role.id} className="rounded-lg border border-zinc-200 bg-white p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100">
                    <Settings className="h-6 w-6 text-zinc-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-zinc-900">{role.name}</h3>
                      {role.isSystem && (
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-xs">
                          Системная
                        </span>
                      )}
                    </div>
                    <code className="text-xs text-zinc-500 mt-1 block">{role.code}</code>
                    {role.description && (
                      <p className="text-sm text-zinc-600 mt-2">{role.description}</p>
                    )}
                    <div className="mt-3 flex items-center gap-4 text-sm text-zinc-500">
                      <span>{getPermissionCount(role.permissions)} разрешений</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {canEdit && (
                    <>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                        Настроить
                      </Button>
                      {role.isEditable && (
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="mt-4 pt-4 border-t">
                <p className="text-xs text-zinc-500 uppercase tracking-wide mb-2">Разрешения</p>
                <div className="flex flex-wrap gap-1">
                  {Object.entries(role.permissions).map(([resource, actions]) => (
                    <span
                      key={resource}
                      className="px-2 py-1 bg-zinc-100 text-zinc-600 text-xs rounded"
                    >
                      {resource}: {actions.join(", ")}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
