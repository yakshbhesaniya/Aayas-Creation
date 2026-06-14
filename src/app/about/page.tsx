import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SITE_URL } from "@/lib/site";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "The story of Aayas Creation — handmade artisan earrings crafted in Ahmedabad, India. Discover our philosophy of soulful, small-batch, lightweight design.",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: "Our Story | Aayas Creation",
    description:
      "Handmade artisan earrings crafted in Ahmedabad, India — soulful, small-batch, lightweight design.",
    url: `${SITE_URL}/about`,
    type: "website",
  },
};

const PROCESS = [
  { n: "01", t: "Conceived", d: "Each design begins as an idea — a colour, a texture, a feeling drawn from Indian heritage and boho spirit." },
  { n: "02", t: "Crafted", d: "Skilled artisans shape, thread and assemble every pair by hand, in small batches, never on a machine line." },
  { n: "03", t: "Detailed", d: "Finishing touches are added with patience — the small imperfections that make each pair genuinely one of a kind." },
  { n: "04", t: "Delivered", d: "Pieces reach you through our Amazon store, ready to wear or to gift as a small work of art." },
];

const STATS = [
  { k: "100%", v: "Handmade" },
  { k: "20+", v: "Unique designs" },
  { k: "Small", v: "Batch crafted" },
  { k: "India", v: "Proudly made" },
];

export default function AboutPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <p className="eyebrow reveal">Our Story</p>
          <h1 className={`${styles.heroTitle} reveal`}>
            Jewelry with a <span className="italic-accent">heartbeat</span>.
          </h1>
          <p className={`lede reveal ${styles.heroLede}`}>
            Aayas Creation began with a simple belief — that what you wear should carry
            meaning, not just a price tag. We make earrings the slow way: by hand, with soul.
          </p>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.intro}`}>
          <div className={`${styles.introImg} reveal`}>
            <Image src="/logo.jpg" alt="Aayas Creation handmade earrings" width={900} height={1100} className={styles.img} unoptimized />
          </div>
          <div className={`${styles.introCopy} reveal`}>
            <h2>Not factory-produced. Individually made.</h2>
            <p className="mt-md text-secondary">
              Every piece we create tells a story of authentic Indian craftsmanship. Our
              earrings are individually conceptualized, gently crafted, and carefully detailed
              by skilled artisans in Ahmedabad, Gujarat.
            </p>
            <p className="mt-sm text-secondary">
              We deliberately work in small batches. It means no two pairs are ever exactly
              alike — and that the person wearing them owns something genuinely theirs. When
              you choose Aayas Creation, you support local talent and help keep a living craft
              tradition alive.
            </p>
            <div className={styles.stats}>
              {STATS.map((s) => (
                <div key={s.v} className={styles.stat}>
                  <strong>{s.k}</strong>
                  <span>{s.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${styles.process}`}>
        <div className="container">
          <div className="section-head reveal">
            <div>
              <p className="eyebrow" style={{ color: "var(--accent-gold)" }}>The Craft</p>
              <h2 style={{ color: "var(--on-ink)" }}>From idea to adornment.</h2>
            </div>
          </div>
          <div className={styles.steps}>
            {PROCESS.map((p, i) => (
              <div key={p.n} className={`${styles.step} reveal`} style={{ transitionDelay: `${i * 0.07}s` }}>
                <span className={styles.stepNum}>{p.n}</span>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.quote} reveal`}>
          <p>
            &ldquo;When you wear Aayas Creation, you aren&apos;t just wearing jewelry —
            you&apos;re wearing a piece of <span className="italic-accent">art</span>.&rdquo;
          </p>
          <div className={styles.cta}>
            <Link href="/shop" className="btn-primary">
              Explore the Collection
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
            <Link href="/wholesale" className="btn-outline">Wholesale Enquiries</Link>
          </div>
        </div>
      </section>
    </>
  );
}
