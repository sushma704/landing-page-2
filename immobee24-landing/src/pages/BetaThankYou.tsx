import { useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components/SiteChrome';
import { trackEvent } from '../lib/analytics';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { useLanguage } from '../i18n';
import { pathFor, SITE_ORIGIN } from '../i18n/pages';

// Thank-you page rendered after a successful Tally beta application.
// Tally is configured to redirect submitters here after their submission
// completes. On mount we fire the Meta Pixel `Lead` event so Meta Ads can
// record the conversion — gated by the visitor's prior marketing consent
// (if they declined, fbq isn't loaded and the call is silently skipped,
// which is the correct GDPR-compliant behaviour).
export default function BetaThankYou() {
  const { language } = useLanguage();
  const isDe = language === 'de';

  // Note: noindex is already set site-wide in index.html during the
  // pre-launch lockdown. Once the lockdown lifts, this page should stay
  // noindex (it's a post-conversion landing, not search-discoverable),
  // but that's handled by leaving it out of sitemap.xml — Google won't
  // try to index a URL it never sees in the sitemap.
  useDocumentMeta({
    title: isDe
      ? 'Danke für deine Bewerbung — Immob24'
      : 'Thanks for your application — Immob24',
    description: isDe
      ? 'Wir haben deine Bewerbung für das Beta-Agentenprogramm erhalten und melden uns innerhalb von 48 Stunden bei dir.'
      : 'We received your application for the Beta Agent Program and will be in touch within 48 hours.',
    canonical: `${SITE_ORIGIN}${isDe ? '/de/beta-bewerbung-erfolgreich' : '/en/beta-application-success'}`,
    htmlLang: language,
  });

  useEffect(() => {
    const w = window as unknown as { fbq?: (...args: unknown[]) => void };
    if (w.fbq) {
      // Marketing consent was granted earlier in the visit (otherwise fbq
      // wouldn't be on window). Fire the Lead event Meta Ads optimises on.
      w.fbq('track', 'Lead', {
        content_name: 'Beta Agent Program',
        content_category: 'beta_application',
      });
    }
    // Internal analytics tag (GA-side, also consent-gated upstream).
    trackEvent('beta_application_thank_you_view');
  }, []);

  const homeHref = pathFor('home', language);
  const betaHref = pathFor('beta', language);

  return (
    <div className="min-h-screen antialiased bg-white flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <section className="container py-24 md:py-32">
          <div className="max-w-2xl mx-auto text-center">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-honey-green/10 text-honey-green">
              <CheckCircle2 className="h-9 w-9" strokeWidth={2.5} />
            </span>

            <h1 className="mt-8 font-heading text-hero-mobile md:text-hero text-charcoal text-balance">
              {isDe
                ? 'Danke für deine Bewerbung!'
                : 'Thanks for your application!'}
            </h1>

            <p className="mt-6 text-body-lg text-slate max-w-xl mx-auto">
              {isDe
                ? 'Wir haben deine Bewerbung für das Beta-Agentenprogramm erhalten. Das Gründerteam meldet sich innerhalb von 48 Stunden persönlich bei dir, um die nächsten Schritte zu besprechen.'
                : 'We have received your application for the Beta Agent Program. The founding team will personally reach out within 48 hours to walk you through the next steps.'}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to={homeHref}
                className="inline-flex items-center gap-2 rounded-full bg-charcoal text-white px-6 py-3 font-medium hover:bg-charcoal/90 transition-colors"
              >
                {isDe ? 'Zur Startseite' : 'Back to home'}
              </Link>
              <Link
                to={betaHref}
                className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 bg-white px-6 py-3 font-medium text-charcoal hover:border-charcoal/40 transition-colors"
              >
                {isDe ? 'Programm-Details ansehen' : 'See program details'}
              </Link>
            </div>

            <p className="mt-12 text-sm text-warm-gray">
              {isDe ? (
                <>
                  Fragen?{' '}
                  <a href="mailto:kontakt@immob24.de" className="underline hover:text-charcoal">
                    kontakt@immob24.de
                  </a>
                </>
              ) : (
                <>
                  Questions?{' '}
                  <a href="mailto:kontakt@immob24.de" className="underline hover:text-charcoal">
                    kontakt@immob24.de
                  </a>
                </>
              )}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
