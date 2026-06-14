"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Global scroll-reveal: any element with the `.reveal` class fades/slides up
 * once when it enters the viewport. Pure CSS does the animation; this just
 * toggles `.is-visible`.
 *
 * Re-runs on every route change (usePathname) because this component lives in
 * the root layout and does NOT remount on client-side navigation — without
 * this, freshly navigated pages would keep their `.reveal` elements hidden.
 *
 * Respects prefers-reduced-motion (CSS handles that).
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)")
    );
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
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
    );

    els.forEach((el) => io.observe(el));

    // Safety net: if anything is still hidden shortly after load (e.g. observer
    // edge cases), reveal it so content can never get stuck invisible.
    const fallback = setTimeout(() => {
      els.forEach((el) => el.classList.add("is-visible"));
    }, 1200);

    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, [pathname]);

  return null;
}
