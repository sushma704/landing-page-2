import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowRight, Check, Sparkles, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header, Footer, TALLY_PROPS } from '../components/SiteChrome';
import { trackEvent } from '../lib/analytics';
import { usePageMeta } from '../lib/usePageMeta';
import { useFaqSchema } from '../lib/useFaqSchema';
import { useLocalizedPath } from '../lib/useLocalizedPath';
import { useLanguage } from '../i18n';

type TVal = string | string[] | Array<{ q: string; a: string }> | string[][];
const asString = (v: TVal): string => (typeof v === 'string' ? v : '');
const asStringArray = (v: TVal): string[] =>
  Array.isArray(v) && v.every((x) => typeof x === 'string') ? (v as string[]) : [];
const asStringMatrix = (v: TVal): string[][] =>
  Array.isArray(v) &&
  v.every((row) => Array.isArray(row) && row.every((c) => typeof c === 'string'))
    ? (v as string[][])
    : [];
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
  const localPath = useLocalizedPath();
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
            {asString(t('pricingPage.hero.eyebrow'))}
          </span>

          <h1 className="mt-6 font-heading text-hero-mobile md:text-hero text-charcoal text-balance">
            {asString(t('pricingPage.hero.headline'))}
          </h1>

          <p className="mt-6 text-body-lg text-slate max-w-2xl mx-auto">
            {asString(t('pricingPage.hero.subheadline'))}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              {...TALLY_PROPS}
              onClick={() => trackEvent('pricing_hero_primary_cta_click')}
              className="inline-flex items-center gap-2 rounded-full bg-charcoal text-white px-6 py-3 font-medium shadow-golden hover:bg-charcoal/90 transition-colors"
            >
              {asString(t('pricingPage.hero.primaryCta'))}
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              to={localPath('beta')}
              className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 bg-white px-6 py-3 font-medium text-charcoal hover:border-charcoal/40 transition-colors"
            >
              {asString(t('pricingPage.hero.secondaryCta'))}
            </Link>
          </div>
          <p className="mt-4 text-sm text-warm-gray">
            {asString(t('pricingPage.hero.microcopy'))}
          </p>
        </div>
      </div>
    </section>
  );
};

type CardProps = {
  label: string;
  audience: string;
  price: string;
  subtext: string;
  description: string;
  included: string[];
  ctaLabel: string;
  onCta: () => void;
  ctaAttrs?: Record<string, string>;
  ctaHref?: string;
  recommended?: boolean;
  recommendedLabel?: string;
  support?: string;
};

const PricingCard = ({
  label,
  audience,
  price,
  subtext,
  description,
  included,
  ctaLabel,
  onCta,
  ctaAttrs,
  ctaHref,
  recommended,
  recommendedLabel,
  support,
}: CardProps) => {
  const wrapperBase =
    'relative flex flex-col rounded-2xl border bg-white p-6 md:p-8 transition-shadow';
  const wrapperVariant = recommended
    ? 'border-golden shadow-card-hover ring-1 ring-golden/40'
    : 'border-charcoal/10 shadow-card hover:shadow-card-hover';
  const ctaClassBase =
    'mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 font-medium transition-colors';
  const ctaClass = recommended
    ? `${ctaClassBase} bg-gradient-golden text-white shadow-golden hover:opacity-95`
    : `${ctaClassBase} bg-charcoal text-white hover:bg-charcoal/90`;

  const ctaContent = (
    <>
      {ctaLabel}
      <ArrowRight className="h-4 w-4" />
    </>
  );

  return (
    <div className={`${wrapperBase} ${wrapperVariant}`}>
      {recommended && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-gradient-golden text-white px-3 py-1 text-xs font-semibold shadow-golden">
          <Star className="h-3 w-3" /> {recommendedLabel}
        </span>
      )}

      <div>
        <h3 className="font-heading text-2xl text-charcoal">{label}</h3>
        <p className="mt-1 text-sm text-warm-gray">{audience}</p>
      </div>

      <div className="mt-6">
        <p className="font-heading text-3xl md:text-4xl text-charcoal">{price}</p>
        <p className="mt-2 text-sm text-slate">{subtext}</p>
      </div>

      <p className="mt-6 text-charcoal/85 leading-relaxed">{description}</p>

      <ul className="mt-6 space-y-3">
        {included.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-charcoal/85">
            <Check className="h-4 w-4 text-golden mt-1 flex-none" />
            <span className="text-sm">{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        {ctaHref ? (
          <Link to={ctaHref} onClick={onCta} className={ctaClass}>
            {ctaContent}
          </Link>
        ) : (
          <button type="button" onClick={onCta} {...ctaAttrs} className={ctaClass}>
            {ctaContent}
          </button>
        )}

        {support && (
          <p className="mt-3 text-xs text-warm-gray text-center italic">{support}</p>
        )}
      </div>
    </div>
  );
};

const PricingCards = () => {
  const { t } = useLanguage();
  return (
    <section id="plans" className="py-16 md:py-20 bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('pricingPage.cards.sectionHeadline'))}
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:gap-8 md:grid-cols-3 max-w-6xl mx-auto items-stretch">
          <PricingCard
            label={asString(t('pricingPage.cards.beta.label'))}
            audience={asString(t('pricingPage.cards.beta.audience'))}
            price={asString(t('pricingPage.cards.beta.price'))}
            subtext={asString(t('pricingPage.cards.beta.subtext'))}
            description={asString(t('pricingPage.cards.beta.description'))}
            included={asStringArray(t('pricingPage.cards.beta.included'))}
            ctaLabel={asString(t('pricingPage.cards.beta.cta'))}
            ctaHref="/de/beta-agentenprogramm"
            onCta={() => trackEvent('pricing_card_cta_click', { plan: 'beta' })}
            support={asString(t('pricingPage.cards.beta.support'))}
          />

          <PricingCard
            recommended
            recommendedLabel={asString(t('pricingPage.cards.recommendedBadge'))}
            label={asString(t('pricingPage.cards.team.label'))}
            audience={asString(t('pricingPage.cards.team.audience'))}
            price={asString(t('pricingPage.cards.team.price'))}
            subtext={asString(t('pricingPage.cards.team.subtext'))}
            description={asString(t('pricingPage.cards.team.description'))}
            included={asStringArray(t('pricingPage.cards.team.included'))}
            ctaLabel={asString(t('pricingPage.cards.team.cta'))}
            ctaAttrs={TALLY_PROPS}
            onCta={() => trackEvent('pricing_card_cta_click', { plan: 'team' })}
          />

          <PricingCard
            label={asString(t('pricingPage.cards.custom.label'))}
            audience={asString(t('pricingPage.cards.custom.audience'))}
            price={asString(t('pricingPage.cards.custom.price'))}
            subtext={asString(t('pricingPage.cards.custom.subtext'))}
            description={asString(t('pricingPage.cards.custom.description'))}
            included={asStringArray(t('pricingPage.cards.custom.included'))}
            ctaLabel={asString(t('pricingPage.cards.custom.cta'))}
            ctaAttrs={TALLY_PROPS}
            onCta={() => trackEvent('pricing_card_cta_click', { plan: 'custom' })}
            support={asString(t('pricingPage.cards.custom.support'))}
          />
        </div>
      </div>
    </section>
  );
};

const QuickComparison = () => {
  const { t } = useLanguage();
  const headers = asStringArray(t('pricingPage.quickComparison.headers'));
  const rows = asStringMatrix(t('pricingPage.quickComparison.rows'));
  return (
    <section className="py-20 md:py-24 bg-cream">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('pricingPage.quickComparison.headline'))}
          </h2>
        </div>

        <div className="mt-10 max-w-3xl mx-auto overflow-hidden rounded-2xl border border-charcoal/10 bg-white shadow-subtle">
          <table className="w-full text-left">
            <thead className="bg-charcoal text-white">
              <tr>
                {headers.map((h, i) => (
                  <th
                    key={i}
                    className="p-4 font-heading text-sm uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rIdx) => (
                <tr
                  key={rIdx}
                  className={`border-t border-charcoal/10 ${
                    rIdx % 2 === 1 ? 'bg-cream/40' : ''
                  }`}
                >
                  <td className="p-4 align-top text-charcoal/85">{row[0]}</td>
                  <td className="p-4 align-top font-heading text-charcoal">{row[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-center text-sm text-warm-gray italic">
          {asString(t('pricingPage.quickComparison.caption'))}
        </p>
      </div>
    </section>
  );
};

const Trust = () => {
  const { t } = useLanguage();
  const bullets = asStringArray(t('pricingPage.trust.bullets'));
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <Users className="h-8 w-8 text-golden mx-auto" />
          <h2 className="mt-4 font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('pricingPage.trust.headline'))}
          </h2>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 max-w-4xl mx-auto">
          {bullets.map((b, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-xl bg-cream border border-charcoal/10 px-5 py-4"
            >
              <Check className="h-5 w-5 text-golden mt-0.5 flex-none" />
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
  const items = asFaqArray(t('pricingPage.faq.items'));
  return (
    <section className="py-20 md:py-24 bg-cream">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance text-center">
            {asString(t('pricingPage.faq.headline'))}
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
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('pricingPage.finalCta.headline'))}
          </h2>
          <p className="mt-6 text-body-lg text-slate">
            {asString(t('pricingPage.finalCta.body'))}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              {...TALLY_PROPS}
              onClick={() => trackEvent('pricing_final_primary_cta_click')}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-golden text-white px-7 py-3.5 font-semibold shadow-golden hover:opacity-95 transition-opacity"
            >
              {asString(t('pricingPage.finalCta.primaryCta'))}
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              to={localPath('beta')}
              className="inline-flex items-center gap-2 rounded-full border border-charcoal/20 bg-cream px-6 py-3 font-medium text-charcoal hover:bg-charcoal/5 transition-colors"
            >
              {asString(t('pricingPage.finalCta.secondaryCta'))}
            </Link>
            <button
              type="button"
              {...TALLY_PROPS}
              onClick={() => trackEvent('pricing_final_tertiary_cta_click')}
              className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 bg-white px-6 py-3 font-medium text-charcoal hover:border-charcoal/40 transition-colors"
            >
              {asString(t('pricingPage.finalCta.tertiaryCta'))}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function PricingDE() {
  const { t, language } = useLanguage();

  usePageMeta({
    pageKey: 'pricing',
    titleKey: 'pricingPage.meta.title',
    descriptionKey: 'pricingPage.meta.description',
  });
  useFaqSchema(asFaqArray(t('pricingPage.faq.items')), language, 'pricing');

  const sections: Array<() => ReactNode> = [
    Hero,
    PricingCards,
    QuickComparison,
    Trust,
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
