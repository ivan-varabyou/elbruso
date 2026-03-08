"use client";

import { Reference } from "@frontend/api";
import { useCallback, useEffect, useState } from "react";

import { IndicatorTemplatesTableDumb, IndicatorTemplatesTableProps } from "./IndicatorTemplatesTable.dumb";
import { IndicatorTemplateModal } from "./IndicatorTemplateModal";

export interface IndicatorTemplatesTableSmartProps {
  onEditTemplate?: (template: any) => void;
  onDeleteTemplate?: (templateId: number) => void;
  onCreateTemplate?: () => void;
}

export function IndicatorTemplatesTableSmart({
  onEditTemplate,
  onDeleteTemplate,
  onCreateTemplate,
}: IndicatorTemplatesTableSmartProps) {
  const referenceApi = new Reference();
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<any | null>(null);

  const fetchTemplates = useCallback(async () => {
    setLoading(true);
    try {
      const response = await referenceApi.indicatorsControllerGetTemplates();
      const templatesData = Array.isArray(response) ? response : (response as any).data || [];
      setTemplates(templatesData);
      console.log("[IndicatorTemplatesTable] Templates fetched successfully", {
        count: templatesData.length,
      });
    } catch (error) {
      console.error("[IndicatorTemplatesTable] Failed to fetch templates:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  const handleEditTemplate = useCallback(
    (template: any) => {
      console.log("[IndicatorTemplatesTable] Edit template", { templateId: template.id });
      setEditingTemplate(template);
      setIsModalOpen(true);
      onEditTemplate?.(template);
    },
    [onEditTemplate],
  );

  const handleDeleteTemplate = useCallback(
    async (templateId: number) => {
      console.log("[IndicatorTemplatesTable] Delete template", { templateId });
      try {
        await referenceApi.indicatorsControllerDeleteTemplate(templateId);
        setTemplates((prev) => prev.filter((t) => t.id !== templateId));
        console.log("[IndicatorTemplatesTable] Template deleted successfully", { templateId });
      } catch (error) {
        console.error("[IndicatorTemplatesTable] Failed to delete template:", { templateId, error });
      }
      onDeleteTemplate?.(templateId);
    },
    [onDeleteTemplate],
  );

  const handleCreateTemplate = useCallback(() => {
    console.log("[IndicatorTemplatesTable] Create template modal opened");
    setEditingTemplate(null);
    setIsModalOpen(true);
    onCreateTemplate?.();
  }, [onCreateTemplate]);

  const handleModalClose = useCallback(() => {
    console.log("[IndicatorTemplatesTable] Modal closed");
    setIsModalOpen(false);
    setEditingTemplate(null);
  }, []);

  const handleModalSuccess = useCallback(() => {
    console.log("[IndicatorTemplatesTable] Modal success - refetching templates");
    fetchTemplates();
    setIsModalOpen(false);
    setEditingTemplate(null);
  }, [fetchTemplates]);

  const tableProps: IndicatorTemplatesTableProps = {
    templates,
    onEditTemplate: handleEditTemplate,
    onDeleteTemplate: handleDeleteTemplate,
    onCreateTemplate: handleCreateTemplate,
    loading,
  };

  return (
    <>
      <IndicatorTemplatesTableDumb {...tableProps} />
      {isModalOpen && (
        <IndicatorTemplateModal
          template={editingTemplate}
          onClose={handleModalClose}
          onSuccess={handleModalSuccess}
        />
      )}
    </>
  );
}
