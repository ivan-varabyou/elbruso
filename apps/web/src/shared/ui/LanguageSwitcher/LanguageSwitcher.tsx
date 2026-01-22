'use client';

import { useLanguage } from '@/shared/lib/language';

export function LanguageSwitcher() {
    const { locale, setLocale } = useLanguage();

    return (
        <div className="language-switcher">
            <select
                value={locale}
                onChange={(e) => setLocale(e.target.value as 'en' | 'ru')}
                className="language-select"
            >
                <option value="en">English</option>
                <option value="ru">Русский</option>
            </select>
        </div>
    );
}
