import { useEffect } from 'react';
import type { Language } from '../i18n';

// Injects a single FAQPage JSON-LD script for the current page in the active
// language. The script is removed on unmount so a navigation between pages
// (or between languages) never leaves multiple FAQ schemas in the DOM.
export function useFaqSchema(
  items: Array<{ q: string; a: string }>,
  lang: Language,
  pageSlug: string,
) {
  useEffect(() => {
    if (!items.length) return;
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: lang === 'de' ? 'de-DE' : 'en',
      mainEntity: items.map((it) => ({
        '@type': 'Question',
        name: it.q,
        acceptedAnswer: { '@type': 'Answer', text: it.a },
      })),
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.page = `${pageSlug}-faq`;
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, [items, lang, pageSlug]);
}