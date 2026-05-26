import { useLanguage } from '../../i18n';
import { DraftNotice } from './DraftNotice';

// Datenschutzerklärung — full draft based on PRIVACY_INVENTORY.md.
//
// Entity-dependent paragraphs (the "Verantwortlicher" block at the top, the
// Aufsichtsbehörde name in section 12) are clearly marked [TO BE FILLED].
// Everything else (data flows, processors, legal bases, retention periods,
// US transfers) is fact-based from the current codebase and accurate today.
//
// When the operating entity is registered, fill in the [...] markers and
// (optionally) regenerate via eRecht24 against the same inventory.
export const DatenschutzContent = () => {
  const { language } = useLanguage();
  if (language === 'de') return <PolicyDe />;
  return <PolicyEn />;
};

// ─────────────────────────────────────────────────────────────────────────────
// German version (legally controlling)
// ─────────────────────────────────────────────────────────────────────────────

const PolicyDe = () => (
  <>
    <DraftNotice />

    <h4 className="font-semibold text-charcoal">1. Verantwortlicher</h4>
    <p>
      Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
    </p>
    <p className="rounded bg-cream px-3 py-2 text-charcoal/80">
      <strong>[Name des Verantwortlichen — wird mit Unternehmenseintragung ergänzt]</strong>
      <br />
      [Anschrift]
      <br />
      E-Mail:{' '}
      <a href="mailto:kontakt@immob24.de" className="underline">
        kontakt@immob24.de
      </a>
    </p>
    <p>
      Ein Datenschutzbeauftragter ist gesetzlich nicht erforderlich. Bei Fragen
      zum Datenschutz wenden Sie sich bitte direkt an die oben genannte
      E-Mail-Adresse.
    </p>

    <h4 className="font-semibold text-charcoal pt-4">2. Allgemeine Hinweise zur Datenverarbeitung</h4>
    <p>
      Wir verarbeiten personenbezogene Daten unserer Nutzerinnen und Nutzer
      grundsätzlich nur, soweit dies zur Bereitstellung einer funktionsfähigen
      Website sowie unserer Inhalte und Leistungen erforderlich ist. Die
      Verarbeitung erfolgt regelmäßig nur nach Einwilligung (Art. 6 Abs. 1 lit. a
      DSGVO) oder wenn die Verarbeitung durch gesetzliche Vorschriften gestattet
      ist (insbesondere Art. 6 Abs. 1 lit. b oder lit. f DSGVO).
    </p>

    <h4 className="font-semibold text-charcoal pt-4">3. Hosting</h4>
    <p>
      Diese Website wird auf Servern von Amazon Web Services (AWS) gehostet,
      betrieben durch die Amazon Web Services EMEA SARL (38 Avenue John F.
      Kennedy, L-1855 Luxemburg). Die genutzte Region ist
      <em> us-east-1 (Nord-Virginia, USA)</em>. Beim Aufruf der Website werden
      technisch notwendige Verbindungsdaten (insb. IP-Adresse, Zeitstempel,
      angeforderte Ressource, Browsertyp) verarbeitet. Rechtsgrundlage ist
      Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am Betrieb einer
      funktionsfähigen Website). Die Übermittlung in die USA erfolgt auf
      Grundlage des EU-US Data Privacy Framework (Angemessenheitsbeschluss vom
      10. Juli 2023) sowie der mit AWS abgeschlossenen Standardvertragsklauseln.
    </p>

    <h4 className="font-semibold text-charcoal pt-4">4. Server-Log-Dateien</h4>
    <p>
      Der Web-Server (nginx) erfasst automatisch Informationen in sog.
      Server-Log-Dateien: IP-Adresse, Datum und Uhrzeit der Anfrage, angeforderte
      Datei, Referrer-URL, Browsertyp und -version sowie Betriebssystem. Diese
      Daten werden nicht mit anderen Datenquellen zusammengeführt. Speicherdauer
      gemäß Standard-Konfiguration: 14 Tage (rotiert), anschließend gelöscht.
      Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
    </p>

    <h4 className="font-semibold text-charcoal pt-4">5. Selbst-gehostete Schriftarten</h4>
    <p>
      Diese Website verwendet die Schriftarten Poppins, Inter und DM Sans. Die
      Schrift-Dateien werden ausschließlich von unserem eigenen Server
      ausgeliefert; es erfolgt <strong>keine</strong> Verbindung zu Google
      Fonts oder anderen Drittanbietern. Beim Laden der Schriften werden
      keine personenbezogenen Daten an Dritte übertragen.
    </p>

    <h4 className="font-semibold text-charcoal pt-4">6. Cookies und Einwilligungsmanagement</h4>
    <p>
      Diese Website setzt technisch notwendige Cookies (bzw. lokale Speicher­einträge)
      ein, um Funktionen wie die Sprachwahl und Ihre Cookie-Auswahl zu speichern.
      Optionale Analyse- und Marketing-Cookies werden ausschließlich nach Ihrer
      ausdrücklichen Einwilligung über das Cookie-Banner gesetzt
      (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TTDSG). Sie können Ihre Auswahl
      jederzeit über den Link „Cookie-Einstellungen" im Footer ändern oder
      widerrufen. Details zu jeder einzelnen Cookie-Kategorie finden Sie in der
      Cookie-Richtlinie.
    </p>

    <h4 className="font-semibold text-charcoal pt-4">7. Google Analytics 4</h4>
    <p>
      Nach Ihrer Einwilligung setzen wir Google Analytics 4 ein, einen
      Webanalysedienst der Google Ireland Ltd. (Gordon House, 4 Barrow St,
      Dublin 4, Irland). Google Analytics verwendet Cookies und vergleichbare
      Technologien, um die Nutzung der Website auszuwerten. Die IP-Adresse wird
      gemäß Konfiguration anonymisiert übertragen (
      <code className="text-xs">anonymize_ip: true</code>). Erhobene Daten
      werden ggf. an Google LLC in die USA übertragen; Rechtsgrundlage hierfür
      ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO i. V. m.
      Art. 49 Abs. 1 lit. a DSGVO). Speicherdauer der GA4-Cookies: bis zu
      2 Jahre. Sie können Ihre Einwilligung jederzeit über die
      Cookie-Einstellungen widerrufen.
    </p>

    <h4 className="font-semibold text-charcoal pt-4">8. Meta Pixel</h4>
    <p>
      Nach Ihrer Einwilligung setzen wir den Meta Pixel ein, ein Tool der
      Meta Platforms Ireland Ltd. (4 Grand Canal Square, Dublin 2, Irland), um
      die Wirksamkeit unserer Werbekampagnen zu messen. Hierbei werden IP-Adresse,
      Browser-Informationen und ggf. — sofern Sie bei Facebook eingeloggt sind —
      Ihre Facebook-Nutzerkennung an Meta übertragen. Eine Übermittlung in die
      USA findet statt. Rechtsgrundlage: Ihre Einwilligung (Art. 6 Abs. 1 lit. a
      DSGVO, § 25 Abs. 1 TTDSG, Art. 49 Abs. 1 lit. a DSGVO für die
      Drittlandsübermittlung). Für die gemeinsame Verarbeitung mit Meta gilt
      die von Meta bereitgestellte Vereinbarung zu gemeinsam Verantwortlichen
      (Art. 26 DSGVO).
    </p>

    <h4 className="font-semibold text-charcoal pt-4">9. Chat-Assistent (BotPenguin)</h4>
    <p>
      Nach Ihrer Einwilligung laden wir den Chat-Assistenten der Firma
      Botpenguin Inc. (cdn.botpenguin.com). Beim Laden des Widgets wird Ihre
      IP-Adresse an die Server von BotPenguin übermittelt. Schreiben Sie über
      den Chat, werden Ihre Nachrichten und ggf. von Ihnen angegebene
      Kontaktdaten zur Beantwortung Ihrer Anfrage verarbeitet. Eine
      Übermittlung an Server außerhalb der EU (insbesondere USA / Indien)
      kann stattfinden. Rechtsgrundlage: Ihre Einwilligung
      (Art. 6 Abs. 1 lit. a DSGVO i. V. m. § 25 Abs. 1 TTDSG; für die
      Drittlandsübermittlung zusätzlich Art. 49 Abs. 1 lit. a DSGVO). Sie
      können Ihre Einwilligung jederzeit über die Cookie-Einstellungen
      widerrufen — danach wird das Widget nicht mehr geladen.
    </p>

    <h4 className="font-semibold text-charcoal pt-4">10. Besucher-Identifikation (RB2B)</h4>
    <p>
      Ausschließlich auf unserer deutschen und englischen Startseite
      (<code className="text-xs">/de</code> und <code className="text-xs">/en</code>)
      laden wir nach Ihrer Einwilligung den Dienst RB2B (Anbieter:
      Retention.com, Inc., USA). RB2B versucht, Besucherinnen und Besucher
      anhand technischer Merkmale (insbesondere IP-Adresse, Browser-Fingerprint
      und Referrer) auf Personenebene zu identifizieren und Angaben wie Name,
      Unternehmen, Position und – soweit verfügbar – LinkedIn-Profil oder
      geschäftliche E-Mail-Adresse zuzuordnen. Die hierfür erforderlichen
      Daten werden an Server von RB2B in den USA übermittelt. Rechtsgrundlage:
      Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO i. V. m. § 25 Abs. 1
      TTDSG; für die Drittlandsübermittlung zusätzlich Art. 49 Abs. 1 lit. a
      DSGVO). Sie können Ihre Einwilligung jederzeit über die
      Cookie-Einstellungen widerrufen – danach wird das Skript nicht mehr
      geladen.
    </p>

    <h4 className="font-semibold text-charcoal pt-4">11. Newsletter-Anmeldung</h4>
    <p>
      Wenn Sie sich über das Newsletter-Formular anmelden, erheben wir Ihren
      Namen (optional) und Ihre E-Mail-Adresse. Diese Daten werden über einen
      Google-Apps-Script-Endpunkt in eine Google-Tabelle (Google Sheets) der
      Inhaberin überführt. Anbieter: Google Ireland Ltd.; Ausführung des
      Apps-Script-Codes erfolgt auf Servern der Google LLC (USA).
      Rechtsgrundlage: Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Sie
      können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen,
      indem Sie eine formlose Nachricht an{' '}
      <a href="mailto:kontakt@immob24.de" className="underline">
        kontakt@immob24.de
      </a>{' '}
      senden. Speicherdauer: bis zum Widerruf, anschließend werden die Daten
      innerhalb von 30 Tagen gelöscht.
    </p>

    <h4 className="font-semibold text-charcoal pt-4">12. Demo-Buchung über Cal.com</h4>
    <p>
      Über die Schaltfläche „Demo anfragen" leiten wir Sie auf die externe
      Buchungsseite{' '}
      <a
        href="https://www.cal.eu/hari-prasad-iu7zxy"
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        cal.eu
      </a>{' '}
      des Anbieters Cal.com, Inc. (800 Westchester Ave Suite N-641, Rye Brook,
      NY 10573, USA) weiter. Cal.com ist insoweit eigenständig Verantwortlicher
      gemäß Art. 4 Nr. 7 DSGVO; es gelten die Datenschutzhinweise von Cal.com.
      Wir erhalten nach Buchungsabschluss die von Ihnen angegebenen Buchungsdaten
      (Name, E-Mail, Wunschtermin, ggf. Freitexte). Rechtsgrundlage:
      vorvertragliche Maßnahme bzw. unser berechtigtes Interesse an der
      Terminkoordination (Art. 6 Abs. 1 lit. b und lit. f DSGVO).
    </p>

    <h4 className="font-semibold text-charcoal pt-4">13. SSL- / TLS-Verschlüsselung</h4>
    <p>
      Diese Website nutzt eine SSL- bzw. TLS-Verschlüsselung. Sie erkennen eine
      verschlüsselte Verbindung daran, dass die Adresszeile mit „https://"
      beginnt und das Schloss-Symbol angezeigt wird.
    </p>

    <h4 className="font-semibold text-charcoal pt-4">14. Ihre Rechte als betroffene Person</h4>
    <p>Sie haben jederzeit folgende Rechte:</p>
    <ul className="list-disc pl-5 space-y-1">
      <li>Auskunft über die zu Ihrer Person gespeicherten Daten (Art. 15 DSGVO)</li>
      <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
      <li>Löschung („Recht auf Vergessenwerden", Art. 17 DSGVO)</li>
      <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
      <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
      <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
      <li>Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)</li>
    </ul>
    <p>
      Zur Ausübung Ihrer Rechte genügt eine formlose Nachricht an{' '}
      <a href="mailto:kontakt@immob24.de" className="underline">
        kontakt@immob24.de
      </a>
      .
    </p>

    <h4 className="font-semibold text-charcoal pt-4">15. Beschwerderecht bei der Aufsichtsbehörde</h4>
    <p>
      Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die
      Verarbeitung Ihrer personenbezogenen Daten zu beschweren. Zuständige
      Aufsichtsbehörde: <em>[wird mit Sitz des Unternehmens ergänzt]</em>.
    </p>

    <h4 className="font-semibold text-charcoal pt-4">16. Änderungen dieser Datenschutzerklärung</h4>
    <p>
      Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie
      stets den aktuellen rechtlichen Anforderungen entspricht oder um
      Änderungen unserer Leistungen abzubilden. Für Ihren erneuten Besuch gilt
      dann die jeweils aktuelle Fassung.
    </p>

    <p className="text-xs text-warm-gray pt-4 border-t border-charcoal/5">
      Diese Datenschutzerklärung ist ein Entwurf. Vor dem öffentlichen Launch
      wird sie um die Angaben zum Verantwortlichen und zur zuständigen
      Aufsichtsbehörde ergänzt und ggf. anhand eines aktuellen Mustertextes
      (z. B. eRecht24) finalisiert.
    </p>
  </>
);

// ─────────────────────────────────────────────────────────────────────────────
// English translation (informational; German version is legally controlling)
// ─────────────────────────────────────────────────────────────────────────────

const PolicyEn = () => (
  <>
    <DraftNotice />

    <p className="text-xs text-warm-gray italic">
      Informal English translation. The German version of this privacy policy
      is the legally controlling text.
    </p>

    <h4 className="font-semibold text-charcoal">1. Controller</h4>
    <p>
      The controller under the General Data Protection Regulation (GDPR) is:
    </p>
    <p className="rounded bg-cream px-3 py-2 text-charcoal/80">
      <strong>[Controller name — added once the entity is registered]</strong>
      <br />
      [Address]
      <br />
      E-mail:{' '}
      <a href="mailto:kontakt@immob24.de" className="underline">
        kontakt@immob24.de
      </a>
    </p>
    <p>
      A Data Protection Officer is not legally required. For data-protection
      enquiries please write to the e-mail above.
    </p>

    <h4 className="font-semibold text-charcoal pt-4">2. General notes on processing</h4>
    <p>
      We process personal data only to the extent needed to provide a functional
      website and our content. Processing happens based on consent
      (Art. 6(1)(a) GDPR) or where statutory rules permit it (in particular
      Art. 6(1)(b) or (f) GDPR).
    </p>

    <h4 className="font-semibold text-charcoal pt-4">3. Hosting</h4>
    <p>
      This site is hosted on Amazon Web Services (AWS), operated by Amazon Web
      Services EMEA SARL (38 Avenue John F. Kennedy, L-1855 Luxembourg). Region:
      <em> us-east-1 (N. Virginia, USA)</em>. Loading the site processes
      technically required connection data (IP address, timestamp, requested
      resource, browser type). Legal basis: Art. 6(1)(f) GDPR (legitimate
      interest in operating a functional website). Transfer to the US is covered
      by the EU-US Data Privacy Framework (adequacy decision of 10 July 2023)
      and the Standard Contractual Clauses concluded with AWS.
    </p>

    <h4 className="font-semibold text-charcoal pt-4">4. Server log files</h4>
    <p>
      Our web server (nginx) automatically captures so-called server log files:
      IP address, date and time of the request, requested file, referrer URL,
      browser type and version, operating system. This data is not merged with
      other sources. Storage period under standard configuration: 14 days
      (rotated), then deleted. Legal basis: Art. 6(1)(f) GDPR.
    </p>

    <h4 className="font-semibold text-charcoal pt-4">5. Self-hosted fonts</h4>
    <p>
      The site uses the typefaces Poppins, Inter, and DM Sans. Font files are
      served exclusively from our own server; <strong>no</strong> connection is
      made to Google Fonts or any other third party. Loading fonts does not
      transmit any personal data to third parties.
    </p>

    <h4 className="font-semibold text-charcoal pt-4">6. Cookies and consent management</h4>
    <p>
      The site uses strictly necessary cookies (and similar local storage
      entries) to remember the language preference and your cookie choice.
      Optional analytics and marketing cookies are only set after your explicit
      consent via the cookie banner (Art. 6(1)(a) GDPR, § 25(1) TTDSG). You can
      change or withdraw your choice at any time via the "Cookie Settings" link
      in the footer. Details for each category are in the Cookie Policy.
    </p>

    <h4 className="font-semibold text-charcoal pt-4">7. Google Analytics 4</h4>
    <p>
      Subject to your consent we use Google Analytics 4, a web analytics service
      provided by Google Ireland Ltd. (Gordon House, 4 Barrow St, Dublin 4,
      Ireland). Google Analytics uses cookies and similar technologies to
      analyse use of the website. The IP address is configured to be
      anonymised (<code className="text-xs">anonymize_ip: true</code>).
      Collected data may be transferred to Google LLC in the US; legal basis is
      your consent (Art. 6(1)(a) GDPR in conjunction with Art. 49(1)(a) GDPR).
      GA4 cookie lifetime: up to 2 years. You can withdraw consent at any time
      via the cookie settings.
    </p>

    <h4 className="font-semibold text-charcoal pt-4">8. Meta Pixel</h4>
    <p>
      Subject to your consent we use the Meta Pixel, a tool from Meta Platforms
      Ireland Ltd. (4 Grand Canal Square, Dublin 2, Ireland), to measure the
      effectiveness of our marketing campaigns. This transmits IP address,
      browser information and — if you are logged in to Facebook — your
      Facebook user ID to Meta. Transfer to the US takes place. Legal basis:
      your consent (Art. 6(1)(a) GDPR, § 25(1) TTDSG; Art. 49(1)(a) GDPR for
      the third-country transfer). Joint controllership with Meta is governed
      by Meta's standard joint-controller addendum (Art. 26 GDPR).
    </p>

    <h4 className="font-semibold text-charcoal pt-4">9. Chat assistant (BotPenguin)</h4>
    <p>
      Subject to your consent we load the chat assistant operated by
      Botpenguin Inc. (cdn.botpenguin.com). Loading the widget transmits
      your IP address to BotPenguin's servers. If you chat with us, your
      messages and any contact details you provide are processed to answer
      your enquiry. Transfer to servers outside the EU (in particular USA /
      India) may occur. Legal basis: your consent (Art. 6(1)(a) GDPR in
      conjunction with § 25(1) TTDSG; Art. 49(1)(a) GDPR for the
      third-country transfer). You can withdraw consent at any time via the
      cookie settings — after which the widget is no longer loaded.
    </p>

    <h4 className="font-semibold text-charcoal pt-4">10. Visitor identification (RB2B)</h4>
    <p>
      Only on our German and English home pages (<code className="text-xs">/de</code>{' '}
      and <code className="text-xs">/en</code>), and only after your consent,
      we load the RB2B service (provider: Retention.com, Inc., USA). RB2B
      attempts to identify visitors at the person level — name, company, role
      and, where available, LinkedIn profile or work e-mail — based on
      technical signals such as IP address, browser fingerprint and referrer.
      The data needed for this is transferred to RB2B servers in the USA.
      Legal basis: your consent (Art. 6(1)(a) GDPR in conjunction with
      § 25(1) TTDSG; Art. 49(1)(a) GDPR for the third-country transfer). You
      can withdraw consent at any time via the cookie settings — after which
      the script is no longer loaded.
    </p>

    <h4 className="font-semibold text-charcoal pt-4">11. Newsletter sign-up</h4>
    <p>
      When you sign up via the newsletter form we collect your name (optional)
      and e-mail address. The data is forwarded via a Google Apps Script
      endpoint into a Google Sheet held by the operator. Provider: Google
      Ireland Ltd.; Apps Script code is executed on Google LLC (USA)
      infrastructure. Legal basis: your consent (Art. 6(1)(a) GDPR). You can
      withdraw consent at any time with effect for the future by sending a
      brief message to{' '}
      <a href="mailto:kontakt@immob24.de" className="underline">
        kontakt@immob24.de
      </a>
      . Storage period: until withdrawal, then deleted within 30 days.
    </p>

    <h4 className="font-semibold text-charcoal pt-4">12. Demo booking via Cal.com</h4>
    <p>
      The "Request demo" button takes you to the external booking page{' '}
      <a
        href="https://www.cal.eu/hari-prasad-iu7zxy"
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        cal.eu
      </a>{' '}
      operated by Cal.com, Inc. (800 Westchester Ave Suite N-641, Rye Brook,
      NY 10573, USA). For data submitted there, Cal.com is an independent
      controller under Art. 4(7) GDPR; Cal.com's own privacy policy applies. We
      receive the booking details after you complete a booking (name, e-mail,
      preferred time, free-text). Legal basis: pre-contractual measures and our
      legitimate interest in scheduling (Art. 6(1)(b) and (f) GDPR).
    </p>

    <h4 className="font-semibold text-charcoal pt-4">13. SSL / TLS encryption</h4>
    <p>
      The site uses SSL/TLS encryption. You can tell an encrypted connection by
      the "https://" prefix in the address bar and the padlock icon.
    </p>

    <h4 className="font-semibold text-charcoal pt-4">14. Your rights</h4>
    <p>You have the following rights at any time:</p>
    <ul className="list-disc pl-5 space-y-1">
      <li>Access to the data we hold about you (Art. 15 GDPR)</li>
      <li>Rectification of inaccurate data (Art. 16 GDPR)</li>
      <li>Erasure / "right to be forgotten" (Art. 17 GDPR)</li>
      <li>Restriction of processing (Art. 18 GDPR)</li>
      <li>Data portability (Art. 20 GDPR)</li>
      <li>Objection to processing (Art. 21 GDPR)</li>
      <li>Withdrawal of consent with effect for the future (Art. 7(3) GDPR)</li>
    </ul>
    <p>
      To exercise these rights, simply send a brief message to{' '}
      <a href="mailto:kontakt@immob24.de" className="underline">
        kontakt@immob24.de
      </a>
      .
    </p>

    <h4 className="font-semibold text-charcoal pt-4">15. Right to lodge a complaint</h4>
    <p>
      You have the right to lodge a complaint with a data-protection supervisory
      authority about the processing of your personal data. Competent authority:{' '}
      <em>[added once the entity address is set]</em>.
    </p>

    <h4 className="font-semibold text-charcoal pt-4">16. Changes to this policy</h4>
    <p>
      We may adjust this policy so it always reflects current legal requirements
      and changes to our services. The version current at the time of your
      visit applies.
    </p>

    <p className="text-xs text-warm-gray pt-4 border-t border-charcoal/5">
      Draft text. Before the public launch, the controller information and
      supervisory-authority section will be completed and the text may be
      finalised against a current model (e.g. eRecht24).
    </p>
  </>
);
