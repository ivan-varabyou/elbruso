"use client";

import { DevTools } from "@elbruso/devtools";
import { ReactQueryProvider } from "@frontend/api/hooks/ReactQueryProvider";
import { AuthProvider } from "@frontend/modules/auth/lib";
import { I18nProvider, LanguageProvider } from "@frontend/modules/i18n/lib";
import { ToastProvider } from "@frontend/modules/notifications";
import { useAdminAuthStore } from "@frontend/stores/useAdminAuth.store";
import { ReactNode, useEffect } from "react";

interface AppProvidersProps {
  children: ReactNode;
  dictionary?: { [key: string]: unknown };
}

const defaultDictionary: { [key: string]: unknown } = {};

export function AppProviders({ children, dictionary = defaultDictionary }: AppProvidersProps) {
  const { fetchMe } = useAdminAuthStore();

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  return (
    <I18nProvider dictionary={dictionary}>
      <LanguageProvider>
        <AuthProvider>
          <ReactQueryProvider>
            <ToastProvider>
              <DevTools>{children}</DevTools>
            </ToastProvider>
          </ReactQueryProvider>
        </AuthProvider>
      </LanguageProvider>
    </I18nProvider>
  );
}
