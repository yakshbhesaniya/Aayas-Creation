import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Aayas Creation — handmade artisan earrings from Ahmedabad, India. Call, WhatsApp or email us for orders, wholesale and enquiries.",
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: "Contact Us | Aayas Creation",
    description: "Call, WhatsApp or email Aayas Creation for orders, wholesale and enquiries.",
    url: `${SITE_URL}/contact`,
    type: "website",
  },
};

const METHODS = [
  {
    label: "Call",
    value: "+91 9104861625",
    href: "tel:+919104861625",
    sub: "Mon–Sat, 10am–7pm IST",
  },
  {
    label: "WhatsApp",
    value: "Chat with us",
    href: "https://wa.me/919104861625",
    sub: "Quickest way to reach us",
  },
  {
    label: "Email",
    value: "aayascreation@gmail.com",
    href: "mailto:aayascreation@gmail.com",
    sub: "We reply within a day",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <p className="eyebrow reveal">Get in Touch</p>
          <h1 className={`${styles.title} reveal`}>
            We&apos;d love to <span className="italic-accent">hear</span> from you.
          </h1>
          <p className={`lede reveal ${styles.sub}`}>
            Questions about a piece, an order, or stocking our earrings? Reach out — a real
            person from our small team in Ahmedabad will get back to you.
          </p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className={styles.methods}>
            {METHODS.map((m, i) => (
              <a
                key={m.label}
                href={m.href}
                target={m.href.startsWith("http") ? "_blank" : undefined}
                rel={m.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`${styles.method} reveal`}
                style={{ transitionDelay: `${i * 0.07}s` }}
              >
                <span className={styles.methodLabel}>{m.label}</span>
                <strong className={styles.methodValue}>{m.value}</strong>
                <span className={styles.methodSub}>{m.sub}</span>
                <span className={styles.methodArrow} aria-hidden="true">→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className={`container ${styles.band} reveal`}>
          <div className={styles.bandText}>
            <p className="eyebrow">Visit / Find Us</p>
            <h2 className={styles.bandTitle}>Ahmedabad, Gujarat, India</h2>
            <p className="mt-sm text-secondary" style={{ maxWidth: "44ch" }}>
              We craft and dispatch from Ahmedabad. Retail purchases are handled securely
              through our Amazon store, and wholesale enquiries through our partner form.
            </p>
          </div>
          <div className={styles.bandCta}>
            <a href="https://www.amazon.in/s?k=Aayas+Creation" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Shop on Amazon
            </a>
            <Link href="/wholesale" className="btn-outline">Wholesale Enquiry</Link>
          </div>
        </div>
      </section>
    </>
  );
}
