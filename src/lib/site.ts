// Central place for the public site URL. Override via NEXT_PUBLIC_SITE_URL env
// if/when you move to a custom domain.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://aayascreation.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "Aayas Creation";
