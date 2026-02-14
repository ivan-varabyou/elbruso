"use client";

import { Organization, useOrganizationsStore } from "@frontend/stores/useOrganizationsStore";
import { Modal } from "@frontend/ui/primitives";
import { Button } from "@heroui/react";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  organization: Organization;
  onClose: () => void;
}

export function DeleteConfirmationModal({
  isOpen,
  organization,
  onClose,
}: DeleteConfirmationModalProps) {
  const { deleteOrganization } = useOrganizationsStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      await deleteOrganization(organization.id);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка при удалении организации");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Удалить организацию"
      size="sm"
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="flat" onClick={onClose}>
            Отмена
          </Button>
          <Button color="danger" isLoading={loading} onClick={handleDelete}>
            Удалить
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
            {error}
          </div>
        )}

        <p className="text-sm text-zinc-700">
          Вы уверены, что хотите удалить организацию{" "}
          <span className="font-semibold">{organization.name_ru}</span>?
        </p>

        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-sm text-yellow-800">
            Это действие выполнит мягкое удаление (soft delete). Организация будет помечена как
            неактивная, но данные сохранятся в системе.
          </p>
        </div>
      </div>
    </Modal>
  );
}
