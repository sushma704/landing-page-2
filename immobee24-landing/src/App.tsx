import { Suspense, lazy, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ScrollToHash } from './lib/ScrollToHash';
import { CookieBanner } from './components/CookieBanner';
import { DEMO_BOOKING_URL } from './components/SiteChrome';

// Route-level code splitting: every page is a lazy chunk so the initial
// bundle carries only the shell (router, consent banner, SiteChrome, i18n).
// Vite emits one chunk per page; shared pieces are hoisted automatically.
const HomePage = lazy(() => import('./pages/HomePage'));
const ProduktDE = lazy(() => import('./pages/ProduktDE'));
const BetaThankYou = lazy(() => import('./pages/BetaThankYou'));
const CrmAlternativeDE = lazy(() => import('./pages/CrmAlternativeDE'));
const PricingDE = lazy(() => import('./pages/PricingDE'));
// AI-refinement pages (draft/ai-refinement)
const AiFeaturesPage = lazy(() => import('./pages/AiFeaturesPage'));
const CompliancePage = lazy(() => import('./pages/CompliancePage'));
const WhyImmob24Page = lazy(() => import('./pages/WhyImmob24Page'));

// Internal-only scene gallery (noindex) for design review
const SolutionsPage = lazy(() => import('./pages/SolutionsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

const DevScenes = lazy(() => import('./pages/DevScenes'));
// SEO landing pages — DE/EN pairs, staged under noindex pending entity registration
const MaklersoftwareMuenchen = lazy(() => import('./pages/seo/MaklersoftwareMuenchen'));
const MaklersoftwareBerlin = lazy(() => import('./pages/seo/MaklersoftwareBerlin'));
const MaklersoftwareHamburg = lazy(() => import('./pages/seo/MaklersoftwareHamburg'));
const KiFuerImmobilienmakler = lazy(() => import('./pages/seo/KiFuerImmobilienmakler'));
const RealEstateAgentSoftwareMunich = lazy(() => import('./pages/seo/RealEstateAgentSoftwareMunich'));
const RealEstateAgentSoftwareBerlin = lazy(() => import('./pages/seo/RealEstateAgentSoftwareBerlin'));
const RealEstateAgentSoftwareHamburg = lazy(() => import('./pages/seo/RealEstateAgentSoftwareHamburg'));
const AiForRealEstateAgents = lazy(() => import('./pages/seo/AiForRealEstateAgents'));

// Suspense fallback while a page chunk loads: centered golden spinner on the
// site's cream ground (theme tokens only, no layout dependencies).
const PageLoader = () => (
  <div className="min-h-screen bg-cream flex items-center justify-center" role="status" aria-label="Loading">
    <span className="h-10 w-10 rounded-full border-4 border-golden/25 border-t-golden animate-spin" />
  </div>
);

export default function App() {
  // Any element marked with data-demo-cta opens the Cal.com booking page.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = e.target as Element | null;
      if (el?.closest('[data-demo-cta]')) {
        window.open(DEMO_BOOKING_URL, '_blank', 'noopener,noreferrer');
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <>
      <ScrollToHash />
      <CookieBanner />
      <Suspense fallback={<PageLoader />}>
        <Routes>
        <Route path="/" element={<Navigate to="/de" replace />} />

        <Route path="/dev/scenes" element={<DevScenes />} />

        <Route path="/de" element={<HomePage />} />
        <Route path="/en" element={<HomePage />} />

        <Route path="/de/produkt" element={<ProduktDE />} />
        <Route path="/en/product" element={<ProduktDE />} />

        {/* Unified IA phase 2: solutions hub + contact */}
        <Route path="/de/loesungen" element={<SolutionsPage />} />
        <Route path="/en/solutions" element={<SolutionsPage />} />
        <Route path="/fr/solutions" element={<SolutionsPage />} />
        <Route path="/ar/solutions" element={<SolutionsPage />} />
        <Route path="/de/kontakt" element={<ContactPage />} />
        <Route path="/en/contact" element={<ContactPage />} />
        <Route path="/fr/contact" element={<ContactPage />} />
        <Route path="/ar/contact" element={<ContactPage />} />

        {/* merged into /produkt (unified IA phase 1) — old URLs redirect to the anchor */}
        <Route path="/de/how-it-works" element={<Navigate to="/de/produkt#how-it-works" replace />} />
        <Route path="/en/how-it-works" element={<Navigate to="/en/product#how-it-works" replace />} />

        <Route path="/de/immobilien-crm-alternative" element={<CrmAlternativeDE />} />
        <Route path="/en/real-estate-crm-alternative" element={<CrmAlternativeDE />} />

        <Route path="/de/preise" element={<PricingDE />} />
        <Route path="/en/pricing" element={<PricingDE />} />

        <Route path="/de/demo" element={<Navigate to="/de/kontakt?intent=demo" replace />} />
        <Route path="/en/demo" element={<Navigate to="/en/contact?intent=demo" replace />} />

        <Route path="/de/beta-agentenprogramm" element={<Navigate to="/de/preise#beta" replace />} />
        <Route path="/en/beta-agent-program" element={<Navigate to="/en/pricing#beta" replace />} />

        {/* AI-refinement pages (draft/ai-refinement) */}
        <Route path="/de/ki-funktionen" element={<AiFeaturesPage />} />
        <Route path="/en/ai-features-platform" element={<AiFeaturesPage />} />
        <Route path="/de/compliance" element={<CompliancePage />} />
        <Route path="/en/compliance" element={<CompliancePage />} />
        <Route path="/de/warum-immob24" element={<WhyImmob24Page />} />
        <Route path="/en/why-immob24" element={<WhyImmob24Page />} />

        {/* AI-refinement: French + Arabic core routes (draft/ai-refinement).
            Pages localise themselves via useLanguage(); untranslated strings
            fall back to English. */}
        <Route path="/fr" element={<HomePage />} />
        <Route path="/ar" element={<HomePage />} />
        <Route path="/fr/produit" element={<ProduktDE />} />
        <Route path="/ar/product" element={<ProduktDE />} />
        <Route path="/fr/comment-ca-marche" element={<Navigate to="/fr/produit#how-it-works" replace />} />
        <Route path="/ar/how-it-works" element={<Navigate to="/ar/product#how-it-works" replace />} />
        <Route path="/fr/alternative-crm-immobilier" element={<CrmAlternativeDE />} />
        <Route path="/ar/real-estate-crm-alternative" element={<CrmAlternativeDE />} />
        <Route path="/fr/tarifs" element={<PricingDE />} />
        <Route path="/ar/pricing" element={<PricingDE />} />
        <Route path="/fr/demo" element={<Navigate to="/fr/contact?intent=demo" replace />} />
        <Route path="/ar/demo" element={<Navigate to="/ar/contact?intent=demo" replace />} />
        <Route path="/fr/programme-beta-agents" element={<Navigate to="/fr/tarifs#beta" replace />} />
        <Route path="/ar/beta-agent-program" element={<Navigate to="/ar/pricing#beta" replace />} />
        <Route path="/fr/fonctions-ia" element={<AiFeaturesPage />} />
        <Route path="/ar/ai-features-platform" element={<AiFeaturesPage />} />
        <Route path="/fr/conformite" element={<CompliancePage />} />
        <Route path="/ar/compliance" element={<CompliancePage />} />
        <Route path="/fr/pourquoi-immob24" element={<WhyImmob24Page />} />
        <Route path="/ar/why-immob24" element={<WhyImmob24Page />} />


        {/*
          Tally redirects successful beta applicants here. The page fires
          fbq('track', 'Lead') on mount so Meta Ads records the conversion
          (when marketing consent has been given). NOT in sitemap.xml —
          post-conversion only, never search-discoverable.
        */}
        <Route path="/de/beta-bewerbung-erfolgreich" element={<BetaThankYou />} />
        <Route path="/en/beta-application-success" element={<BetaThankYou />} />

        {/*
          SEO landing pages — DE-only, currently noindex'd. They live at
          stable URLs so internal links can point to them; they only start
          earning traffic once the site-wide noindex is lifted post-entity.
        */}
        <Route path="/de/maklersoftware/muenchen" element={<MaklersoftwareMuenchen />} />
        <Route path="/de/maklersoftware/berlin" element={<MaklersoftwareBerlin />} />
        <Route path="/de/maklersoftware/hamburg" element={<MaklersoftwareHamburg />} />
        <Route path="/de/ki-fuer-immobilienmakler" element={<KiFuerImmobilienmakler />} />

        <Route
          path="/en/real-estate-agent-software/munich"
          element={<RealEstateAgentSoftwareMunich />}
        />
        <Route
          path="/en/real-estate-agent-software/berlin"
          element={<RealEstateAgentSoftwareBerlin />}
        />
        <Route
          path="/en/real-estate-agent-software/hamburg"
          element={<RealEstateAgentSoftwareHamburg />}
        />
        <Route path="/en/ai-for-real-estate-agents" element={<AiForRealEstateAgents />} />

        {/* Legacy English slugs — redirect to the current SEO URLs. */}
        <Route
          path="/en/crm-alternative"
          element={<Navigate to="/en/real-estate-crm-alternative" replace />}
        />
        <Route
          path="/en/beta-program"
          element={<Navigate to="/en/beta-agent-program" replace />}
        />

          <Route path="*" element={<HomePage />} />
        </Routes>
      </Suspense>
    </>
  );
}