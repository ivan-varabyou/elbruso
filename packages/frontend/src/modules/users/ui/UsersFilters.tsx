"use client";

import { Input, Button } from "@frontend/ui/primitives";
import { Search, Filter, X } from "lucide-react";
import { useUsersPageStore } from "../stores/useUsersPageStore";
import { UserStatus } from "../types/users.types";
import { useUsersPermissions } from "../hooks/useUsersPermissions";

export function UsersFilters() {
  const { filters, setFilters, selectedStatus, setSelectedStatus, fetchOrganizations } =
    useUsersPageStore();
  const { canCreate } = useUsersPermissions();

  const statuses: { value: UserStatus; label: string }[] = [
    { value: "all", label: "Все" },
    { value: "active", label: "Активные" },
    { value: "pending", label: "Ожидающие" },
    { value: "blocked", label: "Заблокированные" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      <div className="flex-1 min-w-[200px] max-w-md">
        <Input
          placeholder="Поиск по ФИО или email..."
          value={filters.search || ""}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
      </div>

      <div className="flex items-center gap-2">
        {statuses.map((status) => (
          <button
            key={status.value}
            onClick={() => setSelectedStatus(status.value)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              selectedStatus === status.value
                ? "bg-zinc-900 text-white"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
            }`}
          >
            {status.label}
          </button>
        ))}
      </div>

      {canCreate && (
        <Button
          variant="solid"
          onClick={() => {
            // TODO: Open create modal
            alert("Создание пользователя");
          }}
        >
          Создать пользователя
        </Button>
      )}
    </div>
  );
}
