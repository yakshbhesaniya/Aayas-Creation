// Central place for the public site URL. Override via NEXT_PUBLIC_SITE_URL env
// if/when you move to a custom domain.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://aayascreation.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "Aayas Creation";

// One-line factual brand descriptor — reused in metadata + schema. Written as a
// complete standalone sentence so AI search engines can cite it cleanly.
export const SITE_TAGLINE =
  "Aayas Creation is a handmade artisan earrings brand based in Ahmedabad, Gujarat, India, crafting small-batch ethnic and bohemian earrings sold through its official Amazon store.";

// Google Analytics 4 Measurement ID. A GA ID is public (visible in the browser),
// so it's safe in source. Override per-environment via NEXT_PUBLIC_GA_ID if needed.
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-MB1QRLKX8X";

// Brand color used for browser chrome (theme-color) and OG imagery.
export const BRAND_COLOR = "#E05C42"; // terracotta accent

// Single source of truth for NAP (Name / Address / Phone), geo, and socials.
// Keep this in sync with the visible footer so search engines see consistent data.
export const BUSINESS = {
  legalName: "Aayas Creation",
  phone: "+919104861625",
  phoneDisplay: "+91 9104861625",
  whatsapp: "https://wa.me/919104861625",
  email: "aayascreation@gmail.com",
  addressLocality: "Ahmedabad",
  addressRegion: "Gujarat",
  postalCode: "380001",
  addressCountry: "IN",
  // City-level coordinates for Ahmedabad (approximate — no public storefront).
  latitude: 23.0225,
  longitude: 72.5714,
  amazonStore: "https://www.amazon.in/s?k=Aayas+Creation",
} as const;

export const SOCIAL_LINKS = [
  "https://www.instagram.com/aayascreation/",
  "https://www.facebook.com/aayascreation/",
  "https://in.pinterest.com/aayascreation/",
] as const;
