import type { Metadata } from "next";
import { getAllProducts } from "@/lib/products";
import { getCategories } from "@/lib/categories";
import { SITE_URL } from "@/lib/site";
import ShopClient from "./ShopClient";
import styles from "./shop.module.css";

export const metadata: Metadata = {
  title: "Shop Handmade Earrings",
  description:
    "Browse the full collection of handmade artisan earrings by Aayas Creation — boho drops, jhumkas, cowrie shell, fabric, beaded and festival styles. Buy on Amazon.",
  alternates: { canonical: `${SITE_URL}/shop` },
  openGraph: {
    title: "Shop Handmade Earrings | Aayas Creation",
    description:
      "The full collection of handcrafted artisan earrings — ethnic & bohemian designs, made with soul.",
    url: `${SITE_URL}/shop`,
    type: "website",
  },
};

export default function ShopPage() {
  const products = getAllProducts();
  const categories = getCategories().map((c) => ({
    slug: c.slug,
    title: c.title,
    productIds: c.products.map((p) => p.id),
  }));

  return (
    <>
      <header className={styles.head}>
        <div className="container">
          <p className="eyebrow reveal">The Collection</p>
          <h1 className={`${styles.title} reveal`}>Every pair, made by hand.</h1>
          <p className={`lede reveal ${styles.sub}`}>
            {products.length} artisan designs — individually crafted in Ahmedabad. Filter by
            style, then complete your purchase securely on Amazon.
          </p>
        </div>
      </header>

      <section className="section section--tight">
        <div className="container">
          <ShopClient products={products} categories={categories} />
        </div>
      </section>
    </>
  );
}
