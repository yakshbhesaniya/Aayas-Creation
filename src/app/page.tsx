import styles from './page.module.css';
import productsData from '@/data/products.json';
import Link from 'next/link';
import BulkOrderForm from '@/components/BulkOrderForm';
import Image from 'next/image';

export default function Home() {
  return (
    <div className={styles.page}>

      {/* Hero Section */}
      <section className={styles.hero}>
        {/* Floating earring vectors — random positions */}
        <div className={styles.heroBg} aria-hidden="true">
          <Image src="/earringvector1.png" alt="" width={260} height={260} className={`${styles.floatEl} ${styles.f1}`} unoptimized />
          <Image src="/earringvector2.png" alt="" width={210} height={210} className={`${styles.floatEl} ${styles.f2}`} unoptimized />
          <Image src="/earringvector3.png" alt="" width={300} height={300} className={`${styles.floatEl} ${styles.f3}`} unoptimized />
          <Image src="/earringvector1.png" alt="" width={180} height={180} className={`${styles.floatEl} ${styles.f4}`} unoptimized />
          <Image src="/earringvector3.png" alt="" width={240} height={240} className={`${styles.floatEl} ${styles.f5}`} unoptimized />
          <Image src="/earringvector2.png" alt="" width={280} height={280} className={`${styles.floatEl} ${styles.f6}`} unoptimized />
          <Image src="/earringvector1.png" alt="" width={200} height={200} className={`${styles.floatEl} ${styles.f7}`} unoptimized />
          <Image src="/earringvector3.png" alt="" width={250} height={250} className={`${styles.floatEl} ${styles.f8}`} unoptimized />
          <Image src="/earringvector2.png" alt="" width={190} height={190} className={`${styles.floatEl} ${styles.f9}`} unoptimized />
        </div>

        <div className={styles.heroContent}>
          <h1 className="fade-in">Handmade Earrings. <br /> Crafted with Soul.</h1>
          <p className="fade-in mt-sm">Embrace the beauty of artisan-crafted, ethnic and bohemian aesthetics.</p>
          <div className={`${styles.ctaGroup} fade-in mt-md`}>
            <Link href="#collection" className="btn-primary">View Collection</Link>
            <Link href="#bulk-orders" className="btn-outline">Bulk Orders</Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`${styles.section} ${styles.about}`}>
        <div className={`container ${styles.aboutGrid}`}>
          <div className={styles.aboutImageContainer}>
            <Image
              src="/logo.jpg"
              alt="Aayas Creation Logo"
              width={1400}
              height={1400}
              className={styles.aboutImage}
              unoptimized
            />
          </div>
          <div className={styles.aboutText}>
            <h2>The Story of <br /> Aayas Creation</h2>
            <p className="mt-md">Every piece we create tells a story of authentic Indian craftsmanship. Our earrings are not factory-produced; they are individually conceptualized, gently crafted, and carefully detailed by skilled artisans.</p>
            <p className="mt-sm">When you wear Aayas Creation, you are not just wearing jewelry. You are wearing a piece of art that celebrates uniqueness and soulful design.</p>
          </div>
        </div>
      </section>

      {/* Product Gallery Section */}
      <section id="collection" className={styles.section}>
        <div className="container text-center">
          <h2>Our Collection</h2>
          <p className="mt-sm mb-lg text-secondary">Discover our handpicked aesthetic pieces.</p>

          <div className={styles.productGrid}>
            {productsData.map((product) => (
              <div key={product.id} className={`${styles.productCard}${(product as { hot?: boolean }).hot ? ` ${styles.hotCard}` : ''}`}>
                <div className={styles.productImageWrapper}>
                  {(product as { hot?: boolean }).hot && (
                    <span className={styles.hotBadge}>🔥 Hot Selling</span>
                  )}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={product.image} alt={product.name} className={styles.productImage} />
                </div>
                <div className={styles.productInfo}>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <a href={product.amazonUrl} target="_blank" rel="noopener noreferrer" className={`btn-primary ${styles.buyBtn}`}>
                    Buy on Amazon
                  </a>
                  <Link href={`/products/${product.slug}`} className={styles.detailsLink}>View Details</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Handmade Section */}
      <section className={`${styles.section} ${styles.whyHandmade}`}>
        <div className="container text-center">
          <h2>Why Choose Handmade?</h2>
          <div className={`${styles.featuresGrid} mt-lg`}>
            <div className={styles.featureItem}>
              <h3>No Mass Production</h3>
              <p>Each pair is unique and crafted in small batches.</p>
            </div>
            <div className={styles.featureItem}>
              <h3>Lightweight Comfort</h3>
              <p>Designed for prolonged wear without irritation.</p>
            </div>
            <div className={styles.featureItem}>
              <h3>Made in India</h3>
              <p>Supporting local talent and preserving heritage.</p>
            </div>
            <div className={styles.featureItem}>
              <h3>Ideal for Gifting</h3>
              <p>A memorable and personal gift for loved ones.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bulk Order Section */}
      <section id="bulk-orders" className={styles.section}>
        <div className={`container ${styles.bulkGrid}`}>
          <div className={styles.bulkText}>
            <h2>Partner With Us</h2>
            <p className="mt-md">We supply to boutiques, resellers, and wedding planners globally. If you love our aesthetic and want to stock our handcrafted jewelry, get in touch.</p>
            <ul className="mt-sm">
              <li>✓ Special Wholesale Pricing</li>
              <li>✓ Customization Options</li>
              <li>✓ Reliable Shipping</li>
            </ul>
          </div>
          <div className={styles.bulkFormContainer}>
            <BulkOrderForm className={styles.bulkForm} />
          </div>
        </div>
      </section>

    </div>
  );
}
