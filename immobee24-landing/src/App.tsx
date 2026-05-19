import { Navigate, Route, Routes } from 'react-router-dom';
import { ScrollToHash } from './lib/ScrollToHash';
import HomePage from './pages/HomePage';
import ProduktDE from './pages/ProduktDE';
import BetaProgrammDE from './pages/BetaProgrammDE';
import HowItWorksDE from './pages/HowItWorksDE';
import DemoDE from './pages/DemoDE';
import CrmAlternativeDE from './pages/CrmAlternativeDE';
import PricingDE from './pages/PricingDE';

export default function App() {
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
        <Route path="/en/crm-alternative" element={<CrmAlternativeDE />} />

        <Route path="/de/preise" element={<PricingDE />} />
        <Route path="/en/pricing" element={<PricingDE />} />

        <Route path="/de/demo" element={<DemoDE />} />
        <Route path="/en/demo" element={<DemoDE />} />

        <Route path="/de/beta-agentenprogramm" element={<BetaProgrammDE />} />
        <Route path="/en/beta-program" element={<BetaProgrammDE />} />

        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  );
}