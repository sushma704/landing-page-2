// Immob24 landing page translations.
// German (de) is the source of truth; en translated from it.

export type Language = 'en' | 'de';

export const translations = {
  // ============================================
  // HOMEPAGE META (used by usePageMeta for the / + /de + /en home routes)
  // ============================================
  home: {
    meta: {
      title: {
        de: 'KI-Maklersoftware für Immobilienmakler | Immob24',
        en: 'AI Software for Real Estate Brokers | Immob24',
      },
      description: {
        de: 'Immob24 ist die KI-Maklersoftware für Immobilienmakler in Deutschland. Beantworten Sie neue Anfragen in 3 Sekunden, qualifizieren Sie Leads automatisch.',
        en: 'Immob24 is AI software for real estate brokers. Respond to new property inquiries in seconds, qualify leads, and keep your existing CRM.',
      },
    },
  },

  // ============================================
  // HEADER & NAVIGATION
  // ============================================
  nav: {
    home: {
      de: 'Startseite',
      en: 'Home',
    },
    product: {
      de: 'Produkt',
      en: 'Product',
    },
    howItWorks: {
      de: 'So funktioniert’s',
      en: 'How it works',
    },
    forWhom: {
      de: 'Für wen',
      en: 'Who it’s for',
    },
    crmAlternative: {
      de: 'CRM-Alternative',
      en: 'CRM alternative',
    },
    demo: {
      de: 'Demo',
      en: 'Demo',
    },
    pricing: {
      de: 'Preise',
      en: 'Pricing',
    },
    requestDemo: {
      de: 'Demo anfragen',
      en: 'Request demo',
    },
  },

  // ============================================
  // HERO SECTION
  // ============================================
  hero: {
    eyebrow: {
      de: 'KI-Maklersoftware für Immobilienmakler',
      en: 'AI software for real estate brokers',
    },
    headline: {
      de: 'KI-Software für Immobilienmakler in Deutschland',
      en: 'AI software for real estate brokers',
    },
    subheadline: {
      de: 'Immob24 ist die KI-Maklersoftware für Maklerbüros in Deutschland: Sie beantwortet neue Immobilienanfragen in 3 Sekunden, qualifiziert Leads automatisch und übernimmt Follow-ups — ohne dass Sie Ihr bestehendes CRM ersetzen müssen.',
      en: 'Immob24 is AI software for real estate brokerages: it responds to new property inquiries in seconds, qualifies leads automatically, and triggers follow-ups — without replacing your existing CRM.',
    },
    primaryCta: {
      de: 'Demo anfragen',
      en: 'Request demo',
    },
    secondaryCta: {
      de: 'So funktioniert’s',
      en: 'See how it works',
    },
    trustBullets: {
      de: [
        'Reagiert sofort auf neue Anfragen.',
        'Qualifiziert Leads automatisch.',
        'Entlastet Ihr Team von manueller Nachverfolgung.',
        'Entwickelt für deutsche Maklerprozesse.',
      ],
      en: [
        'Responds instantly to new inquiries.',
        'Qualifies leads automatically.',
        'Frees your team from manual follow-up.',
        'Built for German broker workflows.',
      ],
    },
  },

  // ============================================
  // ANSWER BLOCK
  // ============================================
  answer: {
    q1: {
      de: 'Was ist Immob24?',
      en: 'What is Immob24?',
    },
    a1: {
      de: 'Immob24 ist eine KI-Software für Immobilienmakler in Deutschland. Sie beantwortet neue Anfragen automatisch, qualifiziert Interessenten und führt sie in den nächsten Schritt — als Ausführungsschicht auf bestehenden Makler-Workflows.',
      en: 'Immob24 is AI software for real estate brokers. It answers new inquiries automatically, qualifies prospects, and advances them to the next step — as an execution layer on top of existing broker workflows.',
    },
    q2: {
      de: 'Ist Immob24 ein CRM?',
      en: 'Is Immob24 a CRM?',
    },
    a2: {
      de: 'Nein. Immob24 ist kein klassisches CRM. Es ist eine KI-Ausführungsschicht, die auf bestehende Makler-Workflows aufsetzt und die operative Arbeit zwischen Anfrage und Termin übernimmt.',
      en: 'No. Immob24 is not a classical CRM. It is an AI execution layer that sits on top of existing broker workflows and handles the operational work between inquiry and appointment.',
    },
  },

  // ============================================
  // PROBLEM SECTION
  // ============================================
  problem: {
    headline: {
      de: 'Warum Makler jeden Monat Umsatz durch langsame Reaktion verlieren',
      en: 'Why brokers lose revenue every month through slow response',
    },
    body: {
      de: 'Viele Maklerbüros erhalten genug Anfragen, verlieren aber Abschlusspotenzial in den ersten Minuten und Stunden nach dem Eingang. Neue Interessenten warten zu lange auf eine Antwort, Follow-ups passieren manuell und inkonsistent, und wertvolle Zeit geht in Abstimmung statt in Beratung und Abschluss.',
      en: 'Many real estate offices get enough inquiries but lose deal potential in the first minutes and hours after receipt. New prospects wait too long for a response, follow-ups happen manually and inconsistently, and valuable time is spent on coordination instead of advice and closing.',
    },
    painpoints: {
      de: [
        'Neue Leads bleiben zu lange unbeantwortet.',
        'Follow-ups hängen von manueller Disziplin ab.',
        'Besichtigungstermine werden mit zu viel Hin und Her koordiniert.',
        'CRM-Systeme speichern Daten, lösen aber die Reaktionslücke nicht automatisch.',
      ],
      en: [
        'New leads stay unanswered too long.',
        'Follow-ups depend on manual discipline.',
        'Viewing appointments are coordinated with too much back-and-forth.',
        'CRM systems store data but do not automatically close the response gap.',
      ],
    },
  },

  // ============================================
  // SOLUTION SECTION
  // ============================================
  solution: {
    headline: {
      de: 'So arbeitet Immob24 in Ihrem Maklerbüro',
      en: 'How Immob24 works inside your brokerage',
    },
    body: {
      de: 'Immob24 übernimmt die ersten operativen Schritte nach einer Anfrage automatisch. Die KI reagiert sofort, sammelt relevante Informationen, priorisiert Interessenten, stößt Follow-ups an und bringt qualifizierte Leads in den nächsten Prozessschritt.',
      en: 'Immob24 takes over the first operational steps after an inquiry automatically. The AI responds instantly, gathers relevant information, prioritises prospects, triggers follow-ups, and moves qualified leads into the next process step.',
    },
    definitionLabel: {
      de: 'Definition',
      en: 'Definition',
    },
    definitionBox: {
      de: 'Immob24 ist die KI-Ausführungsschicht für Maklerbüros: schnellere Reaktion, automatische Qualifizierung, Terminplanung und Nachverfolgung in einem System statt nur Kontaktverwaltung.',
      en: 'Immob24 is the AI execution layer for real estate offices: faster response, automatic qualification, appointment planning and follow-up in one system instead of just contact management.',
    },
  },

  // ============================================
  // FEATURE SECTION
  // ============================================
  features: {
    headline: {
      de: 'Was Immob24 automatisiert',
      en: 'What Immob24 automates',
    },
    f1Title: {
      de: 'Anfragen in 3 Sekunden beantworten',
      en: 'Answer inquiries in 3 seconds',
    },
    f1Body: {
      de: 'Sobald ein neuer Lead eingeht, startet Immob24 automatisch die Erstreaktion. Das erhöht die Chance auf Kontakt, bevor Interessenten abspringen oder parallel mit anderen Maklern sprechen.',
      en: 'As soon as a new lead arrives, Immob24 automatically starts the first response. That raises the chance of contact before prospects drop off or talk to another agent in parallel.',
    },
    f2Title: {
      de: 'Leads automatisch qualifizieren',
      en: 'Qualify leads automatically',
    },
    f2Body: {
      de: 'Die KI sammelt wichtige Informationen früh im Prozess und hilft dabei, Interessenten schneller zu priorisieren. Ihr Team investiert Zeit zuerst in die Anfragen mit höherer Abschlusswahrscheinlichkeit.',
      en: 'The AI gathers key information early in the process and helps prioritise prospects faster. Your team invests time first in the inquiries with the highest probability of closing.',
    },
    f3Title: {
      de: 'Besichtigungen ohne manuelles Hin und Her planen',
      en: 'Plan viewings without manual back-and-forth',
    },
    f3Body: {
      de: 'Immob24 koordiniert den nächsten Schritt automatisch und reduziert den Abstimmungsaufwand für Ihr Team. Das beschleunigt die Pipeline und verbessert die Kundenerfahrung.',
      en: 'Immob24 coordinates the next step automatically and reduces coordination effort for your team. That accelerates the pipeline and improves the customer experience.',
    },
    f4Title: {
      de: 'Follow-ups laufen weiter, auch wenn Ihr Team beschäftigt ist',
      en: 'Follow-ups keep running, even when your team is busy',
    },
    f4Body: {
      de: 'Interessenten werden nicht vergessen, nur weil der Tag voll ist. Automatisierte Nachverfolgung hält Gespräche aktiv und senkt den Verlust durch manuelle Lücken.',
      en: 'Prospects don’t get forgotten just because the day is full. Automated follow-up keeps conversations alive and reduces losses from manual gaps.',
    },
    ctaLink: {
      de: 'Alle Funktionen der KI-Maklersoftware ansehen',
      en: 'See all features of the AI software for real estate brokers',
    },
  },

  // ============================================
  // PRICING TEASER (homepage — links to /de/preise)
  // ============================================
  pricingTeaser: {
    headline: {
      de: 'Preise auf einen Blick',
      en: 'Pricing at a glance',
    },
    body: {
      de: 'Immob24 bietet drei Einstiegswege für Maklerbüros — vom kostenlosen Beta-Zugang über den Team-Tarif ab 249 €/Monat bis zur individuellen Lösung auf Anfrage.',
      en: 'Immob24 offers three ways to start for brokerages — from free beta access and the Team plan from €249/month to an individual solution on request.',
    },
    plans: {
      de: [
        ['Beta', 'Kostenlos während der Beta-Phase'],
        ['Team', 'Ab 249 €/Monat'],
        ['Individuell', 'Auf Anfrage'],
      ],
      en: [
        ['Beta', 'Free during the beta phase'],
        ['Team', 'From €249/month'],
        ['Individual', 'On request'],
      ],
    },
    pricingCta: {
      de: 'Immob24 Preise',
      en: 'Immob24 pricing',
    },
    demoCta: {
      de: 'Demo anfragen',
      en: 'Request a demo',
    },
  },

  // ============================================
  // CRM DIFFERENTIATION
  // ============================================
  crmDiff: {
    headline: {
      de: 'Warum Immob24 kein weiteres CRM ist',
      en: 'Why Immob24 is not another CRM',
    },
    body: {
      de: 'Klassische CRM-Systeme sind dafür gebaut, Kontakte, Objekte und Vorgänge zu verwalten. Immob24 ist dafür gebaut, auf neue Anfragen zu reagieren, Interessenten automatisch weiterzuführen und operative Engpässe zu beseitigen, bevor Ihr Team überhaupt eingreifen muss.',
      en: 'Classical CRM systems are built to manage contacts, properties and cases. Immob24 is built to respond to new inquiries, advance prospects automatically and remove operational bottlenecks before your team even has to step in.',
    },
    comparisons: {
      de: [
        ['CRM', 'Daten verwalten'],
        ['Immob24', 'Arbeit ausführen'],
        ['CRM', 'speichert Pipeline-Status'],
        ['Immob24', 'reagiert, qualifiziert und koordiniert den nächsten Schritt'],
      ],
      en: [
        ['CRM', 'manages data'],
        ['Immob24', 'executes the work'],
        ['CRM', 'stores pipeline status'],
        ['Immob24', 'responds, qualifies and coordinates the next step'],
      ],
    },
    cta: {
      de: 'Warum Immob24 kein klassisches CRM ist',
      en: 'Why Immob24 is not a traditional CRM',
    },
  },

  // ============================================
  // HOW IT WORKS
  // ============================================
  howItWorks: {
    headline: {
      de: 'Von der Anfrage bis zum qualifizierten Gespräch',
      en: 'From inquiry to qualified conversation',
    },
    steps: {
      de: [
        'Neue Anfrage kommt rein.',
        'Immob24 antwortet sofort.',
        'Die KI sammelt Informationen und qualifiziert den Lead.',
        'Nächster Schritt wird koordiniert: Termin, Rückfrage oder Follow-up.',
        'Ihr Team übernimmt dort, wo persönliche Beratung den größten Hebel hat.',
      ],
      en: [
        'A new inquiry arrives.',
        'Immob24 responds immediately.',
        'The AI gathers information and qualifies the lead.',
        'The next step is coordinated: appointment, follow-up question or nurture.',
        'Your team takes over where personal advice has the highest leverage.',
      ],
    },
    cta: {
      de: 'So funktioniert’s im Detail',
      en: 'See how it works in detail',
    },
  },

  // ============================================
  // SOCIAL PROOF
  // ============================================
  socialProof: {
    headline: {
      de: 'Entwickelt für Makler, die schneller reagieren müssen',
      en: 'Built for brokers who need to respond faster',
    },
    note: {
      de: 'Diese Sektion geht erst mit validierten Kundenbelegen live. Logo-Strip und detaillierte Vorher/Nachher-Ergebnisse folgen nach den ersten Pilot-Kunden.',
      en: 'This section will only go live with validated customer evidence. Logo strip and detailed before/after results will follow once pilot customers are onboarded.',
    },
    testimonials: {
      de: [
        '„Vor Immob24 gingen uns Anfragen verloren. Jetzt bekommt jede Anfrage sofort eine Reaktion."',
        '„Unser Team spart jede Woche mehrere Stunden bei Follow-ups und Terminabstimmung."',
        '„Wir mussten kein neues CRM einführen, um den Prozess zu verbessern."',
      ],
      en: [
        '"Before Immob24, we lost inquiries. Now every inquiry gets an immediate response."',
        '"Our team saves several hours every week on follow-ups and scheduling."',
        '"We didn’t have to roll out a new CRM to improve the process."',
      ],
    },
  },

  // ============================================
  // USE CASES
  // ============================================
  useCases: {
    headline: {
      de: 'Für welche Maklerbüros Immob24 geeignet ist',
      en: 'Which brokerages Immob24 is right for',
    },
    cards: {
      de: [
        'Kleine Maklerbüros mit hohem Anfrageaufkommen.',
        'Mittelgroße Agenturen mit zu viel manueller Nacharbeit.',
        'Teams, die bestehende Systeme behalten wollen.',
        'Makler, die schneller reagieren möchten, ohne zusätzliche operative Last aufzubauen.',
      ],
      en: [
        'Small brokerages with high inquiry volume.',
        'Mid-sized agencies with too much manual rework.',
        'Teams that want to keep their existing systems.',
        'Brokers who want to respond faster without adding operational load.',
      ],
    },
  },

  // ============================================
  // FAQ
  // ============================================
  faq: {
    headline: {
      de: 'Häufige Fragen',
      en: 'Frequently asked questions',
    },
    items: {
      de: [
        {
          q: 'Ist Immob24 ein CRM?',
          a: 'Nein. Immob24 ist kein klassisches CRM, sondern eine KI-Schicht für Makler-Workflows.',
        },
        {
          q: 'Für wen ist Immob24 gedacht?',
          a: 'Für Immobilienmakler und Maklerbüros in Deutschland, die neue Anfragen schneller beantworten und Routinearbeit automatisieren möchten.',
        },
        {
          q: 'Muss ich mein bestehendes CRM ersetzen?',
          a: 'Nein. Immob24 setzt auf bestehende Prozesse auf, statt zwingend ein bestehendes CRM zu ersetzen.',
        },
        {
          q: 'Was automatisiert Immob24?',
          a: 'Erstreaktion, Lead-Qualifizierung, Terminplanung und Follow-ups.',
        },
        {
          q: 'Warum ist schnelle Reaktion so wichtig?',
          a: 'Weil Interessenten in wettbewerbsintensiven Märkten oft mehrere Anbieter parallel kontaktieren und langsame Antworten direkt zu verlorenen Gesprächen führen können.',
        },
      ],
      en: [
        {
          q: 'Is Immob24 a CRM?',
          a: 'No. Immob24 is not a classical CRM, but an AI layer for broker workflows.',
        },
        {
          q: 'Who is Immob24 for?',
          a: 'For real estate agents and brokerages in Germany who want to answer new inquiries faster and automate routine work.',
        },
        {
          q: 'Do I need to replace my existing CRM?',
          a: 'No. Immob24 sits on top of existing processes instead of requiring you to replace an existing CRM.',
        },
        {
          q: 'What does Immob24 automate?',
          a: 'First response, lead qualification, appointment planning and follow-ups.',
        },
        {
          q: 'Why is fast response so important?',
          a: 'Because prospects in competitive markets often contact several providers in parallel, and slow replies can directly translate into lost conversations.',
        },
      ],
    },
  },

  // ============================================
  // FINAL CTA
  // ============================================
  finalCta: {
    headline: {
      de: 'Sehen Sie in 30 Minuten, wie Immob24 in Ihr Maklerbüro passt',
      en: 'See in 30 minutes how Immob24 fits your brokerage',
    },
    body: {
      de: 'In der Demo zeigen wir, wie Immob24 auf neue Immobilienanfragen reagiert, wie Leads qualifiziert werden und wie Ihr Team weniger Zeit in Routinearbeit verliert.',
      en: 'In the demo we show how Immob24 responds to new real estate inquiries, how leads are qualified, and how your team spends less time on routine work.',
    },
    primaryCta: {
      de: 'Demo anfragen',
      en: 'Request demo',
    },
    secondaryNote: {
      de: 'Keine Verpflichtung. Relevant für kleine und mittelgroße Maklerbüros in Deutschland.',
      en: 'No obligation. Most relevant for small and mid-sized brokerages in Germany.',
    },
  },

  // ============================================
  // PRODUKT PAGE (/de/produkt) — bilingual content for the product page.
  // ============================================
  produkt: {
    meta: {
      title: {
        de: 'KI-Software für Immobilienmakler | Immob24',
        en: 'Immob24 Product — AI Software for Real Estate Brokers',
      },
      description: {
        de: 'Immob24 ist die KI-Software für Immobilienmakler: automatische Erstreaktion, Lead-Qualifizierung, Terminkoordination und Follow-ups — ohne CRM-Wechsel.',
        en: 'The AI operating system for real estate brokerages: automated first response, lead qualification, and follow-ups built for broker workflows.',
      },
    },

    hero: {
      eyebrow: { de: 'Produkt', en: 'Product' },
      headline: {
        de: 'Immob24 — KI-Maklersoftware für schnellere Lead-Reaktion',
        en: 'Immob24 — AI software for faster real estate lead response',
      },
      subheadline: {
        de: 'Beantworten Sie neue Immobilienanfragen in 3 Sekunden statt in Stunden. Immob24 ist die KI-Maklersoftware, die Leads automatisch qualifiziert und den nächsten Schritt koordiniert — als Ausführungsschicht auf Ihrem bestehenden Workflow, ohne ein weiteres CRM einzuführen.',
        en: 'Respond to property inquiries in seconds instead of hours. Immob24 is the AI software that qualifies leads automatically and coordinates the next step — an execution layer on top of your existing workflow, without introducing another CRM.',
      },
      primaryCta: { de: 'Demo anfragen', en: 'Request demo' },
      secondaryCta: { de: 'So funktioniert’s', en: 'How it works' },
      bullets: {
        de: [
          'Reagiert sofort auf neue Immobilienanfragen.',
          'Qualifiziert Leads automatisch.',
          'Plant nächste Schritte ohne manuelles Hin und Her.',
          'Setzt auf bestehende Prozesse und Systeme auf.',
        ],
        en: [
          'Responds instantly to new real estate inquiries.',
          'Qualifies leads automatically.',
          'Plans next steps without manual back-and-forth.',
          'Sits on top of your existing processes and systems.',
        ],
      },
    },

    definition: {
      headline: { de: 'Was Immob24 ist', en: 'What Immob24 is' },
      body: {
        de: 'Immob24 ist ein KI Operating System für Immobilienmakler in Deutschland. Die Plattform übernimmt die operative Arbeit zwischen Anfrageeingang und dem nächsten qualifizierten Schritt: Antwort, Qualifizierung, Terminlogik und Follow-up. Dadurch gewinnen Maklerbüros Geschwindigkeit, Struktur und Entlastung im Tagesgeschäft.',
        en: 'Immob24 is an AI Operating System for real estate agents in Germany. The platform takes over the operational work between an incoming inquiry and the next qualified step: response, qualification, scheduling logic and follow-up. That gives brokerages speed, structure and relief in their day-to-day work.',
      },
    },

    qa: {
      qaLabel: { de: 'Q&A', en: 'Q&A' },
      items: {
        de: [
          { q: 'Ist Immob24 ein CRM?', a: 'Nein. Immob24 ist kein klassisches CRM.' },
          {
            q: 'Was macht Immob24 stattdessen?',
            a: 'Es führt operative Vertriebsarbeit automatisch aus, statt nur Kontakte und Vorgänge zu speichern.',
          },
          {
            q: 'Für wen ist Immob24 gedacht?',
            a: 'Für Immobilienmakler und Maklerbüros in Deutschland, die schneller reagieren und Routinearbeit reduzieren wollen.',
          },
        ],
        en: [
          { q: 'Is Immob24 a CRM?', a: 'No. Immob24 is not a classical CRM.' },
          {
            q: 'What does Immob24 do instead?',
            a: 'It runs operational sales work automatically, instead of just storing contacts and records.',
          },
          {
            q: 'Who is Immob24 for?',
            a: 'For real estate agents and brokerages in Germany who want to respond faster and reduce routine work.',
          },
        ],
      },
    },

    problemFit: {
      headline: {
        de: 'Warum Maklerbüros ein anderes System brauchen als ein klassisches CRM',
        en: 'Why brokerages need a different system than a classical CRM',
      },
      body: {
        de: 'Viele Maklerbüros haben kein Datenproblem, sondern ein Reaktionsproblem. Neue Anfragen kommen rein, aber die operative Bearbeitung hängt an manueller Disziplin, Teamkapazität und Back-and-forth-Kommunikation. Genau in dieser Lücke sitzt Immob24: nicht als Datenbank, sondern als KI-Ausführungsschicht für die ersten entscheidenden Schritte im Lead-Prozess.',
        en: 'Many brokerages don’t have a data problem — they have a response problem. New inquiries come in, but operational handling depends on manual discipline, team capacity and back-and-forth communication. That is exactly the gap Immob24 fills: not as a database, but as an AI execution layer for the first decisive steps of the lead process.',
      },
      points: {
        de: [
          'Langsame Antwortzeiten → Immob24 reagiert sofort.',
          'Unklare Lead-Priorisierung → Immob24 qualifiziert früh im Prozess.',
          'Zu viel Terminabstimmung → Immob24 stößt den nächsten Schritt automatisiert an.',
          'Manuelle Follow-ups → Immob24 hält Gespräche aktiv.',
        ],
        en: [
          'Slow response times → Immob24 reacts instantly.',
          'Unclear lead prioritisation → Immob24 qualifies early in the process.',
          'Too much scheduling back-and-forth → Immob24 triggers the next step automatically.',
          'Manual follow-ups → Immob24 keeps conversations alive.',
        ],
      },
    },

    features: {
      headline: {
        de: 'Was Immob24 im Makleralltag übernimmt',
        en: 'What Immob24 takes over in the broker’s day-to-day',
      },
      f1Title: {
        de: 'Neue Anfragen sofort beantworten',
        en: 'Answer new inquiries instantly',
      },
      f1Body: {
        de: 'Sobald ein Lead eingeht, startet Immob24 automatisch die Erstreaktion. Dadurch steigt die Chance auf Kontakt, bevor Interessenten abspringen oder bei anderen Maklern weitermachen.',
        en: 'As soon as a lead arrives, Immob24 automatically starts the first response. That raises the chance of contact before prospects drop off or move on to other agents.',
      },
      f2Title: {
        de: 'Leads automatisch qualifizieren',
        en: 'Qualify leads automatically',
      },
      f2Body: {
        de: 'Immob24 sammelt wichtige Informationen früh im Gespräch und hilft dabei, Anfragen schneller zu priorisieren. Ihr Team konzentriert sich zuerst auf die Interessenten mit höherer Abschlusswahrscheinlichkeit.',
        en: 'Immob24 gathers key information early in the conversation and helps prioritise inquiries faster. Your team focuses first on the prospects with the highest probability of closing.',
      },
      f3Title: {
        de: 'Termine und nächste Schritte koordinieren',
        en: 'Coordinate appointments and next steps',
      },
      f3Body: {
        de: 'Statt jeder manuellen Abstimmung stößt Immob24 den nächsten passenden Prozessschritt an. Das reduziert operative Reibung und beschleunigt die Bearbeitung von Interessenten.',
        en: 'Instead of every step requiring manual coordination, Immob24 triggers the right next process step. That removes operational friction and accelerates how prospects move through.',
      },
      f4Title: { de: 'Follow-ups aktiv halten', en: 'Keep follow-ups alive' },
      f4Body: {
        de: 'Wenn Teams ausgelastet sind, brechen Gespräche oft wegen fehlender Nachverfolgung ab. Immob24 hält den Prozess aktiv und verhindert, dass Leads einfach liegen bleiben.',
        en: 'When teams are stretched, conversations often die from missing follow-up. Immob24 keeps the process active and prevents leads from being left behind.',
      },
      f5Title: {
        de: 'Auf bestehende Maklerprozesse aufsetzen',
        en: 'Sit on top of your existing broker processes',
      },
      f5Body: {
        de: 'Immob24 ist nicht als harter Systemwechsel positioniert. Die Plattform ist dafür gedacht, vorhandene Prozesse zu ergänzen und die operative Ausführung zu automatisieren, ohne ein bestehendes CRM zwingend zu ersetzen.',
        en: 'Immob24 is not positioned as a hard system replacement. The platform is meant to extend existing processes and automate operational execution without forcing you to swap out an existing CRM.',
      },
    },

    useCases: {
      headline: {
        de: 'Wofür Maklerbüros Immob24 einsetzen',
        en: 'What brokerages use Immob24 for',
      },
      c1Title: {
        de: 'Portal-Anfragen schneller bearbeiten',
        en: 'Process portal inquiries faster',
      },
      c1Body: {
        de: 'Wenn viele Anfragen parallel eingehen, sorgt Immob24 dafür, dass neue Leads nicht auf manuelle Sichtung warten müssen.',
        en: 'When many inquiries come in at once, Immob24 makes sure new leads don’t have to wait for manual triage.',
      },
      c2Title: {
        de: 'Interessenten früh priorisieren',
        en: 'Prioritise prospects early',
      },
      c2Body: {
        de: 'Makler können schneller erkennen, welche Gespräche zuerst Aufmerksamkeit benötigen, weil die KI die Vorqualifizierung unterstützt.',
        en: 'Agents can see faster which conversations need attention first, because the AI supports pre-qualification.',
      },
      c3Title: {
        de: 'Besichtigungen effizienter vorbereiten',
        en: 'Prepare viewings more efficiently',
      },
      c3Body: {
        de: 'Durch automatisierte nächste Schritte sinkt die Zahl der manuellen Schleifen in der Terminabstimmung.',
        en: 'Automated next steps reduce the number of manual loops in scheduling.',
      },
      c4Title: { de: 'Teams operativ entlasten', en: 'Free up teams operationally' },
      c4Body: {
        de: 'Makler verbringen weniger Zeit mit wiederkehrender Routinekommunikation und mehr Zeit mit Beratung, Besichtigung und Abschluss.',
        en: 'Agents spend less time on repetitive routine communication and more time on advice, viewings and closing.',
      },
    },

    crmTable: {
      headline: { de: 'Immob24 vs. klassisches CRM', en: 'Immob24 vs. classical CRM' },
      thema: { de: 'Thema', en: 'Topic' },
      classicalCrm: { de: 'Klassisches CRM', en: 'Classical CRM' },
      immob: { de: 'Immob24', en: 'Immob24' },
      cta: {
        de: 'Immobilien-CRM-Alternative ansehen',
        en: 'See the real estate CRM alternative',
      },
      // Three-column rows: [topic, classical CRM cell, Immob24 cell].
      rows: {
        de: [
          [
            'Kernfunktion',
            'Kontakte, Objekte und Vorgänge verwalten.',
            'Operative Arbeit zwischen Anfrage und nächstem Schritt automatisieren.',
          ],
          [
            'Reaktion auf neue Leads',
            'Meist manuell durch Team oder Workflow-Setups.',
            'Sofortige KI-Reaktion auf neue Anfragen.',
          ],
          [
            'Lead-Qualifizierung',
            'Häufig dokumentations- und workflowbasiert.',
            'Frühe KI-gestützte Vorqualifizierung.',
          ],
          [
            'Terminlogik',
            'Abhängig von Teamprozess oder externer Automatisierung.',
            'In den automatisierten Ablauf eingebettet.',
          ],
          [
            'Positionierung',
            'System of record.',
            'AI operating layer auf bestehendem Workflow.',
          ],
        ],
        en: [
          [
            'Core function',
            'Manage contacts, properties and cases.',
            'Automate operational work between inquiry and next step.',
          ],
          [
            'Response to new leads',
            'Usually manual via team or workflow setup.',
            'Instant AI response to new inquiries.',
          ],
          [
            'Lead qualification',
            'Often documentation- and workflow-driven.',
            'Early AI-supported pre-qualification.',
          ],
          [
            'Scheduling logic',
            'Dependent on team process or external automation.',
            'Built into the automated flow.',
          ],
          [
            'Positioning',
            'System of record.',
            'AI operating layer on top of your existing workflow.',
          ],
        ],
      },
    },

    whoFor: {
      headline: { de: 'Für wen Immob24 gebaut ist', en: 'Who Immob24 is built for' },
      cards: {
        de: [
          'Kleine Maklerbüros mit hohem Anfrageaufkommen.',
          'Mittelgroße Agenturen mit zu viel manueller Nacharbeit.',
          'Teams, die ihren bestehenden Software-Stack nicht komplett austauschen wollen.',
          'Makler, die Geschwindigkeit im Erstkontakt als Wettbewerbsvorteil nutzen wollen.',
        ],
        en: [
          'Small brokerages with high inquiry volume.',
          'Mid-sized agencies with too much manual rework.',
          'Teams that don’t want to swap out their entire existing software stack.',
          'Agents who want to turn speed of first contact into a competitive advantage.',
        ],
      },
      notForLabel: { de: 'Nicht für', en: 'Not for' },
      notForBody: {
        de: 'Immob24 ist nicht die richtige Positionierung für Unternehmen, die primär eine klassische Datenbank, ein Portal oder ein reines Listing-Management-System suchen. Der Fokus liegt auf Reaktion, Qualifizierung, Follow-up und operativer Automatisierung im Maklerprozess.',
        en: 'Immob24 is not the right fit for companies that primarily need a classical database, a portal or a pure listing-management system. The focus is on response, qualification, follow-up and operational automation in the broker process.',
      },
    },

    howItWorks: {
      headline: { de: 'Wie Immob24 arbeitet', en: 'How Immob24 works' },
      steps: {
        de: [
          'Neue Anfrage kommt rein.',
          'Immob24 reagiert sofort.',
          'Die KI sammelt Informationen und qualifiziert den Lead.',
          'Nächster Schritt wird koordiniert: Termin, Rückfrage oder Follow-up.',
          'Ihr Team steigt dort ein, wo persönliche Beratung den größten Hebel hat.',
        ],
        en: [
          'A new inquiry arrives.',
          'Immob24 responds immediately.',
          'The AI gathers information and qualifies the lead.',
          'The next step is coordinated: appointment, follow-up question or nurture.',
          'Your team takes over where personal advice has the highest leverage.',
        ],
      },
      cta: { de: 'So funktioniert’s im Detail', en: 'See how it works in detail' },
    },

    socialProof: {
      headline: {
        de: 'Vertrauen entsteht durch belegbare Ergebnisse',
        en: 'Trust comes from evidence',
      },
      note: {
        de: 'Diese Sektion geht erst mit validierten Kundenbelegen live (Logos, Testimonials, Workflow-Screenshots, Vorher/Nachher-Ergebnisse). Bis dahin Platzhalter.',
        en: 'This section will only go live with validated customer evidence (logos, testimonials, workflow screenshots, before/after results). Placeholders until then.',
      },
      placeholders: {
        de: [
          '„Wir reagieren jetzt auf jede Anfrage sofort."',
          '„Unser Team spart wöchentlich Zeit bei Nachverfolgung und Terminabstimmung."',
          '„Wir mussten kein neues CRM ausrollen, um schneller zu werden."',
        ],
        en: [
          '"We now respond to every inquiry instantly."',
          '"Our team saves time every week on follow-up and scheduling."',
          '"We didn’t have to roll out a new CRM to get faster."',
        ],
      },
      placeholderLabel: { de: 'Platzhalter', en: 'Placeholder' },
    },

    faq: {
      headline: { de: 'Häufige Fragen zum Produkt', en: 'Frequently asked questions about the product' },
      items: {
        de: [
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
        ],
        en: [
          {
            q: 'Is Immob24 a CRM?',
            a: 'No. Immob24 is not a classical CRM, but an AI layer for broker workflows.',
          },
          {
            q: 'Do I still need my existing CRM?',
            a: 'Immob24 sits on top of your existing processes and does not require a full system replacement.',
          },
          {
            q: 'What exactly does Immob24 automate?',
            a: 'First response, lead qualification, scheduling logic and follow-ups.',
          },
          {
            q: 'Who is Immob24 especially well suited for?',
            a: 'Brokerages in Germany that want to respond faster and reduce operational routine work.',
          },
          {
            q: 'Why is a CRM not enough on its own?',
            a: 'Because a CRM mostly manages information, while Immob24 automates the operational execution between an inquiry and the next step.',
          },
        ],
      },
    },

    finalCta: {
      headline: {
        de: 'Sehen Sie, wie Immob24 in Ihren bestehenden Maklerprozess passt',
        en: 'See how Immob24 fits into your existing broker process',
      },
      body: {
        de: 'In der Demo wird gezeigt, wie Immob24 neue Anfragen beantwortet, Leads qualifiziert und operative Engpässe in Ihrem Maklerbüro reduziert — ohne dass Sie bei null anfangen müssen.',
        en: 'In the demo we show how Immob24 answers new inquiries, qualifies leads and removes operational bottlenecks in your brokerage — without you having to start from scratch.',
      },
      primaryCta: { de: 'Demo anfragen', en: 'Request demo' },
      secondaryCta: {
        de: 'Immobilien-CRM-Alternative ansehen',
        en: 'See the real estate CRM alternative',
      },
      linksLabel: { de: 'Mehr erfahren:', en: 'Learn more:' },
      linkPricing: { de: 'Immob24 Preise', en: 'Immob24 pricing' },
      linkDemo: { de: 'Demo-Seite', en: 'Demo page' },
      supportNote: {
        de: 'Keine Verpflichtung. Besonders relevant für kleine und mittelgroße Maklerbüros in Deutschland.',
        en: 'No obligation. Especially relevant for small and mid-sized brokerages in Germany.',
      },
    },
  },

  // ============================================
  // BETA-AGENTENPROGRAMM PAGE (/de/beta-agentenprogramm)
  // Conversion-focused; recruits qualified brokerages into a 12-week pilot.
  // ============================================
  betaProgram: {
    meta: {
      title: {
        de: 'Beta-Agentenprogramm für Immobilienmakler | Immob24',
        en: 'Beta Agent Program for Real Estate Brokers | Immob24',
      },
      description: {
        de: 'Bewerben Sie sich für das Beta-Agentenprogramm von Immob24. 20 Plätze für Maklerbüros: 12-Wochen-Pilot, kostenloser Zugang, direkt mit dem Gründerteam.',
        en: 'Apply for the Immob24 Beta Agent Program. Limited spots for brokerages that want to test AI early and help shape the product.',
      },
    },

    nav: { de: 'Beta-Agentenprogramm', en: 'Beta Agent Program' },

    hero: {
      eyebrow: { de: 'Geschlossene Beta', en: 'Closed beta' },
      headline: {
        de: 'Beta-Agentenprogramm für Immobilienmakler',
        en: 'Beta Agent Program for real estate brokers',
      },
      subheadline: {
        de: 'Ein 12-Wochen-Pilot für Immobilienmakler und Maklerbüros in Deutschland, die neue Anfragen schneller bearbeiten, operative Arbeit reduzieren und den Produktaufbau aktiv mitgestalten wollen. Der Zugang ist begrenzt, der Aufwand gering und der Fokus klar: echte Workflows, echte Ergebnisse, direkt mit dem Gründerteam.',
        en: 'A 12-week pilot for real estate agents and brokerages in Germany who want to handle new inquiries faster, reduce operational work, and actively shape the product. Access is limited, effort is low, and the focus is clear: real workflows, real results, directly with the founding team.',
      },
      primaryCta: { de: 'Für Beta bewerben', en: 'Apply for the beta' },
      secondaryCta: { de: 'Pilot ansehen', en: 'See the pilot' },
      bullets: {
        de: [
          'Nur 20 Beta-Partner.',
          '12 Wochen Pilot mit geringem Aufwand.',
          'Kostenloser Zugang in der Beta.',
          'Preis für 12 Monate fixiert.',
        ],
        en: [
          'Only 20 beta partners.',
          '12-week pilot with low effort.',
          'Free access during the beta.',
          'Price fixed for 12 months.',
        ],
      },
    },

    whyJoin: {
      headline: { de: 'Warum jetzt beitreten', en: 'Why join now' },
      bullets: {
        de: [
          'Sie erhalten frühen Zugang zu Immob24, bevor der breite Rollout startet.',
          'Sie arbeiten direkt mit dem Gründerteam und geben Feedback in die Roadmap.',
          'Sie testen mit echten Workflows statt in einer theoretischen Demo-Umgebung.',
          'Sie sichern sich Beta-Konditionen ohne langfristige Verpflichtung.',
        ],
        en: [
          'Get early access to Immob24 before the broader rollout starts.',
          'Work directly with the founding team and feed your input into the roadmap.',
          'Test with real workflows instead of a theoretical demo environment.',
          'Lock in beta conditions without any long-term commitment.',
        ],
      },
    },

    whatYouGet: {
      headline: { de: 'Was Sie als Beta-Partner bekommen', en: 'What you get as a beta partner' },
      bullets: {
        de: [
          'Kostenloser Zugang während der Beta.',
          'Fester Preis für 12 Monate nach dem Pilot.',
          'Direkter Support vom Gründerteam.',
          'Möglichkeit, Produktentwicklung und Prioritäten mitzugestalten.',
          'Ein Setup, das innerhalb kurzer Zeit live getestet werden kann.',
        ],
        en: [
          'Free access during the beta.',
          'Fixed price for 12 months after the pilot.',
          'Direct support from the founding team.',
          'A real say in product development and priorities.',
          'A setup that can be tested live within a short time.',
        ],
      },
    },

    whoFor: {
      headline: { de: 'Für wen das Programm gedacht ist', en: 'Who this program is for' },
      body: {
        de: 'Das Programm ist für Immobilienmakler und Maklerbüros gedacht, die echte Anfragen verarbeiten, offen für neue operative Prozesse sind und bereit sind, ein neues System mit realen Daten im Alltag zu testen. Besonders passend ist es für Teams, die schneller auf Leads reagieren und manuelle Nacharbeit reduzieren wollen.',
        en: 'This program is for real estate agents and brokerages that handle real inquiries, are open to new operational processes, and are ready to test a new system with real data in daily work. It is especially suitable for teams that want to respond to leads faster and cut manual rework.',
      },
      bullets: {
        de: [
          'Maklerbüros mit regelmäßigem Anfragevolumen.',
          'Teams mit Verkaufs- oder Vermietungsprozessen.',
          'Unternehmen, die 30 Minuten pro Woche für Feedback einplanen können.',
          'Teams, die mit anonymisierten echten Daten testen wollen.',
        ],
        en: [
          'Brokerages with consistent inquiry volume.',
          'Teams with sales or rental processes.',
          'Companies that can budget 30 minutes a week for feedback.',
          'Teams that want to test with anonymised real data.',
        ],
      },
    },

    pilot: {
      headline: { de: 'So läuft der Pilot ab', en: 'How the pilot runs' },
      phase1Title: { de: 'Woche 1–2: Setup', en: 'Week 1–2: Setup' },
      phase1Body: {
        de: '30 Minuten Onboarding, Systeme verbinden, Inserate importieren und erste KI-Antworten live sehen. Der Gesamtaufwand zu Beginn bleibt gering und ist im Pitch Deck mit rund zwei Stunden angesetzt.',
        en: '30-minute onboarding, connect systems, import listings, and see the first AI responses live. The total starting effort stays low — about two hours according to the pitch deck.',
      },
      phase2Title: { de: 'Woche 3–8: Testen', en: 'Week 3–8: Test' },
      phase2Body: {
        de: 'Immob24 arbeitet in echten Workflows mit echten Daten. Das Team gibt wöchentlich etwa 30 Minuten Feedback — per Call oder asynchron — und behält jederzeit die Kontrolle über KI-Aktionen.',
        en: 'Immob24 runs inside real workflows with real data. The team gives roughly 30 minutes of feedback per week — by call or asynchronously — and keeps full control over AI actions at all times.',
      },
      phase3Title: { de: 'Woche 9–12: Entscheiden', en: 'Week 9–12: Decide' },
      phase3Body: {
        de: 'Zum Ende des Piloten werden Ergebnisse gemeinsam geprüft: Zeitersparnis, bearbeitete Leads und der operative Nutzen im Alltag. Danach kann fortgesetzt, erweitert oder gestoppt werden.',
        en: 'At the end of the pilot we review the results together: time saved, leads handled, and operational value in day-to-day work. After that you can continue, expand, or stop.',
      },
    },

    weNeed: {
      headline: { de: 'Was wir von Ihnen brauchen', en: 'What we need from you' },
      bullets: {
        de: [
          'Rund 30 Minuten Feedback pro Woche.',
          'Test mit echten, anonymisierten Daten.',
          'Ehrliches Feedback zu Stärken und Schwächen.',
          'Bereitschaft, das Produkt im echten Prozess zu testen statt nur oberflächlich anzuschauen.',
        ],
        en: [
          'About 30 minutes of feedback per week.',
          'Testing with real, anonymised data.',
          'Honest feedback on strengths and weaknesses.',
          'Willingness to test the product inside a real process, not just glance at it.',
        ],
      },
    },

    trust: {
      headline: { de: 'Kontrolle statt Black Box', en: 'Control, not a black box' },
      body: {
        de: 'Die Beta ist so aufgebaut, dass Makler die Kontrolle behalten. Laut Pitch Deck können KI-Aktionen freigegeben, überschrieben oder pausiert werden; außerdem werden Aktionen protokolliert. Das ist wichtig, weil Vertrauen und operative Kontrolle zentrale Voraussetzungen für die Einführung im Makleralltag sind.',
        en: 'The beta is built so brokers stay in control. According to the pitch deck, AI actions can be approved, overridden, or paused; all actions are logged. That matters because trust and operational control are essential for adoption in the broker’s day-to-day work.',
      },
      bullets: {
        de: [
          'Aktionen können freigegeben oder manuell übernommen werden.',
          'Eingriffe sind jederzeit möglich.',
          'KI-Aktionen sind nachvollziehbar dokumentiert.',
          'Keine langfristige Bindung während des Piloten.',
        ],
        en: [
          'Actions can be approved or taken over manually.',
          'You can intervene at any time.',
          'AI actions are documented and traceable.',
          'No long-term commitment during the pilot.',
        ],
      },
    },

    form: {
      headline: {
        de: 'Für das Beta-Agentenprogramm bewerben',
        en: 'Apply for the Beta Agent Program',
      },
      intro: {
        de: 'Wenn Ihr Maklerbüro zum Profil passt, nutzen Sie das Formular für die Bewerbung. Ziel der Seite ist nicht ein allgemeiner Newsletter-Lead, sondern eine qualifizierte Pilot-Anfrage mit klarer Eignung und echtem Interesse.',
        en: 'If your brokerage fits the profile, use the form to apply. The goal of this page is not a generic newsletter signup, but a qualified pilot application with clear fit and real interest.',
      },
      fieldsLabel: {
        de: 'Was wir im Formular abfragen',
        en: 'What the application form asks',
      },
      fields: {
        de: [
          'Vorname & Nachname',
          'Firmenname',
          'Rolle im Unternehmen',
          'E-Mail & Telefonnummer',
          'Stadt / Marktgebiet',
          'Anzahl der Makler im Team',
          'Verkauf, Vermietung oder beides',
          'Wie viele neue Anfragen pro Monat',
          'Aktuell genutztes CRM oder andere Tools',
          'Warum Sie am Beta-Programm teilnehmen möchten',
          'Zustimmung zu Datenschutz und Kontaktaufnahme',
        ],
        en: [
          'First & last name',
          'Company name',
          'Role in the company',
          'Email & phone number',
          'City / market area',
          'Number of agents on the team',
          'Sales, lettings, or both',
          'Number of new inquiries per month',
          'Currently used CRM or other tools',
          'Why you want to join the beta program',
          'Consent to privacy & contact',
        ],
      },
      cta: { de: 'Jetzt als Beta-Partner bewerben', en: 'Apply as a beta partner now' },
      microcopy: {
        de: 'Geschlossene Beta. Begrenzte Plätze. Rückmeldung nach Prüfung der Bewerbung.',
        en: 'Closed beta. Limited spots. We respond after reviewing your application.',
      },
    },

    faq: {
      headline: { de: 'Kurze FAQ', en: 'Short FAQ' },
      items: {
        de: [
          {
            q: 'Wie lange dauert der Pilot?',
            a: 'Der Pilot ist auf 12 Wochen ausgelegt.',
          },
          {
            q: 'Ist die Teilnahme kostenlos?',
            a: 'Ja, der Zugang in der Beta ist kostenlos.',
          },
          {
            q: 'Gibt es einen Vertrag oder eine Verpflichtung?',
            a: 'Laut Pitch Deck gibt es keine Verpflichtung zur Verlängerung, und der Pilot kann beendet werden.',
          },
          {
            q: 'Wie viel Zeit muss das Team investieren?',
            a: 'Der Pitch nennt etwa 2 Stunden Setup und danach rund 30 Minuten Feedback pro Woche.',
          },
          {
            q: 'Für wen ist das Programm nicht gedacht?',
            a: 'Nicht ideal ist es für Teams, die keine echten Workflows testen wollen oder kein regelmäßiges Feedback geben können.',
          },
        ],
        en: [
          {
            q: 'How long does the pilot last?',
            a: 'The pilot is designed to run for 12 weeks.',
          },
          {
            q: 'Is participation free?',
            a: 'Yes, access during the beta is free.',
          },
          {
            q: 'Is there a contract or commitment?',
            a: 'According to the pitch deck, there is no obligation to renew, and the pilot can be ended.',
          },
          {
            q: 'How much time does the team have to invest?',
            a: 'The pitch states roughly 2 hours of setup and then about 30 minutes of feedback per week.',
          },
          {
            q: 'Who is the program not for?',
            a: 'It is not ideal for teams that don’t want to test in real workflows or can’t give regular feedback.',
          },
        ],
      },
    },

    finalCta: {
      headline: {
        de: '20 Plätze. Klare Ergebnisse. Direkter Zugang zum Team.',
        en: '20 spots. Clear results. Direct access to the team.',
      },
      body: {
        de: 'Wenn Ihr Maklerbüro schneller auf Leads reagieren und ein neues System früh mitgestalten möchte, ist das Beta-Agentenprogramm der richtige Einstieg.',
        en: 'If your brokerage wants to respond to leads faster and help shape a new system early, the Beta Agent Program is the right starting point.',
      },
      cta: { de: 'Für Beta bewerben', en: 'Apply for the beta' },
      linksLabel: { de: 'Mehr erfahren:', en: 'Learn more:' },
      linkProduct: { de: 'KI-Maklersoftware', en: 'AI software for real estate brokers' },
      linkDemo: { de: 'Demo-Seite', en: 'Demo page' },
      linkPricing: { de: 'Immob24 Preise', en: 'Immob24 pricing' },
    },
  },

  // ============================================
  // FOOTER
  // ============================================
  footer: {
    sectionsLabel: {
      de: 'Navigation',
      en: 'Navigation',
    },
    legalLabel: {
      de: 'Rechtliches',
      en: 'Legal',
    },
    settingsLabel: {
      de: 'Einstellungen',
      en: 'Settings',
    },
    contact: {
      de: 'Kontakt',
      en: 'Contact',
    },
    impressum: {
      de: 'Impressum',
      en: 'Imprint',
    },
    datenschutz: {
      de: 'Datenschutz',
      en: 'Privacy Policy',
    },
    termsOfService: {
      de: 'AGB',
      en: 'Terms of Service',
    },
    cookies: {
      de: 'Cookie-Richtlinie',
      en: 'Cookie Policy',
    },
    privacy: {
      de: 'Datenschutz',
      en: 'Privacy',
    },
    cookieSettings: {
      de: 'Cookie-Einstellungen',
      en: 'Cookie Settings',
    },
    copyright: {
      de: 'Alle Rechte vorbehalten.',
      en: 'All rights reserved.',
    },
  },

  // ============================================
  // COOKIE CONSENT (banner + settings modal, all pages)
  // ============================================
  cookieConsent: {
    bannerTitle: {
      de: 'Cookies & Datenschutz',
      en: 'Cookies & privacy',
    },
    bannerBody: {
      de: 'Wir setzen technisch notwendige Cookies ein, damit diese Website funktioniert. Mit Ihrer Einwilligung nutzen wir zusätzlich Analyse- und Marketing-Cookies (z. B. Google Analytics, Meta Pixel), um die Nutzung zu verstehen und unsere Inhalte zu verbessern. Sie können Ihre Auswahl jederzeit unter „Cookie-Einstellungen" anpassen.',
      en: 'We use strictly necessary cookies to make this website work. With your consent we also use analytics and marketing cookies (e.g. Google Analytics, Meta Pixel) to understand usage and improve our content. You can change your choice at any time via "Cookie Settings".',
    },
    acceptAll: {
      de: 'Alle akzeptieren',
      en: 'Accept all',
    },
    rejectAll: {
      de: 'Alle ablehnen',
      en: 'Reject all',
    },
    manage: {
      de: 'Einstellungen',
      en: 'Manage settings',
    },
    save: {
      de: 'Auswahl speichern',
      en: 'Save selection',
    },
    settingsTitle: {
      de: 'Cookie-Einstellungen',
      en: 'Cookie settings',
    },
    settingsIntro: {
      de: 'Sie entscheiden selbst, welche Cookies geladen werden. Notwendige Cookies sind für den Betrieb der Website erforderlich und können nicht deaktiviert werden.',
      en: 'You decide which cookies are loaded. Strictly necessary cookies are required for the site to work and cannot be turned off.',
    },
    categoryEssentialName: {
      de: 'Notwendig',
      en: 'Strictly necessary',
    },
    categoryEssentialDesc: {
      de: 'Diese Cookies sind für den Betrieb der Website erforderlich (z. B. Spracheinstellung, Cookie-Auswahl). Sie können nicht deaktiviert werden. Rechtsgrundlage: berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO).',
      en: 'These cookies are required for the site to function (e.g. language preference, your cookie choice). They cannot be turned off. Legal basis: legitimate interest (Art. 6(1)(f) GDPR).',
    },
    categoryAnalyticsName: {
      de: 'Analyse',
      en: 'Analytics',
    },
    categoryAnalyticsDesc: {
      de: 'Google Analytics 4 (Google Ireland Ltd.) hilft uns zu verstehen, wie Besucher die Website nutzen. Es werden anonymisierte Nutzungsdaten erhoben. Rechtsgrundlage: Einwilligung (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TTDSG).',
      en: 'Google Analytics 4 (Google Ireland Ltd.) helps us understand how visitors use the site. Anonymized usage data is collected. Legal basis: consent (Art. 6(1)(a) GDPR, §25(1) TTDSG).',
    },
    categoryMarketingName: {
      de: 'Marketing',
      en: 'Marketing',
    },
    categoryMarketingDesc: {
      de: 'Meta Pixel (Meta Platforms Ireland Ltd.) misst die Wirksamkeit unserer Kampagnen. Hierbei werden Daten an Meta in den USA übertragen. Rechtsgrundlage: Einwilligung (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TTDSG, Art. 49 Abs. 1 lit. a DSGVO für die Drittlandübermittlung).',
      en: 'Meta Pixel (Meta Platforms Ireland Ltd.) measures the effectiveness of our campaigns. This involves transferring data to Meta in the US. Legal basis: consent (Art. 6(1)(a) GDPR, §25(1) TTDSG, Art. 49(1)(a) GDPR for the third-country transfer).',
    },
    on: {
      de: 'An',
      en: 'On',
    },
    off: {
      de: 'Aus',
      en: 'Off',
    },
    alwaysOn: {
      de: 'Immer aktiv',
      en: 'Always on',
    },
    close: {
      de: 'Schließen',
      en: 'Close',
    },
  },

  // ============================================
  // NEWSLETTER SIGNUP (footer button + modal, all pages)
  // ============================================
  newsletter: {
    button: {
      de: 'Newsletter abonnieren',
      en: 'Subscribe to newsletter',
    },
    ariaOpen: {
      de: 'Newsletter-Anmeldung öffnen',
      en: 'Open newsletter signup',
    },
    title: {
      de: 'Immob24 Newsletter',
      en: 'Immob24 newsletter',
    },
    subtitle: {
      de: 'Produkt-Updates, KI-Tipps für Makler und Neuigkeiten von Immob24 — direkt in Ihr Postfach.',
      en: 'Product updates, AI tips for brokers, and Immob24 news — straight to your inbox.',
    },
    nameLabel: {
      de: 'Name (optional)',
      en: 'Name (optional)',
    },
    namePlaceholder: {
      de: 'Ihr Name',
      en: 'Your name',
    },
    emailLabel: {
      de: 'E-Mail-Adresse',
      en: 'Email address',
    },
    emailPlaceholder: {
      de: 'name@beispiel.de',
      en: 'name@example.com',
    },
    emailRequired: {
      de: 'Bitte geben Sie Ihre E-Mail-Adresse ein.',
      en: 'Please enter your email address.',
    },
    emailInvalid: {
      de: 'E-Mail ist ungültig.',
      en: 'Email is invalid.',
    },
    submit: {
      de: 'Abonnieren',
      en: 'Subscribe',
    },
    submitting: {
      de: 'Wird gesendet …',
      en: 'Sending …',
    },
    successTitle: {
      de: 'Vielen Dank!',
      en: 'Thank you!',
    },
    successBody: {
      de: 'Ihre Anmeldung ist eingegangen. Wir halten Sie mit Neuigkeiten von Immob24 auf dem Laufenden.',
      en: 'Your signup has been received. We will keep you posted with news from Immob24.',
    },
    errorBody: {
      de: 'Ihre Anmeldung konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.',
      en: 'We could not submit your subscription. Please try again later.',
    },
    consent: {
      de: 'Mit der Anmeldung stimmen Sie dem Erhalt unseres Newsletters zu. Sie können sich jederzeit abmelden.',
      en: 'By subscribing you agree to receive our newsletter. You can unsubscribe at any time.',
    },
    close: {
      de: 'Schließen',
      en: 'Close',
    },
  },

  // ============================================
  // HOW IT WORKS PAGE  (/de/how-it-works)
  // ============================================
  howItWorksPage: {
    nav: { de: 'So funktioniert’s', en: 'How it works' },

    meta: {
      title: {
        de: 'So funktioniert Immob24 | KI für Makler',
        en: 'How Immob24 Works | AI for Real Estate Brokers',
      },
      description: {
        de: 'So funktioniert KI für Makler: Immob24 beantwortet neue Anfragen, qualifiziert Leads und koordiniert Follow-ups — der Ablauf im Makler-Alltag Schritt für Schritt.',
        en: 'See how Immob24 works: it answers new inquiries, qualifies leads, and coordinates follow-ups — the broker’s day-to-day flow, step by step.',
      },
    },

    hero: {
      eyebrow: { de: 'So funktioniert’s', en: 'How it works' },
      headline: {
        de: 'So funktioniert Immob24 — KI im Makler-Alltag',
        en: 'How Immob24 works — AI for real estate brokers',
      },
      subheadline: {
        de: 'Immob24 übernimmt die operative Strecke zwischen eingehender Anfrage, erster Antwort, Qualifizierung, Terminlogik und Follow-up. So versteht Ihr Team schneller, welche Leads Priorität haben und wo persönlicher Einsatz wirklich nötig ist.',
        en: 'Immob24 handles the operational stretch between an incoming inquiry, the first reply, qualification, scheduling logic, and follow-up. Your team sees faster which leads matter and where personal attention is actually needed.',
      },
      primaryCta: { de: 'Demo anfragen', en: 'Request demo' },
      secondaryCta: { de: 'Produkt ansehen', en: 'See the product' },
      bullets: {
        de: [
          'Antwort in Sekunden statt in Stunden.',
          'Frühe Qualifizierung statt später Nacharbeit.',
          'Nächste Schritte werden automatisch angestoßen.',
          'Ihr Team greift dort ein, wo Beratung den größten Hebel hat.',
        ],
        en: [
          'Replies in seconds instead of hours.',
          'Early qualification instead of late rework.',
          'Next steps are triggered automatically.',
          'Your team steps in where advice has the biggest impact.',
        ],
      },
    },

    intro: {
      headline: {
        de: 'Was Immob24 im Prozess verändert',
        en: 'What Immob24 changes in the process',
      },
      body: {
        de: 'In vielen Maklerbüros geht Zeit zwischen Anfrageeingang und nächster sinnvoller Aktion verloren. Immob24 setzt genau dort an: Das System reagiert sofort, sammelt wichtige Informationen, priorisiert den Lead und stößt den nächsten Schritt an. Das Ergebnis ist kein zusätzlicher Verwaltungsprozess, sondern ein operativer Ablauf mit weniger Lücken und weniger manueller Koordination.',
        en: 'In many brokerages, time leaks away between an incoming inquiry and the next sensible action. Immob24 starts exactly there: it reacts immediately, collects the relevant information, prioritises the lead, and triggers the next step. The result is not an extra admin process, but an operational flow with fewer gaps and less manual coordination.',
      },
    },

    steps: {
      headline: { de: 'Der Ablauf Schritt für Schritt', en: 'The flow, step by step' },
      items: {
        de: [
          {
            title: 'Schritt 1: Eine neue Anfrage geht ein',
            body: 'Anfragen können aus Portalen, Formularen oder anderen Kanälen kommen. Für das Team beginnt genau hier normalerweise der Zeitverlust — besonders außerhalb der Arbeitszeiten oder bei hohem Anfragevolumen.',
          },
          {
            title: 'Schritt 2: Immob24 reagiert sofort',
            body: 'Sobald der Lead eingeht, startet Immob24 die erste Reaktion. Damit verkürzt sich die Zeit bis zum Erstkontakt drastisch, statt dass Interessenten stundenlang oder bis zum nächsten Arbeitstag warten.',
          },
          {
            title: 'Schritt 3: Die KI qualifiziert den Lead',
            body: 'Im nächsten Schritt sammelt das System die Informationen, die für die Einordnung und Priorisierung wichtig sind. So wird früh erkannt, welche Anfragen hohe Relevanz haben, wo schneller gehandelt werden sollte und welche Gespräche noch weitere Informationen brauchen.',
          },
          {
            title: 'Schritt 4: Der nächste Schritt wird vorbereitet',
            body: 'Nach der Qualifizierung stößt Immob24 die passende nächste Aktion an. Das kann Terminlogik, Rückfrage, Übergabe oder Follow-up sein — je nachdem, was im Prozess sinnvoll ist.',
          },
          {
            title: 'Schritt 5: Das Team steigt gezielt ein',
            body: 'Makler verbringen ihre Zeit nicht mehr mit jeder ersten Standardreaktion, sondern dort, wo persönliche Beratung, Besichtigung und Abschluss wirklich zählen. So verschiebt sich der Einsatz von manueller Arbeit auf die wertvolleren Prozessmomente.',
          },
          {
            title: 'Schritt 6: Follow-ups bleiben aktiv',
            body: 'Wenn ein Gespräch nicht sofort abgeschlossen wird, sorgt Immob24 dafür, dass der Prozess nicht stillsteht. Follow-ups werden nicht vergessen, und Leads bleiben im Fluss statt im Posteingang oder in manuellen Listen zu verschwinden.',
          },
        ],
        en: [
          {
            title: 'Step 1: A new inquiry arrives',
            body: 'Inquiries can come from portals, forms, or other channels. For the team, this is usually where time starts to leak away — especially outside working hours or during high inquiry volume.',
          },
          {
            title: 'Step 2: Immob24 reacts immediately',
            body: 'As soon as a lead arrives, Immob24 starts the first response. The time-to-first-contact drops drastically, instead of leaving prospects to wait for hours or until the next business day.',
          },
          {
            title: 'Step 3: The AI qualifies the lead',
            body: 'Next, the system collects the information needed for prioritisation. You see early which inquiries are highly relevant, where to act faster, and which conversations still need more information.',
          },
          {
            title: 'Step 4: The next step is prepared',
            body: 'After qualification, Immob24 triggers the right next action — scheduling, a follow-up question, a handover, or a follow-up — depending on what makes sense in the process.',
          },
          {
            title: 'Step 5: The team steps in deliberately',
            body: 'Agents no longer spend time on every first standard reply. They focus on personal advice, viewings, and closings — where their work has the most leverage.',
          },
          {
            title: 'Step 6: Follow-ups stay active',
            body: 'When a conversation does not close immediately, Immob24 keeps the process moving. Follow-ups are not forgotten, and leads stay in flow instead of disappearing into an inbox or a manual list.',
          },
        ],
      },
    },

    process: {
      headline: {
        de: 'Welche Aufgaben Immob24 in diesem Ablauf übernimmt',
        en: 'What Immob24 takes off your plate in this flow',
      },
      bullets: {
        de: [
          'Erstreaktion auf neue Leads.',
          'Frühe Lead-Qualifizierung.',
          'Koordination des nächsten Schritts.',
          'Laufende Nachverfolgung statt manueller Erinnerung.',
          'Operative Entlastung im Makleralltag.',
        ],
        en: [
          'First reaction to new leads.',
          'Early lead qualification.',
          'Coordinating the next step.',
          'Ongoing follow-up instead of manual reminders.',
          'Operational relief in everyday brokerage work.',
        ],
      },
    },

    why: {
      headline: {
        de: 'Warum dieser Ablauf geschäftlich relevant ist',
        en: 'Why this flow matters for the business',
      },
      body: {
        de: 'Der Unterschied entsteht nicht nur durch Automatisierung, sondern durch Geschwindigkeit und Konsequenz im Prozess. Wenn Anfragen schneller beantwortet, Leads früher eingeordnet und nächste Schritte zuverlässiger vorbereitet werden, steigt die Chance auf mehr qualifizierte Gespräche und weniger verlorene Opportunities. Genau deshalb sollte die Seite nicht nur erklären, was passiert, sondern warum diese Prozesslogik im Maklergeschäft zählt.',
        en: 'The difference is not just automation — it is speed and consistency. When inquiries are answered faster, leads are qualified earlier, and next steps are prepared more reliably, you get more qualified conversations and fewer lost opportunities. That is why this page is meant to explain not only what happens, but why the process logic matters in the brokerage business.',
      },
    },

    control: {
      headline: { de: 'Automatisiert, aber nicht unkontrolliert', en: 'Automated, not out of your hands' },
      body: {
        de: 'Immob24 ist nicht als Black Box zu erklären. Das System soll operative Arbeit übernehmen, während das Maklerbüro die Kontrolle behält. Diese Botschaft ist wichtig, weil Vertrauen, Freigabe und Nachvollziehbarkeit zentrale Hürden bei der Einführung von KI in reale Vertriebs- und Maklerprozesse sind.',
        en: 'Immob24 is not a black box. The system handles operational work while the brokerage stays in control. That message matters because trust, sign-off, and traceability are the central hurdles when bringing AI into real sales and brokerage processes.',
      },
      bullets: {
        de: [
          'Das Team bleibt im entscheidenden Moment eingebunden.',
          'Der Ablauf ist klar und nachvollziehbar aufgebaut.',
          'Immob24 ergänzt Prozesse, statt den Arbeitsalltag undurchsichtig zu machen.',
        ],
        en: [
          'The team stays involved at the decisive moment.',
          'The flow is structured clearly and traceably.',
          'Immob24 complements your process instead of making the day opaque.',
        ],
      },
    },

    audience: {
      headline: {
        de: 'Für wen dieser Ablauf besonders relevant ist',
        en: 'Who this flow is particularly relevant for',
      },
      bullets: {
        de: [
          'Maklerbüros mit vielen eingehenden Anfragen.',
          'Teams, die aktuell zu langsam auf neue Leads reagieren.',
          'Unternehmen mit manueller Qualifizierung und Terminabstimmung.',
          'Makler, die operative Entlastung suchen, ohne ihr gesamtes Setup neu aufzubauen.',
        ],
        en: [
          'Brokerages with high inquiry volume.',
          'Teams that are currently too slow to respond to new leads.',
          'Companies with manual qualification and scheduling.',
          'Agents looking for operational relief without rebuilding their entire stack.',
        ],
      },
    },

    faq: {
      headline: { de: 'Häufige Fragen', en: 'Frequently asked questions' },
      items: {
        de: [
          {
            q: 'Muss das Team weiterhin eingreifen?',
            a: 'Ja. Immob24 übernimmt operative Schritte, während das Team dort eingreift, wo Beratung und persönlicher Kontakt den größten Wert schaffen.',
          },
          {
            q: 'Beginnt der Ablauf direkt mit einer neuen Anfrage?',
            a: 'Ja. Die Logik der Seite startet bewusst beim Lead-Eingang, weil dort im Alltag der größte Zeitverlust entsteht.',
          },
          {
            q: 'Geht es nur um Antworten oder um den ganzen Folgeprozess?',
            a: 'Nicht nur um Antworten. Qualifizierung, nächste Schritte und Follow-ups sind Teil derselben operativen Logik.',
          },
          {
            q: 'Ersetzt Immob24 damit ein CRM?',
            a: 'Nein. Immob24 ist eine operative KI-Schicht, kein klassisches CRM.',
          },
        ],
        en: [
          {
            q: 'Does the team still need to step in?',
            a: 'Yes. Immob24 handles operational steps, while the team steps in where advice and personal contact create the most value.',
          },
          {
            q: 'Does the flow really start with a new inquiry?',
            a: 'Yes. The logic deliberately begins at lead arrival, because that is where most time is lost in everyday work.',
          },
          {
            q: 'Is this only about replies, or the whole follow-up process?',
            a: 'Not only replies. Qualification, next steps, and follow-ups are all part of the same operational logic.',
          },
          {
            q: 'Does Immob24 replace a CRM?',
            a: 'No. Immob24 is an operational AI layer, not a classic CRM.',
          },
        ],
      },
    },

    finalCta: {
      headline: {
        de: 'Sehen Sie den Ablauf live in Ihrer Demo',
        en: 'See the flow live in your demo',
      },
      body: {
        de: 'Wenn der Prozess für Ihr Maklerbüro relevant klingt, sollte der nächste Schritt nicht ein langer Textblock sein, sondern eine klare Einladung zur Demo. Dort kann gezeigt werden, wie Immob24 in Ihrem tatsächlichen Workflow vom Lead-Eingang bis zum Follow-up arbeitet.',
        en: 'If this process sounds relevant for your brokerage, the next step should not be more text — it should be a quick demo. We will show how Immob24 works in your actual workflow, from inbound lead to follow-up.',
      },
      primaryCta: { de: 'Demo anfragen', en: 'Request demo' },
      secondaryCta: { de: 'Produkt ansehen', en: 'See the product' },
      linksLabel: { de: 'Mehr erfahren:', en: 'Learn more:' },
      linkPricing: { de: 'Immob24 Preise', en: 'Immob24 pricing' },
      linkDemo: { de: 'Demo-Seite', en: 'Demo page' },
    },
  },

  // ============================================
  // DEMO PAGE  (/de/demo)
  // ============================================
  demoPage: {
    nav: { de: 'Demo', en: 'Demo' },

    meta: {
      title: {
        de: 'Immob24 Demo anfragen | KI für Makler',
        en: 'Request an Immob24 Demo | AI for Brokers',
      },
      description: {
        de: 'Erleben Sie Immob24 in einem 30-minütigen Demo-Call: wie die KI-Maklersoftware neue Anfragen beantwortet, Leads qualifiziert und Follow-ups übernimmt.',
        en: 'Test Immob24 in a 30-minute demo call. See how the AI responds to new real estate leads, qualifies inquiries, and prepares follow-ups.',
      },
    },

    hero: {
      eyebrow: { de: 'Demo', en: 'Demo' },
      headline: {
        de: 'Immob24 Demo anfragen — KI-Maklersoftware live erleben',
        en: 'Request an Immob24 demo — see AI real estate software live',
      },
      subheadline: {
        de: 'In der Demo zeigen wir, wie Immob24 neue Anfragen beantwortet, Leads qualifiziert, nächste Schritte vorbereitet und Follow-ups im Prozess hält. Das Ziel ist nicht eine generische Produktpräsentation, sondern ein klares Verständnis dafür, wie Immob24 in Ihr Maklerbüro passt.',
        en: 'In the demo we show how Immob24 answers new inquiries, qualifies leads, prepares next steps, and keeps follow-ups in flow. The goal is not a generic product walkthrough — it is a clear view of how Immob24 fits your brokerage.',
      },
      primaryCta: { de: 'Demo anfragen', en: 'Request demo' },
      microcopy: {
        de: 'Kurz, relevant und auf Ihren Workflow bezogen.',
        en: 'Short, relevant, and grounded in your workflow.',
      },
    },

    form: {
      headline: { de: 'Demo anfragen', en: 'Request a demo' },
      intro: {
        de: 'Wenn Ihr Maklerbüro schneller auf Leads reagieren und operative Arbeit reduzieren möchte, nutzen Sie das Formular für Ihre Demo-Anfrage. Wir fragen nur die Informationen ab, die wir für eine qualifizierte Terminvorbereitung brauchen.',
        en: 'If your brokerage wants to respond faster to leads and cut operational work, use the form to request your demo. We only ask for what we need to prepare a qualified call.',
      },
      microcopy: {
        de: 'Wir melden uns mit einem passenden Termin und bereiten die Demo auf Ihren Anwendungsfall vor.',
        en: 'We will reach out with a time that works and prepare the demo around your use case.',
      },
    },

    whatYouSee: {
      headline: { de: 'Was Sie in der Demo sehen', en: 'What you will see in the demo' },
      bullets: {
        de: [
          'Wie Immob24 neue Anfragen sofort verarbeitet.',
          'Wie Leads früh qualifiziert und priorisiert werden.',
          'Wie Termin- und nächste-Schritt-Logik im Prozess funktioniert.',
          'Wie Immob24 bestehende Maklerprozesse ergänzt, statt unnötig Komplexität zu schaffen.',
        ],
        en: [
          'How Immob24 processes new inquiries immediately.',
          'How leads are qualified and prioritised early.',
          'How scheduling and next-step logic work in the flow.',
          'How Immob24 complements your existing process instead of adding complexity.',
        ],
      },
      support: {
        de: 'Die Demo ist kein langer Feature-Rundgang. Sie richtet sich an die konkreten Fragen und Prioritäten Ihres Maklerbüros und zeigt, wie Immob24 operative Reibung im Alltag reduziert.',
        en: 'The demo is not a long feature tour. It focuses on the concrete questions and priorities of your brokerage and shows how Immob24 reduces operational friction in everyday work.',
      },
    },

    whoFor: {
      headline: { de: 'Für wen sich die Demo besonders lohnt', en: 'Who the demo is especially worth it for' },
      bullets: {
        de: [
          'Maklerbüros mit regelmäßig eingehenden Leads.',
          'Teams, die schneller auf Anfragen reagieren wollen.',
          'Unternehmen mit manueller Qualifizierung oder Nachverfolgung.',
          'Makler, die prüfen wollen, wie Immob24 in bestehende Abläufe passt.',
        ],
        en: [
          'Brokerages with a steady stream of leads.',
          'Teams that want to react faster to inquiries.',
          'Companies with manual qualification or follow-up.',
          'Agents who want to see how Immob24 fits their existing process.',
        ],
      },
    },

    notDemo: {
      headline: { de: 'Was die Demo nicht ist', en: 'What the demo is not' },
      body: {
        de: 'Die Demo ist kein allgemeiner Sales-Pitch. Sie ist eine relevante, praxisnahe Einschätzung statt einer Standardpräsentation. Klare Erwartungen, Vertrauen und Fokus erhöhen die Wahrscheinlichkeit, dass Sie nach 30 Minuten wirklich wissen, ob Immob24 zu Ihrem Maklerbüro passt.',
        en: 'The demo is not a generic sales pitch. It is a relevant, hands-on assessment, not a standard presentation. Clear expectations, trust, and focus mean that after 30 minutes you really know whether Immob24 fits your brokerage.',
      },
      bullets: {
        de: [
          'Kein unnötig langer Termin ohne Relevanz.',
          'Fokus auf Ihren Anwendungsfall.',
          'Klare nächste Schritte nach dem Gespräch.',
          'Geeignet für Teams, die ernsthaft evaluieren wollen.',
        ],
        en: [
          'No long meeting without relevance.',
          'Focus on your use case.',
          'Clear next steps after the conversation.',
          'Suited for teams that want to evaluate seriously.',
        ],
      },
    },

    objections: {
      headline: { de: 'Häufige Bedenken vor einer Demo', en: 'Common concerns before a demo' },
      items: {
        de: [
          {
            q: 'Wir wollen erst verstehen, ob Immob24 zu unserem Prozess passt.',
            a: 'Genau dafür ist die Demo da. Wir zeigen, wie Immob24 in reale Maklerabläufe eingebunden werden kann und wo der operative Nutzen entsteht.',
          },
          {
            q: 'Wir haben nicht viel Zeit.',
            a: 'Die Demo ist niedrigschwellig: 30 Minuten, fokussiert auf Ihren Anwendungsfall — kein schwerer Vertriebstermin.',
          },
          {
            q: 'Wir nutzen bereits andere Tools.',
            a: 'Immob24 ergänzt bestehende Prozesse und verlangt keinen automatischen Systemwechsel.',
          },
        ],
        en: [
          {
            q: 'We first want to understand whether Immob24 fits our process.',
            a: 'That is exactly what the demo is for. We show how Immob24 plugs into real brokerage workflows and where the operational value lives.',
          },
          {
            q: 'We do not have much time.',
            a: 'The demo is low-friction: 30 minutes, focused on your use case — not a heavy sales meeting.',
          },
          {
            q: 'We already use other tools.',
            a: 'Immob24 complements existing processes and does not force a full system switch.',
          },
        ],
      },
    },

    faq: {
      headline: { de: 'Häufige Fragen zur Demo', en: 'Demo FAQs' },
      items: {
        de: [
          {
            q: 'Wie läuft die Demo ab?',
            a: 'Anwendungsbezogen: wir zeigen, wie Immob24 auf Anfragen, Qualifizierung, nächste Schritte und Follow-ups im Makleralltag angewendet wird.',
          },
          {
            q: 'Wie lange dauert die Demo?',
            a: 'In der Regel 30 Minuten. Kürzere, klar strukturierte Demos reduzieren Reibung bei kaufnahen Besuchern.',
          },
          {
            q: 'Ist die Demo nur für größere Teams?',
            a: 'Nein. Sie ist besonders auch für kleine und mittelgroße Maklerbüros relevant.',
          },
          {
            q: 'Muss ich vorab viel vorbereiten?',
            a: 'Nein. Das Formular fragt nur die wichtigsten Informationen ab, damit die Demo sinnvoll vorbereitet werden kann.',
          },
        ],
        en: [
          {
            q: 'How does the demo work?',
            a: 'It is workflow-driven: we show how Immob24 handles inquiries, qualification, next steps, and follow-ups in everyday brokerage work.',
          },
          {
            q: 'How long does the demo take?',
            a: 'Usually 30 minutes. Short, structured demos reduce friction for buyers who are close to a decision.',
          },
          {
            q: 'Is the demo only for larger teams?',
            a: 'No. It is also especially relevant for small and mid-sized brokerages.',
          },
          {
            q: 'Do I need to prepare a lot in advance?',
            a: 'No. The form only asks for what is needed to prepare a useful demo.',
          },
        ],
      },
    },

    finalCta: {
      headline: {
        de: 'Finden Sie heraus, ob Immob24 zu Ihrem Maklerbüro passt',
        en: 'Find out whether Immob24 fits your brokerage',
      },
      body: {
        de: 'Wenn Ihr Team regelmäßig neue Anfragen verarbeitet und schneller, strukturierter und mit weniger manueller Reibung arbeiten möchte, ist die Demo der beste nächste Schritt.',
        en: 'If your team handles new inquiries regularly and wants to work faster, more structured, and with less manual friction, the demo is the best next step.',
      },
      primaryCta: { de: 'Demo anfragen', en: 'Request demo' },
      linksLabel: { de: 'Mehr erfahren:', en: 'Learn more:' },
      linkProduct: { de: 'KI-Maklersoftware', en: 'AI software for real estate brokers' },
      linkPricing: { de: 'Immob24 Preise', en: 'Immob24 pricing' },
      linkBeta: { de: 'Beta-Agentenprogramm', en: 'Beta agent program' },
    },
  },

  // ============================================
  // CRM ALTERNATIVE PAGE  (/de/immobilien-crm-alternative)
  // ============================================
  crmAltPage: {
    nav: { de: 'CRM-Alternative', en: 'CRM alternative' },

    meta: {
      title: {
        de: 'Immobilien-CRM-Alternative für Makler | Immob24',
        en: 'Real Estate CRM Alternative for Brokers | Immob24',
      },
      description: {
        de: 'Immob24 ist keine CRM-Lösung, sondern die KI-Schicht, die Ihr bestehendes CRM schneller macht — die Immobilien-CRM-Alternative für schnelle Lead-Reaktion.',
        en: 'Immob24 is not a traditional CRM. It is the AI layer that helps your existing CRM work faster through lead response, qualification, and follow-up.',
      },
    },

    hero: {
      eyebrow: { de: 'CRM-Alternative', en: 'CRM alternative' },
      headline: {
        de: 'Immobilien-CRM-Alternative: Was Immob24 anders macht',
        en: 'Real estate CRM alternative: what Immob24 does differently',
      },
      subheadline: {
        de: 'Viele Immobilienmakler suchen nach Struktur, schnelleren Reaktionen und weniger manueller Nacharbeit — und landen automatisch bei CRM-Software. Immob24 verfolgt einen anderen Ansatz: nicht noch mehr Verwaltung, sondern operative Ausführung zwischen Anfrage, Qualifizierung, nächstem Schritt und Follow-up.',
        en: 'Many real estate agents look for structure, faster responses, and less manual rework — and automatically land on CRM software. Immob24 takes a different approach: not more admin, but operational execution between inquiry, qualification, next step, and follow-up.',
      },
      primaryCta: { de: 'Demo anfragen', en: 'Request demo' },
      secondaryCta: { de: 'Produkt ansehen', en: 'See the product' },
      bullets: {
        de: [
          'Kein klassisches CRM.',
          'Fokus auf operative Arbeit statt nur Datenverwaltung.',
          'Für Maklerbüros, die schneller handeln wollen.',
        ],
        en: [
          'Not a classic CRM.',
          'Focus on operational work, not just data management.',
          'For brokerages that want to act faster.',
        ],
      },
    },

    framing: {
      headline: { de: 'Worum es bei diesem Vergleich wirklich geht', en: 'What this comparison is really about' },
      body: {
        de: 'Diese Seite behauptet nicht, dass ein CRM grundsätzlich falsch ist. Gute Vergleichsseiten erklären ehrlich, welche Aufgabe ein klassisches CRM gut erfüllt — und wo es für bestimmte Teams oder Prozessprobleme nicht ausreicht. Genau dort ist Immob24 positioniert: als operative KI-Schicht für Maklerprozesse, nicht als weitere Verwaltungsoberfläche.',
        en: 'This page does not claim that CRMs are wrong. Good comparison pages explain honestly what a classic CRM does well — and where it falls short for certain teams or process problems. That is exactly where Immob24 sits: as an operational AI layer for brokerage processes, not yet another admin surface.',
      },
    },

    table: {
      headline: { de: 'Klassisches CRM vs. Immob24', en: 'Classic CRM vs. Immob24' },
      headers: {
        de: ['Thema', 'Klassisches CRM', 'Immob24'],
        en: ['Topic', 'Classic CRM', 'Immob24'],
      },
      rows: {
        de: [
          ['Hauptzweck', 'Kontakte, Vorgänge und Daten verwalten.', 'Operative Arbeit zwischen Anfrage und nächstem Schritt automatisieren.'],
          ['Reaktion auf neue Leads', 'Meist vom Team oder von manuellen Workflows abhängig.', 'Sofortige Reaktion auf neue Anfragen.'],
          ['Lead-Qualifizierung', 'Häufig dokumentations- oder workflowgetrieben.', 'Frühe KI-gestützte Qualifizierung und Priorisierung.'],
          ['Terminlogik', 'Oft über zusätzliche Prozesse oder manuelle Abstimmung.', 'In den operativen Ablauf eingebettet.'],
          ['Follow-ups', 'Abhängig von Teamdisziplin und manueller Nachverfolgung.', 'Werden aktiv im Prozess gehalten.'],
          ['Beste Eignung', 'Für Teams, die vor allem Daten zentral verwalten wollen.', 'Für Teams, die schneller handeln und operative Reibung reduzieren wollen.'],
        ],
        en: [
          ['Main purpose', 'Manage contacts, deals, and data.', 'Automate operational work between inquiry and next step.'],
          ['Reaction to new leads', 'Usually depends on the team or manual workflows.', 'Immediate reaction to new inquiries.'],
          ['Lead qualification', 'Often documentation- or workflow-driven.', 'Early, AI-assisted qualification and prioritisation.'],
          ['Scheduling logic', 'Often handled by extra processes or manual coordination.', 'Embedded in the operational flow.'],
          ['Follow-ups', 'Depends on team discipline and manual nurture.', 'Actively kept moving in the process.'],
          ['Best fit', 'Teams that mainly want to centralise data.', 'Teams that want to act faster and reduce operational friction.'],
        ],
      },
      caption: {
        de: 'Diese Vergleichstabelle ist das Herzstück der Seite — kompakt, ehrlich und schnell scanbar.',
        en: 'This comparison table is the heart of the page — compact, honest, and easy to scan.',
      },
    },

    competitors: {
      headline: {
        de: 'Wie Immob24 sich von Propstack, Flowfact und onOffice unterscheidet',
        en: 'How Immob24 differs from Propstack, Flowfact and onOffice',
      },
      intro: {
        de: 'Propstack, Flowfact und onOffice sind etablierte Immobilien-CRM-Systeme in Deutschland. Sie verwalten Kontakte, Objekte und Vorgänge zuverlässig. Immob24 konkurriert nicht mit dieser Aufgabe — es ergänzt sie um die operative Erstreaktion, Qualifizierung und Follow-up-Logik, die ein CRM nicht automatisch übernimmt.',
        en: 'Propstack, Flowfact and onOffice are established real estate CRM systems in Germany. They reliably manage contacts, properties and records. Immob24 does not compete with that job — it adds the operational first response, qualification and follow-up logic that a CRM does not handle automatically.',
      },
      // [competitor heading, comparison paragraph]
      items: {
        de: [
          [
            'Immob24 vs. Propstack',
            'Propstack ist ein modernes Immobilien-CRM mit Fokus auf Datenpflege, Objektverwaltung und Pipeline-Übersicht. Immob24 ersetzt das nicht, sondern setzt davor an: Es beantwortet neue Anfragen in Sekunden und qualifiziert Leads, bevor sie im CRM-Workflow landen.',
          ],
          [
            'Immob24 vs. Flowfact',
            'Flowfact ist eine langjährig etablierte Maklersoftware für Kontakt- und Vorgangsmanagement. Immob24 ist keine Alternative zur Datenhaltung, sondern zur langsamen, manuellen Lead-Reaktion: Die KI übernimmt Erstkontakt, Vorqualifizierung und Nachverfolgung automatisch.',
          ],
          [
            'Immob24 vs. onOffice',
            'onOffice ist eine umfassende Maklersoftware mit breitem Funktionsumfang für Verwaltung und Reporting. Immob24 fokussiert bewusst nur die operative Strecke zwischen Anfrage und nächstem Schritt — und lässt sich parallel zu onOffice nutzen, statt es abzulösen.',
          ],
        ],
        en: [
          [
            'Immob24 vs. Propstack',
            'Propstack is a modern real estate CRM focused on data hygiene, property management and pipeline overview. Immob24 does not replace it but works ahead of it: it answers new inquiries in seconds and qualifies leads before they reach the CRM workflow.',
          ],
          [
            'Immob24 vs. Flowfact',
            'Flowfact is a long-established broker software for contact and record management. Immob24 is not an alternative to data storage but to slow, manual lead response: the AI handles first contact, pre-qualification and follow-up automatically.',
          ],
          [
            'Immob24 vs. onOffice',
            'onOffice is a comprehensive broker software with a broad feature set for administration and reporting. Immob24 deliberately focuses only on the operational stretch between inquiry and next step — and runs alongside onOffice instead of replacing it.',
          ],
        ],
      },
      note: {
        de: 'Immob24 ist damit weniger eine „CRM-Alternative" im Sinne von Ersatz, sondern die KI-Ausführungsschicht, die Ihr bestehendes Immobilien-CRM schneller macht.',
        en: 'Immob24 is therefore less a “CRM alternative” in the sense of a replacement, and more the AI execution layer that makes your existing real estate CRM faster.',
      },
    },

    whenCrm: {
      headline: { de: 'Wann ein klassisches CRM die richtige Wahl sein kann', en: 'When a classic CRM is the right choice' },
      bullets: {
        de: [
          'Wenn das Hauptproblem Datenorganisation und zentrale Dokumentation ist.',
          'Wenn das Team bereits diszipliniert und schnell auf Leads reagiert.',
          'Wenn operative Engpässe weniger kritisch sind als Reporting und Datenhaltung.',
        ],
        en: [
          'When the main problem is data organisation and central documentation.',
          'When the team already responds to leads quickly and consistently.',
          'When operational bottlenecks matter less than reporting and data hygiene.',
        ],
      },
      support: {
        de: 'Diese Ehrlichkeit erhöht die Glaubwürdigkeit der Seite. Vergleichsseiten konvertieren besser, wenn sie nicht alles andere schlechtreden, sondern klare Entscheidungshilfe geben.',
        en: 'This honesty increases credibility. Comparison pages convert better when they do not bash the alternatives but instead help with the decision.',
      },
    },

    whenImmob: {
      headline: { de: 'Wann Immob24 die bessere Alternative ist', en: 'When Immob24 is the better alternative' },
      bullets: {
        de: [
          'Wenn neue Anfragen zu langsam beantwortet werden.',
          'Wenn Leads nicht früh genug priorisiert werden.',
          'Wenn Terminabstimmung und Follow-ups zu viel manuelle Arbeit erzeugen.',
          'Wenn das Team weniger Verwaltungsaufwand und mehr operative Geschwindigkeit braucht.',
          'Wenn kein weiteres komplexes Verwaltungssystem eingeführt werden soll.',
        ],
        en: [
          'When new inquiries are answered too slowly.',
          'When leads are not prioritised early enough.',
          'When scheduling and follow-ups generate too much manual work.',
          'When the team needs less admin and more operational speed.',
          'When you do not want to introduce yet another complex management system.',
        ],
      },
    },

    fit: {
      headline: { de: 'Für wen Immob24 als CRM-Alternative besonders sinnvoll ist', en: 'Who Immob24 as a CRM alternative is especially right for' },
      bestForLabel: { de: 'Gut geeignet für', en: 'Best for' },
      bestFor: {
        de: [
          'Kleine bis mittelgroße Maklerbüros.',
          'Teams mit hohem Anfragevolumen.',
          'Unternehmen mit operativen Reibungsverlusten im Erstkontakt und Follow-up.',
        ],
        en: [
          'Small to mid-sized brokerages.',
          'Teams with high inquiry volume.',
          'Companies with operational friction in first contact and follow-up.',
        ],
      },
      notForLabel: { de: 'Weniger geeignet für', en: 'Not ideal for' },
      notFor: {
        de: [
          'Teams, die primär ein System of Record suchen.',
          'Unternehmen, die vor allem Datenstrukturen und Reporting zentralisieren wollen.',
          'Käufer, die nur eine klassische CRM-Kategorie evaluieren und keine operative Alternative prüfen möchten.',
        ],
        en: [
          'Teams primarily looking for a system of record.',
          'Companies whose main goal is centralising data structures and reporting.',
          'Buyers who only want to evaluate the classic CRM category, not an operational alternative.',
        ],
      },
    },

    objections: {
      headline: { de: 'Häufige Einwände gegen eine CRM-Alternative', en: 'Common objections to a CRM alternative' },
      items: {
        de: [
          {
            q: 'Wir wollen nicht komplett von vorne anfangen.',
            a: 'Verständlich. Immob24 ergänzt bestehende Prozesse und verlangt keinen radikalen Neustart.',
          },
          {
            q: 'Ein CRM klingt für uns erstmal sicherer.',
            a: 'CRM-Systeme sind für bestimmte Aufgaben sinnvoll. Immob24 ist dann stärker, wenn Geschwindigkeit, Qualifizierung und operative Ausführung im Fokus stehen.',
          },
          {
            q: 'Wir wissen nicht, ob unser Team eine neue Lösung annimmt.',
            a: 'Deshalb gibt es Demo, Beta-Programm und klare Einführungslogik — schrittweise statt mit Druck.',
          },
        ],
        en: [
          {
            q: 'We do not want to start from scratch.',
            a: 'Understandable. Immob24 complements existing processes and does not require a radical restart.',
          },
          {
            q: 'A CRM feels safer at first.',
            a: 'CRMs are useful for certain jobs. Immob24 is stronger when speed, qualification, and operational execution are the priority.',
          },
          {
            q: 'We do not know whether our team will adopt a new solution.',
            a: 'That is why we offer a demo, beta program, and a clear rollout — step by step, not under pressure.',
          },
        ],
      },
    },

    faq: {
      headline: { de: 'Häufige Fragen zur CRM-Alternative', en: 'CRM alternative FAQs' },
      items: {
        de: [
          {
            q: 'Ist Immob24 ein CRM?',
            a: 'Nein. Immob24 ist eine operative KI-Schicht, kein klassisches CRM.',
          },
          {
            q: 'Muss ich mein bestehendes CRM ersetzen?',
            a: 'Nicht zwingend. Immob24 kann bestehende Prozesse ergänzen.',
          },
          {
            q: 'Für wen ist Immob24 besser geeignet als ein CRM?',
            a: 'Für Maklerbüros, die vor allem Reaktionsgeschwindigkeit, Lead-Qualifizierung und Follow-up-Prozesse verbessern wollen.',
          },
          {
            q: 'Ist diese Seite gegen CRM-Systeme gerichtet?',
            a: 'Nein. Die Seite hilft bei der Einordnung und ist kein unfairer Angriff auf die Kategorie.',
          },
        ],
        en: [
          {
            q: 'Is Immob24 a CRM?',
            a: 'No. Immob24 is an operational AI layer, not a classic CRM.',
          },
          {
            q: 'Do I have to replace my existing CRM?',
            a: 'Not necessarily. Immob24 can complement existing processes.',
          },
          {
            q: 'For whom is Immob24 a better fit than a CRM?',
            a: 'For brokerages that mainly want to improve response speed, lead qualification, and follow-up.',
          },
          {
            q: 'Is this page anti-CRM?',
            a: 'No. The page helps with the decision and is not an unfair attack on the category.',
          },
        ],
      },
    },

    finalCta: {
      headline: {
        de: 'Prüfen Sie live, ob Immob24 besser zu Ihrem Maklerbüro passt als ein klassisches CRM',
        en: 'See live whether Immob24 fits your brokerage better than a classic CRM',
      },
      body: {
        de: 'Wenn Ihr Hauptproblem nicht Datenablage, sondern operative Geschwindigkeit ist, lohnt sich die Demo. Dort prüfen wir gemeinsam, wie Immob24 auf Ihren Prozess wirkt und ob eine CRM-Alternative für Ihr Team sinnvoller ist.',
        en: 'If your main problem is operational speed rather than data storage, the demo is worth it. Together we will see how Immob24 affects your process and whether a CRM alternative is the better fit.',
      },
      primaryCta: { de: 'Demo anfragen', en: 'Request demo' },
      secondaryCta: { de: 'Produkt ansehen', en: 'See the product' },
      linksLabel: { de: 'Mehr erfahren:', en: 'Learn more:' },
      linkPricing: { de: 'Immob24 Preise', en: 'Immob24 pricing' },
      linkDemo: { de: 'Demo-Seite', en: 'Demo page' },
    },
  },

  // ============================================
  // PRICING PAGE  (/de/preise)
  // ============================================
  pricingPage: {
    nav: { de: 'Preise', en: 'Pricing' },

    meta: {
      title: {
        de: 'Immob24 Preise | Maklersoftware ab €249',
        en: 'Immob24 Pricing | AI Software from €249/month',
      },
      description: {
        de: 'Immob24 Preise: Beta kostenlos, Team ab 249 €/Monat, Individuell auf Anfrage. Maklersoftware für schnellere Lead-Reaktion — ohne Langzeitvertrag.',
        en: 'Immob24 pricing: free during beta, Team from €249/month, and custom plans on request. No long-term contract during the pilot.',
      },
    },

    hero: {
      eyebrow: { de: 'Preise', en: 'Pricing' },
      headline: {
        de: 'Immob24 Preise — Maklersoftware ab €249 pro Monat',
        en: 'Immob24 pricing — AI software from €249 per month',
      },
      subheadline: {
        de: 'Wählen Sie den passenden Einstieg für Ihr Maklerbüro — vom kostenlosen Beta-Zugang über den Team-Plan ab 249 €/Monat bis zur individuellen Lösung. Vergleichen, auswählen, nächsten Schritt starten.',
        en: 'Choose the right starting point for your brokerage — from free beta access and the Team plan from €249/month to a custom implementation. Compare, choose, start the next step.',
      },
      primaryCta: { de: 'Demo anfragen', en: 'Request demo' },
      secondaryCta: { de: 'Für Beta bewerben', en: 'Apply for the beta' },
      microcopy: {
        de: 'Transparente Preislogik. Keine unnötige Komplexität.',
        en: 'Transparent pricing. No unnecessary complexity.',
      },
    },

    cards: {
      sectionHeadline: { de: 'Drei Wege, mit Immob24 zu starten', en: 'Three ways to start with Immob24' },
      recommendedBadge: { de: 'Empfohlen', en: 'Recommended' },

      beta: {
        label: { de: 'Beta', en: 'Beta' },
        audience: { de: 'Für frühe Partner', en: 'For early partners' },
        price: { de: 'Kostenlos', en: 'Free' },
        subtext: {
          de: 'Während der Beta. Preis für 12 Monate danach fixiert.',
          en: 'During the beta. Price fixed for 12 months afterwards.',
        },
        description: {
          de: 'Für Maklerbüros, die Immob24 früh testen, Feedback geben und den Produktaufbau aktiv mitgestalten wollen.',
          en: 'For brokerages that want to try Immob24 early, give feedback, and actively shape the product.',
        },
        included: {
          de: [
            'Zugang im Beta-Programm.',
            'Direkter Kontakt zum Gründerteam.',
            '12-Wochen-Pilot.',
            'Frühes Feedback zur Roadmap.',
          ],
          en: [
            'Access via the beta program.',
            'Direct contact with the founding team.',
            '12-week pilot.',
            'Early input on the roadmap.',
          ],
        },
        cta: { de: 'Für Beta bewerben', en: 'Apply for the beta' },
        support: { de: 'Begrenzte Plätze.', en: 'Limited seats.' },
      },

      team: {
        label: { de: 'Team', en: 'Team' },
        audience: {
          de: 'Für kleine bis mittelgroße Maklerbüros',
          en: 'For small to mid-sized brokerages',
        },
        price: { de: 'Ab €249 / Monat', en: 'From €249 / month' },
        subtext: {
          de: 'Für Teams, die Immob24 im operativen Alltag einsetzen möchten.',
          en: 'For teams that want to use Immob24 in everyday operations.',
        },
        description: {
          de: 'Der richtige Einstieg für Maklerbüros, die schneller auf Leads reagieren, Qualifizierung strukturieren und Follow-ups im Prozess halten wollen.',
          en: 'The right starting point for brokerages that want to respond to leads faster, structure qualification, and keep follow-ups in flow.',
        },
        included: {
          de: [
            'Reaktion auf neue Anfragen.',
            'Lead-Qualifizierung.',
            'Nächste-Schritt- und Terminlogik.',
            'Follow-up-Unterstützung.',
            'Standard-Onboarding und Support.',
          ],
          en: [
            'Reaction to new inquiries.',
            'Lead qualification.',
            'Next-step and scheduling logic.',
            'Follow-up support.',
            'Standard onboarding and support.',
          ],
        },
        cta: { de: 'Demo anfragen', en: 'Request demo' },
      },

      custom: {
        label: { de: 'Individuell', en: 'Custom' },
        audience: { de: 'Für komplexere Anforderungen', en: 'For more complex needs' },
        price: { de: 'Auf Anfrage', en: 'On request' },
        subtext: {
          de: 'Für Teams mit besonderem Rollout-, Prozess- oder Betreuungsbedarf.',
          en: 'For teams with specific rollout, process, or support needs.',
        },
        description: {
          de: 'Für Unternehmen, die mehr Abstimmung, größere Teamstrukturen oder individuelle kommerzielle und operative Anforderungen haben.',
          en: 'For companies with more coordination, larger team structures, or specific commercial and operational requirements.',
        },
        included: {
          de: [
            'Individuelle Einführung.',
            'Erweiterte Betreuung.',
            'Maßgeschneiderte Abstimmung.',
            'Priorisierte Unterstützung.',
          ],
          en: [
            'Tailored onboarding.',
            'Extended support.',
            'Custom alignment.',
            'Prioritised assistance.',
          ],
        },
        cta: { de: 'Gespräch vereinbaren', en: 'Book a call' },
        support: {
          de: 'Individuelle Preisgestaltung je nach Setup.',
          en: 'Custom pricing depending on setup.',
        },
      },
    },

    quickComparison: {
      headline: { de: 'Welcher Einstieg passt zu Ihnen?', en: 'Which entry point fits you?' },
      headers: {
        de: ['Wenn Sie…', 'Dann passt am besten …'],
        en: ['If you…', 'The right fit is…'],
      },
      rows: {
        de: [
          ['Immob24 früh testen und mitgestalten möchten', 'Beta'],
          ['einen klaren operativen Standard-Einstieg suchen', 'Team'],
          ['mehr Abstimmung und individuelle Anforderungen haben', 'Individuell'],
        ],
        en: [
          ['want to try Immob24 early and shape it', 'Beta'],
          ['look for a clear operational standard entry', 'Team'],
          ['need more coordination and custom requirements', 'Custom'],
        ],
      },
      caption: {
        de: 'Diese Übersicht hilft, sich schneller selbst einzuordnen — Planübersicht plus kurze Entscheidungshilfe.',
        en: 'A short overview to help you place yourself — plan view plus quick guidance.',
      },
    },

    trust: {
      headline: { de: 'Was wichtig ist, bevor Sie starten', en: 'What matters before you start' },
      bullets: {
        de: [
          'Immob24 ist auf Maklerprozesse ausgelegt, nicht auf generische Softwarekäufer.',
          'Die Beta ist für frühe Partner gedacht und hat begrenzte Plätze.',
          'Der Team-Plan ist der sinnvollste Standard-Einstieg für aktive Maklerbüros.',
          'Der individuelle Plan ist kein Upsell, sondern für echte Sonderanforderungen gedacht.',
        ],
        en: [
          'Immob24 is built for brokerage processes, not generic software buyers.',
          'The beta is for early partners and has limited seats.',
          'The Team plan is the most sensible standard entry for active brokerages.',
          'The Custom plan is not an upsell — it is for real special requirements.',
        ],
      },
    },

    faq: {
      headline: { de: 'Häufige Fragen zu Preisen und Einstieg', en: 'Pricing and onboarding FAQs' },
      items: {
        de: [
          {
            q: 'Gibt es einen kostenlosen Einstieg?',
            a: 'Ja, über das Beta-Agentenprogramm für ausgewählte Partner.',
          },
          {
            q: 'Welcher Plan ist für die meisten Maklerbüros passend?',
            a: 'Der Team-Plan ist der Standardeinstieg für kleine bis mittelgroße Maklerbüros.',
          },
          {
            q: 'Warum gibt es einen individuellen Plan ohne festen Preis?',
            a: 'Weil größere oder komplexere Anforderungen im B2B-SaaS oft nicht sinnvoll in ein starres Standardpaket gepresst werden sollten.',
          },
          {
            q: 'Soll die Seite direkt zum Kauf führen?',
            a: 'Für Immob24 ist ein CTA zu Demo, Beta-Bewerbung oder Sales-Gespräch sinnvoller als ein klassisches „Jetzt kaufen", weil das Produkt prozessnah und beratungsintensiver ist.',
          },
          {
            q: 'Braucht jede Card einen eigenen CTA?',
            a: 'Ja. Pricing Tables funktionieren besser, wenn jede Option einen klaren nächsten Schritt hat.',
          },
        ],
        en: [
          {
            q: 'Is there a free entry?',
            a: 'Yes, through the Beta Agent Program for selected partners.',
          },
          {
            q: 'Which plan fits most brokerages?',
            a: 'The Team plan is the standard entry for small to mid-sized brokerages.',
          },
          {
            q: 'Why is the Custom plan listed without a fixed price?',
            a: 'Because larger or more complex requirements in B2B SaaS often should not be forced into a rigid standard package.',
          },
          {
            q: 'Should the page lead directly to a purchase?',
            a: 'For Immob24, a CTA to demo, beta application, or sales conversation makes more sense than a classic "Buy now", because the product is process-driven and consultative.',
          },
          {
            q: 'Does each card need its own CTA?',
            a: 'Yes. Pricing tables work better when every option has a clear next step.',
          },
        ],
      },
    },

    finalCta: {
      headline: { de: 'Starten Sie mit dem passenden Modell', en: 'Start with the right model' },
      body: {
        de: 'Wenn Sie Immob24 früh testen und mitgestalten möchten, bewerben Sie sich für die Beta. Wenn Sie bereits einen klaren operativen Use Case im Alltag haben, ist eine Demo der beste nächste Schritt. Für größere Anforderungen lohnt sich ein direktes Gespräch zur passenden Einführung.',
        en: 'If you want to try Immob24 early and shape it, apply for the beta. If you already have a clear operational use case, a demo is the best next step. For larger requirements, a direct call is the right way in.',
      },
      primaryCta: { de: 'Demo anfragen', en: 'Request demo' },
      secondaryCta: { de: 'Für Beta bewerben', en: 'Apply for the beta' },
      tertiaryCta: { de: 'Gespräch vereinbaren', en: 'Book a call' },
      linksLabel: { de: 'Mehr erfahren:', en: 'Learn more:' },
      linkProduct: { de: 'KI-Maklersoftware', en: 'AI software for real estate brokers' },
      linkDemo: { de: 'Demo-Seite', en: 'Demo page' },
    },
  },
} as const;

export type TranslationKey = keyof typeof translations;