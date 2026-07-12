// Compliance page — /de/compliance + /en/compliance
//
// Content sources (draft/ai-refinement):
//   - Pitch deck slide 6 (five compliance pillars)
//   - Notion "German & EU Compliance Reference — IMMOB24" catalogue
//
// IMPORTANT (claims accuracy): only laws the catalogue marks
// "Implemented & verified in code" are featured here. Items the catalogue
// flags as partial/gap (e.g. GwG/KYC, Art. 28 DPA files) are deliberately
// NOT claimed. Language is "by design / built in", never "certified".

import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  Eye,
  FileCheck2,
  Fingerprint,
  Globe2,
  Landmark,
  Lock,
  ScrollText,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header, Footer, DEMO_CTA_PROPS } from '../components/SiteChrome';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { useJsonLd } from '../lib/useJsonLd';
import { breadcrumbSchema } from '../lib/schema';
import { useLanguage } from '../i18n';
import { SITE_ORIGIN, pathFor, urlFor } from '../i18n/pages';

type Pillar = {
  icon: LucideIcon;
  title: { de: string; en: string };
  body: { de: string; en: string };
};

// Deck slide 6 — the five pillars, verbatim intent.
const PILLARS: Pillar[] = [
  {
    icon: Eye,
    title: { de: 'Volle Sichtbarkeit', en: 'Full visibility' },
    body: {
      de: 'Jede KI-Aktion ist sichtbar, bevor sie passiert. Freigabe erforderlich — Übersteuerung jederzeit mit einem Klick.',
      en: 'See every AI action before it happens. Approval required — one-tap override always available.',
    },
  },
  {
    icon: ScrollText,
    title: { de: 'Auditierbar by Design', en: 'Auditable by design' },
    body: {
      de: 'Jede KI-Entscheidung ist transparent und protokolliert. Keine Blackbox — volle Nachvollziehbarkeit für Aufsicht und Makler.',
      en: 'Every AI decision is transparent and logged. No black boxes — full traceability for regulators and agents.',
    },
  },
  {
    icon: ShieldCheck,
    title: { de: 'DSGVO durch Architektur', en: 'GDPR by architecture' },
    body: {
      de: 'Datenverarbeitung, Einwilligung und Verarbeitung sind by design konform — nicht nachträglich angeflanscht.',
      en: 'Data handling, consent and processing are compliant by design — not bolted on as an afterthought.',
    },
  },
  {
    icon: Fingerprint,
    title: { de: 'EU AI Act ready', en: 'EU AI Act ready' },
    body: {
      de: 'Von Grund auf für den EU AI Act gebaut: Risikoklassifizierung, Transparenz und menschliche Aufsicht sind eingebaut.',
      en: 'Built from scratch for the EU AI Act: risk classification, transparency and human oversight built in.',
    },
  },
  {
    icon: Globe2,
    title: { de: 'Mehrsprachig nativ', en: 'Multilingual native' },
    body: {
      de: 'Deutsch, Französisch, Englisch, Arabisch — von Tag eins in der Architektur. Kein Retrofit, keine Übersetzungslücken.',
      en: 'German, French, English, Arabic — architected from day one. No retrofit, no translation gaps.',
    },
  },
];

type LawRow = {
  law: string;
  what: { de: string; en: string };
  how: { de: string; en: string };
};

// Only "Implemented & verified in code" entries from the compliance catalogue.
const GDPR_ROWS: LawRow[] = [
  {
    law: 'DSGVO Art. 5–6',
    what: { de: 'Grundsätze & Rechtsgrundlage', en: 'Principles & lawful basis' },
    how: {
      de: 'Nur notwendige Felder werden erhoben; jede Verarbeitung hat eine dokumentierte Rechtsgrundlage.',
      en: 'Only necessary fields are collected; every processing activity has a recorded lawful basis.',
    },
  },
  {
    law: 'DSGVO Art. 7',
    what: { de: 'Einwilligung & Widerruf', en: 'Consent & withdrawal' },
    how: {
      de: 'Einwilligungen werden protokolliert und sind genauso einfach widerrufbar wie erteilt.',
      en: 'Consent is recorded and can be withdrawn as easily as it was given.',
    },
  },
  {
    law: 'DSGVO Art. 22',
    what: { de: 'Keine KI-Entscheidung ohne Menschen', en: 'No AI decision without a human' },
    how: {
      de: 'Lead-Scoring und Matching haben einen vollständigen Anfrage-→ Prüfung-→ Entscheidung-Loop mit menschlicher Aufsicht und nutzerseitiger Erklärung.',
      en: 'Lead scoring and matching carry a full request → review → resolve loop with human oversight and a user-facing explanation.',
    },
  },
  {
    law: 'TTDSG §25',
    what: { de: 'Cookie-Einwilligung', en: 'Cookie consent' },
    how: {
      de: 'Tracking, Marketing und Chat laden erst nach ausdrücklicher Einwilligung — auch auf dieser Website.',
      en: 'Analytics, marketing and chat only load after explicit consent — including on this website.',
    },
  },
  {
    law: 'EU AI Act Art. 50',
    what: { de: 'KI-Transparenz', en: 'AI transparency' },
    how: {
      de: 'KI-Chat und KI-generierte Inhalte sind als solche gekennzeichnet.',
      en: 'AI chat and AI-generated content are labelled as such.',
    },
  },
];

const GERMAN_RE_ROWS: LawRow[] = [
  {
    law: 'BGB §656a–d',
    what: { de: 'Maklerprovision', en: 'Broker commission' },
    how: {
      de: 'Textform, 50/50-Teilung und Provisionslogik sind in der Plattform abgebildet.',
      en: 'Text-form requirement, 50/50 split and commission logic are modelled in the platform.',
    },
  },
  {
    law: 'GewO §34c',
    what: { de: 'Maklererlaubnis', en: 'Broker licence' },
    how: {
      de: 'Die §34c-Erlaubnis wird im Maklerprofil erfasst.',
      en: 'The §34c licence is recorded on the agent profile.',
    },
  },
  {
    law: 'GEG',
    what: { de: 'Energieausweis-Pflichtangaben', en: 'Energy-certificate disclosures' },
    how: {
      de: 'Energiefelder (Klasse, Verbrauch, Heizung) sind Pflicht auf jedem Inserat.',
      en: 'Energy fields (class, consumption, heating) are required on every listing.',
    },
  },
  {
    law: 'AGG §19',
    what: { de: 'Diskriminierungsfreie Inserate', en: 'Fair-housing listings' },
    how: {
      de: 'KI-generierte Exposé-Texte vermeiden diskriminierende Formulierungen.',
      en: 'AI-generated listing copy avoids discriminatory wording.',
    },
  },
  {
    law: 'GoBD / AO §147',
    what: { de: 'Revisionssichere Aufbewahrung', en: 'Tamper-proof retention' },
    how: {
      de: 'Verschlüsselte Belege mit 10 Jahren Aufbewahrung (S3 Object-Lock) und hash-verkettetem Audit-Log — Stornorechnung statt Löschen.',
      en: 'Encrypted records with 10-year retention (S3 Object-Lock) and a hash-chained audit log — corrective invoices, never edit or delete.',
    },
  },
  {
    law: 'UStG / PAngV / UWG',
    what: { de: 'Rechnungen, Preise, E-Mail-Marketing', en: 'Invoices, pricing, email marketing' },
    how: {
      de: '12-Punkte-Rechnungsprüfung mit VIES-USt-ID-Validierung, volle Preis- und Provisionsangabe am Inserat, One-Click-Abmeldung (RFC 8058).',
      en: '12-field invoice checks with VIES VAT-ID validation, full price and commission shown on listings, one-click unsubscribe (RFC 8058).',
    },
  },
];

const LawTable = ({ rows, isDe }: { rows: LawRow[]; isDe: boolean }) => (
  <div className="overflow-x-auto rounded-2xl border border-charcoal/5 bg-white shadow-subtle">
    <table className="w-full min-w-[640px] text-left text-sm">
      <thead>
        <tr className="border-b border-charcoal/10 text-xs uppercase tracking-wide text-warm-gray">
          <th className="px-5 py-3 font-semibold">{isDe ? 'Vorschrift' : 'Regulation'}</th>
          <th className="px-5 py-3 font-semibold">{isDe ? 'Worum es geht' : 'What it covers'}</th>
          <th className="px-5 py-3 font-semibold">{isDe ? 'So setzt Immob24 es um' : 'How immob24 implements it'}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.law} className="border-b border-charcoal/5 last:border-none align-top">
            <td className="px-5 py-4 font-metric font-semibold text-charcoal whitespace-nowrap">
              {r.law}
            </td>
            <td className="px-5 py-4 text-charcoal">{isDe ? r.what.de : r.what.en}</td>
            <td className="px-5 py-4 text-slate">{isDe ? r.how.de : r.how.en}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function CompliancePage() {
  const { language } = useLanguage();
  const isDe = language === 'de';
  useDocumentMeta({
    title: isDe
      ? 'Compliance — DSGVO & EU AI Act by Design | Immob24'
      : 'Compliance — GDPR & EU AI Act by design | Immob24',
    description: isDe
      ? 'KI für Immobilienmakler, gebaut für die europäische Regulierung: menschliche Aufsicht, Audit-Trail, Einwilligungs-Management und deutsches Maklerrecht — by design.'
      : 'AI for real estate agents built for European regulation: human oversight, audit trail, consent management and German brokerage law — by design.',
    canonical: `${SITE_ORIGIN}${pathFor('compliance', language)}`,
    alternates: [
      { hreflang: 'de', href: urlFor('compliance', 'de') },
      { hreflang: 'en', href: urlFor('compliance', 'en') },
      { hreflang: 'x-default', href: urlFor('compliance', 'de') },
    ],
    htmlLang: language,
  });
  useJsonLd(
    [
      breadcrumbSchema([
        { name: isDe ? 'Start' : 'Home', path: pathFor('home', language) },
        { name: 'Compliance', path: pathFor('compliance', language) },
      ]),
    ],
    'compliance',
  );

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      {/* Hero */}
      <section className="relative pt-36 pb-14 md:pt-44 md:pb-20 overflow-hidden bg-gradient-to-b from-cream to-white">
        <div className="container relative text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-golden/30 bg-white px-4 py-1.5 text-xs font-medium text-golden-dark shadow-subtle">
            <ShieldCheck className="h-3.5 w-3.5" />
            {isDe ? 'DSGVO · EU AI Act · Deutsches Maklerrecht' : 'GDPR · EU AI Act · German brokerage law'}
          </span>
          <h1 className="mt-6 font-heading text-hero-mobile md:text-hero text-charcoal text-balance">
            {isDe
              ? 'Konform für Europa gebaut — von Tag eins'
              : 'Built compliant for Europe — from day one'}
          </h1>
          <p className="mt-6 text-body-lg text-slate max-w-2xl mx-auto">
            {isDe
              ? 'Die meisten KI-Tools ignorieren europäische Regulierung. Immob24 ist andersherum gebaut: Das härteste Regulierungsumfeld Europas ist unsere Architektur-Vorgabe — nicht unser Nachtrag.'
              : 'Most AI tools ignore European regulation. Immob24 is built the other way round: Europe’s hardest regulatory environment is our architectural requirement — not an afterthought.'}
          </p>
        </div>
      </section>

      {/* Five pillars */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal max-w-2xl">
            {isDe ? 'Fünf Prinzipien, in die Plattform gebaut' : 'Five principles, built into the platform'}
          </h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PILLARS.map((p) => (
              <article
                key={p.title.en}
                className="rounded-2xl border border-charcoal/5 bg-cream/60 p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-golden/10 text-golden-dark">
                  <p.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-heading text-lg text-charcoal">
                  {isDe ? p.title.de : p.title.en}
                </h3>
                <p className="mt-2 text-sm text-slate">{isDe ? p.body.de : p.body.en}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* GDPR / AI Act table */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="flex items-center gap-3">
            <Lock className="h-6 w-6 text-golden-dark" />
            <h2 className="font-heading text-section-mobile md:text-section text-charcoal">
              {isDe ? 'Datenschutz & KI-Aufsicht' : 'Data protection & AI oversight'}
            </h2>
          </div>
          <p className="mt-3 max-w-2xl text-slate">
            {isDe
              ? 'Wie die Plattform zentrale DSGVO-Artikel und die KI-Transparenzpflichten umsetzt.'
              : 'How the platform implements core GDPR articles and AI-transparency duties.'}
          </p>
          <div className="mt-8">
            <LawTable rows={GDPR_ROWS} isDe={isDe} />
          </div>
        </div>
      </section>

      {/* German real-estate law table */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container">
          <div className="flex items-center gap-3">
            <Landmark className="h-6 w-6 text-golden-dark" />
            <h2 className="font-heading text-section-mobile md:text-section text-charcoal">
              {isDe ? 'Deutsches Maklerrecht — eingebaut' : 'German brokerage law — built in'}
            </h2>
          </div>
          <p className="mt-3 max-w-2xl text-slate">
            {isDe
              ? 'Vom Provisionsrecht über Energieausweis-Pflichten bis zur revisionssicheren Aufbewahrung: Die Regeln des deutschen Maklergeschäfts sind Teil der Plattform-Logik.'
              : 'From commission law and energy-certificate duties to tamper-proof retention: the rules of German brokerage are part of the platform logic.'}
          </p>
          <div className="mt-8">
            <LawTable rows={GERMAN_RE_ROWS} isDe={isDe} />
          </div>
          <p className="mt-4 text-xs text-warm-gray max-w-2xl">
            {isDe
              ? 'Hinweis: Diese Seite beschreibt Produktfunktionen und Architekturprinzipien. Sie ist keine Rechtsberatung und keine Zertifizierung.'
              : 'Note: this page describes product features and architecture principles. It is not legal advice and not a certification.'}
          </p>
        </div>
      </section>

      {/* Human-in-the-loop banner + CTA */}
      <section className="py-14 bg-charcoal text-white">
        <div className="container grid md:grid-cols-[1fr,auto] items-center gap-8">
          <div>
            <div className="flex items-center gap-2 text-golden">
              <UserCheck className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-wide">
                {isDe ? 'Der Mensch bleibt am Steuer' : 'The human stays in charge'}
              </span>
            </div>
            <h2 className="mt-3 font-heading text-2xl md:text-3xl max-w-2xl">
              {isDe
                ? 'Keine Aktion ohne Sichtbarkeit. Keine Kampagne ohne Freigabe. Kein Scoring ohne Prüfweg.'
                : 'No action without visibility. No campaign without approval. No scoring without a review path.'}
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to={pathFor('aiFeatures', language)}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-medium hover:bg-white/10 transition-colors"
            >
              <FileCheck2 className="h-4 w-4" />
              {isDe ? 'Die 7 KI-Funktionen' : 'The 7 AI features'}
            </Link>
            <button
              type="button"
              {...DEMO_CTA_PROPS}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-golden px-5 py-2.5 text-sm font-semibold text-charcoal shadow-golden"
            >
              {isDe ? 'Demo anfragen' : 'Request a demo'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
