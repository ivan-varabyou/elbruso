import { AuthLayout } from "@elbruso/ui";
import React from "react";

export default function AuthLayoutWrapper({ children }: { children: React.ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}
