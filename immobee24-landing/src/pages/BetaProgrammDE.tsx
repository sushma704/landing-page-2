import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Clock,
  Handshake,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header, Footer, TALLY_PROPS } from '../components/SiteChrome';
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
  const bullets = asStringArray(t('betaProgram.hero.bullets'));
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
            {asString(t('betaProgram.hero.eyebrow'))}
          </span>

          <h1 className="mt-6 font-heading text-hero-mobile md:text-hero text-charcoal text-balance">
            {asString(t('betaProgram.hero.headline'))}
          </h1>

          <p className="mt-6 text-body-lg text-slate max-w-2xl mx-auto">
            {asString(t('betaProgram.hero.subheadline'))}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              {...TALLY_PROPS}
              onClick={() => trackEvent('beta_hero_primary_cta_click')}
              className="inline-flex items-center gap-2 rounded-full bg-charcoal text-white px-6 py-3 font-medium shadow-golden hover:bg-charcoal/90 transition-colors"
            >
              {asString(t('betaProgram.hero.primaryCta'))}
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href="#pilot"
              className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 bg-white px-6 py-3 font-medium text-charcoal hover:border-charcoal/40 transition-colors"
            >
              {asString(t('betaProgram.hero.secondaryCta'))}
            </a>
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

const BulletSection = ({
  id,
  bg,
  headlineKey,
  bulletsKey,
  bulletIcon: Icon = CheckCircle2,
}: {
  id?: string;
  bg: string;
  headlineKey: string;
  bulletsKey: string;
  bulletIcon?: React.ComponentType<{ className?: string }>;
}) => {
  const { t } = useLanguage();
  const bullets = asStringArray(t(bulletsKey));
  return (
    <section id={id} className={`py-20 md:py-28 ${bg}`}>
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t(headlineKey))}
          </h2>
        </div>

        <ul className="mt-12 grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {bullets.map((b, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-xl border border-charcoal/10 bg-white p-5 shadow-subtle"
            >
              <Icon className="h-5 w-5 text-golden-dark flex-shrink-0 mt-0.5" />
              <span className="text-charcoal">{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

const WhoFor = () => {
  const { t } = useLanguage();
  const bullets = asStringArray(t('betaProgram.whoFor.bullets'));
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('betaProgram.whoFor.headline'))}
          </h2>
          <p className="mt-6 text-body-lg text-slate">
            {asString(t('betaProgram.whoFor.body'))}
          </p>
        </div>

        <ul className="mt-10 grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {bullets.map((b, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-xl border border-charcoal/10 bg-cream p-5 shadow-subtle"
            >
              <Users className="h-5 w-5 text-golden-dark flex-shrink-0 mt-0.5" />
              <span className="text-charcoal">{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

const Pilot = () => {
  const { t } = useLanguage();
  const phases = [
    {
      titleKey: 'betaProgram.pilot.phase1Title',
      bodyKey: 'betaProgram.pilot.phase1Body',
      icon: ClipboardList,
    },
    {
      titleKey: 'betaProgram.pilot.phase2Title',
      bodyKey: 'betaProgram.pilot.phase2Body',
      icon: Clock,
    },
    {
      titleKey: 'betaProgram.pilot.phase3Title',
      bodyKey: 'betaProgram.pilot.phase3Body',
      icon: CalendarDays,
    },
  ];
  return (
    <section id="pilot" className="py-20 md:py-28 bg-cream">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('betaProgram.pilot.headline'))}
          </h2>
        </div>

        <ol className="mt-12 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {phases.map((p, i) => (
            <li
              key={i}
              className="rounded-2xl border border-charcoal/10 bg-white p-6 md:p-7 shadow-card"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-golden text-white shadow-golden">
                  <p.icon className="h-5 w-5" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-golden-dark">
                  {`0${i + 1}`}
                </span>
              </div>
              <h3 className="mt-4 font-heading text-xl text-charcoal">
                {asString(t(p.titleKey))}
              </h3>
              <p className="mt-3 text-slate leading-relaxed">{asString(t(p.bodyKey))}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

const Trust = () => {
  const { t } = useLanguage();
  const bullets = asStringArray(t('betaProgram.trust.bullets'));
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-cream to-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('betaProgram.trust.headline'))}
          </h2>
          <p className="mt-6 text-body-lg text-slate">
            {asString(t('betaProgram.trust.body'))}
          </p>
        </div>

        <ul className="mt-10 grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {bullets.map((b, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-xl border border-charcoal/10 bg-white p-5 shadow-subtle"
            >
              <ShieldCheck className="h-5 w-5 text-honey-green flex-shrink-0 mt-0.5" />
              <span className="text-charcoal">{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

// Tally injects window.Tally with loadEmbeds() once its embed.js script
// (loaded async in index.html) has initialised.
declare global {
  interface Window {
    Tally?: { loadEmbeds: () => void };
  }
}

const TALLY_BETA_FORM_SRC =
  'https://tally.so/r/ja5bzJ?transparentBackground=1&dynamicHeight=1';

const ApplicationForm = () => {
  const { t } = useLanguage();

  // Wire up the iframe with Tally's embed.js once it has loaded. The script
  // in index.html loads async, so it may not be ready at mount time.
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
    <section id="apply" className="py-20 md:py-28 bg-gradient-to-b from-cream to-white">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
              {asString(t('betaProgram.form.headline'))}
            </h2>
            <p className="mt-6 text-body-lg text-slate">
              {asString(t('betaProgram.form.intro'))}
            </p>
          </div>

          <div className="mt-10 rounded-2xl border border-charcoal/10 bg-white shadow-card overflow-hidden">
            <iframe
              data-tally-src={TALLY_BETA_FORM_SRC}
              loading="lazy"
              width="100%"
              height="900"
              frameBorder={0}
              marginHeight={0}
              marginWidth={0}
              title="Jetzt für das immob24 Beta Programm bewerben."
              className="block w-full"
              onLoad={() => trackEvent('beta_form_iframe_loaded')}
            />
          </div>

          <p className="mt-6 text-sm text-warm-gray text-center italic">
            {asString(t('betaProgram.form.microcopy'))}
          </p>
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
  const items = asFaqArray(t('betaProgram.faq.items'));
  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-center text-balance">
            {asString(t('betaProgram.faq.headline'))}
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
    <section className="py-20 md:py-28 bg-white text-charcoal relative overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full bg-gradient-golden opacity-10 blur-3xl"
      />
      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center">
          <Handshake className="h-10 w-10 text-golden mx-auto" />
          <h2 className="mt-4 font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('betaProgram.finalCta.headline'))}
          </h2>
          <p className="mt-6 text-body-lg text-slate">
            {asString(t('betaProgram.finalCta.body'))}
          </p>

          <div className="mt-8 flex flex-col items-center gap-3">
            <button
              type="button"
              {...TALLY_PROPS}
              onClick={() => trackEvent('beta_final_cta_click')}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-golden text-white px-7 py-3.5 font-semibold shadow-golden hover:opacity-95 transition-opacity"
            >
              {asString(t('betaProgram.finalCta.cta'))}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <p className="mt-6 text-sm text-slate">
            <span className="text-warm-gray">
              {asString(t('betaProgram.finalCta.linksLabel'))}
            </span>{' '}
            <Link
              to={localPath('produkt')}
              onClick={() => trackEvent('beta_final_product_link_click')}
              className="font-medium text-golden-dark underline underline-offset-2 hover:text-charcoal"
            >
              {asString(t('betaProgram.finalCta.linkProduct'))}
            </Link>
            {' · '}
            <Link
              to={localPath('demo')}
              onClick={() => trackEvent('beta_final_demo_link_click')}
              className="font-medium text-golden-dark underline underline-offset-2 hover:text-charcoal"
            >
              {asString(t('betaProgram.finalCta.linkDemo'))}
            </Link>
            {' · '}
            <Link
              to={localPath('pricing')}
              onClick={() => trackEvent('beta_final_pricing_link_click')}
              className="font-medium text-golden-dark underline underline-offset-2 hover:text-charcoal"
            >
              {asString(t('betaProgram.finalCta.linkPricing'))}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default function BetaProgrammDE() {
  const { t, language } = useLanguage();

  usePageMeta({
    pageKey: 'beta',
    titleKey: 'betaProgram.meta.title',
    descriptionKey: 'betaProgram.meta.description',
  });
  useFaqSchema(asFaqArray(t('betaProgram.faq.items')), language, 'beta');
  useJsonLd(
    [
      breadcrumbSchema([
        { name: asString(t('nav.home')), path: pathFor('home', language) },
        {
          name: asString(t('betaProgram.nav')),
          path: pathFor('beta', language),
        },
      ]),
    ],
    'beta',
  );

  const sections: Array<() => ReactNode> = [
    Hero,
    () => (
      <BulletSection
        bg="bg-white"
        headlineKey="betaProgram.whyJoin.headline"
        bulletsKey="betaProgram.whyJoin.bullets"
        bulletIcon={Sparkles}
      />
    ),
    () => (
      <BulletSection
        bg="bg-cream"
        headlineKey="betaProgram.whatYouGet.headline"
        bulletsKey="betaProgram.whatYouGet.bullets"
        bulletIcon={CheckCircle2}
      />
    ),
    WhoFor,
    Pilot,
    () => (
      <BulletSection
        bg="bg-white"
        headlineKey="betaProgram.weNeed.headline"
        bulletsKey="betaProgram.weNeed.bullets"
        bulletIcon={ClipboardList}
      />
    ),
    Trust,
    ApplicationForm,
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