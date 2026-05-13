import { useEffect } from 'react';

type MetaInput = {
  title?: string;
  description?: string;
  canonical?: string;
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

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function useDocumentMeta({ title, description, canonical }: MetaInput) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) setMeta('description', description);
    if (canonical) setLink('canonical', canonical);
  }, [title, description, canonical]);
}
