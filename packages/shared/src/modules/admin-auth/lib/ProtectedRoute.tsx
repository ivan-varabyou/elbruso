"use client";

import { useAdminAuth } from "./AdminAuthContext";
import { isAdminAuthenticated } from "@elbruso/api/admin.client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated } = useAdminAuth();

  useEffect(() => {
    if (!isAuthenticated && isAdminAuthenticated()) {
      return;
    }
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    if (isAdminAuthenticated()) {
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-zinc-200 border-t-zinc-600 rounded-full animate-spin" />
            <p className="text-sm text-zinc-500">Проверка авторизации...</p>
          </div>
        </div>
      );
    }
    return null;
  }

  return <>{children}</>;
}
