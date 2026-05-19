import type { Language } from './translations';

export const SITE_ORIGIN = 'https://immob24.com';

export type PageKey =
  | 'home'
  | 'produkt'
  | 'howItWorks'
  | 'crmAlternative'
  | 'pricing'
  | 'demo'
  | 'beta';

type PagePaths = Record<Language, string>;

export const PAGE_PATHS: Record<PageKey, PagePaths> = {
  home: { de: '/de', en: '/en' },
  produkt: { de: '/de/produkt', en: '/en/product' },
  howItWorks: { de: '/de/how-it-works', en: '/en/how-it-works' },
  crmAlternative: {
    de: '/de/immobilien-crm-alternative',
    en: '/en/crm-alternative',
  },
  pricing: { de: '/de/preise', en: '/en/pricing' },
  demo: { de: '/de/demo', en: '/en/demo' },
  beta: { de: '/de/beta-agentenprogramm', en: '/en/beta-program' },
};

// DE is the primary market — used as x-default.
export const X_DEFAULT_LANG: Language = 'de';

export function pathFor(key: PageKey, lang: Language): string {
  return PAGE_PATHS[key][lang];
}

export function urlFor(key: PageKey, lang: Language): string {
  return `${SITE_ORIGIN}${PAGE_PATHS[key][lang]}`;
}

export function languageFromPath(pathname: string): Language | null {
  if (pathname === '/de' || pathname.startsWith('/de/')) return 'de';
  if (pathname === '/en' || pathname.startsWith('/en/')) return 'en';
  return null;
}

const PATH_TO_KEY: Map<string, PageKey> = (() => {
  const m = new Map<string, PageKey>();
  (Object.keys(PAGE_PATHS) as PageKey[]).forEach((key) => {
    m.set(PAGE_PATHS[key].de, key);
    m.set(PAGE_PATHS[key].en, key);
  });
  return m;
})();

export function pageKeyFromPath(pathname: string): PageKey | null {
  return PATH_TO_KEY.get(pathname) ?? null;
}

export function alternateForLanguage(pathname: string, lang: Language): string {
  const key = pageKeyFromPath(pathname);
  if (key) return pathFor(key, lang);
  return PAGE_PATHS.home[lang];
}