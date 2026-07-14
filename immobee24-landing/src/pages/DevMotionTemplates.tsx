// Internal review route (/dev/motion-templates, noindex): four animation
// templates modelled on the homelead.in/builders reference video, rebuilt
// with immob24 tokens so the PO can pick which to adopt. Each template is
// self-contained; all auto-motion pauses on hover and disables under
// prefers-reduced-motion (static, fully-visible fallback).

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { CountUp, usePrefersReducedMotion } from '../lib/animations';

const SCREENS = {
  dashboard: '/screens/dashboard.webp',
  leads: '/screens/leads.webp',
  messages: '/screens/messages.webp',
  properties: '/screens/properties.webp',
  analytics: '/screens/analytics.webp',
  campaigns: '/screens/campaigns.webp',
  portfolio: '/screens/portfolio.webp',
  aiControl: '/screens/ai-control.webp',
};

// ─────────────────────────────────────────────────────────────────────────────
// Template 1 — Sequenced spotlight list (the two-tone "Connect, Manage,
// Funnel-Drive" band): left items highlight in order, the media panel
// crossfades to the matching screen.
// ─────────────────────────────────────────────────────────────────────────────
const SPOTLIGHT_ITEMS = [
  { label: 'Track every lead, never miss a follow-up', img: SCREENS.leads },
  { label: 'Answer every inquiry in seconds', img: SCREENS.messages },
  { label: 'Full property & portfolio control', img: SCREENS.properties },
  { label: 'Campaigns that fill the pipeline', img: SCREENS.campaigns },
  { label: 'Clear reports & insights anytime', img: SCREENS.analytics },
];

const TemplateSpotlightList = () => {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    if (reduced || hover) return;
    const id = window.setInterval(() => setActive((v) => (v + 1) % SPOTLIGHT_ITEMS.length), 2600);
    return () => window.clearInterval(id);
  }, [reduced, hover]);

  return (
    <div
      className="band-dark overflow-hidden rounded-3xl bg-gradient-to-br from-[#0C6F5F] to-[#17140F]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="p-8 pb-0 md:p-10 md:pb-0">
        <h3 className="font-heading text-2xl md:text-3xl text-white text-balance">
          Connect, manage and convert your leads — every time
        </h3>
      </div>
      <div className="mt-6 grid md:grid-cols-[1fr_1.2fr]">
        <ul className="flex flex-col justify-end pb-8 md:pb-10">
          {SPOTLIGHT_ITEMS.map((it, i) => (
            <li key={it.label}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                className={`w-full text-start px-8 md:px-10 py-3.5 text-sm md:text-base font-medium transition-all duration-500 ${
                  active === i
                    ? 'bg-white/10 text-white translate-x-1.5 border-s-2 border-golden'
                    : 'text-white/65 hover:text-white border-s-2 border-transparent'
                }`}
              >
                {it.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="relative min-h-[16rem] md:min-h-[20rem] bg-white">
          {SPOTLIGHT_ITEMS.map((it, i) => (
            <img
              key={it.img}
              src={it.img}
              alt=""
              loading="lazy"
              className={`absolute inset-0 h-full w-full object-cover object-left-top transition-opacity duration-700 ${
                active === i ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Template 2 — Auto-advancing card carousel ("Everything you need" rail):
// cards step one position on a timer; arrows and drag-free paging; pauses
// on hover; wraps around.
// ─────────────────────────────────────────────────────────────────────────────
const RAIL_CARDS = [
  { title: 'One dashboard for the whole office', body: 'Pipeline, tasks and today’s viewings in a single morning view.', img: SCREENS.dashboard },
  { title: 'Leads qualify themselves', body: 'Budget, timeframe and financing captured in the first conversation.', img: SCREENS.leads },
  { title: 'Every channel in one inbox', body: 'Portal emails, web forms and chat land in one queue with context.', img: SCREENS.messages },
  { title: 'Properties under control', body: 'Listings, exposés and documents organised per property.', img: SCREENS.properties },
  { title: 'Campaigns that report back', body: 'Meta Ads results tracked next to the leads they created.', img: SCREENS.campaigns },
  { title: 'Decisions on real numbers', body: 'Response times, conversion and pipeline value at a glance.', img: SCREENS.analytics },
];

const TemplateCardRail = () => {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);
  const perView = 3; // md+; CSS narrows card width on small screens
  const maxIndex = RAIL_CARDS.length - 1;
  const step = (d: number) => setIndex((v) => (v + d + RAIL_CARDS.length) % RAIL_CARDS.length);

  useEffect(() => {
    if (reduced || hover) return;
    const id = window.setInterval(() => step(1), 3000);
    return () => window.clearInterval(id);
  }, [reduced, hover]);

  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className="overflow-hidden">
        <div
          className="flex gap-5 transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            transform: `translateX(calc(${document.dir === 'rtl' ? '' : '-'}${index} * (100% / ${perView} + 0.833rem)))`,
            transitionDuration: '600ms',
          }}
        >
          {[...RAIL_CARDS, ...RAIL_CARDS.slice(0, perView)].map((c, i) => (
            <article
              key={`${c.title}-${i}`}
              className="no-fill w-[78%] sm:w-[46%] md:w-[calc(100%/3-0.833rem)] flex-shrink-0 overflow-hidden rounded-2xl border border-charcoal/10 bg-white shadow-subtle transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-card-hover"
            >
              <img src={c.img} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover object-left-top" />
              <div className="p-5">
                <h4 className="font-heading text-lg text-charcoal">{c.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-slate">{c.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="flex gap-1.5">
          {RAIL_CARDS.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Card ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index % RAIL_CARDS.length ? 'w-6 bg-golden' : 'w-1.5 bg-charcoal/20 hover:bg-charcoal/40'
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => step(-1)}
            disabled={index === 0 && false}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-charcoal/15 text-charcoal transition-colors hover:border-golden hover:text-golden-dark"
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => step(1)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-charcoal/15 text-charcoal transition-colors hover:border-golden hover:text-golden-dark"
          >
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </button>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">{RAIL_CARDS[index % RAIL_CARDS.length].title}</p>
      <span className="mt-2 block text-xs text-warm-gray">{maxIndex + 1} cards · auto-advances · pauses on hover</span>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Template 3 — Stat band with counting numbers + growing chart. Replays the
// draw when scrolled into view (once). Reduced motion: final state.
// ─────────────────────────────────────────────────────────────────────────────
const STATS = [
  { value: '3s', label: 'First reply to a new inquiry' },
  { value: '90', suffix: '%', label: 'Inquiries answered same-hour' },
  { value: '24/7', label: 'AI assistant availability' },
  { value: '5', suffix: 'h', label: 'Admin time saved per week' },
];

const TemplateStatBand = () => {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setOn(true), io.disconnect()),
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const drawn = on || reduced;

  return (
    <div
      ref={ref}
      className="band-dark grid gap-8 overflow-hidden rounded-3xl bg-gradient-to-br from-[#17140F] via-[#1E2B26] to-[#0C6F5F] p-8 md:grid-cols-[1.1fr_1fr] md:p-10"
    >
      <div>
        <h3 className="font-heading text-2xl md:text-3xl text-white text-balance">
          A complete AI layer over your brokerage
        </h3>
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8">
          {STATS.map((s, i) => (
            <div key={s.label}>
              <div className="font-metric text-3xl font-bold text-golden">
                {/^\d+$/.test(s.value) ? <CountUp value={s.value} delay={i * 150} /> : s.value}
                {s.suffix}
              </div>
              <p className="mt-1 text-sm text-white/70">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-end">
        <svg viewBox="0 0 320 180" className="w-full" aria-hidden>
          {/* bars grow from the baseline; the line draws across */}
          {[38, 62, 50, 84, 72, 110, 96, 132].map((h, i) => (
            <rect
              key={i}
              x={16 + i * 38}
              width="22"
              rx="4"
              y={168 - (drawn ? h : 4)}
              height={drawn ? h : 4}
              className="fill-golden/70"
              style={{ transition: `y 900ms cubic-bezier(0.22,1,0.36,1) ${i * 90}ms, height 900ms cubic-bezier(0.22,1,0.36,1) ${i * 90}ms` }}
            />
          ))}
          <path
            d="M16 150 C 70 140, 90 118, 130 112 S 210 84, 250 62 S 296 40, 306 34"
            fill="none"
            stroke="#3FBBA6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="340"
            strokeDashoffset={drawn ? 0 : 340}
            style={{ transition: 'stroke-dashoffset 1400ms cubic-bezier(0.22,1,0.36,1) 300ms' }}
          />
        </svg>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Template 4 — Stepper accordion with media swap: opening a row expands its
// body (height animates via grid rows) and crossfades the screen alongside.
// ─────────────────────────────────────────────────────────────────────────────
const STEPS = [
  { q: 'Lead arrives from any channel', a: 'Portal email, website form or chat — captured with full context, deduplicated against existing contacts.', img: SCREENS.messages },
  { q: 'Bee answers and qualifies', a: 'First reply in seconds; budget, timeframe and financing collected conversationally.', img: SCREENS.leads },
  { q: 'You approve the next step', a: 'Viewing proposals wait in the approval queue — nothing goes out without your sign-off.', img: SCREENS.aiControl },
  { q: 'The pipeline stays honest', a: 'Every touch is logged; reports show response times and conversion without manual bookkeeping.', img: SCREENS.analytics },
];

const TemplateStepperAccordion = () => {
  const [open, setOpen] = useState(0);
  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      <div className="rounded-2xl border border-charcoal/10 bg-white shadow-subtle">
        {STEPS.map((s, i) => (
          <div key={s.q} className={i < STEPS.length - 1 ? 'border-b border-charcoal/10' : ''}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-expanded={open === i}
              className="flex w-full items-center gap-3 px-5 py-4 text-start"
            >
              <span
                className={`inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full font-metric text-xs font-bold transition-colors duration-300 ${
                  open === i ? 'bg-gradient-golden text-[#1E1B16]' : 'bg-muted text-warm-gray'
                }`}
              >
                {i + 1}
              </span>
              <span className={`font-medium transition-colors ${open === i ? 'text-charcoal' : 'text-slate'}`}>{s.q}</span>
              <ChevronDown
                className={`ms-auto h-4 w-4 text-warm-gray transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`}
              />
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ gridTemplateRows: open === i ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-4 ps-[3.75rem] text-sm leading-relaxed text-slate">{s.a}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-charcoal/10 bg-white shadow-card">
        {STEPS.map((s, i) => (
          <img
            key={s.img + i}
            src={s.img}
            alt=""
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-cover object-left-top transition-opacity duration-600 ${
              open === i ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDuration: '600ms' }}
          />
        ))}
        <span className="absolute bottom-3 start-3 rounded-full bg-[#1E1B16]/80 px-3 py-1 text-xs font-medium text-[#FBF9F4]">
          Step {open + 1} · {STEPS[open].q}
        </span>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────

const TEMPLATES = [
  {
    id: 'T1',
    name: 'Sequenced spotlight list',
    where: 'Reference: the green "Connect, Manage, Funnel-Drive" band',
    fit: 'Home (replacing or augmenting the CRM differentiation band) or Solutions',
    C: TemplateSpotlightList,
  },
  {
    id: 'T2',
    name: 'Auto-advancing card rail',
    where: 'Reference: "Everything You Need — In One CRM" carousel',
    fit: 'Product or AI-Agents page — the 8 real dashboard screens as a rail',
    C: TemplateCardRail,
  },
  {
    id: 'T3',
    name: 'Stat band with growing chart',
    where: 'Reference: the leads/open-rate/conversions numbers band',
    fit: 'Home (above the pricing teaser) or Why-immob24',
    C: TemplateStatBand,
  },
  {
    id: 'T4',
    name: 'Stepper accordion with media swap',
    where: 'Reference: FAQ expand + the step list, combined',
    fit: 'Product #how-it-works or Solutions by-scenario',
    C: TemplateStepperAccordion,
  },
];

export default function DevMotionTemplates() {
  useDocumentMeta({
    title: 'Motion templates — dev preview',
    robots: 'noindex, nofollow',
  });

  return (
    <div className="min-h-screen bg-cream py-16">
      <div className="container max-w-6xl">
        <h1 className="font-heading text-3xl text-charcoal">Motion templates — pick one (or more)</h1>
        <p className="mt-2 max-w-3xl text-slate">
          Four animation patterns rebuilt from the homelead.in reference video with immob24 tokens and
          real dashboard screens. All auto-motion pauses on hover and switches off under reduced motion.
          Tell me the template numbers you want and where, and I&apos;ll wire them into the real pages.
        </p>

        <div className="mt-12 space-y-16">
          {TEMPLATES.map(({ id, name, where, fit, C }) => (
            <section key={id}>
              <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="rounded-full bg-gradient-golden px-2.5 py-0.5 font-metric text-xs font-bold text-[#1E1B16]">
                  {id}
                </span>
                <h2 className="font-heading text-xl text-charcoal">{name}</h2>
              </div>
              <p className="mb-1 text-xs text-warm-gray">{where}</p>
              <p className="mb-5 flex items-center gap-1.5 text-xs text-slate">
                <CheckCircle2 className="h-3.5 w-3.5 text-honey-green" /> Suggested placement: {fit}
              </p>
              <C />
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
