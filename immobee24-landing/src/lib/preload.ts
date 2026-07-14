// Route-chunk preloading (v4 Part 2): nav-link hover fires the matching
// page's dynamic import so the chunk is cached before the click. Importers
// mirror App.tsx's React.lazy() calls — Vite dedupes, so this warms the
// exact same chunk. Each chunk preloads at most once.

const IMPORTERS: Array<[RegExp, () => Promise<unknown>]> = [
  [/\/(produkt|product|produit)(#|$)/, () => import('../pages/ProduktDE')],
  [/(ki-funktionen|ai-features-platform|fonctions-ia)/, () => import('../pages/AiFeaturesPage')],
  [/(loesungen|solutions)/, () => import('../pages/SolutionsPage')],
  [/(preise|pricing|tarifs)/, () => import('../pages/PricingDE')],
  [/(kontakt|contact)/, () => import('../pages/ContactPage')],
  [/(compliance|conformite)/, () => import('../pages/CompliancePage')],
  [/(warum-immob24|why-immob24|pourquoi-immob24)/, () => import('../pages/WhyImmob24Page')],
  [/(crm-alternative|alternative-crm)/, () => import('../pages/CrmAlternativeDE')],
  [/^\/(de|en|fr|ar)$/, () => import('../pages/HomePage')],
];

const warmed = new Set<RegExp>();

export function preloadRoute(to: string): void {
  const path = to.split('?')[0];
  for (const [re, load] of IMPORTERS) {
    if (re.test(path)) {
      if (!warmed.has(re)) {
        warmed.add(re);
        load().catch(() => warmed.delete(re)); // retry on next hover if it failed
      }
      return;
    }
  }
}
