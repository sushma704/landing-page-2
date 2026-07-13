import { useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react';
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  HelpCircle,
  Layers,
  Repeat,
  Sparkles,
  Target,
  Users,
  Zap,
  Inbox,
  ListChecks,
  Workflow,
  Bell,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header, Footer, DEMO_CTA_PROPS } from '../components/SiteChrome';
import { HeroWaves } from '../components/HeroWaves';
import { ScrollCue } from '../components/Wayfinding';
import { Reveal, RevealGroup, useInView, usePrefersReducedMotion } from '../lib/animations';
import {
  SceneQualification,
  SceneScheduling,
  SceneFollowUp,
  ScenePipeline,
} from '../components/scenes';
import { SevenCoWorkersBand, ComplianceBadgesStrip } from '../components/AiRefinementBands';
import { trackEvent } from '../lib/analytics';
import { usePageMeta } from '../lib/usePageMeta';
import { useFaqSchema } from '../lib/useFaqSchema';
import { useJsonLd } from '../lib/useJsonLd';
import { softwareApplicationSchema, breadcrumbSchema } from '../lib/schema';
import { useLocalizedPath } from '../lib/useLocalizedPath';
import { useLanguage } from '../i18n';
import { pathFor } from '../i18n/pages';

// Local helpers (kept out of i18n module since they're shared by both pages
// in slightly different shapes). These narrow the t() return to the value
// type each section expects.
type TVal = string | string[] | Array<{ q: string; a: string }> | string[][];
const asString = (v: TVal): string => (typeof v === 'string' ? v : '');
const asStringArray = (v: TVal): string[] =>
  Array.isArray(v) && v.every((x) => typeof x === 'string') ? (v as string[]) : [];
const asFaqArray = (v: TVal): Array<{ q: string; a: string }> =>
  Array.isArray(v) &&
  v.every((x) => typeof x === 'object' && x !== null && 'q' in x && 'a' in x)
    ? (v as Array<{ q: string; a: string }>)
    : [];
const asPairArray = (v: TVal): string[][] =>
  Array.isArray(v) && v.every((x) => Array.isArray(x)) ? (v as string[][]) : [];


const Hero = () => {
  const { t } = useLanguage();
  const localPath = useLocalizedPath();
  const bullets = asStringArray(t('produkt.hero.bullets'));
  // Entrance (spec step 2): headline split into two balanced lines that fade
  // up with a 90ms stagger; subtext/CTAs/badges follow. .hero-in is the
  // shared mount animation (reduced-motion renders final state).
  const headline = asString(t('produkt.hero.headline'));
  const words = headline.split(' ');
  const mid = Math.ceil(words.length / 2);
  const lines = [words.slice(0, mid).join(' '), words.slice(mid).join(' ')];
  return (
    <section
      id="top"
      className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-gradient-to-b from-cream to-white"
    >
      <HeroWaves />
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-gradient-golden opacity-20 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -left-24 w-[24rem] h-[24rem] rounded-full bg-golden/10 blur-3xl"
      />
      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center">
          <span
            className="hero-in inline-flex items-center gap-2 rounded-full border border-golden/30 bg-white px-4 py-1.5 text-xs font-medium text-golden-dark shadow-subtle"
            style={{ animationDelay: '0.05s' }}
          >
            <Sparkles className="h-3.5 w-3.5" />
            {asString(t('produkt.hero.eyebrow'))}
          </span>

          <h1 className="mt-6 font-heading text-hero-mobile md:text-hero text-charcoal text-balance">
            {lines.map((line, i) => (
              <span key={i} className="hero-in block" style={{ animationDelay: `${100 + i * 90}ms` }}>
                {line}
              </span>
            ))}
          </h1>

          <p
            className="hero-in mt-6 text-body-lg text-slate max-w-2xl mx-auto"
            style={{ animationDelay: '250ms' }}
          >
            {asString(t('produkt.hero.subheadline'))}
          </p>

          <div
            className="hero-in mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
            style={{ animationDelay: '350ms' }}
          >
            <button
              type="button"
              {...DEMO_CTA_PROPS}
              onClick={() => trackEvent('produkt_hero_primary_cta_click')}
              className="inline-flex items-center gap-2 rounded-full band-dark bg-charcoal text-white px-6 py-3 font-medium shadow-golden hover:bg-charcoal/90 transition-colors"
            >
              {asString(t('produkt.hero.primaryCta'))}
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href="#how-it-works"
              onClick={() => trackEvent('produkt_hero_secondary_cta_click')}
              className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 bg-white px-6 py-3 font-medium text-charcoal hover:border-charcoal/40 transition-colors"
            >
              {asString(t('produkt.hero.secondaryCta'))}
            </a>
          </div>

          <ul
            className="hero-in mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 max-w-2xl mx-auto text-left"
            style={{ animationDelay: '450ms' }}
          >
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate">
                <CheckCircle2 className="h-4 w-4 mt-0.5 text-honey-green flex-shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <ScrollCue targetId="product" className="hero-in mt-10" />
        </div>
      </div>
    </section>
  );
};

const Definition = () => {
  const { t } = useLanguage();
  return (
    <section id="product" className="py-20 md:py-28 bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('produkt.definition.headline'))}
          </h2>
          <p className="mt-6 text-body-lg text-slate">
            {asString(t('produkt.definition.body'))}
          </p>
        </div>
      </div>
    </section>
  );
};

const AnswerBlock = () => {
  const { t } = useLanguage();
  const items = asFaqArray(t('produkt.qa.items'));
  const qaLabel = asString(t('produkt.qa.qaLabel'));
  return (
    <section className="pb-16 md:pb-24 bg-white">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-charcoal/10 bg-cream p-6 md:p-8 shadow-subtle"
            >
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-golden-dark">
                <HelpCircle className="h-4 w-4" />
                <span>{qaLabel}</span>
              </div>
              <h3 className="mt-3 font-heading text-xl text-charcoal">{item.q}</h3>
              <p className="mt-3 text-slate leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProblemFit = () => {
  const { t } = useLanguage();
  const points = asStringArray(t('produkt.problemFit.points'));
  return (
    <section className="py-20 md:py-28 band-dark bg-charcoal text-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-balance text-white">
            {asString(t('produkt.problemFit.headline'))}
          </h2>
          <p className="mt-6 text-body-lg text-white/70">
            {asString(t('produkt.problemFit.body'))}
          </p>
        </div>

        <ul className="mt-12 grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {points.map((p, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-5"
            >
              <ArrowRight className="h-5 w-5 text-golden flex-shrink-0 mt-0.5" />
              <span className="text-white/85">{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

type Feature = {
  icon: ComponentType<{ className?: string }>;
  titleKey: string;
  bodyKey: string;
  /** self-playing product vignette paired with this feature */
  scene?: ComponentType<{ className?: string }>;
};

const Features = () => {
  const { t } = useLanguage();
  const items: Feature[] = [
    { icon: Zap, titleKey: 'produkt.features.f1Title', bodyKey: 'produkt.features.f1Body' },
    {
      icon: Target,
      titleKey: 'produkt.features.f2Title',
      bodyKey: 'produkt.features.f2Body',
      scene: SceneQualification,
    },
    {
      icon: CalendarClock,
      titleKey: 'produkt.features.f3Title',
      bodyKey: 'produkt.features.f3Body',
      scene: SceneScheduling,
    },
    {
      icon: Repeat,
      titleKey: 'produkt.features.f4Title',
      bodyKey: 'produkt.features.f4Body',
      scene: SceneFollowUp,
    },
    {
      icon: Layers,
      titleKey: 'produkt.features.f5Title',
      bodyKey: 'produkt.features.f5Body',
      scene: ScenePipeline,
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-cream to-white">
      <div className="container">
        <Reveal className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('produkt.features.headline'))}
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-charcoal/10 bg-white p-6 md:p-8 shadow-subtle hover:shadow-card-hover hover:border-golden/30 transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-golden-soft text-golden-dark">
                  <item.icon className="h-5 w-5" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-golden-dark">
                  {`0${i + 1}`}
                </span>
              </div>
              <h3 className="mt-4 font-heading text-xl text-charcoal">
                {asString(t(item.titleKey))}
              </h3>
              <p className="mt-3 text-slate leading-relaxed">{asString(t(item.bodyKey))}</p>
              {item.scene && <item.scene className="mt-6" />}
            </div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
};

const UseCases = () => {
  const { t } = useLanguage();
  const cases = [
    { titleKey: 'produkt.useCases.c1Title', bodyKey: 'produkt.useCases.c1Body' },
    { titleKey: 'produkt.useCases.c2Title', bodyKey: 'produkt.useCases.c2Body' },
    { titleKey: 'produkt.useCases.c3Title', bodyKey: 'produkt.useCases.c3Body' },
    { titleKey: 'produkt.useCases.c4Title', bodyKey: 'produkt.useCases.c4Body' },
  ];
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container">
        <Reveal className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('produkt.useCases.headline'))}
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {cases.map((c, i) => (
            <div
              key={i}
              className="rounded-2xl border border-charcoal/10 bg-cream p-6 md:p-8 shadow-subtle"
            >
              <h3 className="font-heading text-xl text-charcoal">
                {asString(t(c.titleKey))}
              </h3>
              <p className="mt-3 text-slate leading-relaxed">{asString(t(c.bodyKey))}</p>
            </div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
};

const CrmComparison = () => {
  const { t } = useLanguage();
  const localPath = useLocalizedPath();
  const rows = asPairArray(t('produkt.crmTable.rows'));
  const themaLabel = asString(t('produkt.crmTable.thema'));
  const classicalLabel = asString(t('produkt.crmTable.classicalCrm'));
  const immobLabel = asString(t('produkt.crmTable.immob'));

  return (
    <section id="crm-alternative" className="py-20 md:py-28 bg-cream">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('produkt.crmTable.headline'))}
          </h2>
        </div>

        {/* Desktop / tablet table */}
        <div className="mt-12 hidden md:block max-w-5xl mx-auto overflow-hidden rounded-2xl bg-white border border-charcoal/10 shadow-card">
          <table className="w-full text-left">
            <thead>
              <tr className="band-dark bg-charcoal text-white text-sm uppercase tracking-wider">
                <th className="px-5 py-4 font-semibold">{themaLabel}</th>
                <th className="px-5 py-4 font-semibold">{classicalLabel}</th>
                <th className="px-5 py-4 font-semibold">
                  <span className="inline-flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-golden" />
                    {immobLabel}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className={`align-top ${
                    i !== rows.length - 1 ? 'border-b border-charcoal/5' : ''
                  }`}
                >
                  <td className="px-5 py-4 font-medium text-charcoal">{row[0]}</td>
                  <td className="px-5 py-4 text-slate">{row[1]}</td>
                  <td className="px-5 py-4 text-charcoal bg-golden/5">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile stacked cards */}
        <div className="mt-12 grid gap-4 md:hidden max-w-xl mx-auto">
          {rows.map((row, i) => (
            <div
              key={i}
              className="rounded-2xl border border-charcoal/10 bg-white p-5 shadow-subtle"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-golden-dark">
                {row[0]}
              </p>
              <div className="mt-3 space-y-3">
                <div>
                  <span className="inline-block min-w-[88px] rounded-full bg-charcoal/5 text-charcoal/70 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                    {classicalLabel}
                  </span>
                  <p className="mt-1 text-slate">{row[1]}</p>
                </div>
                <div>
                  <span className="inline-block min-w-[88px] rounded-full bg-gradient-golden text-white px-3 py-1 text-xs font-bold uppercase tracking-wider">
                    {immobLabel}
                  </span>
                  <p className="mt-1 text-charcoal">{row[2]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to={localPath('crmAlternative')}
            onClick={() => trackEvent('produkt_crmtable_cta_click')}
            className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 bg-white px-6 py-3 font-medium text-charcoal hover:border-charcoal/40 transition-colors"
          >
            {asString(t('produkt.crmTable.cta'))}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

const WhoItsFor = () => {
  const { t } = useLanguage();
  const cards = asStringArray(t('produkt.whoFor.cards'));
  return (
    <section id="for-whom" className="py-20 md:py-28 bg-white">
      <div className="container">
        <Reveal className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('produkt.whoFor.headline'))}
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {cards.map((c, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl border border-charcoal/10 bg-cream p-5 shadow-subtle"
            >
              <Users className="h-5 w-5 text-golden-dark flex-shrink-0 mt-0.5" />
              <span className="text-charcoal">{c}</span>
            </div>
          ))}
        </RevealGroup>

        <Reveal delay={160} className="mt-10 max-w-3xl mx-auto rounded-2xl border border-charcoal/15 bg-charcoal/5 p-6 md:p-7">
          <p className="text-xs font-semibold uppercase tracking-wider text-charcoal/60">
            {asString(t('produkt.whoFor.notForLabel'))}
          </p>
          <p className="mt-2 text-charcoal leading-relaxed">
            {asString(t('produkt.whoFor.notForBody'))}
          </p>
        </Reveal>
      </div>
    </section>
  );
};

// Existing per-step product imagery reused for the sticky walkthrough panel
// (spec step 5) — no new artwork.
const HOW_VISUALS = [
  '/videos/features/dashboard-properties.jpg',
  '/videos/features/f4-bee-chat.jpg',
  '/videos/features/f5-human-control.jpg',
  '/videos/features/f6-deal-pipeline.jpg',
  '/videos/features/f7-campaigns.jpg',
];

const HowItWorks = () => {
  const { t } = useLanguage();
  const steps = asStringArray(t('produkt.howItWorks.steps'));
  const reduced = usePrefersReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<Array<HTMLLIElement | null>>([]);

  // Scrollytelling (desktop): the step crossing the viewport-center band
  // becomes active; the sticky panel cross-fades to its visual.
  useEffect(() => {
    const els = stepRefs.current.filter(Boolean) as HTMLLIElement[];
    if (els.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.step ?? 0);
            setActiveStep(idx);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [steps.length]);

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-gradient-to-b from-cream to-white">
      <div className="container">
        <Reveal className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('produkt.howItWorks.headline'))}
          </h2>
        </Reveal>

        <div className="mt-12 lg:grid lg:grid-cols-2 lg:gap-12 max-w-6xl mx-auto">
          <ol className="relative max-w-3xl mx-auto lg:mx-0">
            <span
              aria-hidden
              className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-golden/40 via-golden/20 to-transparent"
            />
            {steps.map((step, i) => (
              <li
                key={i}
                data-step={i}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className="relative pl-16 pb-8 last:pb-0 transition-opacity duration-300"
                style={{
                  opacity: reduced || activeStep === i ? 1 : 0.55,
                }}
              >
                <span className="absolute left-0 top-0 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-golden text-white font-bold shadow-golden">
                  {i + 1}
                </span>
                <div className="rounded-xl bg-white border border-charcoal/5 p-4 md:p-5 shadow-subtle">
                  <p className="text-charcoal">{step}</p>
                </div>
              </li>
            ))}
          </ol>

          {/* Sticky visual panel — desktop only; mobile keeps the plain list */}
          <div aria-hidden className="hidden lg:block">
            <div className="sticky top-28 grid overflow-hidden rounded-2xl border border-charcoal/10 shadow-card">
              {HOW_VISUALS.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  width={1920}
                  height={1080}
                  loading="lazy"
                  className="col-start-1 row-start-1 aspect-video w-full object-cover"
                  style={{
                    opacity: (activeStep % HOW_VISUALS.length) === i ? 1 : 0,
                    transition: reduced ? undefined : 'opacity 250ms ease-out',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <button
            type="button"
            {...DEMO_CTA_PROPS}
            onClick={() => trackEvent('produkt_how_cta_click')}
            className="inline-flex items-center gap-2 rounded-full band-dark bg-charcoal text-white px-6 py-3 font-medium hover:bg-charcoal/90 transition-colors"
          >
            {asString(t('produkt.howItWorks.cta'))}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

const SocialProof = () => {
  const { t } = useLanguage();
  const placeholders = asStringArray(t('produkt.socialProof.placeholders'));
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('produkt.socialProof.headline'))}
          </h2>
          <p className="mt-4 text-sm text-warm-gray italic">
            {asString(t('produkt.socialProof.note'))}
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {placeholders.map((quote, i) => (
            <figure
              key={i}
              className="rounded-2xl bg-cream border border-charcoal/10 p-6 shadow-subtle"
            >
              <blockquote className="text-charcoal leading-relaxed">{quote}</blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Merged from the former /how-it-works page (unified IA, phase 1). ──
// The scrollytelling above shows the flow; this is the step-by-step detail.
type StepItem = { title: string; body: string };
const asStepArray = (v: unknown): StepItem[] =>
  Array.isArray(v)
    ? v.filter(
        (x): x is StepItem =>
          !!x && typeof x === 'object' && 'title' in x && 'body' in x,
      )
    : [];

const DEEP_STEP_ICONS = [Inbox, Zap, ListChecks, Workflow, Sparkles, Bell];

const ProcessDeepDive = () => {
  const { t } = useLanguage();
  const items = asStepArray(t('howItWorksPage.steps.items') as unknown);
  const reduced = usePrefersReducedMotion();
  // HomeLead-style narrative highlight: one card glows at a time, walking
  // the sequence in order while the section is on screen.
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const [active, setActive] = useState(-1);
  useEffect(() => {
    if (reduced || !inView || items.length === 0) return;
    setActive(0);
    const id = window.setInterval(() => setActive((a) => (a + 1) % items.length), 2200);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced, items.length]);
  return (
    <section id="process-detail" ref={ref} className="py-20 md:py-28 bg-white">
      <div className="container">
        <Reveal className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('howItWorksPage.steps.headline'))}
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-6 md:grid-cols-2 max-w-5xl mx-auto" as="ol">
          {items.map((step, i) => {
            const Icon = DEEP_STEP_ICONS[i] ?? CheckCircle2;
            return (
              <li
                key={i}
                className={`rounded-2xl bg-cream border p-6 md:p-8 shadow-subtle list-none transition-all duration-500 ${
                  active === i
                    ? 'border-golden/60 shadow-card-hover -translate-y-1'
                    : 'border-charcoal/10'
                }`}
              >
                <div className="flex items-start gap-5">
                  <div className="flex-none flex flex-col items-center">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-golden text-[#1E1B16] font-heading text-lg shadow-golden">
                      {i + 1}
                    </span>
                    <Icon className="h-5 w-5 text-golden-dark mt-3" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-xl text-charcoal">{step.title}</h3>
                    <p className="mt-3 text-slate leading-relaxed">{step.body}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
};

// ── Integration constellation — LIVE integrations only, verified against
// frontend v2 (user audit 2026-07-14): calendar sync (Google/Outlook/Apple/
// Calendly), Meta Ads (live Graph-API test), import via OpenImmo/CSV/Excel,
// email-on-deals, web & CRM forms, live chat. Portal sync (ImmoScout24,
// Immowelt) is COMING SOON in the app and must never be shown as live;
// Kleinanzeigen is not exposed at all.
const HUB_CHANNELS: Array<Record<string, string>> = [
  { de: 'Google Kalender', en: 'Google Calendar', fr: 'Google Agenda', ar: 'تقويم Google' },
  { de: 'Outlook', en: 'Outlook', fr: 'Outlook', ar: 'Outlook' },
  { de: 'Apple Kalender', en: 'Apple Calendar', fr: 'Calendrier Apple', ar: 'تقويم Apple' },
  { de: 'Calendly', en: 'Calendly', fr: 'Calendly', ar: 'Calendly' },
  { de: 'Meta Ads', en: 'Meta Ads', fr: 'Meta Ads', ar: 'Meta Ads' },
  { de: 'OpenImmo / CSV-Import', en: 'OpenImmo / CSV import', fr: 'Import OpenImmo / CSV', ar: 'استيراد OpenImmo / CSV' },
  { de: 'E-Mail', en: 'Email', fr: 'E-mail', ar: 'البريد الإلكتروني' },
  { de: 'Web-Formulare', en: 'Web forms', fr: 'Formulaires web', ar: 'نماذج الويب' },
];

const HUB_COPY: Record<string, Record<string, string>> = {
  headline: {
    de: 'Integrationen — heute schon live',
    en: 'Integrations — live today',
    fr: 'Intégrations — déjà disponibles',
    ar: 'تكاملات متاحة اليوم',
  },
  body: {
    de: 'Zwei-Wege-Kalender-Sync, Meta Ads mit Live-Verbindungstest und Ein-Klick-Import über OpenImmo, CSV und Excel — dazu E-Mail-Eingang, Telefonie-Protokolle, Web-Formulare und Live-Chat. Alles direkt im Dashboard.',
    en: 'Two-way calendar sync, Meta Ads with a live connection test, and one-click import via OpenImmo, CSV and Excel — plus email intake, telephony logs, web forms and live chat. All in the dashboard today.',
    fr: 'Synchronisation bidirectionnelle des calendriers, Meta Ads avec test de connexion en direct et import en un clic via OpenImmo, CSV et Excel — plus e-mails entrants, journaux téléphoniques, formulaires web et chat en direct. Le tout déjà dans le tableau de bord.',
    ar: 'مزامنة ثنائية الاتجاه للتقويمات، وMeta Ads مع اختبار اتصال مباشر، واستيراد بنقرة واحدة عبر OpenImmo وCSV وExcel — إضافة إلى البريد الوارد وسجلات الهاتف ونماذج الويب والدردشة المباشرة. كل ذلك في لوحة التحكم اليوم.',
  },
  soon: {
    de: 'Bald verfügbar: Portal-Sync für ImmoScout24 & Immowelt — bis dahin ist OpenImmo der Weg.',
    en: 'Landing soon: portal sync for ImmoScout24 & Immowelt — until then, OpenImmo is the path.',
    fr: 'Bientôt : synchronisation des portails ImmoScout24 & Immowelt — d’ici là, OpenImmo est la voie.',
    ar: 'قريبًا: مزامنة بوابتي ImmoScout24 وImmowelt — وحتى ذلك الحين OpenImmo هو المسار.',
  },
  soonBadge: { de: 'Bald', en: 'Soon', fr: 'Bientôt', ar: 'قريبًا' },
};

const HUB_POS = HUB_CHANNELS.map((_, i) => {
  const a = ((i * 360) / HUB_CHANNELS.length - 90) * (Math.PI / 180);
  return {
    x: Math.max(16, Math.min(84, 50 + 40 * Math.cos(a))),
    y: 50 + 36 * Math.sin(a),
  };
});

const IntegrationHub = () => {
  const { language } = useLanguage();
  const reduced = usePrefersReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const [active, setActive] = useState(-1);
  useEffect(() => {
    if (reduced || !inView) return;
    setActive(0);
    const id = window.setInterval(() => setActive((a) => (a + 1) % HUB_CHANNELS.length), 1600);
    return () => window.clearInterval(id);
  }, [inView, reduced]);

  return (
    <section id="channels" ref={ref} className="py-20 md:py-28 bg-cream">
      <div className="container">
        <div className="grid items-center gap-10 lg:grid-cols-2 max-w-6xl mx-auto">
          <div>
            <Reveal direction="left">
              <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
                {HUB_COPY.headline[language] ?? HUB_COPY.headline.en}
              </h2>
              <p className="mt-5 text-body-lg text-slate leading-relaxed">
                {HUB_COPY.body[language] ?? HUB_COPY.body.en}
              </p>
              {/* coming-soon stays grey and clearly labelled — never "live" */}
              <p className="mt-5 flex items-start gap-2.5 text-sm text-warm-gray">
                <span className="mt-0.5 flex-none rounded-full border border-charcoal/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
                  {HUB_COPY.soonBadge[language] ?? HUB_COPY.soonBadge.en}
                </span>
                {HUB_COPY.soon[language] ?? HUB_COPY.soon.en}
              </p>
            </Reveal>
          </div>

          <Reveal direction="scale">
            <div className="relative mx-auto aspect-[16/13] w-full max-w-lg select-none">
              {/* dashed spokes; the active channel's line brightens */}
              <svg
                aria-hidden
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                {HUB_POS.map((p, i) => (
                  <line
                    key={i}
                    x1="50"
                    y1="50"
                    x2={p.x}
                    y2={p.y}
                    strokeDasharray="2 2.5"
                    strokeWidth={active === i ? 0.7 : 0.35}
                    className={active === i ? 'stroke-golden' : 'stroke-charcoal/20'}
                    style={{ transition: 'stroke 400ms ease-out, stroke-width 400ms ease-out' }}
                  />
                ))}
              </svg>

              {/* hub */}
              <div
                className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                style={{ left: '50%', top: '50%' }}
              >
                <span className="rounded-2xl border border-charcoal/10 bg-white px-4 py-2.5 font-heading text-lg shadow-card">
                  <span className="text-teal">immob</span>
                  <span className="text-golden">24</span>
                </span>
              </div>

              {/* channel chips */}
              {HUB_CHANNELS.map((c, i) => (
                <span
                  key={c.en}
                  className={`absolute whitespace-nowrap rounded-full border px-3 py-1.5 text-xs sm:text-sm font-medium transition-all duration-300 ${
                    active === i
                      ? 'border-golden bg-gradient-golden text-[#1E1B16] shadow-golden'
                      : 'border-charcoal/10 bg-white text-slate'
                  }`}
                  style={{
                    left: `${HUB_POS[i].x}%`,
                    top: `${HUB_POS[i].y}%`,
                    transform: `translate(-50%, -50%)${active === i ? ' scale(1.06)' : ''}`,
                  }}
                >
                  {c[language] ?? c.en}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const HumanControl = () => {
  const { t } = useLanguage();
  const bullets = asStringArray(t('howItWorksPage.control.bullets'));
  return (
    <section id="control" className="py-20 md:py-28 bg-cream">
      <div className="container">
        <Reveal className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('howItWorksPage.control.headline'))}
          </h2>
          <p className="mt-6 text-body-lg text-slate">
            {asString(t('howItWorksPage.control.body'))}
          </p>
        </Reveal>

        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-3 max-w-4xl mx-auto" as="ul">
          {bullets.map((b, i) => (
            <li key={i} className="rounded-xl bg-white border border-charcoal/10 p-5 list-none">
              <CheckCircle2 className="h-5 w-5 text-golden-dark" />
              <p className="mt-3 text-sm text-charcoal/85 leading-relaxed">{b}</p>
            </li>
          ))}
        </RevealGroup>
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
  const items = [
    ...asFaqArray(t('produkt.faq.items')),
    ...asFaqArray(t('howItWorksPage.faq.items')),
  ];
  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-center text-balance">
            {asString(t('produkt.faq.headline'))}
          </h2>

          <div className="mt-10 rounded-2xl bg-white border border-charcoal/10 px-6">
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
  const localPath = useLocalizedPath();
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
            {asString(t('produkt.finalCta.headline'))}
          </h2>
          <p className="mt-6 text-body-lg text-slate">
            {asString(t('produkt.finalCta.body'))}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              {...DEMO_CTA_PROPS}
              onClick={() => trackEvent('produkt_final_cta_click')}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-golden text-white px-7 py-3.5 font-semibold shadow-golden hover:opacity-95 transition-opacity"
            >
              {asString(t('produkt.finalCta.primaryCta'))}
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              to={localPath('crmAlternative')}
              onClick={() => trackEvent('produkt_final_secondary_cta_click')}
              className="inline-flex items-center gap-2 rounded-full border border-charcoal/20 bg-cream px-6 py-3 font-medium text-charcoal hover:bg-charcoal/5 transition-colors"
            >
              {asString(t('produkt.finalCta.secondaryCta'))}
            </Link>
          </div>

          <p className="mt-6 text-sm text-slate">
            <span className="text-warm-gray">{asString(t('produkt.finalCta.linksLabel'))}</span>{' '}
            <Link
              to={localPath('pricing')}
              onClick={() => trackEvent('produkt_final_pricing_link_click')}
              className="font-medium text-golden-dark underline underline-offset-2 hover:text-charcoal"
            >
              {asString(t('produkt.finalCta.linkPricing'))}
            </Link>
            {' · '}
            <Link
              to={`${localPath('contact')}?intent=demo`}
              onClick={() => trackEvent('produkt_final_demo_link_click')}
              className="font-medium text-golden-dark underline underline-offset-2 hover:text-charcoal"
            >
              {asString(t('produkt.finalCta.linkDemo'))}
            </Link>
          </p>

          <p className="mt-4 text-sm text-warm-gray">
            {asString(t('produkt.finalCta.supportNote'))}
          </p>
        </div>
      </div>
    </section>
  );
};

export default function ProduktDE() {
  const { t, language } = useLanguage();

  usePageMeta({
    pageKey: 'produkt',
    titleKey: 'produkt.meta.title',
    descriptionKey: 'produkt.meta.description',
  });
  useFaqSchema(
    [...asFaqArray(t('produkt.faq.items')), ...asFaqArray(t('howItWorksPage.faq.items'))],
    language,
    'produkt',
  );
  useJsonLd(
    [
      softwareApplicationSchema(language, asString(t('produkt.meta.description')), [
        asString(t('produkt.features.f1Title')),
        asString(t('produkt.features.f2Title')),
        asString(t('produkt.features.f3Title')),
        asString(t('produkt.features.f4Title')),
        asString(t('produkt.features.f5Title')),
      ]),
      breadcrumbSchema([
        { name: asString(t('nav.home')), path: pathFor('home', language) },
        { name: asString(t('nav.product')), path: pathFor('produkt', language) },
      ]),
    ],
    'produkt',
  );

  const sections = [
    Hero,
    Definition,
    AnswerBlock,
    ProblemFit,
    Features,
    // AI-refinement (draft/ai-refinement): the 7 AI co-workers + demo video
    SevenCoWorkersBand,
    UseCases,
    IntegrationHub,
    CrmComparison,
    WhoItsFor,
    HowItWorks,
    ProcessDeepDive,
    HumanControl,
    SocialProof,
    // AI-refinement: compliance trust strip
    ComplianceBadgesStrip,
    FAQ,
    FinalCTA,
  ];

  // Sections with their own inner Reveals (or a mount entrance) are not
  // double-wrapped; the rest get a coarse section-level Reveal.
  const selfAnimated = new Set<unknown>([
    Hero,
    Features,
    UseCases,
    WhoItsFor,
    HowItWorks,
    ProcessDeepDive,
    HumanControl,
    IntegrationHub,
    FAQ,
  ]);

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