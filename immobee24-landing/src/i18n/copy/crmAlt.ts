// Page-only copy, split out of the entry bundle (engineering cleanup).
// The owning route chunk registers this into the i18n dictionary at
// module-load time via registerTranslations(), before first render.
export default {
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
};
