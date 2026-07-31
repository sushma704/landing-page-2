// The seven AI co-workers, in one place.
//
// These names were previously duplicated across four files (AiRefinementBands,
// AiFeaturesPage, SceneAgents, SolutionsPage) and were left in English for
// fr/ar, so the Arabic and French pages showed English role names in the middle
// of otherwise translated copy. They are descriptive ROLES, not coined brand
// names — unlike "immob24" — so they get translated like any other content.
//
// Reference them by id; never re-type the strings at a call site.

import type { Language } from './translations';

export type AgentId =
  | 'leadResponder'
  | 'conversationAgent'
  | 'viewingBooker'
  | 'listingCreator'
  | 'dealMonitor'
  | 'dailyBrief'
  | 'complianceGuard';

export const AGENT_NAMES: Record<AgentId, Record<Language, string>> = {
  // "Erstantwort" is the same word used for the 3s first-reply stat.
  leadResponder: {
    de: 'Erstantwort-Agent',
    en: 'Lead Responder',
    fr: 'Agent de première réponse',
    ar: 'وكيل الرد الأول',
  },
  conversationAgent: {
    de: 'Gesprächs-Agent',
    en: 'Conversation Agent',
    fr: 'Agent conversationnel',
    ar: 'وكيل المحادثة',
  },
  viewingBooker: {
    de: 'Besichtigungs-Planer',
    en: 'Viewing Booker',
    fr: 'Planificateur de visites',
    ar: 'منسّق المعاينات',
  },
  // "Exposé" is the German real-estate term for a property listing document.
  listingCreator: {
    de: 'Exposé-Ersteller',
    en: 'Listing Creator',
    fr: "Créateur d'annonces",
    ar: 'منشئ الإعلانات',
  },
  dealMonitor: {
    de: 'Abschluss-Monitor',
    en: 'Deal Monitor',
    fr: 'Moniteur de transactions',
    ar: 'مراقب الصفقات',
  },
  dailyBrief: {
    de: 'Tagesbriefing-Agent',
    en: 'Daily Brief Agent',
    fr: 'Agent de briefing quotidien',
    ar: 'وكيل الموجز اليومي',
  },
  complianceGuard: {
    de: 'Compliance-Wächter',
    en: 'Compliance Guard',
    fr: 'Gardien de conformité',
    ar: 'حارس الامتثال',
  },
};

// Canonical display order — the "7 AI co-workers" run left to right in this
// sequence everywhere they appear.
export const AGENT_ORDER: AgentId[] = [
  'leadResponder',
  'conversationAgent',
  'viewingBooker',
  'listingCreator',
  'dealMonitor',
  'dailyBrief',
  'complianceGuard',
];

export const agentName = (id: AgentId, lang: Language): string =>
  AGENT_NAMES[id][lang] ?? AGENT_NAMES[id].en;
