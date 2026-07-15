// JSON-LD schema builders. Kept separate from the injection hook (useJsonLd)
// so each page can compose exactly the structured data it needs.
import { SITE_ORIGIN } from '../i18n/pages';
import type { Language } from '../i18n';

type Schema = Record<string, unknown>;

const inLanguage = (lang: Language) => (lang === 'de' ? 'de-DE' : 'en');

// Organization — describes the company. Belongs on the homepage.
export function organizationSchema(): Schema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Immob24',
    url: SITE_ORIGIN,
    logo: `${SITE_ORIGIN}/logo.png`,
    description:
      'Immob24 ist die KI-Maklersoftware für Immobilienmakler in Deutschland.',
    areaServed: 'DE',
    sameAs: ['https://linkedin.com/company/immob24'],
  };
}

// BreadcrumbList — the path from the homepage to the current page.
// Pass items in order, e.g. [{ name: 'Startseite', path: '/de' }, ...].
export function breadcrumbSchema(
  items: Array<{ name: string; path: string }>,
): Schema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE_ORIGIN}${it.path}`,
    })),
  };
}

// SoftwareApplication — describes the product. Belongs on /de/produkt.
export function softwareApplicationSchema(
  lang: Language,
  description: string,
  featureList: string[],
): Schema {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Immob24',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description,
    inLanguage: inLanguage(lang),
    url: SITE_ORIGIN,
    image: `${SITE_ORIGIN}/immob24-wordmark.png`,
    offers: {
      '@type': 'Offer',
      price: '249',
      priceCurrency: 'EUR',
      description: 'Team-Tarif ab 249 €/Monat; Beta kostenlos.',
    },
    featureList,
  };
}

// HowTo — an ordered process. Belongs on /de/how-it-works.
export function howToSchema(
  lang: Language,
  name: string,
  steps: Array<{ name: string; text: string }>,
): Schema {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    inLanguage: inLanguage(lang),
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

// Product + Offers — pricing plans. Belongs on /de/preise.
export function productSchema(
  lang: Language,
  description: string,
  offers: Array<{ name: string; price: string; description: string }>,
): Schema {
  // Modelled as SoftwareApplication, not Product. Immob24 is SaaS, so a
  // Product+offers schema makes Google run Merchant-listing (Shopping)
  // validation, which fails on fields a software page has no business
  // supplying (shipping, returns, availability) -> GSC "Merchant listings:
  // invalid". SoftwareApplication is the correct type, keeps the pricing
  // offers, and isn't a Product subtype, so it skips shopping validation.
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Immob24',
    description,
    inLanguage: inLanguage(lang),
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    // Google runs Merchant-listing validation on ANY schema with offers
    // (2026-07: even SoftwareApplication) and requires an image; the
    // wordmark is the only brand image with an ALB rule on the shared host.
    image: `${SITE_ORIGIN}/immob24-wordmark.png`,
    brand: { '@type': 'Brand', name: 'Immob24' },
    offers: offers.map((o) => ({
      '@type': 'Offer',
      name: o.name,
      price: o.price,
      priceCurrency: 'EUR',
      description: o.description,
    })),
  };
}
