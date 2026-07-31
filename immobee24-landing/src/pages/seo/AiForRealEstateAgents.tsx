// SEO landing page (EN hub): AI for real-estate agents
// Spec source: docs/SEO_OPTIMIZATION_STRATEGY (Part 2, Page 3)
//
// English counterpart to KiFuerImmobilienmakler.tsx — flagship
// informational page, Article schema, longest content. Bracketed `[…]`
// strings are placeholders for verifiable stats.

import {
  ArrowRight,
  Bot,
  Brain,
  CalendarClock,
  ChevronRight,
  MailCheck,
  Sparkles,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header, Footer, DEMO_CTA_PROPS } from '../../components/SiteChrome';
import { cascadeDelay, chorSlot, Reveal, RevealGroup } from '../../lib/animations';
import { trackEvent } from '../../lib/analytics';
import { useDocumentMeta } from '../../lib/useDocumentMeta';
import { useFaqSchema } from '../../lib/useFaqSchema';
import { useJsonLd } from '../../lib/useJsonLd';
import { breadcrumbSchema } from '../../lib/schema';
import { SITE_ORIGIN } from '../../i18n/pages';

const PAGE_PATH = '/en/ai-for-real-estate-agents';
const PAGE_URL = `${SITE_ORIGIN}${PAGE_PATH}`;
const DE_URL = `${SITE_ORIGIN}/de/ki-fuer-immobilienmakler`;

const FAQS: Array<{ q: string; a: string }> = [
  {
    q: 'Does AI replace the real-estate agent?',
    a: 'No. AI does not replace what actually makes you valuable as an agent — trust, local market knowledge, negotiation skill, personal advice. It replaces the time-consuming repetitive work around it: first response, standard qualifying questions, scheduling, follow-up. The result: you invest your time where it has the highest value.',
  },
  {
    q: 'What AI tools for real-estate agents exist in 2026?',
    a: 'The market splits roughly into four groups: (1) AI writing assistants for exposés, (2) valuation models for property prices, (3) image generation and virtual staging, (4) conversational and workflow AI for lead response and qualification. Immob24 belongs to the fourth group and deliberately focuses on the operational stretch between inquiry and viewing.',
  },
  {
    q: 'How much does AI real-estate software cost?',
    a: 'The price range is wide: individual AI writing helpers start at a few euros per month, while full conversational and workflow platforms sit between about €100 and €600 per month per brokerage. Immob24 starts at €249 per month. The decisive factor is not the list price but how many hours per week the tool actually saves and how many additional mandates result from it.',
  },
  {
    q: 'Can I use AI without technical expertise?',
    a: 'Yes. Modern AI tools for brokers are built to work without an IT department. Immob24 is configured in an onboarding session — you connect your portals and inboxes, supply examples of typical inquiries, and the AI is live. No code, no multi-day training.',
  },
  {
    q: 'Is AI suitable for small brokerages?',
    a: 'Small brokerages benefit disproportionately. A one- to three-person office cannot run a 24/7 lead hotline of its own — the AI fills exactly that role. When the owner is at a viewing, someone still answers. Weekend and after-hours inquiries are reliably handled.',
  },
  {
    q: 'What data does the AI need to work for real-estate agents?',
    a: 'At its core: your current listings (exposé text, location, price, availability), your usual qualifying questions, and your calendar for scheduling logic. No sensitive existing-customer data or contracts are required for the AI to handle first response and qualification.',
  },
  {
    q: 'How secure is my data with AI real-estate software?',
    a: 'For Immob24, data is processed in the EU and standard data-processing agreements (AVV) are in place. Inquiries and conversations are used exclusively to operate the platform and are not used to train external models. Details and our GDPR documentation are available on request.',
  },
  {
    q: 'Can AI help with property valuation?',
    a: 'Yes, but that is a separate category of tool (AVM — Automated Valuation Model). Specialised valuation platforms produce indicative prices based on location, build type, and comparable properties. Immob24 focuses on conversational and workflow AI; a connection to valuation APIs is possible but not the core focus.',
  },
];

const TOC = [
  { id: 'what-ai-does', label: 'What AI actually does for agents' },
  { id: 'time-sinks', label: 'The 5 biggest time sinks — and how AI solves them' },
  { id: 'positioning', label: 'Immob24: the AI execution layer' },
  { id: 'cities', label: 'AI for agents in your city' },
  { id: 'faq', label: 'Frequently asked questions' },
];

const Hero = () => (
  <section
    id="top"
    className="relative pt-36 pb-16 md:pt-44 md:pb-20 overflow-hidden bg-gradient-to-b from-cream to-white"
  >
    <div className="container max-w-4xl">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1 text-xs text-slate">
        <Link to="/en" className="hover:text-charcoal">Home</Link>
        <ChevronRight className="h-3 w-3 text-warm-gray" />
        <span className="text-charcoal">AI for real-estate agents</span>
      </nav>

      <p className="inline-flex items-center gap-2 rounded-full bg-golden/10 px-3 py-1 text-xs font-semibold text-golden-dark">
        <Sparkles className="h-3.5 w-3.5" /> Guide — about 8 min read
      </p>

      <h1 className="chor mt-5 font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal leading-tight" style={chorSlot(0)}>
        AI for real-estate agents: how to use artificial intelligence in your brokerage
      </h1>

      <p className="mt-5 text-lg text-slate leading-relaxed">
        AI has arrived in the broker's day-to-day — but not everywhere the
        marketing noise suggests. This guide describes soberly what AI
        actually does for real-estate agents in 2026, which five tasks can
        be reliably automated, and how a modern brokerage uses AI as an
        execution layer between inquiry and close — without losing the
        personal character of the broker profession.
      </p>

      <div className="mt-8 rounded-2xl border border-charcoal/10 bg-white px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-warm-gray">
          Table of contents
        </p>
        <ul className="mt-3 space-y-1.5 text-sm">
          {TOC.map((t) => (
            <li key={t.id}>
              <a
                href={`#${t.id}`}
                className="text-charcoal hover:text-golden-dark underline-offset-4 hover:underline"
              >
                {t.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

const Overview = () => (
  <section id="what-ai-does" className="py-16 bg-white">
    <div className="container max-w-3xl">
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal">
        What AI actually does for real-estate agents
      </h2>
      <p className="mt-5 text-slate leading-relaxed">
        Up front, one clarification: AI does not replace a real-estate
        agent. Trust, local market knowledge, kitchen-table negotiation —
        that stays human. What AI reliably handles today is the
        time-consuming operational stretch around it: <strong>first
        response to new inquiries, polite qualifying dialogues, scheduling,
        and follow-up</strong>. According to internal estimates, these
        tasks cost the average brokerage{' '}
        <strong>many hours per week per team member</strong> — hours that
        do not flow into consultations or signed contracts.
      </p>
      <p className="mt-4 text-slate leading-relaxed">
        The interesting question for 2026 is therefore not "should I use
        AI?" but "<em>where</em> do I use it so it actually changes my
        day?". The rest of this guide answers that question along five
        concrete time sinks in the broker workflow.
      </p>

      <div className="mt-8 rounded-2xl bg-cream/60 border border-charcoal/5 px-5 py-4 text-sm text-slate">
        <p className="font-semibold text-charcoal">In short</p>
        <ul className="mt-2 space-y-1 list-disc pl-5">
          <li>AI replaces first response, qualification, and scheduling — not the agent.</li>
          <li>The biggest wins come from speed and consistency, not creativity.</li>
          <li>Small brokerages (1–5 people) benefit disproportionately.</li>
          <li>Data protection, GDPR compliance, and EU hosting are 2026 essentials, not bonuses.</li>
        </ul>
      </div>
    </div>
  </section>
);

const PainPoints = () => (
  <section id="time-sinks" className="py-16 bg-cream">
    <div className="container max-w-3xl">
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal">
        The 5 biggest time sinks in the broker workflow — and how AI solves them
      </h2>
      <p className="mt-5 text-slate leading-relaxed">
        Each of the following five areas returns several hours per week on
        average — at relatively low implementation effort.
      </p>

      {[
        {
          icon: Zap,
          n: 1,
          title: 'Instant response to new inquiries',
          painPoint:
            'A portal inquiry arrives at 9:47 pm. The typical response time for an average brokerage is 4–24 hours. In that window, the prospect has often already contacted two or three other agents.',
          beforeAfter:
            'Before: 4–24 hours to first reply, lead moves on. After AI: response in under 3 seconds — the prospect is in a conversation before they open the next listing.',
        },
        {
          icon: Brain,
          n: 2,
          title: 'Automatic lead qualification',
          painPoint:
            'Out of ten new inquiries, only two or three are genuinely buying-ready. Telling them apart — budget, financing, timeline, owner-occupation vs. investment — costs 10–20 minutes per lead by phone.',
          beforeAfter:
            'Before: every lead is manually qualified, even the unready ones. After: the AI runs a polite short dialogue and clearly marks which leads go into scheduling.',
        },
        {
          icon: CalendarClock,
          n: 3,
          title: 'AI-driven scheduling without manual back-and-forth',
          painPoint:
            'Typical scheduling takes 4–7 emails: "Wednesday 2 pm?" — "How about 4 pm?" — "Better Thursday" — and so on.',
          beforeAfter:
            'Before: hours per week in inbox ping-pong. After: the AI proposes two or three suitable slots reconciled with your calendar — the prospect picks one and it is done.',
        },
        {
          icon: MailCheck,
          n: 4,
          title: 'Follow-up automation for more closes',
          painPoint:
            'Statistically, around 80% of mandates close only after the fifth contact — but the average brokerage follows up only twice. The rest gets forgotten or skipped because there is no time.',
          beforeAfter:
            'Before: the lead goes to sleep after viewing #1. After: the AI follows up automatically and politely — tuned to the current phase, without being pushy.',
        },
        {
          icon: TrendingUp,
          n: 5,
          title: 'Reporting & prioritisation',
          painPoint:
            'Which portals deliver the best leads? Which team members close the most viewings? Where do we lose the most inquiries? Without a system, it stays gut feel.',
          beforeAfter:
            'Before: no reliable numbers, no optimisation. After: the AI logs response times, conversion rates, and lead sources — weekly reporting at a glance.',
        },
      ].map((p) => (
        <div
          key={p.n}
          id={`step-${p.n}`}
          className="mt-10 rounded-2xl bg-white border border-charcoal/10 px-6 py-6 shadow-subtle"
        >
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-golden/15 p-2 text-golden-dark">
              <p.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-warm-gray">
                Time sink {p.n}
              </p>
              <h3 className="font-heading text-xl font-bold text-charcoal mt-1">
                {p.title}
              </h3>
            </div>
          </div>
          <p className="mt-4 text-slate leading-relaxed">
            <strong className="text-charcoal">Problem:</strong> {p.painPoint}
          </p>
          <p className="mt-3 text-slate leading-relaxed">
            <strong className="text-charcoal">Before / After:</strong>{' '}
            {p.beforeAfter}
          </p>
        </div>
      ))}

    </div>
  </section>
);

const Positioning = () => (
  <section id="positioning" className="py-16 bg-white">
    <div className="container max-w-3xl">
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal">
        Immob24: the AI execution layer for brokers
      </h2>
      <p className="mt-5 text-slate leading-relaxed">
        Looking at the broker software market, one thing stands out: lots
        of <em>databases</em>. Classic real-estate CRMs are passive stores —
        you enter what has already happened. Immob24 is explicitly different:
        it is the <strong>active execution layer</strong> between inquiry
        and close. Where a CRM documents, Immob24 <em>does</em> something —
        replies, qualifies, schedules, follows up.
      </p>
      <p className="mt-4 text-slate leading-relaxed">
        In practice that means: Immob24 does not replace your CRM. It
        complements it. Master data stays where it is. The AI takes on the
        operational stretch that today runs manually — and returns the
        genuinely qualified viewings to you.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          {...DEMO_CTA_PROPS}
          onClick={() => trackEvent('seo_hub_cta_click', { position: 'positioning-en' })}
          className="inline-flex items-center justify-center gap-2 rounded-full band-dark bg-charcoal text-white px-6 py-3 text-base font-semibold hover:bg-charcoal/90 transition-colors"
        >
          Request a demo
          <ArrowRight className="h-4 w-4" />
        </button>
        <Link
          to="/en/real-estate-crm-alternative"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-charcoal/15 px-6 py-3 text-base font-medium text-charcoal hover:bg-cream transition-colors"
        >
          Why not a classic CRM?
        </Link>
      </div>
    </div>
  </section>
);

const CityLinks = () => (
  <section id="cities" className="py-16 bg-cream">
    <div className="container max-w-3xl">
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal">
        AI for agents in your city
      </h2>
      <p className="mt-4 text-slate leading-relaxed">
        How AI plays out in practice depends on the local market. See our
        city pages for the specifics:
      </p>
      <RevealGroup className="mt-6 grid sm:grid-cols-2 gap-3">
        {[
          {
            title: 'AI real-estate agent software in Munich',
            body: 'A highly competitive market, high prices, inquiries to several agents at once.',
            path: '/en/real-estate-agent-software/munich',
          },
          {
            title: 'AI real-estate agent software in Berlin',
            body: 'Capital-city pace, international buyer base, bilingual inquiries.',
            path: '/en/real-estate-agent-software/berlin',
          },
          {
            title: 'AI real-estate agent software in Hamburg',
            body: 'The HafenCity effect, high inquiry quality in top locations, well-informed prospects.',
            path: '/en/real-estate-agent-software/hamburg',
          },
          {
            title: 'CRM alternative for real-estate agents',
            body: 'Comparison: Immob24 vs. onOffice, FLOWFACT, Propstack.',
            path: '/en/real-estate-crm-alternative',
          },
        ].map((c) => (
          <Link
            key={c.path}
            to={c.path}
            className="rounded-2xl bg-white border border-charcoal/10 px-5 py-5 hover:border-charcoal/30 transition-colors"
          >
            <p className="font-semibold text-charcoal">{c.title}</p>
            <p className="mt-2 text-sm text-slate leading-relaxed">{c.body}</p>
            <p className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-golden-dark">
              Read <ArrowRight className="h-3 w-3" />
            </p>
          </Link>
        ))}
      </RevealGroup>
    </div>
  </section>
);

const Faq = () => (
  <section id="faq" className="py-16 bg-white">
    <div className="container max-w-3xl">
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal">
        Frequently asked questions about AI for real-estate agents
      </h2>
      <div className="mt-8 divide-y divide-charcoal/10">
        {FAQS.map((item, i) => (
          <Reveal key={item.q} delay={cascadeDelay(i, 280)} distance={16}>
          <details className="group py-5">
            <summary className="flex cursor-pointer items-start justify-between gap-4 list-none">
              <span className="font-semibold text-charcoal">{item.q}</span>
              <ChevronRight className="h-4 w-4 text-warm-gray mt-1 transition-transform group-open:rotate-90" />
            </summary>
            <p className="mt-3 text-slate leading-relaxed">{item.a}</p>
          </details>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const FinalCta = () => (
  <section className="py-20 band-dark bg-charcoal text-white">
    <div className="container max-w-3xl text-center">
      <Bot className="h-10 w-10 text-golden mx-auto" />
      <h2 className="mt-4 font-heading text-3xl md:text-4xl font-bold text-white">
        Ready to test AI in your brokerage?
      </h2>
      <p className="mt-5 text-white/75 leading-relaxed">
        See in a short demo how Immob24 addresses the five time sinks in
        your specific brokerage. No long sales pitch, no contract — just a
        clear view of what can be automated.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <button
          type="button"
          {...DEMO_CTA_PROPS}
          onClick={() => trackEvent('seo_hub_cta_click', { position: 'final-en' })}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-golden text-[#1E1B16] px-6 py-3 text-base font-semibold hover:bg-golden/90 transition-colors"
        >
          Request a demo
          <ArrowRight className="h-4 w-4" />
        </button>
        <Link
          to="/en/pricing"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-base font-medium text-white hover:bg-white/5 transition-colors"
        >
          See pricing
        </Link>
      </div>
    </div>
  </section>
);

export default function AiForRealEstateAgents() {
  useDocumentMeta({
    title: 'AI for real-estate agents 2026 | Guide & tools | Immob24',
    description:
      'AI for real-estate agents: how artificial intelligence automates lead response, qualification & follow-up — five time sinks, concrete fixes, practical examples.',
    canonical: PAGE_URL,
    htmlLang: 'en',
    alternates: [
      { hreflang: 'de', href: DE_URL },
      { hreflang: 'en', href: PAGE_URL },
      { hreflang: 'x-default', href: DE_URL },
    ],
  });

  useJsonLd(
    [
      breadcrumbSchema([
        { name: 'Home', path: '/en' },
        { name: 'AI for real-estate agents', path: PAGE_PATH },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline:
          'AI for real-estate agents: how to use artificial intelligence in your brokerage',
        description:
          'A guide to AI for real-estate agents with practical examples, five concrete time sinks, and solutions.',
        inLanguage: 'en',
        about: {
          '@type': 'Thing',
          name: 'Artificial intelligence for real-estate agents',
        },
        author: { '@type': 'Organization', name: 'Immob24' },
        publisher: {
          '@type': 'Organization',
          name: 'Immob24',
          logo: { '@type': 'ImageObject', url: `${SITE_ORIGIN}/immob24-wordmark.png` },
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
      },
    ],
    'ai-for-real-estate-agents',
  );

  useFaqSchema(FAQS, 'en', 'ai-for-real-estate-agents');

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Reveal>
        <Overview />
      </Reveal>
      <Reveal>
        <PainPoints />
      </Reveal>
      <Reveal>
        <Positioning />
      </Reveal>
      <Reveal>
        <CityLinks />
      </Reveal>
      <Faq />
      <Reveal>
        <FinalCta />
      </Reveal>
      <Footer />
    </div>
  );
}
