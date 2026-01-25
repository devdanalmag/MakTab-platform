import React from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSelector.css';

type Language = 'en' | 'ar' | 'ha';

interface LanguageSelectorProps {
    variant?: 'pills' | 'tabs';
    className?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
    variant = 'pills',
    className = '',
}) => {
    const { i18n } = useTranslation();

    const languages: { code: Language; label: string }[] = [
        { code: 'en', label: 'Eng' },
        { code: 'ar', label: 'Ar' },
        { code: 'ha', label: 'Hau' },
    ];

    const handleLanguageChange = (lang: Language) => {
        i18n.changeLanguage(lang);
        // Set document direction for RTL support
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
    };

    return (
        <div className={`language-selector language-selector-${variant} ${className}`}>
            {languages.map((lang) => (
                <button
                    key={lang.code}
                    className={`language-btn ${i18n.language === lang.code ? 'active' : ''}`}
                    onClick={() => handleLanguageChange(lang.code)}
                    aria-label={`Switch to ${lang.label}`}
                >
                    {lang.label}
                </button>
            ))}
        </div>
    );
};

export default LanguageSelector;
