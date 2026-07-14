// Registry for page-only copy that lives in route chunks instead of the
// entry bundle. A page's copy module calls registerTranslations() at module
// scope, so the namespaces are present before that page's first render.
// t() falls back to this registry when a key path misses the core dictionary.

const extra: Record<string, unknown> = {};

export function registerTranslations(dicts: Record<string, unknown>): void {
  Object.assign(extra, dicts);
}

export const extraTranslations: Readonly<Record<string, unknown>> = extra;
