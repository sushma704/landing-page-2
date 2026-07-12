// Why immob24 page — /de/warum-immob24 + /en/why-immob24
//
// Content sources (draft/ai-refinement): pitch deck slide 2 (the problem),
// slide 5 ("Why immob24 Wins" comparison), slide 7 (market / Germany-first).
// Copy inline DE/EN — translations.ts untouched.

import {
  ArrowRight,
  Check,
  Globe2,
  Layers,
  Map,
  ShieldCheck,
  Users,
  Workflow,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header, Footer, DEMO_CTA_PROPS } from '../components/SiteChrome';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { useJsonLd } from '../lib/useJsonLd';
import { breadcrumbSchema } from '../lib/schema';
import { useLanguage } from '../i18n';
import { SITE_ORIGIN, pathFor, urlFor } from '../i18n/pages';

// Deck slide 2 — where the day goes.
const PROBLEMS: Array<{ title: { de: string; en: string }; body: { de: string; en: string } }> = [
  {
    title: { de: 'Langsame Lead-Reaktion', en: 'Slow lead response' },
    body: {
      de: 'Heiße Leads kühlen in Minuten ab — Makler antworten in Stunden.',
      en: 'Hot leads go cold in minutes — agents respond in hours.',
    },
  },
  {
    title: { de: 'Manuelle Exposé-Erstellung', en: 'Manual listing creation' },
    body: {
      de: 'Stunden für Texte, Fotos und Formatierung — pro Objekt.',
      en: 'Hours on copy, photos and formatting — per property.',
    },
  },
  {
    title: { de: 'Follow-ups rutschen durch', en: 'Deal follow-ups slip' },
    body: {
      de: 'Kein systematisches Tracking — Umsatz geht in den Lücken verloren.',
      en: 'No systematic tracking — revenue lost to the cracks.',
    },
  },
  {
    title: { de: 'Admin frisst den Tag', en: 'Admin overload' },
    body: {
      de: 'Terminplanung, Dokumente, Reporting — der Arbeitstag verschwindet.',
      en: 'Scheduling, docs, reporting — the workday disappears.',
    },
  },
];

// Deck slide 5 — immob24 vs the market, row by row.
const COMPARISON: Array<{
  dim: { de: string; en: string };
  immob: { de: string; en: string };
  market: { de: string; en: string };
}> = [
  {
    dim: { de: 'Ansatz', en: 'Approach' },
    immob: {
      de: 'Ein Team, kein Tool — 7 KI-Agenten teilen Kontext und übergeben Arbeit über den ganzen Deal-Lebenszyklus.',
      en: 'A team, not a tool — 7 AI agents share context and hand off work across the full deal lifecycle.',
    },
    market: {
      de: 'Einzel-Automatisierungen: ein Tool für Chat, eins für Exposés, eins für Termine. Kein gemeinsamer Kontext.',
      en: 'Single-task automation: one tool for chat, another for listings, another for scheduling. No shared context.',
    },
  },
  {
    dim: { de: 'Abdeckung', en: 'Coverage' },
    immob: {
      de: 'Voller Lebenszyklus: Lead → Gespräch → Besichtigung → Exposé → Deal-Monitor → Daily Brief.',
      en: 'Full lifecycle: lead → conversation → viewing → listing → deal monitor → daily brief.',
    },
    market: {
      de: 'Punktlösungen: nur Lead-Erfassung, nur Exposés oder nur Terminplanung. Fragmentierte Workflows.',
      en: 'Point solutions: just lead capture, or just listings, or just scheduling. Fragmented workflows.',
    },
  },
  {
    dim: { de: 'Bedienung', en: 'Operation' },
    immob: {
      de: 'Produktisiert statt Roh-KI: klare Workflows mit sichtbaren Ergebnissen. Makler schreiben keine Prompts.',
      en: 'Productized, not raw AI: clear workflows with visible outcomes. Agents never touch raw AI.',
    },
    market: {
      de: 'Prompts und Chatbots: Makler müssen Prompt-Engineering lernen. Inkonsistente Ergebnisse.',
      en: 'Prompts and chatbots: agents must learn prompt engineering. Inconsistent results.',
    },
  },
  {
    dim: { de: 'Compliance', en: 'Compliance' },
    immob: {
      de: 'Konform durch Architektur — von Grund auf für DSGVO und EU AI Act gebaut.',
      en: 'Compliant by architecture — built from scratch for GDPR and the EU AI Act.',
    },
    market: {
      de: 'Nachgerüstete Compliance: US-Tools flanschen Datenschutz später an. Riskant für europäische Büros.',
      en: 'Retrofit compliance: US-built tools patch privacy on later. Risky for European agencies.',
    },
  },
  {
    dim: { de: 'Sprachen', en: 'Languages' },
    immob: {
      de: 'Mehrsprachig nativ: DE · FR · EN · AR — von Tag eins.',
      en: 'Multilingual native: DE · FR · EN · AR — from day one.',
    },
    market: {
      de: '„Lokalisierung später" — wenn überhaupt.',
      en: 'Localize later — if ever.',
    },
  },
];

export default function WhyImmob24Page() {
  const { language } = useLanguage();
  const isDe = language === 'de';
  useDocumentMeta({
    title: isDe
      ? 'Warum Immob24 — Das KI-Betriebssystem für Immobilien | Immob24'
      : 'Why immob24 — The AI operating system for real estate | Immob24',
    description: isDe
      ? '7 KI-Agenten statt Einzel-Tools, voller Deal-Lebenszyklus, konform durch Architektur: Warum Immob24 anders gebaut ist als der Markt.'
      : '7 AI agents instead of point tools, full deal lifecycle, compliant by architecture: why immob24 is built differently from the market.',
    canonical: `${SITE_ORIGIN}${pathFor('whyImmob24', language)}`,
    alternates: [
      { hreflang: 'de', href: urlFor('whyImmob24', 'de') },
      { hreflang: 'en', href: urlFor('whyImmob24', 'en') },
      { hreflang: 'x-default', href: urlFor('whyImmob24', 'de') },
    ],
    htmlLang: language,
  });
  useJsonLd(
    [
      breadcrumbSchema([
        { name: isDe ? 'Start' : 'Home', path: pathFor('home', language) },
        { name: isDe ? 'Warum Immob24' : 'Why immob24', path: pathFor('whyImmob24', language) },
      ]),
    ],
    'why-immob24',
  );

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      {/* Hero */}
      <section className="relative pt-36 pb-14 md:pt-44 md:pb-20 overflow-hidden bg-gradient-to-b from-cream to-white">
        <div
          aria-hidden
          className="absolute -top-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-gradient-golden opacity-20 blur-3xl"
        />
        <div className="container relative text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-golden/30 bg-white px-4 py-1.5 text-xs font-medium text-golden-dark shadow-subtle">
            <Layers className="h-3.5 w-3.5" />
            {isDe ? 'Das KI-Betriebssystem für Immobilien' : 'The AI operating system for real estate'}
          </span>
          <h1 className="mt-6 font-heading text-hero-mobile md:text-hero text-charcoal text-balance">
            {isDe ? 'Warum Immob24?' : 'Why immob24?'}
          </h1>
          <p className="mt-6 text-body-lg text-slate max-w-2xl mx-auto">
            {isDe
              ? 'Makler verlieren 60–70 % ihres Tages an operative Arbeit — und die meisten KI-Tools ignorieren die europäische Regulierung. Immob24 löst beides.'
              : 'Agents lose 60–70% of their day to ops — and most AI tools ignore European regulation. Immob24 solves both.'}
          </p>
        </div>
      </section>

      {/* The problem */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h2 className="font-heading text-section-mobile md:text-section text-charcoal max-w-xl">
              {isDe ? 'Wo der Tag wirklich hingeht' : 'Where the day actually goes'}
            </h2>
            <div className="text-right">
              <div className="font-metric text-metric-mobile md:text-metric text-golden-dark">60–70%</div>
              <div className="text-sm text-warm-gray">
                {isDe ? 'des Maklertags geht an Ops verloren' : 'of the agent day lost to ops'}
              </div>
            </div>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROBLEMS.map((p) => (
              <article key={p.title.en} className="rounded-2xl border border-charcoal/5 bg-cream/60 p-6">
                <h3 className="font-heading text-lg text-charcoal">{isDe ? p.title.de : p.title.en}</h3>
                <p className="mt-2 text-sm text-slate">{isDe ? p.body.de : p.body.en}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 text-slate max-w-2xl">
            {isDe
              ? 'Europäische Maklerbüros brauchen KI, die innerhalb ihrer regulatorischen Realität arbeitet — nicht dagegen.'
              : 'European agencies need AI that works within their regulatory reality — not against it.'}
          </p>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal max-w-2xl">
            {isDe ? 'Immob24 vs. der Markt' : 'immob24 vs. the market'}
          </h2>
          <div className="mt-10 overflow-x-auto rounded-2xl border border-charcoal/5 bg-white shadow-card">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-charcoal/10">
                  <th className="px-5 py-4 w-32" />
                  <th className="px-5 py-4">
                    <span className="inline-flex items-center gap-2 font-heading text-base text-charcoal">
                      <span className="h-2.5 w-2.5 rounded-full bg-golden" /> immob24
                    </span>
                  </th>
                  <th className="px-5 py-4">
                    <span className="font-heading text-base text-warm-gray">
                      {isDe ? 'Der Markt' : 'The market'}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.dim.en} className="border-b border-charcoal/5 last:border-none align-top">
                    <td className="px-5 py-5 text-xs font-semibold uppercase tracking-wide text-warm-gray whitespace-nowrap">
                      {isDe ? row.dim.de : row.dim.en}
                    </td>
                    <td className="px-5 py-5">
                      <div className="flex items-start gap-2 text-charcoal">
                        <Check className="h-4 w-4 mt-0.5 flex-none text-honey-green" />
                        {isDe ? row.immob.de : row.immob.en}
                      </div>
                    </td>
                    <td className="px-5 py-5">
                      <div className="flex items-start gap-2 text-slate">
                        <X className="h-4 w-4 mt-0.5 flex-none text-warm-gray" />
                        {isDe ? row.market.de : row.market.en}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to={pathFor('aiFeatures', language)}
              className="inline-flex items-center gap-2 rounded-full bg-white border border-charcoal/10 px-5 py-2.5 text-sm font-medium text-charcoal shadow-subtle hover:border-golden/40 transition-colors"
            >
              <Workflow className="h-4 w-4 text-golden-dark" />
              {isDe ? 'Die 7 KI-Funktionen ansehen' : 'See the 7 AI features'}
            </Link>
            <Link
              to={pathFor('compliance', language)}
              className="inline-flex items-center gap-2 rounded-full bg-white border border-charcoal/10 px-5 py-2.5 text-sm font-medium text-charcoal shadow-subtle hover:border-golden/40 transition-colors"
            >
              <ShieldCheck className="h-4 w-4 text-golden-dark" />
              {isDe ? 'Compliance im Detail' : 'Compliance in detail'}
            </Link>
          </div>
        </div>
      </section>

      {/* Market / Germany-first */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-heading text-section-mobile md:text-section text-charcoal">
              {isDe ? 'Deutschland zuerst — mit Absicht' : 'Germany first — on purpose'}
            </h2>
            <p className="mt-4 text-slate">
              {isDe
                ? 'Deutschland ist Europas compliance-sensibelster Markt und größte Volkswirtschaft. Das härteste Regulierungsumfeld ist unser Burggraben: Wer hier besteht, skaliert überall.'
                : 'Germany is Europe’s most compliance-sensitive market and its largest economy. The hardest regulatory environment is our moat: what works here scales everywhere.'}
            </p>
            <ul className="mt-6 space-y-3">
              {[
                {
                  icon: Map,
                  de: 'Go-to-Market: Deutschland → Frankreich → Dubai',
                  en: 'Go-to-market: Germany → France → Dubai',
                },
                {
                  icon: Globe2,
                  de: 'Gleiche Compliance-Schicht, gleiche Mehrsprachigkeit — von Tag eins in der Architektur',
                  en: 'Same compliance layer, same multilingual engine — architected from day one',
                },
                {
                  icon: Users,
                  de: 'Gebaut von einem Team aus Europas größten Immobilienplattformen',
                  en: 'Built by a team from inside Europe’s largest real-estate platforms',
                },
              ].map((item) => (
                <li key={item.en} className="flex items-start gap-3 text-slate">
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-golden/10 text-golden-dark">
                    <item.icon className="h-4 w-4" />
                  </span>
                  {isDe ? item.de : item.en}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-charcoal text-white p-8 md:p-10">
            <div className="font-metric text-5xl md:text-6xl text-golden">€12B+</div>
            <p className="mt-2 text-white/80">
              {isDe
                ? 'jährlicher Provisionsmarkt im europäischen Immobiliengeschäft — fragmentiert und reif für KI'
                : 'annual commission market in European real estate — fragmented and ripe for AI'}
            </p>
            <div className="mt-8 h-px bg-white/10" />
            <p className="mt-6 text-sm text-white/60">
              {isDe
                ? 'Pre-Launch · Closed Beta mit 10–20 deutschen Maklern als erste Kohorte'
                : 'Pre-launch · closed beta targeting 10–20 German agents as the first cohort'}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container text-center max-w-2xl mx-auto">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal">
            {isDe ? 'Konforme KI für europäische Immobilien' : 'Compliant AI for European real estate'}
          </h2>
          <p className="mt-3 text-slate">
            {isDe
              ? 'Sichern Sie sich frühen Zugang — oder sehen Sie die Plattform live in einer Demo.'
              : 'Get early access — or see the platform live in a demo.'}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              {...DEMO_CTA_PROPS}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-golden px-6 py-3 text-sm font-semibold text-charcoal shadow-golden"
            >
              {isDe ? 'Demo anfragen' : 'Request a demo'}
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              to={pathFor('beta', language)}
              className="inline-flex items-center gap-2 rounded-full bg-white border border-charcoal/10 px-6 py-3 text-sm font-medium text-charcoal shadow-subtle hover:border-golden/40 transition-colors"
            >
              {isDe ? 'Zum Beta-Programm' : 'Join the beta program'}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
