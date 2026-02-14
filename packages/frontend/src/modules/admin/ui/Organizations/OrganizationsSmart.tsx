"use client";

import { useOrganizationsStore } from "@frontend/stores/useOrganizationsStore";
import { OrganizationsFilters } from "./OrganizationsFilters";
import { OrganizationsList } from "./OrganizationsList";
import { OrganizationsTree } from "./OrganizationsTree";
import { CreateOrganizationModal } from "./CreateOrganizationModal";
import { EditOrganizationModal } from "./EditOrganizationModal";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";
import { Organization } from "@frontend/stores/useOrganizationsStore";
import { Spinner } from "@heroui/react";
import { useState, useEffect } from "react";

export function OrganizationsSmart() {
  const { viewMode, loading, error, fetchOrganizations, fetchTree } = useOrganizationsStore();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [organizationToEdit, setOrganizationToEdit] = useState<Organization | null>(null);
  const [organizationToDelete, setOrganizationToDelete] = useState<Organization | null>(null);

  useEffect(() => {
    if (viewMode === "tree") {
      fetchTree();
    } else {
      fetchOrganizations();
    }
  }, [viewMode]);

  if (loading && !error) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <OrganizationsFilters onCreate={() => setIsCreateModalOpen(true)} />

      {viewMode === "tree" ? (
        <OrganizationsTree onEdit={setOrganizationToEdit} onDelete={setOrganizationToDelete} />
      ) : (
        <OrganizationsList onEdit={setOrganizationToEdit} onDelete={setOrganizationToDelete} />
      )}

      <CreateOrganizationModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {organizationToEdit && (
        <EditOrganizationModal
          isOpen={true}
          organization={organizationToEdit}
          onClose={() => setOrganizationToEdit(null)}
        />
      )}

      {organizationToDelete && (
        <DeleteConfirmationModal
          isOpen={true}
          organization={organizationToDelete}
          onClose={() => setOrganizationToDelete(null)}
        />
      )}
    </div>
  );
}
