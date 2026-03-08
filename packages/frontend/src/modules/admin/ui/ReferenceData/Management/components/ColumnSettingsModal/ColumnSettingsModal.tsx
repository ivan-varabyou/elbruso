"use client";

import { useState } from "react";

import type { ColumnDef } from "../../types";
import { ColumnSettingsModalDumb } from "./ColumnSettingsModal.dumb";

interface ColumnSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  columns: ColumnDef[];
  activeColIndex: number | null;
  availableTables: Record<string, { label: string; columns: { key: string; label: string }[] }>;
  onSelectColumn: (index: number) => void;
  onAddColumn: () => void;
  onUpdateColumn: (index: number, data: Partial<ColumnDef>) => void;
  onDeleteColumn: (index: number) => void;
}

export function ColumnSettingsModal(props: ColumnSettingsModalProps) {
  const [activeTab, setActiveTab] = useState<"general" | "validation" | "relation">("general");
  const [tableSearch, setTableSearch] = useState("");

  return (
    <ColumnSettingsModalDumb
      {...props}
      activeTab={activeTab}
      tableSearch={tableSearch}
      onTabChange={setActiveTab}
      onTableSearchChange={setTableSearch}
    />
  );
}
