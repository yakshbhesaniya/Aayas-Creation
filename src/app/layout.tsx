import type { Metadata, Viewport } from "next";
import { Outfit, Fraunces } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import LeadCapturePopup from "@/components/LeadCapturePopup";
import ScrollReveal from "@/components/ScrollReveal";
import JsonLd from "@/components/JsonLd";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SITE_URL, SITE_NAME, GA_ID, BRAND_COLOR } from "@/lib/site";
import { organizationSchema, onlineStoreSchema, geoMeta, alternates } from "@/lib/seo";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const TITLE_DEFAULT = "Handmade Artisan Earrings in India | Aayas Creation";
const DESCRIPTION =
  "Shop handmade artisan earrings by Aayas Creation — ethnic, boho & jhumka designs handcrafted in Ahmedabad, India. Lightweight, small-batch, one-of-a-kind. Buy on Amazon.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: BRAND_COLOR,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE_DEFAULT,
    template: "%s | Aayas Creation",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Jewelry",
  keywords: [
    "handmade earrings",
    "artisan earrings India",
    "handmade earrings Ahmedabad",
    "boho earrings online",
    "jhumka earrings handmade",
    "ethnic earrings India",
    "cowrie shell earrings",
    "terracotta earrings",
    "fabric earrings",
    "wholesale earrings supplier India",
    "Aayas Creation",
  ],
  alternates: alternates("/"),
  verification: { google: "7YySfTF3rHsKWdquAkoICLidqqcJYwTclIbRjqGZCMI" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_IN",
    url: SITE_URL,
    title: TITLE_DEFAULT,
    description: DESCRIPTION,
    // og:image is provided automatically by app/opengraph-image.tsx (1200x630).
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE_DEFAULT,
    description: DESCRIPTION,
  },
  icons: {
    icon: "/icon.jpg",
    apple: "/icon.jpg",
  },
  other: geoMeta,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="preconnect" href="https://m.media-amazon.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://m.media-amazon.com" />
      </head>
      <body className={`${outfit.variable} ${fraunces.variable}`}>
        <JsonLd data={[organizationSchema(), onlineStoreSchema()]} />
        <ScrollReveal />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <LeadCapturePopup />
      </body>
      <GoogleAnalytics gaId={GA_ID} />
    </html>
  );
}
