import Link from "next/link";
import styles from "./Footer.module.css";
import { getCategories } from "@/lib/categories";

export default function Footer() {
  const categories = getCategories();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.cta}>
          <p className={styles.ctaEyebrow}>Aayas Creation</p>
          <h2 className={styles.ctaTitle}>
            Adornments with a <span className="italic-accent">soul</span>.
          </h2>
          <a
            href="https://www.amazon.in/s?k=Aayas+Creation"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            style={{ marginTop: "1.8rem" }}
          >
            Explore on Amazon
          </a>
        </div>

        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <h3 className={styles.brand}>Aayas Creation</h3>
            <p className={styles.tagline}>
              Handmade artisan earrings, individually crafted in Ahmedabad, India —
              ethnic &amp; bohemian designs made with soul.
            </p>
            <div className={styles.socials}>
              <a href="https://www.instagram.com/aayascreation/" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://www.facebook.com/aayascreation/" target="_blank" rel="noopener noreferrer">Facebook</a>
            </div>
          </div>

          <div className={styles.col}>
            <h4>Explore</h4>
            <ul>
              <li><Link href="/shop">Shop All</Link></li>
              <li><Link href="/about">Our Story</Link></li>
              <li><Link href="/wholesale">Wholesale</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className={styles.col}>
            <h4>Shop by Style</h4>
            <ul>
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/collections/${c.slug}`}>{c.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <h4>Reach Us</h4>
            <ul>
              <li><a href="tel:+919104861625">+91 9104861625</a></li>
              <li><a href="mailto:aayascreation@gmail.com">aayascreation@gmail.com</a></li>
              <li className={styles.muted}>Ahmedabad, Gujarat, India</li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {year} Aayas Creation. All rights reserved.</p>
          <div className={styles.bottomLinks}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
