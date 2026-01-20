import { Inter } from 'next/font/google';
import { i18n, type Locale } from '../../../i18n-config';
import { getDictionary } from '../../../get-dictionary';
import { I18nProvider } from '../../shared/lib/i18n';
import { AppDebugProvider } from '../../shared/lib/debug';
import '../globals.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(params.lang);
  return (
    <html lang={params.lang} suppressHydrationWarning>
      <body className={inter.className}>
        <I18nProvider dictionary={dictionary}>
          <AppDebugProvider>
            {children}
          </AppDebugProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
