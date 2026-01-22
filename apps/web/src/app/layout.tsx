import { Inter } from 'next/font/google';
import { AuthProvider } from '../shared/lib/auth';
import { ToastProvider } from '../shared/ui/Toast';
import { LanguageProvider } from '../shared/lib/language';
import { I18nProvider } from '../shared/lib/i18n';
import { AppDebugProvider } from '../shared/lib/debug';
import { getDictionary } from '../../get-dictionary';
import './globals.css';
import '../shared/ui/Input/Input.css';
import '../shared/ui/Toast/Toast.css';
import '../shared/ui/PasswordStrength/PasswordStrength.css';
import '../shared/ui/LanguageSwitcher/LanguageSwitcher.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata = {
    title: 'Elbruso - BI System',
    description: 'Business Intelligence System with dynamic tables and reports',
    icons: {
        icon: [
            { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
            { url: '/favicon.svg', type: 'image/svg+xml' },
        ],
        shortcut: '/favicon.ico',
        apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Load dictionary for default locale
    const dictionary = await getDictionary('ru');

    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <I18nProvider dictionary={dictionary}>
                    <LanguageProvider>
                        <AppDebugProvider>
                            <AuthProvider>
                                <ToastProvider>
                                    {children}
                                </ToastProvider>
                            </AuthProvider>
                        </AppDebugProvider>
                    </LanguageProvider>
                </I18nProvider>
            </body>
        </html>
    );
}
