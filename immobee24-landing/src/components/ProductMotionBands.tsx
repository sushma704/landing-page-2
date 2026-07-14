// Product-page motion bands (PO-approved concept, product rollout first):
// T1 ModuleSpotlight — auto-cycling two-tone band, module list + screen swap
// T2 ScreenRail    — auto-advancing rail of real dashboard screens
// T3 StatBand      — count-up stats + growing chart, draws on scroll-in
// All copy inline in 4 languages (live-feature claims only); auto-motion
// pauses on hover and is disabled under prefers-reduced-motion; RTL-safe.

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CountUp, LineReveal, Reveal, usePrefersReducedMotion } from '../lib/animations';
import { useLanguage } from '../i18n';
import type { Language } from '../i18n';

type L10n = Record<Language, string>;
const pick = (l: L10n, lang: Language) => l[lang] ?? l.en;

// ── T1: module spotlight ─────────────────────────────────────────────────────
const SPOT_HEAD: L10n = {
  de: 'Erfassen, verwalten, abschließen — mit einem System',
  en: 'Capture, manage and convert — with one system',
  fr: 'Capter, gérer, convertir — avec un seul système',
  ar: 'التقاط وإدارة وتحويل — بنظام واحد',
};

const SPOT_ITEMS: Array<{ label: L10n; img: string }> = [
  {
    label: {
      de: 'Jeden Lead erfassen — kein Follow-up verpassen',
      en: 'Track every lead, never miss a follow-up',
      fr: 'Suivre chaque lead — plus aucun suivi manqué',
      ar: 'تتبّع كل عميل محتمل — بلا متابعات ضائعة',
    },
    img: '/screens/leads.webp',
  },
  {
    label: {
      de: 'Jede Anfrage in Sekunden beantworten',
      en: 'Answer every inquiry in seconds',
      fr: 'Répondre à chaque demande en quelques secondes',
      ar: 'الإجابة عن كل استفسار في ثوانٍ',
    },
    img: '/screens/messages.webp',
  },
  {
    label: {
      de: 'Objekte & Exposés im Griff',
      en: 'Properties & exposés under control',
      fr: 'Biens et dossiers sous contrôle',
      ar: 'العقارات والعروض تحت السيطرة',
    },
    img: '/screens/properties.webp',
  },
  {
    label: {
      de: 'Kampagnen, die die Pipeline füllen',
      en: 'Campaigns that fill the pipeline',
      fr: 'Des campagnes qui remplissent le pipeline',
      ar: 'حملات تملأ خط المبيعات',
    },
    img: '/screens/campaigns.webp',
  },
  {
    label: {
      de: 'Klare Berichte & Einblicke jederzeit',
      en: 'Clear reports & insights anytime',
      fr: 'Rapports clairs et aperçus à tout moment',
      ar: 'تقارير واضحة ورؤى في أي وقت',
    },
    img: '/screens/analytics.webp',
  },
];

export const ModuleSpotlight = () => {
  const { language } = useLanguage();
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    if (reduced || hover) return;
    const id = window.setInterval(() => setActive((v) => (v + 1) % SPOT_ITEMS.length), 2600);
    return () => window.clearInterval(id);
  }, [reduced, hover]);

  return (
    <section className="py-10 md:py-14">
      <div className="container max-w-6xl">
        <Reveal>
          <div
            className="band-dark overflow-hidden rounded-3xl bg-gradient-to-br from-[#0C6F5F] to-[#17140F]"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <div className="p-8 pb-0 md:p-10 md:pb-0">
              <h2 className="font-heading text-2xl md:text-3xl text-white text-balance">
                {pick(SPOT_HEAD, language)}
              </h2>
            </div>
            <div className="mt-6 grid md:grid-cols-[1fr_1.2fr]">
              <ul className="flex flex-col justify-end pb-8 md:pb-10">
                {SPOT_ITEMS.map((it, i) => (
                  <li key={it.img}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-pressed={active === i}
                      className={`w-full text-start px-8 md:px-10 py-3.5 text-sm md:text-base font-medium transition-all duration-500 ${
                        active === i
                          ? 'bg-white/10 text-white translate-x-1.5 rtl:-translate-x-1.5 border-s-2 border-golden'
                          : 'text-white/65 hover:text-white border-s-2 border-transparent'
                      }`}
                    >
                      {pick(it.label, language)}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="relative min-h-[16rem] md:min-h-[20rem] bg-white">
                {SPOT_ITEMS.map((it, i) => (
                  <img
                    key={it.img}
                    src={it.img}
                    alt=""
                    loading="lazy"
                    className={`absolute inset-0 h-full w-full object-cover object-left-top transition-opacity duration-700 ${
                      active === i ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// ── T2: real-screens rail ────────────────────────────────────────────────────
const RAIL_HEAD: L10n = {
  de: 'Echte Screens aus dem Produkt',
  en: 'Real screens from the product',
  fr: 'De vrais écrans du produit',
  ar: 'شاشات حقيقية من المنتج',
};
const RAIL_SUB: L10n = {
  de: 'Keine Mockups: So sieht Immob24 im Alltag aus. Die Leiste läuft von selbst — zum Anhalten einfach mit der Maus darüber.',
  en: 'No mockups: this is Immob24 in daily use. The rail advances on its own — hover to pause.',
  fr: 'Pas de maquettes : voilà Immob24 au quotidien. Le bandeau défile tout seul — survolez pour mettre en pause.',
  ar: 'ليست نماذج تجريبية: هكذا يبدو Immob24 في الاستخدام اليومي. الشريط يتقدم تلقائيًا — مرّروا المؤشر للإيقاف.',
};

const RAIL_CARDS: Array<{ title: L10n; body: L10n; img: string }> = [
  {
    title: { de: 'Ein Dashboard für das ganze Büro', en: 'One dashboard for the whole office', fr: 'Un tableau de bord pour toute l’agence', ar: 'لوحة واحدة للمكتب كله' },
    body: {
      de: 'Pipeline, Aufgaben und heutige Besichtigungen in einer Morgenansicht.',
      en: 'Pipeline, tasks and today’s viewings in a single morning view.',
      fr: 'Pipeline, tâches et visites du jour dans une seule vue.',
      ar: 'خط المبيعات والمهام ومعاينات اليوم في عرض واحد.',
    },
    img: '/screens/dashboard.webp',
  },
  {
    title: { de: 'Leads qualifizieren sich selbst', en: 'Leads qualify themselves', fr: 'Les leads se qualifient eux-mêmes', ar: 'العملاء يؤهّلون أنفسهم' },
    body: {
      de: 'Budget, Zeitrahmen und Finanzierung direkt im ersten Gespräch.',
      en: 'Budget, timeframe and financing captured in the first conversation.',
      fr: 'Budget, délai et financement dès la première conversation.',
      ar: 'الميزانية والإطار الزمني والتمويل في أول محادثة.',
    },
    img: '/screens/leads.webp',
  },
  {
    title: { de: 'Jeder Kanal in einem Posteingang', en: 'Every channel in one inbox', fr: 'Tous les canaux dans une seule boîte', ar: 'كل القنوات في صندوق واحد' },
    body: {
      de: 'Portal-E-Mails, Webformulare und Chat landen in einer Warteschlange — mit Kontext.',
      en: 'Portal emails, web forms and chat land in one queue with context.',
      fr: 'E-mails de portails, formulaires web et chat dans une seule file, avec contexte.',
      ar: 'رسائل البوابات والنماذج والدردشة في قائمة واحدة مع السياق.',
    },
    img: '/screens/messages.webp',
  },
  {
    title: { de: 'Objekte unter Kontrolle', en: 'Properties under control', fr: 'Des biens sous contrôle', ar: 'عقارات تحت السيطرة' },
    body: {
      de: 'Inserate, Exposés und Dokumente pro Objekt organisiert.',
      en: 'Listings, exposés and documents organised per property.',
      fr: 'Annonces, dossiers et documents organisés par bien.',
      ar: 'الإعلانات والعروض والمستندات منظمة لكل عقار.',
    },
    img: '/screens/properties.webp',
  },
  {
    title: { de: 'Kampagnen, die berichten', en: 'Campaigns that report back', fr: 'Des campagnes qui rendent compte', ar: 'حملات تقدّم تقاريرها' },
    body: {
      de: 'Meta-Ads-Ergebnisse direkt neben den Leads, die sie erzeugt haben.',
      en: 'Meta Ads results tracked next to the leads they created.',
      fr: 'Résultats Meta Ads suivis à côté des leads générés.',
      ar: 'نتائج إعلانات ميتا بجانب العملاء الذين أنشأتهم.',
    },
    img: '/screens/campaigns.webp',
  },
  {
    title: { de: 'Entscheidungen auf echten Zahlen', en: 'Decisions on real numbers', fr: 'Des décisions sur des chiffres réels', ar: 'قرارات مبنية على أرقام حقيقية' },
    body: {
      de: 'Reaktionszeiten, Conversion und Pipeline-Wert auf einen Blick.',
      en: 'Response times, conversion and pipeline value at a glance.',
      fr: 'Temps de réponse, conversion et valeur du pipeline en un coup d’œil.',
      ar: 'أوقات الاستجابة والتحويل وقيمة خط المبيعات في لمحة.',
    },
    img: '/screens/analytics.webp',
  },
];

export const ScreenRail = () => {
  const { language } = useLanguage();
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);
  const perView = 3;
  const step = (d: number) => setIndex((v) => (v + d + RAIL_CARDS.length) % RAIL_CARDS.length);

  useEffect(() => {
    if (reduced || hover) return;
    const id = window.setInterval(() => step(1), 3000);
    return () => window.clearInterval(id);
  }, [reduced, hover]);

  const rtl = language === 'ar';

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container max-w-6xl">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            <LineReveal text={pick(RAIL_HEAD, language)} />
          </h2>
          <Reveal as="p" delay={150} className="mt-5 text-body-lg text-slate">
            {pick(RAIL_SUB, language)}
          </Reveal>
        </div>

        <Reveal delay={100} className="mt-12">
          <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <div className="overflow-hidden">
              <div
                className="flex gap-5 ease-[cubic-bezier(0.22,1,0.36,1)] transition-transform"
                style={{
                  transform: `translateX(calc(${rtl ? '' : '-'}${index} * (100% / ${perView} + 0.833rem)))`,
                  transitionDuration: '600ms',
                }}
              >
                {[...RAIL_CARDS, ...RAIL_CARDS.slice(0, perView)].map((c, i) => (
                  <article
                    key={`${c.img}-${i}`}
                    className="no-fill w-[78%] sm:w-[46%] md:w-[calc(100%/3-0.833rem)] flex-shrink-0 overflow-hidden rounded-2xl border border-charcoal/10 bg-white shadow-subtle transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-card-hover"
                  >
                    <img src={c.img} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover object-left-top" />
                    <div className="p-5">
                      <h3 className="font-heading text-lg text-charcoal">{pick(c.title, language)}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate">{pick(c.body, language)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="flex gap-1.5">
                {RAIL_CARDS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`${i + 1}/${RAIL_CARDS.length}`}
                    onClick={() => setIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === index ? 'w-6 bg-golden' : 'w-1.5 bg-charcoal/20 hover:bg-charcoal/40'
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="previous"
                  onClick={() => step(-1)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-charcoal/15 text-charcoal transition-colors hover:border-golden hover:text-golden-dark"
                >
                  <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
                </button>
                <button
                  type="button"
                  aria-label="next"
                  onClick={() => step(1)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-charcoal/15 text-charcoal transition-colors hover:border-golden hover:text-golden-dark"
                >
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </button>
              </div>
            </div>
            <p className="sr-only" aria-live="polite">
              {pick(RAIL_CARDS[index].title, language)}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// ── T3: stat band with growing chart ────────────────────────────────────────
const STAT_HEAD: L10n = {
  de: 'Eine komplette KI-Ebene über Ihrem Maklerbüro',
  en: 'A complete AI layer over your brokerage',
  fr: 'Une couche IA complète sur votre agence',
  ar: 'طبقة ذكاء اصطناعي كاملة فوق مكتبكم العقاري',
};

const BAND_STATS: Array<{ value: string; label: L10n }> = [
  {
    value: '3s',
    label: { de: 'Erstantwort auf neue Anfragen', en: 'First reply to a new inquiry', fr: 'Première réponse à une demande', ar: 'الرد الأول على استفسار جديد' },
  },
  {
    value: '24/7',
    label: { de: 'KI-Assistent erreichbar', en: 'AI assistant availability', fr: 'Assistant IA disponible', ar: 'توافر المساعد الذكي' },
  },
  {
    value: '100',
    label: { de: 'Freigabe-Kontrolle bei jedem Schritt', en: 'Approval control on every step', fr: 'Contrôle de validation à chaque étape', ar: 'تحكم بالموافقة في كل خطوة' },
  },
  {
    value: 'DSGVO',
    label: { de: 'EU-Hosting, konform by design', en: 'EU-hosted, compliant by design', fr: 'Hébergé en UE, conforme par conception', ar: 'استضافة أوروبية ومتوافق تصميمًا' },
  },
];

export const ProductStatBand = () => {
  const { language } = useLanguage();
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setOn(true), io.disconnect()),
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const drawn = on || reduced;

  return (
    <section className="py-10 md:py-14">
      <div className="container max-w-6xl">
        <div
          ref={ref}
          className="band-dark grid gap-8 overflow-hidden rounded-3xl bg-gradient-to-br from-[#17140F] via-[#1E2B26] to-[#0C6F5F] p-8 md:grid-cols-[1.1fr_1fr] md:p-10"
        >
          <div>
            <h2 className="font-heading text-2xl md:text-3xl text-white text-balance">
              {pick(STAT_HEAD, language)}
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8">
              {BAND_STATS.map((s, i) => (
                <div key={s.value}>
                  <div className="font-metric text-3xl font-bold text-golden">
                    {/^\d+$/.test(s.value) ? (
                      <>
                        <CountUp value={s.value} delay={i * 150} />%
                      </>
                    ) : (
                      s.value
                    )}
                  </div>
                  <p className="mt-1 text-sm text-white/70">{pick(s.label, language)}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-end">
            <svg viewBox="0 0 320 180" className="w-full" aria-hidden>
              {[38, 62, 50, 84, 72, 110, 96, 132].map((h, i) => (
                <rect
                  key={i}
                  x={16 + i * 38}
                  width="22"
                  rx="4"
                  y={168 - (drawn ? h : 4)}
                  height={drawn ? h : 4}
                  className="fill-golden/70"
                  style={{
                    transition: `y 900ms cubic-bezier(0.22,1,0.36,1) ${i * 90}ms, height 900ms cubic-bezier(0.22,1,0.36,1) ${i * 90}ms`,
                  }}
                />
              ))}
              <path
                d="M16 150 C 70 140, 90 118, 130 112 S 210 84, 250 62 S 296 40, 306 34"
                fill="none"
                stroke="#3FBBA6"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="340"
                strokeDashoffset={drawn ? 0 : 340}
                style={{ transition: 'stroke-dashoffset 1400ms cubic-bezier(0.22,1,0.36,1) 300ms' }}
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

// ── T5: pinned scroll presentation (the "deck") ──────────────────────────────
// The how-it-works section as a presentation: the stage pins to the viewport
// and scrolling advances the five steps like slides — caption and screen
// crossfade, the visual drifts with scroll, a progress bar tracks position.
// Below md (and under reduced motion) it renders as a plain stacked list.

const DECK_SCREENS = [
  '/screens/dashboard.webp',
  '/screens/messages.webp',
  '/screens/leads.webp',
  '/screens/ai-control.webp',
  '/screens/analytics.webp',
];

const DECK_KICKER: L10n = {
  de: 'Scrollen Sie — jeder Schritt ist eine Folie',
  en: 'Keep scrolling — every step is a slide',
  fr: 'Continuez à défiler — chaque étape est une diapositive',
  ar: 'تابعوا التمرير — كل خطوة شريحة',
};

export const PresentationDeck = ({
  headline,
  steps,
  ctaLabel,
  ctaAttrs,
  onCta,
}: {
  headline: string;
  steps: string[];
  ctaLabel: string;
  ctaAttrs?: Record<string, unknown>;
  onCta?: () => void;
}) => {
  const { language } = useLanguage();
  const reduced = usePrefersReducedMotion();
  const hostRef = useRef<HTMLElement | null>(null);
  const [slide, setSlide] = useState(0);
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches,
  );
  const n = Math.min(steps.length, DECK_SCREENS.length);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onMq = () => setIsDesktop(mq.matches);
    mq.addEventListener('change', onMq);
    return () => mq.removeEventListener('change', onMq);
  }, []);

  // scroll scrub: progress 0..1 across the tall host drives --deck-p (cheap,
  // no re-render) and the slide index (state, changes at boundaries only)
  useEffect(() => {
    if (reduced || !isDesktop) return;
    const el = hostRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
        el.style.setProperty('--deck-p', String(p));
        const idx = Math.min(n - 1, Math.floor(p * n));
        setSlide((s) => (s === idx ? s : idx));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [reduced, isDesktop, n]);

  // static fallback: stacked steps (mobile + reduced motion)
  if (reduced || !isDesktop) {
    return (
      <section id="how-it-works" className="py-20 bg-cream">
        <div className="container max-w-3xl">
          <h2 className="font-heading text-section-mobile text-charcoal text-balance text-center">
            {headline}
          </h2>
          <ol className="mt-10 space-y-6">
            {steps.slice(0, n).map((step, i) => (
              <li key={i} className="rounded-2xl border border-charcoal/10 bg-white p-5 shadow-subtle">
                <span className="font-metric text-xs font-bold text-golden-dark">
                  {String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
                </span>
                <p className="mt-2 text-charcoal">{step}</p>
                <img src={DECK_SCREENS[i]} alt="" loading="lazy" className="mt-4 w-full rounded-xl border border-charcoal/10" />
              </li>
            ))}
          </ol>
          <div className="mt-10 text-center">
            <button
              type="button"
              {...(ctaAttrs ?? {})}
              onClick={onCta}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-golden px-7 py-3.5 font-semibold text-[#1E1B16] shadow-golden"
            >
              {ctaLabel}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="how-it-works"
      ref={hostRef}
      className="relative"
      style={{ height: `${(n + 1) * 100}vh`, '--deck-p': 0 } as React.CSSProperties}
    >
      <div className="band-dark sticky top-0 flex h-screen flex-col overflow-hidden bg-[#17140F]">
        {/* progress bar */}
        <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-white/10">
          <div
            className="h-full bg-gradient-golden"
            style={{ width: 'calc(var(--deck-p) * 100%)', insetInlineStart: 0 }}
          />
        </div>

        <div className="container flex flex-1 flex-col justify-center pb-10 pt-28">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-heading text-2xl md:text-4xl text-white text-balance">{headline}</h2>
            <span dir="ltr" className="font-metric text-sm font-bold text-golden whitespace-nowrap" aria-live="polite">
              {String(slide + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
            </span>
          </div>
          <p className="mt-1 text-sm text-white/50">{pick(DECK_KICKER, language)}</p>

          <div className="mt-8 grid flex-1 items-center gap-10 lg:grid-cols-[1fr_1.35fr]">
            {/* captions: the active one rises in, others rest */}
            <div className="relative min-h-[9rem]">
              {steps.slice(0, n).map((step, i) => (
                <p
                  key={i}
                  aria-hidden={slide !== i}
                  className="absolute inset-x-0 top-1/2 -translate-y-1/2 font-heading text-xl md:text-3xl leading-snug text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    opacity: slide === i ? 1 : 0,
                    transform: `translateY(calc(-50% + ${slide === i ? 0 : slide > i ? -28 : 28}px))`,
                  }}
                >
                  <span className="me-3 font-metric text-base font-bold text-golden align-middle">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {step}
                </p>
              ))}
              {/* step dots */}
              <div className="absolute -bottom-10 flex gap-2">
                {steps.slice(0, n).map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-400 ${
                      i === slide ? 'w-7 bg-golden' : i < slide ? 'w-1.5 bg-golden/50' : 'w-1.5 bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* screens: crossfade per slide, whole stack drifts with scroll */}
            <div
              className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 shadow-card-hover"
              style={{ transform: 'translateY(calc((var(--deck-p) - 0.5) * -30px))' }}
            >
              {DECK_SCREENS.slice(0, n).map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  loading={i === 0 ? 'eager' : 'lazy'}
                  className="absolute inset-0 h-full w-full object-cover object-left-top transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    opacity: slide === i ? 1 : 0,
                    transform: slide === i ? 'scale(1)' : slide > i ? 'scale(1.05)' : 'scale(0.985)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* CTA lands with the final slide */}
          <div
            className="pb-2 pt-6 text-center transition-all duration-500"
            style={{
              opacity: slide === n - 1 ? 1 : 0,
              transform: slide === n - 1 ? 'none' : 'translateY(10px)',
              pointerEvents: slide === n - 1 ? 'auto' : 'none',
            }}
          >
            <button
              type="button"
              {...(ctaAttrs ?? {})}
              onClick={onCta}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-golden px-7 py-3.5 font-semibold text-[#1E1B16] shadow-golden transition-transform hover:scale-[1.03]"
            >
              {ctaLabel}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
