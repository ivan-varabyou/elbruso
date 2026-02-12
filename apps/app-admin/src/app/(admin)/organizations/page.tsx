"use client";

import { useEffect, useState } from "react";
import { Building2, Plus, List, Network, Search, X } from "lucide-react";
import { useOrganizationsStore, Organization } from "@frontend/stores/useOrganizationsStore";
import { OrganizationsList } from "@frontend/modules/admin/ui/Organizations/OrganizationsList";
import { OrganizationsTree } from "@frontend/modules/admin/ui/Organizations/OrganizationsTree";
import { CreateOrganizationModal } from "@frontend/modules/admin/ui/Organizations/CreateOrganizationModal";
import { EditOrganizationModal } from "@frontend/modules/admin/ui/Organizations/EditOrganizationModal";
import { DeleteConfirmationModal } from "@frontend/modules/admin/ui/Organizations/DeleteConfirmationModal";

export default function OrganizationsPage() {
  const {
    viewMode,
    setViewMode,
    filters,
    setFilters,
    clearFilters,
    fetchOrganizations,
    fetchTree,
    loading,
    error,
    selectedOrganization,
    setSelectedOrganization,
  } = useOrganizationsStore();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [organizationToEdit, setOrganizationToEdit] = useState<Organization | null>(null);
  const [organizationToDelete, setOrganizationToDelete] = useState<Organization | null>(null);

  useEffect(() => {
    if (viewMode === "tree") {
      fetchTree();
    } else {
      fetchOrganizations();
    }
  }, [viewMode, fetchOrganizations, fetchTree]);

  const handleEdit = (org: Organization) => {
    setOrganizationToEdit(org);
    setIsEditModalOpen(true);
  };

  const handleDelete = (org: Organization) => {
    setOrganizationToDelete(org);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="bg-white rounded-lg border border-zinc-100 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-zinc-500" />
            <h3 className="font-bold text-zinc-900">Управление организациями</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 text-white text-sm rounded hover:bg-zinc-800 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Создать организацию
            </button>
          </div>
        </div>

        {/* Filters and View Toggle */}
        <div className="px-6 py-4 border-b border-zinc-100 bg-white">
          <div className="flex items-center justify-between gap-4">
            {/* Search */}
            <div className="flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Поиск по названию..."
                value={filters.search || ""}
                onChange={(e) => setFilters({ search: e.target.value })}
                className="w-full pl-9 pr-9 py-2 text-sm border border-zinc-200 rounded focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
              />
              {filters.search && (
                <button
                  onClick={() => setFilters({ search: "" })}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Show Inactive Toggle */}
            <label className="flex items-center gap-2 text-sm text-zinc-600 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.showInactive || false}
                onChange={(e) => setFilters({ showInactive: e.target.checked })}
                className="rounded border-zinc-300"
              />
              Показать неактивные
            </label>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-zinc-100 rounded p-1">
              <button
                onClick={() => setViewMode("tree")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded transition-colors ${
                  viewMode === "tree"
                    ? "bg-white text-zinc-900 shadow-sm"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                <Network className="h-4 w-4" />
                Дерево
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded transition-colors ${
                  viewMode === "list"
                    ? "bg-white text-zinc-900 shadow-sm"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                <List className="h-4 w-4" />
                Список
              </button>
            </div>
          </div>

          {/* Active Filters */}
          {Object.keys(filters).length > 0 && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs text-zinc-500">Фильтры:</span>
              {filters.search && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-zinc-100 text-xs rounded">
                  Поиск: {filters.search}
                  <button
                    onClick={() => setFilters({ search: "" })}
                    className="hover:text-zinc-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-xs text-zinc-500 hover:text-zinc-900 underline"
              >
                Очистить все
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
              {error}
            </div>
          )}

          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="h-8 w-8 border-2 border-zinc-200 border-t-zinc-900 rounded-full animate-spin" />
            </div>
          )}

          {!loading && viewMode === "tree" && (
            <OrganizationsTree onEdit={handleEdit} onDelete={handleDelete} />
          )}

          {!loading && viewMode === "list" && (
            <OrganizationsList onEdit={handleEdit} onDelete={handleDelete} />
          )}
        </div>
      </div>

      {/* Modals */}
      <CreateOrganizationModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {organizationToEdit && (
        <EditOrganizationModal
          isOpen={isEditModalOpen}
          organization={organizationToEdit}
          onClose={() => {
            setIsEditModalOpen(false);
            setOrganizationToEdit(null);
          }}
        />
      )}

      {organizationToDelete && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          organization={organizationToDelete}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setOrganizationToDelete(null);
          }}
        />
      )}
    </div>
  );
}
