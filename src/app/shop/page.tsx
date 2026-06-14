import type { Metadata } from "next";
import { getAllProducts } from "@/lib/products";
import { getCategories } from "@/lib/categories";
import { abs, alternates, breadcrumbSchema, itemListSchema } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import ShopClient from "./ShopClient";
import styles from "./shop.module.css";

export const metadata: Metadata = {
  title: "Shop Handmade Earrings Online in India",
  description:
    "Browse the full collection of handmade artisan earrings by Aayas Creation — boho drops, jhumkas, cowrie shell, fabric, beaded and festival styles. Handcrafted in India, buy on Amazon.",
  alternates: alternates("/shop"),
  openGraph: {
    title: "Shop Handmade Earrings | Aayas Creation",
    description:
      "The full collection of handcrafted artisan earrings — ethnic & bohemian designs, made with soul in Ahmedabad, India.",
    url: abs("/shop"),
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
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
          ]),
          itemListSchema(products, "Aayas Creation Handmade Earrings"),
        ]}
      />

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
