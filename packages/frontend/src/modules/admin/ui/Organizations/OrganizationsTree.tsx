"use client";

import { Organization, OrganizationTreeNode,useOrganizationsStore } from "@frontend/stores/useOrganizationsStore";
import { Building2,ChevronDown, ChevronRight, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

interface OrganizationsTreeProps {
  onEdit: (org: Organization) => void;
  onDelete: (org: Organization) => void;
}

interface TreeNodeProps {
  node: OrganizationTreeNode;
  level: number;
  onEdit: (org: Organization) => void;
  onDelete: (org: Organization) => void;
}

function TreeNode({ node, level, onEdit, onDelete }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(level < 2);

  const hasChildren = node.children && node.children.length > 0;

  return (
    <div>
      <div
        className="flex items-center gap-2 py-2 px-3 hover:bg-zinc-50 rounded group"
        style={{ paddingLeft: `${level * 24 + 12}px` }}
      >
        {hasChildren ? (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-shrink-0 p-0.5 hover:bg-zinc-200 rounded"
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 text-zinc-600" />
            ) : (
              <ChevronRight className="h-4 w-4 text-zinc-600" />
            )}
          </button>
        ) : (
          <div className="w-5" />
        )}

        <Building2 className="h-4 w-4 text-zinc-400 flex-shrink-0" />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-zinc-900 truncate">{node.name_ru}</span>
            {node.abbreviation_ru && (
              <span className="text-xs text-zinc-500">({node.abbreviation_ru})</span>
            )}
            {!node.is_active && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                Неактивна
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <span>ID: {node.id}</span>
            <span>•</span>
            <span>Тип: {node.type_id}</span>
            <span>•</span>
            <span>Уровень: {node.level_id}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(node)}
            className="p-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded transition-colors"
            title="Редактировать"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onDelete(node)}
            className="p-1.5 text-zinc-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
            title="Удалить"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {isExpanded && hasChildren && (
        <div>
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function OrganizationsTree({ onEdit, onDelete }: OrganizationsTreeProps) {
  const { tree, organizations } = useOrganizationsStore();

  if (!tree && organizations.length === 0) {
    return (
      <div className="text-center py-12 text-zinc-500">
        Организации не найдены
      </div>
    );
  }

  // Build tree from organizations if tree is not available
  const buildTree = (parentId: number | null): OrganizationTreeNode[] => {
    return organizations
      .filter((org) => org.parent_id === parentId)
      .map((org) => ({
        ...org,
        children: buildTree(org.id),
      }));
  };

  const rootNodes = tree ? [tree] : buildTree(null);

  if (rootNodes.length === 0) {
    return (
      <div className="text-center py-12 text-zinc-500">
        Корневые организации не найдены
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {rootNodes.map((node) => (
        <TreeNode key={node.id} node={node} level={0} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
