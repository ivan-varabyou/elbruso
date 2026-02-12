"use client";

import { Loader2 } from "lucide-react";
import { useAdminAuth } from "@frontend/modules/admin/auth";
import { ProfileSettings } from "./ProfileSettings.smart";

export function AdminSettingsSmart() {
  const { user: profile, isLoading } = useAdminAuth();

  if (isLoading && !profile) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-300" />
      </div>
    );
  }

  return (
    <div className="w-full mx-auto space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <ProfileSettings />
    </div>
  );
}
