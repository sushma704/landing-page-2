import { Route, Routes } from 'react-router-dom';
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
        <Route path="/" element={<HomePage />} />
        <Route path="/de/produkt" element={<ProduktDE />} />
        <Route path="/de/how-it-works" element={<HowItWorksDE />} />
        <Route path="/de/immobilien-crm-alternative" element={<CrmAlternativeDE />} />
        <Route path="/de/preise" element={<PricingDE />} />
        <Route path="/de/demo" element={<DemoDE />} />
        <Route path="/de/beta-agentenprogramm" element={<BetaProgrammDE />} />
        {/* Fallback: anything unknown shows the homepage so the site never goes blank. */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  );
}