import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from './analytics';

// On every route change, scroll to top (or to the hash target if one is present)
// and fire a page_view event with the new path.
export function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Cross-page hash links race the lazy route chunk: the target id may
      // not be in the DOM yet. Retry for ~1s before giving up.
      const id = hash.slice(1);
      let tries = 0;
      let raf = 0;
      const attempt = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          trackPageView(pathname + hash);
          return;
        }
        if (++tries < 60) raf = requestAnimationFrame(attempt);
      };
      attempt();
      return () => cancelAnimationFrame(raf);
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    trackPageView(pathname);
  }, [pathname, hash]);

  return null;
}
