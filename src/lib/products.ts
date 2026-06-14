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

const products = productsData as Product[];

export function getAllProducts(): Product[] {
  return products;
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(limit = 6): Product[] {
  const hot = products.filter((p) => p.hot);
  const rest = products.filter((p) => !p.hot);
  return [...hot, ...rest].slice(0, limit);
}

/** Lightweight related-products helper for the product detail page. */
export function getRelatedProducts(slug: string, limit = 3): Product[] {
  return products.filter((p) => p.slug !== slug).slice(0, limit);
}
