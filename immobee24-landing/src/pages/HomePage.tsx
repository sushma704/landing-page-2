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
import { usePageMeta } from '../lib/usePageMeta';
import { useFaqSchema } from '../lib/useFaqSchema';
import { useJsonLd } from '../lib/useJsonLd';
import { organizationSchema } from '../lib/schema';
import { useLocalizedPath } from '../lib/useLocalizedPath';
import { Header, Footer, DEMO_CTA_PROPS } from '../components/SiteChrome';

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

const Hero = () => {
  const { t } = useLanguage();
  const localPath = useLocalizedPath();
  const bullets = asStringArray(t('hero.trustBullets'));

  return (
    <section
      id="top"
      className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-gradient-to-b from-cream to-white"
    >
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
          <span className="inline-flex items-center gap-2 rounded-full border border-golden/30 bg-white px-4 py-1.5 text-xs font-medium text-golden-dark shadow-subtle">
            <Sparkles className="h-3.5 w-3.5" />
            {asString(t('hero.eyebrow'))}
          </span>

          <h1 className="mt-6 font-heading text-hero-mobile md:text-hero text-charcoal text-balance">
            {asString(t('hero.headline'))}
          </h1>

          <p className="mt-6 text-body-lg text-slate max-w-2xl mx-auto">
            {asString(t('hero.subheadline'))}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              {...DEMO_CTA_PROPS}
              onClick={() => trackEvent('hero_primary_cta_click')}
              className="inline-flex items-center gap-2 rounded-full bg-charcoal text-white px-6 py-3 font-medium shadow-golden hover:bg-charcoal/90 transition-colors"
            >
              {asString(t('hero.primaryCta'))}
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              to={localPath('howItWorks')}
              onClick={() => trackEvent('hero_secondary_cta_click')}
              className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 bg-white px-6 py-3 font-medium text-charcoal hover:border-charcoal/40 transition-colors"
            >
              {asString(t('hero.secondaryCta'))}
            </Link>
          </div>

          <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 max-w-2xl mx-auto text-left">
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

  const sections = [
    Hero,
    AnswerBlock,
    Problem,
    Solution,
    Features,
    CrmDifferentiation,
    HowItWorks,
    SocialProof,
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
