import Link from "next/link";
import type { Product } from "@/lib/products";
import styles from "./ProductCard.module.css";

export default function ProductCard({
  product,
  imageAlt,
  priority = false,
}: {
  product: Product;
  imageAlt?: string;
  priority?: boolean;
}) {
  return (
    <article className={styles.card}>
      <Link href={`/products/${product.slug}`} className={styles.media} aria-label={product.name}>
        {product.hot && <span className={styles.badge}>Bestseller</span>}
        {/* Amazon CDN images — plain img keeps remote-host config simple */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={imageAlt || product.name}
          className={styles.image}
          loading={priority ? "eager" : "lazy"}
        />
        <span className={styles.view}>View Details</span>
      </Link>

      <div className={styles.body}>
        <h3 className={styles.name}>
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className={styles.desc}>{product.description}</p>
        <div className={styles.actions}>
          <a
            href={product.amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.buy}
          >
            Buy on Amazon
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}
