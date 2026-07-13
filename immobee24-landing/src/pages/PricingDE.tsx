import { useState, type ReactNode } from 'react';
import {
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  ClipboardList,
  Clock,
  Rocket,
  Sparkles,
  Star,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header, Footer, DEMO_CTA_PROPS } from '../components/SiteChrome';
import { HeroWaves } from '../components/HeroWaves';
import { trackEvent } from '../lib/analytics';
import { usePageMeta } from '../lib/usePageMeta';
import { useFaqSchema } from '../lib/useFaqSchema';
import { useJsonLd } from '../lib/useJsonLd';
import { productSchema, breadcrumbSchema } from '../lib/schema';
import { useLocalizedPath } from '../lib/useLocalizedPath';
import { Reveal, RevealGroup, TypeOnce } from '../lib/animations';
import { ScrollCue } from '../components/Wayfinding';
import { useLanguage } from '../i18n';
import { pathFor } from '../i18n/pages';

type TVal = string | string[] | Array<{ q: string; a: string }> | string[][];
// Tally application form — the beta program's real apply flow (carried over
// from the former beta page; the program now lives here, IA phase 3).
const BETA_APPLY_URL = 'https://tally.so/r/ja5bzJ';

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

const Hero = () => {
  const { t } = useLanguage();
  const localPath = useLocalizedPath();
  return (
    <section
      id="top"
      className="relative pt-36 pb-12 md:pt-44 md:pb-16 overflow-hidden bg-gradient-to-b from-cream to-white"
    >
      <HeroWaves />
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
            <TypeOnce text={asString(t('pricingPage.hero.headline'))} />
          </h1>

          <p className="mt-6 text-body-lg text-slate max-w-2xl mx-auto">
            {asString(t('pricingPage.hero.subheadline'))}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              {...DEMO_CTA_PROPS}
              onClick={() => trackEvent('pricing_hero_primary_cta_click')}
              className="inline-flex items-center gap-2 rounded-full band-dark bg-charcoal text-white px-6 py-3 font-medium shadow-golden hover:bg-charcoal/90 transition-colors"
            >
              {asString(t('pricingPage.hero.primaryCta'))}
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              to="#beta"
              className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 bg-white px-6 py-3 font-medium text-charcoal hover:border-charcoal/40 transition-colors"
            >
              {asString(t('pricingPage.hero.secondaryCta'))}
            </Link>
          </div>
          <p className="mt-4 text-sm text-warm-gray">
            {asString(t('pricingPage.hero.microcopy'))}
          </p>

          <ScrollCue targetId="plans" className="mt-8" />
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
    'relative flex w-full flex-col rounded-2xl border bg-white p-6 md:p-8 transition-shadow';
  const wrapperVariant = recommended
    ? 'fill-darken no-fill border-golden shadow-card-hover ring-1 ring-golden/40'
    : 'border-charcoal/10 shadow-card';
  const ctaClassBase =
    'mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 font-medium transition-colors';
  const ctaClass = recommended
    ? `${ctaClassBase} bg-gradient-golden text-[#1E1B16] shadow-golden hover:opacity-95`
    : `${ctaClassBase} band-dark bg-charcoal text-white hover:bg-charcoal/90`;

  const ctaContent = (
    <>
      {ctaLabel}
      <ArrowRight className="h-4 w-4" />
    </>
  );

  return (
    <div className={`${wrapperBase} ${wrapperVariant}`}>
      {recommended && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-gradient-golden text-[#1E1B16] px-3 py-1 text-xs font-semibold shadow-golden">
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
        <Reveal className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('pricingPage.cards.sectionHeadline'))}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:gap-8 md:grid-cols-3 max-w-6xl mx-auto items-stretch">
          {/* each Reveal is the grid item (flex, so the card stretches to equal height) */}
          <Reveal className="flex">
          <PricingCard
            label={asString(t('pricingPage.cards.beta.label'))}
            audience={asString(t('pricingPage.cards.beta.audience'))}
            price={asString(t('pricingPage.cards.beta.price'))}
            subtext={asString(t('pricingPage.cards.beta.subtext'))}
            description={asString(t('pricingPage.cards.beta.description'))}
            included={asStringArray(t('pricingPage.cards.beta.included'))}
            ctaLabel={asString(t('pricingPage.cards.beta.cta'))}
            ctaHref="#beta"
            onCta={() => trackEvent('pricing_card_cta_click', { plan: 'beta' })}
            support={asString(t('pricingPage.cards.beta.support'))}
          />
          </Reveal>

          <Reveal className="flex" delay={80}>
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
            ctaAttrs={DEMO_CTA_PROPS}
            onCta={() => trackEvent('pricing_card_cta_click', { plan: 'team' })}
          />
          </Reveal>

          <Reveal className="flex" delay={160}>
          <PricingCard
            label={asString(t('pricingPage.cards.custom.label'))}
            audience={asString(t('pricingPage.cards.custom.audience'))}
            price={asString(t('pricingPage.cards.custom.price'))}
            subtext={asString(t('pricingPage.cards.custom.subtext'))}
            description={asString(t('pricingPage.cards.custom.description'))}
            included={asStringArray(t('pricingPage.cards.custom.included'))}
            ctaLabel={asString(t('pricingPage.cards.custom.cta'))}
            ctaAttrs={DEMO_CTA_PROPS}
            onCta={() => trackEvent('pricing_card_cta_click', { plan: 'custom' })}
            support={asString(t('pricingPage.cards.custom.support'))}
          />
          </Reveal>
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
        <Reveal className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('pricingPage.quickComparison.headline'))}
          </h2>
        </Reveal>

        <Reveal direction="scale" className="mt-10 max-w-3xl mx-auto overflow-hidden rounded-2xl border border-charcoal/10 bg-white shadow-subtle">
          <table className="w-full text-left">
            <thead className="band-dark bg-charcoal text-white">
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
        </Reveal>

        <Reveal delay={100} as="p" className="mt-6 text-center text-sm text-warm-gray italic">
          {asString(t('pricingPage.quickComparison.caption'))}
        </Reveal>
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
        <Reveal className="max-w-3xl mx-auto text-center">
          <Users className="h-8 w-8 text-golden mx-auto" />
          <h2 className="mt-4 font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('pricingPage.trust.headline'))}
          </h2>
        </Reveal>
        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 max-w-4xl mx-auto">
          {bullets.map((b, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl bg-cream border border-charcoal/10 px-5 py-4"
            >
              <Check className="h-5 w-5 text-golden mt-0.5 flex-none" />
              <span className="text-charcoal/85">{b}</span>
            </div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
};

// ── Beta program (merged from the former beta page, IA phase 3) ──────────────
// The full pitch, pilot phases and application CTA now live on Pricing;
// betaProgram.* i18n keys are reused unchanged (4 languages).
const BetaProgram = () => {
  const { t, language } = useLanguage();
  const localPath = useLocalizedPath();
  const get = asStringArray(t('betaProgram.whatYouGet.bullets'));
  const phases = [1, 2, 3].map((n) => ({
    title: asString(t(`betaProgram.pilot.phase${n}Title`)),
    body: asString(t(`betaProgram.pilot.phase${n}Body`)),
    icon: [ClipboardList, Clock, CalendarDays][n - 1],
  }));
  const APPLY: Record<string, string> = {
    de: 'Jetzt für die Beta bewerben',
    en: 'Apply for the beta',
    fr: 'Postuler pour la bêta',
    ar: 'قدّموا لبرنامج بيتا',
  };
  const ASK: Record<string, string> = {
    de: 'Fragen? Kontakt aufnehmen',
    en: 'Questions? Get in touch',
    fr: 'Des questions ? Contactez-nous',
    ar: 'أسئلة؟ تواصلوا معنا',
  };

  return (
    <section id="beta" className="py-20 md:py-28 bg-cream">
      <div className="container">
        <Reveal className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-golden/30 bg-white px-4 py-1.5 text-xs font-medium text-golden-dark shadow-subtle">
            <Rocket className="h-3.5 w-3.5" />
            {asString(t('betaProgram.hero.eyebrow'))}
          </span>
          <h2 className="mt-5 font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('betaProgram.hero.headline'))}
          </h2>
          <p className="mt-5 text-body-lg text-slate">
            {asString(t('betaProgram.hero.subheadline'))}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 max-w-5xl mx-auto">
          {/* what you get — slides in from the left; the pilot from the right */}
          <Reveal direction="left" className="rounded-2xl border border-charcoal/10 bg-white p-6 md:p-8 shadow-card">
            <h3 className="font-heading text-xl text-charcoal">
              {asString(t('betaProgram.whatYouGet.headline'))}
            </h3>
            <ul className="mt-5 space-y-3">
              {get.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 mt-0.5 flex-none text-golden-dark" />
                  <span className="text-charcoal/85 leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* the pilot, 3 phases */}
          <Reveal direction="right" className="rounded-2xl border border-charcoal/10 bg-white p-6 md:p-8 shadow-card">
            <h3 className="font-heading text-xl text-charcoal">
              {asString(t('betaProgram.pilot.headline'))}
            </h3>
            <ol className="mt-5 space-y-5">
              {phases.map((ph, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-gradient-golden-soft text-golden-dark">
                    <ph.icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-semibold text-charcoal">{ph.title}</p>
                    <p className="mt-1 text-sm text-slate leading-relaxed">{ph.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <Reveal delay={150} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={BETA_APPLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('pricing_beta_apply_click')}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-golden px-7 py-3.5 font-semibold text-[#1E1B16] shadow-golden"
          >
            {APPLY[language] ?? APPLY.en}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </a>
          <Link
            to={`${localPath('contact')}?intent=beta`}
            className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 bg-white px-6 py-3 font-medium text-charcoal hover:border-charcoal/40 transition-colors"
          >
            {ASK[language] ?? ASK.en}
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

// ── ROI estimator (IA blueprint idea): one slider, one number ────────────────
// Deliberately labelled as a rough estimate with the assumption stated —
// no fabricated claims (content discipline).
const RoiEstimator = () => {
  const { language } = useLanguage();
  const [perWeek, setPerWeek] = useState(40);
  // assumption: ~6 min saved per inquiry (first reply, qualification,
  // scheduling coordination); 4.33 weeks/month
  const hours = Math.round((perWeek * 4.33 * 6) / 60);
  const C: Record<string, Record<string, string>> = {
    headline: {
      de: 'Was automatische Erstantworten sparen',
      en: 'What automatic first responses save',
      fr: 'Ce que les premières réponses automatiques font gagner',
      ar: 'ما توفره الردود الأولى التلقائية',
    },
    label: {
      de: 'Anfragen pro Woche in Ihrem Büro',
      en: 'Inquiries per week at your brokerage',
      fr: 'Demandes par semaine dans votre agence',
      ar: 'الاستفسارات أسبوعيًا في مكتبكم',
    },
    result: {
      de: 'geschätzte Stunden pro Monat',
      en: 'estimated hours per month',
      fr: 'heures estimées par mois',
      ar: 'ساعات مقدَّرة شهريًا',
    },
    assumption: {
      de: 'Annahme: ø 6 Minuten pro Anfrage für Erstantwort, Qualifizierung und Terminabstimmung — eine grobe Schätzung, kein Versprechen.',
      en: 'Assumption: ~6 minutes per inquiry for first reply, qualification and scheduling — a rough estimate, not a promise.',
      fr: 'Hypothèse : ~6 minutes par demande pour la première réponse, la qualification et la planification — une estimation approximative, pas une promesse.',
      ar: 'افتراض: نحو 6 دقائق لكل استفسار للرد الأول والتأهيل وتنسيق الموعد — تقدير تقريبي وليس وعدًا.',
    },
  };
  const c = (k: string) => C[k][language] ?? C[k].en;

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
              {c('headline')}
            </h2>
          </Reveal>

          <Reveal direction="scale" className="mt-10 rounded-2xl border border-charcoal/10 bg-cream p-6 md:p-10 shadow-subtle">
            <div className="flex items-baseline justify-between gap-4">
              <label htmlFor="roi-slider" className="text-sm font-medium text-charcoal text-start">
                {c('label')}
              </label>
              <span
                className="font-metric text-lg font-bold text-charcoal"
                style={{ fontVariantNumeric: 'tabular-nums' }}
              >
                {perWeek}
              </span>
            </div>
            <input
              id="roi-slider"
              type="range"
              min={5}
              max={150}
              step={5}
              value={perWeek}
              onChange={(e) => setPerWeek(Number(e.target.value))}
              className="mt-3 w-full accent-golden"
            />
            <p
              className="mt-8 font-metric text-5xl md:text-6xl font-bold text-golden-dark"
              style={{ fontVariantNumeric: 'tabular-nums' }}
            >
              ≈ {hours} h
            </p>
            <p className="mt-2 text-sm font-medium text-charcoal">{c('result')}</p>
            <p className="mt-6 text-xs text-warm-gray max-w-md mx-auto">{c('assumption')}</p>
          </Reveal>
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
  const items = [
    ...asFaqArray(t('pricingPage.faq.items')),
    ...asFaqArray(t('betaProgram.faq.items')),
  ];
  return (
    <section className="py-20 md:py-24 bg-cream">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance text-center">
              {asString(t('pricingPage.faq.headline'))}
            </h2>
          </Reveal>
          <Reveal delay={100} className="mt-10 rounded-2xl bg-white border border-charcoal/10 px-6">
            {items.map((it, i) => (
              <FAQItem key={i} q={it.q} a={it.a} />
            ))}
          </Reveal>
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
          <Reveal>
            <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
              {asString(t('pricingPage.finalCta.headline'))}
            </h2>
          </Reveal>
          <Reveal delay={100} as="p" className="mt-6 text-body-lg text-slate">
            {asString(t('pricingPage.finalCta.body'))}
          </Reveal>
          <Reveal delay={150} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              {...DEMO_CTA_PROPS}
              onClick={() => trackEvent('pricing_final_primary_cta_click')}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-golden text-[#1E1B16] px-7 py-3.5 font-semibold shadow-golden hover:opacity-95 transition-opacity"
            >
              {asString(t('pricingPage.finalCta.primaryCta'))}
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              to="#beta"
              className="inline-flex items-center gap-2 rounded-full border border-charcoal/20 bg-cream px-6 py-3 font-medium text-charcoal hover:bg-charcoal/5 transition-colors"
            >
              {asString(t('pricingPage.finalCta.secondaryCta'))}
            </Link>
            <button
              type="button"
              {...DEMO_CTA_PROPS}
              onClick={() => trackEvent('pricing_final_tertiary_cta_click')}
              className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 bg-white px-6 py-3 font-medium text-charcoal hover:border-charcoal/40 transition-colors"
            >
              {asString(t('pricingPage.finalCta.tertiaryCta'))}
            </button>
          </Reveal>

          <p className="mt-6 text-sm text-slate">
            <span className="text-warm-gray">
              {asString(t('pricingPage.finalCta.linksLabel'))}
            </span>{' '}
            <Link
              to={localPath('produkt')}
              onClick={() => trackEvent('pricing_final_product_link_click')}
              className="font-medium text-golden-dark underline underline-offset-2 hover:text-charcoal"
            >
              {asString(t('pricingPage.finalCta.linkProduct'))}
            </Link>
            {' · '}
            <Link
              to={`${localPath('contact')}?intent=demo`}
              onClick={() => trackEvent('pricing_final_demo_link_click')}
              className="font-medium text-golden-dark underline underline-offset-2 hover:text-charcoal"
            >
              {asString(t('pricingPage.finalCta.linkDemo'))}
            </Link>
          </p>
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
  useFaqSchema(
    [...asFaqArray(t('pricingPage.faq.items')), ...asFaqArray(t('betaProgram.faq.items'))],
    language,
    'pricing',
  );
  useJsonLd(
    [
      productSchema(language, asString(t('pricingPage.meta.description')), [
        {
          name: asString(t('pricingPage.cards.beta.label')),
          price: '0',
          description: asString(t('pricingPage.cards.beta.subtext')),
        },
        {
          name: asString(t('pricingPage.cards.team.label')),
          price: '249',
          description: asString(t('pricingPage.cards.team.subtext')),
        },
      ]),
      breadcrumbSchema([
        { name: asString(t('nav.home')), path: pathFor('home', language) },
        {
          name: asString(t('pricingPage.nav')),
          path: pathFor('pricing', language),
        },
      ]),
    ],
    'pricing',
  );

  const sections: Array<() => ReactNode> = [
    Hero,
    PricingCards,
    BetaProgram,
    QuickComparison,
    RoiEstimator,
    Trust,
    FAQ,
    FinalCTA,
  ];

  // Every section carries its own inner Reveals now — render bare.
  return (
    <div className="min-h-screen antialiased bg-white">
      <Header />
      <main className="relative">
        {sections.map((Section, i) => (
          <Section key={i} />
        ))}
      </main>
      <Footer />
    </div>
  );
}
