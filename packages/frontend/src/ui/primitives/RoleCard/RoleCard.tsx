import React from "react";
import type { RbacRole } from "@frontend/types/rbac";
import { Shield, Settings, Trash2 } from "lucide-react";
import { Button } from "../Button";

interface RoleCardProps {
  role: RbacRole;
  onEdit?: (role: RbacRole) => void;
  onDelete?: (role: RbacRole) => void;
  readonly?: boolean;
}

export const RoleCard: React.FC<RoleCardProps> = ({ role, onEdit, onDelete, readonly = false }) => {
  const permissionCount = Object.values(role.permissions).reduce(
    (acc, actions) => acc + actions.length,
    0,
  );

  const getTypeColor = (type: string) => {
    switch (type) {
      case "admin":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "user":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-zinc-100 text-zinc-700 border-zinc-200";
    }
  };

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-zinc-100">
            <Shield className="h-5 w-5 text-zinc-600" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-zinc-900">{role.name}</h3>
              <span className={`px-2 py-0.5 text-xs rounded border ${getTypeColor(role.type)}`}>
                {role.type}
              </span>
            </div>

            <code className="text-xs text-zinc-500 mt-1 block">{role.code}</code>

            {role.description && <p className="text-sm text-zinc-600 mt-2">{role.description}</p>}

            <div className="mt-3 flex items-center gap-4 text-sm text-zinc-500">
              <span>{permissionCount} разрешений</span>
              {role.isSystem && (
                <span className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded text-xs">
                  Системная
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onEdit && role.isEditable && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(role)}
              leftIcon={<Settings className="h-4 w-4" />}
            >
              Настроить
            </Button>
          )}

          {onDelete && role.isEditable && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(role)}
              leftIcon={<Trash2 className="h-4 w-4" />}
              className="text-red-600 hover:text-red-700"
            >
              Удалить
            </Button>
          )}
        </div>
      </div>

      {/* Permissions Preview */}
      <div className="mt-4 pt-4 border-t">
        <p className="text-xs text-zinc-500 uppercase tracking-wide mb-2">Разрешения</p>
        <div className="flex flex-wrap gap-1">
          {Object.entries(role.permissions).map(([resource, actions]) => (
            <span key={resource} className="px-2 py-1 bg-zinc-100 text-zinc-600 text-xs rounded">
              {resource}: {actions.join(", ")}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleCard;
