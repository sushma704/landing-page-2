import { useLanguage } from '../../i18n';
import { DraftNotice } from './DraftNotice';

// Cookie Policy — fully writable today because the cookie banner UI is the
// authoritative source. The table below mirrors what the banner declares;
// keep the two in sync if categories change.
export const CookiesContent = () => {
  const { language } = useLanguage();
  const isDe = language === 'de';

  return (
    <>
      <DraftNotice />

      <h4 className="font-semibold text-charcoal">
        {isDe ? '1. Was sind Cookies?' : '1. What are cookies?'}
      </h4>
      <p>
        {isDe
          ? 'Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert werden, wenn Sie diese Website besuchen. Ähnlich verwendete Technologien (lokaler Speicher / „local storage") werden in dieser Erklärung mit erfasst.'
          : 'Cookies are small text files stored on your device when you visit this site. Similar technologies (local storage) are covered by this policy as well.'}
      </p>

      <h4 className="font-semibold text-charcoal pt-4">
        {isDe
          ? '2. Welche Cookies / Speichereinträge wir verwenden'
          : '2. Cookies and storage entries we use'}
      </h4>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-charcoal/10 text-charcoal">
              <th className="py-2 pr-3 font-semibold">{isDe ? 'Name' : 'Name'}</th>
              <th className="py-2 pr-3 font-semibold">{isDe ? 'Anbieter' : 'Provider'}</th>
              <th className="py-2 pr-3 font-semibold">{isDe ? 'Zweck' : 'Purpose'}</th>
              <th className="py-2 pr-3 font-semibold">{isDe ? 'Dauer' : 'Lifetime'}</th>
              <th className="py-2 font-semibold">{isDe ? 'Kategorie' : 'Category'}</th>
            </tr>
          </thead>
          <tbody className="text-slate">
            <tr className="border-b border-charcoal/5 align-top">
              <td className="py-2 pr-3 font-mono">immob24_consent_v4</td>
              <td className="py-2 pr-3">{isDe ? 'Erstanbieter' : 'First-party'}</td>
              <td className="py-2 pr-3">
                {isDe
                  ? 'Speichert Ihre Cookie-Einwilligung'
                  : 'Stores your cookie consent choice'}
              </td>
              <td className="py-2 pr-3">{isDe ? 'Persistent' : 'Persistent'}</td>
              <td className="py-2">{isDe ? 'Notwendig' : 'Essential'}</td>
            </tr>
            <tr className="border-b border-charcoal/5 align-top">
              <td className="py-2 pr-3 font-mono">immob24-lang</td>
              <td className="py-2 pr-3">{isDe ? 'Erstanbieter' : 'First-party'}</td>
              <td className="py-2 pr-3">
                {isDe ? 'Speichert Ihre Sprachwahl' : 'Stores your language preference'}
              </td>
              <td className="py-2 pr-3">{isDe ? 'Persistent' : 'Persistent'}</td>
              <td className="py-2">{isDe ? 'Notwendig' : 'Essential'}</td>
            </tr>
            <tr className="border-b border-charcoal/5 align-top">
              <td className="py-2 pr-3 font-mono">_ga, _ga_*</td>
              <td className="py-2 pr-3">Google Ireland Ltd.</td>
              <td className="py-2 pr-3">
                {isDe ? 'Nutzungsanalyse (GA4)' : 'Usage analytics (GA4)'}
              </td>
              <td className="py-2 pr-3">2 {isDe ? 'Jahre' : 'years'}</td>
              <td className="py-2">{isDe ? 'Analyse' : 'Analytics'}</td>
            </tr>
            <tr className="border-b border-charcoal/5 align-top">
              <td className="py-2 pr-3 font-mono">_fbp</td>
              <td className="py-2 pr-3">{isDe ? 'Erstanbieter (Meta Pixel)' : 'First-party (Meta Pixel)'}</td>
              <td className="py-2 pr-3">
                {isDe ? 'Attribution von Werbeanzeigen' : 'Ad attribution'}
              </td>
              <td className="py-2 pr-3">3 {isDe ? 'Monate' : 'months'}</td>
              <td className="py-2">{isDe ? 'Marketing' : 'Marketing'}</td>
            </tr>
            <tr className="border-b border-charcoal/5 align-top">
              <td className="py-2 pr-3 font-mono">fr</td>
              <td className="py-2 pr-3">Meta Platforms Ireland Ltd.</td>
              <td className="py-2 pr-3">
                {isDe
                  ? 'Nutzerverfolgung durch Meta (nur bei aktivem Facebook-Login)'
                  : 'Meta user tracking (only when logged in to Facebook)'}
              </td>
              <td className="py-2 pr-3">90 {isDe ? 'Tage' : 'days'}</td>
              <td className="py-2">{isDe ? 'Marketing' : 'Marketing'}</td>
            </tr>
            <tr className="border-b border-charcoal/5 align-top">
              <td className="py-2 pr-3 font-mono">botpenguin_*</td>
              <td className="py-2 pr-3">Botpenguin Inc.</td>
              <td className="py-2 pr-3">
                {isDe
                  ? 'Sitzungs- und Konversationszustand des Chat-Widgets'
                  : 'Session and conversation state of the chat widget'}
              </td>
              <td className="py-2 pr-3">
                {isDe ? 'Sitzung / bis 1 Jahr' : 'Session / up to 1 year'}
              </td>
              <td className="py-2">{isDe ? 'Chat' : 'Chat'}</td>
            </tr>
            <tr className="align-top">
              <td className="py-2 pr-3 font-mono">reb2b_*</td>
              <td className="py-2 pr-3">Retention.com, Inc. (RB2B)</td>
              <td className="py-2 pr-3">
                {isDe
                  ? 'Besucher-Identifikation (nur Startseite /de und /en)'
                  : 'Visitor identification (only home pages /de and /en)'}
              </td>
              <td className="py-2 pr-3">
                {isDe ? 'Bis zu 1 Jahr' : 'Up to 1 year'}
              </td>
              <td className="py-2">
                {isDe ? 'Besucher-Identifikation' : 'Identification'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 className="font-semibold text-charcoal pt-4">
        {isDe ? '3. Rechtsgrundlagen' : '3. Legal bases'}
      </h4>
      <p>
        {isDe ? (
          <>
            Notwendige Cookies werden auf Grundlage unseres berechtigten Interesses
            am Betrieb einer funktionsfähigen Website gesetzt
            (Art. 6 Abs. 1 lit. f DSGVO). Analyse- und Marketing-Cookies werden
            ausschließlich nach Ihrer Einwilligung gesetzt
            (Art. 6 Abs. 1 lit. a DSGVO i. V. m. § 25 Abs. 1 TTDSG); für die
            Übermittlung an Meta in die USA gilt zusätzlich Art. 49 Abs. 1 lit. a
            DSGVO.
          </>
        ) : (
          <>
            Strictly necessary cookies are set based on our legitimate interest in
            operating a functional website (Art. 6(1)(f) GDPR). Analytics and
            marketing cookies are only set after your consent (Art. 6(1)(a) GDPR
            in conjunction with § 25(1) TTDSG); the transfer to Meta in the US is
            additionally based on Art. 49(1)(a) GDPR.
          </>
        )}
      </p>

      <h4 className="font-semibold text-charcoal pt-4">
        {isDe ? '4. Einwilligung verwalten oder widerrufen' : '4. Manage or withdraw consent'}
      </h4>
      <p>
        {isDe
          ? 'Sie können Ihre Cookie-Auswahl jederzeit über den Link „Cookie-Einstellungen" im Footer dieser Website öffnen und neu speichern. Ergänzend können Sie Cookies in Ihrem Browser löschen oder deren Annahme einschränken. Eine Anleitung dazu finden Sie in der Hilfe Ihres Browsers.'
          : 'You can open and re-save your cookie choice at any time via the "Cookie Settings" link in the footer of this site. You can additionally delete cookies or restrict their acceptance in your browser; see your browser\'s help pages for instructions.'}
      </p>

      <h4 className="font-semibold text-charcoal pt-4">
        {isDe ? '5. Weitere Informationen' : '5. More information'}
      </h4>
      <p>
        {isDe
          ? 'Details zu den eingesetzten Diensten (Google Analytics, Meta Pixel, BotPenguin, RB2B) und zu den damit verbundenen Datenübermittlungen finden Sie in unserer Datenschutzerklärung.'
          : 'Details on the services used (Google Analytics, Meta Pixel, BotPenguin, RB2B) and the related data transfers are in our Privacy Policy.'}
      </p>
    </>
  );
};
