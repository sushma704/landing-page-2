// SEO landing page: Maklersoftware für München
// Spec source: docs/SEO_OPTIMIZATION_STRATEGY (Part 2, Page 1)
//
// Page is intentionally NOT in i18n/pages.ts — it is German-only and uses
// useDocumentMeta directly so no fake EN hreflang is emitted.
//
// Bracketed `[…]` strings are deliberate placeholders for verifiable facts
// (agent counts, market data). Replace with sourced numbers before lifting
// the noindex lockdown.

import { ArrowRight, ChevronRight, Clock, MapPin, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header, Footer, DEMO_CTA_PROPS } from '../../components/SiteChrome';
import { trackEvent } from '../../lib/analytics';
import { useDocumentMeta } from '../../lib/useDocumentMeta';
import { useFaqSchema } from '../../lib/useFaqSchema';
import { useJsonLd } from '../../lib/useJsonLd';
import { breadcrumbSchema } from '../../lib/schema';
import { SITE_ORIGIN } from '../../i18n/pages';

const PAGE_PATH = '/de/maklersoftware/muenchen';
const PAGE_URL = `${SITE_ORIGIN}${PAGE_PATH}`;
const EN_URL = `${SITE_ORIGIN}/en/real-estate-agent-software/munich`;

const FAQS: Array<{ q: string; a: string }> = [
  {
    q: 'Was kostet eine Maklersoftware für Münchner Makler?',
    a: 'Immob24 startet bei 249 € pro Monat. Damit erhalten Münchner Maklerbüros Lead-Reaktion in Sekunden, automatische Qualifizierung und Terminlogik — ohne zusätzliche CRM-Lizenzen. Genaue Preise und Pakete finden Sie auf unserer Preisseite.',
  },
  {
    q: 'Ist Immob24 auch für kleine Maklerbüros in München geeignet?',
    a: 'Ja. Immob24 ist bewusst so gebaut, dass auch ein- bis dreiköpfige Maklerbüros in München sofort produktiv werden. Sie brauchen keine eigene IT-Abteilung und keinen Implementierungspartner — die Einrichtung dauert weniger als einen Arbeitstag.',
  },
  {
    q: 'Kann Immob24 mit bestehenden CRM-Systemen in München genutzt werden?',
    a: 'Ja. Immob24 ersetzt Ihr CRM nicht, sondern ergänzt es als KI-Ausführungsschicht: Es übernimmt Erstreaktion, Qualifizierung und Follow-up, während Ihr CRM weiterhin Stammdaten verwaltet. Eine Anbindung an gängige Maklersysteme ist Teil der Einrichtung.',
  },
  {
    q: 'Wie schnell kann ich Immob24 in meinem Münchner Maklerbüro einrichten?',
    a: 'Ein typisches Münchner Maklerbüro ist innerhalb eines Tages startklar. Die KI lernt anhand Ihrer typischen Objekte und Kundenfragen, und wir begleiten Sie persönlich bei der Anbindung Ihrer Portale und Postfächer.',
  },
  {
    q: 'Unterscheidet sich der Münchner Immobilienmarkt von anderen Städten?',
    a: 'Ja, deutlich. München ist einer der teuersten und zugleich wettbewerbsintensivsten Märkte Deutschlands. Anfragen kommen oft parallel an mehrere Makler — der schnellere bekommt das Mandat. Genau dafür ist die Reaktion in Sekunden statt Stunden gedacht.',
  },
];

const Hero = () => (
  <section
    id="top"
    className="relative pt-36 pb-20 md:pt-44 md:pb-24 overflow-hidden bg-gradient-to-b from-cream to-white"
  >
    <div className="container">
      <nav
        aria-label="Brotkrumen"
        className="mb-6 flex items-center gap-1 text-xs text-slate"
      >
        <Link to="/de" className="hover:text-charcoal">
          Start
        </Link>
        <ChevronRight className="h-3 w-3 text-warm-gray" />
        <span className="text-warm-gray">Maklersoftware</span>
        <ChevronRight className="h-3 w-3 text-warm-gray" />
        <span className="text-charcoal">München</span>
      </nav>

      <p className="inline-flex items-center gap-2 rounded-full bg-golden/10 px-3 py-1 text-xs font-semibold text-golden-dark">
        <MapPin className="h-3.5 w-3.5" /> Lokaler Fokus: München
      </p>

      <h1 className="mt-5 font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal leading-tight max-w-3xl">
        Maklersoftware für Immobilienmakler in München
      </h1>

      <p className="mt-5 max-w-2xl text-lg text-slate leading-relaxed">
        Münchner Anfragen warten nicht. Immob24 antwortet in unter drei Sekunden,
        qualifiziert Interessenten automatisch und übernimmt Terminlogik und
        Follow-up — damit Ihr Maklerbüro Mandate gewinnt, statt sie an schnellere
        Wettbewerber zu verlieren.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          {...DEMO_CTA_PROPS}
          onClick={() => trackEvent('seo_city_cta_click', { city: 'muenchen', position: 'hero' })}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-charcoal text-white px-6 py-3 text-base font-semibold hover:bg-charcoal/90 transition-colors"
        >
          Demo für München anfragen
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
        Die Herausforderung für Münchner Makler
      </h2>
      <p className="mt-5 text-slate leading-relaxed">
        München gehört zu den dichtesten Maklermärkten Deutschlands.
        Der Markt in der Region München-Oberbayern ist entsprechend
        umkämpft. Wer eine Münchner Immobilie verkaufen oder vermieten will,
        kontaktiert in der Regel mehrere Makler parallel — über
        ImmoScout24, Immowelt oder direkt per E-Mail.
      </p>
      <p className="mt-4 text-slate leading-relaxed">
        Wer als Erstes reagiert, gewinnt das Vertrauen — und meistens auch
        das Mandat. In einem Markt mit{' '}
        <strong>den höchsten Quadratmeterpreisen Deutschlands</strong>{' '}
        ist jedes nicht beantwortete Lead bares Geld. Genau hier setzt
        Immob24 an: Während Sie noch lesen, hat das System bereits geantwortet,
        qualifiziert und einen Termin vorgeschlagen.
      </p>

      <div className="mt-10 grid md:grid-cols-3 gap-4">
        {[
          {
            icon: Clock,
            label: 'Antwort in &lt; 3 Sekunden',
            body: 'Ihre Münchner Anfrage wartet keine Stunde mehr auf eine erste Reaktion.',
          },
          {
            icon: TrendingUp,
            label: 'Mehr Mandate aus gleichem Anfragevolumen',
            body: 'Schnellere Reaktion erhöht die Wahrscheinlichkeit, dass aus einer Anfrage ein Termin wird.',
          },
          {
            icon: MapPin,
            label: 'Auf den Münchner Markt zugeschnitten',
            body: 'Die KI versteht Münchner Lagebeschreibungen — Schwabing, Bogenhausen, Sendling — und priorisiert entsprechend.',
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
      </div>
    </div>
  </section>
);

const Solution = () => (
  <section className="py-20 bg-cream">
    <div className="container max-w-3xl">
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal">
        Wie Immob24 Münchner Maklerbüros entlastet
      </h2>
      <p className="mt-5 text-slate leading-relaxed">
        Immob24 ist nicht „noch ein CRM". Es ist die Ausführungsschicht
        zwischen Anfrage und Abschluss: Sobald ein Interessent über ein
        Portal oder direkt auf Ihrer Website eine Anfrage stellt, übernimmt
        die KI in deutscher Sprache die erste Konversation, klärt Budget,
        Zeitrahmen und Finanzierung — und schiebt einen Terminvorschlag in
        Ihren Kalender, sobald ein Lead qualifiziert ist.
      </p>
      <p className="mt-4 text-slate leading-relaxed">
        Für Münchner Maklerbüros heißt das konkret: Sie verbringen weniger
        Zeit mit Erstanrufen und kalter Qualifizierung — und mehr Zeit mit
        den Terminen, die wirklich Umsatz bringen.
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
            Automatische Lead-Reaktion in 3 Sekunden
          </h3>
          <p className="mt-3 text-slate leading-relaxed">
            Jede neue Münchner Anfrage erhält in Sekunden eine fachlich
            korrekte Antwort. Die KI nimmt Bezug auf das konkrete Objekt,
            klärt offene Punkte und positioniert Sie als reaktionsstarken
            Ansprechpartner — auch um 22 Uhr oder am Sonntag.
          </p>
        </div>
        <div>
          <h3 className="font-heading text-xl font-bold text-charcoal">
            Intelligente Lead-Qualifizierung für den Münchner Markt
          </h3>
          <p className="mt-3 text-slate leading-relaxed">
            Budget, Finanzierungsstatus, gewünschte Lage, Eigennutzung oder
            Kapitalanlage: Die KI führt einen kurzen, höflichen Dialog und
            markiert eindeutig, welche Interessenten kaufbereit sind und
            welche nur sondieren.
          </p>
        </div>
        <div>
          <h3 className="font-heading text-xl font-bold text-charcoal">
            Terminlogik &amp; Follow-up ohne manuellen Aufwand
          </h3>
          <p className="mt-3 text-slate leading-relaxed">
            Qualifizierte Anfragen werden direkt mit Ihrem Kalender abgeglichen
            und bekommen einen passenden Besichtigungstermin. Wer nicht erscheint,
            wird automatisch nachgefasst.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const WhyMunich = () => (
  <section className="py-20 bg-cream">
    <div className="container max-w-3xl">
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal">
        Warum gerade Münchner Makler von KI profitieren
      </h2>
      <p className="mt-5 text-slate leading-relaxed">
        Der Münchner Markt ist geprägt von hohen Preisen, hoher Nachfrage
        und sehr kurzen Reaktionsfenstern. Drei Aspekte machen den Unterschied:
      </p>
      <ul className="mt-5 space-y-3 text-slate">
        <li>
          <strong className="text-charcoal">Anfragevolumen pro Objekt:</strong>{' '}
          Ein attraktives Münchner Objekt kann innerhalb von 24 Stunden{' '}
          <strong>zahlreiche Anfragen</strong> generieren. Manuell ist diese Welle
          kaum sauber zu bearbeiten — die KI nimmt jede Anfrage zuverlässig an.
        </li>
        <li>
          <strong className="text-charcoal">Wert pro Mandat:</strong> Bei den
          Münchner Preisniveaus zahlt sich jedes zusätzlich gewonnene Mandat
          ein Vielfaches der Software-Kosten zurück.
        </li>
        <li>
          <strong className="text-charcoal">Stadtteil-Spezifika:</strong> Die
          Sprache der Anfragen aus Schwabing unterscheidet sich von Bogenhausen
          oder Pasing. Immob24 lernt Ihre lokale Tonalität und Standardfragen.
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
          <details
            key={item.q}
            className="group py-5"
          >
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
      <div className="mt-5 flex flex-wrap gap-3">
        {[
          { label: 'Berlin', path: '/de/maklersoftware/berlin' },
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
      </div>
    </div>
  </section>
);

const FinalCta = () => (
  <section className="py-20 bg-charcoal text-white">
    <div className="container max-w-3xl text-center">
      <h2 className="font-heading text-3xl md:text-4xl font-bold">
        So starten Sie mit Immob24 in München
      </h2>
      <p className="mt-5 text-white/75 leading-relaxed">
        Wir richten Immob24 für Ihr Münchner Maklerbüro innerhalb eines
        Tages ein, schließen Ihre Portale und Postfächer an und schalten die
        KI gemeinsam mit Ihnen live. Sie sehen vom ersten Tag an, welche
        Anfragen ankommen, wer qualifiziert ist und wann der nächste Termin
        steht.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <button
          type="button"
          {...DEMO_CTA_PROPS}
          onClick={() => trackEvent('seo_city_cta_click', { city: 'muenchen', position: 'final' })}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-golden text-charcoal px-6 py-3 text-base font-semibold hover:bg-golden/90 transition-colors"
        >
          Demo für München anfragen
          <ArrowRight className="h-4 w-4" />
        </button>
        <Link
          to="/de/beta-agentenprogramm"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-base font-medium text-white hover:bg-white/5 transition-colors"
        >
          Beta-Programm für München
        </Link>
      </div>
    </div>
  </section>
);

export default function MaklersoftwareMuenchen() {
  useDocumentMeta({
    title: 'Maklersoftware München | KI für Münchner Makler | Immob24',
    description:
      'Maklersoftware für Münchner Immobilienmakler: KI-gestützte Lead-Reaktion in 3 Sekunden, automatische Qualifizierung & Terminlogik. Demo für München anfragen.',
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
        { name: 'München', path: PAGE_PATH },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        name: 'Immob24 Maklersoftware München',
        description:
          'KI-gestützte Maklersoftware für Immobilienmakler in München — Lead-Reaktion in Sekunden, automatische Qualifizierung, Terminlogik.',
        brand: { '@type': 'Brand', name: 'Immob24' },
        areaServed: {
          '@type': 'City',
          name: 'München',
          sameAs: 'https://de.wikipedia.org/wiki/M%C3%BCnchen',
        },
        offers: {
          '@type': 'Offer',
          price: '249',
          priceCurrency: 'EUR',
          url: PAGE_URL,
        },
      },
    ],
    'maklersoftware-muenchen',
  );

  useFaqSchema(FAQS, 'de', 'maklersoftware-muenchen');

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Challenge />
      <Solution />
      <Features />
      <WhyMunich />
      <Faq />
      <RelatedCities />
      <FinalCta />
      <Footer />
    </div>
  );
}
