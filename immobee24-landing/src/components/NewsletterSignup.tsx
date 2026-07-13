import { useEffect, useState, type FormEvent } from 'react';
import { AlertCircle, Check, Mail, X } from 'lucide-react';
import { useLanguage } from '../i18n';
import { trackEvent } from '../lib/analytics';

// ── Google Sheet endpoint (Google Apps Script web app) ───────────────────────
// Paste the Web App URL you get after deploying the Apps Script:
//   Google Sheet → Extensions → Apps Script → Deploy → New deployment →
//   Web app (Execute as: Me, Who has access: Anyone) → copy the URL.
// It looks like:  https://script.google.com/macros/s/AKfyc.../exec
export const SHEET_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbx-c7o5Yaz7p1CVgSehLONixeBJZmvcmo-KKKcvRls7h2N_hfSDj7_q7n2HgAm4DekV1A/exec';

// Basic email shape check — rejects obviously invalid addresses before submit.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const s = (v: unknown): string => (typeof v === 'string' ? v : '');

type Status = 'idle' | 'submitting' | 'success' | 'error';

export const NewsletterSignup = () => {
  const { t, language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState(''); // honeypot — real users leave empty
  const [emailError, setEmailError] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const tr = (key: string) => s(t(`newsletter.${key}`));

  // Escape closes the modal; lock body scroll while it is open (mirrors LegalModal).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const openModal = () => {
    setName('');
    setEmail('');
    setWebsite('');
    setEmailError('');
    setStatus('idle');
    setOpen(true);
    trackEvent('newsletter_open', { language });
  };

  const validateEmail = (value: string): string => {
    const v = value.trim();
    if (!v) return tr('emailRequired');
    if (!EMAIL_RE.test(v)) return tr('emailInvalid');
    return '';
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const err = validateEmail(email);
    setEmailError(err);
    if (err) return; // only a valid email is accepted

    if (SHEET_ENDPOINT.includes('REPLACE_WITH_YOUR_SCRIPT_URL')) {
      console.warn('NewsletterSignup: SHEET_ENDPOINT is not configured yet.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    try {
      // FormData keeps this a "simple" request (no CORS preflight); the Apps
      // Script endpoint returns no CORS headers, so the response is opaque —
      // a resolved fetch means the row was written to the sheet.
      const body = new FormData();
      body.set('name', name.trim());
      body.set('email', email.trim());
      body.set('botcheck', website); // honeypot

      await fetch(SHEET_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        body,
      });

      setStatus('success');
      trackEvent('newsletter_subscribe', { language });
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        aria-label={tr('ariaOpen')}
        className="mt-5 flex w-fit items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white hover:text-charcoal"
      >
        <Mail className="h-4 w-4" />
        {tr('button')}
      </button>

      {open && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="newsletter-title"
            className="relative w-full max-w-md rounded-2xl bg-white shadow-card-hover"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={tr('close')}
              className="absolute right-4 top-4 p-1 text-charcoal/50 hover:text-charcoal"
            >
              <X className="h-5 w-5" />
            </button>

            {status === 'success' ? (
              <div className="px-6 py-10 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-golden/15 text-golden">
                  <Check className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-xl text-charcoal">
                  {tr('successTitle')}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {tr('successBody')}
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mt-6 rounded-full bg-charcoal px-6 py-2.5 text-sm font-medium text-white hover:bg-charcoal/90"
                >
                  {tr('close')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="px-6 py-7">
                {/* Honeypot — hidden from real users; bot-filled submissions are dropped */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="hidden"
                />
                <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-golden/15 text-golden">
                  <Mail className="h-5 w-5" />
                </div>
                <h3
                  id="newsletter-title"
                  className="font-heading text-xl text-charcoal"
                >
                  {tr('title')}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate">
                  {tr('subtitle')}
                </p>

                {/* Name — optional */}
                <label
                  htmlFor="newsletter-name"
                  className="mt-5 block text-sm font-medium text-charcoal"
                >
                  {tr('nameLabel')}
                </label>
                <input
                  id="newsletter-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={tr('namePlaceholder')}
                  className="mt-1.5 w-full rounded-lg border border-charcoal/15 px-3.5 py-2.5 text-sm text-charcoal outline-none transition-colors focus:border-charcoal/40"
                />

                {/* Email — required + validated */}
                <label
                  htmlFor="newsletter-email"
                  className="mt-4 block text-sm font-medium text-charcoal"
                >
                  {tr('emailLabel')} <span className="text-golden">*</span>
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    const v = e.target.value;
                    setEmail(v);
                    if (emailError) setEmailError(validateEmail(v));
                    if (status === 'error') setStatus('idle');
                  }}
                  onBlur={() => setEmailError(validateEmail(email))}
                  placeholder={tr('emailPlaceholder')}
                  aria-invalid={!!emailError}
                  aria-describedby={
                    emailError ? 'newsletter-email-error' : undefined
                  }
                  className={`mt-1.5 w-full rounded-lg border px-3.5 py-2.5 text-sm text-charcoal outline-none transition-colors ${
                    emailError
                      ? 'border-red-400 focus:border-red-500'
                      : 'border-charcoal/15 focus:border-charcoal/40'
                  }`}
                />
                {emailError && (
                  <p
                    id="newsletter-email-error"
                    className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-500"
                  >
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    {emailError}
                  </p>
                )}

                {status === 'error' && (
                  <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-red-500">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    {tr('errorBody')}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-golden px-6 py-3 text-sm font-semibold text-charcoal transition-colors hover:bg-golden/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'submitting' ? tr('submitting') : tr('submit')}
                </button>

                <p className="mt-3 text-center text-xs leading-relaxed text-warm-gray">
                  {tr('consent')}
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
