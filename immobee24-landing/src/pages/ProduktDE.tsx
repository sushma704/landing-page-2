import { useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react';
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  HelpCircle,
  Layers,
  MessageSquare,
  Repeat,
  Sparkles,
  Target,
  Users,
  Zap,
} from 'lucide-react';
import { Header, Footer, TALLY_PROPS } from '../components/SiteChrome';
import { trackEvent } from '../lib/analytics';
import { useDocumentMeta } from '../lib/useDocumentMeta';

function useInView<T extends HTMLElement>(threshold = 0.1) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        });
      },
      { threshold },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const RevealOnScroll = ({ children }: { children: ReactNode }) => {
  const { ref, inView } = useInView<HTMLDivElement>(0.05);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {children}
    </div>
  );
};

const Hero = () => (
  <section
    id="top"
    className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-gradient-to-b from-cream to-white"
  >
    <div
      aria-hidden
      className="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-gradient-golden opacity-20 blur-3xl"
    />
    <div
      aria-hidden
      className="absolute -bottom-40 -left-24 w-[24rem] h-[24rem] rounded-full bg-golden/10 blur-3xl"
    />
    <div className="container relative">
      <div className="max-w-3xl mx-auto text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-golden/30 bg-white px-4 py-1.5 text-xs font-medium text-golden-dark shadow-subtle">
          <Sparkles className="h-3.5 w-3.5" />
          Produkt
        </span>

        <h1 className="mt-6 font-heading text-hero-mobile md:text-hero text-charcoal text-balance">
          Das KI-System für Immobilienmakler, das auf Ihrem Workflow arbeitet.
        </h1>

        <p className="mt-6 text-body-lg text-slate max-w-2xl mx-auto">
          Immob24 wurde für Maklerbüros entwickelt, die neue Anfragen schneller beantworten,
          Interessenten automatisch qualifizieren und weniger Zeit mit manueller Nachverfolgung
          verlieren wollen. Statt ein weiteres CRM einzuführen, ergänzt Immob24 den bestehenden
          Prozess um schnelle, automatisierte Ausführung.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            {...TALLY_PROPS}
            onClick={() => trackEvent('produkt_hero_primary_cta_click')}
            className="inline-flex items-center gap-2 rounded-full bg-charcoal text-white px-6 py-3 font-medium shadow-golden hover:bg-charcoal/90 transition-colors"
          >
            Demo anfragen
            <ArrowRight className="h-4 w-4" />
          </button>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 bg-white px-6 py-3 font-medium text-charcoal hover:border-charcoal/40 transition-colors"
          >
            So funktioniert's
          </a>
        </div>

        <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 max-w-2xl mx-auto text-left">
          {[
            'Reagiert sofort auf neue Immobilienanfragen.',
            'Qualifiziert Leads automatisch.',
            'Plant nächste Schritte ohne manuelles Hin und Her.',
            'Setzt auf bestehende Prozesse und Systeme auf.',
          ].map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate">
              <CheckCircle2 className="h-4 w-4 mt-0.5 text-honey-green flex-shrink-0" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

const Definition = () => (
  <section id="product" className="py-20 md:py-28 bg-white">
    <div className="container">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
          Was Immob24 ist
        </h2>
        <p className="mt-6 text-body-lg text-slate">
          Immob24 ist ein KI Operating System für Immobilienmakler in Deutschland. Die Plattform
          übernimmt die operative Arbeit zwischen Anfrageeingang und dem nächsten qualifizierten
          Schritt: Antwort, Qualifizierung, Terminlogik und Follow-up. Dadurch gewinnen Maklerbüros
          Geschwindigkeit, Struktur und Entlastung im Tagesgeschäft.
        </p>
      </div>
    </div>
  </section>
);

const AnswerBlock = () => {
  const items = [
    {
      q: 'Ist Immob24 ein CRM?',
      a: 'Nein. Immob24 ist kein klassisches CRM.',
    },
    {
      q: 'Was macht Immob24 stattdessen?',
      a: 'Es führt operative Vertriebsarbeit automatisch aus, statt nur Kontakte und Vorgänge zu speichern.',
    },
    {
      q: 'Für wen ist Immob24 gedacht?',
      a: 'Für Immobilienmakler und Maklerbüros in Deutschland, die schneller reagieren und Routinearbeit reduzieren wollen.',
    },
  ];
  return (
    <section className="pb-16 md:pb-24 bg-white">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-charcoal/10 bg-cream p-6 md:p-8 shadow-subtle"
            >
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-golden-dark">
                <HelpCircle className="h-4 w-4" />
                <span>Q&amp;A</span>
              </div>
              <h3 className="mt-3 font-heading text-xl text-charcoal">{item.q}</h3>
              <p className="mt-3 text-slate leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProblemFit = () => {
  const points = [
    'Langsame Antwortzeiten → Immob24 reagiert sofort.',
    'Unklare Lead-Priorisierung → Immob24 qualifiziert früh im Prozess.',
    'Zu viel Terminabstimmung → Immob24 stößt den nächsten Schritt automatisiert an.',
    'Manuelle Follow-ups → Immob24 hält Gespräche aktiv.',
  ];
  return (
    <section className="py-20 md:py-28 bg-charcoal text-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-balance">
            Warum Maklerbüros ein anderes System brauchen als ein klassisches CRM
          </h2>
          <p className="mt-6 text-body-lg text-white/70">
            Viele Maklerbüros haben kein Datenproblem, sondern ein Reaktionsproblem. Neue Anfragen
            kommen rein, aber die operative Bearbeitung hängt an manueller Disziplin,
            Teamkapazität und Back-and-forth-Kommunikation. Genau in dieser Lücke sitzt Immob24:
            nicht als Datenbank, sondern als KI-Ausführungsschicht für die ersten entscheidenden
            Schritte im Lead-Prozess.
          </p>
        </div>

        <ul className="mt-12 grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {points.map((p, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-5"
            >
              <ArrowRight className="h-5 w-5 text-golden flex-shrink-0 mt-0.5" />
              <span className="text-white/85">{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

type Feature = { icon: ComponentType<{ className?: string }>; title: string; body: string };

const Features = () => {
  const items: Feature[] = [
    {
      icon: Zap,
      title: 'Neue Anfragen sofort beantworten',
      body: 'Sobald ein Lead eingeht, startet Immob24 automatisch die Erstreaktion. Dadurch steigt die Chance auf Kontakt, bevor Interessenten abspringen oder bei anderen Maklern weitermachen.',
    },
    {
      icon: Target,
      title: 'Leads automatisch qualifizieren',
      body: 'Immob24 sammelt wichtige Informationen früh im Gespräch und hilft dabei, Anfragen schneller zu priorisieren. Ihr Team konzentriert sich zuerst auf die Interessenten mit höherer Abschlusswahrscheinlichkeit.',
    },
    {
      icon: CalendarClock,
      title: 'Termine und nächste Schritte koordinieren',
      body: 'Statt jeder manuellen Abstimmung stößt Immob24 den nächsten passenden Prozessschritt an. Das reduziert operative Reibung und beschleunigt die Bearbeitung von Interessenten.',
    },
    {
      icon: Repeat,
      title: 'Follow-ups aktiv halten',
      body: 'Wenn Teams ausgelastet sind, brechen Gespräche oft wegen fehlender Nachverfolgung ab. Immob24 hält den Prozess aktiv und verhindert, dass Leads einfach liegen bleiben.',
    },
    {
      icon: Layers,
      title: 'Auf bestehende Maklerprozesse aufsetzen',
      body: 'Immob24 ist nicht als harter Systemwechsel positioniert. Die Plattform ist dafür gedacht, vorhandene Prozesse zu ergänzen und die operative Ausführung zu automatisieren, ohne ein bestehendes CRM zwingend zu ersetzen.',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-cream to-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            Was Immob24 im Makleralltag übernimmt
          </h2>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-charcoal/10 bg-white p-6 md:p-8 shadow-subtle hover:shadow-card-hover hover:border-golden/30 transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-golden-soft text-golden-dark">
                  <item.icon className="h-5 w-5" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-golden-dark">
                  {`0${i + 1}`}
                </span>
              </div>
              <h3 className="mt-4 font-heading text-xl text-charcoal">{item.title}</h3>
              <p className="mt-3 text-slate leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const UseCases = () => {
  const cases = [
    {
      title: 'Portal-Anfragen schneller bearbeiten',
      body: 'Wenn viele Anfragen parallel eingehen, sorgt Immob24 dafür, dass neue Leads nicht auf manuelle Sichtung warten müssen.',
    },
    {
      title: 'Interessenten früh priorisieren',
      body: 'Makler können schneller erkennen, welche Gespräche zuerst Aufmerksamkeit benötigen, weil die KI die Vorqualifizierung unterstützt.',
    },
    {
      title: 'Besichtigungen effizienter vorbereiten',
      body: 'Durch automatisierte nächste Schritte sinkt die Zahl der manuellen Schleifen in der Terminabstimmung.',
    },
    {
      title: 'Teams operativ entlasten',
      body: 'Makler verbringen weniger Zeit mit wiederkehrender Routinekommunikation und mehr Zeit mit Beratung, Besichtigung und Abschluss.',
    },
  ];
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            Wofür Maklerbüros Immob24 einsetzen
          </h2>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {cases.map((c, i) => (
            <div
              key={i}
              className="rounded-2xl border border-charcoal/10 bg-cream p-6 md:p-8 shadow-subtle"
            >
              <h3 className="font-heading text-xl text-charcoal">{c.title}</h3>
              <p className="mt-3 text-slate leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CrmComparison = () => {
  const rows: Array<{ topic: string; crm: string; immob: string }> = [
    {
      topic: 'Kernfunktion',
      crm: 'Kontakte, Objekte und Vorgänge verwalten.',
      immob: 'Operative Arbeit zwischen Anfrage und nächstem Schritt automatisieren.',
    },
    {
      topic: 'Reaktion auf neue Leads',
      crm: 'Meist manuell durch Team oder Workflow-Setups.',
      immob: 'Sofortige KI-Reaktion auf neue Anfragen.',
    },
    {
      topic: 'Lead-Qualifizierung',
      crm: 'Häufig dokumentations- und workflowbasiert.',
      immob: 'Frühe KI-gestützte Vorqualifizierung.',
    },
    {
      topic: 'Terminlogik',
      crm: 'Abhängig von Teamprozess oder externer Automatisierung.',
      immob: 'In den automatisierten Ablauf eingebettet.',
    },
    {
      topic: 'Positionierung',
      crm: 'System of record.',
      immob: 'AI operating layer auf bestehendem Workflow.',
    },
  ];

  return (
    <section id="crm-alternative" className="py-20 md:py-28 bg-cream">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            Immob24 vs. klassisches CRM
          </h2>
        </div>

        {/* Desktop / tablet table */}
        <div className="mt-12 hidden md:block max-w-5xl mx-auto overflow-hidden rounded-2xl bg-white border border-charcoal/10 shadow-card">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-charcoal text-white text-sm uppercase tracking-wider">
                <th className="px-5 py-4 font-semibold">Thema</th>
                <th className="px-5 py-4 font-semibold">Klassisches CRM</th>
                <th className="px-5 py-4 font-semibold">
                  <span className="inline-flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-golden" />
                    Immob24
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className={`align-top ${
                    i !== rows.length - 1 ? 'border-b border-charcoal/5' : ''
                  }`}
                >
                  <td className="px-5 py-4 font-medium text-charcoal">{row.topic}</td>
                  <td className="px-5 py-4 text-slate">{row.crm}</td>
                  <td className="px-5 py-4 text-charcoal bg-golden/5">{row.immob}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile stacked cards */}
        <div className="mt-12 grid gap-4 md:hidden max-w-xl mx-auto">
          {rows.map((row, i) => (
            <div
              key={i}
              className="rounded-2xl border border-charcoal/10 bg-white p-5 shadow-subtle"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-golden-dark">
                {row.topic}
              </p>
              <div className="mt-3 space-y-3">
                <div>
                  <span className="inline-block min-w-[88px] rounded-full bg-charcoal/5 text-charcoal/70 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                    CRM
                  </span>
                  <p className="mt-1 text-slate">{row.crm}</p>
                </div>
                <div>
                  <span className="inline-block min-w-[88px] rounded-full bg-gradient-golden text-white px-3 py-1 text-xs font-bold uppercase tracking-wider">
                    Immob24
                  </span>
                  <p className="mt-1 text-charcoal">{row.immob}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#book-demo"
            className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 bg-white px-6 py-3 font-medium text-charcoal hover:border-charcoal/40 transition-colors"
          >
            CRM-Alternative ansehen
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

const WhoItsFor = () => {
  const cards = [
    'Kleine Maklerbüros mit hohem Anfrageaufkommen.',
    'Mittelgroße Agenturen mit zu viel manueller Nacharbeit.',
    'Teams, die ihren bestehenden Software-Stack nicht komplett austauschen wollen.',
    'Makler, die Geschwindigkeit im Erstkontakt als Wettbewerbsvorteil nutzen wollen.',
  ];
  return (
    <section id="for-whom" className="py-20 md:py-28 bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            Für wen Immob24 gebaut ist
          </h2>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {cards.map((c, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl border border-charcoal/10 bg-cream p-5 shadow-subtle"
            >
              <Users className="h-5 w-5 text-golden-dark flex-shrink-0 mt-0.5" />
              <span className="text-charcoal">{c}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 max-w-3xl mx-auto rounded-2xl border border-charcoal/15 bg-charcoal/5 p-6 md:p-7">
          <p className="text-xs font-semibold uppercase tracking-wider text-charcoal/60">
            Nicht für
          </p>
          <p className="mt-2 text-charcoal leading-relaxed">
            Immob24 ist nicht die richtige Positionierung für Unternehmen, die primär eine
            klassische Datenbank, ein Portal oder ein reines Listing-Management-System suchen. Der
            Fokus liegt auf Reaktion, Qualifizierung, Follow-up und operativer Automatisierung im
            Maklerprozess.
          </p>
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    'Neue Anfrage kommt rein.',
    'Immob24 reagiert sofort.',
    'Die KI sammelt Informationen und qualifiziert den Lead.',
    'Nächster Schritt wird koordiniert: Termin, Rückfrage oder Follow-up.',
    'Ihr Team steigt dort ein, wo persönliche Beratung den größten Hebel hat.',
  ];
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-gradient-to-b from-cream to-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            Wie Immob24 arbeitet
          </h2>
        </div>

        <ol className="mt-12 relative max-w-3xl mx-auto">
          <span
            aria-hidden
            className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-golden/40 via-golden/20 to-transparent"
          />
          {steps.map((step, i) => (
            <li key={i} className="relative pl-16 pb-8 last:pb-0">
              <span className="absolute left-0 top-0 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-golden text-white font-bold shadow-golden">
                {i + 1}
              </span>
              <div className="rounded-xl bg-white border border-charcoal/5 p-4 md:p-5 shadow-subtle">
                <p className="text-charcoal">{step}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 text-center">
          <button
            type="button"
            {...TALLY_PROPS}
            onClick={() => trackEvent('produkt_how_cta_click')}
            className="inline-flex items-center gap-2 rounded-full bg-charcoal text-white px-6 py-3 font-medium hover:bg-charcoal/90 transition-colors"
          >
            So funktioniert's im Detail
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

const SocialProof = () => {
  const placeholders = [
    '„Wir reagieren jetzt auf jede Anfrage sofort."',
    '„Unser Team spart wöchentlich Zeit bei Nachverfolgung und Terminabstimmung."',
    '„Wir mussten kein neues CRM ausrollen, um schneller zu werden."',
  ];
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            Vertrauen entsteht durch belegbare Ergebnisse
          </h2>
          <p className="mt-4 text-sm text-warm-gray italic">
            Diese Sektion geht erst mit validierten Kundenbelegen live (Logos, Testimonials,
            Workflow-Screenshots, Vorher/Nachher-Ergebnisse). Bis dahin Platzhalter.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {placeholders.map((quote, i) => (
            <figure
              key={i}
              className="rounded-2xl bg-cream border border-charcoal/10 p-6 shadow-subtle"
            >
              <blockquote className="text-charcoal leading-relaxed">{quote}</blockquote>
              <figcaption className="mt-4 text-xs uppercase tracking-wider text-warm-gray">
                Platzhalter
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-charcoal/10 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-start justify-between gap-4 py-5 text-left"
      >
        <span className="font-medium text-charcoal pr-4">{q}</span>
        <span
          aria-hidden
          className={`flex-shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-full bg-charcoal/5 text-charcoal transition-transform ${
            open ? 'rotate-45' : ''
          }`}
        >
          +
        </span>
      </button>
      {open && <p className="pb-5 text-slate leading-relaxed">{a}</p>}
    </div>
  );
};

const FAQ = () => {
  const items = [
    {
      q: 'Ist Immob24 ein CRM?',
      a: 'Nein. Immob24 ist kein klassisches CRM, sondern eine KI-Schicht für Makler-Workflows.',
    },
    {
      q: 'Brauche ich mein bestehendes CRM weiterhin?',
      a: 'Immob24 setzt auf bestehende Prozesse auf und setzt nicht zwingend einen kompletten Systemwechsel voraus.',
    },
    {
      q: 'Was automatisiert Immob24 konkret?',
      a: 'Erstreaktion, Lead-Qualifizierung, Terminlogik und Follow-ups.',
    },
    {
      q: 'Für wen eignet sich Immob24 besonders?',
      a: 'Für Maklerbüros in Deutschland, die schneller reagieren und operative Routinearbeit reduzieren möchten.',
    },
    {
      q: 'Warum reicht ein CRM dafür nicht aus?',
      a: 'Weil ein CRM in erster Linie Informationen verwaltet, während Immob24 die operative Ausführung zwischen Anfrage und nächstem Schritt automatisiert.',
    },
  ];
  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-center text-balance">
            Häufige Fragen zum Produkt
          </h2>

          <div className="mt-10 rounded-2xl bg-white border border-charcoal/10 px-6">
            {items.map((it, i) => (
              <FAQItem key={i} q={it.q} a={it.a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => (
  <section
    id="book-demo"
    className="py-20 md:py-28 bg-charcoal text-white relative overflow-hidden"
  >
    <div
      aria-hidden
      className="absolute -top-24 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full bg-gradient-golden opacity-10 blur-3xl"
    />
    <div className="container relative">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-heading text-section-mobile md:text-section text-balance">
          Sehen Sie, wie Immob24 in Ihren bestehenden Maklerprozess passt
        </h2>
        <p className="mt-6 text-body-lg text-white/70">
          In der Demo wird gezeigt, wie Immob24 neue Anfragen beantwortet, Leads qualifiziert und
          operative Engpässe in Ihrem Maklerbüro reduziert — ohne dass Sie bei null anfangen
          müssen.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            {...TALLY_PROPS}
            onClick={() => trackEvent('produkt_final_cta_click')}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-golden text-white px-7 py-3.5 font-semibold shadow-golden hover:opacity-95 transition-opacity"
          >
            Demo anfragen
            <ArrowRight className="h-4 w-4" />
          </button>
          <a
            href="#crm-alternative"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-medium text-white hover:bg-white/10 transition-colors"
          >
            CRM-Alternative ansehen
          </a>
        </div>

        <p className="mt-6 text-sm text-white/55">
          Keine Verpflichtung. Besonders relevant für kleine und mittelgroße Maklerbüros in
          Deutschland.
        </p>
      </div>
    </div>
  </section>
);

const PRODUKT_FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: 'de-DE',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Ist Immob24 ein CRM?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nein. Immob24 ist kein klassisches CRM, sondern eine KI-Schicht für Makler-Workflows.',
      },
    },
    {
      '@type': 'Question',
      name: 'Brauche ich mein bestehendes CRM weiterhin?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Immob24 setzt auf bestehende Prozesse auf und setzt nicht zwingend einen kompletten Systemwechsel voraus.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was automatisiert Immob24 konkret?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Erstreaktion, Lead-Qualifizierung, Terminlogik und Follow-ups.',
      },
    },
    {
      '@type': 'Question',
      name: 'Für wen eignet sich Immob24 besonders?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Für Maklerbüros in Deutschland, die schneller reagieren und operative Routinearbeit reduzieren möchten.',
      },
    },
    {
      '@type': 'Question',
      name: 'Warum reicht ein CRM dafür nicht aus?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Weil ein CRM in erster Linie Informationen verwaltet, während Immob24 die operative Ausführung zwischen Anfrage und nächstem Schritt automatisiert.',
      },
    },
  ],
};

function useFaqSchema() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.page = 'produkt-faq';
    script.textContent = JSON.stringify(PRODUKT_FAQ_SCHEMA);
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);
}

export default function ProduktDE() {
  useDocumentMeta({
    title: 'Immob24 Produkt | KI-System für Immobilienmakler statt klassischem CRM',
    description:
      'Immob24 automatisiert Lead-Reaktion, Qualifizierung, Terminplanung und Follow-ups für Immobilienmakler in Deutschland — ohne dass ein bestehendes CRM ersetzt werden muss.',
    canonical: 'https://immob24.de/de/produkt',
  });
  useFaqSchema();

  const sections = [
    Hero,
    Definition,
    AnswerBlock,
    ProblemFit,
    Features,
    UseCases,
    CrmComparison,
    WhoItsFor,
    HowItWorks,
    SocialProof,
    FAQ,
    FinalCTA,
  ];

  return (
    <div className="min-h-screen antialiased bg-white">
      <Header />
      <main className="relative">
        {sections.map((Section, i) => (
          <RevealOnScroll key={i}>
            <Section />
          </RevealOnScroll>
        ))}
      </main>
      <Footer />
    </div>
  );
}