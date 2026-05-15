import { useEffect } from 'react';

type GtagFn = (...args: unknown[]) => void;
type FbqFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
    fbq?: FbqFn;
  }
}

const GA_ID = 'G-MQKZ3EHWR9';

export function trackPageView(path: string, title?: string) {
  if (typeof window === 'undefined') return;
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_location: window.location.origin + path,
      page_title: title ?? document.title,
      send_to: GA_ID,
    });
  }
  if (window.fbq) {
    window.fbq('track', 'PageView');
  }
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', name, params);
}

export function useHashPageviews() {
  useEffect(() => {
    const fire = () => {
      const path = window.location.pathname + window.location.hash;
      trackPageView(path);
    };
    window.addEventListener('hashchange', fire);
    return () => window.removeEventListener('hashchange', fire);
  }, []);
}