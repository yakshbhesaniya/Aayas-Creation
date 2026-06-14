"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCategories } from "@/lib/categories";
import styles from "./Navbar.module.css";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "Our Story" },
  { href: "/wholesale", label: "Wholesale" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const categories = getCategories();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.topBar}>
        <div className={`container ${styles.topInner}`}>
          <span className={styles.topNote}>Handcrafted in Ahmedabad, India</span>
          <div className={styles.topContacts}>
            <a href="tel:+919104861625">+91 9104861625</a>
            <span className={styles.dot} aria-hidden="true">·</span>
            <a href="mailto:aayascreation@gmail.com">aayascreation@gmail.com</a>
          </div>
        </div>
      </div>

      <nav className={`container ${styles.nav}`}>
        <Link href="/" className={styles.brand} onClick={() => setOpen(false)}>
          <span className={styles.brandMark}>Aayas</span>
          <span className={styles.brandSub}>Creation</span>
        </Link>

        <ul className={styles.links}>
          {NAV.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            const isShop = item.href === "/shop";
            return (
              <li key={item.href} className={isShop ? styles.hasMenu : undefined}>
                <Link
                  href={item.href}
                  className={`${styles.link} ${active ? styles.active : ""}`}
                >
                  {item.label}
                  {isShop && (
                    <svg className={styles.caret} width="10" height="10" viewBox="0 0 12 12" aria-hidden="true">
                      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
                    </svg>
                  )}
                </Link>
                {isShop && categories.length > 0 && (
                  <div className={styles.dropdown}>
                    <div className={styles.dropInner}>
                      <Link href="/shop" className={styles.dropFeatured}>
                        All Earrings
                        <span>Browse the full collection</span>
                      </Link>
                      <ul className={styles.dropList}>
                        {categories.map((c) => (
                          <li key={c.slug}>
                            <Link href={`/collections/${c.slug}`}>{c.title}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <a
          href="https://www.amazon.in/s?k=Aayas+Creation"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
        >
          Shop on Amazon
        </a>

        <button
          className={styles.burger}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className={open ? styles.barOpen : ""} />
          <span className={open ? styles.barOpen : ""} />
          <span className={open ? styles.barOpen : ""} />
        </button>
      </nav>

      {/* Mobile overlay */}
      <div className={`${styles.overlay} ${open ? styles.overlayOpen : ""}`}>
        <ul className={styles.mobileLinks}>
          {NAV.map((item, i) => (
            <li key={item.href} style={{ transitionDelay: `${0.06 * i + 0.1}s` }}>
              <Link href={item.href} onClick={() => setOpen(false)}>
                <span className={styles.mobileIndex}>0{i + 1}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.mobileFoot}>
          <a href="https://www.amazon.in/s?k=Aayas+Creation" target="_blank" rel="noopener noreferrer" className="btn-primary">
            Shop on Amazon
          </a>
          <p>
            <a href="tel:+919104861625">+91 9104861625</a>
            <br />
            <a href="mailto:aayascreation@gmail.com">aayascreation@gmail.com</a>
          </p>
        </div>
      </div>
    </header>
  );
}
