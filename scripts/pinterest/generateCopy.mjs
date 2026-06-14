// Turns the product catalog into a queue of ready-to-post Pinterest pins.
// Each product yields several pins (one per gallery image, with rotating copy
// variants) so we have weeks of unique, keyword-rich content from 23 products.

import { detectStyle, OCCASIONS, BASE_TAGS } from "./keywords.mjs";

// Deterministic pick so the same pin always gets the same copy (stable identity).
function pick(arr, seed) {
  return arr[Math.abs(seed) % arr.length];
}

function titleVariants(name, style, occasion) {
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  return [
    `${name} — Handmade ${cap(style)}`,
    `${cap(style)} for ${cap(occasion)} | ${name}`,
    `Handmade ${cap(style)}: ${name}`,
    `${name} | Artisan ${cap(style)} from India`,
  ];
}

function descriptionVariants(product, style, occasion, tags) {
  const base = (product.description || "").trim().replace(/\s+/g, " ");
  const hashtags = [...new Set([...tags, ...BASE_TAGS])]
    .slice(0, 8)
    .map((t) => `#${t}`)
    .join(" ");
  const cta = "Tap to shop on Amazon ✨";
  const v = [
    `${base} Perfect for ${occasion}. Handcrafted ${style} by Aayas Creation. ${cta} ${hashtags}`,
    `Looking for ${style}? ${base} Lightweight, ethically handmade in India and made for ${occasion}. ${cta} ${hashtags}`,
    `${base} These artisan ${style} pair beautifully with ${occasion}. Each piece is handmade with soul. ${cta} ${hashtags}`,
  ];
  return v;
}

// Build the full ordered queue. Order interleaves PRODUCTS first (round 1 = one pin
// per product), so a single day's batch never spams the same product repeatedly.
export function buildPinQueue(products) {
  const queue = [];
  // How many pins per product = number of gallery images (deduped), capped at 5.
  const perProduct = products.map((p) => {
    const imgs = [...new Set([p.image, ...(p.gallery || [])])].filter(Boolean);
    return { p, imgs: imgs.slice(0, 5) };
  });
  const maxRounds = Math.max(...perProduct.map((x) => x.imgs.length), 1);

  for (let round = 0; round < maxRounds; round++) {
    for (const { p, imgs } of perProduct) {
      if (round >= imgs.length) continue;
      const styleRule = detectStyle(p);
      const style = styleRule.style;
      const tags = styleRule.tags || [];
      const occasion = pick(OCCASIONS, hash(p.id) + round);
      const seed = hash(p.id) + round * 7;
      const title = pick(titleVariants(p.name, style, occasion), seed).slice(0, 100);
      const description = pick(
        descriptionVariants(p, style, occasion, tags),
        seed
      ).slice(0, 500);
      const imageUrl = imgs[round];

      queue.push({
        key: `${p.id}::${round}`, // stable identity for de-dup state
        productId: p.id,
        title,
        description,
        imageUrl,
        link: p.amazonUrl,
      });
    }
  }
  return queue;
}

function hash(str) {
  let h = 0;
  for (let i = 0; i < String(str).length; i++) {
    h = (h << 5) - h + String(str).charCodeAt(i);
    h |= 0;
  }
  return h;
}
