'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Link href="/">Aayas Creation</Link>
        </div>

        <button className={styles.hamburger} onClick={toggleMenu} aria-label="Toggle menu">
          <span className={`${styles.bar} ${isOpen ? styles.barOpen : ''}`}></span>
          <span className={`${styles.bar} ${isOpen ? styles.barOpen : ''}`}></span>
          <span className={`${styles.bar} ${isOpen ? styles.barOpen : ''}`}></span>
        </button>

        <ul className={`${styles.navLinks} ${isOpen ? styles.navLinksOpen : ''}`}>
          <li><Link href="/" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link href="/#collection" onClick={() => setIsOpen(false)}>Collection</Link></li>
          <li><Link href="/#about" onClick={() => setIsOpen(false)}>Our Story</Link></li>
          <li><Link href="/#bulk-orders" onClick={() => setIsOpen(false)}>Bulk Orders</Link></li>
          <li><Link href="/#contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}
