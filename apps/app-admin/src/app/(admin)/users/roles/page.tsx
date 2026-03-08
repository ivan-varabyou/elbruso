"use client";

import { RolesManagement } from "@frontend/modules/admin";
import { useState } from "react";
// Import RoleEditor if needed, or assume RolesManagement handles it.
// Actually, RolesManagement needs an onAddRole prop.

export default function UserRolesPage() {
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  return <RolesManagement appType="user" onAddRole={() => setIsEditorOpen(true)} />;
}
