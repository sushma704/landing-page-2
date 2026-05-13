import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  HelpCircle,
  Layers,
  Menu,
  MessageSquare,
  Sparkles,
  Target,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { useLanguage, languageOptions } from './i18n';
import type { Language } from './i18n';
import { useHashPageviews, trackEvent } from './lib/analytics';

// ----- helpers ------------------------------------------------------------

const asString = (v: string | string[] | Array<{ q: string; a: string }> | string[][]): string =>
  typeof v === 'string' ? v : '';
const asStringArray = (v: string | string[] | Array<{ q: string; a: string }> | string[][]): string[] =>
  Array.isArray(v) && v.every((x) => typeof x === 'string') ? (v as string[]) : [];
const asFaqArray = (
  v: string | string[] | Array<{ q: string; a: string }> | string[][],
): Array<{ q: string; a: string }> =>
  Array.isArray(v) && v.every((x) => typeof x === 'object' && x !== null && 'q' in x && 'a' in x)
    ? (v as Array<{ q: string; a: string }>)
    : [];
const asPairArray = (
  v: string | string[] | Array<{ q: string; a: string }> | string[][],
): string[][] =>
  Array.isArray(v) && v.every((x) => Array.isArray(x)) ? (v as string[][]) : [];

const TALLY_PROPS = {
  'data-tally-open': 'eqRpWJ',
  'data-tally-emoji-text': '👋',
  'data-tally-emoji-animation': 'wave',
  'data-tally-width': '400',
};

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

// ----- branding -----------------------------------------------------------

const Wordmark = ({ variant = 'dark' }: { variant?: 'dark' | 'light' }) => (
  <a
    href="#top"
    className="inline-flex items-center gap-2 font-heading font-bold text-xl tracking-tight"
    aria-label="Immob24"
  >
    <span
      className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${
        variant === 'light' ? 'bg-white text-charcoal' : 'bg-gradient-golden text-white'
      }`}
    >
      <Sparkles className="h-4 w-4" strokeWidth={2.5} />
    </span>
    <span className={variant === 'light' ? 'text-white' : 'text-charcoal'}>
      Immob<span className="text-golden">24</span>
    </span>
  </a>
);

// ----- header -------------------------------------------------------------

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();
  return (
    <div
      role="group"
      aria-label="Sprache wählen"
      className="inline-flex items-center rounded-full border border-charcoal/15 bg-white/80 backdrop-blur p-1 text-xs font-medium shadow-subtle"
    >
      {languageOptions.map((opt) => {
        const active = opt.code === language;
        return (
          <button
            key={opt.code}
            type="button"
            onClick={() => {
              setLanguage(opt.code as Language);
              trackEvent('lang_toggle_click', { to: opt.code });
            }}
            aria-pressed={active}
            className={`px-3 py-1 rounded-full transition-colors ${
              active
                ? 'bg-charcoal text-white'
                : 'text-charcoal/70 hover:text-charcoal'
            }`}
          >
            {opt.short}
          </button>
        );
      })}
    </div>
  );
};

const Header = () => {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { href: '#product', label: asString(t('nav.product')) },
    { href: '#how-it-works', label: asString(t('nav.howItWorks')) },
    { href: '#for-whom', label: asString(t('nav.forWhom')) },
    { href: '#crm-alternative', label: asString(t('nav.crmAlternative')) },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors ${
        scrolled ? 'bg-white/90 backdrop-blur border-b border-charcoal/5' : 'bg-transparent'
      }`}
    >
      <div className="container flex items-center justify-between py-4">
        <Wordmark />

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm text-charcoal/70 hover:text-charcoal transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <button
            type="button"
            {...TALLY_PROPS}
            onClick={() => trackEvent('header_cta_click')}
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-charcoal text-white px-4 py-2 text-sm font-medium hover:bg-charcoal/90 transition-colors"
          >
            {asString(t('nav.requestDemo'))}
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Menü"
            className="lg:hidden p-2 -mr-2 text-charcoal"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-charcoal/5 bg-white">
          <div className="container py-3 flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2 text-sm text-charcoal/80 hover:bg-cream rounded-lg"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              {...TALLY_PROPS}
              onClick={() => {
                setOpen(false);
                trackEvent('mobile_cta_click');
              }}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-charcoal text-white px-4 py-2 text-sm font-medium"
            >
              {asString(t('nav.requestDemo'))}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

// ----- hero ---------------------------------------------------------------

const Hero = () => {
  const { t } = useLanguage();
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
              {...TALLY_PROPS}
              onClick={() => trackEvent('hero_primary_cta_click')}
              className="inline-flex items-center gap-2 rounded-full bg-charcoal text-white px-6 py-3 font-medium shadow-golden hover:bg-charcoal/90 transition-colors"
            >
              {asString(t('hero.primaryCta'))}
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 bg-white px-6 py-3 font-medium text-charcoal hover:border-charcoal/40 transition-colors"
            >
              {asString(t('hero.secondaryCta'))}
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

// ----- answer block -------------------------------------------------------

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

// ----- problem ------------------------------------------------------------

const Problem = () => {
  const { t } = useLanguage();
  const points = asStringArray(t('problem.painpoints'));
  return (
    <section className="py-20 md:py-28 bg-charcoal text-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-balance">
            {asString(t('problem.headline'))}
          </h2>
          <p className="mt-6 text-body-lg text-white/70">
            {asString(t('problem.body'))}
          </p>
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

// ----- solution -----------------------------------------------------------

const Solution = () => {
  const { t } = useLanguage();
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-cream to-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('solution.headline'))}
          </h2>
          <p className="mt-6 text-body-lg text-slate">
            {asString(t('solution.body'))}
          </p>
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

// ----- features -----------------------------------------------------------

const Features = () => {
  const { t } = useLanguage();
  const items = [
    {
      icon: Zap,
      title: asString(t('features.f1Title')),
      body: asString(t('features.f1Body')),
    },
    {
      icon: Target,
      title: asString(t('features.f2Title')),
      body: asString(t('features.f2Body')),
    },
    {
      icon: MessageSquare,
      title: asString(t('features.f3Title')),
      body: asString(t('features.f3Body')),
    },
    {
      icon: Layers,
      title: asString(t('features.f4Title')),
      body: asString(t('features.f4Body')),
    },
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
      </div>
    </section>
  );
};

// ----- crm differentiation -----------------------------------------------

const CrmDifferentiation = () => {
  const { t } = useLanguage();
  const pairs = asPairArray(t('crmDiff.comparisons'));
  return (
    <section id="crm-alternative" className="py-20 md:py-28 bg-cream">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('crmDiff.headline'))}
          </h2>
          <p className="mt-6 text-body-lg text-slate">
            {asString(t('crmDiff.body'))}
          </p>
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
          <a
            href="#book-demo"
            className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 bg-white px-6 py-3 font-medium text-charcoal hover:border-charcoal/40 transition-colors"
          >
            {asString(t('crmDiff.cta'))}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

// ----- how it works -------------------------------------------------------

const HowItWorks = () => {
  const { t } = useLanguage();
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
          <button
            type="button"
            {...TALLY_PROPS}
            onClick={() => trackEvent('how_cta_click')}
            className="inline-flex items-center gap-2 rounded-full bg-charcoal text-white px-6 py-3 font-medium hover:bg-charcoal/90 transition-colors"
          >
            {asString(t('howItWorks.cta'))}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

// ----- social proof -------------------------------------------------------

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
          <p className="mt-4 text-sm text-warm-gray italic">
            {asString(t('socialProof.note'))}
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {items.map((quote, i) => (
            <figure
              key={i}
              className="rounded-2xl bg-white border border-charcoal/10 p-6 shadow-subtle"
            >
              <blockquote className="text-charcoal leading-relaxed">{quote}</blockquote>
              <figcaption className="mt-4 text-xs uppercase tracking-wider text-warm-gray">
                Platzhalter / Placeholder
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

// ----- use cases ----------------------------------------------------------

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

// ----- faq ----------------------------------------------------------------

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

// ----- final cta ----------------------------------------------------------

const FinalCTA = () => {
  const { t } = useLanguage();
  return (
    <section id="book-demo" className="py-20 md:py-28 bg-charcoal text-white relative overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full bg-gradient-golden opacity-10 blur-3xl"
      />
      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-balance">
            {asString(t('finalCta.headline'))}
          </h2>
          <p className="mt-6 text-body-lg text-white/70">
            {asString(t('finalCta.body'))}
          </p>

          <div className="mt-8 flex flex-col items-center gap-3">
            <button
              type="button"
              {...TALLY_PROPS}
              onClick={() => trackEvent('final_cta_click')}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-golden text-white px-7 py-3.5 font-semibold shadow-golden hover:opacity-95 transition-opacity"
            >
              {asString(t('finalCta.primaryCta'))}
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="text-sm text-white/55">
              {asString(t('finalCta.secondaryNote'))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// ----- legal modals -------------------------------------------------------

const LegalModal = ({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative bg-white rounded-2xl shadow-card-hover max-w-2xl w-full max-h-[85vh] overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between bg-white border-b border-charcoal/5 px-6 py-4">
          <h3 className="font-heading text-xl text-charcoal">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Schließen"
            className="p-1 text-charcoal/60 hover:text-charcoal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="px-6 py-5 text-sm text-slate leading-relaxed space-y-3">
          {children}
        </div>
      </div>
    </div>
  );
};

const ImpressumContent = () => (
  <>
    <p><strong>Angaben gemäß § 5 TMG</strong></p>
    <p>
      Immob24 GmbH<br />
      [Straße und Hausnummer]<br />
      [PLZ] [Stadt]<br />
      Deutschland
    </p>
    <p>
      <strong>Vertreten durch:</strong><br />
      [Geschäftsführer/in]
    </p>
    <p>
      <strong>Kontakt:</strong><br />
      Telefon: [Telefonnummer]<br />
      E-Mail: kontakt@immob24.de
    </p>
    <p>
      <strong>Registereintrag:</strong><br />
      Eintragung im Handelsregister<br />
      Registergericht: [Amtsgericht]<br />
      Registernummer: [HRB-Nummer]
    </p>
    <p>
      <strong>Umsatzsteuer-ID:</strong> [USt-IdNr.]
    </p>
    <p className="text-xs text-warm-gray pt-3 border-t border-charcoal/5">
      Platzhalter — bitte vor Launch durch finale rechtliche Angaben ersetzen.
    </p>
  </>
);

const DatenschutzContent = () => (
  <>
    <p><strong>1. Verantwortlicher</strong></p>
    <p>
      Verantwortlich für die Datenverarbeitung auf dieser Website ist Immob24 GmbH.
      Kontaktangaben siehe Impressum.
    </p>
    <p><strong>2. Erhebung und Verarbeitung personenbezogener Daten</strong></p>
    <p>
      Beim Besuch dieser Website werden technisch notwendige Daten verarbeitet (z. B. IP-Adresse,
      Browsertyp). Bei Nutzung des Demo-Formulars werden die übermittelten Angaben zur
      Kontaktaufnahme verwendet.
    </p>
    <p><strong>3. Analyse</strong></p>
    <p>
      Wir setzen Google Analytics und Meta Pixel ein, um die Nutzung der Seite auszuwerten.
      Details und Widerrufsmöglichkeiten folgen in der vollständigen Datenschutzerklärung.
    </p>
    <p><strong>4. Ihre Rechte</strong></p>
    <p>
      Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
      Verarbeitung sowie Widerspruch.
    </p>
    <p className="text-xs text-warm-gray pt-3 border-t border-charcoal/5">
      Platzhalter — bitte vor Launch durch finale Datenschutzerklärung ersetzen.
    </p>
  </>
);

const CookiesContent = () => (
  <>
    <p>
      Wir verwenden Cookies und ähnliche Technologien, um diese Website bereitzustellen, die
      Nutzung zu analysieren und Marketingmaßnahmen auszuwerten.
    </p>
    <p><strong>Notwendige Cookies</strong> sind für den Betrieb der Seite erforderlich.</p>
    <p>
      <strong>Analyse-Cookies</strong> (Google Analytics) und <strong>Marketing-Cookies</strong>
      {' '}(Meta Pixel) werden nur mit Ihrer Einwilligung gesetzt.
    </p>
    <p className="text-xs text-warm-gray pt-3 border-t border-charcoal/5">
      Platzhalter — vollständige Cookie-Richtlinie folgt vor Launch.
    </p>
  </>
);

// ----- footer -------------------------------------------------------------

const Footer = () => {
  const { t } = useLanguage();
  const [modal, setModal] = useState<null | 'impressum' | 'datenschutz' | 'cookies'>(null);

  const productLinks = [
    { href: '#product', label: asString(t('nav.product')) },
    { href: '#how-it-works', label: asString(t('nav.howItWorks')) },
    { href: '#crm-alternative', label: asString(t('nav.crmAlternative')) },
    { href: '#book-demo', label: asString(t('nav.demo')) },
  ];

  return (
    <>
      <footer className="bg-charcoal text-white py-16 border-t border-white/5">
        <div className="container">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <Wordmark variant="light" />
              <p className="mt-4 text-sm text-white/60 max-w-xs">
                {asString(t('hero.eyebrow'))}.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
                {asString(t('footer.sectionsLabel'))}
              </p>
              <nav className="mt-3 flex flex-col gap-2">
                {productLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="text-sm text-white/75 hover:text-white"
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href="mailto:kontakt@immob24.de"
                  className="text-sm text-white/75 hover:text-white"
                >
                  {asString(t('footer.contact'))}
                </a>
              </nav>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
                {asString(t('footer.legalLabel'))}
              </p>
              <nav className="mt-3 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => setModal('impressum')}
                  className="text-sm text-white/75 hover:text-white text-left"
                >
                  {asString(t('footer.impressum'))}
                </button>
                <button
                  type="button"
                  onClick={() => setModal('datenschutz')}
                  className="text-sm text-white/75 hover:text-white text-left"
                >
                  {asString(t('footer.datenschutz'))}
                </button>
                <button
                  type="button"
                  onClick={() => setModal('cookies')}
                  className="text-sm text-white/75 hover:text-white text-left"
                >
                  {asString(t('footer.cookies'))}
                </button>
              </nav>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-white/10 text-xs text-white/40 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <span>
              © {new Date().getFullYear()} Immob24. {asString(t('footer.copyright'))}
            </span>
            <span>Made in Germany.</span>
          </div>
        </div>
      </footer>

      <LegalModal
        open={modal === 'impressum'}
        onClose={() => setModal(null)}
        title={asString(t('footer.impressum'))}
      >
        <ImpressumContent />
      </LegalModal>
      <LegalModal
        open={modal === 'datenschutz'}
        onClose={() => setModal(null)}
        title={asString(t('footer.datenschutz'))}
      >
        <DatenschutzContent />
      </LegalModal>
      <LegalModal
        open={modal === 'cookies'}
        onClose={() => setModal(null)}
        title={asString(t('footer.cookies'))}
      >
        <CookiesContent />
      </LegalModal>
    </>
  );
};

// ----- app ----------------------------------------------------------------

function App() {
  useHashPageviews();

  // Reveal-on-scroll polish for all top-level sections.
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

const RevealOnScroll = ({ children }: { children: React.ReactNode }) => {
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

export default App;
