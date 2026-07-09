import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import {
  PageKey,
  SITE_ORIGIN,
  X_DEFAULT_LANG,
  languageFromPath,
  pathFor,
  urlFor,
} from '../i18n/pages';
import { translations, type Language } from '../i18n';
import { useDocumentMeta } from './useDocumentMeta';

type Input = {
  pageKey: PageKey;
  titleKey: string;
  descriptionKey: string;
  // Defaults to "index, follow" — these are the indexable marketing pages.
  robots?: string;
};

function lookupLocalizedString(path: string, lang: Language): string {
  const keys = path.split('.');
  let node: any = translations;
  for (const key of keys) {
    if (node && typeof node === 'object') {
      node = node[key];
    } else {
      return '';
    }
  }
  if (node && typeof node === 'object' && !Array.isArray(node) && lang in node) {
    const value = node[lang];
    return typeof value === 'string' ? value : '';
  }
  return typeof node === 'string' ? node : '';
}

export function usePageMeta({
  pageKey,
  titleKey,
  descriptionKey,
  robots = 'index, follow',
}: Input) {
  const { pathname } = useLocation();
  const urlLang = languageFromPath(pathname);
  const lang: Language = urlLang ?? X_DEFAULT_LANG;
  const canonical = `${SITE_ORIGIN}${pathFor(pageKey, lang)}`;

  const alternates = useMemo(
    () => [
      { hreflang: 'de', href: urlFor(pageKey, 'de') },
      { hreflang: 'en', href: urlFor(pageKey, 'en') },
      { hreflang: 'x-default', href: urlFor(pageKey, X_DEFAULT_LANG) },
    ],
    [pageKey],
  );

  useDocumentMeta({
    title: lookupLocalizedString(titleKey, lang),
    description: lookupLocalizedString(descriptionKey, lang),
    canonical,
    alternates,
    htmlLang: lang,
    robots,
  });

  return { lang, canonical };
}