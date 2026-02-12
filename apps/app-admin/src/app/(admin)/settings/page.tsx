"use client";

import { AdminSettingsSmart } from "@frontend/modules/admin/ui";
import {ProfilePageLayout} from "@frontend/ui";
import {Settings} from "lucide-react";

export default function SettingsPage() {
  return  <ProfilePageLayout
      title="Настройки"
      icon={Settings}
    >
      <AdminSettingsSmart />
    </ProfilePageLayout>
}
