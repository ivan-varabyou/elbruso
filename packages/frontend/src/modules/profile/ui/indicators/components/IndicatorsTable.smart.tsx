"use client";

import { IndicatorResponseDto } from "@frontend/api/data-contracts";
import { Reference } from "@frontend/api/reference.api";
import { Button, Checkbox, Input, Spinner } from "@frontend/ui/primitives";
import { ChevronLeft, ChevronRight, FileSpreadsheet, Search, Trash2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { FilterDropdown } from "./FilterDropdown.smart";
import { IndicatorsTableDumb } from "./IndicatorsTable.dumb";

const referenceApi = new Reference();

export interface IndicatorsTableProps {
  onEdit: (indicator: IndicatorResponseDto) => void;
  onDelete: (id: string) => void;
  onCreate: () => void;
  onGenerate: () => void;
}

const PAGE_SIZE = 20;

const SCOPE_OPTIONS = [
  { value: "global", label: "Глобальные" },
  { value: "sport", label: "Вид спорта" },
  { value: "federation", label: "Федерация" },
  { value: "personal", label: "Личные" },
];

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function IndicatorsTableSmart({
  onEdit,
  onDelete,
  onCreate,
  onGenerate,
}: IndicatorsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedScopes, setSelectedScopes] = useState<string[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [indicators, setIndicators] = useState<IndicatorResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useDebounce(searchQuery, 300);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchIndicators = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    setIsLoading(true);
    setError(null);

    console.log("[IndicatorsTable] Fetching indicators", {
      page,
      pageSize: PAGE_SIZE,
      search: debouncedSearch,
      scopes: selectedScopes,
    });

    try {
      const response = (await referenceApi.indicatorsControllerFindAll(
        {
          search: debouncedSearch || undefined,
          scopes: selectedScopes.length > 0 ? selectedScopes : undefined,
        },
        { signal: abortControllerRef.current.signal },
      )) as unknown as { data: { total: number; data: IndicatorResponseDto[] } };

      console.log("[IndicatorsTable] Fetch success", {
        total: response.data.total,
        dataLength: response.data.data?.length,
      });

      setIndicators(response.data.data);
      setTotal(response.data.total);
    } catch (err: any) {
      if (err?.name === "AbortError" || err?.message === "canceled" || err?.name === "CanceledError") {
        return;
      }
      console.error("[IndicatorsTable] Fetch error", {
        error: err instanceof Error ? err.message : "Unknown error",
      });
      setError(err instanceof Error ? err.message : "Failed to fetch indicators");
    } finally {
      setIsLoading(false);
    }
  }, [page, debouncedSearch, selectedScopes]);

  useEffect(() => {
    fetchIndicators();
  }, [fetchIndicators]);

  const handlePageChange = useCallback(
    (newPage: number) => {
      console.log("[IndicatorsTable] Page changed", {
        from: page,
        to: newPage,
        pageSize: PAGE_SIZE,
      });
      setPage(newPage);
    },
    [page],
  );

  const handleSearchChange = useCallback((value: string) => {
    console.log("[IndicatorsTable] Search input changed", { value });
    setSearchQuery(value);
    setPage(1);
  }, []);

  const handleScopeChange = useCallback((scopes: string[]) => {
    console.log("[IndicatorsTable] Scope filter changed", { scopes });
    setSelectedScopes(scopes);
    setPage(1);
  }, []);

  const handleSelectAll = useCallback(() => {
    if (selectedIds.size === indicators.length) {
      console.log("[IndicatorsTable] Deselect all", {
        previousCount: selectedIds.size,
      });
      setSelectedIds(new Set());
    } else {
      console.log("[IndicatorsTable] Select all", {
        totalCount: indicators.length,
      });
      setSelectedIds(new Set(indicators.map((i) => String(i.id))));
    }
  }, [selectedIds, indicators]);

  const handleSelectRow = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        console.log("[IndicatorsTable] Row deselected", { id });
        newSet.delete(id);
      } else {
        console.log("[IndicatorsTable] Row selected", { id });
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const handleBulkDelete = useCallback(() => {
    console.log("[IndicatorsTable] Bulk delete", {
      selectedIds: Array.from(selectedIds),
    });
    selectedIds.forEach((id) => onDelete(id));
    setSelectedIds(new Set());
  }, [selectedIds, onDelete]);

  const handleRowClick = useCallback(
    (indicator: IndicatorResponseDto) => {
      console.log("[IndicatorsTable] Row clicked", {
        id: indicator.id,
        name: indicator.name_ru,
      });
      onEdit(indicator);
    },
    [onEdit],
  );

  const handleCreate = useCallback(() => {
    console.log("[IndicatorsTable] Create button clicked");
    onCreate();
  }, [onCreate]);

  const handleGenerate = useCallback(() => {
    console.log("[IndicatorsTable] Generate button clicked");
    onGenerate();
  }, [onGenerate]);

  const isAllSelected = indicators.length > 0 && selectedIds.size === indicators.length;
  const isIndeterminate = selectedIds.size > 0 && selectedIds.size < indicators.length;

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const dumbProps = useMemo(
    () => ({
      indicators,
      selectedIds,
      onSelectRow: handleSelectRow,
      onRowClick: handleRowClick,
      onEdit,
      onDelete: (id: string) => {
        console.log("[IndicatorsTable] Delete clicked", { id });
        onDelete(id);
      },
    }),
    [indicators, selectedIds, handleSelectRow, handleRowClick, onEdit, onDelete],
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-default-400" />
            <Input
              placeholder="Поиск показателей..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-9 w-64"
            />
          </div>
          <FilterDropdown
            options={SCOPE_OPTIONS}
            selected={selectedScopes}
            onChange={handleScopeChange}
            label="Область"
            icon={FileSpreadsheet}
          />
        </div>
      </div>

      {selectedIds.size > 0 && (
        <div className="flex items-center gap-3 p-3 bg-default-100 rounded-lg border">
          <Checkbox
            isSelected={isAllSelected}
            isIndeterminate={isIndeterminate}
            onChange={handleSelectAll}
          />
          <span className="text-sm text-default-500">Выбрано: {selectedIds.size}</span>
          <Button color="danger" size="sm" onClick={handleBulkDelete} className="ml-auto">
            <Trash2 className="h-4 w-4 mr-2" />
            Удалить выбранные
          </Button>
        </div>
      )}

      <div className="relative min-h-[400px]">
        {isLoading && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-10">
            <Spinner size="lg" />
          </div>
        )}
        {error && <div className="p-4 text-danger bg-danger/10 rounded-lg">Ошибка: {error}</div>}
        {!error && <IndicatorsTableDumb {...dumbProps} />}
      </div>

      {total > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-default-500">
            Показано {indicators.length} из {total} записей
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="bordered"
              size="sm"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              Страница {page} из {totalPages}
            </span>
            <Button
              variant="bordered"
              size="sm"
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
