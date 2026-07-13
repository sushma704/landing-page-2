// Additive content bands for the draft/ai-refinement pass. These are inserted
// into existing pages (Home, Product, CRM-Alternative, Pricing) WITHOUT
// altering any existing section, form, CTA wiring or chatbot behaviour.
// Sources: pitch deck slides 3/5/6 + the demo-video content script.

import {
  ArrowRight,
  Bot,
  FileCheck2,
  Landmark,
  PlayCircle,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n';
import { Marquee, Reveal, RevealGroup } from '../lib/animations';
import type { Language } from '../i18n';
import { pathFor } from '../i18n/pages';

const COWORKERS: Array<Record<Language, string>> = [
  { de: 'Lead-Responder', en: 'Lead Responder', fr: 'Lead Responder', ar: 'Lead Responder' },
  { de: 'Conversation-Agent', en: 'Conversation Agent', fr: 'Conversation Agent', ar: 'Conversation Agent' },
  { de: 'Viewing-Booker', en: 'Viewing Booker', fr: 'Viewing Booker', ar: 'Viewing Booker' },
  { de: 'Listing-Creator', en: 'Listing Creator', fr: 'Listing Creator', ar: 'Listing Creator' },
  { de: 'Deal-Monitor', en: 'Deal Monitor', fr: 'Deal Monitor', ar: 'Deal Monitor' },
  { de: 'Daily-Brief-Agent', en: 'Daily Brief Agent', fr: 'Daily Brief Agent', ar: 'Daily Brief Agent' },
  { de: 'Compliance-Guard', en: 'Compliance Guard', fr: 'Compliance Guard', ar: 'Compliance Guard' },
];

// Home: "7 AI co-workers" band + video teaser linking to the AI features page.
export const SevenCoWorkersBand = () => {
  const { language } = useLanguage();
  const L = <T,>(v: Record<Language, T>): T => v[language] ?? v.en;
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <Reveal as="span" className="inline-block">
            <span className="inline-flex items-center gap-2 rounded-full border border-golden/30 bg-cream px-4 py-1.5 text-xs font-medium text-golden-dark shadow-subtle">
              <Bot className="h-3.5 w-3.5" />
              {L({
                de: 'Neu: Die KI-Plattform im Detail',
                en: 'New: the AI platform in detail',
                fr: 'Nouveau : la plateforme IA en détail',
                ar: 'جديد: منصة الذكاء الاصطناعي بالتفصيل',
              })}
            </span>
            </Reveal>
            <Reveal delay={80} as="h2" className="mt-5 font-heading text-section-mobile md:text-section text-charcoal">
              {L({
                de: 'Jeder Makler bekommt 7 KI-Co-Worker',
                en: 'Every agent gets 7 AI co-workers',
                fr: 'Chaque agent immobilier dispose de 7 co-workers IA',
                ar: 'كل وكيل عقاري يحصل على 7 مساعدين بالذكاء الاصطناعي',
              })}
            </Reveal>
            <Reveal delay={150} as="p" className="mt-4 text-slate max-w-xl">
              {L({
                de: 'Sieben spezialisierte KI-Agenten übernehmen die operative Arbeit — vom Lead bis zum Abschluss. Volle Sichtbarkeit und Freigabe bei jeder Aktion.',
                en: 'Seven specialised AI agents handle the operational load — from lead to close. Full visibility and approval on every action.',
                fr: 'Sept agents IA spécialisés prennent en charge le travail opérationnel — du lead à la signature. Visibilité totale et validation à chaque action.',
                ar: 'سبعة وكلاء ذكاء اصطناعي متخصصين يتولّون العمل التشغيلي — من العميل المحتمل حتى إتمام الصفقة. رؤية كاملة وموافقة على كل إجراء.',
              })}
            </Reveal>
            {/* Spec step 6: infinite chip marquee (pause on hover; static
                wrapped row under reduced motion). */}
            <Marquee className="mt-6" durationS={30}>
              {COWORKERS.map((c) => (
                <span
                  key={c.en}
                  className="whitespace-nowrap rounded-full bg-cream border border-charcoal/10 px-3 py-1 text-xs text-charcoal"
                >
                  {L(c)}
                </span>
              ))}
            </Marquee>
            <Reveal delay={200}>
            <Link
              to={pathFor('aiFeatures', language)}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-golden px-5 py-2.5 text-sm font-semibold text-[#1E1B16] shadow-golden"
            >
              {L({
                de: 'Alle KI-Funktionen ansehen',
                en: 'Explore all AI features',
                fr: 'Découvrir toutes les fonctions IA',
                ar: 'استكشفوا جميع وظائف الذكاء الاصطناعي',
              })}
              <ArrowRight className="h-4 w-4" />
            </Link>
            </Reveal>
          </div>

          {/* large visual: scale-reveal (Part C.3); Reveal is the grid child */}
          <Reveal direction="scale">
          <Link
            to={pathFor('aiFeatures', language)}
            className="group relative block rounded-2xl overflow-hidden shadow-card"
            aria-label={L({
              de: 'Produkt-Demo ansehen',
              en: 'Watch the product demo',
              fr: 'Voir la démo produit',
              ar: 'مشاهدة العرض التوضيحي للمنتج',
            })}
          >
            <img
              src="/videos/demo-poster.jpg"
              alt={L({
                de: 'Immob24 Produkt-Demo',
                en: 'immob24 product demo',
                fr: 'Démo du produit Immob24',
                ar: 'عرض توضيحي لمنتج Immob24',
              })}
              width={1280}
              height={720}
              className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              loading="lazy"
            />
            <span className="absolute inset-0 bg-charcoal/25 group-hover:bg-charcoal/15 transition-colors" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-golden shadow-golden transition-transform group-hover:scale-105">
                <PlayCircle className="h-8 w-8 text-white" />
              </span>
            </span>
            <span className="absolute bottom-3 left-3 rounded-full bg-charcoal/80 px-3 py-1 text-xs font-medium text-white">
              10:15 ·{' '}
              {L({
                de: 'Der Workflow live',
                en: 'Watch the workflow live',
                fr: 'Le workflow en direct',
                ar: 'سير العمل مباشرةً',
              })}
            </span>
          </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

// Compact trust strip: GDPR / EU AI Act / human oversight — links to /compliance.
export const ComplianceBadgesStrip = () => {
  const { language } = useLanguage();
  const L = <T,>(v: Record<Language, T>): T => v[language] ?? v.en;
  const items: Array<{ icon: typeof ShieldCheck; label: Record<Language, string> }> = [
    {
      icon: ShieldCheck,
      label: {
        de: 'DSGVO by Design',
        en: 'GDPR by design',
        fr: 'RGPD dès la conception',
        ar: 'متوافق مع GDPR بحكم التصميم',
      },
    },
    {
      icon: Landmark,
      label: {
        de: 'EU AI Act ready',
        en: 'EU AI Act ready',
        fr: 'Prêt pour l’EU AI Act',
        ar: 'جاهز لـ EU AI Act',
      },
    },
    {
      icon: UserCheck,
      label: {
        de: 'Mensch behält Kontrolle',
        en: 'Human stays in control',
        fr: 'L’humain garde le contrôle',
        ar: 'الإنسان يحتفظ بزمام السيطرة',
      },
    },
    {
      icon: FileCheck2,
      label: {
        de: 'Audit-Trail eingebaut',
        en: 'Audit trail built in',
        fr: 'Piste d’audit intégrée',
        ar: 'سجل تدقيق مدمج',
      },
    },
  ];
  return (
    // Trust strip: stays on the dark ground (no inverted band), glassy badge
    // cards with a faint amber glow behind the row.
    <section className="relative overflow-hidden border-y border-charcoal/10 py-10 bg-cream">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[22rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-golden opacity-[0.05] blur-3xl"
      />
      <RevealGroup
        stagger={60}
        className="container relative flex flex-wrap items-stretch justify-center gap-3"
      >
        {items.map((i) => (
          <span
            key={i.label.en}
            className="inline-flex items-center gap-3 rounded-2xl border border-charcoal/10 bg-white px-4 py-3 shadow-card"
          >
            <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-gradient-golden-soft text-golden">
              <i.icon className="h-[18px] w-[18px]" />
            </span>
            <span className="text-sm font-medium text-charcoal whitespace-nowrap">
              {L(i.label)}
            </span>
          </span>
        ))}
        <Link
          to={pathFor('compliance', language)}
          className="inline-flex items-center gap-2 self-center rounded-2xl border border-golden/40 px-4 py-3 text-sm font-semibold text-golden transition-colors hover:bg-golden/10"
        >
          {L({
            de: 'Compliance im Detail',
            en: 'Compliance in detail',
            fr: 'La conformité en détail',
            ar: 'الامتثال بالتفصيل',
          })}
          <ArrowRight className="h-4 w-4 rtl:rotate-180" />
        </Link>
      </RevealGroup>
    </section>
  );
};

// CRM-Alternative / Product: teaser row linking to the full comparison page.
export const WhyImmob24Teaser = () => {
  const { language } = useLanguage();
  const L = <T,>(v: Record<Language, T>): T => v[language] ?? v.en;
  return (
    <section className="py-14 bg-cream">
      <div className="container">
        <Reveal className="rounded-2xl border border-golden/25 bg-white shadow-card p-8 md:p-10 grid md:grid-cols-[1fr,auto] items-center gap-6">
          <div>
            <h2 className="font-heading text-2xl md:text-3xl text-charcoal">
              {L({
                de: 'Ein Team, kein Tool: Warum Immob24 anders gebaut ist',
                en: 'A team, not a tool: why immob24 is built differently',
                fr: 'Une équipe, pas un outil : pourquoi Immob24 est conçu différemment',
                ar: 'فريق متكامل، لا مجرد أداة: لماذا بُني Immob24 بشكل مختلف',
              })}
            </h2>
            <p className="mt-3 text-slate max-w-2xl">
              {L({
                de: 'Voller Deal-Lebenszyklus statt Punktlösungen, produktisierte Workflows statt Prompts — und Compliance durch Architektur statt Nachrüstung.',
                en: 'Full deal lifecycle instead of point solutions, productized workflows instead of prompts — and compliance by architecture, not retrofit.',
                fr: 'Le cycle de vie complet du deal plutôt que des solutions isolées, des workflows productisés plutôt que des prompts — et une conformité par architecture, pas par retouche.',
                ar: 'دورة حياة كاملة للصفقات بدلًا من حلول متفرقة، وتدفقات عمل جاهزة بدلًا من الأوامر النصية — وامتثال بحكم البنية لا بالترقيع اللاحق.',
              })}
            </p>
          </div>
          <Link
            to={pathFor('whyImmob24', language)}
            className="inline-flex items-center gap-2 rounded-full band-dark bg-charcoal text-white px-6 py-3 text-sm font-medium hover:bg-charcoal/90 transition-colors whitespace-nowrap"
          >
            {L({
              de: 'Der Vergleich',
              en: 'See the comparison',
              fr: 'Voir le comparatif',
              ar: 'استعراض المقارنة',
            })}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
};
