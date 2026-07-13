// Compliance page — /de/compliance + /en/compliance (+ fr/ar)
//
// Content sources (draft/ai-refinement):
//   - Pitch deck slide 6 (five compliance pillars)
//   - Notion "German & EU Compliance Reference — IMMOB24" catalogue
//
// IMPORTANT (claims accuracy): only laws the catalogue marks
// "Implemented & verified in code" are featured here. Items the catalogue
// flags as partial/gap (e.g. GwG/KYC, Art. 28 DPA files) are deliberately
// NOT claimed. Language is "by design / built in", never "certified".

import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  Eye,
  FileCheck2,
  Fingerprint,
  Globe2,
  Landmark,
  Lock,
  ScrollText,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header, Footer, DEMO_CTA_PROPS } from '../components/SiteChrome';
import { HeroWaves } from '../components/HeroWaves';
import { Reveal, RevealGroup, TypeOnce } from '../lib/animations';
import { ScrollCue } from '../components/Wayfinding';
import { SceneApprovalGate } from '../components/scenes';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { useJsonLd } from '../lib/useJsonLd';
import { breadcrumbSchema } from '../lib/schema';
import type { Language } from '../i18n';
import { useLanguage } from '../i18n';
import { SITE_ORIGIN, pathFor, urlFor } from '../i18n/pages';

type Copy = Record<Language, string>;

type Pillar = {
  icon: LucideIcon;
  title: Copy;
  body: Copy;
};

// Deck slide 6 — the five pillars, verbatim intent.
const PILLARS: Pillar[] = [
  {
    icon: Eye,
    title: {
      de: 'Volle Sichtbarkeit',
      en: 'Full visibility',
      fr: 'Visibilité totale',
      ar: 'رؤية كاملة',
    },
    body: {
      de: 'Jede KI-Aktion ist sichtbar, bevor sie passiert. Freigabe erforderlich — Übersteuerung jederzeit mit einem Klick.',
      en: 'See every AI action before it happens. Approval required — one-tap override always available.',
      fr: 'Chaque action de l’IA est visible avant son exécution. Validation requise — reprise de contrôle possible à tout moment, en un clic.',
      ar: 'كل إجراء للذكاء الاصطناعي مرئي قبل تنفيذه. الموافقة مطلوبة — ويمكنكم التدخل وإلغاء الإجراء في أي وقت بنقرة واحدة.',
    },
  },
  {
    icon: ScrollText,
    title: {
      de: 'Auditierbar by Design',
      en: 'Auditable by design',
      fr: 'Auditable dès la conception',
      ar: 'قابلية التدقيق بحكم التصميم',
    },
    body: {
      de: 'Jede KI-Entscheidung ist transparent und protokolliert. Keine Blackbox — volle Nachvollziehbarkeit für Aufsicht und Makler.',
      en: 'Every AI decision is transparent and logged. No black boxes — full traceability for regulators and agents.',
      fr: 'Chaque décision de l’IA est transparente et journalisée. Pas de boîte noire — traçabilité complète pour les autorités de contrôle et les agents.',
      ar: 'كل قرار للذكاء الاصطناعي شفاف ومسجَّل. لا صناديق سوداء — إمكانية تتبع كاملة للجهات الرقابية والوسطاء.',
    },
  },
  {
    icon: ShieldCheck,
    title: {
      de: 'DSGVO durch Architektur',
      en: 'GDPR by architecture',
      fr: 'RGPD par l’architecture',
      ar: 'التوافق مع GDPR بحكم البنية',
    },
    body: {
      de: 'Datenverarbeitung, Einwilligung und Verarbeitung sind by design konform — nicht nachträglich angeflanscht.',
      en: 'Data handling, consent and processing are compliant by design — not bolted on as an afterthought.',
      fr: 'La gestion des données, le consentement et les traitements sont conformes dès la conception — et non ajoutés après coup.',
      ar: 'التعامل مع البيانات والموافقة والمعالجة متوافقة بحكم التصميم — وليست إضافة لاحقة.',
    },
  },
  {
    icon: Fingerprint,
    title: {
      de: 'EU AI Act ready',
      en: 'EU AI Act ready',
      fr: 'Prêt pour l’EU AI Act',
      ar: 'جاهز لقانون EU AI Act',
    },
    body: {
      de: 'Von Grund auf für den EU AI Act gebaut: Risikoklassifizierung, Transparenz und menschliche Aufsicht sind eingebaut.',
      en: 'Built from scratch for the EU AI Act: risk classification, transparency and human oversight built in.',
      fr: 'Conçu dès le départ pour l’EU AI Act : classification des risques, transparence et supervision humaine intégrées.',
      ar: 'مبني من الأساس وفقًا لقانون EU AI Act: تصنيف المخاطر والشفافية والإشراف البشري مدمجة في المنصة.',
    },
  },
  {
    icon: Globe2,
    title: {
      de: 'Mehrsprachig nativ',
      en: 'Multilingual native',
      fr: 'Multilingue nativement',
      ar: 'متعدد اللغات أصلاً',
    },
    body: {
      de: 'Deutsch, Französisch, Englisch, Arabisch — von Tag eins in der Architektur. Kein Retrofit, keine Übersetzungslücken.',
      en: 'German, French, English, Arabic — architected from day one. No retrofit, no translation gaps.',
      fr: 'Allemand, français, anglais, arabe — intégrés à l’architecture dès le premier jour. Pas de rétrofit, pas de lacunes de traduction.',
      ar: 'الألمانية والفرنسية والإنجليزية والعربية — في صميم البنية منذ اليوم الأول. لا تعديلات لاحقة ولا فجوات في الترجمة.',
    },
  },
];

type LawRow = {
  law: Copy;
  what: Copy;
  how: Copy;
};

// Only "Implemented & verified in code" entries from the compliance catalogue.
const GDPR_ROWS: LawRow[] = [
  {
    law: {
      de: 'DSGVO Art. 5–6',
      en: 'DSGVO Art. 5–6',
      fr: 'RGPD Art. 5–6',
      ar: 'DSGVO Art. 5–6',
    },
    what: {
      de: 'Grundsätze & Rechtsgrundlage',
      en: 'Principles & lawful basis',
      fr: 'Principes et base légale',
      ar: 'المبادئ والأساس القانوني',
    },
    how: {
      de: 'Nur notwendige Felder werden erhoben; jede Verarbeitung hat eine dokumentierte Rechtsgrundlage.',
      en: 'Only necessary fields are collected; every processing activity has a recorded lawful basis.',
      fr: 'Seuls les champs nécessaires sont collectés ; chaque traitement repose sur une base légale documentée.',
      ar: 'تُجمع الحقول الضرورية فقط؛ ولكل عملية معالجة أساس قانوني موثَّق.',
    },
  },
  {
    law: {
      de: 'DSGVO Art. 7',
      en: 'DSGVO Art. 7',
      fr: 'RGPD Art. 7',
      ar: 'DSGVO Art. 7',
    },
    what: {
      de: 'Einwilligung & Widerruf',
      en: 'Consent & withdrawal',
      fr: 'Consentement et retrait',
      ar: 'الموافقة وسحبها',
    },
    how: {
      de: 'Einwilligungen werden protokolliert und sind genauso einfach widerrufbar wie erteilt.',
      en: 'Consent is recorded and can be withdrawn as easily as it was given.',
      fr: 'Les consentements sont journalisés et peuvent être retirés aussi simplement qu’ils ont été donnés.',
      ar: 'تُسجَّل الموافقات ويمكن سحبها بنفس سهولة منحها.',
    },
  },
  {
    law: {
      de: 'DSGVO Art. 22',
      en: 'DSGVO Art. 22',
      fr: 'RGPD Art. 22',
      ar: 'DSGVO Art. 22',
    },
    what: {
      de: 'Keine KI-Entscheidung ohne Menschen',
      en: 'No AI decision without a human',
      fr: 'Aucune décision de l’IA sans humain',
      ar: 'لا قرار للذكاء الاصطناعي دون إنسان',
    },
    how: {
      de: 'Lead-Scoring und Matching haben einen vollständigen Anfrage-→ Prüfung-→ Entscheidung-Loop mit menschlicher Aufsicht und nutzerseitiger Erklärung.',
      en: 'Lead scoring and matching carry a full request → review → resolve loop with human oversight and a user-facing explanation.',
      fr: 'Le scoring des leads et le matching suivent un cycle complet demande → examen → décision, avec supervision humaine et explication accessible à l’utilisateur.',
      ar: 'يمر تقييم العملاء المحتملين والمطابقة بدورة كاملة: طلب ← مراجعة ← قرار، مع إشراف بشري وشرح موجَّه للمستخدم.',
    },
  },
  {
    law: {
      de: 'TTDSG §25',
      en: 'TTDSG §25',
      fr: 'TTDSG §25',
      ar: 'TTDSG §25',
    },
    what: {
      de: 'Cookie-Einwilligung',
      en: 'Cookie consent',
      fr: 'Consentement aux cookies',
      ar: 'الموافقة على ملفات تعريف الارتباط',
    },
    how: {
      de: 'Tracking, Marketing und Chat laden erst nach ausdrücklicher Einwilligung — auch auf dieser Website.',
      en: 'Analytics, marketing and chat only load after explicit consent — including on this website.',
      fr: 'Le tracking, le marketing et le chat ne se chargent qu’après un consentement explicite — y compris sur ce site web.',
      ar: 'لا تُحمَّل أدوات التتبع والتسويق والدردشة إلا بعد موافقة صريحة — بما في ذلك على هذا الموقع.',
    },
  },
  {
    law: {
      de: 'EU AI Act Art. 50',
      en: 'EU AI Act Art. 50',
      fr: 'EU AI Act Art. 50',
      ar: 'EU AI Act Art. 50',
    },
    what: {
      de: 'KI-Transparenz',
      en: 'AI transparency',
      fr: 'Transparence de l’IA',
      ar: 'شفافية الذكاء الاصطناعي',
    },
    how: {
      de: 'KI-Chat und KI-generierte Inhalte sind als solche gekennzeichnet.',
      en: 'AI chat and AI-generated content are labelled as such.',
      fr: 'Le chat IA et les contenus générés par l’IA sont signalés comme tels.',
      ar: 'دردشة الذكاء الاصطناعي والمحتوى المولَّد بالذكاء الاصطناعي مُعلَّمان بوضوح على هذا النحو.',
    },
  },
];

const GERMAN_RE_ROWS: LawRow[] = [
  {
    law: {
      de: 'BGB §656a–d',
      en: 'BGB §656a–d',
      fr: 'BGB §656a–d',
      ar: 'BGB §656a–d',
    },
    what: {
      de: 'Maklerprovision',
      en: 'Broker commission',
      fr: 'Commission de courtage',
      ar: 'عمولة الوساطة العقارية',
    },
    how: {
      de: 'Textform, 50/50-Teilung und Provisionslogik sind in der Plattform abgebildet.',
      en: 'Text-form requirement, 50/50 split and commission logic are modelled in the platform.',
      fr: 'L’exigence de forme écrite, le partage 50/50 et la logique de commission sont modélisés dans la plateforme.',
      ar: 'متطلب الصيغة النصية وتقسيم العمولة 50/50 ومنطق العمولة مطبَّقة في المنصة.',
    },
  },
  {
    law: {
      de: 'GewO §34c',
      en: 'GewO §34c',
      fr: 'GewO §34c',
      ar: 'GewO §34c',
    },
    what: {
      de: 'Maklererlaubnis',
      en: 'Broker licence',
      fr: 'Licence d’agent immobilier',
      ar: 'ترخيص الوسيط العقاري',
    },
    how: {
      de: 'Die §34c-Erlaubnis wird im Maklerprofil erfasst.',
      en: 'The §34c licence is recorded on the agent profile.',
      fr: 'La licence §34c est enregistrée dans le profil de l’agent.',
      ar: 'يُسجَّل ترخيص §34c في الملف الشخصي للوسيط.',
    },
  },
  {
    law: {
      de: 'GEG',
      en: 'GEG',
      fr: 'GEG',
      ar: 'GEG',
    },
    what: {
      de: 'Energieausweis-Pflichtangaben',
      en: 'Energy-certificate disclosures',
      fr: 'Mentions obligatoires du certificat énergétique',
      ar: 'البيانات الإلزامية لشهادة الطاقة',
    },
    how: {
      de: 'Energiefelder (Klasse, Verbrauch, Heizung) sind Pflicht auf jedem Inserat.',
      en: 'Energy fields (class, consumption, heating) are required on every listing.',
      fr: 'Les champs énergétiques (classe, consommation, chauffage) sont obligatoires sur chaque annonce.',
      ar: 'حقول الطاقة (الفئة، الاستهلاك، التدفئة) إلزامية في كل إعلان عقاري.',
    },
  },
  {
    law: {
      de: 'AGG §19',
      en: 'AGG §19',
      fr: 'AGG §19',
      ar: 'AGG §19',
    },
    what: {
      de: 'Diskriminierungsfreie Inserate',
      en: 'Fair-housing listings',
      fr: 'Annonces sans discrimination',
      ar: 'إعلانات خالية من التمييز',
    },
    how: {
      de: 'KI-generierte Exposé-Texte vermeiden diskriminierende Formulierungen.',
      en: 'AI-generated listing copy avoids discriminatory wording.',
      fr: 'Les textes d’exposés générés par l’IA évitent toute formulation discriminatoire.',
      ar: 'تتجنب نصوص العروض المولَّدة بالذكاء الاصطناعي الصياغات التمييزية.',
    },
  },
  {
    law: {
      de: 'GoBD / AO §147',
      en: 'GoBD / AO §147',
      fr: 'GoBD / AO §147',
      ar: 'GoBD / AO §147',
    },
    what: {
      de: 'Revisionssichere Aufbewahrung',
      en: 'Tamper-proof retention',
      fr: 'Conservation à valeur probante',
      ar: 'حفظ مؤمَّن ضد التلاعب',
    },
    how: {
      de: 'Verschlüsselte Belege mit 10 Jahren Aufbewahrung (S3 Object-Lock) und hash-verkettetem Audit-Log — Stornorechnung statt Löschen.',
      en: 'Encrypted records with 10-year retention (S3 Object-Lock) and a hash-chained audit log — corrective invoices, never edit or delete.',
      fr: 'Justificatifs chiffrés avec conservation de 10 ans (S3 Object-Lock) et journal d’audit chaîné par hachage — facture d’annulation au lieu de la suppression.',
      ar: 'مستندات مشفَّرة مع حفظ لمدة 10 سنوات (S3 Object-Lock) وسجل تدقيق مترابط بالتجزئة — فاتورة إلغاء بدلًا من الحذف.',
    },
  },
  {
    law: {
      de: 'UStG / PAngV / UWG',
      en: 'UStG / PAngV / UWG',
      fr: 'UStG / PAngV / UWG',
      ar: 'UStG / PAngV / UWG',
    },
    what: {
      de: 'Rechnungen, Preise, E-Mail-Marketing',
      en: 'Invoices, pricing, email marketing',
      fr: 'Factures, prix, marketing par e-mail',
      ar: 'الفواتير والأسعار والتسويق عبر البريد الإلكتروني',
    },
    how: {
      de: '12-Punkte-Rechnungsprüfung mit VIES-USt-ID-Validierung, volle Preis- und Provisionsangabe am Inserat, One-Click-Abmeldung (RFC 8058).',
      en: '12-field invoice checks with VIES VAT-ID validation, full price and commission shown on listings, one-click unsubscribe (RFC 8058).',
      fr: 'Contrôle des factures en 12 points avec validation du numéro de TVA via VIES, affichage complet du prix et de la commission sur l’annonce, désabonnement en un clic (RFC 8058).',
      ar: 'فحص للفواتير من 12 بندًا مع التحقق من رقم ضريبة القيمة المضافة عبر VIES، وعرض كامل للسعر والعمولة في الإعلان، وإلغاء الاشتراك بنقرة واحدة (RFC 8058).',
    },
  },
];

const TABLE_HEADERS: { law: Copy; what: Copy; how: Copy } = {
  law: {
    de: 'Vorschrift',
    en: 'Regulation',
    fr: 'Réglementation',
    ar: 'اللائحة',
  },
  what: {
    de: 'Worum es geht',
    en: 'What it covers',
    fr: 'Ce que cela couvre',
    ar: 'ما تغطيه',
  },
  how: {
    de: 'So setzt Immob24 es um',
    en: 'How immob24 implements it',
    fr: 'Comment Immob24 le met en œuvre',
    ar: 'كيف تطبّقه Immob24',
  },
};

const LawTable = ({ rows, language }: { rows: LawRow[]; language: Language }) => (
  <div className="overflow-x-auto rounded-2xl border border-charcoal/5 bg-white shadow-subtle">
    <table className="w-full min-w-[640px] text-left text-sm">
      <thead>
        <tr className="border-b border-charcoal/10 text-xs uppercase tracking-wide text-warm-gray">
          <th className="px-5 py-3 font-semibold">
            {TABLE_HEADERS.law[language] ?? TABLE_HEADERS.law.en}
          </th>
          <th className="px-5 py-3 font-semibold">
            {TABLE_HEADERS.what[language] ?? TABLE_HEADERS.what.en}
          </th>
          <th className="px-5 py-3 font-semibold">
            {TABLE_HEADERS.how[language] ?? TABLE_HEADERS.how.en}
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.law.en} className="border-b border-charcoal/5 last:border-none align-top">
            <td className="px-5 py-4 font-metric font-semibold text-charcoal whitespace-nowrap">
              {r.law[language] ?? r.law.en}
            </td>
            <td className="px-5 py-4 text-charcoal">{r.what[language] ?? r.what.en}</td>
            <td className="px-5 py-4 text-slate">{r.how[language] ?? r.how.en}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function CompliancePage() {
  const { language } = useLanguage();
  const L = <T,>(v: Record<Language, T>): T => v[language] ?? v.en;
  useDocumentMeta({
    title: L({
      de: 'Compliance — DSGVO & EU AI Act by Design | Immob24',
      en: 'Compliance — GDPR & EU AI Act by design | Immob24',
      fr: 'Conformité — RGPD & EU AI Act dès la conception | Immob24',
      ar: 'الامتثال — GDPR وقانون EU AI Act بحكم التصميم | Immob24',
    }),
    description: L({
      de: 'KI für Immobilienmakler, gebaut für die europäische Regulierung: menschliche Aufsicht, Audit-Trail, Einwilligungs-Management und deutsches Maklerrecht — by design.',
      en: 'AI for real estate agents built for European regulation: human oversight, audit trail, consent management and German brokerage law — by design.',
      fr: 'L’IA pour agents immobiliers, conçue pour la réglementation européenne : supervision humaine, piste d’audit, gestion du consentement et droit allemand du courtage — dès la conception.',
      ar: 'ذكاء اصطناعي لوسطاء العقارات مصمم للتنظيم الأوروبي: إشراف بشري، وسجل تدقيق، وإدارة الموافقات، وقانون الوساطة العقارية الألماني — بحكم التصميم.',
    }),
    canonical: `${SITE_ORIGIN}${pathFor('compliance', language)}`,
    alternates: [
      { hreflang: 'de', href: urlFor('compliance', 'de') },
      { hreflang: 'en', href: urlFor('compliance', 'en') },
      { hreflang: 'fr', href: urlFor('compliance', 'fr') },
      { hreflang: 'ar', href: urlFor('compliance', 'ar') },
      { hreflang: 'x-default', href: urlFor('compliance', 'de') },
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
        { name: 'Compliance', path: pathFor('compliance', language) },
      ]),
    ],
    'compliance',
  );

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      {/* Hero */}
      <section className="relative pt-36 pb-14 md:pt-44 md:pb-20 overflow-hidden bg-gradient-to-b from-cream to-white">
      <HeroWaves />
        <div className="container relative text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-golden/30 bg-white px-4 py-1.5 text-xs font-medium text-golden-dark shadow-subtle">
            <ShieldCheck className="h-3.5 w-3.5" />
            {L({
              de: 'DSGVO · EU AI Act · Deutsches Maklerrecht',
              en: 'GDPR · EU AI Act · German brokerage law',
              fr: 'RGPD · EU AI Act · Droit allemand du courtage',
              ar: 'GDPR · EU AI Act · قانون الوساطة العقارية الألماني',
            })}
          </span>
          <h1 className="mt-6 font-heading text-hero-mobile md:text-hero text-charcoal text-balance">
            <TypeOnce text={L({
              de: 'Konform für Europa gebaut — von Tag eins',
              en: 'Built compliant for Europe — from day one',
              fr: 'Conçu conforme pour l’Europe — dès le premier jour',
              ar: 'مبني ليكون متوافقًا مع أوروبا — منذ اليوم الأول',
            })} />
          </h1>
          <p className="mt-6 text-body-lg text-slate max-w-2xl mx-auto">
            {L({
              de: 'Die meisten KI-Tools ignorieren europäische Regulierung. Immob24 ist andersherum gebaut: Das härteste Regulierungsumfeld Europas ist unsere Architektur-Vorgabe — nicht unser Nachtrag.',
              en: 'Most AI tools ignore European regulation. Immob24 is built the other way round: Europe’s hardest regulatory environment is our architectural requirement — not an afterthought.',
              fr: 'La plupart des outils d’IA ignorent la réglementation européenne. Immob24 est construit dans l’autre sens : l’environnement réglementaire le plus exigeant d’Europe est notre exigence architecturale — pas une réflexion après coup.',
              ar: 'تتجاهل معظم أدوات الذكاء الاصطناعي التنظيم الأوروبي. أما Immob24 فمبنية بالاتجاه المعاكس: البيئة التنظيمية الأكثر صرامة في أوروبا هي متطلبنا المعماري — وليست فكرة لاحقة.',
            })}
          </p>

          <ScrollCue targetId="pillars" className="mt-10" />
        </div>
      </section>

      {/* Five pillars */}
      <section id="pillars" className="py-16 md:py-20 bg-white">
        <div className="container">
          <Reveal as="h2" className="font-heading text-section-mobile md:text-section text-charcoal max-w-2xl">
            {L({
              de: 'Fünf Prinzipien, in die Plattform gebaut',
              en: 'Five principles, built into the platform',
              fr: 'Cinq principes, intégrés à la plateforme',
              ar: 'خمسة مبادئ مدمجة في المنصة',
            })}
          </Reveal>
          <RevealGroup className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PILLARS.map((p) => (
              <article
                key={p.title.en}
                className="rounded-2xl border border-charcoal/5 bg-cream/60 p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-golden/10 text-golden-dark">
                  <p.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-heading text-lg text-charcoal">{L(p.title)}</h3>
                <p className="mt-2 text-sm text-slate">{L(p.body)}</p>
              </article>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* GDPR / AI Act table */}
      <section className="py-16 md:py-20">
        <div className="container">
          <Reveal className="flex items-center gap-3">
            <Lock className="h-6 w-6 text-golden-dark" />
            <h2 className="font-heading text-section-mobile md:text-section text-charcoal">
              {L({
                de: 'Datenschutz & KI-Aufsicht',
                en: 'Data protection & AI oversight',
                fr: 'Protection des données & supervision de l’IA',
                ar: 'حماية البيانات والإشراف على الذكاء الاصطناعي',
              })}
            </h2>
          </Reveal>
          <Reveal delay={100} as="p" className="mt-3 max-w-2xl text-slate">
            {L({
              de: 'Wie die Plattform zentrale DSGVO-Artikel und die KI-Transparenzpflichten umsetzt.',
              en: 'How the platform implements core GDPR articles and AI-transparency duties.',
              fr: 'Comment la plateforme met en œuvre les articles clés du RGPD et les obligations de transparence de l’IA.',
              ar: 'كيف تطبِّق المنصة المواد الأساسية من اللائحة العامة لحماية البيانات والتزامات شفافية الذكاء الاصطناعي.',
            })}
          </Reveal>
          <Reveal className="mt-8">
            <LawTable rows={GDPR_ROWS} language={language} />
          </Reveal>
        </div>
      </section>

      {/* German real-estate law table */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container">
          <Reveal className="flex items-center gap-3">
            <Landmark className="h-6 w-6 text-golden-dark" />
            <h2 className="font-heading text-section-mobile md:text-section text-charcoal">
              {L({
                de: 'Deutsches Maklerrecht — eingebaut',
                en: 'German brokerage law — built in',
                fr: 'Droit allemand du courtage — intégré',
                ar: 'قانون الوساطة العقارية الألماني — مدمج',
              })}
            </h2>
          </Reveal>
          <Reveal delay={100} as="p" className="mt-3 max-w-2xl text-slate">
            {L({
              de: 'Vom Provisionsrecht über Energieausweis-Pflichten bis zur revisionssicheren Aufbewahrung: Die Regeln des deutschen Maklergeschäfts sind Teil der Plattform-Logik.',
              en: 'From commission law and energy-certificate duties to tamper-proof retention: the rules of German brokerage are part of the platform logic.',
              fr: 'Du droit de la commission et des obligations du certificat énergétique jusqu’à la conservation à valeur probante : les règles du courtage immobilier allemand font partie de la logique de la plateforme.',
              ar: 'من قانون العمولة والتزامات شهادة الطاقة إلى الحفظ المؤمَّن ضد التلاعب: قواعد الوساطة العقارية الألمانية جزء من منطق المنصة.',
            })}
          </Reveal>
          <Reveal className="mt-8">
            <LawTable rows={GERMAN_RE_ROWS} language={language} />
          </Reveal>
          <p className="mt-4 text-xs text-warm-gray max-w-2xl">
            {L({
              de: 'Hinweis: Diese Seite beschreibt Produktfunktionen und Architekturprinzipien. Sie ist keine Rechtsberatung und keine Zertifizierung.',
              en: 'Note: this page describes product features and architecture principles. It is not legal advice and not a certification.',
              fr: 'Remarque : cette page décrit des fonctionnalités produit et des principes d’architecture. Elle ne constitue ni un conseil juridique ni une certification.',
              ar: 'ملاحظة: تصف هذه الصفحة ميزات المنتج ومبادئ البنية. وهي ليست استشارة قانونية ولا شهادة اعتماد.',
            })}
          </p>
        </div>
      </section>

      {/* Human-in-the-loop banner + CTA */}
      <section className="py-14 band-dark bg-charcoal text-white">
        <div className="container grid lg:grid-cols-[1fr,minmax(300px,26rem)] items-center gap-8">
          <Reveal direction="left">
            <div className="flex items-center gap-2 text-golden">
              <UserCheck className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-wide">
                {L({
                  de: 'Der Mensch bleibt am Steuer',
                  en: 'The human stays in charge',
                  fr: 'L’humain reste aux commandes',
                  ar: 'الإنسان يبقى في موقع القيادة',
                })}
              </span>
            </div>
            <h2 className="mt-3 font-heading text-2xl md:text-3xl max-w-2xl text-white">
              {L({
                de: 'Keine Aktion ohne Sichtbarkeit. Keine Kampagne ohne Freigabe. Kein Scoring ohne Prüfweg.',
                en: 'No action without visibility. No campaign without approval. No scoring without a review path.',
                fr: 'Aucune action sans visibilité. Aucune campagne sans validation. Aucun scoring sans piste de contrôle.',
                ar: 'لا إجراء دون رؤية. لا حملة دون موافقة. لا تقييم دون مسار مراجعة.',
              })}
            </h2>
          </Reveal>
          <Reveal direction="right" className="space-y-5">
            <SceneApprovalGate />
            <div className="flex flex-wrap gap-3">
            <Link
              to={pathFor('aiFeatures', language)}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-medium hover:bg-white/10 transition-colors"
            >
              <FileCheck2 className="h-4 w-4" />
              {L({
                de: 'Die 7 KI-Funktionen',
                en: 'The 7 AI features',
                fr: 'Les 7 fonctions IA',
                ar: 'وظائف الذكاء الاصطناعي السبع',
              })}
            </Link>
            <button
              type="button"
              {...DEMO_CTA_PROPS}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-golden px-5 py-2.5 text-sm font-semibold text-[#1E1B16] shadow-golden"
            >
              {L({
                de: 'Demo anfragen',
                en: 'Request a demo',
                fr: 'Demander une démo',
                ar: 'اطلب عرضًا توضيحيًا',
              })}
              <ArrowRight className="h-4 w-4" />
            </button>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
