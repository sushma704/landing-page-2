import { useEffect } from 'react';
import { Header, Footer } from '../components/SiteChrome';
import { DatenschutzContent } from '../components/legal/DatenschutzContent';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { useLanguage } from '../i18n';
import { SITE_ORIGIN } from '../i18n/pages';

type TVal = string | string[] | Array<{ q: string; a: string }> | string[][];
const asString = (v: TVal): string => (typeof v === 'string' ? v : '');

// Standalone privacy-policy page served at a single, language-neutral URL
// (/privacy → https://immob24.com/privacy). Both the DE and EN footers link
// here; the body (DatenschutzContent) renders in whichever language is
// currently active, so the URL stays the same while the text is translated.
export default function PrivacyPage() {
  const { language, t } = useLanguage();
  const title = asString(t('footer.datenschutz'));

  useDocumentMeta({
    title: `${title} · immob24`,
    canonical: `${SITE_ORIGIN}/privacy`,
    htmlLang: language,
  });

  // Footer links live at the bottom of long pages — land the visitor at the
  // top of the policy rather than wherever they scrolled from.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen antialiased bg-white">
      <Header />
      <main className="relative pt-28 pb-16">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h1 className="font-heading text-3xl md:text-4xl text-charcoal">
              {title}
            </h1>
            <div className="mt-8 text-sm text-slate leading-relaxed space-y-3">
              <DatenschutzContent />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
