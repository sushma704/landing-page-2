import { useEffect } from 'react';

// Injects one or more JSON-LD <script> blocks into <head> for the current page.
// Each block is removed on unmount so navigation between pages (or languages)
// never leaves stale structured data in the DOM.
//
// The schema array is compared by serialized value, not identity, so callers
// can build fresh objects on every render without re-running the effect.
export function useJsonLd(
  schemas: Array<Record<string, unknown>>,
  pageSlug: string,
) {
  const json = JSON.stringify(schemas);
  useEffect(() => {
    const parsed: Array<Record<string, unknown>> = JSON.parse(json);
    const nodes = parsed.map((schema, i) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.page = `${pageSlug}-schema-${i}`;
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
      return script;
    });
    return () => nodes.forEach((n) => n.remove());
  }, [json, pageSlug]);
}
