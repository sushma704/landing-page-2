// SEO landing page (EN): Real-estate agent software for Berlin
// Spec source: docs/SEO_OPTIMIZATION_STRATEGY (Part 2, Page 2)
//
// English counterpart to MaklersoftwareBerlin.tsx.

import { ArrowRight, ChevronRight, Globe2, MapPin, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header, Footer, DEMO_CTA_PROPS } from '../../components/SiteChrome';
import { trackEvent } from '../../lib/analytics';
import { useDocumentMeta } from '../../lib/useDocumentMeta';
import { useFaqSchema } from '../../lib/useFaqSchema';
import { useJsonLd } from '../../lib/useJsonLd';
import { breadcrumbSchema } from '../../lib/schema';
import { SITE_ORIGIN } from '../../i18n/pages';

const PAGE_PATH = '/en/real-estate-agent-software/berlin';
const PAGE_URL = `${SITE_ORIGIN}${PAGE_PATH}`;
const DE_URL = `${SITE_ORIGIN}/de/maklersoftware/berlin`;

const FAQS: Array<{ q: string; a: string }> = [
  {
    q: 'Does Immob24 also work for English-speaking clients in Berlin?',
    a: 'Yes. The AI automatically replies in the language of the inquiry — German or English. That matters in Berlin, where many international buyers and tenants submit inquiries in English.',
  },
  {
    q: 'Which real-estate portals are most used in Berlin?',
    a: 'Berlin is dominated by ImmoScout24, Immowelt, and an increasing number of smaller specialist portals for the investment segment. Immob24 ingests inquiries from all common portals — either via email forwarding or direct API, depending on the portal.',
  },
  {
    q: 'Can Immob24 integrate with Berlin broker websites?',
    a: 'Yes. Inquiries from your own Berlin website contact form are handled the same way as portal inquiries: first response in seconds, qualification, viewing slot. Integration is part of onboarding.',
  },
  {
    q: 'How does the Berlin real-estate market differ from Munich?',
    a: 'Berlin is often even more dynamic per inquiry than Munich, especially in rentals and investment listings. At the same time the market is more fragmented — many inquiries come from international capital investors. Immob24 is built for both profiles.',
  },
  {
    q: 'How much does Immob24 cost for Berlin brokerages?',
    a: 'Immob24 starts at €249 per month. Detailed packages are on the pricing page — there are no Berlin-specific surcharges.',
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
        <span className="text-charcoal">Berlin</span>
      </nav>

      <p className="inline-flex items-center gap-2 rounded-full bg-golden/10 px-3 py-1 text-xs font-semibold text-golden-dark">
        <MapPin className="h-3.5 w-3.5" /> Local focus: Berlin
      </p>

      <h1 className="mt-5 font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal leading-tight max-w-3xl">
        Real-estate agent software for brokerages in Berlin
      </h1>

      <p className="mt-5 max-w-2xl text-lg text-slate leading-relaxed">
        Berlin is Germany's fastest broker market. Immob24 accepts every
        portal and website inquiry in under three seconds, qualifies
        prospects bilingually (German and English), and hands your team
        only the genuinely interested leads — automatically, round the clock.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          {...DEMO_CTA_PROPS}
          onClick={() => trackEvent('seo_city_cta_click', { city: 'berlin-en', position: 'hero' })}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-charcoal text-white px-6 py-3 text-base font-semibold hover:bg-charcoal/90 transition-colors"
        >
          Request a Berlin demo
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
        Berlin brokers are in a race to respond first
      </h2>
      <p className="mt-5 text-slate leading-relaxed">
        Three worlds meet in Berlin: classic owner-occupied flats in Mitte,
        Prenzlauer Berg, and Kreuzberg; large existing portfolios in Pankow,
        Reinickendorf, and Marzahn; and investment properties for
        international capital investors. Estimates suggest{' '}
        <strong>[~X,XXX active brokerages]</strong> across the city
        (source: IVD Berlin-Brandenburg — to be inserted).
      </p>
      <p className="mt-4 text-slate leading-relaxed">
        Inquiries no longer come by phone — they come digitally, and usually
        to several agents at once. The agent who responds first wins trust,
        the viewing, and the mandate. Manual response times of 4–24 hours,
        still common in many Berlin brokerages, are no longer competitive in
        this race.
      </p>

      <div className="mt-10 grid md:grid-cols-3 gap-4">
        {[
          {
            icon: Sparkles,
            label: 'Tech-savvy audience',
            body: 'Berlin prospects expect immediate, precise digital communication — not generic auto-replies.',
          },
          {
            icon: Globe2,
            label: 'International buyers',
            body: 'The AI replies automatically in the language of the inquiry — German or English — and qualifies consistently.',
          },
          {
            icon: MapPin,
            label: 'Inquiries from every corner of Berlin',
            body: 'From Charlottenburg to Köpenick: the AI recognises location references and prioritises by the districts you focus on.',
          },
        ].map((c) => (
          <div key={c.label} className="rounded-2xl border border-charcoal/10 bg-cream/40 px-5 py-5">
            <c.icon className="h-5 w-5 text-golden-dark" />
            <p className="mt-3 font-semibold text-charcoal">{c.label}</p>
            <p className="mt-2 text-sm text-slate leading-relaxed">{c.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Solution = () => (
  <section className="py-20 bg-cream">
    <div className="container max-w-3xl">
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal">
        How Immob24 supports Berlin brokerages
      </h2>
      <p className="mt-5 text-slate leading-relaxed">
        Immob24 sits between your lead sources — portals, website, inbox —
        and your calendar. Incoming inquiries are answered in under three
        seconds: polite, accurate, in the language of the inquiry. The AI
        clarifies budget, owner-occupation vs. investment, financing status,
        and preferred timing, and only hands the lead off to your team once
        the viewing is booked.
      </p>
      <p className="mt-4 text-slate leading-relaxed">
        For a Berlin brokerage, that means fewer but better-prepared
        conversations per day — and winning the fast mandates that today
        often move on after two clicks.
      </p>
    </div>
  </section>
);

const Features = () => (
  <section className="py-20 bg-white">
    <div className="container">
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-heading text-xl font-bold text-charcoal">
            Instant reply to portal inquiries
          </h3>
          <p className="mt-3 text-slate leading-relaxed">
            ImmoScout24, Immowelt, your own website, direct email — every
            channel lands at Immob24 and is answered in seconds. No night
            shifts, no Sundays without a reply.
          </p>
        </div>
        <div>
          <h3 className="font-heading text-xl font-bold text-charcoal">
            Automatic lead qualification
          </h3>
          <p className="mt-3 text-slate leading-relaxed">
            The AI runs a short, polite dialogue: preferred location, budget,
            financing, time horizon. In the Berlin investment segment,
            additionally: capital deployment, yield expectations, tax status.
          </p>
        </div>
        <div>
          <h3 className="font-heading text-xl font-bold text-charcoal">
            Efficient scheduling and viewing logic
          </h3>
          <p className="mt-3 text-slate leading-relaxed">
            Once a lead is qualified, the AI proposes viewing slots —
            reconciled with your calendar and with sensible buffers between
            Berlin addresses.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const WhyBerlin = () => (
  <section className="py-20 bg-cream">
    <div className="container max-w-3xl">
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal">
        Why Berlin brokers should be using AI
      </h2>
      <ul className="mt-6 space-y-3 text-slate">
        <li>
          <strong className="text-charcoal">Speed beats experience.</strong>{' '}
          In Berlin, many mandates are won not by the most experienced agent
          but by the fastest. An AI that responds in seconds shifts the
          playing field.
        </li>
        <li>
          <strong className="text-charcoal">Volume per listing.</strong> A
          typical Berlin rental listing can produce{' '}
          <strong>[~XX–XXX inquiries]</strong> in the first 48 hours.
          Without automation, leads systematically slip through.
        </li>
        <li>
          <strong className="text-charcoal">Bilingual reach.</strong> Berlin
          brokerages with international clients need consistent
          English-language first response — Immob24 ships that by default.
        </li>
      </ul>

      <p className="mt-6 text-sm text-warm-gray italic">
        Note: Numbers in [square brackets] are placeholders and will be
        replaced with verified sources before launch.
      </p>
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
      <div className="mt-5 flex flex-wrap gap-3">
        {[
          { label: 'Munich', path: '/en/real-estate-agent-software/munich' },
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
      </div>
    </div>
  </section>
);

const FinalCta = () => (
  <section className="py-20 bg-charcoal text-white">
    <div className="container max-w-3xl text-center">
      <h2 className="font-heading text-3xl md:text-4xl font-bold">
        Get started with Immob24 for your Berlin brokerage
      </h2>
      <p className="mt-5 text-white/75 leading-relaxed">
        We set Immob24 up for your Berlin brokerage typically within a day,
        connect your portals, inboxes, and website, and go live with you.
        From day one you see what the AI handles for you.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <button
          type="button"
          {...DEMO_CTA_PROPS}
          onClick={() => trackEvent('seo_city_cta_click', { city: 'berlin-en', position: 'final' })}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-golden text-charcoal px-6 py-3 text-base font-semibold hover:bg-golden/90 transition-colors"
        >
          Request a Berlin demo
          <ArrowRight className="h-4 w-4" />
        </button>
        <Link
          to="/en/beta-agent-program"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-base font-medium text-white hover:bg-white/5 transition-colors"
        >
          Berlin beta program
        </Link>
      </div>
    </div>
  </section>
);

export default function RealEstateAgentSoftwareBerlin() {
  useDocumentMeta({
    title: 'Real-estate agent software for Berlin | AI for brokerages | Immob24',
    description:
      'AI real-estate agent software for Berlin brokerages: bilingual lead response, automatic qualification, scheduling logic. Request a Berlin demo.',
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
        { name: 'Berlin', path: PAGE_PATH },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'Immob24 real-estate agent software for Berlin',
        description:
          'AI-powered real-estate agent software for brokerages in Berlin — bilingual lead response, automatic qualification, scheduling logic.',
        brand: { '@type': 'Brand', name: 'Immob24' },
        areaServed: {
          '@type': 'City',
          name: 'Berlin',
          sameAs: 'https://en.wikipedia.org/wiki/Berlin',
        },
        offers: {
          '@type': 'Offer',
          price: '249',
          priceCurrency: 'EUR',
          url: PAGE_URL,
        },
      },
    ],
    'real-estate-agent-software-berlin',
  );

  useFaqSchema(FAQS, 'en', 'real-estate-agent-software-berlin');

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Challenge />
      <Solution />
      <Features />
      <WhyBerlin />
      <Faq />
      <RelatedCities />
      <FinalCta />
      <Footer />
    </div>
  );
}
