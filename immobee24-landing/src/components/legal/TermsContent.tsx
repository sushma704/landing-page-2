import { useLanguage } from '../../i18n';
import { DraftNotice } from './DraftNotice';

// The Terms of Service are deliberately not drafted yet. AGB depend on
// business-model decisions (B2B-only vs B2C, pricing model, contract term,
// SLA, liability cap, governing law) that have not been finalised. Generic
// AGB templates are routinely struck down by German courts under § 305 BGB,
// which makes a placeholder safer than a half-fitted template.
//
// Replace this body with a Fachanwalt-für-IT-Recht draft (or a vetted SaaS
// AGB template from saas-agb.de / Bitkom) once the business model and
// pricing are committed.
export const TermsContent = () => {
  const { language } = useLanguage();
  const isDe = language === 'de';
  return (
    <>
      <DraftNotice />
      {isDe ? (
        <>
          <p>
            <strong>Allgemeine Geschäftsbedingungen (AGB)</strong>
          </p>
          <p>
            Die endgültigen Vertragsbedingungen für die Nutzung von Immob24 werden
            vor Vertragsschluss mit Kundinnen und Kunden bereitgestellt. Aktuell
            besteht kein offenes Anmeldeverfahren — Pilotkunden erhalten
            individuelle, schriftlich vereinbarte Bedingungen.
          </p>
          <p>
            Bei Interesse an einer Pilotteilnahme oder Fragen zu vertraglichen
            Bedingungen wenden Sie sich bitte an{' '}
            <a href="mailto:kontakt@immob24.de" className="text-charcoal underline">
              kontakt@immob24.de
            </a>
            .
          </p>
        </>
      ) : (
        <>
          <p>
            <strong>Terms of Service</strong>
          </p>
          <p>
            Final contract terms for using Immob24 will be provided before any
            agreement is concluded. There is currently no open sign-up process —
            pilot customers receive individually negotiated written terms.
          </p>
          <p>
            For pilot enquiries or questions about contract terms, please contact{' '}
            <a href="mailto:kontakt@immob24.de" className="text-charcoal underline">
              kontakt@immob24.de
            </a>
            .
          </p>
        </>
      )}
    </>
  );
};
