"use client";

import { useOrganizationsStore } from "@frontend/stores/useOrganizationsStore";
import { Button, Input, Checkbox } from "@heroui/react";
import { List, Network, Plus, Search } from "lucide-react";

interface OrganizationsFiltersProps {
  onCreate: () => void;
}

export function OrganizationsFilters({ onCreate }: OrganizationsFiltersProps) {
  const { viewMode, setViewMode, filters, setFilters, clearFilters } = useOrganizationsStore();

  return (
    <div className="bg-white rounded-lg border border-zinc-100 p-4 space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Поиск по названию..."
            value={filters.search || ""}
            onValueChange={(value) => setFilters({ search: value })}
            startContent={<Search className="h-4 w-4 text-zinc-400" />}
          />
        </div>

        <Checkbox
          isSelected={filters.showInactive || false}
          onValueChange={(checked) => setFilters({ showInactive: checked })}
        >
          Показать неактивные
        </Checkbox>

        <div className="flex items-center gap-1 bg-zinc-100 rounded-lg p-1">
          <Button
            size="sm"
            variant={viewMode === "tree" ? "solid" : "flat"}
            onClick={() => setViewMode("tree")}
          >
            <Network className="h-4 w-4" />
            Дерево
          </Button>
          <Button
            size="sm"
            variant={viewMode === "list" ? "solid" : "flat"}
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
            Список
          </Button>
        </div>

        <Button onClick={onCreate}>
          <Plus className="h-4 w-4" />
          Создать организацию
        </Button>
      </div>

      {filters.search && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-500">Фильтры:</span>
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-zinc-100 text-xs rounded">
            Поиск: {filters.search}
            <button onClick={() => setFilters({ search: "" })}>
              <Search className="h-3 w-3" />
            </button>
          </span>
          <button onClick={clearFilters} className="text-xs text-zinc-500 underline">
            Очистить все
          </button>
        </div>
      )}
    </div>
  );
}
