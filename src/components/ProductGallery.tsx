'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './ProductGallery.module.css';

interface ProductGalleryProps {
    images: string[];
    productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const touchStartX = useRef<number | null>(null);

    // Auto-slide every 3.5 seconds
    useEffect(() => {
        if (!images || images.length <= 1) return;
        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % images.length);
        }, 3500);
        return () => clearInterval(interval);
    }, [images]);

    // Scroll active thumbnail into view
    useEffect(() => {
        const activeBtn = thumbnailRefs.current[activeIndex];
        if (activeBtn) {
            activeBtn.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }, [activeIndex]);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;
        const delta = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(delta) > 40) {
            if (delta > 0) {
                // Swipe left → next
                setActiveIndex((i) => (i + 1) % images.length);
            } else {
                // Swipe right → prev
                setActiveIndex((i) => (i - 1 + images.length) % images.length);
            }
        }
        touchStartX.current = null;
    };

    if (!images || images.length === 0) return null;

    return (
        <div className={styles.galleryContainer}>
            <div
                className={styles.mainImageWrapper}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    className={styles.carouselTrack}
                    style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                    {images.map((img, i) => (
                        <div key={i} className={styles.slide}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={img} alt={`${productName} - view ${i + 1}`} className={styles.mainImage} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Thumbnail strip — hidden on mobile via CSS */}
            {images.length > 1 && (
                <div className={styles.thumbnails}>
                    {images.map((imgUrl, index) => (
                        <button
                            key={index}
                            ref={(el) => { thumbnailRefs.current[index] = el; }}
                            onClick={() => setActiveIndex(index)}
                            className={`${styles.thumbnailBtn} ${index === activeIndex ? styles.active : ''}`}
                            aria-label={`View image ${index + 1}`}
                        >
                            <div
                                className={styles.thumbnailImg}
                                style={{ backgroundImage: `url(${imgUrl})` }}
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Dot indicators — shown on mobile only via CSS */}
            {images.length > 1 && (
                <div className={styles.dots}>
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`${styles.dot} ${index === activeIndex ? styles.activeDot : ''}`}
                            aria-label={`Go to image ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
