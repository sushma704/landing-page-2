import type { Language } from './translations';

export const SITE_ORIGIN = 'https://immob24.com';

export type PageKey =
  | 'home'
  | 'produkt'
  | 'howItWorks'
  | 'crmAlternative'
  | 'pricing'
  | 'demo'
  | 'beta'
  | 'aiFeatures'
  | 'compliance'
  | 'whyImmob24';

type PagePaths = Record<Language, string>;

export const PAGE_PATHS: Record<PageKey, PagePaths> = {
  home: { de: '/de', en: '/en', fr: '/fr', ar: '/ar' },
  produkt: { de: '/de/produkt', en: '/en/product', fr: '/fr/produit', ar: '/ar/product' },
  howItWorks: { de: '/de/how-it-works', en: '/en/how-it-works', fr: '/fr/comment-ca-marche', ar: '/ar/how-it-works' },
  crmAlternative: {
    de: '/de/immobilien-crm-alternative',
    en: '/en/real-estate-crm-alternative',
    fr: '/fr/alternative-crm-immobilier',
    ar: '/ar/real-estate-crm-alternative',
  },
  pricing: { de: '/de/preise', en: '/en/pricing', fr: '/fr/tarifs', ar: '/ar/pricing' },
  demo: { de: '/de/demo', en: '/en/demo', fr: '/fr/demo', ar: '/ar/demo' },
  beta: { de: '/de/beta-agentenprogramm', en: '/en/beta-agent-program', fr: '/fr/programme-beta-agents', ar: '/ar/beta-agent-program' },
  // AI-refinement pages (draft/ai-refinement). EN slug avoids colliding with
  // the existing /en/ai-for-real-estate-agents SEO page.
  aiFeatures: { de: '/de/ki-funktionen', en: '/en/ai-features-platform', fr: '/fr/fonctions-ia', ar: '/ar/ai-features-platform' },
  compliance: { de: '/de/compliance', en: '/en/compliance', fr: '/fr/conformite', ar: '/ar/compliance' },
  whyImmob24: { de: '/de/warum-immob24', en: '/en/why-immob24', fr: '/fr/pourquoi-immob24', ar: '/ar/why-immob24' },
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
  if (pathname === '/fr' || pathname.startsWith('/fr/')) return 'fr';
  if (pathname === '/ar' || pathname.startsWith('/ar/')) return 'ar';
  return null;
}

const PATH_TO_KEY: Map<string, PageKey> = (() => {
  const m = new Map<string, PageKey>();
  (Object.keys(PAGE_PATHS) as PageKey[]).forEach((key) => {
    (Object.values(PAGE_PATHS[key]) as string[]).forEach((path) => {
      m.set(path, key);
    });
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