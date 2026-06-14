"use client";

import { useEffect } from "react";

/**
 * Global scroll-reveal: any element with the `.reveal` class fades/slides up
 * once when it enters the viewport. Pure CSS does the animation; this just
 * toggles `.is-visible`. Respects prefers-reduced-motion (CSS handles it).
 */
export default function ScrollReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });

  return null;
}
