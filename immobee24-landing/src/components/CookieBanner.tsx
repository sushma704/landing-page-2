import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../i18n';
import {
  hasDecided,
  readConsent,
  saveConsent,
  type ConsentCategories,
} from '../lib/consent';

const s = (v: unknown): string => (typeof v === 'string' ? v : '');

// Other components (e.g. Footer "Cookie Settings") open the settings panel by
// dispatching this event. We use a CustomEvent rather than a context so the
// trigger can sit anywhere in the tree without prop-drilling.
const OPEN_EVENT = 'immob24:open-cookie-settings';

export function openCookieSettings(): void {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

type View = 'hidden' | 'banner' | 'settings';

export const CookieBanner = () => {
  const { t } = useLanguage();
  const tr = (key: string) => s(t(`cookieConsent.${key}`));

  const [view, setView] = useState<View>('hidden');
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [chat, setChat] = useState(false);
  const [identification, setIdentification] = useState(false);

  // First-visit gate: show the banner only if no prior decision exists.
  // SSR safety: localStorage access deferred to a post-mount effect.
  useEffect(() => {
    const stored = readConsent();
    if (stored) {
      setAnalytics(stored.analytics);
      setMarketing(stored.marketing);
      setChat(stored.chat);
      setIdentification(stored.identification);
    }
    if (!hasDecided()) setView('banner');
  }, []);

  // External opener (Footer link, etc.) jumps straight to the settings panel,
  // pre-filled with the current stored choice so toggles reflect reality.
  useEffect(() => {
    const onOpen = () => {
      const stored = readConsent();
      setAnalytics(stored?.analytics ?? false);
      setMarketing(stored?.marketing ?? false);
      setChat(stored?.chat ?? false);
      setIdentification(stored?.identification ?? false);
      setView('settings');
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  // Lock body scroll while the settings modal is open + close on Escape.
  // The banner itself does NOT trap focus or lock scroll — visitors must be
  // able to keep reading the site to make an informed choice.
  useEffect(() => {
    if (view !== 'settings') return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setView(hasDecided() ? 'hidden' : 'banner');
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [view]);

  const apply = (cats: ConsentCategories) => {
    saveConsent(cats);
    setAnalytics(cats.analytics);
    setMarketing(cats.marketing);
    setChat(cats.chat);
    setIdentification(cats.identification);
    setView('hidden');
  };

  const acceptAll = () =>
    apply({ analytics: true, marketing: true, chat: true, identification: true });
  const rejectAll = () =>
    apply({ analytics: false, marketing: false, chat: false, identification: false });
  const saveSelection = () => apply({ analytics, marketing, chat, identification });

  if (view === 'hidden') return null;

  return (
    <>
      {view === 'banner' && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label={tr('bannerTitle')}
          className="fixed inset-x-0 bottom-0 z-[150] band-dark bg-charcoal text-white shadow-card-hover"
        >
          <div className="container py-5 flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
            <div className="flex-1">
              <p className="font-heading text-base font-semibold">{tr('bannerTitle')}</p>
              <p className="mt-1 text-sm text-white/75 leading-relaxed">{tr('bannerBody')}</p>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-2 md:w-auto md:min-w-[260px] md:justify-end">
              <button
                type="button"
                onClick={rejectAll}
                className="rounded-full bg-white/10 text-white text-sm font-medium px-4 py-2 hover:bg-white/20 transition-colors"
              >
                {tr('rejectAll')}
              </button>
              <button
                type="button"
                onClick={() => setView('settings')}
                className="rounded-full bg-white/10 text-white text-sm font-medium px-4 py-2 hover:bg-white/20 transition-colors"
              >
                {tr('manage')}
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="rounded-full bg-golden text-charcoal text-sm font-semibold px-4 py-2 hover:bg-golden/90 transition-colors"
              >
                {tr('acceptAll')}
              </button>
            </div>
          </div>
        </div>
      )}

      {view === 'settings' && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
            onClick={() => setView(hasDecided() ? 'hidden' : 'banner')}
            aria-hidden
          />
          <div className="relative bg-white rounded-2xl shadow-card-hover max-w-2xl w-full max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 z-10 flex items-center justify-between bg-white border-b border-charcoal/5 px-6 py-4">
              <h3 className="font-heading text-xl text-charcoal">{tr('settingsTitle')}</h3>
              <button
                type="button"
                onClick={() => setView(hasDecided() ? 'hidden' : 'banner')}
                aria-label={tr('close')}
                className="p-1 text-charcoal/60 hover:text-charcoal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-5 text-sm text-slate leading-relaxed">
              <p>{tr('settingsIntro')}</p>

              <CategoryRow
                name={tr('categoryEssentialName')}
                description={tr('categoryEssentialDesc')}
                value={true}
                disabled
                onChange={() => {}}
                onLabel={tr('alwaysOn')}
                offLabel={tr('off')}
              />
              <CategoryRow
                name={tr('categoryAnalyticsName')}
                description={tr('categoryAnalyticsDesc')}
                value={analytics}
                onChange={setAnalytics}
                onLabel={tr('on')}
                offLabel={tr('off')}
              />
              <CategoryRow
                name={tr('categoryMarketingName')}
                description={tr('categoryMarketingDesc')}
                value={marketing}
                onChange={setMarketing}
                onLabel={tr('on')}
                offLabel={tr('off')}
              />
              <CategoryRow
                name={tr('categoryChatName')}
                description={tr('categoryChatDesc')}
                value={chat}
                onChange={setChat}
                onLabel={tr('on')}
                offLabel={tr('off')}
              />
              <CategoryRow
                name={tr('categoryIdentificationName')}
                description={tr('categoryIdentificationDesc')}
                value={identification}
                onChange={setIdentification}
                onLabel={tr('on')}
                offLabel={tr('off')}
              />
            </div>

            <div className="sticky bottom-0 bg-white border-t border-charcoal/5 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2">
              <button
                type="button"
                onClick={rejectAll}
                className="rounded-full bg-charcoal/5 text-charcoal text-sm font-medium px-4 py-2 hover:bg-charcoal/10 transition-colors"
              >
                {tr('rejectAll')}
              </button>
              <button
                type="button"
                onClick={saveSelection}
                className="rounded-full bg-charcoal/10 text-charcoal text-sm font-medium px-4 py-2 hover:bg-charcoal/15 transition-colors"
              >
                {tr('save')}
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="rounded-full bg-golden text-charcoal text-sm font-semibold px-4 py-2 hover:bg-golden/90 transition-colors"
              >
                {tr('acceptAll')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

type CategoryRowProps = {
  name: string;
  description: string;
  value: boolean;
  onChange: (next: boolean) => void;
  onLabel: string;
  offLabel: string;
  disabled?: boolean;
};

const CategoryRow = ({
  name,
  description,
  value,
  onChange,
  onLabel,
  offLabel,
  disabled = false,
}: CategoryRowProps) => (
  <div className="flex items-start justify-between gap-4 border-t border-charcoal/5 pt-4 first:border-t-0 first:pt-0">
    <div className="flex-1">
      <p className="font-semibold text-charcoal">{name}</p>
      <p className="mt-1 text-xs leading-relaxed text-warm-gray">{description}</p>
    </div>
    <button
      type="button"
      role="switch"
      aria-checked={value}
      aria-label={name}
      disabled={disabled}
      onClick={() => !disabled && onChange(!value)}
      className={`relative shrink-0 inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        value ? 'bg-golden' : 'bg-charcoal/20'
      } ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span className="sr-only">{value ? onLabel : offLabel}</span>
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
          value ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  </div>
);
