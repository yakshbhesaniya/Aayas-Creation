import Link from 'next/link';
import styles from './Footer.module.css';
import { getCategories } from '@/lib/categories';

export default function Footer() {
    const categories = getCategories();
    return (
        <footer id="contact" className={styles.footer}>
            <div className={`container ${styles.footerGrid}`}>
                <div className={styles.brandInfo}>
                    <h3 className={styles.footerBrand}>Aayas Creation</h3>
                    <p>Handmade Earrings. Crafted with Soul.</p>
                    <div className={styles.socialLinks}>
                        <a href="https://www.instagram.com/aayascreation/" target="_blank" rel="noopener noreferrer">Instagram</a>
                        <a href="https://www.facebook.com/aayascreation/" target="_blank" rel="noopener noreferrer">Facebook</a>
                    </div>
                </div>

                <div className={styles.linksBlock}>
                    <h4>Shop</h4>
                    <ul>
                        <li><Link href="/#collection">All Collections</Link></li>
                        <li><a href="https://www.amazon.in/s?k=Aayas+Creation&crid=78LTVYPPLLM2&sprefix=aayas+creation%2Caps%2C366&ref=nb_sb_noss_1" target="_blank" rel="noopener noreferrer">Amazon Store</a></li>
                    </ul>
                </div>

                <div className={styles.linksBlock}>
                    <h4>Shop by Style</h4>
                    <ul>
                        {categories.map((c) => (
                            <li key={c.slug}>
                                <Link href={`/collections/${c.slug}`}>{c.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={styles.linksBlock}>
                    <h4>Business</h4>
                    <ul>
                        <li><Link href="/#about">About Us</Link></li>
                        <li><Link href="/#bulk-orders">Bulk Orders</Link></li>
                        <li><Link href="/#contact">Contact</Link></li>
                    </ul>
                </div>
            </div>
            <div className={styles.footerBottom}>
                <p>&copy; {new Date().getFullYear()} Aayas Creation. All rights reserved.</p>
            </div>
        </footer>
    );
}
