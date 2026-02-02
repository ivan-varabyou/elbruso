"use client";

import { ReactQueryProvider } from "@elbruso/api/hooks/ReactQueryProvider";
import { AuthProvider } from "@elbruso/modules/auth/lib";
import { DevTools } from "@elbruso/devtools";
import { I18nProvider, LanguageProvider } from "@elbruso/modules/i18n/lib";
import { ToastProvider } from "@elbruso/modules/notifications";
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
