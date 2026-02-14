import type { PermissionAction, PermissionGroup, RbacRole } from "@frontend/types/rbac";
import { Button } from "@frontend/ui/primitives";
import { RotateCcw, Save, X } from "lucide-react";
import React, { useEffect, useState } from "react";

import { PermissionsTree } from "../PermissionsTree";

interface RolePermissionsEditorProps {
  role: RbacRole;
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    roleId: string,
    permissions: Record<string, PermissionAction[]>,
    weight: number,
  ) => Promise<void>;
  permissionsTree?: {
    groups: PermissionGroup[];
  };
}

export const RolePermissionsEditor: React.FC<RolePermissionsEditorProps> = ({
  role,
  isOpen,
  onClose,
  onSave,
  permissionsTree,
}) => {
  const [permissions, setPermissions] = useState<Record<string, PermissionAction[]>>({});
  const [weight, setWeight] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (isOpen && role) {
      setPermissions(role.permissions || {});
      setWeight(role.weight || 0);
      setHasChanges(false);
    }
  }, [isOpen, role]);

  const handlePermissionChange = (
    _group: string,
    permission: string,
    action: string,
    enabled: boolean,
  ) => {
    setPermissions((prev) => {
      const currentActions = prev[permission] || [];
      const updatedActions = enabled
        ? [...currentActions, action as PermissionAction]
        : currentActions.filter((a) => a !== action);

      const updated = { ...prev, [permission]: updatedActions };
      return updated;
    });
    setHasChanges(true);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await onSave(role.id, permissions, weight);
      onClose();
    } catch (error) {
      console.error("[RolePermissionsEditor] error in onSave:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBulkChange = (action: PermissionAction, enabled: boolean) => {
    if (!permissionsTree?.groups) return;

    const allPermissions = permissionsTree.groups.flatMap((g) => g.permissions);
    
    setPermissions((prev) => {
      const updated = { ...prev };
      
      allPermissions.forEach((p) => {
        // Only update if the permission actually supports this action
        const availableActions = p.actions || ["read", "write", "create", "delete"];
        if (availableActions.includes(action) || availableActions.includes("*")) {
          const currentActions = updated[p.code] || [];
          if (enabled) {
            if (!currentActions.includes(action)) {
              updated[p.code] = [...currentActions, action];
            }
          } else {
            updated[p.code] = currentActions.filter((a) => a !== action);
          }
        }
      });
      
      return updated;
    });
    setHasChanges(true);
  };

  const handleReset = () => {
    setPermissions(role.permissions || {});
    setWeight(role.weight || 0);
    setHasChanges(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden border border-zinc-200">
        {/* Header */}
        <div className="px-8 py-6 border-b flex items-center justify-between bg-zinc-50/30">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
              Настройка разрешений: {role.name}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <code className="text-[10px] font-mono font-bold bg-zinc-200 text-zinc-700 px-2 py-0.5 rounded uppercase tracking-wider">
                {role.code}
              </code>
              <span className="text-xs text-zinc-400">•</span>
              <span className="text-xs text-zinc-400 font-medium">Конфигурация прав доступа</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end gap-1 mr-4">
              <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                Приоритет (Вес)
              </span>
              <input
                type="number"
                value={weight}
                onChange={(e) => {
                  setWeight(Number(e.target.value));
                  setHasChanges(true);
                }}
                className="w-20 bg-zinc-100 border border-zinc-200 rounded px-2 py-1 text-sm font-mono font-bold text-zinc-700 text-center focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="0"
                min="0"
                max="1000"
              />
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-zinc-200/50 rounded-full transition-all text-zinc-400 hover:text-zinc-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-0 bg-zinc-50/10">
          {permissionsTree?.groups ? (
            <div className="p-8">
              <PermissionsTree
                groups={permissionsTree.groups}
                permissions={permissions}
                onChange={handlePermissionChange}
                onBulkChange={handleBulkChange}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-zinc-400 gap-4">
              <div className="h-10 w-10 animate-spin rounded-full border-3 border-zinc-200 border-t-zinc-900" />
              <span className="text-sm font-medium animate-pulse">
                Загрузка дерева разрешений...
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t bg-white flex items-center justify-between shadow-[0_-4px_20px_0_rgba(0,0,0,0.03)]">
          <Button
            variant="light"
            onPress={handleReset}
            isDisabled={!hasChanges || loading}
            className="text-zinc-500 hover:text-zinc-900 font-medium"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Сбросить изменения
          </Button>

          <div className="flex items-center gap-4">
            <Button
              variant="light"
              onPress={onClose}
              className="text-zinc-500 hover:text-zinc-900 font-medium"
            >
              Отмена
            </Button>
            <Button
              variant="solid"
              color="primary"
              onPress={handleSave}
              isDisabled={!hasChanges || loading}
              className="px-8 font-semibold shadow-lg shadow-blue-500/20"
            >
              <div className="flex items-center gap-2">
                {loading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Сохранить
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolePermissionsEditor;
