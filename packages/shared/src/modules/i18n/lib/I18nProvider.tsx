'use client';

import { createContext, useContext } from 'react';

type Dictionary = { [key: string]: unknown }; // Adjust this type as needed

const I18nContext = createContext<Dictionary | null>(null);

export function I18nProvider({
  dictionary,
  children,
}: {
  dictionary: Dictionary;
  children: React.ReactNode;
}) {
  return <I18nContext.Provider value={dictionary}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === null) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
