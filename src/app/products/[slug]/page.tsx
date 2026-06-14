import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ProductGallery from '@/components/ProductGallery';
import ProductCard from '@/components/ProductCard';
import JsonLd from '@/components/JsonLd';
import { getAllProducts, getProduct, getRelatedProducts } from '@/lib/products';
import { abs, alternates, productSchema, breadcrumbSchema } from '@/lib/seo';
import styles from './page.module.css';

export async function generateStaticParams() {
    return getAllProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const product = getProduct(slug);

    if (!product) return { title: 'Product Not Found' };

    // Complete, standalone factual meta description (~150-160 chars).
    const metaDesc = `${product.description} Handmade in Ahmedabad, India by Aayas Creation — shop this artisan earring design on Amazon.`;

    return {
        // Bare name only — the root layout's title template appends "| Aayas Creation".
        title: product.name,
        description: metaDesc,
        alternates: alternates(`/products/${product.slug}`),
        openGraph: {
            title: `${product.name} | Handmade Artisan Earrings`,
            description: product.longDescription || metaDesc,
            url: abs(`/products/${product.slug}`),
            type: 'website',
            images: [product.image],
        },
    };
}

const FEATURES = [
    'Handmade with Soul',
    'Ethnic & Bohemian',
    'Featherlight Comfort',
    'Authentic Indian Craftsmanship',
];

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = getProduct(slug);

    if (!product) notFound();

    const related = getRelatedProducts(slug, 3);

    return (
        <>
            <JsonLd
                data={[
                    productSchema(product),
                    breadcrumbSchema([
                        { name: 'Home', path: '/' },
                        { name: 'Shop', path: '/shop' },
                        { name: product.name, path: `/products/${product.slug}` },
                    ]),
                ]}
            />

            <div className={styles.wrap}>
                <div className="container">
                    <nav className={styles.crumbs} aria-label="Breadcrumb">
                        <Link href="/">Home</Link>
                        <span aria-hidden="true">/</span>
                        <Link href="/shop">Shop</Link>
                        <span aria-hidden="true">/</span>
                        <span className={styles.crumbCurrent}>{product.name}</span>
                    </nav>

                    <div className={styles.grid}>
                        <div className={styles.gallery}>
                            <ProductGallery images={product.gallery || [product.image]} productName={product.name} />
                        </div>

                        <div className={styles.info}>
                            {product.hot && <span className={styles.badge}>Bestseller</span>}
                            <h1 className={styles.title}>{product.name}</h1>
                            <p className={styles.desc}>{product.longDescription}</p>

                            <ul className={styles.features}>
                                {FEATURES.map((f) => (
                                    <li key={f}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <div className={styles.actions}>
                                <a href={product.amazonUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                                    Buy on Amazon
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                </a>
                                <p className={styles.notice}>
                                    Secure retail checkout is handled on our official Amazon store.
                                </p>
                            </div>

                            <div className={styles.meta}>
                                <Link href="/wholesale">Buying in bulk? See wholesale →</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {related.length > 0 && (
                <section className="section" style={{ background: 'var(--bg-secondary)' }}>
                    <div className="container">
                        <div className="section-head">
                            <div>
                                <p className="eyebrow">You May Also Like</p>
                                <h2>More handcrafted pieces.</h2>
                            </div>
                            <Link href="/shop" className="link-arrow">
                                View all
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </Link>
                        </div>
                        <div className="grid-products">
                            {related.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
