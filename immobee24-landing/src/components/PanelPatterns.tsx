// Panel patterns (product-page redesign, rolled out to /solutions):
// 1. Panel / AccentHeading — page-scale rounded gradient containers with a
//    «marked» accent phrase in headings (markers live in the i18n strings)
// 2. WorkflowSpotlight — auto-cycling step list + crossfading visual stage
// 3. ScreensCarousel — scroll-snap tour of the real dashboard screenshots
// 4. SectionHopButton — floating next-section / back-to-top hop
// Reuses the existing motion primitives only; theme- and RTL-aware; all
// auto-motion pauses on hover/focus and disables under reduced motion.

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react';
import { Reveal, slowmoFactor, useInView, usePrefersReducedMotion } from '../lib/animations';
import { useLanguage } from '../i18n';
import type { Language } from '../i18n';

type L10n = Record<Language, string>;
const pick = (l: L10n, lang: Language) => l[lang] ?? l.en;

// ── Pattern 1: panel container + accent heading ─────────────────────────────

export const Panel = ({
  id,
  children,
  className = '',
  padded = true,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) => (
  <section id={id} className={`py-10 md:py-14 ${className}`}>
    <div className="container max-w-[1200px]">
      <Reveal direction="scale">
        <div className={`panel-card overflow-hidden rounded-3xl ${padded ? 'p-6 md:p-12' : ''}`}>
          {children}
        </div>
      </Reveal>
    </div>
  </section>
);

/** Renders a heading whose «marked» phrase (from the i18n string) is accent-
 *  colored. Marker-based so every language chooses its own phrase. */
export const AccentHeading = ({
  text,
  as: Tag = 'h2',
  className = '',
}: {
  text: string;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
}) => {
  const parts = text.split(/[«»]/);
  return (
    <Tag className={className}>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <span key={i} className="text-golden-dark dark:text-golden">
            {p}
          </span>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </Tag>
  );
};

// ── Pattern 2: auto-cycling workflow spotlight ───────────────────────────────

const SPOT_SCREENS = [
  '/screens/dashboard.webp',
  '/screens/messages.webp',
  '/screens/leads.webp',
  '/screens/ai-control.webp',
  '/screens/analytics.webp',
];

const CYCLE_MS = 3000;
const MANUAL_PAUSE_MS = 8000;

export const WorkflowSpotlight = ({ steps }: { steps: string[] }) => {
  const reduced = usePrefersReducedMotion();
  const [hostRef, inView] = useInView<HTMLDivElement>();
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0); // restarts the progress bar
  const [paused, setPaused] = useState(false); // hover/focus
  const manualUntil = useRef(0);
  const n = Math.min(steps.length, SPOT_SCREENS.length);
  const cycling = !reduced && inView && !paused;

  useEffect(() => {
    if (!cycling) return;
    const ms = CYCLE_MS * slowmoFactor();
    const id = window.setInterval(() => {
      if (performance.now() < manualUntil.current) return;
      setActive((a) => (a + 1) % n);
      setCycle((c) => c + 1);
    }, ms);
    return () => window.clearInterval(id);
  }, [cycling, n]);

  const select = (i: number) => {
    manualUntil.current = performance.now() + MANUAL_PAUSE_MS * slowmoFactor();
    setActive(i);
    setCycle((c) => c + 1);
  };

  const barRunning = cycling && performance.now() >= manualUntil.current;

  return (
    <div
      ref={hostRef}
      className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.3fr] lg:items-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* step list: vertical on desktop, scrollable chips on mobile */}
      <div className="snap-rail flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
        {steps.slice(0, n).map((step, i) => {
          const isActive = !reduced && active === i;
          const dimmed = !reduced && active !== i;
          return (
            <button
              key={i}
              type="button"
              onClick={() => select(i)}
              aria-current={active === i}
              className={`relative flex-shrink-0 overflow-hidden rounded-xl px-4 py-3 text-start text-sm md:text-base font-medium transition-all duration-300 lg:flex-shrink ${
                isActive
                  ? 'bg-gradient-golden text-[#1E1B16] scale-[1.02] shadow-golden'
                  : reduced && active === i
                    ? 'bg-gradient-golden text-[#1E1B16]'
                    : `bg-white/60 text-charcoal border border-charcoal/10 dark:bg-white/5 dark:border-white/10 ${
                        dimmed ? 'opacity-60 hover:opacity-100' : ''
                      }`
              }`}
            >
              <span className="me-2 font-metric text-xs font-bold opacity-70">
                {String(i + 1).padStart(2, '0')}
              </span>
              {step}
              {/* time-to-next progress inside the active item */}
              {isActive && (
                <span
                  key={`${active}-${cycle}`}
                  aria-hidden
                  className="spot-progress absolute inset-x-0 bottom-0 h-0.5 w-full bg-[#1E1B16]/40"
                  style={{
                    ['--spot-ms' as string]: `${CYCLE_MS * slowmoFactor()}ms`,
                    animationPlayState: barRunning ? 'running' : 'paused',
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* visual stage: fixed aspect, 250ms crossfade + slow settle-zoom */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-golden/25 bg-white shadow-card ring-1 ring-golden/10">
        {SPOT_SCREENS.slice(0, n).map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            width={1600}
            height={1000}
            loading={i === 0 ? 'eager' : 'lazy'}
            className="absolute inset-0 h-full w-full object-cover object-left-top"
            style={{
              opacity: active === i ? 1 : 0,
              transform: reduced ? undefined : active === i ? 'scale(1)' : 'scale(1.045)',
              transition: reduced
                ? undefined
                : 'opacity 250ms ease-out, transform 2600ms cubic-bezier(0.22,1,0.36,1)',
            }}
          />
        ))}
      </div>
    </div>
  );
};

// ── Pattern 3: screenshot carousel (scroll-snap, no lib) ────────────────────

const SHOT_FRAMES: Array<{ img: string; title: L10n; body: L10n }> = [
  {
    img: '/screens/dashboard.webp',
    title: { de: 'Dashboard', en: 'Dashboard', fr: 'Tableau de bord', ar: 'لوحة التحكم' },
    body: {
      de: 'Pipeline, Aufgaben und heutige Besichtigungen in einer Morgenansicht.',
      en: 'Pipeline, tasks and today’s viewings in one morning view.',
      fr: 'Pipeline, tâches et visites du jour dans une seule vue.',
      ar: 'خط المبيعات والمهام ومعاينات اليوم في عرض واحد.',
    },
  },
  {
    img: '/screens/leads.webp',
    title: { de: 'Leads', en: 'Leads', fr: 'Leads', ar: 'العملاء المحتملون' },
    body: {
      de: 'Budget, Zeitrahmen und Finanzierung direkt im ersten Gespräch erfasst.',
      en: 'Budget, timeframe and financing captured in the first conversation.',
      fr: 'Budget, délai et financement saisis dès la première conversation.',
      ar: 'الميزانية والإطار الزمني والتمويل تُلتقط في أول محادثة.',
    },
  },
  {
    img: '/screens/properties.webp',
    title: { de: 'Objekte', en: 'Properties', fr: 'Biens', ar: 'العقارات' },
    body: {
      de: 'Inserate, Exposés und Dokumente pro Objekt organisiert.',
      en: 'Listings, exposés and documents organised per property.',
      fr: 'Annonces, dossiers et documents organisés par bien.',
      ar: 'الإعلانات والعروض والمستندات منظمة لكل عقار.',
    },
  },
  {
    img: '/screens/analytics.webp',
    title: { de: 'Analytics', en: 'Analytics', fr: 'Analytics', ar: 'التحليلات' },
    body: {
      de: 'Reaktionszeiten, Conversion und Pipeline-Wert auf einen Blick.',
      en: 'Response times, conversion and pipeline value at a glance.',
      fr: 'Temps de réponse, conversion et valeur du pipeline en un coup d’œil.',
      ar: 'أوقات الاستجابة والتحويل وقيمة خط المبيعات في لمحة.',
    },
  },
  {
    img: '/screens/messages.webp',
    title: { de: 'Nachrichten', en: 'Messages', fr: 'Messages', ar: 'الرسائل' },
    body: {
      de: 'Portal-E-Mails, Webformulare und Chat in einer Warteschlange.',
      en: 'Portal emails, web forms and chat in one queue.',
      fr: 'E-mails de portails, formulaires et chat dans une seule file.',
      ar: 'رسائل البوابات والنماذج والدردشة في قائمة واحدة.',
    },
  },
  {
    img: '/screens/campaigns.webp',
    title: { de: 'Kampagnen', en: 'Campaigns', fr: 'Campagnes', ar: 'الحملات' },
    body: {
      de: 'Meta-Ads-Ergebnisse direkt neben den erzeugten Leads.',
      en: 'Meta Ads results tracked next to the leads they created.',
      fr: 'Résultats Meta Ads suivis à côté des leads générés.',
      ar: 'نتائج إعلانات ميتا بجانب العملاء الذين أنشأتهم.',
    },
  },
  {
    img: '/screens/portfolio.webp',
    title: { de: 'Portfolio', en: 'Portfolio', fr: 'Portefeuille', ar: 'المحفظة' },
    body: {
      de: 'Bestandsüberblick mit Performance pro Objekt.',
      en: 'Portfolio overview with per-property performance.',
      fr: 'Vue du portefeuille avec performance par bien.',
      ar: 'نظرة عامة على المحفظة مع أداء كل عقار.',
    },
  },
  {
    img: '/screens/ai-control.webp',
    title: { de: 'AI Control', en: 'AI Control', fr: 'Contrôle IA', ar: 'التحكم بالذكاء الاصطناعي' },
    body: {
      de: 'Jede KI-Aktion sichtbar, protokolliert und mit Freigabe.',
      en: 'Every AI action visible, logged and approval-gated.',
      fr: 'Chaque action IA visible, journalisée et soumise à validation.',
      ar: 'كل إجراء للذكاء الاصطناعي مرئي ومسجل وخاضع للموافقة.',
    },
  },
];

const CAROUSEL_HEAD: L10n = {
  de: 'Echte Screens aus dem «Produkt»',
  en: 'Real screens from «the product»',
  fr: 'De vrais écrans du «produit»',
  ar: 'شاشات حقيقية من «المنتج»',
};
const CAROUSEL_SUB: L10n = {
  de: 'Keine Mockups — wischen, ziehen oder mit den Pfeilen blättern.',
  en: 'No mockups — swipe, drag or use the arrows to browse.',
  fr: 'Pas de maquettes — balayez, faites glisser ou utilisez les flèches.',
  ar: 'ليست نماذج تجريبية — اسحبوا أو استخدموا الأسهم للتصفح.',
};

export const ScreensCarousel = () => {
  const { language } = useLanguage();
  const reduced = usePrefersReducedMotion();
  const railRef = useRef<HTMLDivElement | null>(null);
  const drag = useRef<{ startX: number; startScroll: number; on: boolean }>({
    startX: 0,
    startScroll: 0,
    on: false,
  });

  const stepBy = useCallback(
    (dir: 1 | -1) => {
      const rail = railRef.current;
      if (!rail) return;
      const card = rail.querySelector<HTMLElement>('[data-card]');
      const w = card ? card.offsetWidth + 20 : rail.clientWidth * 0.4;
      const rtl = getComputedStyle(rail).direction === 'rtl';
      rail.scrollBy({ left: dir * w * (rtl ? -1 : 1), behavior: reduced ? 'auto' : 'smooth' });
    },
    [reduced],
  );

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') (e.preventDefault(), stepBy(1));
    if (e.key === 'ArrowLeft') (e.preventDefault(), stepBy(-1));
  };

  return (
    <section id="screens" className="py-20 md:py-28 bg-white">
      <div className="container max-w-6xl">
        <div className="max-w-3xl">
          <AccentHeading
            text={pick(CAROUSEL_HEAD, language)}
            className="font-heading text-section-mobile md:text-section text-charcoal text-balance"
          />
          <Reveal as="p" delay={120} className="mt-4 text-body-lg text-slate">
            {pick(CAROUSEL_SUB, language)}
          </Reveal>
        </div>

        <div
          ref={railRef}
          role="region"
          aria-label={pick(CAROUSEL_HEAD, language).replace(/[«»]/g, '')}
          tabIndex={0}
          onKeyDown={onKey}
          onPointerDown={(e) => {
            if (e.pointerType !== 'mouse') return;
            const rail = railRef.current!;
            drag.current = { startX: e.clientX, startScroll: rail.scrollLeft, on: true };
            rail.setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            if (!drag.current.on) return;
            railRef.current!.scrollLeft = drag.current.startScroll - (e.clientX - drag.current.startX);
          }}
          onPointerUp={() => (drag.current.on = false)}
          onPointerCancel={() => (drag.current.on = false)}
          className="snap-rail mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth outline-none focus-visible:ring-2 focus-visible:ring-golden"
        >
          {SHOT_FRAMES.map((c, i) => (
            <Reveal
              key={c.img}
              delay={(i % 3) * 80}
              className="w-[88%] flex-shrink-0 snap-start sm:w-[60%] lg:w-[38.5%]"
            >
              <figure
                data-card
                className="no-fill select-none overflow-hidden rounded-2xl border border-charcoal/10 bg-white shadow-subtle transition-shadow hover:shadow-card-hover"
              >
                {/* browser-style chrome */}
                <div className="flex items-center gap-1.5 border-b border-charcoal/10 bg-cream/70 px-3.5 py-2">
                  <span className="h-2 w-2 rounded-full bg-health-crit/70" />
                  <span className="h-2 w-2 rounded-full bg-health-warn/70" />
                  <span className="h-2 w-2 rounded-full bg-health-ok/70" />
                  <span className="ms-2 rounded-md bg-white px-2 py-0.5 text-[10px] text-warm-gray">
                    immob24 · {pick(c.title, language)}
                  </span>
                </div>
                <img
                  src={c.img}
                  alt={pick(c.title, language)}
                  width={1600}
                  height={1000}
                  loading="lazy"
                  draggable={false}
                  className="aspect-[16/10] w-full object-cover object-left-top"
                />
                <figcaption className="p-4">
                  <span className="font-heading text-base text-charcoal">{pick(c.title, language)}</span>
                  <p className="mt-1 text-sm leading-relaxed text-slate">{pick(c.body, language)}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            aria-label="previous"
            onClick={() => stepBy(-1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/15 text-charcoal transition-colors hover:border-golden hover:bg-gradient-golden hover:text-[#1E1B16]"
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
          </button>
          <button
            type="button"
            aria-label="next"
            onClick={() => stepBy(1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/15 text-charcoal transition-colors hover:border-golden hover:bg-gradient-golden hover:text-[#1E1B16]"
          >
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </button>
        </div>
      </div>
    </section>
  );
};

// ── Pattern 4: floating section-hop button ──────────────────────────────────

const HOP_NEXT: L10n = {
  de: 'Nächster Abschnitt',
  en: 'Next section',
  fr: 'Section suivante',
  ar: 'القسم التالي',
};
const HOP_TOP: L10n = {
  de: 'Zurück nach oben',
  en: 'Back to top',
  fr: 'Retour en haut',
  ar: 'العودة إلى الأعلى',
};

export const SectionHopButton = () => {
  const { language } = useLanguage();
  const reduced = usePrefersReducedMotion();
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setAtEnd(window.scrollY + window.innerHeight >= document.body.scrollHeight - 480);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const hop = () => {
    const behavior: ScrollBehavior = reduced ? 'auto' : 'smooth';
    if (atEnd) {
      window.scrollTo({ top: 0, behavior });
      return;
    }
    const scope = document.querySelector('main') ?? document.body;
    const sections = [...scope.querySelectorAll<HTMLElement>('section')].filter(
      (s) => s.offsetHeight > 250,
    );
    const y = window.scrollY;
    const next = sections.find((s) => s.offsetTop > y + 120);
    if (next) window.scrollTo({ top: next.offsetTop - 72, behavior });
    else window.scrollTo({ top: 0, behavior });
  };

  return (
    // centering lives on the wrapper so the float animation's transform
    // doesn't cancel the translateX(-50%)
    <div className="fixed bottom-6 left-1/2 z-40 hidden -translate-x-1/2 md:block">
      <button
        type="button"
        onClick={hop}
        aria-label={pick(atEnd ? HOP_TOP : HOP_NEXT, language)}
        className="hop-float inline-flex h-11 w-11 items-center justify-center rounded-full border border-golden/50 bg-white/80 text-golden-dark shadow-card backdrop-blur transition-colors hover:bg-gradient-golden hover:text-[#1E1B16] dark:bg-white/10 dark:text-golden"
      >
        {atEnd ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
      </button>
    </div>
  );
};
