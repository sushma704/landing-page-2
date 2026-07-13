// Light/dark theme toggle (brief §02: "Ship light + dark").
// The theme class is applied to <html>; src/main.tsx applies the persisted
// choice BEFORE React mounts so there is no flash of the wrong theme.

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const KEY = 'immob24-theme';

export function initTheme(): void {
  try {
    const saved = localStorage.getItem(KEY);
    const dark =
      saved === 'dark' ||
      (saved !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', dark);
  } catch {
    /* no-op (SSR/privacy mode) */
  }
}

export const ThemeToggle = ({ onDark = false }: { onDark?: boolean }) => {
  const [dark, setDark] = useState(
    () => typeof document !== 'undefined' && document.documentElement.classList.contains('dark'),
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    try {
      localStorage.setItem(KEY, dark ? 'dark' : 'light');
    } catch {
      /* no-op */
    }
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
