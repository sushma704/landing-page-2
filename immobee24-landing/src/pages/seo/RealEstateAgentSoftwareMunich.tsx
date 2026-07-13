// SEO landing page (EN): Real-estate agent software for Munich
// Spec source: docs/SEO_OPTIMIZATION_STRATEGY (Part 2, Page 1)
//
// English counterpart to MaklersoftwareMuenchen.tsx. Hreflang alternate
// points to the DE page. Bracketed `[…]` strings are placeholders for
// verifiable facts (agent counts, market data) — replace before lifting
// the noindex lockdown.

import { ArrowRight, ChevronRight, Clock, MapPin, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header, Footer, DEMO_CTA_PROPS } from '../../components/SiteChrome';
import { Reveal, RevealGroup } from '../../lib/animations';
import { trackEvent } from '../../lib/analytics';
import { useDocumentMeta } from '../../lib/useDocumentMeta';
import { useFaqSchema } from '../../lib/useFaqSchema';
import { useJsonLd } from '../../lib/useJsonLd';
import { breadcrumbSchema } from '../../lib/schema';
import { SITE_ORIGIN } from '../../i18n/pages';

const PAGE_PATH = '/en/real-estate-agent-software/munich';
const PAGE_URL = `${SITE_ORIGIN}${PAGE_PATH}`;
const DE_URL = `${SITE_ORIGIN}/de/maklersoftware/muenchen`;

const FAQS: Array<{ q: string; a: string }> = [
  {
    q: 'How much does real-estate agent software cost for Munich brokerages?',
    a: 'Immob24 starts at €249 per month. Munich brokerages get lead response in seconds, automatic qualification, and scheduling logic — no extra CRM licenses required. Detailed pricing and packages are on our pricing page.',
  },
  {
    q: 'Is Immob24 suitable for small Munich brokerages?',
    a: 'Yes. Immob24 is built so that one- to three-person Munich brokerages can be productive on day one. No IT department or implementation partner needed — onboarding takes less than a working day.',
  },
  {
    q: 'Can Immob24 work alongside existing CRM systems in Munich?',
    a: 'Yes. Immob24 does not replace your CRM — it complements it as an AI execution layer: first response, qualification, and follow-up are handled by Immob24 while your CRM continues to hold master data. Integration with common broker systems is part of onboarding.',
  },
  {
    q: 'How fast can I get Immob24 running in my Munich brokerage?',
    a: 'A typical Munich brokerage is live within a day. The AI learns from your typical listings and inquiry patterns, and we walk you through connecting your portals and inboxes.',
  },
  {
    q: 'How does the Munich real-estate market differ from other cities?',
    a: 'Markedly. Munich is one of the most expensive and most competitive markets in Germany. Inquiries often hit several agents in parallel — whoever responds first wins the mandate. That is exactly why response time in seconds rather than hours matters here.',
  },
];

const Hero = () => (
  <section
    id="top"
    className="relative pt-36 pb-20 md:pt-44 md:pb-24 overflow-hidden bg-gradient-to-b from-cream to-white"
  >
    <div className="container">
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex items-center gap-1 text-xs text-slate"
      >
        <Link to="/en" className="hover:text-charcoal">
          Home
        </Link>
        <ChevronRight className="h-3 w-3 text-warm-gray" />
        <span className="text-warm-gray">Real-estate agent software</span>
        <ChevronRight className="h-3 w-3 text-warm-gray" />
        <span className="text-charcoal">Munich</span>
      </nav>

      <p className="inline-flex items-center gap-2 rounded-full bg-golden/10 px-3 py-1 text-xs font-semibold text-golden-dark">
        <MapPin className="h-3.5 w-3.5" /> Local focus: Munich
      </p>

      <h1 className="hero-in mt-5 font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal leading-tight max-w-3xl" style={{ animationDelay: '100ms' }}>
        Real-estate agent software for brokerages in Munich
      </h1>

      <p className="hero-in mt-5 max-w-2xl text-lg text-slate leading-relaxed" style={{ animationDelay: '250ms' }}>
        Munich inquiries don't wait. Immob24 responds in under three seconds,
        qualifies prospects automatically, and takes over scheduling and
        follow-up — so your brokerage wins mandates instead of losing them to
        faster competitors.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          {...DEMO_CTA_PROPS}
          onClick={() => trackEvent('seo_city_cta_click', { city: 'munich-en', position: 'hero' })}
          className="inline-flex items-center justify-center gap-2 rounded-full band-dark bg-charcoal text-white px-6 py-3 text-base font-semibold hover:bg-charcoal/90 transition-colors"
        >
          Request a Munich demo
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
        The challenge for Munich brokerages
      </h2>
      <p className="mt-5 text-slate leading-relaxed">
        Munich has one of the densest broker markets in Germany. Sellers
        and landlords in the Munich / Upper Bavaria region typically
        contact several agents in parallel — through ImmoScout24, Immowelt,
        or directly by email.
      </p>
      <p className="mt-4 text-slate leading-relaxed">
        Whoever responds first wins trust — and usually the mandate. In a
        market with{' '}
        <strong>some of the highest square-meter prices in Germany</strong>,
        every unanswered lead is real money. This is exactly where Immob24 fits
        in: while you're still reading, the system has already responded,
        qualified, and proposed a viewing time.
      </p>

      <RevealGroup className="mt-10 grid md:grid-cols-3 gap-4">
        {[
          {
            icon: Clock,
            label: 'Response in &lt; 3 seconds',
            body: 'Your Munich inquiry no longer waits hours for a first reply.',
          },
          {
            icon: TrendingUp,
            label: 'More mandates from the same inquiry volume',
            body: 'Faster response materially raises the probability that an inquiry turns into a viewing.',
          },
          {
            icon: MapPin,
            label: 'Tuned to the Munich market',
            body: 'The AI understands Munich neighbourhoods — Schwabing, Bogenhausen, Sendling — and prioritises accordingly.',
          },
        ].map((c) => (
          <div
            key={c.label}
            className="rounded-2xl border border-charcoal/10 bg-cream/40 px-5 py-5"
          >
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
        How Immob24 supports Munich brokerages
      </h2>
      <p className="mt-5 text-slate leading-relaxed">
        Immob24 is not "another CRM". It is the execution layer between
        inquiry and close: the moment someone submits an inquiry — through a
        portal or directly on your website — the AI takes over the first
        conversation in German (or English), clarifies budget, timeline, and
        financing, and books a viewing in your calendar as soon as the lead
        is qualified.
      </p>
      <p className="mt-4 text-slate leading-relaxed">
        For Munich brokerages, that means less time on cold first calls and
        manual qualification — and more time on the appointments that
        actually generate revenue.
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
            Automatic lead response in 3 seconds
          </h3>
          <p className="mt-3 text-slate leading-relaxed">
            Every new Munich inquiry receives an accurate, on-listing reply
            within seconds. The AI references the actual property, clarifies
            open points, and positions you as a responsive contact — at 10 pm
            or on a Sunday.
          </p>
        </div>
        <div>
          <h3 className="font-heading text-xl font-bold text-charcoal">
            Intelligent lead qualification for the Munich market
          </h3>
          <p className="mt-3 text-slate leading-relaxed">
            Budget, financing status, preferred neighbourhood, owner-occupier
            vs. investor: the AI runs a short, polite dialogue and flags
            clearly which prospects are buying-ready and which are just
            researching.
          </p>
        </div>
        <div>
          <h3 className="font-heading text-xl font-bold text-charcoal">
            Scheduling &amp; follow-up without manual work
          </h3>
          <p className="mt-3 text-slate leading-relaxed">
            Qualified inquiries are reconciled directly with your calendar
            and offered a suitable viewing slot. Anyone who doesn't show up
            is followed up automatically.
          </p>
        </div>
      </RevealGroup>
    </div>
  </section>
);

const WhyMunich = () => (
  <section className="py-20 bg-cream">
    <div className="container max-w-3xl">
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal">
        Why Munich brokerages benefit most from AI
      </h2>
      <p className="mt-5 text-slate leading-relaxed">
        The Munich market is shaped by high prices, high demand, and very
        short response windows. Three factors make the difference:
      </p>
      <ul className="mt-5 space-y-3 text-slate">
        <li>
          <strong className="text-charcoal">Inquiry volume per listing:</strong>{' '}
          An attractive Munich property can generate{' '}
          <strong>numerous inquiries</strong> in 24 hours. Handling that wave
          manually without dropping leads is barely possible — the AI takes
          every single one.
        </li>
        <li>
          <strong className="text-charcoal">Value per mandate:</strong> At
          Munich price levels, every additional mandate pays back software
          costs many times over.
        </li>
        <li>
          <strong className="text-charcoal">Neighbourhood specifics:</strong>{' '}
          Inquiries from Schwabing read differently from Bogenhausen or
          Pasing. Immob24 learns your local tone and standard questions.
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
          { label: 'Berlin', path: '/en/real-estate-agent-software/berlin' },
          { label: 'Hamburg', path: '/en/real-estate-agent-software/hamburg' },
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
        Get started with Immob24 in Munich
      </h2>
      <p className="mt-5 text-white/75 leading-relaxed">
        We set Immob24 up for your Munich brokerage within a day, connect
        your portals and inboxes, and go live with you. From day one you
        see which inquiries arrive, who is qualified, and when the next
        viewing is booked.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <button
          type="button"
          {...DEMO_CTA_PROPS}
          onClick={() => trackEvent('seo_city_cta_click', { city: 'munich-en', position: 'final' })}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-golden text-[#1E1B16] px-6 py-3 text-base font-semibold hover:bg-golden/90 transition-colors"
        >
          Request a Munich demo
          <ArrowRight className="h-4 w-4" />
        </button>
        <Link
          to="/en/beta-agent-program"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-base font-medium text-white hover:bg-white/5 transition-colors"
        >
          Munich beta program
        </Link>
      </div>
    </div>
  </section>
);

export default function RealEstateAgentSoftwareMunich() {
  useDocumentMeta({
    title: 'Real-estate agent software for Munich | AI for brokerages | Immob24',
    description:
      'AI real-estate agent software for Munich brokerages: lead response in 3 seconds, automatic qualification & scheduling logic. Request a Munich demo.',
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
        { name: 'Munich', path: PAGE_PATH },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        name: 'Immob24 real-estate agent software for Munich',
        description:
          'AI-powered real-estate agent software for brokerages in Munich — lead response in seconds, automatic qualification, scheduling.',
        brand: { '@type': 'Brand', name: 'Immob24' },
        areaServed: {
          '@type': 'City',
          name: 'Munich',
          sameAs: 'https://en.wikipedia.org/wiki/Munich',
        },
        offers: {
          '@type': 'Offer',
          price: '249',
          priceCurrency: 'EUR',
          url: PAGE_URL,
        },
      },
    ],
    'real-estate-agent-software-munich',
  );

  useFaqSchema(FAQS, 'en', 'real-estate-agent-software-munich');

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
        <WhyMunich />
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
