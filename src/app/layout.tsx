import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import LeadCapturePopup from "@/components/LeadCapturePopup";
import { SITE_URL, SITE_NAME } from "@/lib/site";

const outfit = Outfit({
  subsets: ["latin"],
  variable: '--font-outfit'
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair'
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Aayas Creation | Handmade Artisan Earrings",
    template: "%s | Aayas Creation",
  },
  description: "Discover truly unique, handcrafted artisan earrings by Aayas Creation. Ethnic and bohemian aesthetics crafted with soul.",
  keywords: "handmade earrings, artisan jewelry, boho earrings, ethnic jewelry, Indian handmade, jhumka earrings",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: "Aayas Creation | Handmade Artisan Earrings",
    description: "Handcrafted artisan earrings with ethnic and bohemian aesthetics, made with soul.",
    images: ["/logo.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aayas Creation | Handmade Artisan Earrings",
    description: "Handcrafted artisan earrings with ethnic and bohemian aesthetics, made with soul.",
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
      <body className={`${outfit.variable} ${playfair.variable}`}>
        <Navbar />
        <main style={{ minHeight: 'calc(100vh - 300px)', paddingTop: '80px' }}>
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
        <LeadCapturePopup />
      </body>
    </html>
  );
}
