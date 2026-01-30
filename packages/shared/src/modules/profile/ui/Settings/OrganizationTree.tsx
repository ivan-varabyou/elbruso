"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/shared/lib/auth";
import { apiClient } from "@/shared";
import { Building2, ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui";

interface OrgNode {
  id: number;
  name_ru: string;
  internal_code?: string;
  level_id: number;
  parent_id?: number | null;
  children: OrgNode[];
}

export function OrganizationTree() {
  const { user, setUser } = useAuth();
  const [tree, setTree] = useState<OrgNode | null>(null);
  const [loading, setLoading] = useState(true);
  const [allOrgs, setAllOrgs] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.organization_id) {
        setLoading(false);
        return;
      }
      try {
        const res = await apiClient.get(`/reference/organizations/${user.organization_id}/tree`);
        setTree(res.data);

        if (user.role === "ADMIN") {
          const allRes = await apiClient.get("/reference/organizations");
          setAllOrgs(allRes.data);
        }
      } catch (error) {
        console.error("Fetch org tree error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user?.organization_id, user?.role]);

  const handleSwitchOrg = async (orgId: number) => {
    if (!confirm("Вы уверены, что хотите переключить текущую организацию?")) return;
    try {
      const res = await apiClient.patch(`/users/${user?.id}/admin`, {
        organization_id: orgId,
      });
      setUser(res.data);
      alert("Организация успешно изменена");
    } catch (error) {
      console.error("Switch org error:", error);
      alert("Ошибка при смене организации");
    }
  };

  const handleSwitchRole = async (role: string) => {
    try {
      const res = await apiClient.patch(`/users/${user?.id}/admin`, {
        role: role,
      });
      setUser(res.data);
      alert(`Роль изменена на ${role}`);
    } catch (error) {
      console.error("Switch role error:", error);
    }
  };

  if (loading)
    return <div className="p-8 text-center text-zinc-500">Загрузка структуры организаций...</div>;

  return (
    <div className="space-y-6">
      {user?.role === "ADMIN" && (
        <div className="rounded-lg border border-zinc-100 bg-white p-6">
          <h2 className="text-lg font-semibold text-zinc-900 mb-4">Панель администратора</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-zinc-700 mb-2 block">
                Переключить роль
              </label>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={(user.role as string) === "ADMIN" ? "primary" : "outline"}
                  onClick={() => handleSwitchRole("ADMIN")}
                >
                  ADMIN
                </Button>
                <Button
                  size="sm"
                  variant={(user.role as string) === "USER" ? "primary" : "outline"}
                  onClick={() => handleSwitchRole("USER")}
                >
                  USER
                </Button>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-zinc-700 mb-2 block">
                Переключить организацию
              </label>
              <select
                onChange={(e) => handleSwitchOrg(Number(e.target.value))}
                value={user.organization_id || ""}
                className="flex-1 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-400 focus:border-zinc-300 focus:outline-none focus:ring-1 focus:ring-zinc-300"
              >
                <option value="">Без организации</option>
                {allOrgs.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.name_ru}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-lg border border-zinc-100 bg-white p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900">Ваша организация</h2>
            <p className="text-sm text-zinc-500 mt-1">Иерархия подчиненных структур</p>
          </div>
          {tree && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-zinc-100 text-zinc-700 text-sm">
              <Building2 className="h-4 w-4" />
              {tree.name_ru}
            </div>
          )}
        </div>

        {!tree ? (
          <div className="p-8 text-center bg-zinc-50 rounded-lg border border-dashed border-zinc-200">
            <Building2 className="h-8 w-8 text-zinc-300 mx-auto mb-3" />
            <p className="text-zinc-500">Вы не привязаны ни к одной организации</p>
          </div>
        ) : (
          <div className="space-y-1">
            <TreeNode node={tree} isRoot />
          </div>
        )}
      </div>
    </div>
  );
}

function TreeNode({
  node,
  depth = 0,
  isRoot = false,
}: {
  node: OrgNode;
  depth?: number;
  isRoot?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className={cn(!isRoot && "ml-6 border-l border-zinc-100 pl-4 py-1")}>
      <div
        className={cn(
          "flex items-center gap-2 p-2 rounded-md transition-colors cursor-pointer",
          isRoot ? "bg-zinc-900 text-white" : "hover:bg-zinc-50",
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {hasChildren ? (
            isOpen ? (
              <ChevronDown className="h-4 w-4 shrink-0" />
            ) : (
              <ChevronRight className="h-4 w-4 shrink-0" />
            )
          ) : (
            <div className="w-4 h-4" />
          )}
          <Building2 className="h-4 w-4 shrink-0" />
          <span className={cn("text-sm font-medium truncate", !isRoot && "text-zinc-700")}>
            {node.name_ru}
          </span>
          {node.internal_code && (
            <code
              className={cn(
                "text-xs px-1.5 py-0.5 rounded font-mono",
                isRoot ? "bg-white/20 text-white" : "bg-zinc-100 text-zinc-500",
              )}
            >
              {node.internal_code}
            </code>
          )}
        </div>

        {hasChildren && (
          <div
            className={cn(
              "px-2 py-0.5 rounded-full text-xs font-medium",
              isRoot ? "bg-white/20 text-white" : "bg-zinc-100 text-zinc-500",
            )}
          >
            {node.children.length}
          </div>
        )}
      </div>

      {hasChildren && isOpen && (
        <div className="mt-1 space-y-1">
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
