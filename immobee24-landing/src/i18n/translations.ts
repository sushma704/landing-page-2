// Immob24 landing page translations.
// German (de) is the source of truth; en translated from it.

export type Language = 'en' | 'de' | 'fr' | 'ar';

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
    // Wordmark strapline. The product name "immob24" is never translated;
    // the sentence under it is.
    tagline: {
      de: 'Das KI-Betriebssystem für die moderne Immobilienbranche',
      en: 'The AI Operating System for Modern Real Estate',
    },
    login: {
      de: 'Anmelden',
      en: 'Login',
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
  // ============================================
  // BETA-AGENTENPROGRAMM PAGE (/de/beta-agentenprogramm)
  // Conversion-focused; recruits qualified brokerages into a 12-week pilot.
  // ============================================
  // ============================================
  // FOOTER
  // ============================================
  // shell-visible stub: the full betaProgram dict lives in copy/pricing.ts
  betaProgram: {
    nav: { de: 'Beta-Agentenprogramm', en: 'Beta Agent Program' },
  },
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
    madeInGermany: {
      de: 'Hergestellt in Deutschland.',
      en: 'Made in Germany.',
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
      de: 'Wir setzen technisch notwendige Cookies ein, damit diese Website funktioniert. Mit Ihrer Einwilligung nutzen wir zusätzlich Analyse-, Marketing- und Identifikations-Tools (z. B. Google Analytics, Meta Pixel, RB2B), um die Nutzung zu verstehen und unsere Inhalte zu verbessern. Sie können Ihre Auswahl jederzeit unter „Cookie-Einstellungen" anpassen.',
      en: 'We use strictly necessary cookies to make this website work. With your consent we also use analytics, marketing and visitor-identification tools (e.g. Google Analytics, Meta Pixel, RB2B) to understand usage and improve our content. You can change your choice at any time via "Cookie Settings".',
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
    categoryChatName: {
      de: 'Chat / Kommunikation',
      en: 'Chat / Communication',
    },
    categoryChatDesc: {
      de: 'BotPenguin (Botpenguin Inc.) stellt unseren Chat-Assistenten auf der Website bereit. Beim Laden des Widgets wird Ihre IP-Adresse an BotPenguin übermittelt; während der Nutzung werden die Inhalte der Konversation verarbeitet. Eine Übermittlung an Server außerhalb der EU kann stattfinden. Rechtsgrundlage: Einwilligung (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TTDSG).',
      en: 'BotPenguin (Botpenguin Inc.) powers the chat assistant on this site. Loading the widget transmits your IP address to BotPenguin; during use, the chat content is processed. Transfer to servers outside the EU may occur. Legal basis: consent (Art. 6(1)(a) GDPR, §25(1) TTDSG).',
    },
    categoryIdentificationName: {
      de: 'Besucher-Identifikation',
      en: 'Visitor identification',
    },
    categoryIdentificationDesc: {
      de: 'Sensible Verarbeitung — bitte sorgfältig lesen. Mit Ihrer Einwilligung laden wir den Dienst RB2B (Anbieter: Retention.com, Inc., 600 Congress Ave, 14th Floor, Austin, TX 78701, USA). RB2B versucht, Sie als Einzelperson zu identifizieren, indem technische Merkmale Ihres Browsers (IP-Adresse, Browser-Fingerprint, Referrer-URL) mit einer von RB2B betriebenen Datenbank abgeglichen werden, die unter anderem aus öffentlich zugänglichen LinkedIn-Profildaten aufgebaut wurde. Ergebnis kann sein: Name, Unternehmen, Berufsbezeichnung, LinkedIn-Profil-URL und geschäftliche E-Mail-Adresse. Hierfür werden Ihre Daten in die USA übermittelt — ein Land ohne ein der EU gleichwertiges Datenschutzniveau. Dieses Tool wird ausschließlich auf den Startseiten /de und /en geladen, niemals auf Unterseiten. Rechtsgrundlage: ausdrückliche Einwilligung (Art. 6 Abs. 1 lit. a DSGVO i. V. m. § 25 Abs. 1 TTDSG; für die Drittlandsübermittlung zusätzlich Art. 49 Abs. 1 lit. a DSGVO). Sie können diese Einwilligung jederzeit über die Cookie-Einstellungen im Footer mit Wirkung für die Zukunft widerrufen — danach wird das Skript nicht mehr geladen.',
      en: 'Sensitive processing — please read carefully. With your consent we load RB2B (provider: Retention.com, Inc., 600 Congress Ave, 14th Floor, Austin, TX 78701, USA). RB2B attempts to identify you as an individual by matching technical signals from your browser (IP address, browser fingerprint, referrer URL) against a database it operates, built among other sources from publicly accessible LinkedIn profile data. Output may include: name, company, job title, LinkedIn profile URL, and work e-mail address. To do this your data is transferred to the United States — a country without a data-protection level equivalent to the EU. This tool is loaded only on the /de and /en home pages, never on inner pages. Legal basis: explicit consent (Art. 6(1)(a) GDPR in conjunction with § 25(1) TTDSG; Art. 49(1)(a) GDPR for the third-country transfer). You can withdraw this consent at any time, with effect for the future, via the Cookie Settings link in the footer — after which the script is no longer loaded.',
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
  // ============================================
  // DEMO PAGE  (/de/demo)
  // ============================================
  // ============================================
  // CRM ALTERNATIVE PAGE  (/de/immobilien-crm-alternative)
  // ============================================
  // ============================================
  // PRICING PAGE  (/de/preise)
  // ============================================
} as const;

export type TranslationKey = keyof typeof translations;