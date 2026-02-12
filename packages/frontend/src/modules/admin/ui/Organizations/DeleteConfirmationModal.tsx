"use client";

import { Organization,useOrganizationsStore } from "@frontend/stores/useOrganizationsStore";
import { AlertTriangle, X } from "lucide-react";
import { useState } from "react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  organization: Organization;
  onClose: () => void;
}

export function DeleteConfirmationModal({ isOpen, organization, onClose }: DeleteConfirmationModalProps) {
  const { deleteOrganization } = useOrganizationsStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      await deleteOrganization(organization.id);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при удалении организации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <h2 className="text-lg font-semibold text-zinc-900">Удалить организацию</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-zinc-100 rounded transition-colors"
          >
            <X className="h-5 w-5 text-zinc-500" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
              {error}
            </div>
          )}

          <p className="text-sm text-zinc-700">
            Вы уверены, что хотите удалить организацию{' '}
            <span className="font-semibold">{organization.name_ru}</span>?
          </p>

          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm text-yellow-800">
              Это действие выполнит мягкое удаление (soft delete). Организация будет помечена как неактивная,
              но данные сохранятся в системе.
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 rounded transition-colors"
            >
              Отмена
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Удаление...' : 'Удалить'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
