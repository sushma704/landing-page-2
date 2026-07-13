// SEO landing page: Maklersoftware für Berlin
// Spec source: docs/SEO_OPTIMIZATION_STRATEGY (Part 2, Page 2)
//
// Bracketed `[…]` strings are placeholders for verifiable facts (agent
// counts, market data). Replace with sourced numbers before lifting noindex.

import { ArrowRight, ChevronRight, Globe2, MapPin, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header, Footer, DEMO_CTA_PROPS } from '../../components/SiteChrome';
import { chorSlot, Reveal, RevealGroup } from '../../lib/animations';
import { trackEvent } from '../../lib/analytics';
import { useDocumentMeta } from '../../lib/useDocumentMeta';
import { useFaqSchema } from '../../lib/useFaqSchema';
import { useJsonLd } from '../../lib/useJsonLd';
import { breadcrumbSchema } from '../../lib/schema';
import { SITE_ORIGIN } from '../../i18n/pages';

const PAGE_PATH = '/de/maklersoftware/berlin';
const PAGE_URL = `${SITE_ORIGIN}${PAGE_PATH}`;
const EN_URL = `${SITE_ORIGIN}/en/real-estate-agent-software/berlin`;

const FAQS: Array<{ q: string; a: string }> = [
  {
    q: 'Ist Immob24 auch für englischsprachige Kunden in Berlin geeignet?',
    a: 'Ja. Die KI antwortet auf Anfragen automatisch in der Sprache, in der die Anfrage gestellt wurde — Deutsch oder Englisch. Das ist gerade in Berlin relevant, wo viele internationale Käufer und Mieter Anfragen auf Englisch stellen.',
  },
  {
    q: 'Welche Immobilienportale werden in Berlin am häufigsten genutzt?',
    a: 'In Berlin dominieren ImmoScout24, Immowelt und zunehmend kleinere Spezialportale für den Investment-Bereich. Immob24 nimmt Anfragen aus allen gängigen Portalen entgegen — entweder per E-Mail-Weiterleitung oder direkte API-Anbindung, je nach Portal.',
  },
  {
    q: 'Kann Immob24 mit Makler-Websites in Berlin integriert werden?',
    a: 'Ja. Anfragen aus dem Kontaktformular Ihrer eigenen Berliner Makler-Website werden genauso behandelt wie Portal-Anfragen: Erstantwort in Sekunden, Qualifizierung, Terminvorschlag. Die Einbindung ist Teil der Einrichtung.',
  },
  {
    q: 'Wie unterscheidet sich der Berliner Immobilienmarkt von München?',
    a: 'Berlin ist gemessen am Anfragevolumen pro Objekt oft sogar noch dynamischer als München, vor allem im Miet- und im Investmentsegment. Gleichzeitig ist der Markt fragmentierter — viele Anfragen kommen von Kapitalanlegern aus dem Ausland. Immob24 ist auf beide Profile vorbereitet.',
  },
  {
    q: 'Was kostet Immob24 für Berliner Maklerbüros?',
    a: 'Immob24 startet bei 249 € pro Monat. Genaue Pakete und Optionen finden Sie auf der Preisseite — Berlin-spezifische Aufschläge gibt es nicht.',
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
        <span className="text-charcoal">Berlin</span>
      </nav>

      <p className="inline-flex items-center gap-2 rounded-full bg-golden/10 px-3 py-1 text-xs font-semibold text-golden-dark">
        <MapPin className="h-3.5 w-3.5" /> Lokaler Fokus: Berlin
      </p>

      <h1 className="chor mt-5 font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal leading-tight max-w-3xl" style={chorSlot(0)}>
        Maklersoftware für Immobilienmakler in Berlin
      </h1>

      <p className="chor mt-5 max-w-2xl text-lg text-slate leading-relaxed" style={chorSlot(280, 500)}>
        Berlin ist Deutschlands schnellster Maklermarkt. Immob24 nimmt jede
        Portal- und Website-Anfrage in unter drei Sekunden an, qualifiziert
        Interessenten zweisprachig (Deutsch und Englisch) und übergibt Ihrem
        Team nur die wirklich wechselwilligen Leads — automatisiert, rund um die Uhr.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          {...DEMO_CTA_PROPS}
          onClick={() => trackEvent('seo_city_cta_click', { city: 'berlin', position: 'hero' })}
          className="inline-flex items-center justify-center gap-2 rounded-full band-dark bg-charcoal text-white px-6 py-3 text-base font-semibold hover:bg-charcoal/90 transition-colors"
        >
          Demo für Berlin anfragen
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
        Berlins Makler im Wettlauf um schnelle Reaktion
      </h2>
      <p className="mt-5 text-slate leading-relaxed">
        In Berlin treffen sich drei Welten: klassische Eigentumswohnungen in
        Mitte, Prenzlauer Berg und Kreuzberg; großflächige Bestände in
        Pankow, Reinickendorf oder Marzahn; und Investmentobjekte für
        internationale Kapitalanleger. Berlin zählt damit zu den{' '}
        <strong>größten und dichtesten Maklermärkten Deutschlands</strong> — mit
        entsprechend hohem Wettbewerb um jede einzelne Anfrage.
      </p>
      <p className="mt-4 text-slate leading-relaxed">
        Anfragen kommen nicht mehr nur per Telefon, sondern fast ausschließlich
        digital — und meistens gleichzeitig an mehrere Makler. Wer als Erstes
        antwortet, gewinnt das Vertrauen, den Termin und das Mandat. Manuelle
        Antwortzeiten von 4 bis 24 Stunden, wie sie viele Berliner Maklerbüros
        heute noch zeigen, sind in diesem Wettbewerb nicht mehr tragfähig.
      </p>

      <RevealGroup className="mt-10 grid md:grid-cols-3 gap-4">
        {[
          {
            icon: Sparkles,
            label: 'Tech-affine Zielgruppe',
            body: 'Berliner Interessenten erwarten sofortige, klare digitale Kommunikation — keine generischen Auto-Replies.',
          },
          {
            icon: Globe2,
            label: 'Internationale Käufer',
            body: 'Die KI antwortet automatisch in der Sprache der Anfrage — Deutsch oder Englisch — und qualifiziert konsistent.',
          },
          {
            icon: MapPin,
            label: 'Anfragen aus jeder Ecke Berlins',
            body: 'Von Charlottenburg bis Köpenick: die KI erkennt Lageangaben und priorisiert nach Ihren Schwerpunkt-Bezirken.',
          },
        ].map((c) => (
          <div key={c.label} className="rounded-2xl border border-charcoal/10 bg-cream/40 px-5 py-5">
            <c.icon className="h-5 w-5 text-golden-dark" />
            <p className="mt-3 font-semibold text-charcoal">{c.label}</p>
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
        Wie Immob24 Berliner Maklerbüros unterstützt
      </h2>
      <p className="mt-5 text-slate leading-relaxed">
        Immob24 sitzt zwischen Ihren Lead-Quellen — Portalen, Website,
        Postfach — und Ihrem Kalender. Eingehende Anfragen werden in unter
        drei Sekunden beantwortet: höflich, fachlich, in der Sprache der
        Anfrage. Die KI klärt Budget, Eigennutzung oder Kapitalanlage,
        Finanzierungsstatus und Wunschtermin, und übergibt das Lead nur dann
        an Ihr Team, wenn der Termin steht.
      </p>
      <p className="mt-4 text-slate leading-relaxed">
        Für ein Berliner Maklerbüro heißt das: Sie sprechen pro Tag mit weniger,
        aber besser vorbereiteten Interessenten — und gewinnen die schnellen
        Mandate, die heute oft an zwei Mausklicks weiterziehen.
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
            Sofortige Antwort auf Portal-Anfragen
          </h3>
          <p className="mt-3 text-slate leading-relaxed">
            ImmoScout24, Immowelt, eigene Website, Direktanfragen per E-Mail —
            alles landet bei Immob24, alles wird in Sekunden beantwortet.
            Keine Nachtschicht, kein Sonntag ohne Antwort.
          </p>
        </div>
        <div>
          <h3 className="font-heading text-xl font-bold text-charcoal">
            Automatische Lead-Qualifizierung
          </h3>
          <p className="mt-3 text-slate leading-relaxed">
            Die KI führt einen kurzen, höflichen Dialog: Wunschlage, Budget,
            Finanzierung, Zeithorizont. Im Berliner Investmentsegment
            zusätzlich: Kapitalanlage, Renditeerwartung, Steuerstatus.
          </p>
        </div>
        <div>
          <h3 className="font-heading text-xl font-bold text-charcoal">
            Effiziente Termin- und Besichtigungslogik
          </h3>
          <p className="mt-3 text-slate leading-relaxed">
            Sobald ein Lead qualifiziert ist, schlägt die KI passende
            Besichtigungstermine vor — abgeglichen mit Ihrem Kalender und mit
            sinnvollen Pufferzeiten zwischen Berliner Adressen.
          </p>
        </div>
      </RevealGroup>
    </div>
  </section>
);

const WhyBerlin = () => (
  <section className="py-20 bg-cream">
    <div className="container max-w-3xl">
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal">
        Warum Berlins Makler auf KI setzen sollten
      </h2>
      <ul className="mt-6 space-y-3 text-slate">
        <li>
          <strong className="text-charcoal">Tempo schlägt Erfahrung.</strong>{' '}
          In Berlin entscheidet bei vielen Mandaten nicht der erfahrenste,
          sondern der schnellste Makler. Eine KI, die in Sekunden reagiert,
          verschiebt das Spielfeld.
        </li>
        <li>
          <strong className="text-charcoal">Volumen pro Objekt.</strong>{' '}
          Ein typisches Berliner Mietobjekt kann <strong>eine Vielzahl von
          Anfragen</strong> in den ersten 48 Stunden generieren. Ohne Automatisierung gehen
          dabei systematisch Leads verloren.
        </li>
        <li>
          <strong className="text-charcoal">Zweisprachigkeit.</strong> Berliner
          Maklerbüros mit internationalen Käuferinnen und Käufern brauchen
          eine konsistente englischsprachige Erstreaktion — Immob24 liefert
          sie standardmäßig.
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
        Auch interessant für Makler in:
      </h2>
      <RevealGroup stagger={60} className="mt-5 flex flex-wrap gap-3">
        {[
          { label: 'München', path: '/de/maklersoftware/muenchen' },
          { label: 'Hamburg', path: '/de/maklersoftware/hamburg' },
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
        Jetzt starten: Immob24 für Ihr Berliner Maklerbüro
      </h2>
      <p className="mt-5 text-white/75 leading-relaxed">
        Wir richten Immob24 für Ihr Berliner Maklerbüro in der Regel innerhalb
        eines Tages ein, schließen Ihre Portale, Postfächer und Website an
        und gehen gemeinsam live. Sie sehen vom ersten Tag, was die KI für
        Sie übernimmt.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <button
          type="button"
          {...DEMO_CTA_PROPS}
          onClick={() => trackEvent('seo_city_cta_click', { city: 'berlin', position: 'final' })}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-golden text-[#1E1B16] px-6 py-3 text-base font-semibold hover:bg-golden/90 transition-colors"
        >
          Demo für Berlin anfragen
          <ArrowRight className="h-4 w-4" />
        </button>
        <Link
          to="/de/beta-agentenprogramm"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-base font-medium text-white hover:bg-white/5 transition-colors"
        >
          Beta-Programm für Berlin
        </Link>
      </div>
    </div>
  </section>
);

export default function MaklersoftwareBerlin() {
  useDocumentMeta({
    title: 'Maklersoftware Berlin | KI für Berliner Makler | Immob24',
    description:
      'Maklersoftware für Berliner Immobilienmakler: KI-gestützte Automatisierung für schnelle Lead-Reaktion, Qualifizierung & Terminlogik — auch zweisprachig.',
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
        { name: 'Berlin', path: PAGE_PATH },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        name: 'Immob24 Maklersoftware Berlin',
        description:
          'KI-gestützte Maklersoftware für Immobilienmakler in Berlin — Lead-Reaktion in Sekunden, automatische Qualifizierung, Terminlogik, zweisprachig.',
        brand: { '@type': 'Brand', name: 'Immob24' },
        areaServed: {
          '@type': 'City',
          name: 'Berlin',
          sameAs: 'https://de.wikipedia.org/wiki/Berlin',
        },
        offers: {
          '@type': 'Offer',
          price: '249',
          priceCurrency: 'EUR',
          url: PAGE_URL,
        },
      },
    ],
    'maklersoftware-berlin',
  );

  useFaqSchema(FAQS, 'de', 'maklersoftware-berlin');

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
        <WhyBerlin />
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
