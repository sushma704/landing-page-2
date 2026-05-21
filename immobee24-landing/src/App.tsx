import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ScrollToHash } from './lib/ScrollToHash';
import { DEMO_BOOKING_URL } from './components/SiteChrome';
import HomePage from './pages/HomePage';
import ProduktDE from './pages/ProduktDE';
import BetaProgrammDE from './pages/BetaProgrammDE';
import HowItWorksDE from './pages/HowItWorksDE';
import DemoDE from './pages/DemoDE';
import CrmAlternativeDE from './pages/CrmAlternativeDE';
import PricingDE from './pages/PricingDE';

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
      <Routes>
        <Route path="/" element={<Navigate to="/de" replace />} />

        <Route path="/de" element={<HomePage />} />
        <Route path="/en" element={<HomePage />} />

        <Route path="/de/produkt" element={<ProduktDE />} />
        <Route path="/en/product" element={<ProduktDE />} />

        <Route path="/de/how-it-works" element={<HowItWorksDE />} />
        <Route path="/en/how-it-works" element={<HowItWorksDE />} />

        <Route path="/de/immobilien-crm-alternative" element={<CrmAlternativeDE />} />
        <Route path="/en/real-estate-crm-alternative" element={<CrmAlternativeDE />} />

        <Route path="/de/preise" element={<PricingDE />} />
        <Route path="/en/pricing" element={<PricingDE />} />

        <Route path="/de/demo" element={<DemoDE />} />
        <Route path="/en/demo" element={<DemoDE />} />

        <Route path="/de/beta-agentenprogramm" element={<BetaProgrammDE />} />
        <Route path="/en/beta-agent-program" element={<BetaProgrammDE />} />

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
    </>
  );
}