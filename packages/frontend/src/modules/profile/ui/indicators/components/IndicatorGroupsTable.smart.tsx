"use client";

import { Reference } from "@frontend/api";
import type { IndicatorGroup } from "@frontend/types/reference.types";
import { useCallback, useEffect, useState } from "react";

import { IndicatorGroupsTableDumb, IndicatorGroupsTableProps } from "./IndicatorGroupsTable.dumb";
import { IndicatorGroupModal } from "./IndicatorGroupModal";

export interface IndicatorGroupsTableSmartProps {
  onEditGroup?: (group: IndicatorGroup) => void;
  onDeleteGroup?: (groupId: number) => void;
  onCreateGroup?: () => void;
}

export function IndicatorGroupsTableSmart({
  onEditGroup,
  onDeleteGroup,
  onCreateGroup,
}: IndicatorGroupsTableSmartProps) {
  const referenceApi = new Reference();
  const [groups, setGroups] = useState<IndicatorGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<IndicatorGroup | null>(null);

  const fetchGroups = useCallback(async () => {
    setLoading(true);
    try {
      const groupsResponse = await referenceApi.indicatorsControllerGetGroups();
      const groupsData = (groupsResponse.data as any)?.data || [];
      setGroups(groupsData);
      console.log("[IndicatorGroupsTable] Groups fetched successfully", {
        count: groupsData.length,
      });
    } catch (error) {
      console.error("[IndicatorGroupsTable] Failed to fetch groups:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  const handleEditGroup = useCallback(
    (group: IndicatorGroup) => {
      console.log("[IndicatorGroupsTable] Edit group", { groupId: group.id });
      setEditingGroup(group);
      setIsModalOpen(true);
      onEditGroup?.(group);
    },
    [onEditGroup],
  );

  const handleDeleteGroup = useCallback(
    async (groupId: number) => {
      console.log("[IndicatorGroupsTable] Delete group", { groupId });
      try {
        await referenceApi.indicatorsControllerDeleteGroup(groupId);
        setGroups((prev) => prev.filter((g) => g.id !== groupId));
        console.log("[IndicatorGroupsTable] Group deleted successfully", { groupId });
      } catch (error) {
        console.error("[IndicatorGroupsTable] Failed to delete group:", { groupId, error });
      }
      onDeleteGroup?.(groupId);
    },
    [onDeleteGroup],
  );

  const handleCreateGroup = useCallback(() => {
    console.log("[IndicatorGroupsTable] Create group modal opened");
    setEditingGroup(null);
    setIsModalOpen(true);
    onCreateGroup?.();
  }, [onCreateGroup]);

  const handleModalClose = useCallback(() => {
    console.log("[IndicatorGroupsTable] Modal closed");
    setIsModalOpen(false);
    setEditingGroup(null);
  }, []);

  const handleModalSuccess = useCallback(() => {
    console.log("[IndicatorGroupsTable] Modal success - refetching groups");
    fetchGroups();
    setIsModalOpen(false);
    setEditingGroup(null);
  }, [fetchGroups]);

  const tableProps: IndicatorGroupsTableProps = {
    groups,
    onEditGroup: handleEditGroup,
    onDeleteGroup: handleDeleteGroup,
    onCreateGroup: handleCreateGroup,
    loading,
  };

  return (
    <>
      <IndicatorGroupsTableDumb {...tableProps} />
      {isModalOpen && (
        <IndicatorGroupModal
          group={editingGroup}
          onClose={handleModalClose}
          onSuccess={handleModalSuccess}
        />
      )}
    </>
  );
}
