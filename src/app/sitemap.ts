import type { MetadataRoute } from "next";
import productsData from "@/data/products.json";
import { getCategories } from "@/lib/categories";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const products = productsData as { slug: string }[];

  const productUrls = products.map((p) => ({
    url: `${SITE_URL}/products/${p.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categoryUrls = getCategories().map((c) => ({
    url: `${SITE_URL}/collections/${c.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    ...categoryUrls,
    ...productUrls,
  ];
}
