import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Language, translations } from './translations';
import { extraTranslations } from './registry';
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

// fr/ar overlay dictionaries are route-independent but only needed when that
// language is active, so they load as their own chunks (~64/79KB source)
// instead of sitting in the entry bundle. Loaded once, cached here.
type Overlay = Record<string, unknown>;
const overlayCache: Partial<Record<'fr' | 'ar', Overlay>> = {};
const loadOverlay = (lang: 'fr' | 'ar'): Promise<Overlay> =>
  overlayCache[lang]
    ? Promise.resolve(overlayCache[lang]!)
    : (lang === 'fr' ? import('./fr') : import('./ar')).then((m) => {
        const overlay = (lang === 'fr' ? (m as any).frOverlay : (m as any).arOverlay) as Overlay;
        overlayCache[lang] = overlay;
        return overlay;
      });

function detectInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'de';
  // URL takes precedence over storage/browser when present.
  const urlLang = languageFromPath(window.location.pathname);
  if (urlLang) return urlLang;
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'de' || saved === 'en' || saved === 'fr' || saved === 'ar') return saved;
  const browserLang = navigator.language?.toLowerCase() ?? '';
  if (browserLang.startsWith('en')) return 'en';
  if (browserLang.startsWith('fr')) return 'fr';
  if (browserLang.startsWith('ar')) return 'ar';
  return 'de';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(detectInitialLanguage);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  // bump to re-render once an overlay chunk lands
  const [, setOverlayTick] = useState(0);

  // Load the active language's overlay chunk. On a fr/ar first visit the
  // provider withholds children until it lands (below) so no English flashes.
  const needsOverlay = language === 'fr' || language === 'ar';
  useEffect(() => {
    if (needsOverlay && !overlayCache[language as 'fr' | 'ar']) {
      loadOverlay(language as 'fr' | 'ar').then(() => setOverlayTick((n) => n + 1));
    }
  }, [language, needsOverlay]);

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
    // Arabic is right-to-left; all other supported languages are LTR.
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    trackEvent('language_change', { language });
  }, [language]);

  const switchLanguage = (target: Language) => {
    if (target === language) return;
    const nextPath = alternateForLanguage(pathname, target);
    const go = () => {
      setLanguage(target);
      navigate(nextPath);
    };
    // fetch the overlay before switching so fr/ar never paint in English
    if (target === 'fr' || target === 'ar') loadOverlay(target).then(go, go);
    else go();
  };

  const t = (path: string) => {
    const keys = path.split('.');

    // fr/ar live in overlay dictionaries (same nesting, plain values at the
    // leaves). Missing keys fall back to English below — so partially
    // translated languages degrade gracefully instead of showing key paths.
    if (language === 'fr' || language === 'ar') {
      let o: any = overlayCache[language];
      for (const key of keys) {
        o = o && typeof o === 'object' ? o[key] : undefined;
      }
      if (typeof o === 'string' || Array.isArray(o)) return o;
    }

    const lookup = (root: any) => {
      let r = root;
      for (const key of keys) {
        r = r && typeof r === 'object' ? r[key] : undefined;
      }
      return r;
    };
    // core dictionary first, then route-registered page copy
    let result: any = lookup(translations) ?? lookup(extraTranslations);
    if (result === undefined) {
      console.warn(`Translation not found: ${path}`);
      return path;
    }

    if (result && typeof result === 'object' && !Array.isArray(result)) {
      if (language in result) {
        return result[language];
      }
      // fr/ar leaf not present in the base dictionary -> English fallback.
      if ('en' in result) {
        return result.en;
      }
    }

    if (Array.isArray(result)) return result;
    return typeof result === 'string' ? result : path;
  };

  // fr/ar direct entry (URL/saved pref): hold children back the one tick the
  // overlay chunk needs, instead of painting English and swapping.
  const overlayPending = needsOverlay && !overlayCache[language as 'fr' | 'ar'];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, switchLanguage, t }}>
      {overlayPending ? null : children}
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
  { code: 'fr', name: 'Français', short: 'FR' },
  { code: 'ar', name: 'العربية', short: 'AR' },
];