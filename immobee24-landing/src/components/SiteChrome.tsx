import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Check, ChevronDown, Globe, Menu, X } from 'lucide-react';
import { useLanguage, languageOptions } from '../i18n';
import type { Language } from '../i18n';
import { pathFor } from '../i18n/pages';
import { useLocalizedPath } from '../lib/useLocalizedPath';
import { ThemeToggle } from './ThemeToggle';
import { trackEvent } from '../lib/analytics';
import { NewsletterSignup } from './NewsletterSignup';
import { openCookieSettings } from './CookieBanner';
import { ImpressumContent } from './legal/ImpressumContent';
import { DatenschutzContent } from './legal/DatenschutzContent';
import { TermsContent } from './legal/TermsContent';
import { CookiesContent } from './legal/CookiesContent';

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

export const Wordmark = ({
  variant = 'dark',
  compact = false,
}: {
  variant?: 'dark' | 'light';
  // compact: logo only — used in the fixed header so the whole bar stays one
  // slim row (the tagline is ~280px wide and forced the nav to overflow).
  compact?: boolean;
}) => {
  const { language } = useLanguage();
  const { pathname } = useLocation();
  const homePath = pathFor('home', language);
  const isHome = pathname === homePath || pathname === '/';
  const wrapperClass = 'inline-flex flex-col items-start leading-tight';
  // Two PNGs: `dark` (teal "immob" + orange "24") for the white header,
  // `light` (white "immob" + orange "24") for the charcoal footer. The
  // width/height are set explicitly so the surrounding chrome doesn't reflow
  // while the image loads (avoids CLS).
  // Brand rule (brief §02): the wordmark is ALWAYS "immob" teal + "24" amber
  // — never white, never one flat colour. Both PNGs are transparent; dark
  // surfaces use the brightened-teal variant (#3FBBA6, the brief's own dark
  // token) so "immob" stays legible on warm-ink backgrounds.
  const inner = (
    <>
      {variant === 'light' ? (
        <img
          src="/immob24-wordmark-teal-dark.png"
          alt="immob24"
          width={148}
          height={40}
          className="h-10 w-auto"
        />
      ) : (
        <>
          <img
            src="/immob24-wordmark.png"
            alt="immob24"
            width={148}
            height={40}
            className="h-10 w-auto dark:hidden"
          />
          <img
            src="/immob24-wordmark-teal-dark.png"
            alt="immob24"
            width={148}
            height={40}
            className="hidden h-10 w-auto dark:block"
          />
        </>
      )}
      {!compact && (
        <span
          className={`hidden sm:block mt-1 text-[8px] font-medium uppercase tracking-[0.1em] whitespace-nowrap ${
            variant === 'light' ? 'text-white/60' : 'text-slate'
          }`}
        >
          The AI Operating System for Modern Real Estate
        </span>
      )}
    </>
  );
  return isHome ? (
    <a href="#top" className={wrapperClass} aria-label="immob24">
      {inner}
    </a>
  ) : (
    <Link to={homePath} className={wrapperClass} aria-label="immob24">
      {inner}
    </Link>
  );
};

// AI-refinement: globe dropdown (Bitrix24-style) instead of inline pills —
// shows every language with its native name and scales beyond 4 languages.
const LanguageToggle = ({ onDark = false }: { onDark?: boolean }) => {
  const { language, switchLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const current = languageOptions.find((o) => o.code === language);
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Sprache wählen"
        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
          onDark
            ? 'border-white/25 bg-white/10 text-white backdrop-blur hover:border-golden/60'
            : 'border-charcoal/15 bg-white/80 text-charcoal backdrop-blur shadow-subtle hover:border-golden/50'
        }`}
      >
        <Globe className={`h-3.5 w-3.5 ${onDark ? 'text-white/70' : 'text-charcoal/60'}`} />
        {current?.short}
        <ChevronDown
          className={`h-3 w-3 transition-transform ${onDark ? 'text-white/60' : 'text-charcoal/50'} ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Sprache wählen"
          className="absolute end-0 top-full mt-2 w-48 rounded-xl border border-charcoal/10 bg-white shadow-card p-1.5 z-50"
        >
          {languageOptions.map((opt) => {
            const active = opt.code === language;
            return (
              <button
                key={opt.code}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => {
                  setOpen(false);
                  switchLanguage(opt.code as Language);
                  trackEvent('lang_toggle_click', { to: opt.code });
                }}
                className={`w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm text-start transition-colors ${
                  active
                    ? 'bg-golden/10 text-charcoal font-medium'
                    : 'text-charcoal/75 hover:bg-cream'
                }`}
              >
                <span>{opt.name}</span>
                <span className="flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-warm-gray">
                    {opt.short}
                  </span>
                  {active && <Check className="h-3.5 w-3.5 text-golden-dark" />}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

type NavItem = { to: string; label: string; desc?: string };

// Desktop dropdown for grouped nav sections (Solutions, Resources).
// Opens on hover or click, closes on outside click / route click.
const NavDropdown = ({
  label,
  items,
  onDark,
}: {
  label: string;
  items: NavItem[];
  onDark: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        // open-only: hover already opened it on mouse devices, so a toggle
        // would immediately close the menu on click. Mouse-leave and the
        // outside-click handler do the closing (works for touch too).
        onClick={() => setOpen(true)}
        className={`flex items-center gap-1 px-2 py-2 text-sm transition-colors whitespace-nowrap ${
          onDark ? 'text-white/75 hover:text-white' : 'text-charcoal/70 hover:text-charcoal'
        }`}
      >
        {label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="absolute start-0 top-full z-50 pt-1">
          <div className="menu-pop min-w-[15rem] rounded-2xl border border-charcoal/10 bg-white p-2 shadow-card-hover">
            {items.map((it, i) => (
              <Link
                key={it.to}
                to={it.to}
                onClick={() => setOpen(false)}
                className="menu-item block rounded-xl px-3.5 py-2.5 hover:bg-cream"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <span className="block text-sm font-medium text-charcoal">{it.label}</span>
                {it.desc && <span className="block text-xs text-warm-gray">{it.desc}</span>}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const Header = () => {
  const { t, language } = useLanguage();
  const localPath = useLocalizedPath();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // The home hero is a full-viewport dark canvas (brief re-skin); while the
  // transparent header floats over it, links/controls render light-on-dark.
  const isHome = pathname === pathFor('home', language) || pathname === '/';
  const onDark = isHome && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Unified IA (blueprint phase 1): Product · AI Agents · Solutions ▾ ·
  // Pricing · Resources ▾ · Contact. Labels are inline 4-lang records —
  // translations.ts untouched. Contact points at the demo page until the
  // unified contact form ships (phase 2).
  const NL: Record<string, Record<string, string>> = {
    aiAgents: { de: 'KI-Agenten', en: 'AI Agents', fr: 'Agents IA', ar: 'وكلاء الذكاء الاصطناعي' },
    aiNew: { de: 'Neu', en: 'New', fr: 'Nouveau', ar: 'جديد' },
    solutions: { de: 'Lösungen', en: 'Solutions', fr: 'Solutions', ar: 'الحلول' },
    resources: { de: 'Ressourcen', en: 'Resources', fr: 'Ressources', ar: 'الموارد' },
    contact: { de: 'Kontakt', en: 'Contact', fr: 'Contact', ar: 'اتصال' },
    whyImmob24: { de: 'Warum immob24', en: 'Why immob24', fr: 'Pourquoi immob24', ar: 'لماذا immob24' },
    video: { de: 'Produkt-Video', en: 'Product video', fr: 'Vidéo produit', ar: 'فيديو المنتج' },
    compliance: { de: 'Compliance & DSGVO', en: 'Compliance & GDPR', fr: 'Conformité & RGPD', ar: 'الامتثال وحماية البيانات' },
    beta: { de: 'Beta-Programm', en: 'Beta program', fr: 'Programme bêta', ar: 'برنامج بيتا' },
  };
  const nl = (k: keyof typeof NL) => NL[k][language] ?? NL[k].en;

  const productLink = { to: localPath('produkt'), label: asString(t('nav.product')) };
  const aiAgentsLink = { to: localPath('aiFeatures'), label: nl('aiAgents') };
  const pricingLink = { to: localPath('pricing'), label: asString(t('nav.pricing')) };
  const contactLink = { to: localPath('demo'), label: nl('contact') };
  const solutionsItems: NavItem[] = [
    { to: localPath('crmAlternative'), label: asString(t('nav.crmAlternative')) },
    { to: localPath('whyImmob24'), label: nl('whyImmob24') },
  ];
  const resourcesItems: NavItem[] = [
    { to: `${localPath('aiFeatures')}#video`, label: nl('video') },
    { to: localPath('compliance'), label: nl('compliance') },
    { to: localPath('beta'), label: nl('beta') },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors ${
        scrolled ? 'bg-white/90 backdrop-blur border-b border-charcoal/5' : 'bg-transparent'
      }`}
    >
      <div className="container flex items-center justify-between gap-4 py-4">
        <Wordmark variant={onDark ? 'light' : 'dark'} />

        <nav className="hidden xl:flex flex-1 items-center justify-end gap-0.5 me-2">
          <Link
            to={productLink.to}
            className={`px-2 py-2 text-sm transition-colors whitespace-nowrap ${
              onDark ? 'text-white/75 hover:text-white' : 'text-charcoal/70 hover:text-charcoal'
            }`}
          >
            {productLink.label}
          </Link>
          <Link
            to={aiAgentsLink.to}
            className={`flex items-center gap-1.5 px-2 py-2 text-sm transition-colors whitespace-nowrap ${
              onDark ? 'text-white/75 hover:text-white' : 'text-charcoal/70 hover:text-charcoal'
            }`}
          >
            {aiAgentsLink.label}
            <span className="rounded-full bg-gradient-golden px-1.5 py-px text-[9px] font-bold uppercase tracking-wide text-[#1E1B16]">
              {nl('aiNew')}
            </span>
          </Link>
          <NavDropdown label={nl('solutions')} items={solutionsItems} onDark={onDark} />
          <Link
            to={pricingLink.to}
            className={`px-2 py-2 text-sm transition-colors whitespace-nowrap ${
              onDark ? 'text-white/75 hover:text-white' : 'text-charcoal/70 hover:text-charcoal'
            }`}
          >
            {pricingLink.label}
          </Link>
          <NavDropdown label={nl('resources')} items={resourcesItems} onDark={onDark} />
          <Link
            to={contactLink.to}
            className={`px-2 py-2 text-sm transition-colors whitespace-nowrap ${
              onDark ? 'text-white/75 hover:text-white' : 'text-charcoal/70 hover:text-charcoal'
            }`}
          >
            {contactLink.label}
          </Link>
        </nav>

        <div className="flex flex-none items-center gap-2">
          <ThemeToggle onDark={onDark} />
          <LanguageToggle onDark={onDark} />
          {/* AI-refinement: login entry to the immob24 app (dashboard is a
              separate application — always a full absolute URL). */}
          <a
            href="https://immob24.com/login"
            onClick={() => trackEvent('header_login_click')}
            className={`hidden md:inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              onDark
                ? 'border-white/25 text-white hover:border-golden/60 hover:text-golden'
                : 'border-charcoal/15 text-charcoal hover:border-golden/50 hover:text-golden-dark'
            }`}
          >
            Login
          </a>
          <button
            type="button"
            {...DEMO_CTA_PROPS}
            onClick={() => trackEvent('header_cta_click')}
            className={`hidden md:inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              onDark
                ? 'bg-golden text-[#1E1B16] hover:bg-golden/90 shadow-golden'
                : 'bg-charcoal text-white hover:bg-charcoal/90'
            }`}
          >
            {asString(t('nav.requestDemo'))}
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Menü"
            className={`xl:hidden p-2 -mr-2 ${onDark ? 'text-white' : 'text-charcoal'}`}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="xl:hidden border-t border-charcoal/5 bg-white">
          <div className="container py-3 flex flex-col gap-1">
            {[productLink, aiAgentsLink, pricingLink, contactLink].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2 text-sm text-charcoal/80 hover:bg-cream rounded-lg"
              >
                {l.label}
              </Link>
            ))}
            {(
              [
                [nl('solutions'), solutionsItems],
                [nl('resources'), resourcesItems],
              ] as Array<[string, NavItem[]]>
            ).map(([group, items]) => (
              <div key={group} className="mt-1">
                <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-warm-gray">
                  {group}
                </p>
                {items.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2 text-sm text-charcoal/80 hover:bg-cream rounded-lg"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            ))}
            <a
              href="https://immob24.com/login"
              onClick={() => setOpen(false)}
              className="px-3 py-2 text-sm text-charcoal/80 hover:bg-cream rounded-lg"
            >
              Login
            </a>
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

// Legal modal bodies live in src/components/legal/. SiteChrome only imports
// them so this file stays focused on header/footer scaffolding.

type LegalModalKey = 'impressum' | 'datenschutz' | 'terms' | 'cookies';

export const Footer = () => {
  const { t, language } = useLanguage();
  const localPath = useLocalizedPath();
  const [activeModal, setActiveModal] = useState<LegalModalKey | null>(null);

  const FOOT_AI: Record<string, string> = {
    de: 'KI-Funktionen', en: 'AI Features', fr: 'Fonctions IA', ar: 'ميزات الذكاء الاصطناعي',
  };
  const FOOT_WHY: Record<string, string> = {
    de: 'Warum Immob24', en: 'Why immob24', fr: 'Pourquoi immob24', ar: 'لماذا immob24',
  };
  const FOOT_COMPLIANCE: Record<string, string> = {
    de: 'Compliance', en: 'Compliance', fr: 'Conformité', ar: 'الامتثال',
  };
  const pageLinks = [
    // AI-refinement links (inline labels — translations.ts untouched)
    { to: localPath('aiFeatures'), label: FOOT_AI[language] ?? FOOT_AI.en },
    { to: localPath('whyImmob24'), label: FOOT_WHY[language] ?? FOOT_WHY.en },
    { to: localPath('compliance'), label: FOOT_COMPLIANCE[language] ?? FOOT_COMPLIANCE.en },
    { to: localPath('produkt'), label: asString(t('nav.product')) },
    { to: `${localPath('produkt')}#how-it-works`, label: asString(t('nav.howItWorks')) },
    { to: localPath('crmAlternative'), label: asString(t('nav.crmAlternative')) },
    { to: localPath('pricing'), label: asString(t('nav.pricing')) },
    { to: localPath('demo'), label: asString(t('nav.demo')) },
    { to: localPath('beta'), label: asString(t('betaProgram.nav')) },
  ];

  // The privacy policy has its own page (/privacy) rather than a modal, so
  // that entry carries a `to` path; the rest still open in-place modals.
  const legalLinks: Array<{ key: LegalModalKey; label: string; to?: string }> = [
    { key: 'impressum', label: asString(t('footer.impressum')) },
    { key: 'datenschutz', label: asString(t('footer.datenschutz')), to: '/privacy' },
    { key: 'terms', label: asString(t('footer.termsOfService')) },
    { key: 'cookies', label: asString(t('footer.cookies')) },
  ];

  // Cookie Settings opens the consent panel (not a static modal); Privacy
  // links to the /privacy page. So this column mixes `to` links and onClick
  // handlers rather than modal keys.
  const settingsLinks: Array<{ label: string; to?: string; onClick?: () => void }> = [
    {
      label: asString(t('footer.privacy')),
      to: '/privacy',
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
        {/*
          Wordmark column takes 6/12 (so its tagline "THE AI OPERATING
          SYSTEM FOR MODERN REAL ESTATE" fits on one line). The other
          three columns each take 2/12 so they distribute evenly across
          the remaining half of the row, with equal gaps between them.
        */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="flex flex-col items-start gap-4">
              <Wordmark variant="light" />
              <NewsletterSignup />
            </div>
          </div>

          <div className="lg:col-span-2">
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

          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
              {asString(t('footer.legalLabel'))}
            </p>
            <nav className="mt-3 flex flex-col gap-2">
              {legalLinks.map((l) =>
                l.to ? (
                  // Full-page navigation (not react-router Link): /privacy is a
                  // standalone static page served by nginx, not an SPA route.
                  <a key={`legal-${l.key}-${l.label}`} href={l.to} className={linkBtnClass}>
                    {l.label}
                  </a>
                ) : (
                  <button
                    key={`legal-${l.key}-${l.label}`}
                    type="button"
                    onClick={() => setActiveModal(l.key)}
                    className={linkBtnClass}
                  >
                    {l.label}
                  </button>
                ),
              )}
            </nav>
          </div>

          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
              {asString(t('footer.settingsLabel'))}
            </p>
            <nav className="mt-3 flex flex-col gap-2">
              {settingsLinks.map((l) =>
                l.to ? (
                  <a key={`settings-${l.label}`} href={l.to} className={linkBtnClass}>
                    {l.label}
                  </a>
                ) : (
                  <button
                    key={`settings-${l.label}`}
                    type="button"
                    onClick={l.onClick}
                    className={linkBtnClass}
                  >
                    {l.label}
                  </button>
                ),
              )}
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
