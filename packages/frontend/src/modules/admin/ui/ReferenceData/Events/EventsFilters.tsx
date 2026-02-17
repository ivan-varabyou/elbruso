"use client";

import { Reference } from "@frontend/api";
import { SportResponseDto } from "@frontend/api/data-contracts";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const referenceApi = new Reference();

interface EventsFiltersProps {
  sportId?: number;
  onFilterChange: (filters: { sportId?: number; search?: string }) => void;
}

export function EventsFilters({ sportId, onFilterChange }: EventsFiltersProps) {
  const [sports, setSports] = useState<SportResponseDto[]>([]);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await referenceApi.sportsControllerFindAll();
        setSports((response.data as any).data || []);
      } catch (error) {
        console.error("Failed to fetch sports:", error);
      }
    };
    fetchSports();
  }, []);

  return (
    <div className="flex items-center gap-4 flex-1">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
        <input
          type="text"
          placeholder="Поиск по названию или коду..."
          className="w-full pl-10 pr-4 py-2 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/5 transition-all text-zinc-900"
          onChange={(e) => onFilterChange({ search: e.target.value })}
        />
      </div>

      <select
        value={sportId || ""}
        onChange={(e) => onFilterChange({ sportId: e.target.value ? Number(e.target.value) : undefined })}
        className="px-3 py-2 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/5 transition-all text-zinc-900"
      >
        <option value="">Все виды спорта</option>
        {sports.map((sport) => (
          <option key={sport.id} value={sport.id}>
            {sport.name}
          </option>
        ))}
      </select>
    </div>
  );
}
