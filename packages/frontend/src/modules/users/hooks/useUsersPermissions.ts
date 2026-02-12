import { useAdminAuthStore } from "@frontend/stores/useAdminAuth.store";

export function useUsersPermissions() {
  const { user: profile } = useAdminAuthStore();

  const role = profile?.role;

  return {
    canRead: role === "SUPER_ADMIN" || role === "ADMIN" || role === "MODERATOR",
    canCreate: role === "SUPER_ADMIN" || role === "ADMIN",
    canUpdate: role === "SUPER_ADMIN" || role === "ADMIN",
    canDelete: role === "SUPER_ADMIN",
    canApprove: role === "SUPER_ADMIN" || role === "ADMIN",
    canBlock: role === "SUPER_ADMIN" || role === "ADMIN",
  };
}
