import { useLanguage } from '../../i18n';
import { DraftNotice } from './DraftNotice';

// The Impressum is the one document that depends entirely on factual entity
// data that does not yet exist (registered company name, address,
// Geschäftsführer, HRB number). German law (§ 5 TMG) requires accurate
// statutory data — fake or partial placeholder data is *worse* than a
// clearly-marked draft notice. Once the entity is registered we replace this
// component's body with the eRecht24-generated text.
export const ImpressumContent = () => {
  const { language } = useLanguage();
  const isDe = language === 'de';
  return (
    <>
      <DraftNotice />
      {isDe ? (
        <>
          <p>
            <strong>Pflichtangaben gemäß § 5 TMG</strong>
          </p>
          <p>
            Das gesetzlich vorgeschriebene Impressum wird mit der Eintragung
            des Unternehmens ergänzt. Bis dahin erreichen Sie uns unter:
          </p>
          <p>
            E-Mail:{' '}
            <a href="mailto:kontakt@immob24.de" className="text-charcoal underline">
              kontakt@immob24.de
            </a>
          </p>
          <p className="text-xs text-warm-gray pt-3 border-t border-charcoal/5">
            Hinweis: Die Plattform befindet sich in einer geschlossenen Vorab-Phase
            und ist derzeit nicht öffentlich für Suchmaschinen freigegeben (siehe
            Meta-Tag „robots: noindex"). Ein vollständiges Impressum mit
            Vertretungsberechtigten, ladungsfähiger Anschrift, Registergericht und
            ggf. Umsatzsteuer-Identifikationsnummer wird vor dem öffentlichen Launch
            veröffentlicht.
          </p>
        </>
      ) : (
        <>
          <p>
            <strong>Statutory information pursuant to § 5 TMG (German Telemedia Act)</strong>
          </p>
          <p>
            The statutory imprint will be added once the operating entity has
            been registered. Until then please contact us at:
          </p>
          <p>
            E-mail:{' '}
            <a href="mailto:kontakt@immob24.de" className="text-charcoal underline">
              kontakt@immob24.de
            </a>
          </p>
          <p className="text-xs text-warm-gray pt-3 border-t border-charcoal/5">
            Note: this site is currently in a closed pre-launch phase and is not
            indexed by search engines (see the `robots: noindex` meta tag). A
            complete imprint with legal representative, registered address,
            commercial register entry, and (if applicable) VAT ID will be
            published before the public launch.
          </p>
        </>
      )}
    </>
  );
};
