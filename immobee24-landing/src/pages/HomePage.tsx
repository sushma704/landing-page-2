import { useEffect, useRef, useState, type ReactNode } from 'react';
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
import { LiveInquiryCard } from '../components/LiveInquiryCard';
import { HeroWaves } from '../components/HeroWaves';
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

function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        });
      },
      { threshold },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

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

const Hero = () => {
  const { t, language } = useLanguage();
  const localPath = useLocalizedPath();
  const bullets = asStringArray(t('hero.trustBullets'));
  const pillLabel = (p: (typeof HERO_PILLS)[number]) => p.label[language] ?? p.label.en;

  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col overflow-hidden bg-[#17140F] text-white"
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
          <span
            className="hero-in inline-flex items-center gap-2 rounded-full border border-golden/40 bg-white/5 backdrop-blur px-4 py-1.5 text-xs font-medium text-golden"
            style={{ animationDelay: '0.05s' }}
          >
            <Sparkles className="h-3.5 w-3.5" />
            {asString(t('hero.eyebrow'))}
          </span>

          <h1
            className="hero-in mt-6 font-heading text-hero-mobile md:text-hero text-white text-balance"
            style={{ animationDelay: '0.15s' }}
          >
            {asString(t('hero.headline'))}
          </h1>

          <p
            className="hero-in mt-6 text-body-lg text-white/70 max-w-2xl mx-auto"
            style={{ animationDelay: '0.28s' }}
          >
            {asString(t('hero.subheadline'))}
          </p>

          <div
            className="hero-in mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
            style={{ animationDelay: '0.4s' }}
          >
            <button
              type="button"
              {...DEMO_CTA_PROPS}
              onClick={() => trackEvent('hero_primary_cta_click')}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-golden px-7 py-3.5 font-semibold text-[#1E1B16] shadow-golden transition-transform hover:scale-[1.03]"
            >
              {asString(t('hero.primaryCta'))}
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              to={localPath('howItWorks')}
              onClick={() => trackEvent('hero_secondary_cta_click')}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 font-medium text-white hover:bg-white/10 transition-colors"
            >
              {asString(t('hero.secondaryCta'))}
            </Link>
          </div>

          <ul
            className="hero-in mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2"
            style={{ animationDelay: '0.5s' }}
          >
            {bullets.map((b, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-white/60">
                <CheckCircle2 className="h-4 w-4 text-honey-green flex-shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* product moment + stat pills — 3-column grid on desktop so the
            pills flank the card without ever overlapping it; compact row
            below the card on smaller screens. */}
        <div className="hero-in relative max-w-6xl mx-auto w-full" style={{ animationDelay: '0.62s' }}>
          <div className="xl:grid xl:grid-cols-[1fr_auto_1fr] xl:items-center xl:gap-8">
            {/* left pills */}
            <div aria-hidden className="hidden xl:flex flex-col items-end gap-8">
              {[HERO_PILLS[0], HERO_PILLS[2]].map((p, i) => (
                <div
                  key={p.stat}
                  className={`float-pill flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.07] backdrop-blur-md px-4 py-3 shadow-card ${
                    i === 0 ? '-translate-y-4' : 'translate-y-6'
                  }`}
                  style={{ animationDelay: `${-i * 1.7}s` }}
                >
                  <span className="font-metric text-lg font-bold text-golden whitespace-nowrap">{p.stat}</span>
                  <span className="text-xs text-white/75 max-w-[140px] leading-snug">{pillLabel(p)}</span>
                </div>
              ))}
            </div>

            {/* the live product moment */}
            <div className="relative z-10 xl:w-[36rem]">
              <LiveInquiryCard />
            </div>

            {/* right pills */}
            <div aria-hidden className="hidden xl:flex flex-col items-start gap-8">
              {[HERO_PILLS[1], HERO_PILLS[3]].map((p, i) => (
                <div
                  key={p.stat}
                  className={`float-pill flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.07] backdrop-blur-md px-4 py-3 shadow-card ${
                    i === 0 ? '-translate-y-6' : 'translate-y-4'
                  }`}
                  style={{ animationDelay: `${-(i + 2) * 1.7}s` }}
                >
                  <span className="font-metric text-lg font-bold text-golden whitespace-nowrap">{p.stat}</span>
                  <span className="text-xs text-white/75 max-w-[140px] leading-snug">{pillLabel(p)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* below xl: pills as a compact centered row under the card */}
          <div className="xl:hidden mt-6 flex flex-wrap justify-center gap-2">
            {HERO_PILLS.map((p) => (
              <span
                key={p.stat}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5 text-xs text-white/75"
              >
                <b className="font-metric text-golden">{p.stat}</b>
                {pillLabel(p)}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div aria-hidden className="relative pb-6 flex justify-center">
        <span className="scroll-cue inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/60">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </span>
      </div>
    </section>
  );
};

const AnswerBlock = () => {
  const { t } = useLanguage();
  return (
    <section id="product" className="py-16 md:py-24 bg-white">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
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
    <section className="py-20 md:py-28 bg-charcoal text-white">
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
            {asString(t('features.headline'))}
          </h2>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
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
              <h3 className="mt-4 font-heading text-xl text-charcoal">{item.title}</h3>
              <p className="mt-3 text-slate leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>

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
            to={localPath('howItWorks')}
            onClick={() => trackEvent('home_how_cta_click')}
            className="inline-flex items-center gap-2 rounded-full bg-charcoal text-white px-6 py-3 font-medium hover:bg-charcoal/90 transition-colors"
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

        <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
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
  return (
    <section id="pricing" className="py-20 md:py-28 bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('pricingTeaser.headline'))}
          </h2>
          <p className="mt-6 text-body-lg text-slate">{asString(t('pricingTeaser.body'))}</p>
        </div>

        <div className="mt-12 grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={i}
              className="rounded-2xl border border-charcoal/10 bg-cream p-6 text-center shadow-subtle"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-golden-soft text-golden-dark">
                <Tag className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-heading text-xl text-charcoal">{plan[0] ?? ''}</h3>
              <p className="mt-2 text-slate">{plan[1] ?? ''}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to={localPath('pricing')}
            onClick={() => trackEvent('home_pricing_cta_click')}
            className="inline-flex items-center gap-2 rounded-full bg-charcoal text-white px-6 py-3 font-medium hover:bg-charcoal/90 transition-colors"
          >
            {asString(t('pricingTeaser.pricingCta'))}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to={localPath('demo')}
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
          className={`flex-shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-full bg-charcoal/5 text-charcoal transition-transform ${
            open ? 'rotate-45' : ''
          }`}
        >
          +
        </span>
      </button>
      {open && <p className="pb-5 text-slate leading-relaxed">{a}</p>}
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
            {asString(t('faq.headline'))}
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

const RevealOnScroll = ({ children }: { children: ReactNode }) => {
  const { ref, inView } = useInView<HTMLDivElement>(0.05);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {children}
    </div>
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

  return (
    <div className="min-h-screen antialiased bg-white">
      <Header />
      <main className="relative">
        {sections.map((Section, i) => (
          <RevealOnScroll key={i}>
            <Section />
          </RevealOnScroll>
        ))}
      </main>
      <Footer />
    </div>
  );
}
