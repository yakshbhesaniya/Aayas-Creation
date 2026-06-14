import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategories, getCategory } from "@/lib/categories";
import { abs, alternates, breadcrumbSchema } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import ProductCard from "@/components/ProductCard";
import styles from "./collection.module.css";

export async function generateStaticParams() {
  return getCategories().map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return { title: "Collection Not Found" };

  const url = abs(`/collections/${cat.slug}`);
  return {
    // metaTitle already includes the brand ("… — Aayas Creation"), so use absolute
    // to bypass the root layout's "%s | Aayas Creation" template (avoids double brand).
    title: { absolute: cat.metaTitle },
    description: cat.metaDescription,
    keywords: cat.keywords,
    alternates: alternates(`/collections/${cat.slug}`),
    openGraph: {
      title: cat.metaTitle,
      description: cat.metaDescription,
      url,
      images: cat.products[0] ? [cat.products[0].image] : [],
      type: "website",
    },
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: cat.title,
    description: cat.metaDescription,
    url: abs(`/collections/${cat.slug}`),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: cat.products.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Product",
          name: p.name,
          image: p.image,
          description: p.longDescription || p.description,
          url: abs(`/products/${p.slug}`),
          brand: { "@type": "Brand", name: "Aayas Creation" },
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            priceCurrency: "INR",
            url: p.amazonUrl,
          },
        },
      })),
    },
  };

  return (
    <>
      <JsonLd
        data={[
          collectionSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
            { name: cat.title, path: `/collections/${cat.slug}` },
          ]),
        ]}
      />

      <header className={styles.head}>
        <div className="container">
          <nav className={styles.crumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/shop">Shop</Link>
            <span aria-hidden="true">/</span>
            <span className={styles.crumbCurrent}>{cat.title}</span>
          </nav>
          <p className="eyebrow reveal">Collection</p>
          <h1 className={`${styles.title} reveal`}>{cat.title}</h1>
          <p className={`lede reveal ${styles.intro}`}>{cat.intro}</p>
        </div>
      </header>

      <section className="section section--tight">
        <div className="container">
          <div className="grid-products">
            {cat.products.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                imageAlt={`${product.name} — ${cat.title}`}
                priority={i < 4}
              />
            ))}
          </div>

          <div className={styles.foot}>
            <Link href="/shop" className="link-arrow">
              Browse all earrings
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
