import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components/SiteChrome';
import { trackEvent } from '../lib/analytics';
import { usePageMeta } from '../lib/usePageMeta';
import { useFaqSchema } from '../lib/useFaqSchema';
import { useJsonLd } from '../lib/useJsonLd';
import { breadcrumbSchema } from '../lib/schema';
import { useLocalizedPath } from '../lib/useLocalizedPath';
import { useLanguage } from '../i18n';
import { pathFor } from '../i18n/pages';

type TVal = string | string[] | Array<{ q: string; a: string }> | string[][];
const asString = (v: TVal): string => (typeof v === 'string' ? v : '');
const asStringArray = (v: TVal): string[] =>
  Array.isArray(v) && v.every((x) => typeof x === 'string') ? (v as string[]) : [];
const asFaqArray = (v: TVal): Array<{ q: string; a: string }> =>
  Array.isArray(v) &&
  v.every((x) => typeof x === 'object' && x !== null && 'q' in x && 'a' in x)
    ? (v as Array<{ q: string; a: string }>)
    : [];

declare global {
  interface Window {
    Tally?: { loadEmbeds: () => void };
  }
}

const TALLY_DEMO_FORM_SRC =
  'https://tally.so/r/ja5bzJ?transparentBackground=1&dynamicHeight=1';

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
  return (
    <section
      id="top"
      className="relative pt-36 pb-12 md:pt-44 md:pb-16 overflow-hidden bg-gradient-to-b from-cream to-white"
    >
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-gradient-golden opacity-20 blur-3xl"
      />
      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-golden/30 bg-white px-4 py-1.5 text-xs font-medium text-golden-dark shadow-subtle">
            <Sparkles className="h-3.5 w-3.5" />
            {asString(t('demoPage.hero.eyebrow'))}
          </span>

          <h1 className="mt-6 font-heading text-hero-mobile md:text-hero text-charcoal text-balance">
            {asString(t('demoPage.hero.headline'))}
          </h1>

          <p className="mt-6 text-body-lg text-slate max-w-2xl mx-auto">
            {asString(t('demoPage.hero.subheadline'))}
          </p>

          <div className="mt-8 flex flex-col items-center gap-3">
            <a
              href="#demo-form"
              onClick={() => trackEvent('demo_hero_cta_click')}
              className="inline-flex items-center gap-2 rounded-full bg-charcoal text-white px-6 py-3 font-medium shadow-golden hover:bg-charcoal/90 transition-colors"
            >
              {asString(t('demoPage.hero.primaryCta'))}
              <ArrowRight className="h-4 w-4" />
            </a>
            <p className="text-sm text-warm-gray">{asString(t('demoPage.hero.microcopy'))}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const FormSection = () => {
  const { t } = useLanguage();
  useEffect(() => {
    const init = () => {
      if (window.Tally?.loadEmbeds) {
        window.Tally.loadEmbeds();
        return true;
      }
      return false;
    };
    if (init()) return;
    const interval = window.setInterval(() => {
      if (init()) window.clearInterval(interval);
    }, 200);
    const timeout = window.setTimeout(() => window.clearInterval(interval), 5000);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, []);

  return (
    <section
      id="demo-form"
      className="py-16 md:py-20 bg-gradient-to-b from-white to-cream"
    >
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
              {asString(t('demoPage.form.headline'))}
            </h2>
            <p className="mt-6 text-body-lg text-slate">
              {asString(t('demoPage.form.intro'))}
            </p>
          </div>
          <div className="mt-10 rounded-2xl border border-charcoal/10 bg-white shadow-card overflow-hidden">
            <iframe
              data-tally-src={TALLY_DEMO_FORM_SRC}
              loading="lazy"
              width="100%"
              height="900"
              frameBorder={0}
              marginHeight={0}
              marginWidth={0}
              title="Immob24 Demo anfragen"
              className="block w-full"
              onLoad={() => trackEvent('demo_form_iframe_loaded')}
            />
          </div>
          <p className="mt-6 text-sm text-warm-gray text-center italic">
            {asString(t('demoPage.form.microcopy'))}
          </p>
        </div>
      </div>
    </section>
  );
};

const WhatYouSee = () => {
  const { t } = useLanguage();
  const bullets = asStringArray(t('demoPage.whatYouSee.bullets'));
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('demoPage.whatYouSee.headline'))}
          </h2>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 max-w-4xl mx-auto">
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
        <p className="mt-10 text-center text-slate max-w-2xl mx-auto">
          {asString(t('demoPage.whatYouSee.support'))}
        </p>
      </div>
    </section>
  );
};

const WhoFor = () => {
  const { t } = useLanguage();
  const bullets = asStringArray(t('demoPage.whoFor.bullets'));
  return (
    <section className="py-20 md:py-24 bg-cream">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <Users className="h-8 w-8 text-golden mx-auto" />
          <h2 className="mt-4 font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('demoPage.whoFor.headline'))}
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

const NotADemo = () => {
  const { t } = useLanguage();
  const bullets = asStringArray(t('demoPage.notDemo.bullets'));
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <ShieldCheck className="h-8 w-8 text-golden mx-auto" />
          <h2 className="mt-4 font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('demoPage.notDemo.headline'))}
          </h2>
          <p className="mt-6 text-body-lg text-slate">
            {asString(t('demoPage.notDemo.body'))}
          </p>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 max-w-4xl mx-auto">
          {bullets.map((b, i) => (
            <li
              key={i}
              className="rounded-xl bg-cream border border-charcoal/10 p-5"
            >
              <CheckCircle2 className="h-5 w-5 text-golden" />
              <p className="mt-3 text-charcoal/85 leading-relaxed">{b}</p>
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

const Objections = () => {
  const { t } = useLanguage();
  const items = asFaqArray(t('demoPage.objections.items'));
  return (
    <section className="py-20 md:py-24 bg-cream">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance text-center">
            {asString(t('demoPage.objections.headline'))}
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

const FAQ = () => {
  const { t } = useLanguage();
  const items = asFaqArray(t('demoPage.faq.items'));
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance text-center">
            {asString(t('demoPage.faq.headline'))}
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
    <section className="py-20 md:py-28 bg-white text-charcoal relative overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full bg-gradient-golden opacity-10 blur-3xl"
      />
      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('demoPage.finalCta.headline'))}
          </h2>
          <p className="mt-6 text-body-lg text-slate">
            {asString(t('demoPage.finalCta.body'))}
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="#demo-form"
              onClick={() => trackEvent('demo_final_cta_click')}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-golden text-white px-7 py-3.5 font-semibold shadow-golden hover:opacity-95 transition-opacity"
            >
              {asString(t('demoPage.finalCta.primaryCta'))}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <p className="mt-6 text-sm text-slate">
            <span className="text-warm-gray">
              {asString(t('demoPage.finalCta.linksLabel'))}
            </span>{' '}
            <Link
              to={localPath('produkt')}
              onClick={() => trackEvent('demo_final_product_link_click')}
              className="font-medium text-golden-dark underline underline-offset-2 hover:text-charcoal"
            >
              {asString(t('demoPage.finalCta.linkProduct'))}
            </Link>
            {' · '}
            <Link
              to={localPath('pricing')}
              onClick={() => trackEvent('demo_final_pricing_link_click')}
              className="font-medium text-golden-dark underline underline-offset-2 hover:text-charcoal"
            >
              {asString(t('demoPage.finalCta.linkPricing'))}
            </Link>
            {' · '}
            <Link
              to={localPath('beta')}
              onClick={() => trackEvent('demo_final_beta_link_click')}
              className="font-medium text-golden-dark underline underline-offset-2 hover:text-charcoal"
            >
              {asString(t('demoPage.finalCta.linkBeta'))}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default function DemoDE() {
  const { t, language } = useLanguage();

  usePageMeta({
    pageKey: 'demo',
    titleKey: 'demoPage.meta.title',
    descriptionKey: 'demoPage.meta.description',
  });
  useFaqSchema(asFaqArray(t('demoPage.faq.items')), language, 'demo');
  useJsonLd(
    [
      breadcrumbSchema([
        { name: asString(t('nav.home')), path: pathFor('home', language) },
        { name: asString(t('demoPage.nav')), path: pathFor('demo', language) },
      ]),
    ],
    'demo',
  );

  const sections: Array<() => ReactNode> = [
    Hero,
    FormSection,
    WhatYouSee,
    WhoFor,
    NotADemo,
    Objections,
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
