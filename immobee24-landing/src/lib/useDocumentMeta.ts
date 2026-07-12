import { useEffect } from 'react';

type AlternateLink = { hreflang: string; href: string };

// Site-wide social preview image — 1200x630, shipped from /public.
const OG_IMAGE_URL = 'https://immob24.com/og-image.png';

type MetaInput = {
  title?: string;
  description?: string;
  canonical?: string;
  alternates?: AlternateLink[];
  htmlLang?: string;
  // Robots directive for this route. Omit to inherit the static default in
  // index.html ("index, follow"). Pass "noindex, nofollow" for pages that must
  // stay out of the index (e.g. post-conversion thank-you pages).
  robots?: string;
};

function setMeta(name: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setProperty(property: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[property="${property}"]`,
  );
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function syncAlternates(alternates: AlternateLink[]) {
  // Remove any previously injected alternates so stale entries don't accumulate
  // as the user navigates between pages.
  document.head
    .querySelectorAll<HTMLLinkElement>('link[rel="alternate"][data-i18n="1"]')
    .forEach((el) => el.remove());

  alternates.forEach(({ hreflang, href }) => {
    const link = document.createElement('link');
    link.setAttribute('rel', 'alternate');
    link.setAttribute('hreflang', hreflang);
    link.setAttribute('href', href);
    link.setAttribute('data-i18n', '1');
    document.head.appendChild(link);
  });
}

export function useDocumentMeta({
  title,
  description,
  canonical,
  alternates,
  htmlLang,
  robots,
}: MetaInput) {
  useEffect(() => {
    if (htmlLang) document.documentElement.lang = htmlLang;
    if (robots) setMeta('robots', robots);
    if (title) {
      document.title = title;
      setProperty('og:title', title);
      setProperty('twitter:title', title);
    }
    if (description) {
      setMeta('description', description);
      setProperty('og:description', description);
      setProperty('twitter:description', description);
    }
    if (canonical) {
      setCanonical(canonical);
      setProperty('og:url', canonical);
      setProperty('twitter:url', canonical);
      // OG/Twitter images must be absolute URLs (relative paths are invalid
      // for social crawlers). Re-assert the site-wide default on every route.
      setProperty('og:image', OG_IMAGE_URL);
      setProperty('twitter:image', OG_IMAGE_URL);
    }
    if (alternates) syncAlternates(alternates);
  }, [title, description, canonical, alternates, htmlLang]);
}