import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import styles from "../../page.module.css";
import { getCategories, getCategory } from "@/lib/categories";
import { SITE_URL } from "@/lib/site";

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

  const url = `${SITE_URL}/collections/${cat.slug}`;
  return {
    // metaTitle already includes the brand ("… — Aayas Creation"), so use absolute
    // to bypass the root layout's "%s | Aayas Creation" template (avoids double brand).
    title: { absolute: cat.metaTitle },
    description: cat.metaDescription,
    keywords: cat.keywords,
    alternates: { canonical: url },
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

  // ItemList schema helps Google show this as a rich product collection.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: cat.title,
    description: cat.metaDescription,
    url: `${SITE_URL}/collections/${cat.slug}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: cat.products.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Product",
          name: p.name,
          image: p.image,
          description: p.description,
          url: `${SITE_URL}/products/${p.slug}`,
          brand: { "@type": "Brand", name: "Aayas Creation" },
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            url: p.amazonUrl,
          },
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className={styles.section}>
        <div className="container">
          <Link href="/#collection" className={styles.detailsLink}>
            ← Back to Collection
          </Link>
          <div className="text-center">
            <h1 style={{ marginTop: "1rem" }}>{cat.title}</h1>
            <p
              className="mt-sm text-secondary"
              style={{ maxWidth: "680px", margin: "0.5rem auto 0" }}
            >
              {cat.intro}
            </p>
          </div>

          <div className={styles.productGrid} style={{ marginTop: "2.5rem" }}>
            {cat.products.map((product) => (
              <div
                key={product.id}
                className={`${styles.productCard}${product.hot ? ` ${styles.hotCard}` : ""}`}
              >
                <div className={styles.productImageWrapper}>
                  {product.hot && (
                    <span className={styles.hotBadge}>🔥 Hot Selling</span>
                  )}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={`${product.name} — ${cat.title}`}
                    className={styles.productImage}
                  />
                </div>
                <div className={styles.productInfo}>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <a
                    href={product.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn-primary ${styles.buyBtn}`}
                  >
                    Buy on Amazon
                  </a>
                  <Link
                    href={`/products/${product.slug}`}
                    className={styles.detailsLink}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
