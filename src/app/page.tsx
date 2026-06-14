import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts } from "@/lib/products";
import { getCategories } from "@/lib/categories";

const VALUES = [
  { n: "01", t: "No Mass Production", d: "Every pair is conceived and finished by hand in small batches — never stamped out by a machine." },
  { n: "02", t: "Featherlight Comfort", d: "Designed for all-day wear and long festive days, without the weight or the ache." },
  { n: "03", t: "Made in India", d: "Crafted in Ahmedabad by skilled artisans, supporting local talent and living heritage." },
  { n: "04", t: "Made for Gifting", d: "Each piece arrives as a small work of art — a thoughtful, personal gift to be treasured." },
];

export default function Home() {
  const featured = getFeaturedProducts(6);
  const categories = getCategories().slice(0, 4);

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className={styles.hero}>
        <div className={styles.heroVectors} aria-hidden="true">
          <Image src="/earringvector1.png" alt="" width={220} height={220} className={`${styles.vec} ${styles.v1}`} unoptimized />
          <Image src="/earringvector3.png" alt="" width={260} height={260} className={`${styles.vec} ${styles.v2}`} unoptimized />
          <Image src="/earringvector2.png" alt="" width={180} height={180} className={`${styles.vec} ${styles.v3}`} unoptimized />
        </div>

        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <p className="eyebrow">Handmade Artisan Earrings</p>
            <h1 className={styles.heroTitle}>
              Adornments<br />crafted with <span className="italic-accent">soul</span>.
            </h1>
            <p className="lede" style={{ maxWidth: "44ch", marginTop: "1.5rem" }}>
              Ethnic &amp; bohemian earrings, individually shaped and detailed by hand in
              Ahmedabad. No two pairs alike — each one a quiet little story.
            </p>
            <div className={styles.heroCta}>
              <Link href="/shop" className="btn-primary">
                Explore the Collection
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
              <Link href="/about" className="link-arrow">Our Story</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- MARQUEE ---------- */}
      <div className={styles.marquee} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          {Array.from({ length: 2 }).map((_, r) => (
            <div className={styles.marqueeGroup} key={r}>
              {["Handmade with Soul", "Featherlight", "Ethnic & Bohemian", "Made in India", "Small Batch", "One of a Kind"].map((w) => (
                <span key={w}>{w}<i>✦</i></span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ---------- STORY ---------- */}
      <section className="section">
        <div className={`container ${styles.story}`}>
          <div className={`${styles.storyImg} reveal`}>
            <Image src="/logo.jpg" alt="Aayas Creation artisan craftsmanship" width={900} height={900} className={styles.storyImage} unoptimized />
            <span className={styles.storyStamp}>Est. Ahmedabad</span>
          </div>
          <div className={`${styles.storyCopy} reveal`}>
            <p className="eyebrow">The Story</p>
            <h2 className={styles.storyTitle}>Every piece tells a story of authentic Indian craftsmanship.</h2>
            <p className="mt-md text-secondary">
              Our earrings are never factory-produced. They are individually conceptualized,
              gently crafted, and carefully detailed by skilled artisans who pour patience
              and personality into every pair.
            </p>
            <p className="mt-sm text-secondary">
              When you wear Aayas Creation, you aren&apos;t just wearing jewelry — you&apos;re
              wearing a piece of art that celebrates uniqueness and soulful design.
            </p>
            <Link href="/about" className="link-arrow" style={{ marginTop: "2rem" }}>
              Read our full story
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- COLLECTIONS ---------- */}
      <section className="section" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="section-head reveal">
            <div>
              <p className="eyebrow">Shop by Style</p>
              <h2>Find the pair that feels like you.</h2>
            </div>
            <Link href="/shop" className="link-arrow">
              View all
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </div>

          <div className={styles.collectionGrid}>
            {categories.map((c, i) => (
              <Link
                href={`/collections/${c.slug}`}
                key={c.slug}
                className={`${styles.collCard} reveal`}
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className={styles.collImgWrap}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.products[0]?.image} alt={c.title} className={styles.collImg} />
                </div>
                <div className={styles.collMeta}>
                  <h3>{c.title}</h3>
                  <span>{c.products.length} styles →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FEATURED PRODUCTS ---------- */}
      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <div>
              <p className="eyebrow">Loved by Customers</p>
              <h2>Our bestselling pieces.</h2>
            </div>
            <Link href="/shop" className="link-arrow">
              Shop all earrings
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </div>
          <div className="grid-products">
            {featured.map((p, i) => (
              <div key={p.id} className="reveal" style={{ transitionDelay: `${(i % 3) * 0.08}s` }}>
                <ProductCard product={p} priority={i < 3} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- WHY HANDMADE ---------- */}
      <section className={`section ${styles.values}`}>
        <div className="container">
          <div className="section-head reveal">
            <div>
              <p className="eyebrow" style={{ color: "var(--accent-gold)" }}>Why Handmade</p>
              <h2 style={{ color: "var(--on-ink)" }}>The difference you can feel.</h2>
            </div>
          </div>
          <div className={styles.valueGrid}>
            {VALUES.map((v, i) => (
              <div key={v.n} className={`${styles.valueItem} reveal`} style={{ transitionDelay: `${i * 0.07}s` }}>
                <span className={styles.valueNum}>{v.n}</span>
                <h3>{v.t}</h3>
                <p>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- WHOLESALE BAND ---------- */}
      <section className="section">
        <div className={`container ${styles.wholesale} reveal`}>
          <div>
            <p className="eyebrow">For Boutiques &amp; Resellers</p>
            <h2 className={styles.wholesaleTitle}>Stock our handcrafted earrings.</h2>
            <p className="mt-sm text-secondary" style={{ maxWidth: "48ch" }}>
              We supply boutiques, resellers and wedding planners worldwide with special
              wholesale pricing, customization, and reliable shipping.
            </p>
          </div>
          <Link href="/wholesale" className="btn-primary">
            Partner With Us
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>
      </section>
    </>
  );
}
