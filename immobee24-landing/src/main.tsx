import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { ErrorBoundary } from './components/ErrorBoundary.tsx'
import { LanguageProvider } from './i18n'
import { bootstrapConsent } from './lib/consent'

// Self-hosted fonts. These weights match the families/weights tailwind.config.js
// declares (font-heading / font-body / font-metric). Loading from npm means no
// request ever goes to fonts.googleapis.com — closes the LG München I (2022)
// Google-Fonts GDPR exposure.
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/dm-sans/400.css'
import '@fontsource/dm-sans/500.css'
import '@fontsource/dm-sans/600.css'
import '@fontsource/dm-sans/700.css'

import './index.css'
import App from './App.tsx'

// Honour a returning visitor's previous consent BEFORE React mounts, so
// the trackers are injected as early as possible (matches the behaviour
// the old static <script> tags had).
bootstrapConsent()

// DRAFT-OFFLINE MODE (PO review only, never set in production builds):
// VITE_DRAFT_OFFLINE=1 swaps BrowserRouter for HashRouter so the built site
// navigates correctly when opened straight from an unzipped folder
// (file:// — no web server). Production builds leave the flag unset and are
// byte-identical in behaviour to before.
const Router = import.meta.env.VITE_DRAFT_OFFLINE === '1' ? HashRouter : BrowserRouter

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Router>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </Router>
    </ErrorBoundary>
  </StrictMode>,
)
