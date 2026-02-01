"use client";

import { ProtectedRoute } from "@elbruso/modules/auth/lib";
import { ProfileLayout } from "@elbruso/modules/profile/ui";

export default function ProfileLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <ProfileLayout>{children}</ProfileLayout>
    </ProtectedRoute>
  );
}
