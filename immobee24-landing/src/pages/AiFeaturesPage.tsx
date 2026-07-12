// AI Features platform page — /de/ki-funktionen + /en/ai-features-platform
//
// Content sources (draft/ai-refinement):
//   - Investor pitch deck slides 3–4 (7 AI co-workers, headline metrics)
//   - immob24_India_v2 demo video content script (feature order + on-screen
//     details; chapter times mirror DemoVideoPlayer)
// Copy is inline DE/EN (SEO-page pattern) — translations.ts untouched.

import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  CheckCircle2,
  FileText,
  KanbanSquare,
  Link2,
  MessageSquareText,
  Megaphone,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header, Footer, DEMO_CTA_PROPS } from '../components/SiteChrome';
import { DemoVideoPlayer } from '../components/DemoVideoPlayer';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { useJsonLd } from '../lib/useJsonLd';
import { breadcrumbSchema } from '../lib/schema';
import { useLanguage } from '../i18n';
import { SITE_ORIGIN, pathFor, urlFor } from '../i18n/pages';

type Feature = {
  icon: LucideIcon;
  title: { de: string; en: string };
  lead: { de: string; en: string };
  points: { de: string[]; en: string[] };
};

const FEATURES: Feature[] = [
  {
    icon: FileText,
    title: { de: 'PDF → KI-Exposé in 30 Sekunden', en: 'PDF to AI listing in 30 seconds' },
    lead: {
      de: 'Exposé-PDF hochladen — die KI extrahiert Daten, zählt Räume und Wohnfläche und erstellt ein veröffentlichungsfertiges Inserat.',
      en: 'Drop an exposé PDF — the AI extracts the data, counts rooms and living space, and produces a publish-ready listing.',
    },
    points: {
      de: [
        'Extraktion → Anreicherung → Review in einer Pipeline',
        'Texte, Details und Formatierung — komplett generiert',
        'Als Entwurf speichern oder direkt veröffentlichen',
      ],
      en: [
        'Extract → enrich → review in one pipeline',
        'Copy, details and formatting — fully generated',
        'Save as draft or publish straight away',
      ],
    },
  },
  {
    icon: Sparkles,
    title: { de: 'KI-Objektanreicherung', en: 'AI property enrichment' },
    lead: {
      de: 'Jedes Objekt bekommt automatisch Markt- und Lage-Intelligenz — von Nachbarschaftsdaten bis Preissimulation.',
      en: 'Every property is automatically enriched with market and locality intelligence — from neighborhood data to price simulation.',
    },
    points: {
      de: [
        'Lage-Intelligenz: Schulen, Parks, ÖPNV, Ladeinfrastruktur — automatisch erfasst',
        'KI-Beschreibung, Medien-Analyse, Zielgruppen-Profil',
        'Preis-Intelligenz und Preissimulation je Objekt',
      ],
      en: [
        'Locality intelligence: schools, parks, transit, EV charging — auto-collected',
        'AI description, media intelligence, target-audience profile',
        'Price intelligence and price simulation per property',
      ],
    },
  },
  {
    icon: Link2,
    title: { de: 'Smartes B-Link Objekt-Sharing', en: 'Smart B-Link property sharing' },
    lead: {
      de: 'Ein Käufer-Link pro Objekt — mit integrierter KI, die Fragen sofort beantwortet und Interessenten aktiv begleitet.',
      en: 'One buyer link per property — with built-in AI that answers questions instantly and proactively engages visitors.',
    },
    points: {
      de: [
        'Q&A- oder Proaktiv-Modus, QR-Code, WhatsApp- und E-Mail-Sharing',
        'Link-Statistiken: Aufrufe, Chat-Sessions, Rückruf-Anfragen',
        'Interessenten stellen Fragen direkt am Exposé',
      ],
      en: [
        'Q&A or proactive mode, QR code, WhatsApp and email sharing',
        'Link stats: views, chat sessions, call requests',
        'Buyers ask questions right on the listing',
      ],
    },
  },
  {
    icon: MessageSquareText,
    title: { de: '24/7 mehrsprachiger KI-Assistent', en: '24/7 multilingual AI assistant' },
    lead: {
      de: 'Bee beantwortet Anfragen rund um die Uhr — im Chat und sogar im Sprachanruf, in der Sprache des Interessenten.',
      en: 'Bee answers inquiries around the clock — in chat and even on voice calls, in the buyer’s language.',
    },
    points: {
      de: [
        'Antwortet in 3 Sekunden, 24/7 — kein Lead geht verloren',
        'Qualifiziert Interessenten und erfasst Kontaktdaten im Gespräch',
        'Chat und Live-Sprachanruf mit KI-Agentin',
      ],
      en: [
        'Responds in 3 seconds, 24/7 — no lead goes cold',
        'Qualifies buyers and captures contact details in conversation',
        'Chat plus live voice calls with the AI agent',
      ],
    },
  },
  {
    icon: UserCheck,
    title: { de: 'KI-Chat mit menschlicher Kontrolle', en: 'AI chat with human control' },
    lead: {
      de: 'Volle Transparenz im Posteingang: Die KI antwortet — Sie übernehmen jederzeit mit einem Klick.',
      en: 'Full transparency in the inbox: the AI responds — you take over any conversation with one click.',
    },
    points: {
      de: [
        '„Take over / Release" — nahtloser Wechsel zwischen KI und Mensch',
        'Lead-Scoring: HOT / WARM / COLD auf einen Blick',
        'Jede KI-Aktion sichtbar und nachvollziehbar',
      ],
      en: [
        '“Take over / release” — seamless hand-off between AI and human',
        'Lead scoring: HOT / WARM / COLD at a glance',
        'Every AI action visible and traceable',
      ],
    },
  },
  {
    icon: KanbanSquare,
    title: { de: 'Smarte Deal-Pipeline', en: 'Smart deal pipeline' },
    lead: {
      de: 'Vom ersten Kontakt bis zum Notartermin: Pipeline-Wert, gewichtete Prognose und Stillstands-Warnungen — bevor Deals kalt werden.',
      en: 'From first contact to closing: pipeline value, weighted forecast and stall-risk alerts — before deals go cold.',
    },
    points: {
      de: [
        'Kanban über alle Phasen — von „Neu" bis „Gewonnen"',
        'Wahrscheinlichkeit, Tage in Phase und At-Risk-Ansicht je Deal',
        'Proaktive Warnungen, bevor ein Deal ins Stocken gerät',
      ],
      en: [
        'Kanban across every stage — from new to won',
        'Probability, days-in-stage and an at-risk view per deal',
        'Proactive alerts before a deal stalls',
      ],
    },
  },
  {
    icon: Megaphone,
    title: { de: 'KI-Marketing-Kampagnen', en: 'AI marketing campaigns' },
    lead: {
      de: 'Die KI erstellt Anzeigen, Zielgruppen und Budgets — und erklärt im Reasoning-Tab jede Entscheidung. Freigabe bleibt bei Ihnen.',
      en: 'The AI builds ads, audiences and budgets — and explains every decision in its reasoning tab. Approval stays with you.',
    },
    points: {
      de: [
        'Meta-Kampagnen mit KI-generierten Creatives (Video + Carousel)',
        '„Pending Approval" — keine Kampagne startet ohne Freigabe',
        'Reasoning: Zielgruppe, Budget-Pacing und Varianten transparent begründet',
      ],
      en: [
        'Meta campaigns with AI-generated creatives (video + carousel)',
        '“Pending approval” — no campaign launches without sign-off',
        'Reasoning: audience, budget pacing and variants transparently justified',
      ],
    },
  },
];

const COWORKERS: Array<{ de: string; en: string }> = [
  { de: 'Lead-Responder', en: 'Lead Responder' },
  { de: 'Conversation-Agent', en: 'Conversation Agent' },
  { de: 'Viewing-Booker', en: 'Viewing Booker' },
  { de: 'Listing-Creator', en: 'Listing Creator' },
  { de: 'Deal-Monitor', en: 'Deal Monitor' },
  { de: 'Daily-Brief-Agent', en: 'Daily Brief Agent' },
  { de: 'Compliance-Guard', en: 'Compliance Guard' },
];

export default function AiFeaturesPage() {
  const { language } = useLanguage();
  const isDe = language === 'de';
  useDocumentMeta({
    title: isDe
      ? 'KI-Funktionen — 7 KI-Co-Worker für Immobilienmakler | Immob24'
      : 'AI Features — 7 AI co-workers for real estate agents | Immob24',
    description: isDe
      ? 'PDF zu Exposé in 30 Sekunden, 24/7 KI-Assistent, Lead-Scoring, Deal-Pipeline und KI-Marketing — 7 KI-Co-Worker mit voller menschlicher Kontrolle.'
      : 'PDF to listing in 30 seconds, 24/7 AI assistant, lead scoring, deal pipeline and AI marketing — 7 AI co-workers with full human control.',
    canonical: `${SITE_ORIGIN}${pathFor('aiFeatures', language)}`,
    alternates: [
      { hreflang: 'de', href: urlFor('aiFeatures', 'de') },
      { hreflang: 'en', href: urlFor('aiFeatures', 'en') },
      { hreflang: 'x-default', href: urlFor('aiFeatures', 'de') },
    ],
    htmlLang: language,
  });
  useJsonLd(
    [
      breadcrumbSchema([
        { name: isDe ? 'Start' : 'Home', path: pathFor('home', language) },
        { name: isDe ? 'KI-Funktionen' : 'AI Features', path: pathFor('aiFeatures', language) },
      ]),
    ],
    'ai-features',
  );

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      {/* Hero */}
      <section className="relative pt-36 pb-14 md:pt-44 md:pb-20 overflow-hidden bg-gradient-to-b from-cream to-white">
        <div
          aria-hidden
          className="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-gradient-golden opacity-20 blur-3xl"
        />
        <div className="container relative text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-golden/30 bg-white px-4 py-1.5 text-xs font-medium text-golden-dark shadow-subtle">
            <Bot className="h-3.5 w-3.5" />
            {isDe ? 'Die KI-Plattform' : 'The AI platform'}
          </span>
          <h1 className="mt-6 font-heading text-hero-mobile md:text-hero text-charcoal text-balance">
            {isDe
              ? 'Jeder Makler bekommt 7 KI-Co-Worker'
              : 'Every agent gets 7 AI co-workers'}
          </h1>
          <p className="mt-6 text-body-lg text-slate max-w-2xl mx-auto">
            {isDe
              ? 'Sieben spezialisierte KI-Agenten übernehmen die operative Arbeit — vom Lead bis zum Abschluss. Sie behalten die volle Kontrolle und geben jede Aktion frei.'
              : 'Seven specialised AI agents handle the operational load — from lead to close. You keep full visibility and approve every action.'}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {COWORKERS.map((c) => (
              <span
                key={c.en}
                className="rounded-full bg-white border border-charcoal/10 px-3.5 py-1.5 text-sm text-charcoal shadow-subtle"
              >
                {isDe ? c.de : c.en}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Demo video with chapters */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container">
          <div className="max-w-2xl">
            <h2 className="font-heading text-section-mobile md:text-section text-charcoal">
              {isDe ? 'Der Workflow — live im Video' : 'Watch the workflow live'}
            </h2>
            <p className="mt-3 text-slate">
              {isDe
                ? 'Alle sieben Funktionen in 10 Minuten — direkt aus dem Produkt. Kapitel anklicken, um zu einer Funktion zu springen.'
                : 'All seven features in 10 minutes — straight from the product. Click a chapter to jump to a feature.'}
            </p>
          </div>
          <div className="mt-8">
            <DemoVideoPlayer />
          </div>
        </div>
      </section>

      {/* The 7 features */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-2xl">
            <h2 className="font-heading text-section-mobile md:text-section text-charcoal">
              {isDe ? 'Sieben Funktionen, ein System' : 'Seven features, one system'}
            </h2>
            <p className="mt-3 text-slate">
              {isDe
                ? 'Ein verbundenes System statt Insellösungen — kein Tool-Wechsel, keine Integrations-Kopfschmerzen.'
                : 'One connected system instead of point solutions — no tool switching, no integration headaches.'}
            </p>
          </div>

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {FEATURES.map((f, i) => (
              <article
                key={f.title.en}
                className="rounded-2xl bg-white border border-charcoal/5 shadow-card p-7"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-golden/10 text-golden-dark">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <span className="font-metric text-sm text-warm-gray">0{i + 1}</span>
                </div>
                <h3 className="mt-4 font-heading text-subhead text-charcoal">
                  {isDe ? f.title.de : f.title.en}
                </h3>
                <p className="mt-2 text-slate">{isDe ? f.lead.de : f.lead.en}</p>
                <ul className="mt-4 space-y-2">
                  {(isDe ? f.points.de : f.points.en).map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-sm text-slate">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 flex-none text-honey-green" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance cross-link */}
      <section className="py-14 bg-charcoal text-white">
        <div className="container grid md:grid-cols-[1fr,auto] items-center gap-8">
          <div>
            <div className="flex items-center gap-2 text-golden">
              <ShieldCheck className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-wide">
                {isDe ? 'DSGVO · EU AI Act' : 'GDPR · EU AI Act'}
              </span>
            </div>
            <h2 className="mt-3 font-heading text-2xl md:text-3xl">
              {isDe
                ? 'KI mit Kontrolle: konform durch Architektur, nicht nachgerüstet'
                : 'AI with control: compliant by architecture, not retrofitted'}
            </h2>
            <p className="mt-3 text-white/70 max-w-2xl">
              {isDe
                ? 'Jede KI-Aktion ist sichtbar, freigabepflichtig und protokolliert. KI-Chat und KI-Inhalte sind als solche gekennzeichnet.'
                : 'Every AI action is visible, approval-gated and logged. AI chat and AI-generated content are labelled as such.'}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to={pathFor('compliance', language)}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-medium hover:bg-white/10 transition-colors"
            >
              <BadgeCheck className="h-4 w-4" />
              {isDe ? 'Compliance ansehen' : 'See compliance'}
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
