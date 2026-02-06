"use client";

import { ProtectedRoute } from "@frontend/modules/auth";
import { ProfileLayout } from "@frontend/modules/profile";

export default function ProfileLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <ProfileLayout>{children}</ProfileLayout>
    </ProtectedRoute>
  );
}
