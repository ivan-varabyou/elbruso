"use client";

import { apiClient } from "@frontend/api/admin/client";
import { ApiResponse } from "@frontend/types";
import { ProfilePageLayout } from "@frontend/ui/layout/ProfilePageLayout/ProfilePageLayout";
import { Spinner } from "@heroui/react";
import {
  AllCommunityModule,
  type CellClassParams,
  type CellValueChangedEvent,
  type ColDef,
  type ICellRendererParams,
  type IRowNode,
  ModuleRegistry,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { type AxiosResponse } from "axios";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Database, Edit, ExternalLink, Search, Trash2, X } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { InlineEditConfirmationModal } from "./components/InlineEditConfirmationModal";
import { ReferenceFormModal } from "./ReferenceFormModal";
import type { ReferenceTableConfig } from "./types";

// Register all community modules
ModuleRegistry.registerModules([AllCommunityModule]);

interface ReferenceTablePageProps {
  tableKey: string;
}

export interface ApiReferenceResponse<T = Record<string, unknown>> {
  data: T[];
  total: number;
  config: ReferenceTableConfig;
}

export type AxiosReferenceResponse = AxiosResponse<ApiResponse<ApiReferenceResponse>>;

export function ReferenceTablePage({ tableKey }: ReferenceTablePageProps) {
  const [config, setConfig] = useState<ReferenceTableConfig | null>(null);
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<Record<string, unknown> | null>(null);
  const [relatedData, setRelatedData] = useState<Record<string, Record<string, unknown>[]>>({});

  // Inline edit state
  const [pendingEdit, setPendingEdit] = useState<{
    node: IRowNode;
    field: string;
    oldValue: unknown;
    newValue: unknown;
    displayOldValue: unknown;
    displayNewValue: unknown;
    columnLabel: string;
  } | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const isRevertingRef = useRef(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  // Config is loaded from the API response on fetchData — no static fallback needed.

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = { search };
      const response = await apiClient.get<ApiResponse<ApiReferenceResponse>>(
        `reference/data/${tableKey}`,
        { params },
      );
      const apiResponse = response.data;

      if (apiResponse.success && apiResponse.data) {
        const referenceData = apiResponse.data;
        setRows(referenceData.data);
        if (referenceData.config) {
          setConfig(referenceData.config);
        }
      } else {
        setRows([]);
      }
    } catch (error) {
      console.error("Failed to fetch reference data:", error);
    } finally {
      setLoading(false);
    }
  }, [tableKey, search]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!config) return;
    const tablesToFetch = Array.from(
      new Set(config.columns.filter((c) => c.relation).map((c) => c.relation!.table)),
    );

    tablesToFetch.forEach(async (t) => {
      try {
        const response = await apiClient.get<AxiosReferenceResponse>(`reference/data/${t}`);
        const responseData = response.data.data.data;
        if (Array.isArray(responseData)) {
          setRelatedData((prev) => ({ ...prev, [t]: responseData }));
        }
      } catch (error) {
        console.error(`Failed to fetch related table ${t}:`, error);
      }
    });
  }, [config]);

  const handleCreate = () => {
    setEditingRow(null);
    setIsModalOpen(true);
  };

  const handleEdit = (row: Record<string, unknown>) => {
    setEditingRow(row);
    setIsModalOpen(true);
  };

  const handleDelete = async (row: Record<string, unknown>) => {
    if (!config) return;
    const isSystem =
      (config.hasIsSystem && row.is_system === true) ||
      (config.hasSortOrder && row.sort_order === 100);

    const message = isSystem
      ? "Это системная запись. Она будет деактивирована, но не удалена из базы. Продолжить?"
      : "Вы уверены, что хотите удалить эту запись?";

    if (!confirm(message)) return;

    try {
      await apiClient.delete(`reference/data/${tableKey}/${row.id}`);
      fetchData();
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const handleSave = async (data: Record<string, unknown>) => {
    try {
      if (editingRow && config) {
        await apiClient.patch(`reference/data/${tableKey}/${editingRow.id}`, data);
      } else {
        await apiClient.post(`reference/data/${tableKey}`, data);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Failed to save:", error);
    }
  };

  const onCellValueChanged = useCallback(
    async (params: CellValueChangedEvent) => {
      if (!config || isRevertingRef.current || isConfirmModalOpen) return;
      const { data, colDef, newValue, oldValue, node } = params;
      const field = colDef.field;

      // Normalize values for comparison (handles null/undefined and number/string mismatches)
      const normalize = (v: unknown) =>
        v === null || v === undefined || v === "" ? "" : String(v);

      const oldVal = normalize(oldValue);
      const newVal = normalize(newValue);

      if (oldVal === newVal || !field) return;

      const column = config.columns.find((c) => c.key === field);
      if (!column) return;

      const skipConfirm = localStorage.getItem("elbruso_skip_inline_confirm") === "true";

      if (skipConfirm) {
        try {
          await apiClient.patch(`reference/data/${tableKey}/${data.id}`, {
            [field]: newValue,
          });
          // Refresh data to ensure UI is in sync (especially if there are calculations/triggers)
          fetchData();
        } catch (error) {
          console.error("Failed to update cell:", error);
          // Revert on error
          isRevertingRef.current = true;
          params.node.setDataValue(field, oldValue);
          setTimeout(() => {
            isRevertingRef.current = false;
          }, 0);
        }
      } else {
        // Resolve labels for confirmation modal if it's a relation
        let displayOldValue = oldValue;
        let displayNewValue = newValue;

        if (column.relation) {
          const refData = colDef.refData;
          if (refData) {
            displayOldValue = (refData as Record<string, string>)[String(oldValue)] || oldValue;
            displayNewValue = (refData as Record<string, string>)[String(newValue)] || newValue;
          }
        }

        setPendingEdit({
          node,
          field,
          oldValue,
          newValue,
          displayOldValue,
          displayNewValue,
          columnLabel: column.label,
        });
        setIsConfirmModalOpen(true);
      }
    },
    [config, tableKey, fetchData, isConfirmModalOpen],
  );

  const confirmInlineEdit = async (skipNextTime: boolean) => {
    if (!pendingEdit) return;
    const { node, field, newValue, oldValue } = pendingEdit;
    const data = node.data;

    if (!field) {
      setIsConfirmModalOpen(false);
      setPendingEdit(null);
      return;
    }

    if (skipNextTime) {
      localStorage.setItem("elbruso_skip_inline_confirm", "true");
    }

    try {
      await apiClient.patch(`reference/data/${tableKey}/${data.id}`, {
        [field]: newValue,
      });
      setIsConfirmModalOpen(false);
      setPendingEdit(null);
      fetchData();
    } catch (error) {
      console.error("Failed to update cell:", error);
      isRevertingRef.current = true;
      node.setDataValue(field, oldValue);
      setTimeout(() => {
        isRevertingRef.current = false;
      }, 0);
      setIsConfirmModalOpen(false);
      setPendingEdit(null);
    }
  };

  const cancelInlineEdit = () => {
    if (pendingEdit) {
      const { node, field, oldValue } = pendingEdit;
      if (field) {
        isRevertingRef.current = true;
        node.setDataValue(field, oldValue);
        setTimeout(() => {
          isRevertingRef.current = false;
        }, 0);
      }
    }
    setIsConfirmModalOpen(false);
    setPendingEdit(null);
  };

  const visibleColumns = useMemo(
    () => config?.columns.filter((c) => !c.hidden && c.key !== "id") || [],
    [config],
  );

  const columnDefs = useMemo<ColDef[]>(() => {
    if (!config) return [];

    const defs: ColDef[] = [
      {
        headerName: "ID",
        field: "id",
        width: 100,
        pinned: "left",
        cellRenderer: (params: ICellRendererParams) => {
          const isSystem =
            config &&
            ((config.hasIsSystem && params.data.is_system === true) ||
              (config.hasSortOrder && params.data.sort_order === 100));
          return (
            <div className="flex items-center gap-2 font-mono text-xs">
              {params.value}
              {isSystem && (
                <span className="px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-500 text-[9px] font-bold uppercase tracking-wider">
                  Sys
                </span>
              )}
            </div>
          );
        },
      },
      ...visibleColumns.map((col) => {
        const colDef: ColDef = {
          headerName: col.label,
          field: col.key,
          flex: 1,
          minWidth: 150,
          editable: (params) => {
            // System records might have partial protection, but generic reference manager usually allows editing if metadata says so.
            return !!col.editable;
          },
          cellClassRules: {
            "bg-blue-50/30": (params: CellClassParams) =>
              !!(col.editable && !params.node.isSelected()),
          },
        };

        if (col.relation) {
          const relTable = relatedData[col.relation.table] || [];
          const labelField = col.relation.labelField;

          // Create mapping for ag-grid refData (ID -> Label)
          const refData: Record<string, string> = {};
          relTable.forEach((item: Record<string, unknown>) => {
            refData[String(item.id)] = String(item[labelField]);
          });

          colDef.refData = refData;
          colDef.cellEditor = "agSelectCellEditor";
          colDef.cellEditorParams = (params: ICellRendererParams) => {
            const currentValue = String(params.value);
            const values = relTable.map((item: Record<string, unknown>) => String(item.id));

            // Move current value to the first position if it exists in the list
            const sortedValues = [...values];
            const index = sortedValues.indexOf(currentValue);
            if (index > -1) {
              sortedValues.splice(index, 1);
              sortedValues.unshift(currentValue);
            }

            return { values: sortedValues };
          };
        }

        colDef.cellRenderer = (params: ICellRendererParams) => {
          const value = params.value;
          if (value === null || value === undefined || value === "")
            return <span className="text-zinc-300">—</span>;

          if (col.format === "flag" && typeof value === "string") {
            const countryCode = value.toUpperCase();
            return (
              <div className="flex items-center h-full">
                <img
                  src={`https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png 2x`}
                  width="20"
                  alt={countryCode}
                  className="rounded-sm shadow-sm"
                />
              </div>
            );
          }

          if (col.relation) {
            const refDataValue = colDef.refData as Record<string, string> | undefined;
            const label = (refDataValue ? refDataValue[String(value)] : null) || String(value);

            const relItem = (relatedData[col.relation.table] || []).find(
              (item: Record<string, unknown>) => String(item.id) === String(value),
            );

            let flagCode: string | undefined = undefined;
            if (col.relation.table === "countries" && typeof relItem?.code_alpha2 === "string") {
              flagCode = relItem.code_alpha2.toLowerCase();
            }

            return (
              <div className="flex items-center justify-between gap-2 h-full w-full group">
                <div className="flex items-center gap-2 truncate">
                  {flagCode && (
                    <img
                      src={`https://flagcdn.com/w20/${flagCode}.png`}
                      width="20"
                      alt={label}
                      className="rounded-sm shrink-0"
                    />
                  )}
                  <span className="truncate">{label}</span>
                </div>
                <Link
                  href={`/reference/data/${col.relation.table}?id=${value}`}
                  onClick={(e) => e.stopPropagation()}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-zinc-100 text-zinc-400 hover:text-blue-600 transition-all shrink-0"
                  title="Перейти к записи"
                >
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            );
          }

          if (col.format === "date" || col.type === "date") {
            try {
              return format(new Date(String(value)), "dd.MM.yyyy", { locale: ru });
            } catch {
              return String(value);
            }
          }

          if (col.type === "boolean") {
            return (
              <span
                className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold ${value ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}
              >
                {value ? "ДА" : "НЕТ"}
              </span>
            );
          }

          return <span className="truncate block">{String(value)}</span>;
        };

        return colDef;
      }),
      {
        headerName: "",
        field: "actions",
        width: 100,
        pinned: "right",
        sortable: false,
        filter: false,
        resizable: false,
        cellRenderer: (params: ICellRendererParams) => (
          <div className="flex items-center justify-end gap-1 h-full">
            <button
              onClick={() => handleEdit(params.data)}
              className="p-1.5 rounded hover:bg-zinc-100 text-zinc-400 hover:text-zinc-600"
            >
              <Edit className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => handleDelete(params.data)}
              className="p-1.5 rounded hover:bg-red-50 text-zinc-400 hover:text-red-500"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ),
      },
    ];

    return defs;
  }, [config, relatedData, visibleColumns]);

  if (!config && !loading) {
    return (
      <div className="flex h-64 items-center justify-center text-zinc-500 font-medium">
        Справочник{" "}
        <code className="mx-2 px-1.5 py-0.5 bg-red-50 text-red-600 rounded border border-red-100">
          {tableKey}
        </code>{" "}
        не зарегистрирован
      </div>
    );
  }

  if (loading && !config) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner size="lg" label="Загрузка конфигурации..." />
      </div>
    );
  }

  // Final confirmation to satisfy TS that config is not null
  if (!config) return null;

  return (
    <ProfilePageLayout
      title={config.label}
      icon={Database}
      onAddClick={handleCreate}
      constructorLabel="Режим конструктора"
      constructorLink={`/reference/management/edit/${tableKey}`}
      actions={
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Поиск..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:border-zinc-400 transition-all font-inter"
          />
        </div>
      }
    >
      <div className="space-y-4">
        {/* Active Filter Chips */}
        {config &&
          Array.from(searchParams.entries()).filter(([k]) => k !== "search").length > 0 && (
            <div className="flex flex-wrap gap-2">
              {Array.from(searchParams.entries())
                .filter(([k]) => k !== "search")
                .map(([key, val]) => {
                  const col = config.columns.find((c) => c.key === key);
                  const relTable = col?.relation ? relatedData[col.relation.table] : null;
                  const relItem = relTable?.find(
                    (item: Record<string, unknown>) => String(item.id) === val,
                  );
                  const label = relItem ? String(relItem[col!.relation!.labelField]) : val;

                  return (
                    <span
                      key={key}
                      className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs border border-blue-100"
                    >
                      <span className="text-blue-400 font-medium">{col?.label}:</span>
                      {label}
                      <button
                        onClick={() => {
                          const newParams = new URLSearchParams(searchParams.toString());
                          newParams.delete(key);
                          router.push(
                            `/reference/data/${tableKey}${newParams.toString() ? "?" + newParams.toString() : ""}`,
                          );
                        }}
                        className="p-0.5 hover:bg-blue-100 rounded-full transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  );
                })}
              <button
                onClick={() => router.push(`/reference/data/${tableKey}`)}
                className="text-xs text-zinc-400 hover:text-zinc-600 underline ml-1"
              >
                Сбросить всё
              </button>
            </div>
          )}

        {/* Table Section */}
        <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm h-[calc(100vh-200px)] min-h-[400px]">
          {loading ? (
            <div className="flex h-full items-center justify-center">
              <Spinner size="lg" />
            </div>
          ) : rows.length === 0 ? (
            <div className="flex h-full items-center justify-center text-zinc-400 text-sm">
              Нет данных {searchParams.toString() && "(попробуйте сбросить фильтры)"}
            </div>
          ) : (
            <div className="ag-theme-quartz h-full w-full">
              <AgGridReact
                rowData={rows}
                columnDefs={columnDefs}
                defaultColDef={{
                  resizable: true,
                  sortable: true,
                  filter: true,
                }}
                pagination={true}
                paginationPageSize={20}
                headerHeight={44}
                rowHeight={44}
                suppressCellFocus={false}
                enableCellTextSelection={true}
                onCellValueChanged={onCellValueChanged}
                undoRedoCellEditing={true}
                undoRedoCellEditingLimit={5}
              />
            </div>
          )}
        </div>

        {/* Inline Edit Confirmation */}
        {pendingEdit && (
          <InlineEditConfirmationModal
            isOpen={isConfirmModalOpen}
            oldValue={pendingEdit.displayOldValue}
            newValue={pendingEdit.displayNewValue}
            columnLabel={pendingEdit.columnLabel}
            onConfirm={confirmInlineEdit}
            onCancel={cancelInlineEdit}
          />
        )}

        {!loading && rows.length > 0 && (
          <div className="text-xs text-zinc-400">Всего записей: {rows.length}</div>
        )}

        <ReferenceFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          columns={config.columns}
          initialData={editingRow}
          tableLabel={config.label}
          relatedData={relatedData}
        />
      </div>
    </ProfilePageLayout>
  );
}
