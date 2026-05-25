// Cookie consent state + deferred tracker loading.
//
// Tracking scripts (Google Analytics, Meta Pixel, BotPenguin chat) are NOT
// loaded by index.html. They are injected here only after the visitor
// consents to the matching category. This is what makes the site
// TTDSG §25 / GDPR Art. 6/7 compliant.
//
// Storage shape (localStorage key `immob24_consent_v2`):
//   { analytics: bool, marketing: bool, chat: bool, decidedAt: ISO8601 }
//
// If the schema or category set ever changes, bump STORAGE_KEY's version
// suffix — the banner will then re-prompt all returning visitors. v2 added
// the `chat` category (BotPenguin widget) so v1 visitors get re-prompted.

const STORAGE_KEY = 'immob24_consent_v2';
const GA_ID = 'G-MQKZ3EHWR9';
const META_PIXEL_ID = '26806117632348430';
const BOTPENGUIN_SRC = 'https://cdn.botpenguin.com/website-bot.js';
const BOTPENGUIN_IDS = '6a14160e9023bca2877cf724,6a14135edd1338ee4740a229';

export type ConsentCategories = {
  analytics: boolean;
  marketing: boolean;
  chat: boolean;
};

export type StoredConsent = ConsentCategories & {
  decidedAt: string;
};

type Listener = (state: StoredConsent | null) => void;
const listeners = new Set<Listener>();

// In-memory tracking of which loaders we've already injected this session.
const loaded = {
  ga: false,
  meta: false,
  chat: false,
};

export function readConsent(): StoredConsent | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (
      typeof parsed.analytics !== 'boolean' ||
      typeof parsed.marketing !== 'boolean' ||
      typeof parsed.chat !== 'boolean'
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function hasDecided(): boolean {
  return readConsent() !== null;
}

export function saveConsent(cats: ConsentCategories): void {
  const next: StoredConsent = {
    analytics: cats.analytics,
    marketing: cats.marketing,
    chat: cats.chat,
    decidedAt: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage may be disabled (private mode / quota). The consent still
    // applies for this session — the user just sees the banner again later.
  }
  applyConsent(next);
  listeners.forEach((cb) => cb(next));
}

export function clearConsent(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
  listeners.forEach((cb) => cb(null));
}

export function subscribe(cb: Listener): () => void {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

// Called once at app startup (from main.tsx) to honour a returning visitor's
// previous choice. Safe to call before any consent decision: it no-ops in
// that case.
export function bootstrapConsent(): void {
  const stored = readConsent();
  if (stored) applyConsent(stored);
}

function applyConsent(state: StoredConsent): void {
  if (state.analytics) {
    enableGA();
  } else {
    disableGA();
  }
  if (state.marketing) {
    enableMetaPixel();
  } else {
    disableMetaPixel();
  }
  if (state.chat) {
    enableBotPenguin();
  } else {
    disableBotPenguin();
  }
}

// ----- Google Analytics -----------------------------------------------------

function enableGA(): void {
  // Allow GA to fire on this page load + future page loads.
  // gtag's opt-out flag is cleared by re-loading the script.
  (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = false;

  if (loaded.ga) return;
  loaded.ga = true;

  // Inline init mirrors the official gtag.js snippet — runs before the
  // external script finishes loading, so events queued before then are kept.
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  } as typeof window.gtag;
  window.gtag!('js', new Date());
  window.gtag!('config', GA_ID, { anonymize_ip: true });

  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
}

function disableGA(): void {
  // Block any further requests from the already-loaded gtag.js script.
  (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = true;
}

// ----- Meta Pixel -----------------------------------------------------------

function enableMetaPixel(): void {
  if (loaded.meta) {
    // Re-grant consent on Meta's side after a prior revoke.
    window.fbq?.('consent', 'grant');
    window.fbq?.('track', 'PageView');
    return;
  }
  loaded.meta = true;

  // Standard Meta Pixel bootstrap, transcribed from the official snippet.
  /* eslint-disable */
  (function (f: any, b: any, e: string, v: string) {
    if (f.fbq) return;
    const n: any = (f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    });
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = '2.0';
    n.queue = [];
    const t: any = b.createElement(e);
    t.async = true;
    t.src = v;
    const s: any = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */

  window.fbq!('init', META_PIXEL_ID);
  window.fbq!('track', 'PageView');
}

function disableMetaPixel(): void {
  // Meta supports per-page consent revoke. Subsequent fbq() calls become no-ops
  // until 'consent', 'grant' is called.
  window.fbq?.('consent', 'revoke');
}

// ----- BotPenguin chat widget -----------------------------------------------
//
// Loads the standard BotPenguin embed (script + widget IDs in script body).
// BotPenguin auto-positions the chat bubble in the bottom-right corner.
//
// Disable note: the embed script does not expose a clean teardown API, so a
// mid-session revoke removes the <script> tag and best-effort removes the
// widget container — visitors who revoke and don't reload may still see a
// brief residue. Next page load is fully clean.

function enableBotPenguin(): void {
  if (loaded.chat) return;
  if (document.getElementById('messenger-widget-b')) {
    loaded.chat = true;
    return;
  }
  loaded.chat = true;
  const s = document.createElement('script');
  s.id = 'messenger-widget-b';
  s.src = BOTPENGUIN_SRC;
  s.defer = true;
  // BotPenguin reads its widget IDs from the script's innerText.
  s.textContent = BOTPENGUIN_IDS;
  document.body.appendChild(s);
}

function disableBotPenguin(): void {
  if (!loaded.chat) return;
  loaded.chat = false;
  document.getElementById('messenger-widget-b')?.remove();
  // Best-effort: remove any BotPenguin-injected container so the widget UI
  // disappears immediately. The next page load is fully clean either way.
  document
    .querySelectorAll(
      '[id^="botpenguin"], [class*="botpenguin"], [id*="messenger-widget"]',
    )
    .forEach((el) => {
      if (el.id !== 'messenger-widget-b') el.remove();
    });
}
