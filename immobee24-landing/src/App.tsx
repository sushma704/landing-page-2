import { Route, Routes } from 'react-router-dom';
import { ScrollToHash } from './lib/ScrollToHash';
import HomePage from './pages/HomePage';
import ProduktDE from './pages/ProduktDE';

export default function App() {
  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/de/produkt" element={<ProduktDE />} />
        {/* Fallback: anything unknown shows the homepage so the site never goes blank. */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  );
}