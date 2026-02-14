"use client";

import type { PermissionAction, PermissionDefinition, PermissionGroup } from "@frontend/types/rbac";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@frontend/ui/primitives";
import React, { useMemo } from "react";

import { Checkbox } from "../Checkbox";

interface PermissionsTreeProps {
  groups: PermissionGroup[];
  permissions?: Record<string, PermissionAction[]>;
  readonly?: boolean;
  onChange?: (group: string, permission: string, action: string, enabled: boolean) => void;
  onBulkChange?: (action: PermissionAction, enabled: boolean) => void;
}

const actionConfig: Record<
  Exclude<PermissionAction, "*">,
  { label: string; color: "primary" | "warning" | "success" | "danger"; bgColor: string }
> = {
  read: { label: "Просмотр", color: "primary", bgColor: "bg-blue-50/50" },
  write: { label: "Изменение", color: "warning", bgColor: "bg-orange-50/50" },
  create: { label: "Создание", color: "success", bgColor: "bg-green-50/50" },
  delete: { label: "Удаление", color: "danger", bgColor: "bg-red-50/50" },
};

export const PermissionsTree: React.FC<PermissionsTreeProps> = ({
  groups,
  permissions = {},
  readonly = false,
  onChange,
  onBulkChange,
}) => {
  const flatPermissions = useMemo(() => {
    return (groups || []).flatMap((group) =>
      group.permissions.map((p) => ({
        ...p,
        groupName: group.name,
      })),
    );
  }, [groups]);

  const getPermissionActions = (permission: PermissionDefinition): string[] => {
    const actions = permission.actions || ["read", "write", "delete", "create"];
    return actions.filter((a) => a !== "*");
  };

  const getColumnState = (action: string) => {
    const availablePermissions = flatPermissions.filter((p) =>
      getPermissionActions(p).includes(action),
    );

    if (availablePermissions.length === 0) return { checked: false, indeterminate: false };

    const selectedCount = availablePermissions.filter((p) => {
      const hasAction = (permissions[p.code] || []).includes(action as PermissionAction);
      return hasAction;
    }).length;

    return {
      checked: selectedCount === availablePermissions.length,
      indeterminate: selectedCount > 0 && selectedCount < availablePermissions.length,
    };
  };

  const actions = Object.entries(actionConfig) as [
    Exclude<PermissionAction, "*">,
    (typeof actionConfig)["read"],
  ][];

  return (
    <div className="border border-zinc-200 rounded-xl overflow-hidden bg-white shadow-sm">
      <Table aria-label="Таблица разрешений" removeWrapper className="min-w-full">
        <TableHeader>
          <TableColumn className="bg-zinc-100 text-zinc-500 font-bold py-4 px-6 border-b border-zinc-200 uppercase text-[11px] tracking-wider w-32">
            Группа
          </TableColumn>
          <TableColumn className="bg-zinc-100 text-zinc-500 font-bold py-4 px-6 border-b border-zinc-200 uppercase text-[11px] tracking-wider">
            Разрешение
          </TableColumn>
          <TableColumn className="bg-blue-50/50 text-zinc-600 font-bold py-0.5 border-b border-zinc-200 uppercase text-[11px] tracking-wider text-center w-24 cursor-pointer hover:brightness-95 transition-all">
            <div
              className="flex flex-col items-center gap-2 py-4 h-full"
              onClick={(e) => {
                e.stopPropagation();
                if (!readonly) onBulkChange?.("read", !getColumnState("read").checked);
              }}
            >
              <span className="leading-none pointer-events-none">Просмотр</span>
              {!readonly && (
                <div className="pointer-events-none">
                  <Checkbox
                    size="sm"
                    color="primary"
                    checked={getColumnState("read").checked}
                    isIndeterminate={getColumnState("read").indeterminate}
                  />
                </div>
              )}
            </div>
          </TableColumn>
          <TableColumn className="bg-orange-50/50 text-zinc-600 font-bold py-0.5 border-b border-zinc-200 uppercase text-[11px] tracking-wider text-center w-24 cursor-pointer hover:brightness-95 transition-all">
            <div
              className="flex flex-col items-center gap-2 py-4 h-full"
              onClick={(e) => {
                e.stopPropagation();
                if (!readonly) onBulkChange?.("write", !getColumnState("write").checked);
              }}
            >
              <span className="leading-none pointer-events-none">Изменение</span>
              {!readonly && (
                <div className="pointer-events-none">
                  <Checkbox
                    size="sm"
                    color="warning"
                    checked={getColumnState("write").checked}
                    isIndeterminate={getColumnState("write").indeterminate}
                  />
                </div>
              )}
            </div>
          </TableColumn>
          <TableColumn className="bg-green-50/50 text-zinc-600 font-bold py-0.5 border-b border-zinc-200 uppercase text-[11px] tracking-wider text-center w-24 cursor-pointer hover:brightness-95 transition-all">
            <div
              className="flex flex-col items-center gap-2 py-4 h-full"
              onClick={(e) => {
                e.stopPropagation();
                if (!readonly) onBulkChange?.("create", !getColumnState("create").checked);
              }}
            >
              <span className="leading-none pointer-events-none">Создание</span>
              {!readonly && (
                <div className="pointer-events-none">
                  <Checkbox
                    size="sm"
                    color="success"
                    checked={getColumnState("create").checked}
                    isIndeterminate={getColumnState("create").indeterminate}
                  />
                </div>
              )}
            </div>
          </TableColumn>
          <TableColumn className="bg-red-50/50 text-zinc-600 font-bold py-0.5 border-b border-zinc-200 uppercase text-[11px] tracking-wider text-center w-24 cursor-pointer hover:brightness-95 transition-all">
            <div
              className="flex flex-col items-center gap-2 py-4 h-full"
              onClick={(e) => {
                e.stopPropagation();
                if (!readonly) onBulkChange?.("delete", !getColumnState("delete").checked);
              }}
            >
              <span className="leading-none pointer-events-none">Удаление</span>
              {!readonly && (
                <div className="pointer-events-none">
                  <Checkbox
                    size="sm"
                    color="danger"
                    checked={getColumnState("delete").checked}
                    isIndeterminate={getColumnState("delete").indeterminate}
                  />
                </div>
              )}
            </div>
          </TableColumn>
        </TableHeader>
        <TableBody emptyContent="Разрешения не найдены">
          {flatPermissions.map((permission) => {
            const currentActions = permissions[permission.code] || [];
            const availableActions = getPermissionActions(permission);

            const renderCell = (action: Exclude<PermissionAction, "*">) => {
              const hasAction = availableActions.includes(action);
              const config = actionConfig[action];
              const isChecked = currentActions.includes(action);

              return (
                <TableCell
                  key={action}
                  onClick={(e) => {
                    if (readonly || !hasAction) return;
                    e.stopPropagation();
                    onChange?.(permission.groupName, permission.code, action, !isChecked);
                  }}
                  className={`py-4 px-6 text-center align-middle border-r border-zinc-100 last:border-r-0 cursor-pointer hover:bg-zinc-50/80 transition-colors ${config.bgColor.replace("/50", "/10")}`}
                >
                  {hasAction ? (
                    <div className="flex justify-center items-center h-full w-full pointer-events-none">
                      <Checkbox
                        key={`${permission.code}-${action}`}
                        size="md"
                        color={config.color}
                        checked={isChecked}
                        disabled={readonly}
                      />
                    </div>
                  ) : (
                    <span className="text-zinc-200 font-light select-none">—</span>
                  )}
                </TableCell>
              );
            };

            return (
              <TableRow
                key={permission.code}
                className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50/40 transition-colors"
              >
                <TableCell className="py-4 px-6 align-top border-r border-zinc-100 bg-zinc-50/30">
                  <span className="text-[12px] font-extrabold text-zinc-400 uppercase tracking-tighter">
                    {permission.groupName}
                  </span>
                </TableCell>
                <TableCell className="py-4 px-6 align-top border-r border-zinc-100 bg-white">
                  <div className="flex flex-col">
                    <span className="text-[14px] font-semibold text-zinc-900">
                      {permission.name}
                    </span>
                    <code className="text-[10px] text-zinc-500 font-mono mt-0.5 tracking-tight">
                      {permission.code}
                    </code>
                    {permission.description && (
                      <p className="text-[11px] text-zinc-400 mt-1.5 leading-relaxed font-medium">
                        {permission.description}
                      </p>
                    )}
                  </div>
                </TableCell>
                {renderCell("read")}
                {renderCell("write")}
                {renderCell("create")}
                {renderCell("delete")}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default PermissionsTree;
