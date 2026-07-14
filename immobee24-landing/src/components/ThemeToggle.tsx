// Light/dark theme toggle (brief §02: "Ship light + dark").
// The theme class is applied to <html>; src/main.tsx applies the persisted
// choice BEFORE React mounts so there is no flash of the wrong theme.

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const KEY = 'immob24-theme';

// Dark is the DESIGN default — light mode is opt-in for comparison/review.
// index.html applies the saved choice before CSS loads (no flash).
export function initTheme(): void {
  try {
    const dark = localStorage.getItem(KEY) !== 'light';
    document.documentElement.classList.toggle('dark', dark);
  } catch {
    /* no-op (SSR/privacy mode) */
  }
}

// Reactive theme state for components whose styling depends on the active
// theme (e.g. the header over the home hero, which is a dark band only in
// dark mode). Watches the <html> class so it tracks the toggle live.
export function useThemeIsDark(): boolean {
  const [dark, setDark] = useState(
    () => typeof document !== 'undefined' && document.documentElement.classList.contains('dark'),
  );
  useEffect(() => {
    const html = document.documentElement;
    const obs = new MutationObserver(() => setDark(html.classList.contains('dark')));
    obs.observe(html, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);
  return dark;
}

export const ThemeToggle = ({ onDark = false }: { onDark?: boolean }) => {
  const [dark, setDark] = useState(
    () => typeof document !== 'undefined' && document.documentElement.classList.contains('dark'),
  );

  useEffect(() => {
    // 250ms crossfade on colors while the theme flips (v4 Part 1.4)
    const html = document.documentElement;
    html.classList.add('theme-xfade');
    html.classList.toggle('dark', dark);
    const t = window.setTimeout(() => html.classList.remove('theme-xfade'), 350);
    try {
      localStorage.setItem(KEY, dark ? 'dark' : 'light');
    } catch {
      /* no-op */
    }
    return () => window.clearTimeout(t);
  }, [dark]);

  return (
    <button
      type="button"
      onClick={() => setDark((v) => !v)}
      aria-label={dark ? 'Light mode' : 'Dark mode'}
      aria-pressed={dark}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-full border transition-colors ${
        onDark
          ? 'border-white/25 text-white/80 hover:border-golden/60 hover:text-golden'
          : 'border-charcoal/15 text-charcoal/70 hover:border-golden/50 hover:text-golden-dark'
      }`}
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
};
