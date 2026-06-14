import type { Metadata } from "next";
import { Outfit, Fraunces } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import LeadCapturePopup from "@/components/LeadCapturePopup";
import ScrollReveal from "@/components/ScrollReveal";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SITE_URL, SITE_NAME, GA_ID } from "@/lib/site";

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Aayas Creation | Handmade Artisan Earrings",
    template: "%s | Aayas Creation",
  },
  description:
    "Discover truly unique, handcrafted artisan earrings by Aayas Creation. Ethnic and bohemian aesthetics crafted with soul.",
  keywords:
    "handmade earrings, artisan jewelry, boho earrings, ethnic jewelry, Indian handmade, jhumka earrings",
  alternates: { canonical: "/" },
  verification: {
    google: "7YySfTF3rHsKWdquAkoICLidqqcJYwTclIbRjqGZCMI",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: "Aayas Creation | Handmade Artisan Earrings",
    description:
      "Handcrafted artisan earrings with ethnic and bohemian aesthetics, made with soul.",
    images: ["/logo.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aayas Creation | Handmade Artisan Earrings",
    description:
      "Handcrafted artisan earrings with ethnic and bohemian aesthetics, made with soul.",
    images: ["/logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${fraunces.variable}`}>
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
