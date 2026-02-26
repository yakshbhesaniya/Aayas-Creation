import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import productsData from '@/data/products.json';
import styles from './page.module.css';
import Link from 'next/link';
import ProductGallery from '@/components/ProductGallery';

interface Product {
    id: string;
    name: string;
    description: string;
    amazonUrl: string;
    slug: string;
    image: string;
    gallery?: string[];
}

const typedProductsData: Product[] = productsData as Product[];

// Generate static params for all products so they get statically rendered at build time
export async function generateStaticParams() {
    return typedProductsData.map((product) => ({
        slug: product.slug,
    }));
}

// Dynamically generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const product = typedProductsData.find((p) => p.slug === resolvedParams.slug);

    if (!product) return { title: 'Product Not Found' };

    return {
        title: `${product.name} | Aayas Creation`,
        description: product.description,
        openGraph: {
            title: product.name,
            description: product.description,
            images: [product.image],
        },
    };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const product = typedProductsData.find((p) => p.slug === resolvedParams.slug);

    if (!product) {
        notFound();
    }

    // Schema Markup for Handmade Product
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        image: product.image,
        description: product.description,
        brand: {
            '@type': 'Brand',
            name: 'Aayas Creation',
        },
        offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            url: product.amazonUrl,
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className={styles.productContainer}>
                <div className="container">
                    <Link href="/#collection" className={styles.backLink}>← Back to Collection</Link>
                    <div className={styles.productGrid}>
                        <div className={styles.imageColumn}>
                            {/* Pass gallery array if it exists, otherwise pass just the main image */}
                            <ProductGallery images={product.gallery || [product.image]} productName={product.name} />
                        </div>
                        <div className={styles.infoColumn}>
                            <h1 className={styles.productTitle}>{product.name}</h1>
                            {(product as Product & { hot?: boolean }).hot && (
                                <span className={styles.hotBadge}>🔥 Hot Selling</span>
                            )}
                            <p className={styles.productDescription}>{product.description}</p>

                            <div className={styles.featuresList}>
                                <div className={styles.feature}>✨ Handmade with Soul</div>
                                <div className={styles.feature}>🌿 Ethnic & Bohemian</div>
                                <div className={styles.feature}>🇮🇳 Authentic Indian Craftsmanship</div>
                            </div>

                            <div className={styles.actions}>
                                <p className={styles.amazonNotice}>This product is exclusively available for retail purchase on our Amazon store.</p>
                                <a href={product.amazonUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                                    Buy on Amazon
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
