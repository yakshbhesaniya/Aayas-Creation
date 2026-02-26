import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import LeadCapturePopup from "@/components/LeadCapturePopup";

const outfit = Outfit({
  subsets: ["latin"],
  variable: '--font-outfit'
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair'
});

export const metadata: Metadata = {
  title: "Aayas Creation | Handmade Artisan Jewelry",
  description: "Discover truly unique, handcrafted artisan earrings by Aayas Creation. Ethnic and bohemian aesthetics crafted with soul.",
  keywords: "handmade earrings, artisan jewelry, boho earrings, ethnic jewelry, Indian handmade",
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
