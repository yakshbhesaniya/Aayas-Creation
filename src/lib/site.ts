// Central place for the public site URL. Override via NEXT_PUBLIC_SITE_URL env
// if/when you move to a custom domain.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://aayascreation.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "Aayas Creation";

// Google Analytics 4 Measurement ID. A GA ID is public (visible in the browser),
// so it's safe in source. Override per-environment via NEXT_PUBLIC_GA_ID if needed.
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-MB1QRLKX8X";
