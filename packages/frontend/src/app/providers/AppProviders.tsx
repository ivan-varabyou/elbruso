"use client";

import { ReactQueryProvider } from "@frontend/api/hooks/ReactQueryProvider";
import { DevTools } from "@elbruso/devtools";
import { AuthProvider } from "@frontend/modules/auth/lib";
import { I18nProvider, LanguageProvider } from "@frontend/modules/i18n/lib";
import { ToastProvider } from "@frontend/modules/notifications";
import { ReactNode } from "react";

interface AppProvidersProps {
  children: ReactNode;
  dictionary?: { [key: string]: unknown };
}

const defaultDictionary: { [key: string]: unknown } = {};

export function AppProviders({ children, dictionary = defaultDictionary }: AppProvidersProps) {
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
