import 'server-only';

import type { Locale } from './i18n-config';
import { i18n } from './i18n-config'; // Import i18n to get defaultLocale

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  ru: () => import('./dictionaries/ru.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  if (!(locale in dictionaries)) {
    // Fallback to default locale if the requested locale is not found
    console.warn(`Locale '${locale}' not found, falling back to '${i18n.defaultLocale}'`);
    return dictionaries[i18n.defaultLocale]();
  }
  return dictionaries[locale]();
};
