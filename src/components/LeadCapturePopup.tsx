'use client';

import { useState, useEffect } from 'react';
import styles from './LeadCapturePopup.module.css';

export default function LeadCapturePopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [targetUrl, setTargetUrl] = useState('');

    useEffect(() => {
        const handleLinkClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const link = target.closest('a');

            if (link && link.href.includes('amazon.in')) {
                const hasSeenPopup = sessionStorage.getItem('hasSeenLeadCapture');

                if (!hasSeenPopup) {
                    e.preventDefault();
                    setTargetUrl(link.href);
                    setIsOpen(true);
                }
            }
        };

        document.addEventListener('click', handleLinkClick);
        return () => document.removeEventListener('click', handleLinkClick);
    }, []);

    const handleClose = () => {
        sessionStorage.setItem('hasSeenLeadCapture', 'true');
        setIsOpen(false);
        if (targetUrl) {
            window.open(targetUrl, '_blank');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, send email to API here
        sessionStorage.setItem('hasSeenLeadCapture', 'true');
        setIsOpen(false);
        if (targetUrl) {
            window.open(targetUrl, '_blank');
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <button onClick={handleClose} className={styles.closeBtn}>&times;</button>
                <div className={styles.content}>
                    <div className={styles.imagePlaceholder}></div>
                    <div className={styles.textContent}>
                        <h3>Wait! Before you go...</h3>
                        <p>Get exclusive updates on our newest handmade collections before they sell out.</p>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <input type="email" placeholder="Enter your email" required />
                            <button type="submit" className="btn-primary">Get Updates</button>
                        </form>
                        <button className={styles.skipBtn} onClick={handleClose}>
                            No thanks, take me to Amazon
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
