// Centralized SEO helpers: canonical/hreflang alternates, geo meta, and
// reusable JSON-LD (schema.org) builders. Keeping these in one place ensures
// every page emits consistent, valid structured data.
import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, SITE_TAGLINE, BUSINESS, SOCIAL_LINKS } from "./site";

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** Absolute URL for a site-relative path. */
export function abs(path = "/"): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** canonical + hreflang alternates for a page. Use in every page's metadata. */
export function alternates(path = "/"): Metadata["alternates"] {
  const url = abs(path);
  return {
    canonical: url,
    languages: { "en-IN": url, "x-default": SITE_URL },
  };
}

/** Geo + locale meta tags (applied site-wide via the root layout's `other`). */
export const geoMeta: Record<string, string> = {
  "geo.region": "IN-GJ",
  "geo.placename": "Ahmedabad, Gujarat, India",
  "geo.position": `${BUSINESS.latitude};${BUSINESS.longitude}`,
  ICBM: `${BUSINESS.latitude}, ${BUSINESS.longitude}`,
};

const postalAddress = {
  "@type": "PostalAddress",
  addressLocality: BUSINESS.addressLocality,
  addressRegion: BUSINESS.addressRegion,
  postalCode: BUSINESS.postalCode,
  addressCountry: BUSINESS.addressCountry,
};

/** Organization — emitted site-wide. Establishes the brand entity. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    legalName: BUSINESS.legalName,
    url: SITE_URL,
    logo: abs("/logo.jpg"),
    image: abs("/logo.jpg"),
    description: SITE_TAGLINE,
    email: BUSINESS.email,
    telephone: BUSINESS.phone,
    foundingLocation: "Ahmedabad, Gujarat, India",
    address: postalAddress,
    areaServed: { "@type": "Country", name: "India" },
    sameAs: [...SOCIAL_LINKS, BUSINESS.amazonStore],
  };
}

/**
 * OnlineStore (a LocalBusiness subtype) with India-specific commerce fields.
 * Aayas Creation sells online via Amazon rather than a walk-in storefront, so
 * OnlineStore is more accurate than a generic LocalBusiness.
 */
export function onlineStoreSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "OnlineStore",
    "@id": `${SITE_URL}/#store`,
    name: SITE_NAME,
    url: SITE_URL,
    image: abs("/logo.jpg"),
    description: SITE_TAGLINE,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Amazon",
    address: postalAddress,
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.latitude,
      longitude: BUSINESS.longitude,
    },
    areaServed: { "@type": "Country", name: "India" },
    sameAs: [...SOCIAL_LINKS, BUSINESS.amazonStore],
  };
}

/** WebSite + SearchAction (sitelinks searchbox) — homepage only. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_TAGLINE,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-IN",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/shop?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/** BreadcrumbList for inner pages. Pass ordered [{name, path}] crumbs. */
export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

/** FAQPage from a list of Q&A. Answers should be complete factual sentences. */
export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

interface ProductLike {
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  image: string;
  gallery?: string[];
  amazonUrl: string;
}

/** Product schema (no price — checkout happens on Amazon). */
export function productSchema(p: ProductLike) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    image: p.gallery && p.gallery.length ? p.gallery : [p.image],
    description: p.longDescription || p.description,
    url: abs(`/products/${p.slug}`),
    brand: { "@type": "Brand", name: SITE_NAME },
    manufacturer: { "@id": ORG_ID },
    category: "Handmade Earrings",
    material: "Mixed handcrafted materials",
    countryOfOrigin: "India",
    isHandmadeProduct: true,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "INR",
      url: p.amazonUrl,
      seller: { "@id": ORG_ID },
    },
  };
}

/** ItemList for collection / shop product grids. */
export function itemListSchema(
  products: { name: string; slug: string }[],
  name: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: abs(`/products/${p.slug}`),
      name: p.name,
    })),
  };
}
