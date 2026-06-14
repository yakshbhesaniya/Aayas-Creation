import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import ProductCard from "@/components/ProductCard";
import JsonLd from "@/components/JsonLd";
import { getFeaturedProducts } from "@/lib/products";
import { getCategories } from "@/lib/categories";
import { websiteSchema, faqSchema } from "@/lib/seo";

export const HOME_FAQS = [
  {
    q: "What is Aayas Creation?",
    a: "Aayas Creation is a handmade artisan earrings brand based in Ahmedabad, Gujarat, India. We design and craft small-batch ethnic and bohemian earrings by hand and sell them through our official Amazon store.",
  },
  {
    q: "Are Aayas Creation earrings really handmade?",
    a: "Yes. Every pair is individually conceptualized, shaped and detailed by hand by skilled artisans in small batches. We do not mass-produce on machines, so no two pairs are exactly alike.",
  },
  {
    q: "Where are the earrings made?",
    a: "All Aayas Creation earrings are handcrafted in Ahmedabad, Gujarat, India, supporting local artisan talent and traditional craft.",
  },
  {
    q: "What styles of earrings do you offer?",
    a: "Our handmade collection includes boho drop and dangle earrings, traditional Indian jhumkas, cowrie shell earrings, fabric earrings, beaded earrings, terracotta-style earrings and festival earrings.",
  },
  {
    q: "Are the earrings lightweight and comfortable?",
    a: "Yes. Our earrings are designed to be featherlight and comfortable for all-day and long festive wear, without the weight or irritation of heavy metal jewelry.",
  },
  {
    q: "Where can I buy Aayas Creation earrings?",
    a: "Aayas Creation earrings are sold exclusively through our official Amazon India store, where checkout, payment and delivery are handled securely.",
  },
  {
    q: "Do you offer wholesale or bulk orders?",
    a: "Yes. We supply boutiques, resellers and wedding planners with wholesale pricing, customization options and reliable shipping. You can submit a wholesale enquiry through our Wholesale page.",
  },
  {
    q: "Are the earrings suitable for gifting and festivals?",
    a: "Absolutely. Each pair arrives as a small work of art, making it a thoughtful gift, and many designs are crafted specifically for festivals, weddings and ethnic celebrations.",
  },
  {
    q: "Do you ship across India?",
    a: "Yes. Because orders are fulfilled through Amazon India, our handmade earrings ship across India with Amazon's standard delivery and tracking.",
  },
  {
    q: "How do I care for handmade earrings?",
    a: "Keep your handmade earrings dry, store them away from direct moisture and perfume, and handle the beadwork and threadwork gently to preserve their finish and longevity.",
  },
];

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
      <JsonLd data={[websiteSchema(), faqSchema(HOME_FAQS)]} />

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

            <ul className={styles.heroTrust}>
              <li className={styles.rating}>
                <span className={styles.stars} aria-hidden="true">★★★★★</span>
                Loved on Amazon
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s-7-4.35-9.5-8.5C.5 9 2 5.5 5.5 5.5c2 0 3.2 1.2 4 2.3.8-1.1 2-2.3 4-2.3C17 5.5 18.5 9 16.5 12.5 14 16.65 12 21 12 21z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                100% Handmade
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2l2.4 6.8L21 9.2l-5 4.3 1.6 6.8L12 16.9 6.4 20.3 8 13.5l-5-4.3 6.6-.4L12 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>
                20+ Artisan Designs
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 12c6 0 9-3 9-9 0 6 3 9 9 9-6 0-9 3-9 9 0-6-3-9-9-9z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>
                Featherlight Comfort
              </li>
            </ul>
          </div>

          <p className={styles.galleryLabel}>Handpicked Bestsellers</p>

          <div className={styles.heroGallery}>
            {featured.slice(0, 4).map((p, i) => (
              <Link
                key={p.id}
                href={`/products/${p.slug}`}
                className={`${styles.galleryItem} ${styles[`g${i + 1}`]}`}
              >
                <div className={styles.galleryFrame}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={p.name} className={styles.galleryImg} />
                </div>
                <span className={styles.galleryCap}>{p.name}</span>
              </Link>
            ))}
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
            <p className="mt-md">
              Aayas Creation is a handmade artisan earrings brand based in Ahmedabad,
              Gujarat, India, crafting small-batch ethnic and bohemian earrings sold through
              its official Amazon store.
            </p>
            <p className="mt-sm text-secondary">
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
              <ProductCard
                key={p.id}
                product={p}
                priority={i < 3}
                className="reveal"
                style={{ transitionDelay: `${(i % 3) * 0.08}s` }}
              />
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

      {/* ---------- FAQ ---------- */}
      <section className="section" style={{ background: "var(--bg-secondary)" }}>
        <div className={`container ${styles.faqWrap}`}>
          <div className={`${styles.faqIntro} reveal`}>
            <p className="eyebrow">Good to Know</p>
            <h2 className={styles.faqTitle}>Frequently asked questions.</h2>
            <p className="mt-sm text-secondary">
              Everything you might want to know about our handmade earrings, where they&apos;re
              made, and how to buy.
            </p>
            <Link href="/contact" className="link-arrow" style={{ marginTop: "1.6rem" }}>
              Still have a question?
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </div>
          <div className={`${styles.faqList} reveal`}>
            {HOME_FAQS.map((f) => (
              <details key={f.q} className={styles.faqItem} name="home-faq">
                <summary>
                  {f.q}
                  <span className={styles.faqIcon} aria-hidden="true" />
                </summary>
                <p>{f.a}</p>
              </details>
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
