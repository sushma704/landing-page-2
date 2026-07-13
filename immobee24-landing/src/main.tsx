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
// Exactly two families: Poppins (headings, 600/700) and Inter (body/UI,
// 400/500/600), latin + latin-ext subsets only. DM Sans was removed — the
// font-metric token now resolves to Inter (tabular digits look identical at
// metric sizes and we save ~200KB of font payload).
import '@fontsource/poppins/latin-600.css'
import '@fontsource/poppins/latin-ext-600.css'
import '@fontsource/poppins/latin-700.css'
import '@fontsource/poppins/latin-ext-700.css'
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-ext-400.css'
import '@fontsource/inter/latin-500.css'
import '@fontsource/inter/latin-ext-500.css'
import '@fontsource/inter/latin-600.css'
import '@fontsource/inter/latin-ext-600.css'

import './index.css'
import App from './App.tsx'

// Honour a returning visitor's previous consent BEFORE React mounts, so
// the trackers are injected as early as possible (matches the behaviour
// the old static <script> tags had).
bootstrapConsent()

// Apply the persisted light/dark theme before first paint (no flash).
// Dark-only theme: <html class="dark"> is hardcoded in index.html.

// DEBUG (dev/localhost only): ?slowmo=5 multiplies all entrance-choreography
// delays and durations, for verifying load sequences frame by frame.
try {
  const slow = new URLSearchParams(window.location.search).get('slowmo')
  if (slow && (import.meta.env.DEV || window.location.hostname === 'localhost')) {
    document.documentElement.style.setProperty('--slowmo', String(Math.max(1, Number(slow) || 1)))
  }
} catch { /* no-op */ }

// DEBUG (dev/localhost): with ?slowmo or ?debug-entrance, log every entrance
// event (element + ms since first) so choreography is verifiable in console.
try {
  const q = new URLSearchParams(window.location.search)
  if ((q.has('slowmo') || q.has('debug-entrance')) && (import.meta.env.DEV || window.location.hostname === 'localhost')) {
    let t0: number | null = null
    const stamp = () => {
      if (t0 === null) t0 = performance.now()
      return Math.round(performance.now() - t0)
    }
    const label = (el: Element) =>
      (el.textContent || '').trim().slice(0, 32) || el.tagName
    document.addEventListener('animationstart', (e) => {
      const n = (e as AnimationEvent).animationName
      if (!/chorIn|chorScaleIn|heroIn|pulseGlow|badgePop|routeIn/.test(n)) return
      console.log(`[entrance] t=${stamp()}ms ${n} — "${label(e.target as Element)}"`)
    }, true)
    document.addEventListener('transitionstart', (e) => {
      const el = e.target as Element
      if ((e as TransitionEvent).propertyName !== 'transform') return
      if (!(el.classList?.contains('cascade-item') || el.classList?.contains('cascade-cell') || el.closest?.('.cascade-on'))) return
      console.log(`[cascade] t=${stamp()}ms — "${label(el)}"`)
    }, true)
  }
} catch { /* no-op */ }

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
