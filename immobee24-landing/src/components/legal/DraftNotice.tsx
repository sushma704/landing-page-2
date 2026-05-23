import { useLanguage } from '../../i18n';

// Shared banner that appears at the top of every legal modal.
// Makes it visually unmissable that the texts are not final, so a visitor
// (or an Abmahn-firm) cannot reasonably claim that draft text was presented
// as binding.
export const DraftNotice = () => {
  const { language } = useLanguage();
  const isDe = language === 'de';
  return (
    <div className="rounded-lg border border-amber-300/60 bg-amber-50 px-4 py-3 text-xs text-amber-900">
      <p className="font-semibold">
        {isDe ? 'In Vorbereitung' : 'Draft — work in progress'}
      </p>
      <p className="mt-1 leading-relaxed">
        {isDe
          ? 'Diese Seite befindet sich in der Vorbereitung. Endgültige rechtliche Texte werden vor dem öffentlichen Launch ergänzt. Fragen bitte an '
          : 'This page is being prepared. Final legal text will be published before the public launch. For questions please contact '}
        <a href="mailto:kontakt@immob24.de" className="underline">
          kontakt@immob24.de
        </a>
        .
      </p>
    </div>
  );
};
