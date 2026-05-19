import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Language, translations } from './translations';
import { alternateForLanguage, languageFromPath } from './pages';
import { trackEvent } from '../lib/analytics';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  switchLanguage: (lang: Language) => void;
  t: (path: string) => string | string[] | Array<{ q: string; a: string }> | string[][];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'immob24-lang';

function detectInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'de';
  // URL takes precedence over storage/browser when present.
  const urlLang = languageFromPath(window.location.pathname);
  if (urlLang) return urlLang;
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'de' || saved === 'en') return saved;
  const browserLang = navigator.language?.toLowerCase() ?? '';
  if (browserLang.startsWith('en')) return 'en';
  return 'de';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(detectInitialLanguage);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Keep the language in sync with the URL: /de/* and /en/* are language-locked.
  useEffect(() => {
    const urlLang = languageFromPath(pathname);
    if (urlLang && urlLang !== language) {
      setLanguage(urlLang);
    }
  }, [pathname, language]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
    document.documentElement.dir = 'ltr';
    trackEvent('language_change', { language });
  }, [language]);

  const switchLanguage = (target: Language) => {
    if (target === language) return;
    const nextPath = alternateForLanguage(pathname, target);
    setLanguage(target);
    navigate(nextPath);
  };

  const t = (path: string) => {
    const keys = path.split('.');
    let result: any = translations;

    for (const key of keys) {
      if (result && typeof result === 'object') {
        result = result[key];
      } else {
        console.warn(`Translation not found: ${path}`);
        return path;
      }
    }

    if (result && typeof result === 'object' && !Array.isArray(result)) {
      if (language in result) {
        return result[language];
      }
    }

    if (Array.isArray(result)) return result;
    return typeof result === 'string' ? result : path;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, switchLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export const languageOptions: Array<{ code: Language; name: string; short: string }> = [
  { code: 'de', name: 'Deutsch', short: 'DE' },
  { code: 'en', name: 'English', short: 'EN' },
];