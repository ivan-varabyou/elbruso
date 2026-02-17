"use client";

import { Reference } from "@frontend/api";
import { CreateLicenseCategoryDto, LicenseCategoryResponseDto, UpdateLicenseCategoryDto } from "@frontend/api/data-contracts";
import { Spinner } from "@heroui/react";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

import { LicenseCategoriesFilters } from "./LicenseCategoriesFilters";
import { LicenseCategoriesList } from "./LicenseCategoriesList";
import { LicenseCategoryFormModal } from "./LicenseCategoryFormModal";

const referenceApi = new Reference();

export function LicenseCategoriesSmart() {
  const [categories, setCategories] = useState<LicenseCategoryResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<LicenseCategoryResponseDto | null>(null);
  const [filters, setFilters] = useState({
    sportId: undefined as number | undefined,
    search: "",
  });

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await referenceApi.licenseCategoriesControllerFindAll({
        sportId: filters.sportId,
      });
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch license categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [filters.sportId]);

  const handleCreate = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category: LicenseCategoryResponseDto) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Вы уверены, что хотите удалить эту категорию?")) return;
    try {
      await referenceApi.licenseCategoriesControllerDelete(id);
      fetchCategories();
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  const handleSave = async (data: CreateLicenseCategoryDto | UpdateLicenseCategoryDto) => {
    try {
      if (editingCategory) {
        await referenceApi.licenseCategoriesControllerUpdate(editingCategory.id, data);
      } else {
        await referenceApi.licenseCategoriesControllerCreate(data);
      }
      setIsModalOpen(false);
      fetchCategories();
    } catch (error) {
      console.error("Failed to save category:", error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <LicenseCategoriesFilters 
          onFilterChange={(newFilters: { sportId?: number; search?: string }) => setFilters({ ...filters, ...newFilters })} 
          sportId={filters.sportId}
        />
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Добавить категорию
        </button>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <Spinner size="lg" />
        </div>
      ) : (
        <LicenseCategoriesList 
          categories={categories} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      )}

      <LicenseCategoryFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingCategory}
      />
    </div>
  );
}
