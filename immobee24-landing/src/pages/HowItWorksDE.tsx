import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  ArrowRight,
  Bell,
  CheckCircle2,
  Inbox,
  ListChecks,
  Sparkles,
  Workflow,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header, Footer, TALLY_PROPS } from '../components/SiteChrome';
import { trackEvent } from '../lib/analytics';
import { usePageMeta } from '../lib/usePageMeta';
import { useFaqSchema } from '../lib/useFaqSchema';
import { useLocalizedPath } from '../lib/useLocalizedPath';
import { useLanguage } from '../i18n';

type TVal = string | string[] | Array<{ q: string; a: string }> | string[][];
type StepItem = { title: string; body: string };
const asString = (v: TVal): string => (typeof v === 'string' ? v : '');
const asStringArray = (v: TVal): string[] =>
  Array.isArray(v) && v.every((x) => typeof x === 'string') ? (v as string[]) : [];
const asFaqArray = (v: TVal): Array<{ q: string; a: string }> =>
  Array.isArray(v) &&
  v.every((x) => typeof x === 'object' && x !== null && 'q' in x && 'a' in x)
    ? (v as Array<{ q: string; a: string }>)
    : [];
const asStepArray = (v: unknown): StepItem[] =>
  Array.isArray(v) &&
  v.every(
    (x) =>
      typeof x === 'object' &&
      x !== null &&
      'title' in x &&
      'body' in x &&
      typeof (x as StepItem).title === 'string' &&
      typeof (x as StepItem).body === 'string',
  )
    ? (v as StepItem[])
    : [];

function useInView<T extends HTMLElement>(threshold = 0.1) {
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

const Hero = () => {
  const { t } = useLanguage();
  const localPath = useLocalizedPath();
  const bullets = asStringArray(t('howItWorksPage.hero.bullets'));
  return (
    <section
      id="top"
      className="relative pt-36 pb-20 md:pt-44 md:pb-24 overflow-hidden bg-gradient-to-b from-cream to-white"
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
            <Workflow className="h-3.5 w-3.5" />
            {asString(t('howItWorksPage.hero.eyebrow'))}
          </span>

          <h1 className="mt-6 font-heading text-hero-mobile md:text-hero text-charcoal text-balance">
            {asString(t('howItWorksPage.hero.headline'))}
          </h1>

          <p className="mt-6 text-body-lg text-slate max-w-2xl mx-auto">
            {asString(t('howItWorksPage.hero.subheadline'))}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              {...TALLY_PROPS}
              onClick={() => trackEvent('howitworks_hero_primary_cta_click')}
              className="inline-flex items-center gap-2 rounded-full bg-charcoal text-white px-6 py-3 font-medium shadow-golden hover:bg-charcoal/90 transition-colors"
            >
              {asString(t('howItWorksPage.hero.primaryCta'))}
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              to={localPath('produkt')}
              className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 bg-white px-6 py-3 font-medium text-charcoal hover:border-charcoal/40 transition-colors"
            >
              {asString(t('howItWorksPage.hero.secondaryCta'))}
            </Link>
          </div>

          {bullets.length > 0 && (
            <ul className="mt-10 grid sm:grid-cols-2 gap-3 text-left max-w-2xl mx-auto">
              {bullets.map((b, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-xl bg-white border border-charcoal/10 px-4 py-3 shadow-subtle"
                >
                  <CheckCircle2 className="h-5 w-5 text-golden mt-0.5 flex-none" />
                  <span className="text-sm text-charcoal/85">{b}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

const Intro = () => {
  const { t } = useLanguage();
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('howItWorksPage.intro.headline'))}
          </h2>
          <p className="mt-6 text-body-lg text-slate">
            {asString(t('howItWorksPage.intro.body'))}
          </p>
        </div>
      </div>
    </section>
  );
};

const STEP_ICONS = [Inbox, Zap, ListChecks, Workflow, Sparkles, Bell];

const Steps = () => {
  const { t } = useLanguage();
  const items = asStepArray(t('howItWorksPage.steps.items') as unknown);
  return (
    <section id="steps" className="py-20 md:py-24 bg-cream">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('howItWorksPage.steps.headline'))}
          </h2>
        </div>

        <ol className="mt-12 grid gap-6 max-w-4xl mx-auto">
          {items.map((step, i) => {
            const Icon = STEP_ICONS[i] ?? CheckCircle2;
            return (
              <li
                key={i}
                className="relative rounded-2xl bg-white border border-charcoal/10 p-6 md:p-8 shadow-subtle"
              >
                <div className="flex items-start gap-5">
                  <div className="flex-none flex flex-col items-center">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-golden text-white font-heading text-lg shadow-golden">
                      {i + 1}
                    </span>
                    <Icon className="h-5 w-5 text-golden mt-3" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-xl md:text-2xl text-charcoal">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-slate leading-relaxed">{step.body}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-12 flex justify-center">
          <button
            type="button"
            {...TALLY_PROPS}
            onClick={() => trackEvent('howitworks_steps_cta_click')}
            className="inline-flex items-center gap-2 rounded-full bg-charcoal text-white px-6 py-3 font-medium shadow-golden hover:bg-charcoal/90 transition-colors"
          >
            {asString(t('howItWorksPage.hero.primaryCta'))}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

const ProcessLogic = () => {
  const { t } = useLanguage();
  const bullets = asStringArray(t('howItWorksPage.process.bullets'));
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('howItWorksPage.process.headline'))}
          </h2>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 max-w-4xl mx-auto">
          {bullets.map((b, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-xl bg-cream border border-charcoal/10 px-5 py-4"
            >
              <CheckCircle2 className="h-5 w-5 text-golden mt-0.5 flex-none" />
              <span className="text-charcoal/85">{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

const WhyItMatters = () => {
  const { t } = useLanguage();
  return (
    <section className="py-20 md:py-24 bg-cream">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('howItWorksPage.why.headline'))}
          </h2>
          <p className="mt-6 text-body-lg text-slate">
            {asString(t('howItWorksPage.why.body'))}
          </p>
        </div>
      </div>
    </section>
  );
};

const Control = () => {
  const { t } = useLanguage();
  const bullets = asStringArray(t('howItWorksPage.control.bullets'));
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('howItWorksPage.control.headline'))}
          </h2>
          <p className="mt-6 text-body-lg text-slate">
            {asString(t('howItWorksPage.control.body'))}
          </p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-3 max-w-4xl mx-auto">
          {bullets.map((b, i) => (
            <li
              key={i}
              className="rounded-xl bg-cream border border-charcoal/10 p-5"
            >
              <CheckCircle2 className="h-5 w-5 text-golden" />
              <p className="mt-3 text-sm text-charcoal/85 leading-relaxed">{b}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

const Audience = () => {
  const { t } = useLanguage();
  const bullets = asStringArray(t('howItWorksPage.audience.bullets'));
  return (
    <section className="py-20 md:py-24 bg-cream">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('howItWorksPage.audience.headline'))}
          </h2>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 max-w-4xl mx-auto">
          {bullets.map((b, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-xl bg-white border border-charcoal/10 px-5 py-4"
            >
              <CheckCircle2 className="h-5 w-5 text-golden mt-0.5 flex-none" />
              <span className="text-charcoal/85">{b}</span>
            </li>
          ))}
        </ul>
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
        className="w-full flex items-start justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-heading text-lg text-charcoal">{q}</span>
        <span
          className={`mt-1 text-golden transition-transform ${open ? 'rotate-45' : ''}`}
          aria-hidden
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
  const items = asFaqArray(t('howItWorksPage.faq.items'));
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance text-center">
            {asString(t('howItWorksPage.faq.headline'))}
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
            {asString(t('howItWorksPage.finalCta.headline'))}
          </h2>
          <p className="mt-6 text-body-lg text-slate">
            {asString(t('howItWorksPage.finalCta.body'))}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              {...TALLY_PROPS}
              onClick={() => trackEvent('howitworks_final_cta_click')}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-golden text-white px-7 py-3.5 font-semibold shadow-golden hover:opacity-95 transition-opacity"
            >
              {asString(t('howItWorksPage.finalCta.primaryCta'))}
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              to={localPath('produkt')}
              className="inline-flex items-center gap-2 rounded-full border border-charcoal/20 bg-cream px-6 py-3 font-medium text-charcoal hover:bg-charcoal/5 transition-colors"
            >
              {asString(t('howItWorksPage.finalCta.secondaryCta'))}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function HowItWorksDE() {
  const { t, language } = useLanguage();

  usePageMeta({
    pageKey: 'howItWorks',
    titleKey: 'howItWorksPage.meta.title',
    descriptionKey: 'howItWorksPage.meta.description',
  });
  useFaqSchema(asFaqArray(t('howItWorksPage.faq.items')), language, 'how-it-works');

  const sections: Array<() => ReactNode> = [
    Hero,
    Intro,
    Steps,
    ProcessLogic,
    WhyItMatters,
    Control,
    Audience,
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