import { useLanguage } from '../i18n';
import { pathFor, type PageKey } from '../i18n/pages';

// Returns the path to a known page in the currently-active language.
// Use for internal <Link to={...}> targets so navigation stays in-language.
export function useLocalizedPath(): (key: PageKey) => string {
  const { language } = useLanguage();
  return (key) => pathFor(key, language);
}