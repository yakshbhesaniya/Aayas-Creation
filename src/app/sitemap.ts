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

  const staticUrls = [
    { url: `${SITE_URL}/shop`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${SITE_URL}/wholesale`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly" as const, priority: 0.2 },
  ];

  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    ...staticUrls,
    ...categoryUrls,
    ...productUrls,
  ];
}
