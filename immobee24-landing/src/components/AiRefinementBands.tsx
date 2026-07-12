// Additive content bands for the draft/ai-refinement pass. These are inserted
// into existing pages (Home, Product, CRM-Alternative, Pricing) WITHOUT
// altering any existing section, form, CTA wiring or chatbot behaviour.
// Sources: pitch deck slides 3/5/6 + the demo-video content script.

import { ArrowRight, Bot, PlayCircle, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n';
import { pathFor } from '../i18n/pages';

const COWORKERS: Array<{ de: string; en: string }> = [
  { de: 'Lead-Responder', en: 'Lead Responder' },
  { de: 'Conversation-Agent', en: 'Conversation Agent' },
  { de: 'Viewing-Booker', en: 'Viewing Booker' },
  { de: 'Listing-Creator', en: 'Listing Creator' },
  { de: 'Deal-Monitor', en: 'Deal Monitor' },
  { de: 'Daily-Brief-Agent', en: 'Daily Brief Agent' },
  { de: 'Compliance-Guard', en: 'Compliance Guard' },
];

// Home: "7 AI co-workers" band + video teaser linking to the AI features page.
export const SevenCoWorkersBand = () => {
  const { language } = useLanguage();
  const isDe = language === 'de';
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-golden/30 bg-cream px-4 py-1.5 text-xs font-medium text-golden-dark shadow-subtle">
              <Bot className="h-3.5 w-3.5" />
              {isDe ? 'Neu: Die KI-Plattform im Detail' : 'New: the AI platform in detail'}
            </span>
            <h2 className="mt-5 font-heading text-section-mobile md:text-section text-charcoal">
              {isDe
                ? 'Jeder Makler bekommt 7 KI-Co-Worker'
                : 'Every agent gets 7 AI co-workers'}
            </h2>
            <p className="mt-4 text-slate max-w-xl">
              {isDe
                ? 'Sieben spezialisierte KI-Agenten übernehmen die operative Arbeit — vom Lead bis zum Abschluss. Volle Sichtbarkeit und Freigabe bei jeder Aktion.'
                : 'Seven specialised AI agents handle the operational load — from lead to close. Full visibility and approval on every action.'}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {COWORKERS.map((c) => (
                <span
                  key={c.en}
                  className="rounded-full bg-cream border border-charcoal/10 px-3 py-1 text-xs text-charcoal"
                >
                  {isDe ? c.de : c.en}
                </span>
              ))}
            </div>
            <Link
              to={pathFor('aiFeatures', language)}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-golden px-5 py-2.5 text-sm font-semibold text-charcoal shadow-golden"
            >
              {isDe ? 'Alle KI-Funktionen ansehen' : 'Explore all AI features'}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <Link
            to={pathFor('aiFeatures', language)}
            className="group relative block rounded-2xl overflow-hidden shadow-card"
            aria-label={isDe ? 'Produkt-Demo ansehen' : 'Watch the product demo'}
          >
            <img
              src="/videos/demo-poster.jpg"
              alt={isDe ? 'Immob24 Produkt-Demo' : 'immob24 product demo'}
              width={1280}
              height={720}
              className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              loading="lazy"
            />
            <span className="absolute inset-0 bg-charcoal/25 group-hover:bg-charcoal/15 transition-colors" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-golden shadow-golden transition-transform group-hover:scale-105">
                <PlayCircle className="h-8 w-8 text-white" />
              </span>
            </span>
            <span className="absolute bottom-3 left-3 rounded-full bg-charcoal/80 px-3 py-1 text-xs font-medium text-white">
              10:15 · {isDe ? 'Der Workflow live' : 'Watch the workflow live'}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

// Compact trust strip: GDPR / EU AI Act / human oversight — links to /compliance.
export const ComplianceBadgesStrip = () => {
  const { language } = useLanguage();
  const isDe = language === 'de';
  const items: Array<{ de: string; en: string }> = [
    { de: 'DSGVO by Design', en: 'GDPR by design' },
    { de: 'EU AI Act ready', en: 'EU AI Act ready' },
    { de: 'Mensch behält Kontrolle', en: 'Human stays in control' },
    { de: 'Audit-Trail eingebaut', en: 'Audit trail built in' },
  ];
  return (
    <section className="py-8 bg-charcoal">
      <div className="container flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        {items.map((i) => (
          <span key={i.en} className="inline-flex items-center gap-2 text-sm text-white/80">
            <ShieldCheck className="h-4 w-4 text-golden" />
            {isDe ? i.de : i.en}
          </span>
        ))}
        <Link
          to={pathFor('compliance', language)}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-golden hover:text-golden-light transition-colors"
        >
          {isDe ? 'Compliance im Detail' : 'Compliance in detail'}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
};

// CRM-Alternative / Product: teaser row linking to the full comparison page.
export const WhyImmob24Teaser = () => {
  const { language } = useLanguage();
  const isDe = language === 'de';
  return (
    <section className="py-14 bg-cream">
      <div className="container">
        <div className="rounded-2xl border border-golden/25 bg-white shadow-card p-8 md:p-10 grid md:grid-cols-[1fr,auto] items-center gap-6">
          <div>
            <h2 className="font-heading text-2xl md:text-3xl text-charcoal">
              {isDe
                ? 'Ein Team, kein Tool: Warum Immob24 anders gebaut ist'
                : 'A team, not a tool: why immob24 is built differently'}
            </h2>
            <p className="mt-3 text-slate max-w-2xl">
              {isDe
                ? 'Voller Deal-Lebenszyklus statt Punktlösungen, produktisierte Workflows statt Prompts — und Compliance durch Architektur statt Nachrüstung.'
                : 'Full deal lifecycle instead of point solutions, productized workflows instead of prompts — and compliance by architecture, not retrofit.'}
            </p>
          </div>
          <Link
            to={pathFor('whyImmob24', language)}
            className="inline-flex items-center gap-2 rounded-full bg-charcoal text-white px-6 py-3 text-sm font-medium hover:bg-charcoal/90 transition-colors whitespace-nowrap"
          >
            {isDe ? 'Der Vergleich' : 'See the comparison'}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
