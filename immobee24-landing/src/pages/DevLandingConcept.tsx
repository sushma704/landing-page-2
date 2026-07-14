// Internal review route (/dev/landing-concept, noindex): ONE complete
// animated landing page composing all four HomeLead-style templates
// (T1 spotlight band, T2 card rail, T3 stat band, T4 stepper accordion)
// with the site's motion system — page-load choreography in the hero,
// LineReveal headings, scroll reveals between sections, theme-aware
// throughout. Copy is EN concept copy using only live-feature claims.

import { type CSSProperties } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { Header, Footer, DEMO_CTA_PROPS } from '../components/SiteChrome';
import { HeroWaves } from '../components/HeroWaves';
import { LineReveal, Reveal, TypeCycle } from '../lib/animations';
import {
  TemplateSpotlightList,
  TemplateCardRail,
  TemplateStatBand,
  TemplateStepperAccordion,
} from './DevMotionTemplates';

const TYPED_WORDS = ['faster first replies', 'qualified leads', 'booked viewings'];

const CHIPS = ['3s first reply', 'DSGVO by design, EU-hosted', 'DE · FR · EN · AR native'];

const SectionIntro = ({ title, body }: { title: string; body: string }) => (
  <div className="mx-auto max-w-3xl text-center">
    <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
      <LineReveal text={title} />
    </h2>
    <Reveal as="p" delay={150} className="mt-5 text-body-lg text-slate">
      {body}
    </Reveal>
  </div>
);

export default function DevLandingConcept() {
  useDocumentMeta({
    title: 'Landing concept — dev preview',
    robots: 'noindex, nofollow',
  });

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      {/* ── Hero: typewriter + entrance choreography, theme-aware ground ── */}
      <section className="relative flex min-h-[92vh] flex-col overflow-hidden bg-cream text-charcoal">
        <div
          aria-hidden
          className="glow-drift absolute -top-40 -left-40 h-[42rem] w-[42rem] rounded-full opacity-25 blur-3xl"
          style={{ background: 'radial-gradient(circle, #0C6F5F 0%, transparent 65%)' }}
        />
        <div
          aria-hidden
          className="glow-drift absolute -top-24 -right-48 h-[46rem] w-[46rem] rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #F5A623 0%, transparent 62%)', animationDelay: '-6s' }}
        />
        <HeroWaves />

        <div className="container relative flex flex-1 flex-col justify-center pb-14 pt-32 md:pt-36">
          <div className="mx-auto max-w-3xl text-center">
            <h1
              className="font-heading text-hero-mobile md:text-hero text-charcoal text-balance"
              aria-label={`The AI operating system for ${TYPED_WORDS[0]}`}
            >
              <span className="chor block" style={{ '--chor-delay': '0ms', '--chor-dur': '700ms' } as CSSProperties}>
                The AI operating system for
              </span>
              <span
                className="chor block text-golden-dark dark:text-golden"
                style={{ '--chor-delay': '180ms', '--chor-dur': '700ms' } as CSSProperties}
              >
                <TypeCycle words={TYPED_WORDS} />
              </span>
            </h1>

            <p
              className="chor mx-auto mt-6 max-w-2xl text-body-lg text-slate"
              style={{ '--chor-delay': '380ms', '--chor-dur': '600ms' } as CSSProperties}
            >
              Immob24 answers new property inquiries in seconds, qualifies leads automatically and keeps
              follow-ups running — without replacing your existing CRM.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                {...DEMO_CTA_PROPS}
                className="chor inline-flex items-center gap-2 rounded-full bg-gradient-golden px-7 py-3.5 font-semibold text-[#1E1B16] shadow-golden transition-transform hover:scale-[1.03]"
                style={{ '--chor-delay': '550ms', '--chor-dur': '500ms' } as CSSProperties}
              >
                Request demo
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="#how"
                className="chor inline-flex items-center gap-2 rounded-full border border-charcoal/25 px-7 py-3.5 font-medium text-charcoal transition-colors hover:bg-charcoal/10"
                style={{ '--chor-delay': '680ms', '--chor-dur': '500ms' } as CSSProperties}
              >
                See how it works
              </a>
            </div>

            <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
              {CHIPS.map((c, i) => (
                <li
                  key={c}
                  className="chor flex items-center gap-2 text-sm text-slate"
                  style={{ '--chor-delay': `${780 + i * 70}ms`, '--chor-dur': '500ms' } as CSSProperties}
                >
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-honey-green" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* hero visual = T1 spotlight band, entering as the hero's "product moment" */}
          <div
            className="chor-scale mx-auto mt-14 w-full max-w-5xl"
            style={{ '--chor-delay': '850ms', '--chor-dur': '900ms' } as CSSProperties}
          >
            <TemplateSpotlightList />
          </div>
        </div>
      </section>

      {/* ── T2: the product tour rail ── */}
      <section className="py-20 md:py-28">
        <div className="container max-w-6xl">
          <SectionIntro
            title="Everything your office needs — in one place"
            body="Real screens from the product, not mockups. The rail advances on its own; hover to pause, or step through with the arrows."
          />
          <Reveal delay={100} className="mt-12">
            <TemplateCardRail />
          </Reveal>
        </div>
      </section>

      {/* ── T3: proof numbers ── */}
      <section className="py-4 md:py-8">
        <div className="container max-w-6xl">
          <Reveal>
            <TemplateStatBand />
          </Reveal>
        </div>
      </section>

      {/* ── T4: how it works ── */}
      <section id="how" className="py-20 md:py-28">
        <div className="container max-w-6xl">
          <SectionIntro
            title="From inquiry to viewing — in four steps"
            body="Open a step to see the screen where it happens. Nothing reaches a prospect without your approval."
          />
          <Reveal delay={100} className="mt-12">
            <TemplateStepperAccordion />
          </Reveal>
        </div>
      </section>

      {/* ── closing CTA band ── */}
      <section className="py-20 md:py-24">
        <div className="container max-w-4xl">
          <Reveal className="band-dark rounded-3xl bg-charcoal px-8 py-12 text-center md:px-16">
            <h2 className="font-heading text-2xl md:text-3xl text-white text-balance">
              See in 30 minutes how Immob24 fits your brokerage
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/70">
              A live walk-through on your own scenarios — no setup, no obligation.
            </p>
            <button
              type="button"
              {...DEMO_CTA_PROPS}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-golden px-8 py-4 font-semibold text-[#1E1B16] shadow-golden transition-transform hover:scale-[1.03]"
            >
              Request demo
              <ArrowRight className="h-4 w-4" />
            </button>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
