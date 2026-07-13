import { useState, type ReactNode } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Database,
  Scale,
  Workflow,
  XCircle,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header, Footer, DEMO_CTA_PROPS } from '../components/SiteChrome';
import { chorSlot, Reveal, RevealGroup, TypeOnce } from '../lib/animations';
import { ScrollCue } from '../components/Wayfinding';
import { WhyImmob24Teaser } from '../components/AiRefinementBands';
import { trackEvent } from '../lib/analytics';
import { usePageMeta } from '../lib/usePageMeta';
import { useFaqSchema } from '../lib/useFaqSchema';
import { useJsonLd } from '../lib/useJsonLd';
import { breadcrumbSchema, softwareApplicationSchema } from '../lib/schema';
import { useLocalizedPath } from '../lib/useLocalizedPath';
import { useLanguage } from '../i18n';
import { pathFor } from '../i18n/pages';

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

const Hero = () => {
  const { t } = useLanguage();
  const localPath = useLocalizedPath();
  const bullets = asStringArray(t('crmAltPage.hero.bullets'));
  return (
    <section
      id="top"
      className="relative pt-24 pb-20 md:pt-28 md:pb-24 overflow-hidden bg-gradient-to-b from-cream to-white"
    >
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-gradient-golden opacity-20 blur-3xl"
      />
      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center">

          <h1 className="chor mt-6 font-heading text-hero-mobile md:text-hero text-charcoal text-balance" style={chorSlot(0)}>
            <TypeOnce text={asString(t('crmAltPage.hero.headline'))} />
          </h1>

          <p className="chor mt-6 text-body-lg text-slate max-w-2xl mx-auto" style={chorSlot(280, 500)}>
            {asString(t('crmAltPage.hero.subheadline'))}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              {...DEMO_CTA_PROPS}
              onClick={() => trackEvent('crmalt_hero_primary_cta_click')}
              className="chor inline-flex items-center gap-2 rounded-full band-dark bg-charcoal text-white px-6 py-3 font-medium shadow-golden hover:bg-charcoal/90 transition-colors" style={chorSlot(420, 450)}
            >
              {asString(t('crmAltPage.hero.primaryCta'))}
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              to={localPath('produkt')}
              className="chor inline-flex items-center gap-2 rounded-full border border-charcoal/15 bg-white px-6 py-3 font-medium text-charcoal hover:border-charcoal/40 transition-colors" style={chorSlot(500, 450)}
            >
              {asString(t('crmAltPage.hero.secondaryCta'))}
            </Link>
          </div>

          {bullets.length > 0 && (
            <ul className="mt-10 flex flex-wrap items-center justify-center gap-3 max-w-2xl mx-auto">
              {bullets.map((b, i) => (
                <li
                  key={i}
                  className="inline-flex items-center gap-2 rounded-full bg-white border border-charcoal/10 px-4 py-2 text-sm text-charcoal/80 shadow-subtle"
                >
                  <CheckCircle2 className="h-4 w-4 text-golden flex-none" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}

          <ScrollCue targetId="framing" className="mt-10" />
        </div>
      </div>
    </section>
  );
};

const Framing = () => {
  const { t } = useLanguage();
  return (
    <section id="framing" className="py-20 md:py-24 bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal as="h2" className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('crmAltPage.framing.headline'))}
          </Reveal>
          <Reveal as="p" delay={100} className="mt-6 text-body-lg text-slate">
            {asString(t('crmAltPage.framing.body'))}
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const ComparisonTable = () => {
  const { t } = useLanguage();
  const headers = asStringArray(t('crmAltPage.table.headers'));
  const rows = asStringMatrix(t('crmAltPage.table.rows'));
  return (
    <section id="comparison" className="py-20 md:py-24 bg-cream">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal as="h2" className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('crmAltPage.table.headline'))}
          </Reveal>
        </div>

        <div className="mt-12 max-w-5xl mx-auto">
          {/* Desktop / tablet table */}
          <Reveal direction="scale" className="hidden md:block overflow-hidden rounded-2xl border border-charcoal/10 bg-white shadow-card">
            <table className="w-full text-left">
              <thead className="band-dark bg-charcoal text-white">
                <tr>
                  {headers.map((h, i) => (
                    <th
                      key={i}
                      className={`p-5 font-heading text-sm uppercase tracking-wider ${
                        i === 2 ? 'text-golden' : ''
                      }`}
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
                    {row.map((cell, cIdx) => (
                      <td
                        key={cIdx}
                        className={`p-5 align-top ${
                          cIdx === 0
                            ? 'font-heading text-charcoal w-1/4'
                            : cIdx === 2
                              ? 'text-charcoal/90 bg-golden/5'
                              : 'text-slate'
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          {/* Mobile stacked cards */}
          <RevealGroup className="md:hidden grid gap-4">
            {rows.map((row, rIdx) => (
              <div
                key={rIdx}
                className="rounded-2xl border border-charcoal/10 bg-white p-5 shadow-subtle"
              >
                <p className="font-heading text-charcoal">{row[0]}</p>
                <div className="mt-4 grid gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-warm-gray">
                      {headers[1]}
                    </p>
                    <p className="mt-1 text-sm text-slate">{row[1]}</p>
                  </div>
                  <div className="rounded-xl bg-golden/5 border border-golden/20 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-golden-dark">
                      {headers[2]}
                    </p>
                    <p className="mt-1 text-sm text-charcoal/90">{row[2]}</p>
                  </div>
                </div>
              </div>
            ))}
          </RevealGroup>

          <Reveal as="p" delay={100} className="mt-8 text-center text-sm text-warm-gray italic">
            {asString(t('crmAltPage.table.caption'))}
          </Reveal>

          <Reveal delay={150} className="mt-10 flex justify-center">
            <button
              type="button"
              {...DEMO_CTA_PROPS}
              onClick={() => trackEvent('crmalt_table_cta_click')}
              className="inline-flex items-center gap-2 rounded-full band-dark bg-charcoal text-white px-6 py-3 font-medium shadow-golden hover:bg-charcoal/90 transition-colors"
            >
              {asString(t('crmAltPage.hero.primaryCta'))}
              <ArrowRight className="h-4 w-4" />
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const Competitors = () => {
  const { t } = useLanguage();
  const items = asStringMatrix(t('crmAltPage.competitors.items'));
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal as="h2" className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('crmAltPage.competitors.headline'))}
          </Reveal>
          <Reveal as="p" delay={100} className="mt-6 text-body-lg text-slate">
            {asString(t('crmAltPage.competitors.intro'))}
          </Reveal>
        </div>

        <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {items.map((it, i) => (
            <div
              key={i}
              className="h-full rounded-2xl border border-charcoal/10 bg-cream p-6 shadow-subtle"
            >
              <h3 className="font-heading text-xl text-charcoal">{it[0]}</h3>
              <p className="mt-3 text-slate leading-relaxed">{it[1]}</p>
            </div>
          ))}
        </RevealGroup>

        <Reveal as="p" delay={100} className="mt-10 text-center text-slate max-w-2xl mx-auto">
          {asString(t('crmAltPage.competitors.note'))}
        </Reveal>
      </div>
    </section>
  );
};

const WhenCrm = () => {
  const { t } = useLanguage();
  const bullets = asStringArray(t('crmAltPage.whenCrm.bullets'));
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="container">
        <Reveal className="max-w-3xl mx-auto text-center">
          <Database className="h-8 w-8 text-charcoal/60 mx-auto" />
          <h2 className="mt-4 font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('crmAltPage.whenCrm.headline'))}
          </h2>
        </Reveal>
        <ul className="mt-10 grid gap-4 max-w-3xl mx-auto">
          {bullets.map((b, i) => (
            <Reveal
              as="li"
              key={i}
              delay={i * 80}
              className="flex items-start gap-3 rounded-xl bg-cream border border-charcoal/10 px-5 py-4"
            >
              <CheckCircle2 className="h-5 w-5 text-charcoal/60 mt-0.5 flex-none" />
              <span className="text-charcoal/85">{b}</span>
            </Reveal>
          ))}
        </ul>
        <Reveal as="p" delay={100} className="mt-10 text-center text-slate max-w-2xl mx-auto">
          {asString(t('crmAltPage.whenCrm.support'))}
        </Reveal>
      </div>
    </section>
  );
};

const WhenImmob = () => {
  const { t } = useLanguage();
  const bullets = asStringArray(t('crmAltPage.whenImmob.bullets'));
  return (
    <section className="py-20 md:py-24 bg-cream">
      <div className="container">
        <Reveal className="max-w-3xl mx-auto text-center">
          <Zap className="h-8 w-8 text-golden mx-auto" />
          <h2 className="mt-4 font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('crmAltPage.whenImmob.headline'))}
          </h2>
        </Reveal>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 max-w-4xl mx-auto">
          {bullets.map((b, i) => (
            <Reveal
              as="li"
              key={i}
              delay={i * 80}
              className="flex items-start gap-3 rounded-xl bg-white border border-charcoal/10 px-5 py-4"
            >
              <CheckCircle2 className="h-5 w-5 text-golden mt-0.5 flex-none" />
              <span className="text-charcoal/85">{b}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
};

const Fit = () => {
  const { t } = useLanguage();
  const bestFor = asStringArray(t('crmAltPage.fit.bestFor'));
  const notFor = asStringArray(t('crmAltPage.fit.notFor'));
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal as="h2" className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('crmAltPage.fit.headline'))}
          </Reveal>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          <Reveal direction="left" className="rounded-2xl bg-cream border border-charcoal/10 p-6">
            <div className="flex items-center gap-2 text-golden-dark">
              <CheckCircle2 className="h-5 w-5" />
              <h3 className="font-heading text-lg">
                {asString(t('crmAltPage.fit.bestForLabel'))}
              </h3>
            </div>
            <ul className="mt-4 space-y-3">
              {bestFor.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-charcoal/85">
                  <CheckCircle2 className="h-4 w-4 text-golden mt-1 flex-none" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal direction="right" className="rounded-2xl bg-white border border-charcoal/10 p-6">
            <div className="flex items-center gap-2 text-charcoal/60">
              <XCircle className="h-5 w-5" />
              <h3 className="font-heading text-lg">
                {asString(t('crmAltPage.fit.notForLabel'))}
              </h3>
            </div>
            <ul className="mt-4 space-y-3">
              {notFor.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-charcoal/70">
                  <XCircle className="h-4 w-4 text-charcoal/40 mt-1 flex-none" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
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

const Objections = () => {
  const { t } = useLanguage();
  const items = asFaqArray(t('crmAltPage.objections.items'));
  return (
    <section className="py-20 md:py-24 bg-cream">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <Reveal as="h2" className="font-heading text-section-mobile md:text-section text-charcoal text-balance text-center">
            {asString(t('crmAltPage.objections.headline'))}
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

const FAQ = () => {
  const { t } = useLanguage();
  const items = asFaqArray(t('crmAltPage.faq.items'));
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <Reveal as="h2" className="font-heading text-section-mobile md:text-section text-charcoal text-balance text-center">
            {asString(t('crmAltPage.faq.headline'))}
          </Reveal>
          <Reveal delay={100} className="mt-10 rounded-2xl bg-cream border border-charcoal/10 px-6">
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
          <Workflow className="h-10 w-10 text-golden mx-auto" />
          <h2 className="mt-4 font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('crmAltPage.finalCta.headline'))}
          </h2>
          <p className="mt-6 text-body-lg text-slate">
            {asString(t('crmAltPage.finalCta.body'))}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              {...DEMO_CTA_PROPS}
              onClick={() => trackEvent('crmalt_final_cta_click')}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-golden text-white px-7 py-3.5 font-semibold shadow-golden hover:opacity-95 transition-opacity"
            >
              {asString(t('crmAltPage.finalCta.primaryCta'))}
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              to={localPath('produkt')}
              className="inline-flex items-center gap-2 rounded-full border border-charcoal/20 bg-cream px-6 py-3 font-medium text-charcoal hover:bg-charcoal/5 transition-colors"
            >
              {asString(t('crmAltPage.finalCta.secondaryCta'))}
            </Link>
          </div>

          <p className="mt-6 text-sm text-slate">
            <span className="text-warm-gray">
              {asString(t('crmAltPage.finalCta.linksLabel'))}
            </span>{' '}
            <Link
              to={localPath('pricing')}
              onClick={() => trackEvent('crmalt_final_pricing_link_click')}
              className="font-medium text-golden-dark underline underline-offset-2 hover:text-charcoal"
            >
              {asString(t('crmAltPage.finalCta.linkPricing'))}
            </Link>
            {' · '}
            <Link
              to={`${localPath('contact')}?intent=demo`}
              onClick={() => trackEvent('crmalt_final_demo_link_click')}
              className="font-medium text-golden-dark underline underline-offset-2 hover:text-charcoal"
            >
              {asString(t('crmAltPage.finalCta.linkDemo'))}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

// Cross-links to the city/topic landing pages so equity flows between the
// CRM comparison cluster and the geo SEO cluster. Renders the matching
// language set so EN visitors get EN links and DE visitors get DE links.
const RelatedSeo = () => {
  const { language } = useLanguage();
  const isDe = language === 'de';
  const heading = isDe ? 'Auch interessant' : 'Also interesting';
  const cta = isDe ? 'Lesen' : 'Read';
  const items = isDe
    ? [
        {
          label: 'KI für Immobilienmakler — Übersicht',
          desc: 'Ratgeber zu KI im Makleralltag.',
          path: '/de/ki-fuer-immobilienmakler',
        },
        {
          label: 'Maklersoftware München',
          desc: 'KI-Maklersoftware für den Münchner Markt.',
          path: '/de/maklersoftware/muenchen',
        },
        {
          label: 'Maklersoftware Berlin',
          desc: 'KI-Maklersoftware für den Berliner Markt.',
          path: '/de/maklersoftware/berlin',
        },
        {
          label: 'Maklersoftware Hamburg',
          desc: 'KI-Maklersoftware für den Hamburger Markt.',
          path: '/de/maklersoftware/hamburg',
        },
      ]
    : [
        {
          label: 'AI for real-estate agents — overview',
          desc: 'Guide to AI in the broker workflow.',
          path: '/en/ai-for-real-estate-agents',
        },
        {
          label: 'Real-estate agent software for Munich',
          desc: 'AI real-estate agent software for the Munich market.',
          path: '/en/real-estate-agent-software/munich',
        },
        {
          label: 'Real-estate agent software for Berlin',
          desc: 'AI real-estate agent software for the Berlin market.',
          path: '/en/real-estate-agent-software/berlin',
        },
        {
          label: 'Real-estate agent software for Hamburg',
          desc: 'AI real-estate agent software for the Hamburg market.',
          path: '/en/real-estate-agent-software/hamburg',
        },
      ];
  return (
    <section className="py-16 bg-cream">
      <div className="container max-w-4xl">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal">
          {heading}
        </h2>
        <div className="mt-6 grid sm:grid-cols-2 gap-3">
          {items.map((it) => (
            <Link
              key={it.path}
              to={it.path}
              className="rounded-2xl bg-white border border-charcoal/10 px-5 py-5 hover:border-charcoal/30 transition-colors"
            >
              <p className="font-semibold text-charcoal">{it.label}</p>
              <p className="mt-2 text-sm text-slate leading-relaxed">{it.desc}</p>
              <p className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-golden-dark">
                {cta} <ArrowRight className="h-3 w-3" />
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function CrmAlternativeDE() {
  const { t, language } = useLanguage();

  usePageMeta({
    pageKey: 'crmAlternative',
    titleKey: 'crmAltPage.meta.title',
    descriptionKey: 'crmAltPage.meta.description',
  });
  useFaqSchema(asFaqArray(t('crmAltPage.faq.items')), language, 'crm-alt');
  useJsonLd(
    [
      breadcrumbSchema([
        { name: asString(t('nav.home')), path: pathFor('home', language) },
        {
          name: asString(t('crmAltPage.nav')),
          path: pathFor('crmAlternative', language),
        },
      ]),
      // SoftwareApplication schema reinforces the "alternative to onOffice /
      // FLOWFACT / Propstack" intent of the page for search engines.
      softwareApplicationSchema(
        language,
        asString(t('crmAltPage.meta.description')),
        [
          'KI-gestützte Lead-Reaktion in Sekunden',
          'Automatische Lead-Qualifizierung',
          'Terminlogik mit Kalenderabgleich',
          'Follow-up-Automatisierung',
          'Ergänzung zu bestehenden CRMs (onOffice, FLOWFACT, Propstack)',
        ],
      ),
    ],
    'crm-alt',
  );

  const sections: Array<() => ReactNode> = [
    Hero,
    Framing,
    ComparisonTable,
    Competitors,
    // AI-refinement (draft/ai-refinement): teaser linking to /warum-immob24
    WhyImmob24Teaser,
    WhenCrm,
    WhenImmob,
    Fit,
    Objections,
    FAQ,
    RelatedSeo,
    FinalCTA,
  ];

  // Sections with their own inner Reveals render bare; the rest get a
  // coarse section-level Reveal (same pattern as ProduktDE).
  const selfAnimated = new Set<unknown>([
    Hero,
    Framing,
    ComparisonTable,
    Competitors,
    WhenCrm,
    WhenImmob,
    Fit,
    Objections,
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