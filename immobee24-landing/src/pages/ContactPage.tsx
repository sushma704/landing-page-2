// Unified contact page (IA phase 2): one form, three intents — book a demo,
// join the beta, or ask a question (?intent= preselects). Replaces the
// standalone demo page; its trust content (what you'll see, no strings
// attached, FAQ) moves here via the existing demoPage.* i18n keys.
//
// Submission reuses the newsletter's Google-Sheet endpoint with extra fields
// (source/intent/size/message). NOTE for go-live: the Apps Script must be
// extended to store the extra columns — see the comment at SHEET_ENDPOINT.

import { useMemo, useState, type ComponentType, type FormEvent } from 'react';
import {
  AlertCircle,
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  Mail,
  MessageCircle,
  Rocket,
  ShieldCheck,
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { Header, Footer, DEMO_BOOKING_URL } from '../components/SiteChrome';
import { cascadeDelay, chorSlot, Reveal, RevealGroup, TypeOnce } from '../lib/animations';
import { SHEET_ENDPOINT } from '../components/NewsletterSignup';
import { useLanguage } from '../i18n';
import type { Language, TranslationKey } from '../i18n';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { SITE_ORIGIN, pathFor, urlFor } from '../i18n/pages';
import { trackEvent } from '../lib/analytics';

type Copy = Record<Language, string>;
type TVal = string | string[] | Array<{ q: string; a: string }> | undefined;
const asString = (v: TVal): string => (typeof v === 'string' ? v : '');
const asStringArray = (v: TVal): string[] =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : [];
const asFaqArray = (v: TVal): Array<{ q: string; a: string }> =>
  Array.isArray(v)
    ? v.filter(
        (x): x is { q: string; a: string } =>
          !!x && typeof x === 'object' && 'q' in x && 'a' in x,
      )
    : [];

type Intent = 'demo' | 'beta' | 'question';
const INTENTS: Intent[] = ['demo', 'beta', 'question'];

const T: Record<string, Copy> = {
  metaTitle: {
    de: 'Kontakt — Demo buchen, Beta beitreten oder Frage stellen | Immob24',
    en: 'Contact — book a demo, join the beta or ask a question | Immob24',
    fr: 'Contact — réserver une démo, rejoindre la bêta ou poser une question | Immob24',
    ar: 'اتصال — احجزوا عرضًا أو انضموا إلى بيتا أو اطرحوا سؤالًا | Immob24',
  },
  metaDesc: {
    de: 'Ein Formular für alles: Demo-Termin, Beta-Programm oder eine Frage an das Immob24-Team. Antwort innerhalb eines Werktags.',
    en: 'One form for everything: a demo slot, the beta program, or a question for the Immob24 team. Reply within one business day.',
    fr: 'Un formulaire pour tout : créneau de démo, programme bêta ou question à l’équipe Immob24. Réponse sous un jour ouvré.',
    ar: 'نموذج واحد لكل شيء: موعد عرض توضيحي أو برنامج بيتا أو سؤال لفريق Immob24. الرد خلال يوم عمل واحد.',
  },
  eyebrow: { de: 'Kontakt', en: 'Contact', fr: 'Contact', ar: 'اتصال' },
  headline: {
    de: 'Sprechen wir über Ihr Maklerbüro',
    en: 'Let’s talk about your brokerage',
    fr: 'Parlons de votre agence',
    ar: 'لنتحدث عن مكتبكم العقاري',
  },
  sub: {
    de: 'Demo buchen, dem Beta-Programm beitreten oder einfach eine Frage stellen — ein Formular, ehrliche Antworten.',
    en: 'Book a demo, join the beta program, or just ask a question — one form, honest answers.',
    fr: 'Réservez une démo, rejoignez la bêta ou posez simplement une question — un formulaire, des réponses honnêtes.',
    ar: 'احجزوا عرضًا أو انضموا إلى برنامج بيتا أو اطرحوا سؤالًا — نموذج واحد وإجابات صادقة.',
  },
  intentDemo: { de: 'Demo buchen', en: 'Book a demo', fr: 'Réserver une démo', ar: 'حجز عرض' },
  intentBeta: { de: 'Beta beitreten', en: 'Join the beta', fr: 'Rejoindre la bêta', ar: 'الانضمام إلى بيتا' },
  intentQuestion: { de: 'Frage stellen', en: 'Ask a question', fr: 'Poser une question', ar: 'طرح سؤال' },
  name: { de: 'Name', en: 'Name', fr: 'Nom', ar: 'الاسم' },
  email: { de: 'E-Mail', en: 'Email', fr: 'E-mail', ar: 'البريد الإلكتروني' },
  emailRequired: {
    de: 'Bitte E-Mail-Adresse angeben.',
    en: 'Please enter your email address.',
    fr: 'Veuillez saisir votre adresse e-mail.',
    ar: 'يرجى إدخال البريد الإلكتروني.',
  },
  emailInvalid: {
    de: 'Das sieht nicht nach einer gültigen E-Mail aus.',
    en: 'That does not look like a valid email.',
    fr: 'Cela ne ressemble pas à un e-mail valide.',
    ar: 'هذا لا يبدو بريدًا إلكترونيًا صالحًا.',
  },
  size: {
    de: 'Größe Ihres Büros',
    en: 'Size of your brokerage',
    fr: 'Taille de votre agence',
    ar: 'حجم مكتبكم',
  },
  sizeSolo: { de: 'Einzelmakler', en: 'Solo broker', fr: 'Indépendant', ar: 'وسيط مستقل' },
  sizeSmall: { de: '2–5 Personen', en: '2–5 people', fr: '2–5 personnes', ar: '2–5 أشخاص' },
  sizeMid: { de: '6–20 Personen', en: '6–20 people', fr: '6–20 personnes', ar: '6–20 شخصًا' },
  sizeLarge: { de: 'Über 20 Personen', en: 'More than 20', fr: 'Plus de 20', ar: 'أكثر من 20' },
  message: { de: 'Nachricht', en: 'Message', fr: 'Message', ar: 'الرسالة' },
  messagePh: {
    de: 'Worum geht es? (optional)',
    en: 'What is it about? (optional)',
    fr: 'De quoi s’agit-il ? (facultatif)',
    ar: 'ما الموضوع؟ (اختياري)',
  },
  messagePhQuestion: {
    de: 'Ihre Frage an uns …',
    en: 'Your question for us …',
    fr: 'Votre question …',
    ar: 'سؤالكم لنا …',
  },
  messageRequired: {
    de: 'Bitte kurz beschreiben, worum es geht.',
    en: 'Please describe briefly what it is about.',
    fr: 'Merci de décrire brièvement votre demande.',
    ar: 'يرجى وصف الموضوع باختصار.',
  },
  submit: { de: 'Absenden', en: 'Send', fr: 'Envoyer', ar: 'إرسال' },
  submitting: { de: 'Wird gesendet …', en: 'Sending …', fr: 'Envoi …', ar: 'جارٍ الإرسال …' },
  bookDirect: {
    de: 'Oder direkt einen Termin wählen:',
    en: 'Or pick a slot directly:',
    fr: 'Ou choisissez directement un créneau :',
    ar: 'أو اختاروا موعدًا مباشرة:',
  },
  bookDirectCta: {
    de: 'Kalender öffnen',
    en: 'Open the calendar',
    fr: 'Ouvrir le calendrier',
    ar: 'فتح التقويم',
  },
  successTitle: { de: 'Angekommen!', en: 'Received!', fr: 'Bien reçu !', ar: 'وصلت رسالتكم!' },
  successBody: {
    de: 'Wir melden uns innerhalb eines Werktags bei Ihnen.',
    en: 'We will get back to you within one business day.',
    fr: 'Nous revenons vers vous sous un jour ouvré.',
    ar: 'سنعاود التواصل معكم خلال يوم عمل واحد.',
  },
  successDemo: {
    de: 'Noch schneller: Wählen Sie direkt einen Termin im Kalender.',
    en: 'Even faster: pick a slot directly in the calendar.',
    fr: 'Encore plus rapide : choisissez un créneau dans le calendrier.',
    ar: 'أسرع من ذلك: اختاروا موعدًا مباشرة في التقويم.',
  },
  errorBody: {
    de: 'Das hat nicht geklappt. Bitte erneut versuchen oder direkt an kontakt@immob24.de schreiben.',
    en: 'That did not work. Please try again or write directly to kontakt@immob24.de.',
    fr: 'Cela n’a pas fonctionné. Réessayez ou écrivez à kontakt@immob24.de.',
    ar: 'لم ينجح الإرسال. حاولوا مجددًا أو راسلونا على kontakt@immob24.de.',
  },
  nextTitle: {
    de: 'So geht es weiter',
    en: 'What happens next',
    fr: 'La suite',
    ar: 'ما الذي يحدث بعد ذلك',
  },
  next1: {
    de: 'Antwort innerhalb eines Werktags — von einem Menschen.',
    en: 'A reply within one business day — from a human.',
    fr: 'Une réponse sous un jour ouvré — par un humain.',
    ar: 'رد خلال يوم عمل واحد — من إنسان.',
  },
  next2: {
    de: '30-Minuten-Walkthrough anhand Ihrer Objekte und Prozesse.',
    en: 'A 30-minute walkthrough built around your listings and processes.',
    fr: 'Un tour de 30 minutes basé sur vos biens et vos processus.',
    ar: 'جولة لمدة 30 دقيقة حول عقاراتكم وعملياتكم.',
  },
  next3: {
    de: 'Kein Druck, kein Spam — Ihre Daten bleiben in der EU.',
    en: 'No pressure, no spam — your data stays in the EU.',
    fr: 'Aucune pression, aucun spam — vos données restent dans l’UE.',
    ar: 'لا ضغط ولا رسائل مزعجة — تبقى بياناتكم داخل الاتحاد الأوروبي.',
  },
  directMail: {
    de: 'Lieber direkt schreiben?',
    en: 'Prefer to write directly?',
    fr: 'Vous préférez écrire directement ?',
    ar: 'تفضلون المراسلة مباشرة؟',
  },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const IntentIcon: Record<Intent, ComponentType<{ className?: string }>> = {
  demo: CalendarCheck2,
  beta: Rocket,
  question: MessageCircle,
};

export default function ContactPage() {
  const { t, language } = useLanguage();
  const L = (k: keyof typeof T) => T[k][language] ?? T[k].en;
  const [params] = useSearchParams();
  const initialIntent = useMemo<Intent>(() => {
    const q = params.get('intent');
    return q === 'beta' || q === 'question' ? q : 'demo';
  }, [params]);

  const [intent, setIntent] = useState<Intent>(initialIntent);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [size, setSize] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [emailError, setEmailError] = useState('');
  const [messageError, setMessageError] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useDocumentMeta({
    title: L('metaTitle'),
    description: L('metaDesc'),
    canonical: `${SITE_ORIGIN}${pathFor('contact', language)}`,
    alternates: [
      { hreflang: 'de', href: urlFor('contact', 'de') },
      { hreflang: 'en', href: urlFor('contact', 'en') },
      { hreflang: 'fr', href: urlFor('contact', 'fr') },
      { hreflang: 'ar', href: urlFor('contact', 'ar') },
      { hreflang: 'x-default', href: urlFor('contact', 'de') },
    ],
    htmlLang: language,
  });

  const validateEmail = (v: string) =>
    !v.trim() ? L('emailRequired') : !EMAIL_RE.test(v.trim()) ? L('emailInvalid') : '';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const eErr = validateEmail(email);
    const mErr = intent === 'question' && !message.trim() ? L('messageRequired') : '';
    setEmailError(eErr);
    setMessageError(mErr);
    if (eErr || mErr) return;

    setStatus('submitting');
    try {
      const body = new FormData();
      body.set('source', 'contact');
      body.set('intent', intent);
      body.set('name', name.trim());
      body.set('email', email.trim());
      body.set('size', size);
      body.set('message', message.trim());
      body.set('botcheck', website);
      await fetch(SHEET_ENDPOINT, { method: 'POST', mode: 'no-cors', body });
      setStatus('success');
      trackEvent('contact_submit', { intent, language });
    } catch {
      setStatus('error');
    }
  };

  const intentLabel: Record<Intent, string> = {
    demo: L('intentDemo'),
    beta: L('intentBeta'),
    question: L('intentQuestion'),
  };

  const inputCls =
    'mt-1.5 w-full rounded-lg border border-charcoal/15 bg-white px-3.5 py-2.5 text-sm text-charcoal outline-none transition-colors focus:border-charcoal/40';

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      {/* Hero */}
      <section className="relative pt-24 pb-10 md:pt-28 md:pb-14 overflow-hidden bg-gradient-to-b from-cream to-white">
        <div className="container relative text-center max-w-3xl mx-auto">
          <h1 className="chor mt-6 font-heading text-hero-mobile md:text-hero text-charcoal text-balance" style={chorSlot(0)}>
            <TypeOnce text={L('headline')} />
          </h1>
          <p className="chor mt-6 text-body-lg text-slate max-w-2xl mx-auto" style={chorSlot(280, 500)}>{L('sub')}</p>
        </div>
      </section>

      {/* Form + what happens next */}
      <section className="py-10 md:py-16 bg-white">
        <div className="container grid gap-10 lg:grid-cols-[minmax(0,1.4fr),minmax(260px,1fr)] max-w-5xl mx-auto">
          <div className="chor" style={chorSlot(420)}>
            <div className="no-fill rounded-2xl border border-charcoal/10 bg-cream p-6 md:p-8 shadow-subtle">
              {/* intent selector */}
              <div className="grid grid-cols-3 gap-2 rounded-xl bg-white p-1.5 border border-charcoal/10">
                {INTENTS.map((it) => {
                  const Icon = IntentIcon[it];
                  const active = intent === it;
                  return (
                    <button
                      key={it}
                      type="button"
                      aria-pressed={active}
                      onClick={() => {
                        setIntent(it);
                        setStatus('idle');
                      }}
                      className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 rounded-lg px-2 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 ${
                        active
                          ? 'bg-gradient-golden text-[#1E1B16] shadow-subtle'
                          : 'text-charcoal/60 hover:text-charcoal'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {intentLabel[it]}
                    </button>
                  );
                })}
              </div>

              {status === 'success' ? (
                <div className="py-10 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-honey-green/15 text-honey-green">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-xl text-charcoal">{L('successTitle')}</h3>
                  <p className="mt-2 text-sm text-slate">{L('successBody')}</p>
                  {intent === 'demo' && (
                    <>
                      <p className="mt-5 text-sm text-slate">{L('successDemo')}</p>
                      <a
                        href={DEMO_BOOKING_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-2 rounded-full bg-gradient-golden px-6 py-2.5 text-sm font-semibold text-[#1E1B16] shadow-golden"
                      >
                        {L('bookDirectCta')}
                        <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                      </a>
                    </>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="mt-6">
                  {/* honeypot */}
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

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="c-name" className="block text-sm font-medium text-charcoal">
                        {L('name')}
                      </label>
                      <input
                        id="c-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label htmlFor="c-email" className="block text-sm font-medium text-charcoal">
                        {L('email')} <span className="text-golden-dark">*</span>
                      </label>
                      <input
                        id="c-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (emailError) setEmailError(validateEmail(e.target.value));
                        }}
                        onBlur={() => setEmailError(validateEmail(email))}
                        aria-invalid={!!emailError}
                        className={inputCls}
                      />
                      {emailError && (
                        <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-500">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          {emailError}
                        </p>
                      )}
                    </div>
                  </div>

                  <label htmlFor="c-size" className="mt-4 block text-sm font-medium text-charcoal">
                    {L('size')}
                  </label>
                  <select
                    id="c-size"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className={inputCls}
                  >
                    <option value="">—</option>
                    <option value="solo">{L('sizeSolo')}</option>
                    <option value="2-5">{L('sizeSmall')}</option>
                    <option value="6-20">{L('sizeMid')}</option>
                    <option value="20+">{L('sizeLarge')}</option>
                  </select>

                  <label htmlFor="c-msg" className="mt-4 block text-sm font-medium text-charcoal">
                    {L('message')} {intent === 'question' && <span className="text-golden-dark">*</span>}
                  </label>
                  <textarea
                    id="c-msg"
                    rows={4}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (messageError) setMessageError('');
                    }}
                    placeholder={intent === 'question' ? L('messagePhQuestion') : L('messagePh')}
                    aria-invalid={!!messageError}
                    className={inputCls}
                  />
                  {messageError && (
                    <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-500">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      {messageError}
                    </p>
                  )}

                  {status === 'error' && (
                    <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-red-500">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      {L('errorBody')}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-golden px-6 py-3 text-sm font-semibold text-[#1E1B16] shadow-golden disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === 'submitting' ? L('submitting') : L('submit')}
                    <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </button>

                  {intent === 'demo' && (
                    <p className="mt-4 text-center text-xs text-warm-gray">
                      {L('bookDirect')}{' '}
                      <a
                        href={DEMO_BOOKING_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-golden-dark underline-offset-2 hover:underline"
                      >
                        {L('bookDirectCta')}
                      </a>
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>

          {/* what happens next */}
          <div className="chor" style={chorSlot(560)}>
            <div className="lg:pt-2">
              <h2 className="font-heading text-xl text-charcoal">{L('nextTitle')}</h2>
              <ul className="mt-5 space-y-4">
                {(['next1', 'next2', 'next3'] as const).map((k) => (
                  <li key={k} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 mt-0.5 flex-none text-honey-green" />
                    <span className="text-sm text-slate leading-relaxed">{L(k)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-2xl border border-charcoal/10 bg-cream p-5">
                <p className="text-sm font-medium text-charcoal">{L('directMail')}</p>
                <a
                  href="mailto:kontakt@immob24.de"
                  className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-golden-dark hover:text-charcoal transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  kontakt@immob24.de
                </a>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-warm-gray">
                <ShieldCheck className="h-4 w-4 text-teal" />
                DSGVO · EU-Hosting
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust content carried over from the former demo page (demoPage.* i18n) */}
      <WhatYouSee t={t} />
      <NotADemo t={t} />
      <DemoFaq t={t} />

      <Footer />
    </div>
  );
}

type TFn = (key: TranslationKey | string) => unknown;

const WhatYouSee = ({ t }: { t: TFn }) => {
  const bullets = asStringArray(t('demoPage.whatYouSee.bullets') as TVal);
  if (!bullets.length) return null;
  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="container">
        <Reveal className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('demoPage.whatYouSee.headline') as TVal)}
          </h2>
        </Reveal>
        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 max-w-4xl mx-auto">
          {bullets.map((b, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl bg-white border border-charcoal/10 px-5 py-4"
            >
              <CheckCircle2 className="h-5 w-5 text-golden-dark mt-0.5 flex-none" />
              <span className="text-charcoal/85">{b}</span>
            </div>
          ))}
        </RevealGroup>
        <p className="mt-10 text-center text-slate max-w-2xl mx-auto">
          {asString(t('demoPage.whatYouSee.support') as TVal)}
        </p>
      </div>
    </section>
  );
};

const NotADemo = ({ t }: { t: TFn }) => {
  const bullets = asStringArray(t('demoPage.notDemo.bullets') as TVal);
  if (!bullets.length) return null;
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container">
        <Reveal className="max-w-3xl mx-auto text-center">
          <ShieldCheck className="h-8 w-8 text-golden-dark mx-auto" />
          <h2 className="mt-4 font-heading text-section-mobile md:text-section text-charcoal text-balance">
            {asString(t('demoPage.notDemo.headline') as TVal)}
          </h2>
          <p className="mt-6 text-body-lg text-slate">
            {asString(t('demoPage.notDemo.body') as TVal)}
          </p>
        </Reveal>
        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 max-w-4xl mx-auto">
          {bullets.map((b, i) => (
            <div key={i} className="rounded-xl bg-cream border border-charcoal/10 p-5">
              <CheckCircle2 className="h-5 w-5 text-golden-dark" />
              <p className="mt-3 text-charcoal/85 leading-relaxed">{b}</p>
            </div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
};

const FaqItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-start justify-between gap-4 py-5 text-left"
      >
        <span className="font-medium text-charcoal pr-4">{q}</span>
        <span
          aria-hidden
          className={`flex-shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-full bg-charcoal/5 text-charcoal transition-transform duration-200 ${
            open ? 'rotate-45' : ''
          }`}
        >
          +
        </span>
      </button>
      <div className="acc-body" data-open={open}>
        <p className="pb-5 text-slate leading-relaxed">{a}</p>
      </div>
    </div>
  );
};

// Objections + demo FAQ merged into one accordion block.
const DemoFaq = ({ t }: { t: TFn }) => {
  const items = [
    ...asFaqArray(t('demoPage.objections.items') as TVal),
    ...asFaqArray(t('demoPage.faq.items') as TVal),
  ];
  if (!items.length) return null;
  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance text-center">
              {asString(t('demoPage.faq.headline') as TVal)}
            </h2>
          </Reveal>
          <div className="mt-10 rounded-2xl bg-white border border-charcoal/10 px-6">
            {items.map((it, i) => (
              <Reveal
                key={i}
                delay={cascadeDelay(i, 280)}
                distance={16}
                className="border-b border-charcoal/10 last:border-b-0"
              >
                <FaqItem q={it.q} a={it.a} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
