"use client";

import { ReactNode } from "react";
import { I18nProvider, LanguageProvider, AppDebugProvider } from "@/shared";
import { Auth, setTokens, clearTokens, isAuthenticated as checkAuth } from "../../api";
import type { LoginDto, RegisterDto } from "../../api";
import { AuthProvider, ReactQueryProvider } from "@/shared"; // Restored AuthProvider and ReactQueryProvider
import { ToastProvider } from "@/shared/ui/uikit/Toast";

interface AppProvidersProps {
  children: ReactNode;
  dictionary?: { [key: string]: unknown };
}

const defaultDictionary: { [key: string]: unknown } = {};

export function AppProviders({ children, dictionary = defaultDictionary }: AppProvidersProps) {
  return (
    <I18nProvider dictionary={dictionary}>
      <LanguageProvider>
        <AppDebugProvider>
          <AuthProvider>
            <ReactQueryProvider>
              <ToastProvider>{children}</ToastProvider>
            </ReactQueryProvider>
          </AuthProvider>
        </AppDebugProvider>
      </LanguageProvider>
    </I18nProvider>
  );
}
