// SEO landing page (hub): KI für Immobilienmakler — Übersicht
// Spec source: docs/SEO_OPTIMIZATION_STRATEGY (Part 2, Page 3)
//
// This is the flagship informational page — longest content, Article schema,
// links out to every city page. Bracketed `[…]` strings are placeholders for
// verifiable stats that should be filled before lifting noindex.

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
import { Reveal, RevealGroup } from '../../lib/animations';
import { trackEvent } from '../../lib/analytics';
import { useDocumentMeta } from '../../lib/useDocumentMeta';
import { useFaqSchema } from '../../lib/useFaqSchema';
import { useJsonLd } from '../../lib/useJsonLd';
import { breadcrumbSchema } from '../../lib/schema';
import { SITE_ORIGIN } from '../../i18n/pages';

const PAGE_PATH = '/de/ki-fuer-immobilienmakler';
const PAGE_URL = `${SITE_ORIGIN}${PAGE_PATH}`;
const EN_URL = `${SITE_ORIGIN}/en/ai-for-real-estate-agents`;

const FAQS: Array<{ q: string; a: string }> = [
  {
    q: 'Ersetzt KI den Immobilienmakler?',
    a: 'Nein. KI ersetzt nicht das, was Sie als Makler wirklich wertvoll macht — Vertrauen, lokale Marktkenntnis, Verhandlungsgeschick, persönliche Beratung. Sie ersetzt die zeitintensiven, repetitiven Aufgaben drumherum: Erstreaktion, Standard-Qualifizierungsfragen, Terminkoordination, Follow-up. Das Ergebnis: Sie investieren Ihre Zeit dort, wo sie den höchsten Wert hat.',
  },
  {
    q: 'Welche KI-Tools für Immobilienmakler gibt es 2026?',
    a: 'Der Markt teilt sich grob in vier Gruppen: (1) KI-Texthilfen für Exposés (z. B. Schreibassistenten), (2) Bewertungsmodelle für Immobilienpreise, (3) Bildgenerierung und virtuelles Staging, (4) Konversations- und Workflow-KI für Lead-Reaktion und Qualifizierung. Immob24 gehört zur vierten Gruppe und konzentriert sich bewusst auf die operative Strecke zwischen Anfrage und Termin.',
  },
  {
    q: 'Wie viel kostet eine KI-Maklersoftware?',
    a: 'Die Preisspanne ist weit: Einzelne KI-Schreibhilfen starten bei wenigen Euro pro Monat, vollständige Konversations- und Workflow-Plattformen liegen zwischen ca. 100 € und 600 € pro Monat pro Maklerbüro. Immob24 beginnt bei 249 € pro Monat. Entscheidend ist nicht der Listenpreis, sondern wie viele Stunden pro Woche das Tool tatsächlich einspart und wie viele zusätzliche Mandate sich daraus ergeben.',
  },
  {
    q: 'Kann ich KI auch ohne technische Vorkenntnisse nutzen?',
    a: 'Ja. Moderne KI-Tools für Makler sind so gebaut, dass sie ohne IT-Abteilung funktionieren. Immob24 wird in einem Onboarding-Gespräch eingerichtet — Sie verbinden Ihre Portale und Postfächer, geben Beispiele typischer Anfragen vor, und die KI ist startklar. Kein Code, keine Schulung über mehrere Tage.',
  },
  {
    q: 'Ist KI für kleine Maklerbüros geeignet?',
    a: 'Gerade kleine Büros profitieren überdurchschnittlich. Ein Ein- bis Dreipersonen-Büro hat keine Kapazität für eine eigene Lead-Hotline rund um die Uhr — die KI übernimmt genau diese Rolle. Wenn die Inhaberin oder der Inhaber selbst auf Termin ist, antwortet trotzdem jemand. So bleiben auch Wochenend- und Abendanfragen verlässlich bedient.',
  },
  {
    q: 'Welche Daten braucht die KI für Immobilienmakler?',
    a: 'Im Kern: Ihre aktuellen Objekte (Exposé-Texte, Lage, Preis, Verfügbarkeit), Ihre üblichen Qualifizierungsfragen und Ihr Kalender für die Terminlogik. Keine sensiblen Bestandskundendaten oder Verträge sind nötig, damit die KI für Erstreaktion und Qualifizierung arbeitet.',
  },
  {
    q: 'Wie sicher sind meine Daten bei einer KI-Maklersoftware?',
    a: 'Bei Immob24 werden Daten in der EU verarbeitet, Auftragsverarbeitungsverträge (AVV) liegen vor. Anfragen und Kommunikation werden ausschließlich zum Betrieb der Plattform genutzt und nicht zum Trainieren externer Modelle. Details und unsere DSGVO-Dokumentation erhalten Sie auf Anfrage.',
  },
  {
    q: 'Kann KI auch bei der Immobilienbewertung helfen?',
    a: 'Ja, aber das ist ein eigener Tooltyp (AVM — Automated Valuation Model). Spezialisierte Bewertungsplattformen liefern Indikationspreise auf Basis von Lage, Bauart und Vergleichsobjekten. Immob24 ist auf Konversations- und Workflow-KI fokussiert; eine Anbindung an Bewertungs-APIs ist möglich, aber nicht der Kernfokus.',
  },
];

const TOC = [
  { id: 'was-ki-leistet', label: 'Was KI für Makler wirklich leistet' },
  { id: 'zeitfresser', label: 'Die 5 größten Zeitfresser — und wie KI sie löst' },
  { id: 'positioning', label: 'Immob24: Die KI-Ausführungsschicht' },
  { id: 'staedte', label: 'KI für Makler in Ihrer Stadt' },
  { id: 'faq', label: 'Häufige Fragen' },
];

const Hero = () => (
  <section
    id="top"
    className="relative pt-36 pb-16 md:pt-44 md:pb-20 overflow-hidden bg-gradient-to-b from-cream to-white"
  >
    <div className="container max-w-4xl">
      <nav aria-label="Brotkrumen" className="mb-6 flex items-center gap-1 text-xs text-slate">
        <Link to="/de" className="hover:text-charcoal">Start</Link>
        <ChevronRight className="h-3 w-3 text-warm-gray" />
        <span className="text-charcoal">KI für Immobilienmakler</span>
      </nav>

      <p className="inline-flex items-center gap-2 rounded-full bg-golden/10 px-3 py-1 text-xs font-semibold text-golden-dark">
        <Sparkles className="h-3.5 w-3.5" /> Ratgeber — Lesezeit ca. 8 Minuten
      </p>

      <h1 className="mt-5 font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal leading-tight">
        KI für Immobilienmakler: So nutzen Sie künstliche Intelligenz in Ihrem Maklerbüro
      </h1>

      <p className="mt-5 text-lg text-slate leading-relaxed">
        Künstliche Intelligenz ist im Makleralltag angekommen — aber nicht
        überall dort, wo der Marketing-Lärm es vermuten lässt. Dieser
        Ratgeber zeigt nüchtern, was KI für Immobilienmakler heute wirklich
        leistet, welche fünf Aufgaben sich zuverlässig automatisieren lassen
        und wie ein modernes Maklerbüro KI als Ausführungsschicht zwischen
        Anfrage und Abschluss einsetzt — ohne den persönlichen Charakter
        des Maklerberufs zu verlieren.
      </p>

      <div className="mt-8 rounded-2xl border border-charcoal/10 bg-white px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-warm-gray">
          Inhaltsverzeichnis
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
  <section id="was-ki-leistet" className="py-16 bg-white">
    <div className="container max-w-3xl">
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal">
        Was KI für Immobilienmakler wirklich leistet
      </h2>
      <p className="mt-5 text-slate leading-relaxed">
        Vorab eine Klarstellung: KI ersetzt keinen Immobilienmakler.
        Vertrauen, lokale Marktkenntnis, Verhandlung am Küchentisch — das
        bleibt menschlich. Was KI heute zuverlässig kann, ist die
        zeitintensive operative Strecke drumherum: <strong>Erstreaktion auf
        neue Anfragen, höfliche Qualifizierungsdialoge, Terminkoordination
        und Follow-up</strong>. Genau diese Aufgaben kosten ein durchschnittliches
        Maklerbüro nach internen Erhebungen{' '}
        <strong>viele Stunden pro Woche und Mitarbeiter*in</strong> — Stunden, die
        nicht in Beratungsgespräche oder Vertragsabschlüsse fließen.
      </p>
      <p className="mt-4 text-slate leading-relaxed">
        Die spannende Frage für 2026 ist deshalb nicht „Soll ich KI
        einsetzen?", sondern „<em>Wo</em> setze ich sie ein, damit sie
        meinen Tag verändert?". Der Rest dieses Ratgebers beantwortet genau
        diese Frage entlang von fünf konkreten Zeitfressern im Makleralltag.
      </p>

      <div className="mt-8 rounded-2xl bg-cream/60 border border-charcoal/5 px-5 py-4 text-sm text-slate">
        <p className="font-semibold text-charcoal">In Kürze</p>
        <ul className="mt-2 space-y-1 list-disc pl-5">
          <li>KI ersetzt Erstreaktion, Qualifizierung und Terminlogik — nicht den Makler.</li>
          <li>Die größten Gewinne entstehen bei Geschwindigkeit und Konsistenz, nicht bei Kreativität.</li>
          <li>Auch kleine Maklerbüros (1–5 Personen) profitieren überdurchschnittlich.</li>
          <li>Datenschutz, DSGVO-Konformität und EU-Hosting sind 2026 Pflicht, kein Bonus.</li>
        </ul>
      </div>
    </div>
  </section>
);

const PainPoints = () => (
  <section id="zeitfresser" className="py-16 bg-cream">
    <div className="container max-w-3xl">
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal">
        Die 5 größten Zeitfresser im Makleralltag — und wie KI sie löst
      </h2>
      <p className="mt-5 text-slate leading-relaxed">
        Jeder der fünf folgenden Bereiche bringt im Schnitt mehrere Stunden
        pro Woche zurück — bei vergleichsweise geringem Implementierungsaufwand.
      </p>

      {[
        {
          icon: Zap,
          n: 1,
          title: 'Sofortige Reaktion auf neue Anfragen',
          painPoint:
            'Eine ImmoScout24-Anfrage trifft um 21:47 ein. Die typische Antwortzeit eines durchschnittlichen Maklerbüros liegt zwischen 4 und 24 Stunden. In dieser Zeit hat der Interessent oft schon zwei oder drei andere Makler kontaktiert.',
          beforeAfter:
            'Vorher: 4–24 Stunden Antwortzeit, Lead wandert weiter. Nachher mit KI: Antwort in unter 3 Sekunden — der Interessent ist im Gespräch, bevor er die nächste Anzeige öffnet.',
        },
        {
          icon: Brain,
          n: 2,
          title: 'Automatische Lead-Qualifizierung per KI',
          painPoint:
            'Von zehn neuen Anfragen sind im Schnitt nur zwei oder drei wirklich kaufbereit. Den Unterschied herauszufinden — Budget, Finanzierung, Zeitrahmen, Eigennutzung oder Kapitalanlage — kostet pro Lead 10 bis 20 Minuten Telefonat.',
          beforeAfter:
            'Vorher: Jedes Lead wird manuell durchqualifiziert, auch die nicht kaufreifen. Nachher: Die KI führt einen höflichen, kurzen Dialog und markiert eindeutig, welche Leads in die Terminlogik wandern.',
        },
        {
          icon: CalendarClock,
          n: 3,
          title: 'KI-gestützte Terminlogik ohne manuelle Abstimmung',
          painPoint:
            'Die typische Terminfindung dauert 4–7 E-Mails: „Mittwoch 14 Uhr?" — „Ginge auch 16 Uhr?" — „Lieber Donnerstag" — und so weiter.',
          beforeAfter:
            'Vorher: Stunden pro Woche in Postfach-Pingpong. Nachher: Die KI schlägt direkt zwei bis drei passende Termine vor, abgeglichen mit Ihrem Kalender — der Interessent klickt einen an, fertig.',
        },
        {
          icon: MailCheck,
          n: 4,
          title: 'Follow-up-Automatisierung für mehr Abschlüsse',
          painPoint:
            'Statistisch fallen ca. 80 % aller Mandate erst nach dem fünften Kontakt — aber das durchschnittliche Maklerbüro folgt nur zweimal nach. Der Rest wird vergessen oder absichtlich weggelassen, weil keine Zeit ist.',
          beforeAfter:
            'Vorher: Lead schläft nach Termin Nr. 1 ein. Nachher: Die KI fasst automatisch und höflich nach — angepasst an die jeweilige Phase, ohne aufdringlich zu wirken.',
        },
        {
          icon: TrendingUp,
          n: 5,
          title: 'Datenauswertung & Priorisierung',
          painPoint:
            'Welche Portale liefern die besten Leads? Welche Mitarbeiter*innen schließen die meisten Termine? Wo verlieren wir die meisten Anfragen? Ohne System bleibt das Bauchgefühl.',
          beforeAfter:
            'Vorher: Keine belastbaren Zahlen, keine Optimierung. Nachher: Die KI führt Buch über Reaktionszeiten, Conversion-Raten und Lead-Quellen — wöchentliches Reporting auf einen Blick.',
        },
      ].map((p) => (
        <div
          key={p.n}
          id={`schritt-${p.n}`}
          className="mt-10 rounded-2xl bg-white border border-charcoal/10 px-6 py-6 shadow-subtle"
        >
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-golden/15 p-2 text-golden-dark">
              <p.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-warm-gray">
                Zeitfresser {p.n}
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
            <strong className="text-charcoal">Vorher / Nachher:</strong>{' '}
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
        Immob24: Die KI-Ausführungsschicht für Makler
      </h2>
      <p className="mt-5 text-slate leading-relaxed">
        Wer den Markt für Maklersoftware betrachtet, sieht vor allem eines:
        viele <em>Datenbanken</em>. Klassische CRMs für Immobilienmakler sind
        passive Speicher — Sie tragen ein, was passiert ist. Immob24 ist
        explizit anders gebaut: Es ist die <strong>aktive Ausführungsschicht</strong>
        {' '}zwischen Anfrage und Abschluss. Während ein CRM dokumentiert,
        <em> tut</em> Immob24 etwas — antworten, qualifizieren, planen,
        nachfassen.
      </p>
      <p className="mt-4 text-slate leading-relaxed">
        Praktisch heißt das: Immob24 ersetzt Ihr CRM nicht. Es ergänzt es.
        Stammdaten bleiben, wo sie sind. Die KI übernimmt die operative
        Strecke, die heute manuell läuft — und gibt Ihnen am Ende die
        wirklich qualifizierten Termine zurück.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          {...DEMO_CTA_PROPS}
          onClick={() => trackEvent('seo_hub_cta_click', { position: 'positioning' })}
          className="inline-flex items-center justify-center gap-2 rounded-full band-dark bg-charcoal text-white px-6 py-3 text-base font-semibold hover:bg-charcoal/90 transition-colors"
        >
          Demo anfragen
          <ArrowRight className="h-4 w-4" />
        </button>
        <Link
          to="/de/immobilien-crm-alternative"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-charcoal/15 px-6 py-3 text-base font-medium text-charcoal hover:bg-cream transition-colors"
        >
          Warum kein klassisches CRM?
        </Link>
      </div>
    </div>
  </section>
);

const CityLinks = () => (
  <section id="staedte" className="py-16 bg-cream">
    <div className="container max-w-3xl">
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal">
        KI für Makler in Ihrer Stadt
      </h2>
      <p className="mt-4 text-slate leading-relaxed">
        Wie sich KI in der Praxis konkret auswirkt, hängt vom lokalen Markt
        ab. Lesen Sie unsere Stadt-Seiten für die Details:
      </p>
      <RevealGroup className="mt-6 grid sm:grid-cols-2 gap-3">
        {[
          {
            title: 'KI-Maklersoftware in München',
            body: 'Wettbewerbsintensiver Markt, hohe Preise, Anfragen an mehrere Makler gleichzeitig.',
            path: '/de/maklersoftware/muenchen',
          },
          {
            title: 'KI-Maklersoftware in Berlin',
            body: 'Hauptstadt-Tempo, internationale Käuferschicht, zweisprachige Anfragen.',
            path: '/de/maklersoftware/berlin',
          },
          {
            title: 'KI-Maklersoftware in Hamburg',
            body: 'HafenCity-Effekt, hohe Anfragequalität in Top-Lagen, gut informierte Interessenten.',
            path: '/de/maklersoftware/hamburg',
          },
          {
            title: 'CRM-Alternative für Immobilienmakler',
            body: 'Vergleich Immob24 vs. onOffice, FLOWFACT, Propstack.',
            path: '/de/immobilien-crm-alternative',
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
              Lesen <ArrowRight className="h-3 w-3" />
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
        Häufige Fragen zu KI für Immobilienmakler
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

const FinalCta = () => (
  <section className="py-20 band-dark bg-charcoal text-white">
    <div className="container max-w-3xl text-center">
      <Bot className="h-10 w-10 text-golden mx-auto" />
      <h2 className="mt-4 font-heading text-3xl md:text-4xl font-bold text-white">
        Bereit, KI in Ihrem Maklerbüro zu testen?
      </h2>
      <p className="mt-5 text-white/75 leading-relaxed">
        Sehen Sie in einer kurzen Demo, wie Immob24 die fünf Zeitfresser in
        Ihrem konkreten Maklerbüro adressiert. Kein langes Verkaufsgespräch,
        kein Vertrag, einfach ein klarer Blick auf das, was sich
        automatisieren lässt.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <button
          type="button"
          {...DEMO_CTA_PROPS}
          onClick={() => trackEvent('seo_hub_cta_click', { position: 'final' })}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-golden text-[#1E1B16] px-6 py-3 text-base font-semibold hover:bg-golden/90 transition-colors"
        >
          Demo anfragen
          <ArrowRight className="h-4 w-4" />
        </button>
        <Link
          to="/de/preise"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-base font-medium text-white hover:bg-white/5 transition-colors"
        >
          Preise ansehen
        </Link>
      </div>
    </div>
  </section>
);

export default function KiFuerImmobilienmakler() {
  useDocumentMeta({
    title: 'KI für Immobilienmakler 2026 | Ratgeber & Tools | Immob24',
    description:
      'KI für Immobilienmakler: Wie künstliche Intelligenz Lead-Reaktion, Qualifizierung & Follow-up automatisiert — fünf Zeitfresser, konkrete Lösungen, Praxisbeispiele.',
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
        { name: 'KI für Immobilienmakler', path: PAGE_PATH },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline:
          'KI für Immobilienmakler: So nutzen Sie künstliche Intelligenz in Ihrem Maklerbüro',
        description:
          'Ratgeber zu KI für Immobilienmakler mit Praxisbeispielen, fünf konkreten Zeitfressern und Lösungen.',
        inLanguage: 'de-DE',
        about: {
          '@type': 'Thing',
          name: 'Künstliche Intelligenz für Immobilienmakler',
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
    'ki-fuer-immobilienmakler',
  );

  useFaqSchema(FAQS, 'de', 'ki-fuer-immobilienmakler');

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
      <Reveal>
        <Faq />
      </Reveal>
      <Reveal>
        <FinalCta />
      </Reveal>
      <Footer />
    </div>
  );
}
