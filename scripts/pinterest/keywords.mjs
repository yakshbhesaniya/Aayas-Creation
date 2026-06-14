// Keyword bank for Pinterest SEO copy generation.
// Pinterest is a visual SEARCH engine — pins rank on these keywords, so we weave
// them into titles/descriptions automatically. Tuned for handmade Indian earrings.

// Detect a product's "style" from its name/description so copy stays relevant.
export const STYLE_RULES = [
  { match: /jhumka|jhumki/i,            style: "jhumka earrings",        tags: ["jhumka", "jhumkaearrings", "indianjewelry"] },
  { match: /cowrie|shell|coastal/i,     style: "cowrie shell earrings",  tags: ["cowrie", "bohojewelry", "beachjewelry"] },
  { match: /terracotta|clay/i,          style: "terracotta earrings",    tags: ["terracotta", "terracottajewelry", "handmadejewelry"] },
  { match: /fabric|featherlight/i,      style: "fabric earrings",        tags: ["fabricjewelry", "lightweightearrings", "handmade"] },
  { match: /tassel/i,                   style: "tassel earrings",        tags: ["tasselearrings", "bohostyle", "statementearrings"] },
  { match: /hoop/i,                     style: "boho hoop earrings",     tags: ["hoopearrings", "bohohoops", "handmade"] },
  { match: /bead/i,                     style: "beaded earrings",        tags: ["beadedearrings", "handmadejewelry", "boho"] },
  { match: /festival|festive|celebrat/i,style: "festival earrings",      tags: ["festivaljewelry", "festivewear", "indianearrings"] },
  { match: /boho|bohemian/i,            style: "boho earrings",          tags: ["bohoearrings", "bohojewelry", "bohostyle"] },
  { match: /drop|dangle/i,              style: "drop earrings",          tags: ["dropearrings", "dangleearrings", "handmade"] },
];

export const DEFAULT_STYLE = {
  style: "handmade earrings",
  tags: ["handmadeearrings", "handmadejewelry", "indianjewelry"],
};

// Occasions / use-cases buyers actually search for on Pinterest.
export const OCCASIONS = [
  "festival outfits",
  "ethnic wear",
  "everyday boho style",
  "Diwali & wedding looks",
  "traditional Indian outfits",
  "statement styling",
];

// Always-on brand + category keywords.
export const BASE_TAGS = ["handmade", "artisan", "earrings", "aayascreation"];

export function detectStyle(product) {
  const hay = `${product.name} ${product.description || ""}`;
  for (const rule of STYLE_RULES) {
    if (rule.match.test(hay)) return rule;
  }
  return DEFAULT_STYLE;
}
