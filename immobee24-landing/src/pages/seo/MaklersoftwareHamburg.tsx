// SEO landing page: Maklersoftware für Hamburg
// Spec source: docs/SEO_OPTIMIZATION_STRATEGY (Part 2, Page 4)
//
// Bracketed `[…]` strings are placeholders for verifiable facts. Replace
// before lifting noindex.

import { Anchor, ArrowRight, ChevronRight, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header, Footer, DEMO_CTA_PROPS } from '../../components/SiteChrome';
import { cascadeDelay, chorSlot, Reveal, RevealGroup } from '../../lib/animations';
import { trackEvent } from '../../lib/analytics';
import { useDocumentMeta } from '../../lib/useDocumentMeta';
import { useFaqSchema } from '../../lib/useFaqSchema';
import { useJsonLd } from '../../lib/useJsonLd';
import { breadcrumbSchema } from '../../lib/schema';
import { SITE_ORIGIN } from '../../i18n/pages';

const PAGE_PATH = '/de/maklersoftware/hamburg';
const PAGE_URL = `${SITE_ORIGIN}${PAGE_PATH}`;
const EN_URL = `${SITE_ORIGIN}/en/real-estate-agent-software/hamburg`;

const FAQS: Array<{ q: string; a: string }> = [
  {
    q: 'Wie viele Immobilienmakler gibt es in Hamburg?',
    a: 'Hamburg gehört zu den größten Maklermärkten Deutschlands. Die Dichte ist besonders hoch in Eppendorf, Winterhude, Eimsbüttel und der HafenCity — genau dort, wo auch die meisten Anfragen entstehen.',
  },
  {
    q: 'Für welche Hamburger Stadtteile eignet sich Immob24 besonders?',
    a: 'Immob24 ist für jedes Hamburger Maklerbüro nutzbar — unabhängig vom Bezirk. Besonders deutlich wird der Vorteil aber in nachfragestarken Lagen wie Eppendorf, Winterhude, Eimsbüttel, Blankenese und Ottensen, wo Anfragevolumen und Konkurrenzdruck am höchsten sind.',
  },
  {
    q: 'Kann Immob24 auch mit Bestands-CRMs in Hamburg zusammenarbeiten?',
    a: 'Ja. Immob24 ersetzt Ihr CRM nicht — es ergänzt es als KI-Ausführungsschicht für Erstreaktion, Qualifizierung und Follow-up. Eine Anbindung an gängige Maklersysteme ist Teil der Einrichtung.',
  },
  {
    q: 'Was kostet Immob24 für Hamburger Maklerbüros?',
    a: 'Immob24 startet bei 249 € pro Monat. Es gibt keine Hamburg-spezifischen Aufschläge. Genaue Pakete und enthaltene Leistungen finden Sie auf der Preisseite.',
  },
];

const Hero = () => (
  <section
    id="top"
    className="relative pt-36 pb-20 md:pt-44 md:pb-24 overflow-hidden bg-gradient-to-b from-cream to-white"
  >
    <div className="container">
      <nav aria-label="Brotkrumen" className="mb-6 flex items-center gap-1 text-xs text-slate">
        <Link to="/de" className="hover:text-charcoal">Start</Link>
        <ChevronRight className="h-3 w-3 text-warm-gray" />
        <span className="text-warm-gray">Maklersoftware</span>
        <ChevronRight className="h-3 w-3 text-warm-gray" />
        <span className="text-charcoal">Hamburg</span>
      </nav>

      <p className="inline-flex items-center gap-2 rounded-full bg-golden/10 px-3 py-1 text-xs font-semibold text-golden-dark">
        <MapPin className="h-3.5 w-3.5" /> Lokaler Fokus: Hamburg
      </p>

      <h1 className="chor mt-5 font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal leading-tight max-w-3xl" style={chorSlot(0)}>
        Maklersoftware für Immobilienmakler in Hamburg
      </h1>

      <p className="chor mt-5 max-w-2xl text-lg text-slate leading-relaxed" style={chorSlot(280, 500)}>
        Der Hamburger Markt belohnt Geschwindigkeit. Immob24 antwortet in unter
        drei Sekunden auf jede Anfrage, qualifiziert Interessenten anhand der
        wichtigsten Kriterien und übergibt Ihrem Team nur die Termine, die
        sich wirklich lohnen.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          {...DEMO_CTA_PROPS}
          onClick={() => trackEvent('seo_city_cta_click', { city: 'hamburg', position: 'hero' })}
          className="inline-flex items-center justify-center gap-2 rounded-full band-dark bg-charcoal text-white px-6 py-3 text-base font-semibold hover:bg-charcoal/90 transition-colors"
        >
          Demo für Hamburg anfragen
          <ArrowRight className="h-4 w-4" />
        </button>
        <Link
          to="/de/preise"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-charcoal/15 px-6 py-3 text-base font-medium text-charcoal hover:bg-cream transition-colors"
        >
          Preise ansehen
        </Link>
      </div>
    </div>
  </section>
);

const Challenge = () => (
  <section className="py-20 bg-white">
    <div className="container max-w-3xl">
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal">
        Der Hamburger Immobilienmarkt erfordert Geschwindigkeit
      </h2>
      <p className="mt-5 text-slate leading-relaxed">
        Hamburg ist mit rund 1,9 Millionen Einwohnern Deutschlands
        zweitgrößte Stadt — und einer der dichtesten Maklermärkte.
        Entsprechend groß ist der Wettbewerb um jede Anfrage. Anfragen für ein attraktives
        Objekt in Eppendorf, Winterhude oder Blankenese erreichen oft mehrere
        Makler gleichzeitig — Reaktionszeit entscheidet, wer das Mandat bekommt.
      </p>
      <p className="mt-4 text-slate leading-relaxed">
        Hinzu kommt: Hamburger Käuferinnen und Käufer sind im Schnitt sehr
        gut informiert, recherchieren vorab über mehrere Portale und erwarten
        eine fachlich präzise erste Antwort. Generische Auto-Replies senken
        das Vertrauen, statt es aufzubauen.
      </p>

      <RevealGroup className="mt-10 grid md:grid-cols-3 gap-4">
        {[
          {
            icon: Clock,
            label: 'Antwort in &lt; 3 Sekunden',
            body: 'Auch nachts und am Wochenende — die Hamburger Anfrage wartet nie länger als wenige Sekunden auf eine fachlich passende Erstreaktion.',
          },
          {
            icon: Anchor,
            label: 'Lokale Tonalität',
            body: 'Die KI versteht Hamburger Lageangaben (z. B. „HafenCity", „Eppendorf-Süd") und kann lokal passend formulieren.',
          },
          {
            icon: MapPin,
            label: 'Skaliert mit Anfragevolumen',
            body: 'Egal ob 10 oder 100 Anfragen pro Tag — die Qualität der Erstreaktion bleibt konstant.',
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
        Wie Immob24 Hamburger Makler entlastet
      </h2>
      <p className="mt-5 text-slate leading-relaxed">
        Immob24 sitzt zwischen Ihren Anfragequellen — Portalen, Website,
        E-Mail — und Ihrem Kalender. Eine eingehende Hamburger Anfrage
        bekommt in Sekunden eine fachlich korrekte Antwort. Die KI klärt
        Budget, Eigennutzung oder Kapitalanlage, Wunschtermin und
        Finanzierungsstatus. Ihr Team bekommt anschließend nur noch die
        Anfragen, die wirklich qualifiziert sind — mit fertigem Terminvorschlag.
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
            In 3 Sekunden auf neue Anfragen reagieren
          </h3>
          <p className="mt-3 text-slate leading-relaxed">
            Portal-Anfragen, Direktanfragen, Kontaktformular der eigenen
            Hamburger Makler-Website — alle Eingangskanäle laufen über
            Immob24 und werden in Sekunden bedient.
          </p>
        </div>
        <div>
          <h3 className="font-heading text-xl font-bold text-charcoal">
            Intelligente Qualifizierung für Hamburger Interessenten
          </h3>
          <p className="mt-3 text-slate leading-relaxed">
            Die KI führt einen kurzen, höflichen Dialog: Lage, Budget,
            Eigennutzung vs. Kapitalanlage, Zeithorizont. Wer noch nicht
            entscheidungsreif ist, landet in einem Nurture-Strang — wer
            kaufbereit ist, geht direkt in die Terminlogik.
          </p>
        </div>
        <div>
          <h3 className="font-heading text-xl font-bold text-charcoal">
            Besichtigungen effizient planen ohne E-Mail-Chaos
          </h3>
          <p className="mt-3 text-slate leading-relaxed">
            Qualifizierte Anfragen erhalten direkt passende Besichtigungstermine
            — abgeglichen mit Ihrem Kalender und mit sinnvollen Pufferzeiten
            zwischen Hamburger Adressen.
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
        Warum Hamburger Makler auf KI setzen
      </h2>
      <ul className="mt-6 space-y-3 text-slate">
        <li>
          <strong className="text-charcoal">Hohe Anfragequalität in
          Top-Lagen.</strong> Anfragen aus Eppendorf, Winterhude oder
          Blankenese kommen oft von gut informierten Interessenten — die
          erste Antwort entscheidet, ob ein Termin zustande kommt.
        </li>
        <li>
          <strong className="text-charcoal">HafenCity-Effekt.</strong> Mit
          den neuen Quartieren rund um Elbphilharmonie und HafenCity steigt
          das Anfragevolumen weiter — manuelle Bearbeitung wird zum Engpass.
        </li>
        <li>
          <strong className="text-charcoal">Mitarbeiter werden entlastet.</strong>
          {' '}Statt Erstanrufe und Standardfragen abzuarbeiten, konzentriert
          sich Ihr Team auf qualifizierte Termine und Vertragsabschlüsse.
        </li>
      </ul>

    </div>
  </section>
);

const Faq = () => (
  <section className="py-20 bg-white">
    <div className="container max-w-3xl">
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal">
        Häufige Fragen
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

const RelatedCities = () => (
  <section className="py-16 bg-cream">
    <div className="container">
      <h2 className="font-heading text-2xl font-bold text-charcoal">
        Auch interessant für Makler in:
      </h2>
      <RevealGroup stagger={60} className="mt-5 flex flex-wrap gap-3">
        {[
          { label: 'München', path: '/de/maklersoftware/muenchen' },
          { label: 'Berlin', path: '/de/maklersoftware/berlin' },
          { label: 'KI für Immobilienmakler — Übersicht', path: '/de/ki-fuer-immobilienmakler' },
          { label: 'Immobilien-CRM Alternative', path: '/de/immobilien-crm-alternative' },
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
        Starten Sie mit Immob24 in Hamburg
      </h2>
      <p className="mt-5 text-white/75 leading-relaxed">
        Wir richten Immob24 für Ihr Hamburger Maklerbüro innerhalb eines
        Tages ein, schließen Portale und Postfächer an und gehen gemeinsam
        live. Ab Tag 1 sehen Sie, welche Anfragen ankommen und welche
        Termine die KI für Sie bucht.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <button
          type="button"
          {...DEMO_CTA_PROPS}
          onClick={() => trackEvent('seo_city_cta_click', { city: 'hamburg', position: 'final' })}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-golden text-[#1E1B16] px-6 py-3 text-base font-semibold hover:bg-golden/90 transition-colors"
        >
          Demo für Hamburg anfragen
          <ArrowRight className="h-4 w-4" />
        </button>
        <Link
          to="/de/beta-agentenprogramm"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-base font-medium text-white hover:bg-white/5 transition-colors"
        >
          Beta-Programm für Hamburg
        </Link>
      </div>
    </div>
  </section>
);

export default function MaklersoftwareHamburg() {
  useDocumentMeta({
    title: 'Maklersoftware Hamburg | KI für Hamburger Makler | Immob24',
    description:
      'Maklersoftware für Hamburger Immobilienmakler: KI-gestützte Lead-Reaktion, automatische Qualifizierung & Terminlogik. Demo für Hamburg anfragen.',
    canonical: PAGE_URL,
    htmlLang: 'de',
    alternates: [
      { hreflang: 'de', href: PAGE_URL },
      { hreflang: 'en', href: EN_URL },
      { hreflang: 'x-default', href: PAGE_URL },
    ],
  });

  useJsonLd(
    [
      breadcrumbSchema([
        { name: 'Start', path: '/de' },
        { name: 'Maklersoftware', path: '/de/produkt' },
        { name: 'Hamburg', path: PAGE_PATH },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        name: 'Immob24 Maklersoftware Hamburg',
        description:
          'KI-gestützte Maklersoftware für Immobilienmakler in Hamburg — Lead-Reaktion in Sekunden, automatische Qualifizierung, Terminlogik.',
        brand: { '@type': 'Brand', name: 'Immob24' },
        areaServed: {
          '@type': 'City',
          name: 'Hamburg',
          sameAs: 'https://de.wikipedia.org/wiki/Hamburg',
        },
        offers: {
          '@type': 'Offer',
          price: '249',
          priceCurrency: 'EUR',
          url: PAGE_URL,
        },
      },
    ],
    'maklersoftware-hamburg',
  );

  useFaqSchema(FAQS, 'de', 'maklersoftware-hamburg');

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
      <Faq />
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
