import React from "react";
import { AuthLayout } from "@/shared/ui";

export default function AuthLayoutWrapper({ children }: { children: React.ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}
