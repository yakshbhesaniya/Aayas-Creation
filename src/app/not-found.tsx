import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts } from "@/lib/products";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you are looking for could not be found. Browse Aayas Creation's handmade artisan earrings instead.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const featured = getFeaturedProducts(3);

  return (
    <section className={`section ${styles.wrap}`}>
      <div className="container">
        <p className="eyebrow" style={{ justifyContent: "center", display: "inline-flex" }}>
          Error 404
        </p>
        <h1 className={styles.title}>This page wandered off.</h1>
        <p className="lede" style={{ maxWidth: "46ch", margin: "1.2rem auto 0" }}>
          We couldn&apos;t find the page you were looking for — but every Aayas Creation
          piece is still here, waiting to be discovered.
        </p>
        <div className={styles.cta}>
          <Link href="/" className="btn-primary">Back to Home</Link>
          <Link href="/shop" className="btn-outline">Shop All Earrings</Link>
        </div>

        <div className={styles.featured}>
          <p className="eyebrow" style={{ justifyContent: "center", display: "inline-flex", marginBottom: "2rem" }}>
            Handpicked Bestsellers
          </p>
          <div className="grid-products">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
