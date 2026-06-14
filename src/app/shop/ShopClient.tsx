"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/products";
import styles from "./shop.module.css";

interface CatRef {
  slug: string;
  title: string;
  productIds: string[];
}

export default function ShopClient({
  products,
  categories,
}: {
  products: Product[];
  categories: CatRef[];
}) {
  const [active, setActive] = useState<string>("all");

  const visible = useMemo(() => {
    if (active === "all") return products;
    const cat = categories.find((c) => c.slug === active);
    if (!cat) return products;
    const ids = new Set(cat.productIds);
    return products.filter((p) => ids.has(p.id));
  }, [active, products, categories]);

  return (
    <div>
      <div className={styles.filters} role="tablist" aria-label="Filter by style">
        <button
          className={`${styles.chip} ${active === "all" ? styles.chipActive : ""}`}
          onClick={() => setActive("all")}
          role="tab"
          aria-selected={active === "all"}
        >
          All <span>{products.length}</span>
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            className={`${styles.chip} ${active === c.slug ? styles.chipActive : ""}`}
            onClick={() => setActive(c.slug)}
            role="tab"
            aria-selected={active === c.slug}
          >
            {c.title.replace(/^Handmade\s/, "")} <span>{c.productIds.length}</span>
          </button>
        ))}
      </div>

      <div className="grid-products" style={{ marginTop: "2.5rem" }}>
        {visible.map((p, i) => (
          <ProductCard key={p.id} product={p} priority={i < 4} />
        ))}
      </div>
    </div>
  );
}
