'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Locale = 'en' | 'ru';

interface LanguageContextValue {
    locale: Locale;
    setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>('en');

    useEffect(() => {
        // Load from localStorage or detect from browser
        const savedLocale = localStorage.getItem('locale') as Locale;
        if (savedLocale) {
            setLocaleState(savedLocale);
        } else {
            // Detect from browser
            const browserLang = navigator.language.split('-')[0];
            const detectedLocale = browserLang === 'ru' ? 'ru' : 'en';
            setLocaleState(detectedLocale);
            localStorage.setItem('locale', detectedLocale);
        }
    }, []);

    const setLocale = (newLocale: Locale) => {
        setLocaleState(newLocale);
        localStorage.setItem('locale', newLocale);
    };

    return (
        <LanguageContext.Provider value={{ locale, setLocale }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return context;
}
