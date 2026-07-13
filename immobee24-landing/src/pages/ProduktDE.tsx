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
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header, Footer, DEMO_CTA_PROPS } from '../components/SiteChrome';
import { HeroWaves } from '../components/HeroWaves';
import { Reveal, RevealGroup, usePrefersReducedMotion } from '../lib/animations';
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
              className="inline-flex items-center gap-2 rounded-full bg-charcoal text-white px-6 py-3 font-medium shadow-golden hover:bg-charcoal/90 transition-colors"
            >
              {asString(t('produkt.hero.primaryCta'))}
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              to={localPath('howItWorks')}
              onClick={() => trackEvent('produkt_hero_secondary_cta_click')}
              className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 bg-white px-6 py-3 font-medium text-charcoal hover:border-charcoal/40 transition-colors"
            >
              {asString(t('produkt.hero.secondaryCta'))}
            </Link>
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
    <section className="py-20 md:py-28 bg-charcoal text-white">
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
};

const Features = () => {
  const { t } = useLanguage();
  const items: Feature[] = [
    { icon: Zap, titleKey: 'produkt.features.f1Title', bodyKey: 'produkt.features.f1Body' },
    { icon: Target, titleKey: 'produkt.features.f2Title', bodyKey: 'produkt.features.f2Body' },
    {
      icon: CalendarClock,
      titleKey: 'produkt.features.f3Title',
      bodyKey: 'produkt.features.f3Body',
    },
    { icon: Repeat, titleKey: 'produkt.features.f4Title', bodyKey: 'produkt.features.f4Body' },
    { icon: Layers, titleKey: 'produkt.features.f5Title', bodyKey: 'produkt.features.f5Body' },
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
              <tr className="bg-charcoal text-white text-sm uppercase tracking-wider">
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
            className="inline-flex items-center gap-2 rounded-full bg-charcoal text-white px-6 py-3 font-medium hover:bg-charcoal/90 transition-colors"
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
  const items = asFaqArray(t('produkt.faq.items'));
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
              to={localPath('demo')}
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
  useFaqSchema(asFaqArray(t('produkt.faq.items')), language, 'produkt');
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
    CrmComparison,
    WhoItsFor,
    HowItWorks,
    SocialProof,
    // AI-refinement: compliance trust strip
    ComplianceBadgesStrip,
    FAQ,
    FinalCTA,
  ];

  // Sections with their own inner Reveals (or a mount entrance) are not
  // double-wrapped; the rest get a coarse section-level Reveal.
  const selfAnimated = new Set<unknown>([Hero, Features, UseCases, WhoItsFor, HowItWorks, FAQ]);

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