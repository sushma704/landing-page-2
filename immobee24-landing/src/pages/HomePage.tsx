import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  HelpCircle,
  Layers,
  MessageSquare,
  Sparkles,
  Tag,
  Target,
  Users,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n';
import { trackEvent } from '../lib/analytics';
import { disableReb2b, enableReb2b, readConsent, subscribe } from '../lib/consent';
import { usePageMeta } from '../lib/usePageMeta';
import { useFaqSchema } from '../lib/useFaqSchema';
import { useJsonLd } from '../lib/useJsonLd';
import { organizationSchema } from '../lib/schema';
import { useLocalizedPath } from '../lib/useLocalizedPath';
import { Header, Footer, DEMO_CTA_PROPS } from '../components/SiteChrome';
import { HeroShowcase } from '../components/HeroShowcase';
import { HeroWaves } from '../components/HeroWaves';
import { LineReveal, CountUp, Reveal, RevealGroup, TypeCycle } from '../lib/animations';
import { ScrollCue } from '../components/Wayfinding';
import { BillingToggle, MorphPrice, type BillingPeriod } from '../components/PricingSwitch';
import { SevenCoWorkersBand, ComplianceBadgesStrip } from '../components/AiRefinementBands';

const asString = (
  v: string | string[] | Array<{ q: string; a: string }> | string[][],
): string => (typeof v === 'string' ? v : '');
const asStringArray = (
  v: string | string[] | Array<{ q: string; a: string }> | string[][],
): string[] =>
  Array.isArray(v) && v.every((x) => typeof x === 'string') ? (v as string[]) : [];
const asFaqArray = (
  v: string | string[] | Array<{ q: string; a: string }> | string[][],
): Array<{ q: string; a: string }> =>
  Array.isArray(v) && v.every((x) => typeof x === 'object' && x !== null && 'q' in x && 'a' in x)
    ? (v as Array<{ q: string; a: string }>)
    : [];
const asPairArray = (
  v: string | string[] | Array<{ q: string; a: string }> | string[][],
): string[][] => (Array.isArray(v) && v.every((x) => Array.isArray(x)) ? (v as string[][]) : []);

// Brief re-skin: full-viewport immersive dark hero (HomeLead-style) — deep
// warm-ink canvas with teal/amber ambient glows, staggered entrance, floating
// stat pills around the live product moment, and a scroll cue. The hero is
// deliberately dark in BOTH themes (single-look section); the rest of the
// page follows the light/dark toggle.
const HERO_PILLS: Array<{ stat: string; label: Record<string, string> }> = [
  {
    stat: '3s',
    label: { de: 'Erstantwort auf Anfragen', en: 'First reply to inquiries', fr: 'Première réponse', ar: 'أول رد على الاستفسارات' },
  },
  {
    stat: '24/7',
    label: { de: 'KI-Assistent erreichbar', en: 'AI assistant available', fr: 'Assistant IA disponible', ar: 'مساعد ذكاء اصطناعي متاح' },
  },
  {
    stat: 'DSGVO',
    label: { de: 'By Design, EU-gehostet', en: 'By design, EU-hosted', fr: 'By design, hébergé en UE', ar: 'حسب التصميم، استضافة أوروبية' },
  },
  {
    stat: 'DE·FR·EN·AR',
    label: { de: 'Mehrsprachig nativ', en: 'Multilingual native', fr: 'Multilingue natif', ar: 'متعدد اللغات أصلاً' },
  },
];

// Typewriter hero headline (HomeLead-style): a static lead-in plus a cycling
// audience word with blinking caret. Mirrors the Solutions roles. words[0]
// renders statically under reduced motion.
const HERO_TYPED: Record<string, { lead: string; words: string[] }> = {
  de: { lead: 'KI-Software für', words: ['Immobilienmakler', 'Maklerteams', 'Hausverwaltungen'] },
  en: { lead: 'AI software for', words: ['real estate brokers', 'brokerage teams', 'property managers'] },
  fr: { lead: 'Le logiciel IA pour', words: ['les agents immobiliers', 'les équipes d’agence', 'les gestionnaires de biens'] },
  ar: { lead: 'برنامج الذكاء الاصطناعي لـ', words: ['وسطاء العقارات', 'فرق الوساطة', 'إدارة العقارات'] },
};

const Hero = () => {
  const { t, language } = useLanguage();
  const localPath = useLocalizedPath();
  const bullets = asStringArray(t('hero.trustBullets'));
  const pillLabel = (p: (typeof HERO_PILLS)[number]) => p.label[language] ?? p.label.en;

  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col overflow-hidden bg-cream text-charcoal"
    >
      {/* ambient glows — teal top-left, amber right (drift slowly) */}
      <div
        aria-hidden
        className="glow-drift absolute -top-40 -left-40 w-[42rem] h-[42rem] rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(circle, #0C6F5F 0%, transparent 65%)' }}
      />
      <div
        aria-hidden
        className="glow-drift absolute -top-24 -right-48 w-[46rem] h-[46rem] rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #F5A623 0%, transparent 62%)', animationDelay: '-6s' }}
      />
      {/* flowing contour-line mesh (canvas, brand teal->amber) */}
      <HeroWaves />

      <div className="container relative flex-1 flex flex-col justify-center pt-32 pb-16 md:pt-36">
        <div className="max-w-3xl mx-auto text-center">

          <h1
            className="mt-6 font-heading text-hero-mobile md:text-hero text-charcoal text-balance"
            aria-label={`${(HERO_TYPED[language] ?? HERO_TYPED.en).lead} ${(HERO_TYPED[language] ?? HERO_TYPED.en).words[0]}`}
          >
            {(() => {
              const typed = HERO_TYPED[language] ?? HERO_TYPED.en;
              return (
                <>
                  <span
                    className="chor block"
                    style={{ '--chor-delay': '0ms', '--chor-dur': '700ms' } as CSSProperties}
                  >
                    {typed.lead}
                  </span>
                  <span
                    className="chor block text-golden-dark dark:text-golden"
                    style={{ '--chor-delay': '180ms', '--chor-dur': '700ms' } as CSSProperties}
                  >
                    <TypeCycle words={typed.words} />
                  </span>
                </>
              );
            })()}
          </h1>

          <p
            className="chor mt-6 text-body-lg text-slate max-w-2xl mx-auto"
            style={{ '--chor-delay': '380ms', '--chor-dur': '600ms' } as CSSProperties}
          >
            {asString(t('hero.subheadline'))}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              {...DEMO_CTA_PROPS}
              onClick={() => trackEvent('hero_primary_cta_click')}
              className="chor inline-flex items-center gap-2 rounded-full bg-gradient-golden px-7 py-3.5 font-semibold text-[#1E1B16] shadow-golden transition-transform hover:scale-[1.03]"
              style={{ '--chor-delay': '550ms', '--chor-dur': '500ms' } as CSSProperties}
            >
              {asString(t('hero.primaryCta'))}
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              to={`${localPath('produkt')}#how-it-works`}
              onClick={() => trackEvent('hero_secondary_cta_click')}
              className="chor inline-flex items-center gap-2 rounded-full border border-charcoal/25 px-7 py-3.5 font-medium text-charcoal hover:bg-charcoal/10 transition-colors"
              style={{ '--chor-delay': '680ms', '--chor-dur': '500ms' } as CSSProperties}
            >
              {asString(t('hero.secondaryCta'))}
            </Link>
          </div>

          <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
            {bullets.map((b, i) => (
              <li
                key={i}
                className="chor flex items-center gap-2 text-sm text-slate"
                style={{ '--chor-delay': `${780 + i * 70}ms`, '--chor-dur': '500ms' } as CSSProperties}
              >
                <CheckCircle2 className="h-4 w-4 text-honey-green flex-shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* product moment + stat pills — 3-column grid on desktop so the
            pills flank the card without ever overlapping it; compact row
            below the card on smaller screens. */}
        <div
          className="chor-scale relative max-w-6xl mx-auto w-full"
          style={{ '--chor-delay': '850ms', '--chor-dur': '900ms' } as CSSProperties}
        >
          <div className="xl:grid xl:grid-cols-[1fr_auto_1fr] xl:items-center xl:gap-8">
            {/* left pills */}
            <div aria-hidden className="hidden xl:flex flex-col items-end gap-8">
              {[HERO_PILLS[0], HERO_PILLS[2]].map((p, i) => (
                <div
                  key={p.stat}
                  className={`float-pill no-fill flex items-center gap-3 rounded-2xl border border-charcoal/15 bg-white/60 backdrop-blur-md px-4 py-3 shadow-card dark:border-[rgba(255,255,255,0.15)] dark:bg-[rgba(255,255,255,0.07)] ${
                    i === 0 ? '-translate-y-4' : 'translate-y-6'
                  }`}
                  style={{ animationDelay: `${-i * 1.7}s` }}
                >
                  <span className="font-metric text-lg font-bold text-golden-dark dark:text-golden whitespace-nowrap">
                    {/^\d/.test(p.stat) ? <CountUp value={p.stat} delay={1200} /> : p.stat}
                  </span>
                  <span className="text-xs text-slate max-w-[140px] leading-snug">{pillLabel(p)}</span>
                </div>
              ))}
            </div>

            {/* the rotating product showcase (chat -> journey -> dashboard) */}
            <div className="band-dark float-soft relative z-10 xl:w-[38rem]">
              <HeroShowcase />
            </div>

            {/* right pills */}
            <div aria-hidden className="hidden xl:flex flex-col items-start gap-8">
              {[HERO_PILLS[1], HERO_PILLS[3]].map((p, i) => (
                <div
                  key={p.stat}
                  className={`float-pill no-fill flex items-center gap-3 rounded-2xl border border-charcoal/15 bg-white/60 backdrop-blur-md px-4 py-3 shadow-card dark:border-[rgba(255,255,255,0.15)] dark:bg-[rgba(255,255,255,0.07)] ${
                    i === 0 ? '-translate-y-6' : 'translate-y-4'
                  }`}
                  style={{ animationDelay: `${-(i + 2) * 1.7}s` }}
                >
                  <span className="font-metric text-lg font-bold text-golden-dark dark:text-golden whitespace-nowrap">
                    {/^\d/.test(p.stat) ? <CountUp value={p.stat} delay={1200} /> : p.stat}
                  </span>
                  <span className="text-xs text-slate max-w-[140px] leading-snug">{pillLabel(p)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* below xl: pills as a compact centered row under the card */}
          <div className="xl:hidden mt-6 flex flex-wrap justify-center gap-2">
            {HERO_PILLS.map((p) => (
              <span
                key={p.stat}
                className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 bg-white/60 px-3 py-1.5 text-xs text-slate dark:border-[rgba(255,255,255,0.15)] dark:bg-[rgba(255,255,255,0.07)]"
              >
                <b className="font-metric text-golden-dark dark:text-golden">
                  {/^\d/.test(p.stat) ? <CountUp value={p.stat} delay={1200} /> : p.stat}
                </b>
                {pillLabel(p)}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div aria-hidden className="relative pb-6 flex justify-center">
        <span className="scroll-cue inline-flex h-9 w-9 items-center justify-center rounded-full border border-charcoal/20 text-charcoal/60">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </span>
      </div>
      <ScrollCue className="relative mt-10" />
      </section>
  );
};

const AnswerBlock = () => {
  const { t } = useLanguage();
  return (
    <section id="product" className="py-16 md:py-24 bg-white">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {[
            { q: asString(t('answer.q1')), a: asString(t('answer.a1')) },
            { q: asString(t('answer.q2')), a: asString(t('answer.a2')) },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-charcoal/10 bg-cream p-6 md:p-8 shadow-subtle"
            >
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-golden-dark">
                <HelpCircle className="h-4 w-4" />
                <span>Q&amp;A</span>
              </div>
              <h3 className="mt-3 font-heading text-2xl text-charcoal">{item.q}</h3>
              <p className="mt-3 text-slate leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Problem = () => {
  const { t } = useLanguage();
  const points = asStringArray(t('problem.painpoints'));
  return (
    <section className="py-20 md:py-28 band-dark bg-charcoal text-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-balance text-white">
            {asString(t('problem.headline'))}
          </h2>
          <p className="mt-6 text-body-lg text-white/70">{asString(t('problem.body'))}</p>
        </div>

        <ul className="mt-12 grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {points.map((p, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-5"
            >
              <Clock className="h-5 w-5 text-golden flex-shrink-0 mt-0.5" />
              <span className="text-white/85">{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

const Solution = () => {
  const { t } = useLanguage();
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-cream to-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('solution.headline'))}
          </h2>
          <p className="mt-6 text-body-lg text-slate">{asString(t('solution.body'))}</p>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <div className="relative rounded-2xl bg-white border border-golden/30 p-6 md:p-8 shadow-card">
            <span className="absolute -top-3 left-6 inline-block rounded-full bg-gradient-golden px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
              {asString(t('solution.definitionLabel'))}
            </span>
            <p className="text-charcoal text-lg leading-relaxed">
              {asString(t('solution.definitionBox'))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const { t } = useLanguage();
  const localPath = useLocalizedPath();
  // HomeLead-style pipeline pulse: the active card lights up in sequence,
  // walking visitors through the workflow. Paused under reduced motion.
  const [pulse, setPulse] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setPulse((v) => (v + 1) % 4), 2200);
    return () => window.clearInterval(id);
  }, []);
  const items = [
    { icon: Zap, title: asString(t('features.f1Title')), body: asString(t('features.f1Body')) },
    { icon: Target, title: asString(t('features.f2Title')), body: asString(t('features.f2Body')) },
    {
      icon: MessageSquare,
      title: asString(t('features.f3Title')),
      body: asString(t('features.f3Body')),
    },
    { icon: Layers, title: asString(t('features.f4Title')), body: asString(t('features.f4Body')) },
  ];

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            <LineReveal text={asString(t('features.headline'))} />
          </h2>
          </div>

        <RevealGroup className="mt-12 grid md:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {items.map((item, i) => (
            <div
              key={i}
              className={`card-sweep shadow-subtle rounded-2xl border p-6 md:p-8 transition-all duration-500 ${
                pulse === i
                  ? 'border-golden/50 bg-gradient-golden-soft shadow-golden -translate-y-1'
                  : 'border-charcoal/10 bg-white shadow-subtle hover:shadow-card-hover hover:border-golden/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-golden-soft text-golden-dark">
                  <item.icon className="icon-draw h-5 w-5" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-golden-dark">
                  {`0${i + 1}`}
                </span>
              </div>
              <h3 className="mt-4 font-heading text-xl text-charcoal">{item.title}</h3>
              <p className="mt-3 text-slate leading-relaxed">{item.body}</p>
            </div>
          ))}
        </RevealGroup>

        <div className="mt-10 text-center">
          <Link
            to={localPath('produkt')}
            onClick={() => trackEvent('home_features_cta_click')}
            className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 bg-white px-6 py-3 font-medium text-charcoal hover:border-charcoal/40 transition-colors"
          >
            {asString(t('features.ctaLink'))}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

const CrmDifferentiation = () => {
  const { t } = useLanguage();
  const localPath = useLocalizedPath();
  const pairs = asPairArray(t('crmDiff.comparisons'));
  return (
    <section id="crm-alternative" className="py-20 md:py-28 bg-cream">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('crmDiff.headline'))}
          </h2>
          <p className="mt-6 text-body-lg text-slate">{asString(t('crmDiff.body'))}</p>
        </div>

        <div className="mt-12 max-w-3xl mx-auto rounded-2xl bg-white border border-charcoal/10 shadow-card overflow-hidden">
          <ul>
            {pairs.map((pair, i) => {
              const label = pair[0] ?? '';
              const value = pair[1] ?? '';
              const isImmob24 = label === 'Immob24';
              return (
                <li
                  key={i}
                  className={`flex items-center gap-4 px-6 py-4 ${
                    i !== pairs.length - 1 ? 'border-b border-charcoal/5' : ''
                  }`}
                >
                  <span
                    className={`inline-flex items-center justify-center min-w-[88px] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      isImmob24
                        ? 'bg-gradient-golden text-white'
                        : 'bg-charcoal/5 text-charcoal/70'
                    }`}
                  >
                    {label}
                  </span>
                  <span className="text-charcoal">{value}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-8 text-center">
          <Link
            to={localPath('crmAlternative')}
            onClick={() => trackEvent('home_crmdiff_cta_click')}
            className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 bg-white px-6 py-3 font-medium text-charcoal hover:border-charcoal/40 transition-colors"
          >
            {asString(t('crmDiff.cta'))}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const { t } = useLanguage();
  const localPath = useLocalizedPath();
  const steps = asStringArray(t('howItWorks.steps'));
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('howItWorks.headline'))}
          </h2>
        </div>

        <ol className="mt-12 relative max-w-3xl mx-auto">
          <span
            aria-hidden
            className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-golden/40 via-golden/20 to-transparent"
          />
          {steps.map((step, i) => (
            <li key={i} className="relative pl-16 pb-8 last:pb-0">
              <span className="absolute left-0 top-0 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-golden text-white font-bold shadow-golden">
                {i + 1}
              </span>
              <div className="rounded-xl bg-cream border border-charcoal/5 p-4 md:p-5">
                <p className="text-charcoal">{step}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 text-center">
          <Link
            to={`${localPath('produkt')}#how-it-works`}
            onClick={() => trackEvent('home_how_cta_click')}
            className="inline-flex items-center gap-2 rounded-full band-dark bg-charcoal text-white px-6 py-3 font-medium hover:bg-charcoal/90 transition-colors"
          >
            {asString(t('howItWorks.cta'))}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

const SocialProof = () => {
  const { t } = useLanguage();
  const items = asStringArray(t('socialProof.testimonials'));
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white to-cream">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('socialProof.headline'))}
          </h2>
          <p className="mt-4 text-sm text-warm-gray italic">{asString(t('socialProof.note'))}</p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {items.map((quote, i) => (
            <figure
              key={i}
              className="rounded-2xl bg-white border border-charcoal/10 p-6 shadow-subtle"
            >
              <blockquote className="text-charcoal leading-relaxed">{quote}</blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

const UseCases = () => {
  const { t } = useLanguage();
  const cards = asStringArray(t('useCases.cards'));
  return (
    <section id="for-whom" className="py-20 md:py-28 bg-cream">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('useCases.headline'))}
          </h2>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {cards.map((card, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl border border-charcoal/10 bg-white p-5 shadow-subtle"
            >
              <Users className="h-5 w-5 text-golden-dark flex-shrink-0 mt-0.5" />
              <span className="text-charcoal">{card}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PricingTeaser = () => {
  const { t } = useLanguage();
  const localPath = useLocalizedPath();
  const plans = asPairArray(t('pricingTeaser.plans'));
  const [period, setPeriod] = useState<BillingPeriod>('monthly');
  return (
    <section id="pricing" className="py-20 md:py-28 bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('pricingTeaser.headline'))}
          </h2>
          <p className="mt-6 text-body-lg text-slate">{asString(t('pricingTeaser.body'))}</p>
        </div>

        <div className="mt-8 flex justify-center">
          <BillingToggle period={period} onChange={setPeriod} />
        </div>

        <div className="mt-10 grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={i}
              className="rounded-2xl border border-charcoal/10 bg-cream p-6 text-center shadow-subtle"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-golden-soft text-golden-dark">
                <Tag className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-heading text-xl text-charcoal">{plan[0] ?? ''}</h3>
              {i === 1 ? (
                <div className="mt-2 flex justify-center">
                  <MorphPrice period={period} size="sm" />
                </div>
              ) : (
                <p className="mt-2 text-slate">{plan[1] ?? ''}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to={localPath('pricing')}
            onClick={() => trackEvent('home_pricing_cta_click')}
            className="inline-flex items-center gap-2 rounded-full band-dark bg-charcoal text-white px-6 py-3 font-medium hover:bg-charcoal/90 transition-colors"
          >
            {asString(t('pricingTeaser.pricingCta'))}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to={`${localPath('contact')}?intent=demo`}
            onClick={() => trackEvent('home_pricing_demo_cta_click')}
            className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 bg-white px-6 py-3 font-medium text-charcoal hover:border-charcoal/40 transition-colors"
          >
            {asString(t('pricingTeaser.demoCta'))}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-charcoal/10 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-start justify-between gap-4 py-5 text-left"
      >
        <span className="font-medium text-charcoal pr-4">{q}</span>
        <span
          aria-hidden
          className={`flex-shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-full bg-charcoal/5 text-charcoal transition-transform duration-200 ${
            open ? 'rotate-45' : ''
          }`}
        >
          +
        </span>
      </button>
      {/* grid-rows 0fr->1fr trick: animated height without JS measuring */}
      <div className="acc-body" data-open={open}>
        <p className="pb-5 text-slate leading-relaxed">{a}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const { t } = useLanguage();
  const items = asFaqArray(t('faq.items'));
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-center text-balance">
            <LineReveal text={asString(t('faq.headline'))} />
          </h2>

          <div className="mt-10 rounded-2xl bg-cream border border-charcoal/10 px-6">
            {items.map((it, i) => (
              <FAQItem key={i} q={it.q} a={it.a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => {
  const { t } = useLanguage();
  return (
    <section
      id="book-demo"
      className="py-20 md:py-28 bg-white text-charcoal relative overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full bg-gradient-golden opacity-10 blur-3xl"
      />
      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('finalCta.headline'))}
          </h2>
          <p className="mt-6 text-body-lg text-slate">{asString(t('finalCta.body'))}</p>

          <div className="mt-8 flex flex-col items-center gap-3">
            <button
              type="button"
              {...DEMO_CTA_PROPS}
              onClick={() => trackEvent('final_cta_click')}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-golden text-white px-7 py-3.5 font-semibold shadow-golden hover:opacity-95 transition-opacity"
            >
              {asString(t('finalCta.primaryCta'))}
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="text-sm text-warm-gray">{asString(t('finalCta.secondaryNote'))}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function HomePage() {
  const { t, language } = useLanguage();
  usePageMeta({
    pageKey: 'home',
    titleKey: 'home.meta.title',
    descriptionKey: 'home.meta.description',
  });
  useFaqSchema(asFaqArray(t('faq.items')), language, 'home');
  useJsonLd([organizationSchema()], 'home');

  // RB2B visitor identification is scoped to the home page only (DE + EN) and
  // gated by the `identification` consent category. Subscribing here so a
  // mid-session toggle in the cookie settings loads/unloads the script live.
  // Cleanup also unloads on navigation away from the home page.
  useEffect(() => {
    if (readConsent()?.identification) enableReb2b();
    const unsubscribe = subscribe((state) => {
      if (state?.identification) enableReb2b();
      else disableReb2b();
    });
    return () => {
      unsubscribe();
      disableReb2b();
    };
  }, []);

  const sections = [
    Hero,
    AnswerBlock,
    Problem,
    Solution,
    // AI-refinement (draft/ai-refinement): 7-co-worker band with demo-video
    // teaser, additive between Solution and Features. Existing sections,
    // forms and the chatbot stay untouched.
    SevenCoWorkersBand,
    Features,
    CrmDifferentiation,
    HowItWorks,
    SocialProof,
    // AI-refinement: compliance trust strip linking to /compliance.
    ComplianceBadgesStrip,
    UseCases,
    PricingTeaser,
    FAQ,
    FinalCTA,
  ];

  // Hero has its own mount entrance; Features/FAQ carry inner Reveals.
  const selfAnimated = new Set<unknown>([Hero, Features, FAQ]);

  return (
    <div className="min-h-screen antialiased bg-white">
      <Header />
      <main className="relative">
        {sections.map((Section, i) =>
          selfAnimated.has(Section) ? (
            <Section key={i} />
          ) : (
            <Reveal key={i}>
              <Section />
            </Reveal>
          ),
        )}
      </main>
      <Footer />
    </div>
  );
}
