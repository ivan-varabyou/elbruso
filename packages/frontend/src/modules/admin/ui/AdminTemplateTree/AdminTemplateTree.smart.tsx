"use client";

import { ChevronDown, ChevronRight, FileText, Loader2, Table } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import type { DynamicTable } from "@frontend/modules/table/types/table.types";
import { useTableStore } from "@frontend/stores/useTableStore";
import { useWorkspaceTemplateStore } from "@frontend/stores/useWorkspaceTemplate.store";
import type { WorkspaceTemplate } from "@frontend/api/workspace-template.api";

export function AdminTemplateTree() {
  const router = useRouter();
  const { templates, fetchAdminTemplates, isLoading } = useWorkspaceTemplateStore();
  const { tables, fetchTables } = useTableStore();
  const [expandedTemplates, setExpandedTemplates] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchAdminTemplates();
  }, [fetchAdminTemplates]);

  const toggleTemplate = async (templateId: string) => {
    const newExpanded = new Set(expandedTemplates);
    if (newExpanded.has(templateId)) {
      newExpanded.delete(templateId);
    } else {
      newExpanded.add(templateId);
      await fetchTables(templateId);
    }
    setExpandedTemplates(newExpanded);
    router.push(`/dashboard/templates/${templateId}`);
  };

  const handleTableClick = (tableId: string) => {
    router.push(`/dashboard/tables/${tableId}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <Loader2 className="h-4 w-4 animate-spin text-zinc-400" />
      </div>
    );
  }



  return (
    <div className="space-y-px">
      {templates.map((template: WorkspaceTemplate) => {
        const isExpanded = expandedTemplates.has(template.id);
        const templateTables = tables.filter((t: DynamicTable) => t.workspace_id === template.id);

        return (
          <div key={template.id}>
            <div
              onClick={() => toggleTemplate(template.id)}
              className="flex items-center gap-1.5 rounded px-2 py-1 text-[13px] text-zinc-600 transition-colors cursor-pointer hover:bg-zinc-50 hover:text-zinc-900"
            >
              {isExpanded ? (
                <ChevronDown className="h-3.5 w-3.5 flex-shrink-0" />
              ) : (
                <ChevronRight className="h-3.5 w-3.5 flex-shrink-0" />
              )}
              <FileText className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{template.name}</span>
            </div>

            {/* Tables under template */}
            {isExpanded && templateTables.length > 0 && (
              <div className="ml-6 mt-px space-y-px">
                {templateTables.map((table: { id: string; name: string }) => (
                  <div
                    key={table.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTableClick(table.id);
                    }}
                    className="flex items-center gap-1.5 rounded px-2 py-1 text-[13px] text-zinc-600 transition-colors cursor-pointer hover:bg-zinc-50 hover:text-zinc-900"
                  >
                    <Table className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="truncate">{table.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
