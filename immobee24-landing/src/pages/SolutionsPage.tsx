// Solutions hub (unified IA phase 2): answers "does it fit MY situation?"
// organised by role and by scenario. Deliberately a HUB — it summarises and
// links to the deep-dives (CRM alternative, Why immob24) instead of
// restating them (one-page-one-question rule from the IA blueprint).
// Copy inline DE/EN/FR/AR — translations.ts untouched.

import type { ComponentType } from 'react';
import {
  ArrowRight,
  Building2,
  CalendarClock,
  Inbox,
  KeyRound,
  Repeat,
  Scale,
  User,
  Users,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header, Footer, DEMO_CTA_PROPS } from '../components/SiteChrome';
import { LineReveal, chorSlot, Reveal, RevealGroup, TypeOnce } from '../lib/animations';
import { SceneInquiryReply, SceneFollowUp } from '../components/scenes';
import { WhyImmob24Teaser } from '../components/AiRefinementBands';
import { AccentHeading, Panel, SectionHopButton } from '../components/PanelPatterns';
import { useLanguage } from '../i18n';
import type { Language } from '../i18n';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { useJsonLd } from '../lib/useJsonLd';
import { breadcrumbSchema } from '../lib/schema';
import { SITE_ORIGIN, pathFor, urlFor } from '../i18n/pages';
import { useLocalizedPath } from '../lib/useLocalizedPath';
import { trackEvent } from '../lib/analytics';

type Copy = Record<Language, string>;

const ROLES: Array<{
  icon: ComponentType<{ className?: string }>;
  title: Copy;
  pain: Copy;
  fit: Copy;
  agents: string[];
}> = [
  {
    icon: User,
    title: { de: 'Einzelmakler', en: 'Solo brokers', fr: 'Agents indépendants', ar: 'الوسطاء المستقلون' },
    pain: {
      de: 'Sie sind Vertrieb, Besichtigung und Backoffice in einer Person — Anfragen kommen, während Sie beim Termin sind.',
      en: 'You are sales, viewings and back office in one person — inquiries arrive while you are out at appointments.',
      fr: 'Vous êtes à la fois commercial, visites et back-office — les demandes arrivent pendant vos rendez-vous.',
      ar: 'أنت المبيعات والمعاينات والمكتب الخلفي في شخص واحد — والاستفسارات تصل بينما أنت في المواعيد.',
    },
    fit: {
      de: 'Die Erstantwort, Qualifizierung und Terminvorschläge laufen automatisch weiter. Sie geben Aktionen zwischendurch frei.',
      en: 'First response, qualification and scheduling proposals keep running automatically. You approve actions in between.',
      fr: 'Première réponse, qualification et propositions de créneaux continuent automatiquement. Vous validez entre deux.',
      ar: 'الرد الأول والتأهيل واقتراح المواعيد تستمر تلقائيًا، وأنت توافق على الإجراءات بين المهام.',
    },
    agents: ['Lead Responder', 'Conversation Agent', 'Viewing Booker'],
  },
  {
    icon: Users,
    title: { de: 'Maklerteams', en: 'Brokerage teams', fr: 'Équipes d’agence', ar: 'فرق الوساطة' },
    pain: {
      de: 'Leads verteilen sich über Postfächer und Portale — niemand sieht, was schon beantwortet ist und was liegen bleibt.',
      en: 'Leads scatter across inboxes and portals — nobody sees what has been answered and what is slipping.',
      fr: 'Les leads se dispersent entre boîtes mail et portails — personne ne voit ce qui est traité et ce qui traîne.',
      ar: 'يتشتت العملاء المحتملون بين صناديق البريد والبوابات — ولا أحد يرى ما تمت الإجابة عنه وما هو متروك.',
    },
    fit: {
      de: 'Ein gemeinsamer Eingang, ein Deal-Board, klare Zuständigkeiten. Follow-ups bleiben aktiv, auch wenn das Team ausgelastet ist.',
      en: 'One shared inbox, one deal board, clear ownership. Follow-ups stay alive even when the team is stretched.',
      fr: 'Une entrée commune, un tableau des dossiers, des responsabilités claires. Les relances restent actives même en période de charge.',
      ar: 'صندوق وارد مشترك، لوحة صفقات واحدة، ومسؤوليات واضحة. تبقى المتابعات نشطة حتى عندما يكون الفريق مشغولًا.',
    },
    agents: ['Deal Monitor', 'Daily Brief Agent', 'Lead Responder'],
  },
  {
    icon: KeyRound,
    title: { de: 'Hausverwaltungen', en: 'Property managers', fr: 'Gestionnaires de biens', ar: 'إدارة العقارات' },
    pain: {
      de: 'Viele Einheiten, viele wiederkehrende Anfragen — dieselben Fragen zu Verfügbarkeit, Unterlagen und Terminen.',
      en: 'Many units, many recurring inquiries — the same questions about availability, documents and viewings.',
      fr: 'Beaucoup de lots, beaucoup de demandes récurrentes — toujours les mêmes questions sur la disponibilité, les documents, les visites.',
      ar: 'وحدات كثيرة واستفسارات متكررة — الأسئلة نفسها حول التوفر والمستندات والمواعيد.',
    },
    fit: {
      de: 'Standardanfragen werden sofort und konsistent beantwortet; Exposés und Termine laufen strukturiert — protokolliert und DSGVO-konform.',
      en: 'Routine inquiries get instant, consistent answers; exposés and viewings run structured — logged and GDPR-compliant.',
      fr: 'Les demandes courantes reçoivent des réponses instantanées et cohérentes ; dossiers et visites suivent un processus structuré, journalisé et conforme au RGPD.',
      ar: 'تحصل الاستفسارات الروتينية على إجابات فورية ومتسقة؛ وتسير العروض والمعاينات بشكل منظم — موثقة ومتوافقة مع حماية البيانات.',
    },
    agents: ['Conversation Agent', 'Listing Creator', 'Compliance Guard'],
  },
];

const T: Record<string, Copy> = {
  metaTitle: {
    de: 'Lösungen — für Einzelmakler, Teams und Verwaltungen | Immob24',
    en: 'Solutions — for solo brokers, teams and property managers | Immob24',
    fr: 'Solutions — pour agents, équipes et gestionnaires | Immob24',
    ar: 'الحلول — للوسطاء والفرق وإدارة العقارات | Immob24',
  },
  metaDesc: {
    de: 'Wie Immob24 zu Ihrer Situation passt: nach Rolle (Einzelmakler, Team, Verwaltung) und nach Szenario — von Portal-Anfragen über kalte Leads bis zum bestehenden CRM.',
    en: 'How Immob24 fits your situation: by role (solo, team, property management) and by scenario — from portal inquiries and cold leads to your existing CRM.',
    fr: 'Comment Immob24 s’adapte à votre situation : par rôle (indépendant, équipe, gestion) et par scénario — demandes de portails, leads froids, CRM existant.',
    ar: 'كيف يناسب Immob24 وضعكم: حسب الدور (مستقل، فريق، إدارة عقارات) وحسب السيناريو — من استفسارات البوابات إلى العملاء الخاملين إلى نظام CRM الحالي.',
  },
  eyebrow: { de: 'Lösungen', en: 'Solutions', fr: 'Solutions', ar: 'الحلول' },
  headline: {
    de: 'Gebaut für Ihren Arbeitsalltag — nicht umgekehrt',
    en: 'Built around how you work — not the other way round',
    fr: 'Conçu autour de votre façon de travailler — pas l’inverse',
    ar: 'مصمم حول طريقة عملكم — لا العكس',
  },
  sub: {
    de: 'Gleiche Plattform, unterschiedliche Situationen. Finden Sie Ihren Einstieg — nach Rolle oder nach dem Problem, das Sie gerade haben.',
    en: 'Same platform, different situations. Find your entry point — by role, or by the problem in front of you.',
    fr: 'Même plateforme, situations différentes. Trouvez votre point d’entrée — par rôle ou par problème.',
    ar: 'المنصة نفسها لمواقف مختلفة. اعثروا على مدخلكم — حسب الدور أو حسب المشكلة أمامكم.',
  },
  byRole: { de: 'Nach Rolle', en: 'By role', fr: 'Par rôle', ar: 'حسب الدور' },
  roleHeadline: {
    de: 'Wer «arbeitet» mit Immob24?',
    en: 'Who «works» with Immob24?',
    fr: 'Qui «travaille» avec Immob24 ?',
    ar: 'من «يعمل» مع Immob24؟',
  },
  agentsLabel: {
    de: 'Ihre wichtigsten KI-Agenten',
    en: 'Your key AI agents',
    fr: 'Vos agents IA clés',
    ar: 'وكلاء الذكاء الاصطناعي الأهم لكم',
  },
  byScenario: { de: 'Nach Szenario', en: 'By scenario', fr: 'Par scénario', ar: 'حسب السيناريو' },
  scenarioHeadline: {
    de: 'Drei Situationen, die «jedes Maklerbüro» kennt',
    en: 'Three situations «every brokerage» knows',
    fr: 'Trois situations que «toute agence» connaît',
    ar: 'ثلاثة مواقف يعرفها «كل مكتب وساطة»',
  },
  s1Title: {
    de: 'Portal-Anfragen stapeln sich über Nacht',
    en: 'Portal inquiries pile up overnight',
    fr: 'Les demandes de portails s’accumulent la nuit',
    ar: 'استفسارات البوابات تتراكم أثناء الليل',
  },
  s1Body: {
    de: 'Interessenten schreiben abends und am Wochenende — wer morgens zuerst antwortet, bekommt den Termin. Immob24 antwortet in Sekunden, rund um die Uhr, und qualifiziert direkt im Gespräch.',
    en: 'Prospects write in the evening and on weekends — whoever answers first gets the viewing. Immob24 replies in seconds, around the clock, and qualifies right in the conversation.',
    fr: 'Les prospects écrivent le soir et le week-end — le premier qui répond obtient la visite. Immob24 répond en quelques secondes, 24 h/24, et qualifie directement dans la conversation.',
    ar: 'يكتب المهتمون مساءً وفي عطلات نهاية الأسبوع — ومن يرد أولًا يحصل على موعد المعاينة. يرد Immob24 خلال ثوانٍ وعلى مدار الساعة ويؤهل مباشرة أثناء المحادثة.',
  },
  s1Link: {
    de: 'So funktioniert der Ablauf',
    en: 'See how the flow works',
    fr: 'Voir comment ça marche',
    ar: 'شاهدوا كيف يعمل المسار',
  },
  s2Title: {
    de: 'Leads werden nach der ersten Besichtigung kalt',
    en: 'Leads go cold after the first viewing',
    fr: 'Les leads refroidissent après la première visite',
    ar: 'يفتر العملاء المحتملون بعد المعاينة الأولى',
  },
  s2Body: {
    de: 'Kein Rückruf, keine Antwort — und im Tagesgeschäft bleibt das Nachfassen liegen. Immob24 hält Follow-ups aktiv (Tag 1, 3, 7) und meldet sich, bevor der Lead verloren ist.',
    en: 'No callback, no reply — and follow-up slips in the daily grind. Immob24 keeps follow-ups alive (day 1, 3, 7) and reaches out before the lead is lost.',
    fr: 'Pas de rappel, pas de réponse — et la relance passe à la trappe. Immob24 maintient les relances (jour 1, 3, 7) et se manifeste avant que le lead ne soit perdu.',
    ar: 'لا اتصال ولا رد — وتضيع المتابعة في زحمة العمل اليومي. يبقي Immob24 المتابعات نشطة (اليوم 1 و3 و7) ويتواصل قبل أن يضيع العميل.',
  },
  s2Link: {
    de: 'Die Prozess-Schritte im Detail',
    en: 'The process steps in detail',
    fr: 'Les étapes du processus en détail',
    ar: 'خطوات العملية بالتفصيل',
  },
  s3Title: {
    de: '„Wir haben doch schon ein CRM“',
    en: '“We already have a CRM”',
    fr: '« Nous avons déjà un CRM »',
    ar: '”لدينا نظام CRM بالفعل“',
  },
  s3Body: {
    de: 'Gut so — Immob24 ersetzt es nicht. Es ist die Ausführungsschicht darüber: Es beantwortet, qualifiziert und koordiniert, während Ihr CRM das System of Record bleibt.',
    en: 'Good — Immob24 does not replace it. It is the execution layer on top: it answers, qualifies and coordinates while your CRM stays the system of record.',
    fr: 'Tant mieux — Immob24 ne le remplace pas. C’est la couche d’exécution au-dessus : il répond, qualifie et coordonne pendant que votre CRM reste le système de référence.',
    ar: 'جيد — Immob24 لا يستبدله. إنه طبقة التنفيذ فوقه: يجيب ويؤهل وينسق بينما يبقى نظام CRM لديكم هو المرجع.',
  },
  s3Link: {
    de: 'Zum vollständigen CRM-Vergleich',
    en: 'See the full CRM comparison',
    fr: 'Voir le comparatif CRM complet',
    ar: 'إلى المقارنة الكاملة مع أنظمة CRM',
  },
  ctaHeadline: {
    de: 'Unsicher, welcher Einstieg passt?',
    en: 'Not sure which entry point fits?',
    fr: 'Pas sûr du bon point d’entrée ?',
    ar: 'غير متأكدين من المدخل المناسب؟',
  },
  ctaBody: {
    de: '30 Minuten Demo — wir zeigen die Plattform anhand Ihrer Situation.',
    en: 'A 30-minute demo — we walk through the platform using your situation.',
    fr: 'Une démo de 30 minutes — nous parcourons la plateforme à partir de votre situation.',
    ar: 'عرض توضيحي لمدة 30 دقيقة — نستعرض المنصة انطلاقًا من وضعكم.',
  },
  ctaButton: { de: 'Demo anfragen', en: 'Request a demo', fr: 'Demander une démo', ar: 'طلب عرض توضيحي' },
};

export default function SolutionsPage() {
  const { language } = useLanguage();
  const localPath = useLocalizedPath();
  const L = (k: keyof typeof T) => T[k][language] ?? T[k].en;

  useDocumentMeta({
    title: L('metaTitle'),
    description: L('metaDesc'),
    canonical: `${SITE_ORIGIN}${pathFor('solutions', language)}`,
    alternates: [
      { hreflang: 'de', href: urlFor('solutions', 'de') },
      { hreflang: 'en', href: urlFor('solutions', 'en') },
      { hreflang: 'fr', href: urlFor('solutions', 'fr') },
      { hreflang: 'ar', href: urlFor('solutions', 'ar') },
      { hreflang: 'x-default', href: urlFor('solutions', 'de') },
    ],
    htmlLang: language,
  });
  useJsonLd(
    [
      breadcrumbSchema([
        {
          name: { de: 'Start', en: 'Home', fr: 'Accueil', ar: 'الرئيسية' }[language] ?? 'Home',
          path: pathFor('home', language),
        },
        { name: L('eyebrow'), path: pathFor('solutions', language) },
      ]),
    ],
    'solutions',
  );

  const scenarios = [
    {
      icon: Inbox,
      title: L('s1Title'),
      body: L('s1Body'),
      link: `${localPath('produkt')}#how-it-works`,
      linkLabel: L('s1Link'),
      visual: <SceneInquiryReply />,
    },
    {
      icon: Repeat,
      title: L('s2Title'),
      body: L('s2Body'),
      link: `${localPath('produkt')}#process-detail`,
      linkLabel: L('s2Link'),
      visual: <SceneFollowUp />,
    },
    {
      icon: Scale,
      title: L('s3Title'),
      body: L('s3Body'),
      link: localPath('crmAlternative'),
      linkLabel: L('s3Link'),
      visual: null,
      id: 'crm-alternative',
    },
  ];

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      {/* Hero */}
      <section className="relative pt-24 pb-14 md:pt-28 md:pb-20 overflow-hidden bg-gradient-to-b from-cream to-white">
        <div className="container relative text-center max-w-3xl mx-auto">
          <h1 className="chor mt-6 font-heading text-hero-mobile md:text-hero text-charcoal text-balance" style={chorSlot(0)}>
            <TypeOnce text={L('headline')} />
          </h1>
          <p className="chor mt-6 text-body-lg text-slate max-w-2xl mx-auto" style={chorSlot(280, 500)}>{L('sub')}</p>
        </div>
      </section>

      {/* By role — panel section (pattern 1) */}
      <Panel id="by-role">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-golden-dark">
            {L('byRole')}
          </p>
          <AccentHeading
            text={L('roleHeadline')}
            className="mt-2 font-heading text-section-mobile md:text-section text-charcoal"
          />
        </div>

        <RevealGroup className="mt-10 grid gap-6 lg:grid-cols-3">
            {ROLES.map((r) => (
              <div
                key={r.title.en}
                className="rounded-2xl border border-charcoal/10 bg-cream p-6 md:p-8 shadow-subtle hover:shadow-card-hover transition-all"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-golden-soft text-golden-dark">
                  <r.icon className="icon-draw h-5 w-5" />
                </span>
                <h3 className="mt-4 font-heading text-xl text-charcoal">
                  {r.title[language] ?? r.title.en}
                </h3>
                <p className="mt-3 text-sm text-slate leading-relaxed">
                  {r.pain[language] ?? r.pain.en}
                </p>
                <p className="mt-3 text-sm text-charcoal/85 leading-relaxed">
                  {r.fit[language] ?? r.fit.en}
                </p>
                <p className="mt-5 text-[11px] font-semibold uppercase tracking-wide text-warm-gray">
                  {L('agentsLabel')}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {r.agents.map((a, ai) => (
                    <Link
                      key={a}
                      to={localPath('aiFeatures')}
                      className="icon-pop rounded-full border border-teal/25 bg-teal-wash px-2.5 py-1 text-xs font-medium text-teal hover:border-teal/50 transition-colors"
                      style={{ animationDelay: `${ai * 60}ms` }}
                    >
                      {a}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
        </RevealGroup>
      </Panel>

      {/* By scenario — panel section (pattern 1) */}
      <Panel id="scenarios">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-golden-dark">
            {L('byScenario')}
          </p>
          <AccentHeading
            text={L('scenarioHeadline')}
            className="mt-2 font-heading text-section-mobile md:text-section text-charcoal"
          />
        </div>

          <div className="mt-10 space-y-8">
            {scenarios.map((sc, i) => {
              // alternating rows (Part C.4): text slides in from its visual
              // side, the visual from the opposite one
              const textDir = i % 2 === 1 ? 'right' : 'left';
              const visualDir = i % 2 === 1 ? 'left' : 'right';
              return (
                <div
                  key={sc.title}
                  id={sc.id}
                  className={`grid items-center gap-8 rounded-2xl border border-charcoal/10 bg-white p-6 md:p-10 shadow-subtle lg:grid-cols-2 ${
                    i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                  }`}
                >
                  <Reveal direction={textDir}>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-golden-soft text-golden-dark">
                      <sc.icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-heading text-2xl text-charcoal text-balance">
                      {sc.title}
                    </h3>
                    <p className="mt-4 text-slate leading-relaxed">{sc.body}</p>
                    <Link
                      to={sc.link}
                      onClick={() => trackEvent('solutions_scenario_link', { scenario: i + 1 })}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-golden-dark hover:text-charcoal transition-colors"
                    >
                      {sc.linkLabel}
                      <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                    </Link>
                  </Reveal>
                  {sc.visual ? (
                    <Reveal direction={visualDir}>
                      <div className="mx-auto w-full max-w-md">{sc.visual}</div>
                    </Reveal>
                  ) : (
                    <Reveal direction={visualDir}>
                      <div className="mx-auto grid w-full max-w-md grid-cols-3 gap-3 text-center">
                        {[Zap, CalendarClock, Building2].map((Ic, j) => (
                          <div
                            key={j}
                            className="rounded-xl border border-charcoal/10 bg-cream p-4"
                          >
                            <Ic className="mx-auto h-5 w-5 text-golden-dark" />
                            <p className="mt-2 text-[11px] font-medium text-warm-gray">
                              {
                                [
                                  { de: 'Ausführung', en: 'Execution', fr: 'Exécution', ar: 'تنفيذ' },
                                  { de: 'Koordination', en: 'Coordination', fr: 'Coordination', ar: 'تنسيق' },
                                  { de: 'Ihr CRM bleibt', en: 'Your CRM stays', fr: 'Votre CRM reste', ar: 'يبقى نظامكم' },
                                ][j][language] ?? ''
                              }
                            </p>
                          </div>
                        ))}
                      </div>
                    </Reveal>
                  )}
                </div>
              );
            })}
          </div>
      </Panel>

      {/* Why immob24 — closing argument, links to the deep-dive */}
      <div id="why-immob24">
        <WhyImmob24Teaser />
      </div>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container text-center max-w-2xl mx-auto">
          <Reveal>
            <h2 className="font-heading text-section-mobile md:text-section text-charcoal text-balance">
              {L('ctaHeadline')}
            </h2>
            <p className="mt-4 text-body-lg text-slate">{L('ctaBody')}</p>
            <button
              type="button"
              {...DEMO_CTA_PROPS}
              onClick={() => trackEvent('solutions_cta_click')}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-golden px-7 py-3.5 font-semibold text-[#1E1B16] shadow-golden"
            >
              {L('ctaButton')}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </button>
          </Reveal>
        </div>
      </section>

      <SectionHopButton />
      <Footer />
    </div>
  );
}
