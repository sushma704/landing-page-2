// Why immob24 page — /de/warum-immob24 + /en/why-immob24 (+ fr/ar)
//
// Content sources (draft/ai-refinement): pitch deck slide 2 (the problem),
// slide 5 ("Why immob24 Wins" comparison), slide 7 (market / Germany-first).
// Copy inline DE/EN/FR/AR — translations.ts untouched.

import {
  ArrowRight,
  Check,
  Globe2,
  Layers,
  Map,
  ShieldCheck,
  Users,
  Workflow,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header, Footer, DEMO_CTA_PROPS } from '../components/SiteChrome';
import { Reveal, RevealGroup, CountUp, TypeOnce } from '../lib/animations';
import { ScrollCue } from '../components/Wayfinding';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { useJsonLd } from '../lib/useJsonLd';
import { breadcrumbSchema } from '../lib/schema';
import type { Language } from '../i18n';
import { useLanguage } from '../i18n';
import { SITE_ORIGIN, pathFor, urlFor } from '../i18n/pages';

type Copy = Record<Language, string>;

// Deck slide 2 — where the day goes.
const PROBLEMS: Array<{ title: Copy; body: Copy }> = [
  {
    title: {
      de: 'Langsame Lead-Reaktion',
      en: 'Slow lead response',
      fr: 'Réaction lente aux leads',
      ar: 'استجابة بطيئة للعملاء المحتملين',
    },
    body: {
      de: 'Heiße Leads kühlen in Minuten ab — Makler antworten in Stunden.',
      en: 'Hot leads go cold in minutes — agents respond in hours.',
      fr: 'Les leads chauds refroidissent en quelques minutes — les agents répondent en quelques heures.',
      ar: 'العملاء المحتملون المتحمسون يفقدون حماسهم خلال دقائق — بينما يرد الوسطاء خلال ساعات.',
    },
  },
  {
    title: {
      de: 'Manuelle Exposé-Erstellung',
      en: 'Manual listing creation',
      fr: 'Création manuelle des exposés',
      ar: 'إنشاء يدوي لعروض العقارات',
    },
    body: {
      de: 'Stunden für Texte, Fotos und Formatierung — pro Objekt.',
      en: 'Hours on copy, photos and formatting — per property.',
      fr: 'Des heures pour les textes, les photos et la mise en forme — par bien.',
      ar: 'ساعات للنصوص والصور والتنسيق — لكل عقار.',
    },
  },
  {
    title: {
      de: 'Follow-ups rutschen durch',
      en: 'Deal follow-ups slip',
      fr: 'Les relances passent à la trappe',
      ar: 'المتابعات تضيع',
    },
    body: {
      de: 'Kein systematisches Tracking — Umsatz geht in den Lücken verloren.',
      en: 'No systematic tracking — revenue lost to the cracks.',
      fr: 'Pas de suivi systématique — du chiffre d’affaires se perd dans les failles.',
      ar: 'لا تتبع منهجي — إيرادات تضيع في الثغرات.',
    },
  },
  {
    title: {
      de: 'Admin frisst den Tag',
      en: 'Admin overload',
      fr: 'L’administratif dévore la journée',
      ar: 'الأعمال الإدارية تلتهم اليوم',
    },
    body: {
      de: 'Terminplanung, Dokumente, Reporting — der Arbeitstag verschwindet.',
      en: 'Scheduling, docs, reporting — the workday disappears.',
      fr: 'Planification des rendez-vous, documents, reporting — la journée de travail disparaît.',
      ar: 'جدولة المواعيد والمستندات والتقارير — يوم العمل يتلاشى.',
    },
  },
];

// Deck slide 5 — immob24 vs the market, row by row.
const COMPARISON: Array<{
  dim: Copy;
  immob: Copy;
  market: Copy;
}> = [
  {
    dim: { de: 'Ansatz', en: 'Approach', fr: 'Approche', ar: 'النهج' },
    immob: {
      de: 'Ein Team, kein Tool — 7 KI-Agenten teilen Kontext und übergeben Arbeit über den ganzen Deal-Lebenszyklus.',
      en: 'A team, not a tool — 7 AI agents share context and hand off work across the full deal lifecycle.',
      fr: 'Une équipe, pas un outil — 7 agents IA partagent le contexte et se transmettent le travail sur tout le cycle de vie du deal.',
      ar: 'فريق وليس أداة — 7 وكلاء ذكاء اصطناعي يتشاركون السياق ويتناقلون العمل عبر دورة حياة الصفقة بأكملها.',
    },
    market: {
      de: 'Einzel-Automatisierungen: ein Tool für Chat, eins für Exposés, eins für Termine. Kein gemeinsamer Kontext.',
      en: 'Single-task automation: one tool for chat, another for listings, another for scheduling. No shared context.',
      fr: 'Automatisations isolées : un outil pour le chat, un pour les exposés, un pour les rendez-vous. Aucun contexte partagé.',
      ar: 'أتمتة مجزأة: أداة للدردشة وأخرى للعروض وأخرى للمواعيد. لا سياق مشترك.',
    },
  },
  {
    dim: { de: 'Abdeckung', en: 'Coverage', fr: 'Couverture', ar: 'التغطية' },
    immob: {
      de: 'Voller Lebenszyklus: Lead → Gespräch → Besichtigung → Exposé → Deal-Monitor → Daily Brief.',
      en: 'Full lifecycle: lead → conversation → viewing → listing → deal monitor → daily brief.',
      fr: 'Cycle de vie complet : lead → conversation → visite → exposé → suivi du deal → brief quotidien.',
      ar: 'دورة حياة كاملة: عميل محتمل ← محادثة ← معاينة ← عرض عقاري ← متابعة الصفقة ← موجز يومي.',
    },
    market: {
      de: 'Punktlösungen: nur Lead-Erfassung, nur Exposés oder nur Terminplanung. Fragmentierte Workflows.',
      en: 'Point solutions: just lead capture, or just listings, or just scheduling. Fragmented workflows.',
      fr: 'Solutions ponctuelles : seulement la capture de leads, ou seulement les exposés, ou seulement la planification. Des workflows fragmentés.',
      ar: 'حلول جزئية: التقاط العملاء المحتملين فقط، أو العروض فقط، أو جدولة المواعيد فقط. تدفقات عمل مجزأة.',
    },
  },
  {
    dim: { de: 'Bedienung', en: 'Operation', fr: 'Utilisation', ar: 'التشغيل' },
    immob: {
      de: 'Produktisiert statt Roh-KI: klare Workflows mit sichtbaren Ergebnissen. Makler schreiben keine Prompts.',
      en: 'Productized, not raw AI: clear workflows with visible outcomes. Agents never touch raw AI.',
      fr: 'Productisé plutôt qu’IA brute : des workflows clairs avec des résultats visibles. Les agents n’écrivent pas de prompts.',
      ar: 'منتَج جاهز وليس ذكاءً اصطناعيًا خامًا: تدفقات عمل واضحة بنتائج مرئية. الوسطاء لا يكتبون أي أوامر نصية.',
    },
    market: {
      de: 'Prompts und Chatbots: Makler müssen Prompt-Engineering lernen. Inkonsistente Ergebnisse.',
      en: 'Prompts and chatbots: agents must learn prompt engineering. Inconsistent results.',
      fr: 'Prompts et chatbots : les agents doivent apprendre le prompt engineering. Des résultats incohérents.',
      ar: 'أوامر نصية وروبوتات دردشة: على الوسطاء تعلُّم هندسة الأوامر. نتائج غير متسقة.',
    },
  },
  {
    dim: { de: 'Compliance', en: 'Compliance', fr: 'Conformité', ar: 'الامتثال' },
    immob: {
      de: 'Konform durch Architektur — von Grund auf für DSGVO und EU AI Act gebaut.',
      en: 'Compliant by architecture — built from scratch for GDPR and the EU AI Act.',
      fr: 'Conforme par l’architecture — conçu dès le départ pour le RGPD et l’EU AI Act.',
      ar: 'متوافق بحكم البنية — مبني من الأساس وفقًا لـ GDPR وقانون EU AI Act.',
    },
    market: {
      de: 'Nachgerüstete Compliance: US-Tools flanschen Datenschutz später an. Riskant für europäische Büros.',
      en: 'Retrofit compliance: US-built tools patch privacy on later. Risky for European agencies.',
      fr: 'Conformité rattrapée après coup : les outils américains greffent la protection des données plus tard. Risqué pour les agences européennes.',
      ar: 'امتثال مُلحق لاحقًا: الأدوات الأمريكية تضيف حماية البيانات في وقت لاحق. أمر محفوف بالمخاطر للمكاتب الأوروبية.',
    },
  },
  {
    dim: { de: 'Sprachen', en: 'Languages', fr: 'Langues', ar: 'اللغات' },
    immob: {
      de: 'Mehrsprachig nativ: DE · FR · EN · AR — von Tag eins.',
      en: 'Multilingual native: DE · FR · EN · AR — from day one.',
      fr: 'Multilingue nativement : DE · FR · EN · AR — dès le premier jour.',
      ar: 'متعدد اللغات أصلاً: DE · FR · EN · AR — منذ اليوم الأول.',
    },
    market: {
      de: '„Lokalisierung später" — wenn überhaupt.',
      en: 'Localize later — if ever.',
      fr: '« Localisation plus tard » — si jamais.',
      ar: '«التوطين لاحقًا» — إن حدث أصلاً.',
    },
  },
];

export default function WhyImmob24Page() {
  const { language } = useLanguage();
  const L = <T,>(v: Record<Language, T>): T => v[language] ?? v.en;
  useDocumentMeta({
    title: L({
      de: 'Warum Immob24 — Das KI-Betriebssystem für Immobilien | Immob24',
      en: 'Why immob24 — The AI operating system for real estate | Immob24',
      fr: 'Pourquoi Immob24 — Le système d’exploitation IA de l’immobilier | Immob24',
      ar: 'لماذا Immob24 — نظام التشغيل بالذكاء الاصطناعي للعقارات | Immob24',
    }),
    description: L({
      de: '7 KI-Agenten statt Einzel-Tools, voller Deal-Lebenszyklus, konform durch Architektur: Warum Immob24 anders gebaut ist als der Markt.',
      en: '7 AI agents instead of point tools, full deal lifecycle, compliant by architecture: why immob24 is built differently from the market.',
      fr: '7 agents IA au lieu d’outils isolés, cycle de vie complet du deal, conforme par l’architecture : pourquoi Immob24 est conçu autrement que le marché.',
      ar: '7 وكلاء ذكاء اصطناعي بدلًا من أدوات متفرقة، ودورة حياة كاملة للصفقة، وامتثال بحكم البنية: لماذا بُنيت Immob24 بشكل مختلف عن السوق.',
    }),
    canonical: `${SITE_ORIGIN}${pathFor('whyImmob24', language)}`,
    alternates: [
      { hreflang: 'de', href: urlFor('whyImmob24', 'de') },
      { hreflang: 'en', href: urlFor('whyImmob24', 'en') },
      { hreflang: 'fr', href: urlFor('whyImmob24', 'fr') },
      { hreflang: 'ar', href: urlFor('whyImmob24', 'ar') },
      { hreflang: 'x-default', href: urlFor('whyImmob24', 'de') },
    ],
    htmlLang: language,
  });
  useJsonLd(
    [
      breadcrumbSchema([
        {
          name: L({ de: 'Start', en: 'Home', fr: 'Accueil', ar: 'الرئيسية' }),
          path: pathFor('home', language),
        },
        {
          name: L({
            de: 'Warum Immob24',
            en: 'Why immob24',
            fr: 'Pourquoi Immob24',
            ar: 'لماذا Immob24',
          }),
          path: pathFor('whyImmob24', language),
        },
      ]),
    ],
    'why-immob24',
  );

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      {/* Hero */}
      <section className="relative pt-24 pb-14 md:pt-28 md:pb-20 overflow-hidden bg-gradient-to-b from-cream to-white">
        <div
          aria-hidden
          className="absolute -top-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-gradient-golden opacity-20 blur-3xl"
        />
        <div className="container relative text-center max-w-3xl mx-auto">
          <h1 className="mt-6 font-heading text-hero-mobile md:text-hero text-charcoal text-balance">
            <TypeOnce text={L({
              de: 'Warum Immob24?',
              en: 'Why immob24?',
              fr: 'Pourquoi Immob24 ?',
              ar: 'لماذا Immob24؟',
            })} />
          </h1>
          <p className="hero-in mt-6 text-body-lg text-slate max-w-2xl mx-auto" style={{ animationDelay: '250ms' }}>
            {L({
              de: 'Makler verlieren 60–70 % ihres Tages an operative Arbeit — und die meisten KI-Tools ignorieren die europäische Regulierung. Immob24 löst beides.',
              en: 'Agents lose 60–70% of their day to ops — and most AI tools ignore European regulation. Immob24 solves both.',
              fr: 'Les agents perdent 60–70 % de leur journée en tâches opérationnelles — et la plupart des outils d’IA ignorent la réglementation européenne. Immob24 résout les deux.',
              ar: 'يخسر الوسطاء 60–70% من يومهم في الأعمال التشغيلية — وتتجاهل معظم أدوات الذكاء الاصطناعي التنظيم الأوروبي. Immob24 تحل المشكلتين معًا.',
            })}
          </p>
          <ScrollCue targetId="problem" className="mt-8" />
        </div>
      </section>

      {/* The problem */}
      <section id="problem" className="py-16 md:py-20 bg-white">
        <div className="container">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <Reveal as="h2" className="font-heading text-section-mobile md:text-section text-charcoal max-w-xl">
              {L({
                de: 'Wo der Tag wirklich hingeht',
                en: 'Where the day actually goes',
                fr: 'Où passe réellement la journée',
                ar: 'أين يذهب اليوم فعلًا',
              })}
            </Reveal>
            <Reveal delay={100} className="text-right">
              <div className="font-metric text-metric-mobile md:text-metric text-golden-dark">
                <CountUp value="60–70%" />
              </div>
              <div className="text-sm text-warm-gray">
                {L({
                  de: 'des Maklertags geht an Ops verloren',
                  en: 'of the agent day lost to ops',
                  fr: 'de la journée de l’agent perdus en tâches opérationnelles',
                  ar: 'من يوم الوسيط تضيع في الأعمال التشغيلية',
                })}
              </div>
            </Reveal>
          </div>
          <RevealGroup className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROBLEMS.map((p) => (
              <article key={p.title.en} className="h-full rounded-2xl border border-charcoal/5 bg-cream/60 p-6">
                <h3 className="font-heading text-lg text-charcoal">{L(p.title)}</h3>
                <p className="mt-2 text-sm text-slate">{L(p.body)}</p>
              </article>
            ))}
          </RevealGroup>
          <Reveal as="p" delay={100} className="mt-8 text-slate max-w-2xl">
            {L({
              de: 'Europäische Maklerbüros brauchen KI, die innerhalb ihrer regulatorischen Realität arbeitet — nicht dagegen.',
              en: 'European agencies need AI that works within their regulatory reality — not against it.',
              fr: 'Les agences européennes ont besoin d’une IA qui travaille dans leur réalité réglementaire — pas contre elle.',
              ar: 'تحتاج المكاتب العقارية الأوروبية إلى ذكاء اصطناعي يعمل ضمن واقعها التنظيمي — لا ضده.',
            })}
          </Reveal>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-16 md:py-24">
        <div className="container">
          <Reveal as="h2" className="font-heading text-section-mobile md:text-section text-charcoal max-w-2xl">
            {L({
              de: 'Immob24 vs. der Markt',
              en: 'immob24 vs. the market',
              fr: 'Immob24 vs le marché',
              ar: 'Immob24 مقابل السوق',
            })}
          </Reveal>
          <Reveal direction="scale" className="mt-10 overflow-x-auto rounded-2xl border border-charcoal/5 bg-white shadow-card">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-charcoal/10">
                  <th className="px-5 py-4 w-32" />
                  <th className="px-5 py-4">
                    <span className="inline-flex items-center gap-2 font-heading text-base text-charcoal">
                      <span className="h-2.5 w-2.5 rounded-full bg-golden" /> immob24
                    </span>
                  </th>
                  <th className="px-5 py-4">
                    <span className="font-heading text-base text-warm-gray">
                      {L({
                        de: 'Der Markt',
                        en: 'The market',
                        fr: 'Le marché',
                        ar: 'السوق',
                      })}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.dim.en} className="border-b border-charcoal/5 last:border-none align-top">
                    <td className="px-5 py-5 text-xs font-semibold uppercase tracking-wide text-warm-gray whitespace-nowrap">
                      {L(row.dim)}
                    </td>
                    <td className="px-5 py-5">
                      <div className="flex items-start gap-2 text-charcoal">
                        <Check className="h-4 w-4 mt-0.5 flex-none text-honey-green" />
                        {L(row.immob)}
                      </div>
                    </td>
                    <td className="px-5 py-5">
                      <div className="flex items-start gap-2 text-slate">
                        <X className="h-4 w-4 mt-0.5 flex-none text-warm-gray" />
                        {L(row.market)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
          <Reveal delay={100} className="mt-6 flex flex-wrap gap-3">
            <Link
              to={pathFor('aiFeatures', language)}
              className="inline-flex items-center gap-2 rounded-full bg-white border border-charcoal/10 px-5 py-2.5 text-sm font-medium text-charcoal shadow-subtle hover:border-golden/40 transition-colors"
            >
              <Workflow className="h-4 w-4 text-golden-dark" />
              {L({
                de: 'Die 7 KI-Funktionen ansehen',
                en: 'See the 7 AI features',
                fr: 'Voir les 7 fonctions IA',
                ar: 'اطّلع على وظائف الذكاء الاصطناعي السبع',
              })}
            </Link>
            <Link
              to={pathFor('compliance', language)}
              className="inline-flex items-center gap-2 rounded-full bg-white border border-charcoal/10 px-5 py-2.5 text-sm font-medium text-charcoal shadow-subtle hover:border-golden/40 transition-colors"
            >
              <ShieldCheck className="h-4 w-4 text-golden-dark" />
              {L({
                de: 'Compliance im Detail',
                en: 'Compliance in detail',
                fr: 'La conformité en détail',
                ar: 'الامتثال بالتفصيل',
              })}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Market / Germany-first */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container grid lg:grid-cols-2 gap-10 items-center">
          <Reveal direction="left">
            <h2 className="font-heading text-section-mobile md:text-section text-charcoal">
              {L({
                de: 'Deutschland zuerst — mit Absicht',
                en: 'Germany first — on purpose',
                fr: 'L’Allemagne d’abord — à dessein',
                ar: 'ألمانيا أولاً — عن قصد',
              })}
            </h2>
            <p className="mt-4 text-slate">
              {L({
                de: 'Deutschland ist Europas compliance-sensibelster Markt und größte Volkswirtschaft. Das härteste Regulierungsumfeld ist unser Burggraben: Wer hier besteht, skaliert überall.',
                en: 'Germany is Europe’s most compliance-sensitive market and its largest economy. The hardest regulatory environment is our moat: what works here scales everywhere.',
                fr: 'L’Allemagne est le marché le plus sensible à la conformité en Europe et sa plus grande économie. L’environnement réglementaire le plus exigeant est notre rempart : qui réussit ici peut se déployer partout.',
                ar: 'ألمانيا هي السوق الأكثر حساسية للامتثال في أوروبا وأكبر اقتصاد فيها. البيئة التنظيمية الأكثر صرامة هي خندقنا الدفاعي: من ينجح هنا يتوسع في كل مكان.',
              })}
            </p>
            <ul className="mt-6 space-y-3">
              {[
                {
                  icon: Map,
                  label: {
                    de: 'Go-to-Market: Deutschland → Frankreich → Dubai',
                    en: 'Go-to-market: Germany → France → Dubai',
                    fr: 'Go-to-market : Allemagne → France → Dubaï',
                    ar: 'خطة دخول السوق: ألمانيا ← فرنسا ← دبي',
                  } as Copy,
                },
                {
                  icon: Globe2,
                  label: {
                    de: 'Gleiche Compliance-Schicht, gleiche Mehrsprachigkeit — von Tag eins in der Architektur',
                    en: 'Same compliance layer, same multilingual engine — architected from day one',
                    fr: 'Même couche de conformité, même moteur multilingue — intégrés à l’architecture dès le premier jour',
                    ar: 'نفس طبقة الامتثال ونفس محرك تعدد اللغات — في صميم البنية منذ اليوم الأول',
                  } as Copy,
                },
                {
                  icon: Users,
                  label: {
                    de: 'Gebaut von einem Team aus Europas größten Immobilienplattformen',
                    en: 'Built by a team from inside Europe’s largest real-estate platforms',
                    fr: 'Conçu par une équipe issue des plus grandes plateformes immobilières d’Europe',
                    ar: 'من تطوير فريق قادم من أكبر منصات العقارات في أوروبا',
                  } as Copy,
                },
              ].map((item) => (
                <li key={item.label.en} className="flex items-start gap-3 text-slate">
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-golden/10 text-golden-dark">
                    <item.icon className="h-4 w-4" />
                  </span>
                  {L(item.label)}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal direction="right" className="rounded-2xl band-dark bg-charcoal text-white p-8 md:p-10">
            <div className="font-metric text-5xl md:text-6xl text-golden">
              <CountUp value="€12B+" />
            </div>
            <p className="mt-2 text-white/80">
              {L({
                de: 'jährlicher Provisionsmarkt im europäischen Immobiliengeschäft — fragmentiert und reif für KI',
                en: 'annual commission market in European real estate — fragmented and ripe for AI',
                fr: 'de marché annuel des commissions dans l’immobilier européen — fragmenté et mûr pour l’IA',
                ar: 'حجم سوق العمولات السنوي في القطاع العقاري الأوروبي — مجزأ وجاهز للذكاء الاصطناعي',
              })}
            </p>
            <div className="mt-8 h-px bg-white/10" />
            <p className="mt-6 text-sm text-white/60">
              {L({
                de: 'Pre-Launch · Closed Beta mit 10–20 deutschen Maklern als erste Kohorte',
                en: 'Pre-launch · closed beta targeting 10–20 German agents as the first cohort',
                fr: 'Pré-lancement · bêta fermée avec 10–20 agents allemands comme première cohorte',
                ar: 'ما قبل الإطلاق · نسخة تجريبية مغلقة مع 10–20 وسيطًا ألمانيًا كأول مجموعة',
              })}
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container text-center max-w-2xl mx-auto">
          <Reveal as="h2" className="font-heading text-section-mobile md:text-section text-charcoal">
            {L({
              de: 'Konforme KI für europäische Immobilien',
              en: 'Compliant AI for European real estate',
              fr: 'Une IA conforme pour l’immobilier européen',
              ar: 'ذكاء اصطناعي متوافق للعقارات الأوروبية',
            })}
          </Reveal>
          <Reveal as="p" delay={100} className="mt-3 text-slate">
            {L({
              de: 'Sichern Sie sich frühen Zugang — oder sehen Sie die Plattform live in einer Demo.',
              en: 'Get early access — or see the platform live in a demo.',
              fr: 'Obtenez un accès anticipé — ou découvrez la plateforme en direct lors d’une démo.',
              ar: 'احصلوا على وصول مبكر — أو شاهدوا المنصة مباشرة في عرض توضيحي.',
            })}
          </Reveal>
          <Reveal delay={150} className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              {...DEMO_CTA_PROPS}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-golden px-6 py-3 text-sm font-semibold text-[#1E1B16] shadow-golden"
            >
              {L({
                de: 'Demo anfragen',
                en: 'Request a demo',
                fr: 'Demander une démo',
                ar: 'اطلب عرضًا توضيحيًا',
              })}
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              to={`${pathFor('pricing', language)}#beta`}
              className="inline-flex items-center gap-2 rounded-full bg-white border border-charcoal/10 px-6 py-3 text-sm font-medium text-charcoal shadow-subtle hover:border-golden/40 transition-colors"
            >
              {L({
                de: 'Zum Beta-Programm',
                en: 'Join the beta program',
                fr: 'Rejoindre le programme bêta',
                ar: 'انضم إلى البرنامج التجريبي',
              })}
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
