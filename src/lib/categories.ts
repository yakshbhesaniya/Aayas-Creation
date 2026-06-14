// Programmatic SEO: automatically groups the product catalog into keyword-targeted
// "collection" pages (e.g. /collections/jhumka-earrings). Each page targets a real
// Google search and funnels visitors to the matching products → Amazon.
//
// Add or edit products in products.json and the collections update themselves.
import productsData from "@/data/products.json";

export interface Product {
  id: string;
  name: string;
  description: string;
  amazonUrl: string;
  slug: string;
  image: string;
  gallery?: string[];
  hot?: boolean;
}

export interface Category {
  slug: string;
  /** H1 + page heading */
  title: string;
  metaTitle: string;
  metaDescription: string;
  /** Keyword-rich intro paragraph shown on the page */
  intro: string;
  keywords: string;
  products: Product[];
}

interface CategoryDef {
  slug: string;
  match: RegExp;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  keywords: string;
}

// Priority order matters: a product is placed in the FIRST definition it matches.
const DEFS: CategoryDef[] = [
  {
    slug: "jhumka-earrings",
    match: /jhumka|jhumki/i,
    title: "Handmade Jhumka Earrings",
    metaTitle: "Handmade Jhumka Earrings | Artisan Indian Jhumkas — Aayas Creation",
    metaDescription:
      "Shop handmade jhumka earrings by Aayas Creation. Traditional Indian jhumkas, handcrafted for festivals, weddings and ethnic wear. Buy on Amazon.",
    intro:
      "Discover our handmade jhumka earrings — traditional Indian jhumkas crafted by skilled artisans. Each pair blends heritage design with lightweight comfort, perfect for festivals, weddings, and everyday ethnic wear.",
    keywords:
      "jhumka earrings, handmade jhumka, indian jhumka earrings, festival jhumkas, ethnic earrings",
  },
  {
    slug: "cowrie-shell-earrings",
    match: /cowrie|shell|coastal/i,
    title: "Cowrie Shell Earrings",
    metaTitle: "Handmade Cowrie Shell Earrings | Boho Beach Jewelry — Aayas Creation",
    metaDescription:
      "Handmade cowrie shell earrings blending tradition with boho coastal aesthetics. Artisan-crafted in India. Shop the collection on Amazon.",
    intro:
      "Our cowrie shell earrings bring together coastal boho aesthetics and traditional Indian craftsmanship. Handmade with real shell-inspired detailing, they're a statement piece for free-spirited, bohemian styling.",
    keywords:
      "cowrie shell earrings, shell earrings, boho beach jewelry, handmade cowrie earrings",
  },
  {
    slug: "terracotta-earrings",
    match: /terracotta|clay/i,
    title: "Handmade Terracotta Earrings",
    metaTitle: "Handmade Terracotta Earrings | Indian Clay Jewelry — Aayas Creation",
    metaDescription:
      "Handcrafted terracotta earrings, individually shaped and painted by artisans. Lightweight Indian clay jewelry for ethnic and festive looks. Buy on Amazon.",
    intro:
      "Each pair of our terracotta earrings is individually shaped, fired, and hand-painted. This traditional Indian clay jewelry is lightweight and full of character — ideal for ethnic outfits and festive celebrations.",
    keywords:
      "terracotta earrings, clay earrings, handmade terracotta jewelry, indian terracotta earrings",
  },
  {
    slug: "fabric-earrings",
    match: /fabric|featherlight/i,
    title: "Handmade Fabric Earrings",
    metaTitle: "Lightweight Fabric Earrings | Handmade Cloth Jewelry — Aayas Creation",
    metaDescription:
      "Featherlight handmade fabric earrings made for all-day comfort. Soft, lightweight cloth jewelry in ethnic and boho designs. Shop now on Amazon.",
    intro:
      "Our fabric earrings are featherlight and made for all-day comfort — no heavy metal, no irritation. Handcrafted from soft fabric in vibrant ethnic and boho designs, they're perfect for long festive days.",
    keywords:
      "fabric earrings, lightweight earrings, cloth earrings, handmade fabric jewelry",
  },
  {
    slug: "tassel-earrings",
    match: /tassel/i,
    title: "Handmade Tassel Earrings",
    metaTitle: "Handmade Tassel Earrings | Boho Statement Jewelry — Aayas Creation",
    metaDescription:
      "Bold handmade tassel earrings for boho and statement styling. Artisan-crafted in India with vibrant colours. Buy the collection on Amazon.",
    intro:
      "Make a statement with our handmade tassel earrings. Crafted in vibrant colours with flowing tassels, they add instant personality to both minimalist and ethnic outfits.",
    keywords:
      "tassel earrings, boho tassel earrings, handmade statement earrings",
  },
  {
    slug: "boho-hoop-earrings",
    match: /hoop/i,
    title: "Boho Hoop Earrings",
    metaTitle: "Handmade Boho Hoop Earrings | Hand-Painted Hoops — Aayas Creation",
    metaDescription:
      "Hand-painted boho hoop earrings, handmade in India. Unique artisan hoops for everyday and festival styling. Shop on Amazon.",
    intro:
      "Our boho hoop earrings are hand-painted and handcrafted, no two exactly alike. They bring an effortless bohemian edge to everyday looks and festival outfits alike.",
    keywords:
      "boho hoop earrings, hand painted hoops, handmade hoop earrings",
  },
  {
    slug: "beaded-earrings",
    match: /bead/i,
    title: "Handmade Beaded Earrings",
    metaTitle: "Handmade Beaded Earrings | Artisan Beadwork — Aayas Creation",
    metaDescription:
      "Intricate handmade beaded earrings, threaded by hand in heritage Indian designs. Colourful artisan beadwork. Buy on Amazon.",
    intro:
      "Threaded bead by bead, our handmade beaded earrings showcase intricate artisan beadwork in heritage-inspired Indian designs. Colourful, detailed, and one of a kind.",
    keywords:
      "beaded earrings, handmade beaded earrings, indian beadwork jewelry",
  },
  {
    slug: "festival-earrings",
    match: /festival|festive|celebrat/i,
    title: "Festival & Ethnic Earrings",
    metaTitle: "Handmade Festival Earrings | Ethnic Indian Jewelry — Aayas Creation",
    metaDescription:
      "Handmade festival earrings for Diwali, weddings and ethnic celebrations. Artisan Indian jewelry that pairs beautifully with festive attire. Shop on Amazon.",
    intro:
      "Designed for celebrations, our festival earrings pair beautifully with festive and ethnic attire. Handcrafted for Diwali, weddings, and every occasion that calls for a little extra sparkle.",
    keywords:
      "festival earrings, ethnic earrings, indian festive jewelry, diwali earrings",
  },
  {
    slug: "boho-drop-earrings",
    match: /boho|bohemian|drop|dangle|statement|multicolor|multicolour/i,
    title: "Boho Drop & Dangle Earrings",
    metaTitle: "Handmade Boho Drop Earrings | Dangle Earrings — Aayas Creation",
    metaDescription:
      "Handmade boho drop and dangle earrings in vibrant artisan designs. Lightweight statement earrings for ethnic and everyday wear. Buy on Amazon.",
    intro:
      "Our boho drop and dangle earrings are vibrant, lightweight, and full of personality. Handcrafted in artisan designs, they add a soulful statement to both ethnic and everyday outfits.",
    keywords:
      "boho drop earrings, dangle earrings, handmade drop earrings, statement earrings",
  },
];

const products = productsData as Product[];

// Build categories, assigning each product to the first definition it matches.
// Only categories with at least 2 products become pages (avoids thin SEO pages).
function buildCategories(): Category[] {
  const buckets = new Map<string, Product[]>();
  for (const p of products) {
    const hay = `${p.name} ${p.description || ""}`;
    const def = DEFS.find((d) => d.match.test(hay));
    if (!def) continue;
    if (!buckets.has(def.slug)) buckets.set(def.slug, []);
    buckets.get(def.slug)!.push(p);
  }

  return DEFS.filter((d) => (buckets.get(d.slug)?.length || 0) >= 2).map((d) => ({
    slug: d.slug,
    title: d.title,
    metaTitle: d.metaTitle,
    metaDescription: d.metaDescription,
    intro: d.intro,
    keywords: d.keywords,
    products: buckets.get(d.slug)!,
  }));
}

const CATEGORIES = buildCategories();

export function getCategories(): Category[] {
  return CATEGORIES;
}

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
