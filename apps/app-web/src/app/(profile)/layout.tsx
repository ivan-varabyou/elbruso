"use client";

import { ProtectedRoute } from "@elbruso/modules/auth";
import { ProfileLayout } from "@elbruso/modules/profile";

export default function ProfileLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <ProfileLayout>{children}</ProfileLayout>
    </ProtectedRoute>
  );
}
