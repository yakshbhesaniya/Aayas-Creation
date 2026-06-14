import type { MetadataRoute } from "next";
import { SITE_NAME, BRAND_COLOR } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Handmade Artisan Earrings`,
    short_name: SITE_NAME,
    description:
      "Handmade artisan earrings crafted in Ahmedabad, India — ethnic and bohemian designs, made with soul.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFCF7",
    theme_color: BRAND_COLOR,
    lang: "en-IN",
    categories: ["shopping", "lifestyle"],
    icons: [
      { src: "/icon.jpg", sizes: "192x192", type: "image/jpeg" },
      { src: "/icon.jpg", sizes: "512x512", type: "image/jpeg" },
      { src: "/icon.jpg", sizes: "any", type: "image/jpeg", purpose: "any" },
    ],
  };
}
