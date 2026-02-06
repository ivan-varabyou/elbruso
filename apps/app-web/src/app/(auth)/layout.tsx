import { AuthLayout } from "@frontend/ui";
import React from "react";

export default function AuthLayoutWrapper({ children }: { children: React.ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}
