// AI Features platform page — /de/ki-funktionen + /en/ai-features-platform
//
// Content sources (draft/ai-refinement):
//   - Investor pitch deck slides 3–4 (7 AI co-workers, headline metrics)
//   - immob24_India_v2 demo video content script (feature order + on-screen
//     details; chapter times mirror DemoVideoPlayer)
// Copy is inline DE/EN/FR/AR (SEO-page pattern) — translations.ts untouched.

import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  CheckCircle2,
  FileText,
  KanbanSquare,
  Link2,
  MessageSquareText,
  Megaphone,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header, Footer, DEMO_CTA_PROPS } from '../components/SiteChrome';
import { Reveal, RevealGroup, TypeOnce } from '../lib/animations';
import { ScrollCue } from '../components/Wayfinding';
import { SceneAgents, SceneApprovalGate } from '../components/scenes';
import { DemoVideoPlayer } from '../components/DemoVideoPlayer';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { useJsonLd } from '../lib/useJsonLd';
import { breadcrumbSchema } from '../lib/schema';
import { useLanguage } from '../i18n';
import type { Language } from '../i18n';
import { SITE_ORIGIN, pathFor, urlFor } from '../i18n/pages';

type Feature = {
  icon: LucideIcon;
  // Product screenshot extracted from the demo video (public/videos/features/)
  shot: string;
  title: Record<Language, string>;
  lead: Record<Language, string>;
  points: Record<Language, string[]>;
};

const FEATURES: Feature[] = [
  {
    icon: FileText,
    shot: '/videos/features/f1-pdf-extraction.jpg',
    title: {
      de: 'PDF → KI-Exposé in 30 Sekunden',
      en: 'PDF to AI listing in 30 seconds',
      fr: 'Du PDF à l’annonce IA en 30 secondes',
      ar: 'من PDF إلى عرض عقاري بالذكاء الاصطناعي في 30 ثانية',
    },
    lead: {
      de: 'Exposé-PDF hochladen — die KI extrahiert Daten, zählt Räume und Wohnfläche und erstellt ein veröffentlichungsfertiges Inserat.',
      en: 'Drop an exposé PDF — the AI extracts the data, counts rooms and living space, and produces a publish-ready listing.',
      fr: 'Téléchargez un PDF d’exposé — l’IA extrait les données, compte les pièces et la surface habitable et crée une annonce prête à publier.',
      ar: 'حمّلوا ملف PDF للعرض العقاري — يستخرج الذكاء الاصطناعي البيانات ويحسب عدد الغرف والمساحة السكنية وينشئ إعلانًا جاهزًا للنشر.',
    },
    points: {
      de: [
        'Extraktion → Anreicherung → Review in einer Pipeline',
        'Texte, Details und Formatierung — komplett generiert',
        'Als Entwurf speichern oder direkt veröffentlichen',
      ],
      en: [
        'Extract → enrich → review in one pipeline',
        'Copy, details and formatting — fully generated',
        'Save as draft or publish straight away',
      ],
      fr: [
        'Extraction → enrichissement → révision dans un seul pipeline',
        'Textes, détails et mise en forme — entièrement générés',
        'Enregistrer comme brouillon ou publier directement',
      ],
      ar: [
        'الاستخراج ← الإثراء ← المراجعة في مسار عمل واحد',
        'النصوص والتفاصيل والتنسيق — مولَّدة بالكامل',
        'الحفظ كمسودة أو النشر مباشرةً',
      ],
    },
  },
  {
    icon: Sparkles,
    shot: '/videos/features/f2-enrichment.jpg',
    title: {
      de: 'KI-Objektanreicherung',
      en: 'AI property enrichment',
      fr: 'Enrichissement immobilier par IA',
      ar: 'إثراء بيانات العقارات بالذكاء الاصطناعي',
    },
    lead: {
      de: 'Jedes Objekt bekommt automatisch Markt- und Lage-Intelligenz — von Nachbarschaftsdaten bis Preissimulation.',
      en: 'Every property is automatically enriched with market and locality intelligence — from neighborhood data to price simulation.',
      fr: 'Chaque bien est automatiquement enrichi d’une intelligence de marché et de localisation — des données de quartier à la simulation de prix.',
      ar: 'يحصل كل عقار تلقائيًا على معلومات ذكية عن السوق والموقع — من بيانات الحي إلى محاكاة الأسعار.',
    },
    points: {
      de: [
        'Lage-Intelligenz: Schulen, Parks, ÖPNV, Ladeinfrastruktur — automatisch erfasst',
        'KI-Beschreibung, Medien-Analyse, Zielgruppen-Profil',
        'Preis-Intelligenz und Preissimulation je Objekt',
      ],
      en: [
        'Locality intelligence: schools, parks, transit, EV charging — auto-collected',
        'AI description, media intelligence, target-audience profile',
        'Price intelligence and price simulation per property',
      ],
      fr: [
        'Intelligence de localisation : écoles, parcs, transports, bornes de recharge — collectée automatiquement',
        'Description IA, analyse des médias, profil du groupe cible',
        'Intelligence tarifaire et simulation de prix pour chaque bien',
      ],
      ar: [
        'ذكاء الموقع: المدارس والحدائق والمواصلات العامة ومحطات الشحن — تُجمع تلقائيًا',
        'وصف بالذكاء الاصطناعي، وتحليل الوسائط، وملف الجمهور المستهدف',
        'ذكاء التسعير ومحاكاة السعر لكل عقار',
      ],
    },
  },
  {
    icon: Link2,
    shot: '/videos/features/f3-blink-buyer.jpg',
    title: {
      de: 'Smartes B-Link Objekt-Sharing',
      en: 'Smart B-Link property sharing',
      fr: 'Partage intelligent de biens avec B-Link',
      ar: 'مشاركة ذكية للعقارات عبر B-Link',
    },
    lead: {
      de: 'Ein Käufer-Link pro Objekt — mit integrierter KI, die Fragen sofort beantwortet und Interessenten aktiv begleitet.',
      en: 'One buyer link per property — with built-in AI that answers questions instantly and proactively engages visitors.',
      fr: 'Un lien acheteur par bien — avec une IA intégrée qui répond instantanément aux questions et accompagne activement les prospects.',
      ar: 'رابط واحد للمشترين لكل عقار — مع ذكاء اصطناعي مدمج يجيب عن الأسئلة فورًا ويرافق المهتمين بفاعلية.',
    },
    points: {
      de: [
        'Q&A- oder Proaktiv-Modus, QR-Code, WhatsApp- und E-Mail-Sharing',
        'Link-Statistiken: Aufrufe, Chat-Sessions, Rückruf-Anfragen',
        'Interessenten stellen Fragen direkt am Exposé',
      ],
      en: [
        'Q&A or proactive mode, QR code, WhatsApp and email sharing',
        'Link stats: views, chat sessions, call requests',
        'Buyers ask questions right on the listing',
      ],
      fr: [
        'Mode Q&R ou proactif, QR code, partage par WhatsApp et e-mail',
        'Statistiques du lien : vues, sessions de chat, demandes de rappel',
        'Les acheteurs posent leurs questions directement sur l’annonce',
      ],
      ar: [
        'وضع الأسئلة والأجوبة أو الوضع الاستباقي، رمز QR، ومشاركة عبر WhatsApp والبريد الإلكتروني',
        'إحصاءات الرابط: المشاهدات وجلسات المحادثة وطلبات الاتصال',
        'يطرح المهتمون أسئلتهم مباشرةً على العرض العقاري',
      ],
    },
  },
  {
    icon: MessageSquareText,
    shot: '/videos/features/f4-bee-chat.jpg',
    title: {
      de: '24/7 mehrsprachiger KI-Assistent',
      en: '24/7 multilingual AI assistant',
      fr: 'Assistant IA multilingue 24 h/24, 7 j/7',
      ar: 'مساعد ذكاء اصطناعي متعدد اللغات على مدار الساعة',
    },
    lead: {
      de: 'Bee beantwortet Anfragen rund um die Uhr — im Chat und sogar im Sprachanruf, in der Sprache des Interessenten.',
      en: 'Bee answers inquiries around the clock — in chat and even on voice calls, in the buyer’s language.',
      fr: 'Bee répond aux demandes 24 h/24 — par chat et même par appel vocal, dans la langue du prospect.',
      ar: 'يجيب Bee عن الاستفسارات على مدار الساعة — عبر المحادثة وحتى عبر المكالمات الصوتية، وبلغة العميل المهتم.',
    },
    points: {
      de: [
        'Antwortet in 3 Sekunden, 24/7 — kein Lead geht verloren',
        'Qualifiziert Interessenten und erfasst Kontaktdaten im Gespräch',
        'Chat und Live-Sprachanruf mit KI-Agentin',
      ],
      en: [
        'Responds in 3 seconds, 24/7 — no lead goes cold',
        'Qualifies buyers and captures contact details in conversation',
        'Chat plus live voice calls with the AI agent',
      ],
      fr: [
        'Répond en 3 secondes, 24 h/24 et 7 j/7 — aucun lead ne se perd',
        'Qualifie les prospects et recueille leurs coordonnées au fil de la conversation',
        'Chat et appels vocaux en direct avec l’agente IA',
      ],
      ar: [
        'يرد خلال 3 ثوانٍ، على مدار الساعة — لا يضيع أي عميل محتمل',
        'يؤهّل المهتمين ويسجّل بيانات الاتصال أثناء المحادثة',
        'محادثة نصية ومكالمات صوتية مباشرة مع وكيل الذكاء الاصطناعي',
      ],
    },
  },
  {
    icon: UserCheck,
    shot: '/videos/features/f5-human-control.jpg',
    title: {
      de: 'KI-Chat mit menschlicher Kontrolle',
      en: 'AI chat with human control',
      fr: 'Chat IA sous contrôle humain',
      ar: 'محادثة ذكاء اصطناعي بإشراف بشري',
    },
    lead: {
      de: 'Volle Transparenz im Posteingang: Die KI antwortet — Sie übernehmen jederzeit mit einem Klick.',
      en: 'Full transparency in the inbox: the AI responds — you take over any conversation with one click.',
      fr: 'Transparence totale dans la boîte de réception : l’IA répond — vous reprenez la main à tout moment d’un simple clic.',
      ar: 'شفافية كاملة في صندوق الوارد: يجيب الذكاء الاصطناعي — وتتولّون زمام الأمور في أي وقت بنقرة واحدة.',
    },
    points: {
      de: [
        '„Take over / Release" — nahtloser Wechsel zwischen KI und Mensch',
        'Lead-Scoring: HOT / WARM / COLD auf einen Blick',
        'Jede KI-Aktion sichtbar und nachvollziehbar',
      ],
      en: [
        '“Take over / release” — seamless hand-off between AI and human',
        'Lead scoring: HOT / WARM / COLD at a glance',
        'Every AI action visible and traceable',
      ],
      fr: [
        '« Take over / Release » — passage fluide entre l’IA et l’humain',
        'Scoring des leads : HOT / WARM / COLD en un coup d’œil',
        'Chaque action de l’IA est visible et traçable',
      ],
      ar: [
        '"Take over / Release" — انتقال سلس بين الذكاء الاصطناعي والإنسان',
        'تقييم العملاء المحتملين: HOT / WARM / COLD بنظرة واحدة',
        'كل إجراء للذكاء الاصطناعي مرئي وقابل للتتبع',
      ],
    },
  },
  {
    icon: KanbanSquare,
    shot: '/videos/features/f6-deal-pipeline.jpg',
    title: {
      de: 'Smarte Deal-Pipeline',
      en: 'Smart deal pipeline',
      fr: 'Pipeline de transactions intelligent',
      ar: 'مسار صفقات ذكي',
    },
    lead: {
      de: 'Vom ersten Kontakt bis zum Notartermin: Pipeline-Wert, gewichtete Prognose und Stillstands-Warnungen — bevor Deals kalt werden.',
      en: 'From first contact to closing: pipeline value, weighted forecast and stall-risk alerts — before deals go cold.',
      fr: 'Du premier contact au rendez-vous chez le notaire : valeur du pipeline, prévisions pondérées et alertes de stagnation — avant que les deals ne refroidissent.',
      ar: 'من أول تواصل حتى موعد التوقيع: قيمة مسار الصفقات، وتوقعات مرجّحة، وتنبيهات التعثر — قبل أن تفتر الصفقات.',
    },
    points: {
      de: [
        'Kanban über alle Phasen — von „Neu" bis „Gewonnen"',
        'Wahrscheinlichkeit, Tage in Phase und At-Risk-Ansicht je Deal',
        'Proaktive Warnungen, bevor ein Deal ins Stocken gerät',
      ],
      en: [
        'Kanban across every stage — from new to won',
        'Probability, days-in-stage and an at-risk view per deal',
        'Proactive alerts before a deal stalls',
      ],
      fr: [
        'Kanban sur toutes les phases — de « Nouveau » à « Gagné »',
        'Probabilité, jours par phase et vue à risque pour chaque deal',
        'Alertes proactives avant qu’un deal ne s’enlise',
      ],
      ar: [
        'لوحة كانبان عبر جميع المراحل — من "جديد" إلى "مكتمل"',
        'الاحتمالية وعدد الأيام في كل مرحلة وعرض للصفقات المعرّضة للخطر',
        'تنبيهات استباقية قبل أن تتعثر أي صفقة',
      ],
    },
  },
  {
    icon: Megaphone,
    shot: '/videos/features/f7-campaigns.jpg',
    title: {
      de: 'KI-Marketing-Kampagnen',
      en: 'AI marketing campaigns',
      fr: 'Campagnes marketing pilotées par l’IA',
      ar: 'حملات تسويقية بالذكاء الاصطناعي',
    },
    lead: {
      de: 'Die KI erstellt Anzeigen, Zielgruppen und Budgets — und erklärt im Reasoning-Tab jede Entscheidung. Freigabe bleibt bei Ihnen.',
      en: 'The AI builds ads, audiences and budgets — and explains every decision in its reasoning tab. Approval stays with you.',
      fr: 'L’IA crée les annonces, les audiences et les budgets — et explique chaque décision dans l’onglet Reasoning. La validation reste entre vos mains.',
      ar: 'ينشئ الذكاء الاصطناعي الإعلانات والجماهير والميزانيات — ويشرح كل قرار في تبويب التحليل المنطقي. وتبقى الموافقة بأيديكم.',
    },
    points: {
      de: [
        'Meta-Kampagnen mit KI-generierten Creatives (Video + Carousel)',
        '„Pending Approval" — keine Kampagne startet ohne Freigabe',
        'Reasoning: Zielgruppe, Budget-Pacing und Varianten transparent begründet',
      ],
      en: [
        'Meta campaigns with AI-generated creatives (video + carousel)',
        '“Pending approval” — no campaign launches without sign-off',
        'Reasoning: audience, budget pacing and variants transparently justified',
      ],
      fr: [
        'Campagnes Meta avec créations générées par l’IA (vidéo + carrousel)',
        '« Pending Approval » — aucune campagne ne démarre sans validation',
        'Reasoning : audience, répartition du budget et variantes justifiées en toute transparence',
      ],
      ar: [
        'حملات Meta بمحتوى إبداعي مولَّد بالذكاء الاصطناعي (فيديو + عرض دوّار)',
        '"Pending Approval" — لا تنطلق أي حملة دون موافقة',
        'التحليل المنطقي: الجمهور المستهدف وتوزيع الميزانية والنسخ المختلفة مبررة بشفافية',
      ],
    },
  },
];

const COWORKERS: Array<Record<Language, string>> = [
  { de: 'Lead-Responder', en: 'Lead Responder', fr: 'Lead Responder', ar: 'Lead Responder' },
  { de: 'Conversation-Agent', en: 'Conversation Agent', fr: 'Conversation Agent', ar: 'Conversation Agent' },
  { de: 'Viewing-Booker', en: 'Viewing Booker', fr: 'Viewing Booker', ar: 'Viewing Booker' },
  { de: 'Listing-Creator', en: 'Listing Creator', fr: 'Listing Creator', ar: 'Listing Creator' },
  { de: 'Deal-Monitor', en: 'Deal Monitor', fr: 'Deal Monitor', ar: 'Deal Monitor' },
  { de: 'Daily-Brief-Agent', en: 'Daily Brief Agent', fr: 'Daily Brief Agent', ar: 'Daily Brief Agent' },
  { de: 'Compliance-Guard', en: 'Compliance Guard', fr: 'Compliance Guard', ar: 'Compliance Guard' },
];

// ── Real product screens (user-provided dashboard screenshots, 2026-07-14).
// Copy is grounded in what each screenshot actually shows — no invented
// features. Files live in public/screens/*.webp (1600w, ~460KB total).
type Screen = {
  img: string;
  name: Record<Language, string>;
  tagline: Record<Language, string>;
  body: Record<Language, string>;
};

const SCREENS: Screen[] = [
  {
    img: '/screens/dashboard.webp',
    name: { de: 'Dashboard', en: 'Dashboard', fr: 'Tableau de bord', ar: 'لوحة التحكم' },
    tagline: {
      de: 'Ihr Tag — schon priorisiert',
      en: 'Your day, decided for you',
      fr: 'Votre journée, déjà priorisée',
      ar: 'يومك — مرتب الأولويات مسبقًا',
    },
    body: {
      de: 'Der AI Daily Brief listet die nächsten Schritte in Prioritätsreihenfolge — mit Direktlink zu Lead oder Objekt. Dazu vier Live-Kennzahlen, der Portfolio-Gesundheits-Ring und die heutigen Besichtigungen auf einen Blick.',
      en: 'The AI Daily Brief ranks your next actions — each deep-linking straight to the lead or property. Four live KPI tiles, the portfolio-health donut and today’s viewings sit alongside.',
      fr: 'L’AI Daily Brief classe vos prochaines actions — chacune avec un lien direct vers le lead ou le bien. À côté : quatre indicateurs en direct, l’anneau de santé du portefeuille et les visites du jour.',
      ar: 'يرتب الملخص اليومي بالذكاء الاصطناعي خطواتكم التالية حسب الأولوية — مع رابط مباشر إلى العميل أو العقار. وبجانبه أربعة مؤشرات حية وحلقة صحة المحفظة ومعاينات اليوم.',
    },
  },
  {
    img: '/screens/properties.webp',
    name: { de: 'Objekte', en: 'Properties', fr: 'Biens', ar: 'العقارات' },
    tagline: {
      de: 'Inserate, die sich selbst anreichern und bewerten',
      en: 'Listings that enrich and score themselves',
      fr: 'Des annonces qui s’enrichissent et se notent elles-mêmes',
      ar: 'إعلانات تثري وتقيّم نفسها بنفسها',
    },
    body: {
      de: 'Jede Karte trägt ihren Health-Score und den Status „AI Enriched“. Grid-, Listen- und Kartenansicht, B-Link-Chat pro Inserat und Exposé-Upload — sortiert nach KI-Priorität.',
      en: 'Every card carries its health-score badge and “AI Enriched” status. Grid, list and map views, a B-Link chat per listing and exposé upload — sorted by AI priority.',
      fr: 'Chaque fiche porte son score de santé et le statut « AI Enriched ». Vues grille, liste et carte, chat B-Link par annonce et import d’exposé — le tout trié par priorité IA.',
      ar: 'كل بطاقة تحمل درجة صحتها وحالة «مُثرى بالذكاء الاصطناعي». عرض شبكي وقائمة وخريطة، ودردشة B-Link لكل إعلان، ورفع العروض — مرتبة حسب أولوية الذكاء الاصطناعي.',
    },
  },
  {
    img: '/screens/leads.webp',
    name: { de: 'Leads', en: 'Leads', fr: 'Leads', ar: 'العملاء المحتملون' },
    tagline: {
      de: 'Wissen, wen Sie zuerst anrufen',
      en: 'Know exactly who to call first',
      fr: 'Savoir exactement qui appeler en premier',
      ar: 'اعرفوا بالضبط بمن تتصلون أولًا',
    },
    body: {
      de: 'Jeder Lead bekommt einen Score von 0–100 und landet in HOT-, WARM- oder COLD-Tabs. „Why Hot?“ erklärt die Einstufung, „AI replied · BLINK“ zeigt die Herkunft — und eine Kennzahl, wie viel die KI bereits übernommen hat.',
      en: 'Every lead gets a 0–100 score and lands in HOT, WARM or COLD tabs. “Why Hot?” explains the rating, “AI replied · BLINK” shows the origin — plus a live figure for how much the AI already handled.',
      fr: 'Chaque lead reçoit un score de 0 à 100 et se classe en onglets HOT, WARM ou COLD. « Why Hot? » explique la note, « AI replied · BLINK » montre l’origine — avec la part déjà traitée par l’IA.',
      ar: 'يحصل كل عميل محتمل على درجة من 0 إلى 100 ويُصنف في تبويبات ساخن/دافئ/بارد. «لماذا ساخن؟» يشرح التقييم، و«رد الذكاء الاصطناعي · BLINK» يوضح المصدر — مع نسبة ما تولاه الذكاء الاصطناعي.',
    },
  },
  {
    img: '/screens/messages.webp',
    name: { de: 'Nachrichten', en: 'Messages', fr: 'Messages', ar: 'الرسائل' },
    tagline: {
      de: 'Bee — Ihre KI verkauft mit',
      en: 'Bee, your AI, selling on your behalf',
      fr: 'Bee, votre IA, vend pour vous',
      ar: 'Bee — ذكاؤكم الاصطناعي يبيع نيابة عنكم',
    },
    body: {
      de: 'Das B-Link-Protokoll zeigt Bee im Einsatz: Antworten aus echten Inseratsdaten — Zimmer, Energieklasse D, KfW55 — und gleichzeitig Qualifizierung des Käufers. „Why this reply?“ macht jede Antwort nachvollziehbar, der Qualifizierungs-Snapshot fasst zusammen.',
      en: 'The B-Link transcript shows Bee at work: answering from real listing facts — rooms, Energy Class D, KfW55 — while qualifying the buyer in the same conversation. “Why this reply?” makes every answer explainable; the qualification snapshot sums it up.',
      fr: 'La transcription B-Link montre Bee à l’œuvre : des réponses tirées des vraies données de l’annonce — pièces, classe énergie D, KfW55 — tout en qualifiant l’acheteur. « Why this reply? » rend chaque réponse explicable ; le récapitulatif de qualification synthétise.',
      ar: 'يُظهر سجل B-Link عمل Bee: إجابات من بيانات الإعلان الحقيقية — الغرف، فئة الطاقة D، شهادة KfW55 — مع تأهيل المشتري في المحادثة نفسها. «لماذا هذا الرد؟» يجعل كل إجابة قابلة للتفسير، ولقطة التأهيل تلخص النتيجة.',
    },
  },
  {
    img: '/screens/portfolio.webp',
    name: { de: 'Portfolio', en: 'Portfolio', fr: 'Portefeuille', ar: 'المحفظة' },
    tagline: {
      de: 'Health-Scoring plus KI-Empfehlungen zum Handeln',
      en: 'Health scoring + AI fix-it recommendations',
      fr: 'Score de santé + recommandations IA actionnables',
      ar: 'تقييم الصحة + توصيات ذكاء اصطناعي قابلة للتنفيذ',
    },
    body: {
      de: 'Der Portfolio-Health-Score (0–100) und Days-on-Market zeigen, wo es hakt. Die KI empfiehlt konkrete Maßnahmen — „Dieses Inserat mit einer Kampagne pushen — DRINGEND“ — mit einem Klick auf „Act“ ausgelöst.',
      en: 'The portfolio health score (0–100) and days-on-market show where things stall. The AI recommends concrete fixes — “Boost this listing with a paid campaign — URGENT” — triggered with one click on “Act”.',
      fr: 'Le score de santé du portefeuille (0–100) et les jours sur le marché montrent où ça bloque. L’IA recommande des actions concrètes — « Boostez cette annonce avec une campagne — URGENT » — déclenchées d’un clic sur « Act ».',
      ar: 'تُظهر درجة صحة المحفظة (0–100) وأيام العرض في السوق مواضع التعثر. ويوصي الذكاء الاصطناعي بإجراءات ملموسة — «عزّزوا هذا الإعلان بحملة مدفوعة — عاجل» — تُطلق بنقرة واحدة على «Act».',
    },
  },
  {
    img: '/screens/campaigns.webp',
    name: { de: 'Kampagnen', en: 'Campaigns', fr: 'Campagnes', ar: 'الحملات' },
    tagline: {
      de: 'KI-geführte Anzeigen auf Meta',
      en: 'AI-guided paid advertising',
      fr: 'Publicité payante guidée par l’IA',
      ar: 'إعلانات مدفوعة بتوجيه الذكاء الاصطناعي',
    },
    body: {
      de: 'Facebook- und Instagram-Kampagnen pro Objekt, direkt aus der Plattform: Spend-by-Platform-Ring, Impressionen, CTR und Cost-per-Lead — live aus der Meta-Verbindung.',
      en: 'Facebook and Instagram campaigns per property, straight from the platform: the spend-by-platform donut, impressions, CTR and cost-per-lead — live from the Meta connection.',
      fr: 'Des campagnes Facebook et Instagram par bien, directement depuis la plateforme : anneau de dépense par canal, impressions, CTR et coût par lead — en direct depuis la connexion Meta.',
      ar: 'حملات فيسبوك وإنستغرام لكل عقار مباشرة من المنصة: حلقة الإنفاق حسب القناة، ومرات الظهور، ونسبة النقر، وتكلفة العميل المحتمل — مباشرة من اتصال Meta.',
    },
  },
  {
    img: '/screens/analytics.webp',
    name: { de: 'Analytics', en: 'Analytics', fr: 'Analytics', ar: 'التحليلات' },
    tagline: {
      de: 'Das ganze Geschäft auf einen Blick',
      en: 'Your whole business at a glance',
      fr: 'Toute votre activité en un coup d’œil',
      ar: 'أعمالكم كلها في لمحة',
    },
    body: {
      de: 'Pipeline nach Phase, Lead-Temperatur, Lead-Quellen, Portfolio-Gesundheit und Objektstatus — live, ohne Reporting-Handarbeit.',
      en: 'Pipeline by stage, lead temperature, lead sources, portfolio health and property status — live, with zero manual reporting.',
      fr: 'Pipeline par étape, température des leads, sources, santé du portefeuille et statut des biens — en direct, sans reporting manuel.',
      ar: 'مسار الصفقات حسب المرحلة، وحرارة العملاء، ومصادرهم، وصحة المحفظة وحالة العقارات — مباشرةً ودون أي تقارير يدوية.',
    },
  },
  {
    img: '/screens/ai-control.webp',
    name: { de: 'AI Control', en: 'AI Control', fr: 'AI Control', ar: 'التحكم بالذكاء الاصطناعي' },
    tagline: {
      de: 'Die KI handelt — Sie behalten die Kontrolle',
      en: 'The AI acts, you stay in control',
      fr: 'L’IA agit, vous gardez le contrôle',
      ar: 'الذكاء الاصطناعي يعمل — وأنتم تحتفظون بالسيطرة',
    },
    body: {
      de: 'Die Freigabe-Warteschlange für Buchungen: Approve oder Decline pro Termin, 24-Stunden-Auto-Ablauf mit Alternativvorschlägen an den Käufer, Pending- und History-Tab. Das ist gelebte Human-in-the-Loop-Architektur.',
      en: 'The booking-approval queue: Approve or Decline per viewing, 24-hour auto-expiry that emails the buyer alternatives, Pending and History tabs. Human-in-the-loop, in practice.',
      fr: 'La file d’approbation des réservations : Approve ou Decline par visite, expiration automatique après 24 h avec alternatives envoyées à l’acheteur, onglets Pending et History. L’humain dans la boucle, en pratique.',
      ar: 'قائمة الموافقات على الحجوزات: موافقة أو رفض لكل معاينة، وانتهاء تلقائي بعد 24 ساعة مع إرسال بدائل للمشتري، وتبويبا قيد الانتظار والسجل. الإنسان في حلقة القرار — عمليًا.',
    },
  },
];

const SCREENS_HEAD: Record<string, Record<Language, string>> = {
  eyebrow: { de: 'Aus dem Produkt', en: 'Inside the product', fr: 'Dans le produit', ar: 'من داخل المنتج' },
  headline: {
    de: 'Echte Screens, echte Funktionen',
    en: 'Real screens, real functionality',
    fr: 'De vrais écrans, de vraies fonctions',
    ar: 'شاشات حقيقية ووظائف حقيقية',
  },
  sub: {
    de: 'Keine Mockups: So sieht das Immob24-Dashboard heute aus — vom Daily Brief bis zur Freigabe-Warteschlange.',
    en: 'No mockups: this is the Immob24 dashboard today — from the daily brief to the approval queue.',
    fr: 'Pas de maquettes : voici le tableau de bord Immob24 aujourd’hui — du brief quotidien à la file d’approbation.',
    ar: 'لا نماذج وهمية: هكذا تبدو لوحة تحكم Immob24 اليوم — من الملخص اليومي إلى قائمة الموافقات.',
  },
};

export default function AiFeaturesPage() {
  const { language } = useLanguage();
  const L = <T,>(v: Record<Language, T>): T => v[language] ?? v.en;
  useDocumentMeta({
    title: L({
      de: 'KI-Funktionen — 7 KI-Co-Worker für Immobilienmakler | Immob24',
      en: 'AI Features — 7 AI co-workers for real estate agents | Immob24',
      fr: 'Fonctions IA — 7 co-workers IA pour agents immobiliers | Immob24',
      ar: 'وظائف الذكاء الاصطناعي — 7 مساعدين بالذكاء الاصطناعي لوكلاء العقارات | Immob24',
    }),
    description: L({
      de: 'PDF zu Exposé in 30 Sekunden, 24/7 KI-Assistent, Lead-Scoring, Deal-Pipeline und KI-Marketing — 7 KI-Co-Worker mit voller menschlicher Kontrolle.',
      en: 'PDF to listing in 30 seconds, 24/7 AI assistant, lead scoring, deal pipeline and AI marketing — 7 AI co-workers with full human control.',
      fr: 'Du PDF à l’annonce en 30 secondes, assistant IA 24 h/24, scoring des leads, pipeline de transactions et marketing IA — 7 co-workers IA avec un contrôle humain total.',
      ar: 'من PDF إلى إعلان في 30 ثانية، مساعد ذكاء اصطناعي على مدار الساعة، تقييم العملاء المحتملين، مسار الصفقات، وتسويق بالذكاء الاصطناعي — 7 مساعدين بالذكاء الاصطناعي مع تحكم بشري كامل.',
    }),
    canonical: `${SITE_ORIGIN}${pathFor('aiFeatures', language)}`,
    alternates: [
      { hreflang: 'de', href: urlFor('aiFeatures', 'de') },
      { hreflang: 'en', href: urlFor('aiFeatures', 'en') },
      { hreflang: 'fr', href: urlFor('aiFeatures', 'fr') },
      { hreflang: 'ar', href: urlFor('aiFeatures', 'ar') },
      { hreflang: 'x-default', href: urlFor('aiFeatures', 'de') },
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
            de: 'KI-Funktionen',
            en: 'AI Features',
            fr: 'Fonctions IA',
            ar: 'وظائف الذكاء الاصطناعي',
          }),
          path: pathFor('aiFeatures', language),
        },
      ]),
    ],
    'ai-features',
  );

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      {/* Hero */}
      <section className="relative pt-24 pb-14 md:pt-28 md:pb-20 overflow-hidden bg-gradient-to-b from-cream to-white">
        <div
          aria-hidden
          className="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-gradient-golden opacity-20 blur-3xl"
        />
        <div className="container relative text-center max-w-3xl mx-auto">
          <h1 className="mt-6 font-heading text-hero-mobile md:text-hero text-charcoal text-balance">
            <TypeOnce text={L({
              de: 'Jeder Makler bekommt 7 KI-Co-Worker',
              en: 'Every agent gets 7 AI co-workers',
              fr: 'Chaque agent immobilier dispose de 7 co-workers IA',
              ar: 'كل وكيل عقاري يحصل على 7 مساعدين بالذكاء الاصطناعي',
            })} />
          </h1>
          <p className="hero-in mt-6 text-body-lg text-slate max-w-2xl mx-auto" style={{ animationDelay: '250ms' }}>
            {L({
              de: 'Sieben spezialisierte KI-Agenten übernehmen die operative Arbeit — vom Lead bis zum Abschluss. Sie behalten die volle Kontrolle und geben jede Aktion frei.',
              en: 'Seven specialised AI agents handle the operational load — from lead to close. You keep full visibility and approve every action.',
              fr: 'Sept agents IA spécialisés prennent en charge le travail opérationnel — du lead à la signature. Vous gardez le contrôle total et validez chaque action.',
              ar: 'سبعة وكلاء ذكاء اصطناعي متخصصين يتولّون العمل التشغيلي — من العميل المحتمل حتى إتمام الصفقة. تحتفظون بالسيطرة الكاملة وتوافقون على كل إجراء.',
            })}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {COWORKERS.map((c) => (
              <span
                key={c.en}
                className="rounded-full bg-white border border-charcoal/10 px-3.5 py-1.5 text-sm text-charcoal shadow-subtle"
              >
                {L(c)}
              </span>
            ))}
          </div>

          <Reveal direction="scale" className="mt-10 mx-auto max-w-xl text-start">
            <SceneAgents />
          </Reveal>

          <ScrollCue targetId="video" className="mt-10" />
        </div>
      </section>

      {/* Demo video with chapters */}
      <section id="video" className="py-16 md:py-20 bg-white">
        <div className="container">
          <Reveal className="max-w-2xl">
            <h2 className="font-heading text-section-mobile md:text-section text-charcoal">
              {L({
                de: 'Der Workflow — live im Video',
                en: 'Watch the workflow live',
                fr: 'Le workflow — en vidéo',
                ar: 'سير العمل — مباشرةً في الفيديو',
              })}
            </h2>
            <p className="mt-3 text-slate">
              {L({
                de: 'Alle sieben Funktionen in 10 Minuten — direkt aus dem Produkt. Kapitel anklicken, um zu einer Funktion zu springen.',
                en: 'All seven features in 10 minutes — straight from the product. Click a chapter to jump to a feature.',
                fr: 'Les sept fonctions en 10 minutes — directement depuis le produit. Cliquez sur un chapitre pour accéder à une fonction.',
                ar: 'جميع الوظائف السبع في 10 دقائق — مباشرةً من المنتج. انقروا على أحد الفصول للانتقال إلى الوظيفة المطلوبة.',
              })}
            </p>
          </Reveal>
          <Reveal direction="scale" className="mt-8">
            <DemoVideoPlayer />
          </Reveal>
        </div>
      </section>

      {/* The 7 features */}
      <section className="py-16 md:py-24">
        <div className="container">
          <Reveal className="max-w-2xl">
            <h2 className="font-heading text-section-mobile md:text-section text-charcoal">
              {L({
                de: 'Sieben Funktionen, ein System',
                en: 'Seven features, one system',
                fr: 'Sept fonctions, un seul système',
                ar: 'سبع وظائف، نظام واحد',
              })}
            </h2>
            <p className="mt-3 text-slate">
              {L({
                de: 'Ein verbundenes System statt Insellösungen — kein Tool-Wechsel, keine Integrations-Kopfschmerzen.',
                en: 'One connected system instead of point solutions — no tool switching, no integration headaches.',
                fr: 'Un système connecté plutôt que des solutions isolées — pas de changement d’outil, pas de casse-tête d’intégration.',
                ar: 'نظام واحد مترابط بدلًا من حلول متفرقة — لا تنقّل بين الأدوات ولا متاعب في التكامل.',
              })}
            </p>
          </Reveal>

          {/* Dashboard overview — real product screenshot from the demo video */}
          <Reveal direction="scale" className="mt-10 relative rounded-2xl overflow-hidden shadow-card border border-charcoal/10">
            <img
              src="/videos/features/dashboard-properties.jpg"
              alt={L({
                de: 'Immob24 Dashboard — Objektübersicht',
                en: 'immob24 dashboard — property overview',
                fr: 'Tableau de bord Immob24 — aperçu des biens',
                ar: 'لوحة تحكم Immob24 — نظرة عامة على العقارات',
              })}
              width={1920}
              height={1080}
              loading="lazy"
              className="w-full aspect-[2/1] object-cover object-top"
            />
            <span className="absolute bottom-3 start-3 rounded-full bg-charcoal/80 px-3 py-1 text-xs font-medium text-white">
              {L({
                de: 'Aus dem Produkt: das Immob24 Dashboard',
                en: 'From the product: the immob24 dashboard',
                fr: 'Extrait du produit : le tableau de bord Immob24',
                ar: 'من المنتج: لوحة تحكم Immob24',
              })}
            </span>
          </Reveal>

          <RevealGroup className="mt-10 grid md:grid-cols-2 gap-6">
            {FEATURES.map((f, i) => (
              <article
                key={f.title.en}
                className="rounded-2xl bg-white border border-charcoal/5 shadow-card p-7"
              >
                <img
                  src={f.shot}
                  alt={L(f.title)}
                  width={1920}
                  height={1080}
                  loading="lazy"
                  className="mb-5 w-full aspect-video object-cover rounded-xl border border-charcoal/10"
                />
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-golden/10 text-golden-dark">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <span className="font-metric text-sm text-warm-gray">0{i + 1}</span>
                </div>
                <h3 className="mt-4 font-heading text-subhead text-charcoal">
                  {L(f.title)}
                </h3>
                <p className="mt-2 text-slate">{L(f.lead)}</p>
                <ul className="mt-4 space-y-2">
                  {L(f.points).map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-sm text-slate">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 flex-none text-honey-green" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Real product screens (user screenshots) */}
      <section id="screens" className="py-16 md:py-24 bg-white">
        <div className="container">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-golden-dark">
              {SCREENS_HEAD.eyebrow[language] ?? SCREENS_HEAD.eyebrow.en}
            </p>
            <h2 className="mt-2 font-heading text-section-mobile md:text-section text-charcoal">
              {SCREENS_HEAD.headline[language] ?? SCREENS_HEAD.headline.en}
            </h2>
          </Reveal>
          <Reveal delay={100} as="p" className="mt-3 max-w-2xl text-slate">
            {SCREENS_HEAD.sub[language] ?? SCREENS_HEAD.sub.en}
          </Reveal>

          <div className="mt-12 space-y-14 md:space-y-20">
            {SCREENS.map((sc, i) => {
              const reversed = i % 2 === 1;
              return (
                <div
                  key={sc.img}
                  className={`grid items-center gap-8 lg:grid-cols-[1.25fr,1fr] ${
                    reversed ? 'lg:[&>*:first-child]:order-2' : ''
                  }`}
                >
                  <Reveal direction={reversed ? 'right' : 'left'}>
                    <div className="no-fill overflow-hidden rounded-2xl border border-charcoal/10 bg-white shadow-card">
                      <div className="flex items-center gap-1.5 border-b border-charcoal/10 bg-cream/70 px-4 py-2.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-health-crit/70" />
                        <span className="h-2.5 w-2.5 rounded-full bg-health-warn/70" />
                        <span className="h-2.5 w-2.5 rounded-full bg-honey-green/70" />
                        <span className="ms-3 truncate rounded-md bg-charcoal/5 px-3 py-0.5 text-[10px] text-slate">
                          app.immob24.com/{sc.img.replace('/screens/', '').replace('.webp', '')}
                        </span>
                      </div>
                      <img
                        src={sc.img}
                        alt={`${sc.name[language] ?? sc.name.en} — ${sc.tagline[language] ?? sc.tagline.en}`}
                        width={1600}
                        height={892}
                        loading="lazy"
                        className="w-full"
                      />
                    </div>
                  </Reveal>
                  <Reveal direction={reversed ? 'left' : 'right'}>
                    <p className="text-xs font-semibold uppercase tracking-wider text-golden-dark">
                      {sc.name[language] ?? sc.name.en}
                    </p>
                    <h3 className="mt-2 font-heading text-2xl text-charcoal text-balance">
                      {sc.tagline[language] ?? sc.tagline.en}
                    </h3>
                    <p className="mt-4 text-slate leading-relaxed">
                      {sc.body[language] ?? sc.body.en}
                    </p>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compliance cross-link */}
      <section className="py-14 band-dark bg-charcoal text-white">
        <div className="container grid lg:grid-cols-[1fr,minmax(300px,26rem)] items-center gap-8">
          <Reveal direction="left">
            <div className="flex items-center gap-2 text-golden">
              <ShieldCheck className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-wide">
                {L({
                  de: 'DSGVO · EU AI Act',
                  en: 'GDPR · EU AI Act',
                  fr: 'RGPD · EU AI Act',
                  ar: 'GDPR · EU AI Act',
                })}
              </span>
            </div>
            <h2 className="mt-3 font-heading text-2xl md:text-3xl text-white">
              {L({
                de: 'KI mit Kontrolle: konform durch Architektur, nicht nachgerüstet',
                en: 'AI with control: compliant by architecture, not retrofitted',
                fr: 'L’IA sous contrôle : conforme par architecture, pas par retouche',
                ar: 'ذكاء اصطناعي تحت السيطرة: متوافق بحكم البنية، لا بالترقيع اللاحق',
              })}
            </h2>
            <p className="mt-3 text-white/70 max-w-2xl">
              {L({
                de: 'Jede KI-Aktion ist sichtbar, freigabepflichtig und protokolliert. KI-Chat und KI-Inhalte sind als solche gekennzeichnet.',
                en: 'Every AI action is visible, approval-gated and logged. AI chat and AI-generated content are labelled as such.',
                fr: 'Chaque action de l’IA est visible, soumise à validation et journalisée. Le chat IA et les contenus générés par l’IA sont signalés comme tels.',
                ar: 'كل إجراء للذكاء الاصطناعي مرئي وخاضع للموافقة ومسجَّل. محادثات الذكاء الاصطناعي ومحتوياته موسومة بوضوح.',
              })}
            </p>
          </Reveal>
          <Reveal direction="right" className="space-y-5">
            <SceneApprovalGate />
            <div className="flex flex-wrap gap-3">
              <Link
                to={pathFor('compliance', language)}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-medium hover:bg-white/10 transition-colors"
              >
                <BadgeCheck className="h-4 w-4" />
                {L({
                  de: 'Compliance ansehen',
                  en: 'See compliance',
                  fr: 'Voir la conformité',
                  ar: 'استعراض الامتثال',
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
                  ar: 'طلب عرض توضيحي',
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
