"use client";

import { useReferenceStore } from "@frontend/stores";
import type { SystemEntityType } from "@frontend/types/enums";
import { useEffect, useState } from "react";

interface ReferenceSelectorProps {
  type: SystemEntityType;
  onSelect: (items: unknown[]) => void;
  multiSelect?: boolean;
}

export function ReferenceSelector({ type, onSelect, multiSelect = false }: ReferenceSelectorProps) {
  const {
    regions,
    sports,
    indicators,
    indicatorGroups,
    fetchRegions,
    fetchSports,
    fetchIndicators,
    fetchIndicatorGroups,
    isLoading,
  } = useReferenceStore();

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    switch (type) {
      case "regions":
        fetchRegions();
        break;
      case "sports":
        fetchSports();
        break;
      case "indicators":
        fetchIndicators();
        break;
      case "indicator-groups":
        fetchIndicatorGroups();
        break;
    }
  }, [type]);

  const getData = () => {
    switch (type) {
      case "regions":
        return regions;
      case "sports":
        return sports;
      case "indicators":
        return indicators;
      case "indicator-groups":
        return indicatorGroups;
      default:
        return [];
    }
  };

  const data = getData();

  const filteredData = data.filter((item: { name_ru?: string; code?: string }) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return item.name_ru?.toLowerCase().includes(query) || item.code?.toLowerCase().includes(query);
  });

  const handleToggle = (id: string | number) => {
    const idStr = String(id);
    const newSelected = new Set(selectedIds);
    if (newSelected.has(idStr)) {
      newSelected.delete(idStr);
    } else {
      if (!multiSelect) {
        newSelected.clear();
      }
      newSelected.add(idStr);
    }
    setSelectedIds(newSelected);

    const selectedItems = data.filter((item: { id: string | number }) =>
      newSelected.has(String(item.id)),
    );
    onSelect(selectedItems);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-zinc-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Search */}
      <div className="p-4 border-b border-zinc-200">
        <input
          type="text"
          placeholder="Поиск..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {filteredData.length === 0 ? (
          <div className="p-8 text-center text-zinc-500">Ничего не найдено</div>
        ) : (
          <div className="divide-y divide-zinc-100">
            {filteredData.map((item: { id: string | number; name_ru?: string; code?: string }) => (
              <div
                key={String(item.id)}
                onClick={() => handleToggle(item.id)}
                className={`p-3 cursor-pointer hover:bg-zinc-50 transition-colors ${
                  selectedIds.has(String(item.id)) ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type={multiSelect ? "checkbox" : "radio"}
                    checked={selectedIds.has(String(item.id))}
                    onChange={() => {}}
                    className="w-4 h-4"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-zinc-900">{item.name_ru}</div>
                    {item.code && <div className="text-sm text-zinc-500">{item.code}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-zinc-200 bg-zinc-50">
        <div className="text-sm text-zinc-600">
          Выбрано: {selectedIds.size} из {filteredData.length}
        </div>
      </div>
    </div>
  );
}
