// SEO landing page (EN): Real-estate agent software for Hamburg
// Spec source: docs/SEO_OPTIMIZATION_STRATEGY (Part 2, Page 4)
//
// English counterpart to MaklersoftwareHamburg.tsx.

import { Anchor, ArrowRight, ChevronRight, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header, Footer, DEMO_CTA_PROPS } from '../../components/SiteChrome';
import { chorSlot, Reveal, RevealGroup } from '../../lib/animations';
import { trackEvent } from '../../lib/analytics';
import { useDocumentMeta } from '../../lib/useDocumentMeta';
import { useFaqSchema } from '../../lib/useFaqSchema';
import { useJsonLd } from '../../lib/useJsonLd';
import { breadcrumbSchema } from '../../lib/schema';
import { SITE_ORIGIN } from '../../i18n/pages';

const PAGE_PATH = '/en/real-estate-agent-software/hamburg';
const PAGE_URL = `${SITE_ORIGIN}${PAGE_PATH}`;
const DE_URL = `${SITE_ORIGIN}/de/maklersoftware/hamburg`;

const FAQS: Array<{ q: string; a: string }> = [
  {
    q: 'How many real-estate brokers are there in Hamburg?',
    a: 'Hamburg is among the largest broker markets in Germany. Density is highest in Eppendorf, Winterhude, Eimsbüttel, and HafenCity — exactly where most inquiries originate.',
  },
  {
    q: 'Which Hamburg districts is Immob24 especially suitable for?',
    a: 'Immob24 works for any Hamburg brokerage regardless of district. The benefit is clearest in high-demand areas like Eppendorf, Winterhude, Eimsbüttel, Blankenese, and Ottensen, where inquiry volume and competition are highest.',
  },
  {
    q: 'Can Immob24 work with existing CRMs in Hamburg?',
    a: 'Yes. Immob24 does not replace your CRM — it complements it as an AI execution layer for first response, qualification, and follow-up. Integration with common broker systems is part of onboarding.',
  },
  {
    q: 'How much does Immob24 cost for Hamburg brokerages?',
    a: 'Immob24 starts at €249 per month. There are no Hamburg-specific surcharges. Exact packages and included features are on the pricing page.',
  },
];

const Hero = () => (
  <section
    id="top"
    className="relative pt-36 pb-20 md:pt-44 md:pb-24 overflow-hidden bg-gradient-to-b from-cream to-white"
  >
    <div className="container">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1 text-xs text-slate">
        <Link to="/en" className="hover:text-charcoal">Home</Link>
        <ChevronRight className="h-3 w-3 text-warm-gray" />
        <span className="text-warm-gray">Real-estate agent software</span>
        <ChevronRight className="h-3 w-3 text-warm-gray" />
        <span className="text-charcoal">Hamburg</span>
      </nav>

      <p className="inline-flex items-center gap-2 rounded-full bg-golden/10 px-3 py-1 text-xs font-semibold text-golden-dark">
        <MapPin className="h-3.5 w-3.5" /> Local focus: Hamburg
      </p>

      <h1 className="chor mt-5 font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal leading-tight max-w-3xl" style={chorSlot(0)}>
        Real-estate agent software for brokerages in Hamburg
      </h1>

      <p className="chor mt-5 max-w-2xl text-lg text-slate leading-relaxed" style={chorSlot(280, 500)}>
        The Hamburg market rewards speed. Immob24 replies to every inquiry
        in under three seconds, qualifies prospects against the criteria
        that matter, and hands your team only the viewings that are
        actually worth the time.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          {...DEMO_CTA_PROPS}
          onClick={() => trackEvent('seo_city_cta_click', { city: 'hamburg-en', position: 'hero' })}
          className="inline-flex items-center justify-center gap-2 rounded-full band-dark bg-charcoal text-white px-6 py-3 text-base font-semibold hover:bg-charcoal/90 transition-colors"
        >
          Request a Hamburg demo
          <ArrowRight className="h-4 w-4" />
        </button>
        <Link
          to="/en/pricing"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-charcoal/15 px-6 py-3 text-base font-medium text-charcoal hover:bg-cream transition-colors"
        >
          See pricing
        </Link>
      </div>
    </div>
  </section>
);

const Challenge = () => (
  <section className="py-20 bg-white">
    <div className="container max-w-3xl">
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal">
        Hamburg's real-estate market demands speed
      </h2>
      <p className="mt-5 text-slate leading-relaxed">
        With around 1.9 million inhabitants, Hamburg is Germany's
        second-largest city — and one of the densest broker markets.
        Competition for every inquiry is correspondingly intense. Inquiries for an attractive
        property in Eppendorf, Winterhude, or Blankenese typically reach
        multiple agents simultaneously — response time determines who wins
        the mandate.
      </p>
      <p className="mt-4 text-slate leading-relaxed">
        On top of that, Hamburg buyers and tenants are very well informed
        on average: they research across multiple portals before contacting
        you and expect a precise first reply. Generic auto-replies erode
        trust rather than build it.
      </p>

      <RevealGroup className="mt-10 grid md:grid-cols-3 gap-4">
        {[
          {
            icon: Clock,
            label: 'Response in &lt; 3 seconds',
            body: 'Even at night and on weekends — a Hamburg inquiry never waits more than a few seconds for an on-topic first reply.',
          },
          {
            icon: Anchor,
            label: 'Local tonality',
            body: 'The AI understands Hamburg location references (e.g. "HafenCity", "Eppendorf-Süd") and replies in locally appropriate language.',
          },
          {
            icon: MapPin,
            label: 'Scales with inquiry volume',
            body: 'Whether 10 or 100 inquiries a day — the quality of first response stays constant.',
          },
        ].map((c) => (
          <div key={c.label} className="rounded-2xl border border-charcoal/10 bg-cream/40 px-5 py-5">
            <c.icon className="h-5 w-5 text-golden-dark" />
            <p
              className="mt-3 font-semibold text-charcoal"
              dangerouslySetInnerHTML={{ __html: c.label }}
            />
            <p className="mt-2 text-sm text-slate leading-relaxed">{c.body}</p>
          </div>
        ))}
      </RevealGroup>
    </div>
  </section>
);

const Solution = () => (
  <section className="py-20 bg-cream">
    <div className="container max-w-3xl">
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal">
        How Immob24 supports Hamburg brokerages
      </h2>
      <p className="mt-5 text-slate leading-relaxed">
        Immob24 sits between your inquiry sources — portals, website, email —
        and your calendar. An incoming Hamburg inquiry gets a precise first
        reply in seconds. The AI clarifies budget, owner-occupation vs.
        investment, preferred timing, and financing status. Your team then
        only receives the inquiries that are actually qualified — with a
        proposed viewing slot ready.
      </p>
    </div>
  </section>
);

const Features = () => (
  <section className="py-20 bg-white">
    <div className="container">
      <RevealGroup className="grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-heading text-xl font-bold text-charcoal">
            Reply to new inquiries in 3 seconds
          </h3>
          <p className="mt-3 text-slate leading-relaxed">
            Portal inquiries, direct inquiries, your own Hamburg website's
            contact form — every inbound channel flows through Immob24 and
            is answered in seconds.
          </p>
        </div>
        <div>
          <h3 className="font-heading text-xl font-bold text-charcoal">
            Intelligent qualification for Hamburg prospects
          </h3>
          <p className="mt-3 text-slate leading-relaxed">
            The AI runs a short, polite dialogue: location, budget,
            owner-occupation vs. investment, time horizon. Prospects not yet
            decision-ready enter a nurture flow — buying-ready ones go
            straight into scheduling.
          </p>
        </div>
        <div>
          <h3 className="font-heading text-xl font-bold text-charcoal">
            Schedule viewings without email ping-pong
          </h3>
          <p className="mt-3 text-slate leading-relaxed">
            Qualified inquiries receive suitable viewing slots — reconciled
            with your calendar and with sensible buffers between Hamburg
            addresses.
          </p>
        </div>
      </RevealGroup>
    </div>
  </section>
);

const WhyHamburg = () => (
  <section className="py-20 bg-cream">
    <div className="container max-w-3xl">
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal">
        Why Hamburg brokers are betting on AI
      </h2>
      <ul className="mt-6 space-y-3 text-slate">
        <li>
          <strong className="text-charcoal">High inquiry quality in top
          locations.</strong> Inquiries from Eppendorf, Winterhude, or
          Blankenese come from informed prospects — the first reply decides
          whether a viewing happens.
        </li>
        <li>
          <strong className="text-charcoal">The HafenCity effect.</strong>{' '}
          With the new quarters around the Elbphilharmonie and HafenCity,
          inquiry volume keeps rising — manual handling becomes the
          bottleneck.
        </li>
        <li>
          <strong className="text-charcoal">Your team gets time back.</strong>
          {' '}Instead of first calls and standard questions, your people
          focus on qualified viewings and signed contracts.
        </li>
      </ul>

    </div>
  </section>
);

const Faq = () => (
  <section className="py-20 bg-white">
    <div className="container max-w-3xl">
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal">
        Frequently asked questions
      </h2>
      <div className="mt-8 divide-y divide-charcoal/10">
        {FAQS.map((item) => (
          <details key={item.q} className="group py-5">
            <summary className="flex cursor-pointer items-start justify-between gap-4 list-none">
              <span className="font-semibold text-charcoal">{item.q}</span>
              <ChevronRight className="h-4 w-4 text-warm-gray mt-1 transition-transform group-open:rotate-90" />
            </summary>
            <p className="mt-3 text-slate leading-relaxed">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

const RelatedCities = () => (
  <section className="py-16 bg-cream">
    <div className="container">
      <h2 className="font-heading text-2xl font-bold text-charcoal">
        Also relevant for brokerages in:
      </h2>
      <RevealGroup stagger={60} className="mt-5 flex flex-wrap gap-3">
        {[
          { label: 'Munich', path: '/en/real-estate-agent-software/munich' },
          { label: 'Berlin', path: '/en/real-estate-agent-software/berlin' },
          { label: 'AI for real-estate agents — overview', path: '/en/ai-for-real-estate-agents' },
          { label: 'Real-estate CRM alternative', path: '/en/real-estate-crm-alternative' },
        ].map((l) => (
          <Link
            key={l.path}
            to={l.path}
            className="rounded-full bg-white border border-charcoal/10 px-4 py-2 text-sm text-charcoal hover:border-charcoal/30"
          >
            {l.label}
          </Link>
        ))}
      </RevealGroup>
    </div>
  </section>
);

const FinalCta = () => (
  <section className="py-20 band-dark bg-charcoal text-white">
    <div className="container max-w-3xl text-center">
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">
        Get started with Immob24 in Hamburg
      </h2>
      <p className="mt-5 text-white/75 leading-relaxed">
        We set Immob24 up for your Hamburg brokerage within a day, connect
        your portals and inboxes, and go live with you. From day one you
        see which inquiries arrive and which viewings the AI books for you.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <button
          type="button"
          {...DEMO_CTA_PROPS}
          onClick={() => trackEvent('seo_city_cta_click', { city: 'hamburg-en', position: 'final' })}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-golden text-[#1E1B16] px-6 py-3 text-base font-semibold hover:bg-golden/90 transition-colors"
        >
          Request a Hamburg demo
          <ArrowRight className="h-4 w-4" />
        </button>
        <Link
          to="/en/beta-agent-program"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-base font-medium text-white hover:bg-white/5 transition-colors"
        >
          Hamburg beta program
        </Link>
      </div>
    </div>
  </section>
);

export default function RealEstateAgentSoftwareHamburg() {
  useDocumentMeta({
    title: 'Real-estate agent software for Hamburg | AI for brokerages | Immob24',
    description:
      'AI real-estate agent software for Hamburg brokerages: lead response in seconds, automatic qualification, scheduling logic. Request a Hamburg demo.',
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
        { name: 'Real-estate agent software', path: '/en/product' },
        { name: 'Hamburg', path: PAGE_PATH },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        name: 'Immob24 real-estate agent software for Hamburg',
        description:
          'AI-powered real-estate agent software for brokerages in Hamburg — lead response in seconds, automatic qualification, scheduling logic.',
        brand: { '@type': 'Brand', name: 'Immob24' },
        areaServed: {
          '@type': 'City',
          name: 'Hamburg',
          sameAs: 'https://en.wikipedia.org/wiki/Hamburg',
        },
        offers: {
          '@type': 'Offer',
          price: '249',
          priceCurrency: 'EUR',
          url: PAGE_URL,
        },
      },
    ],
    'real-estate-agent-software-hamburg',
  );

  useFaqSchema(FAQS, 'en', 'real-estate-agent-software-hamburg');

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Reveal>
        <Challenge />
      </Reveal>
      <Reveal>
        <Solution />
      </Reveal>
      <Reveal>
        <Features />
      </Reveal>
      <Reveal>
        <WhyHamburg />
      </Reveal>
      <Reveal>
        <Faq />
      </Reveal>
      <Reveal>
        <RelatedCities />
      </Reveal>
      <Reveal>
        <FinalCta />
      </Reveal>
      <Footer />
    </div>
  );
}
