import { useEffect, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';
import { useLanguage, languageOptions } from '../i18n';
import type { Language } from '../i18n';
import { pathFor } from '../i18n/pages';
import { useLocalizedPath } from '../lib/useLocalizedPath';
import { trackEvent } from '../lib/analytics';
import { NewsletterSignup } from './NewsletterSignup';
import { openCookieSettings } from './CookieBanner';

const asString = (
  v: string | string[] | Array<{ q: string; a: string }> | string[][],
): string => (typeof v === 'string' ? v : '');

// Cal.com booking page that every "Request demo" CTA opens.
export const DEMO_BOOKING_URL = 'https://www.cal.eu/hari-prasad-iu7zxy';

// Spread onto a CTA <button>. The global click handler in App.tsx opens
// DEMO_BOOKING_URL for any element carrying the data-demo-cta attribute.
export const DEMO_CTA_PROPS = {
  'data-demo-cta': 'true',
};

export const Wordmark = ({ variant = 'dark' }: { variant?: 'dark' | 'light' }) => {
  const { language } = useLanguage();
  const { pathname } = useLocation();
  const homePath = pathFor('home', language);
  const isHome = pathname === homePath || pathname === '/';
  const wrapperClass = 'inline-flex flex-col items-center leading-tight';
  const inner = (
    <>
      <span
        className={`font-heading font-bold text-2xl tracking-tight ${
          variant === 'light' ? 'text-white' : 'text-charcoal'
        }`}
      >
        Immob<span className="text-golden">24</span>
      </span>
      <span
        className={`hidden sm:block mt-1 text-[9px] font-medium uppercase tracking-[0.12em] whitespace-nowrap text-center ${
          variant === 'light' ? 'text-white/60' : 'text-slate'
        }`}
      >
        The AI Operating System for Modern Real Estate
      </span>
    </>
  );
  return isHome ? (
    <a href="#top" className={wrapperClass} aria-label="Immob24">
      {inner}
    </a>
  ) : (
    <Link to={homePath} className={wrapperClass} aria-label="Immob24">
      {inner}
    </Link>
  );
};

const LanguageToggle = () => {
  const { language, switchLanguage } = useLanguage();
  return (
    <div
      role="group"
      aria-label="Sprache wählen"
      className="inline-flex items-center rounded-full border border-charcoal/15 bg-white/80 backdrop-blur p-1 text-xs font-medium shadow-subtle"
    >
      {languageOptions.map((opt) => {
        const active = opt.code === language;
        return (
          <button
            key={opt.code}
            type="button"
            onClick={() => {
              switchLanguage(opt.code as Language);
              trackEvent('lang_toggle_click', { to: opt.code });
            }}
            aria-pressed={active}
            className={`px-3 py-1 rounded-full transition-colors ${
              active ? 'bg-charcoal text-white' : 'text-charcoal/70 hover:text-charcoal'
            }`}
          >
            {opt.short}
          </button>
        );
      })}
    </div>
  );
};

export const Header = () => {
  const { t } = useLanguage();
  const localPath = useLocalizedPath();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const productLink = { to: localPath('produkt'), label: asString(t('nav.product')) };
  const howItWorksLink = {
    to: localPath('howItWorks'),
    label: asString(t('nav.howItWorks')),
  };
  const crmAltLink = {
    to: localPath('crmAlternative'),
    label: asString(t('nav.crmAlternative')),
  };
  const pricingLink = { to: localPath('pricing'), label: asString(t('nav.pricing')) };
  const demoLink = { to: localPath('demo'), label: asString(t('nav.demo')) };
  const betaLink = { to: localPath('beta'), label: asString(t('betaProgram.nav')) };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors ${
        scrolled ? 'bg-white/90 backdrop-blur border-b border-charcoal/5' : 'bg-transparent'
      }`}
    >
      <div className="container flex items-center justify-between py-4">
        <Wordmark />

        <nav className="hidden lg:flex items-center gap-1">
          {[productLink, howItWorksLink, crmAltLink, pricingLink, demoLink, betaLink].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-3 py-2 text-sm text-charcoal/70 hover:text-charcoal transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <button
            type="button"
            {...DEMO_CTA_PROPS}
            onClick={() => trackEvent('header_cta_click')}
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-charcoal text-white px-4 py-2 text-sm font-medium hover:bg-charcoal/90 transition-colors"
          >
            {asString(t('nav.requestDemo'))}
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Menü"
            className="lg:hidden p-2 -mr-2 text-charcoal"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-charcoal/5 bg-white">
          <div className="container py-3 flex flex-col gap-1">
            {[productLink, howItWorksLink, crmAltLink, pricingLink, demoLink, betaLink].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2 text-sm text-charcoal/80 hover:bg-cream rounded-lg"
              >
                {l.label}
              </Link>
            ))}
            <button
              type="button"
              {...DEMO_CTA_PROPS}
              onClick={() => {
                setOpen(false);
                trackEvent('mobile_cta_click');
              }}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-charcoal text-white px-4 py-2 text-sm font-medium"
            >
              {asString(t('nav.requestDemo'))}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

const LegalModal = ({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative bg-white rounded-2xl shadow-card-hover max-w-2xl w-full max-h-[85vh] overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between bg-white border-b border-charcoal/5 px-6 py-4">
          <h3 className="font-heading text-xl text-charcoal">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Schließen"
            className="p-1 text-charcoal/60 hover:text-charcoal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="px-6 py-5 text-sm text-slate leading-relaxed space-y-3">
          {children}
        </div>
      </div>
    </div>
  );
};

const ImpressumContent = () => (
  <>
    <p>
      <strong>Angaben gemäß § 5 TMG</strong>
    </p>
    <p>
      Immob24 GmbH
      <br />
      [Straße und Hausnummer]
      <br />
      [PLZ] [Stadt]
      <br />
      Deutschland
    </p>
    <p>
      <strong>Vertreten durch:</strong>
      <br />
      [Geschäftsführer/in]
    </p>
    <p>
      <strong>Kontakt:</strong>
      <br />
      Telefon: [Telefonnummer]
      <br />
      E-Mail: kontakt@immob24.de
    </p>
    <p>
      <strong>Registereintrag:</strong>
      <br />
      Eintragung im Handelsregister
      <br />
      Registergericht: [Amtsgericht]
      <br />
      Registernummer: [HRB-Nummer]
    </p>
    <p>
      <strong>Umsatzsteuer-ID:</strong> [USt-IdNr.]
    </p>
    <p className="text-xs text-warm-gray pt-3 border-t border-charcoal/5">
      Platzhalter — bitte vor Launch durch finale rechtliche Angaben ersetzen.
    </p>
  </>
);

const DatenschutzContent = () => (
  <>
    <p>
      <strong>1. Verantwortlicher</strong>
    </p>
    <p>
      Verantwortlich für die Datenverarbeitung auf dieser Website ist Immob24 GmbH.
      Kontaktangaben siehe Impressum.
    </p>
    <p>
      <strong>2. Erhebung und Verarbeitung personenbezogener Daten</strong>
    </p>
    <p>
      Beim Besuch dieser Website werden technisch notwendige Daten verarbeitet (z. B.
      IP-Adresse, Browsertyp). Bei Nutzung des Demo-Formulars werden die übermittelten
      Angaben zur Kontaktaufnahme verwendet.
    </p>
    <p>
      <strong>3. Analyse</strong>
    </p>
    <p>
      Wir setzen Google Analytics und Meta Pixel ein, um die Nutzung der Seite auszuwerten.
      Details und Widerrufsmöglichkeiten folgen in der vollständigen Datenschutzerklärung.
    </p>
    <p>
      <strong>4. Ihre Rechte</strong>
    </p>
    <p>
      Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
      Verarbeitung sowie Widerspruch.
    </p>
    <p className="text-xs text-warm-gray pt-3 border-t border-charcoal/5">
      Platzhalter — bitte vor Launch durch finale Datenschutzerklärung ersetzen.
    </p>
  </>
);

const TermsContent = () => (
  <>
    <p>
      Die vollständigen Allgemeinen Geschäftsbedingungen (AGB / Terms of Service) für die
      Nutzung von Immob24 werden hier vor dem öffentlichen Launch ergänzt.
    </p>
    <p>
      Bei Fragen zu vertraglichen Bedingungen wenden Sie sich bitte an{' '}
      <a href="mailto:kontakt@immob24.de" className="text-charcoal underline">
        kontakt@immob24.de
      </a>
      .
    </p>
    <p className="text-xs text-warm-gray pt-3 border-t border-charcoal/5">
      Platzhalter — finale Terms of Service folgen vor Launch.
    </p>
  </>
);

const CookiesContent = () => (
  <>
    <p>
      Wir verwenden Cookies und ähnliche Technologien, um diese Website bereitzustellen, die
      Nutzung zu analysieren und Marketingmaßnahmen auszuwerten.
    </p>
    <p>
      <strong>Notwendige Cookies</strong> sind für den Betrieb der Seite erforderlich.
    </p>
    <p>
      <strong>Analyse-Cookies</strong> (Google Analytics) und{' '}
      <strong>Marketing-Cookies</strong> (Meta Pixel) werden nur mit Ihrer Einwilligung
      gesetzt.
    </p>
    <p className="text-xs text-warm-gray pt-3 border-t border-charcoal/5">
      Platzhalter — vollständige Cookie-Richtlinie folgt vor Launch.
    </p>
  </>
);

type LegalModalKey = 'impressum' | 'datenschutz' | 'terms' | 'cookies';

export const Footer = () => {
  const { t } = useLanguage();
  const localPath = useLocalizedPath();
  const [activeModal, setActiveModal] = useState<LegalModalKey | null>(null);

  const pageLinks = [
    { to: localPath('produkt'), label: asString(t('nav.product')) },
    { to: localPath('howItWorks'), label: asString(t('nav.howItWorks')) },
    { to: localPath('crmAlternative'), label: asString(t('nav.crmAlternative')) },
    { to: localPath('pricing'), label: asString(t('nav.pricing')) },
    { to: localPath('demo'), label: asString(t('nav.demo')) },
    { to: localPath('beta'), label: asString(t('betaProgram.nav')) },
  ];

  const legalLinks: Array<{ key: LegalModalKey; label: string }> = [
    { key: 'impressum', label: asString(t('footer.impressum')) },
    { key: 'datenschutz', label: asString(t('footer.datenschutz')) },
    { key: 'terms', label: asString(t('footer.termsOfService')) },
    { key: 'cookies', label: asString(t('footer.cookies')) },
  ];

  // Cookie Settings opens the consent panel (not a static modal), so this
  // column carries onClick handlers instead of modal keys.
  const settingsLinks: Array<{ label: string; onClick: () => void }> = [
    {
      label: asString(t('footer.privacy')),
      onClick: () => setActiveModal('datenschutz'),
    },
    {
      label: asString(t('footer.cookieSettings')),
      onClick: () => openCookieSettings(),
    },
  ];

  const modalTitle: Record<LegalModalKey, string> = {
    impressum: asString(t('footer.impressum')),
    datenschutz: asString(t('footer.datenschutz')),
    terms: asString(t('footer.termsOfService')),
    cookies: asString(t('footer.cookies')),
  };

  const renderModalBody = () => {
    switch (activeModal) {
      case 'impressum':
        return <ImpressumContent />;
      case 'datenschutz':
        return <DatenschutzContent />;
      case 'terms':
        return <TermsContent />;
      case 'cookies':
        return <CookiesContent />;
      default:
        return null;
    }
  };

  const linkBtnClass = 'text-left text-sm text-white/75 hover:text-white';

  return (
    <footer className="bg-charcoal text-white py-16 border-t border-white/5">
      <div className="container">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex w-fit flex-col items-center">
              <Wordmark variant="light" />
              <NewsletterSignup />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
              {asString(t('footer.sectionsLabel'))}
            </p>
            <nav className="mt-3 flex flex-col gap-2">
              {pageLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="text-sm text-white/75 hover:text-white"
                >
                  {l.label}
                </Link>
              ))}
              <a
                href="mailto:kontakt@immob24.de"
                className="text-sm text-white/75 hover:text-white"
              >
                {asString(t('footer.contact'))}
              </a>
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
              {asString(t('footer.legalLabel'))}
            </p>
            <nav className="mt-3 flex flex-col gap-2">
              {legalLinks.map((l) => (
                <button
                  key={`legal-${l.key}-${l.label}`}
                  type="button"
                  onClick={() => setActiveModal(l.key)}
                  className={linkBtnClass}
                >
                  {l.label}
                </button>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
              {asString(t('footer.settingsLabel'))}
            </p>
            <nav className="mt-3 flex flex-col gap-2">
              {settingsLinks.map((l) => (
                <button
                  key={`settings-${l.label}`}
                  type="button"
                  onClick={l.onClick}
                  className={linkBtnClass}
                >
                  {l.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-xs text-white/40 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <span>
            © {new Date().getFullYear()} Immob24. {asString(t('footer.copyright'))}
          </span>
          <span>Made in Germany.</span>
        </div>
      </div>

      <LegalModal
        open={activeModal !== null}
        onClose={() => setActiveModal(null)}
        title={activeModal ? modalTitle[activeModal] : ''}
      >
        {renderModalBody()}
      </LegalModal>
    </footer>
  );
};
