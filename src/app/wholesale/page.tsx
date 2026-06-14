import type { Metadata } from "next";
import BulkOrderForm from "@/components/BulkOrderForm";
import JsonLd from "@/components/JsonLd";
import { abs, alternates, breadcrumbSchema } from "@/lib/seo";
import styles from "./wholesale.module.css";

export const metadata: Metadata = {
  title: "Wholesale Earrings Supplier in India | Bulk Orders",
  description:
    "Wholesale handmade earrings supplier in Ahmedabad, India. Aayas Creation offers bulk pricing, customization and reliable shipping for boutiques, resellers and wedding planners. Enquire now.",
  alternates: alternates("/wholesale"),
  openGraph: {
    title: "Wholesale & Bulk Orders | Aayas Creation",
    description:
      "Wholesale handmade-earrings pricing, customization and reliable shipping for boutiques, resellers and wedding planners across India and worldwide.",
    url: abs("/wholesale"),
    type: "website",
  },
};

const PERKS = [
  { t: "Special Wholesale Pricing", d: "Tiered pricing that scales with your order — built for healthy retail margins." },
  { t: "Customization Options", d: "Tailor colours, styles and packaging to suit your brand and customers." },
  { t: "Reliable Shipping", d: "Dependable dispatch and tracking, shipping to boutiques and planners worldwide." },
];

export default function WholesalePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Wholesale", path: "/wholesale" },
        ])}
      />
      <section className={styles.hero}>
        <div className="container">
          <p className="eyebrow reveal">For Boutiques &amp; Resellers</p>
          <h1 className={`${styles.title} reveal`}>
            Partner with <span className="italic-accent">Aayas</span>.
          </h1>
          <p className={`lede reveal ${styles.sub}`}>
            We supply boutiques, resellers and wedding planners globally. If you love our
            aesthetic and want to stock handcrafted jewelry your customers will remember,
            let&apos;s talk.
          </p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className={styles.perks}>
            {PERKS.map((p, i) => (
              <div key={p.t} className={`${styles.perk} reveal`} style={{ transitionDelay: `${i * 0.07}s` }}>
                <span className={styles.check} aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className={`container ${styles.formWrap}`}>
          <div className={`${styles.formIntro} reveal`}>
            <p className="eyebrow">Enquiry</p>
            <h2 className={styles.formTitle}>Request our wholesale catalogue.</h2>
            <p className="mt-sm text-secondary">
              Tell us a little about your business and the quantities you need. We&apos;ll get
              back to you with pricing and the full catalogue.
            </p>
            <div className={styles.direct}>
              <p><span>Call</span><a href="tel:+919104861625">+91 9104861625</a></p>
              <p><span>Email</span><a href="mailto:aayascreation@gmail.com">aayascreation@gmail.com</a></p>
              <p><span>Based in</span>Ahmedabad, Gujarat, India</p>
            </div>
          </div>
          <div className={`${styles.formCard} reveal`}>
            <BulkOrderForm className={styles.form} />
          </div>
        </div>
      </section>
    </>
  );
}
