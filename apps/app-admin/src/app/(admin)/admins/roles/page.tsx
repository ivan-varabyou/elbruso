"use client";

import { RolesManagement } from "@frontend/modules/admin";
import React from "react";

export default function AdminRolesPage() {
  const handleAddRole = () => {
    console.log("Add role clicked");
  };

  return <RolesManagement onAddRole={handleAddRole} />;
}
