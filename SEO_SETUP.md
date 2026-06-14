# SEO Engine — Activation (one time, ~15 min, free)

The site now auto-generates SEO assets from `products.json`:
- **Category landing pages** at `/collections/...` (e.g. `/collections/jhumka-earrings`)
  that target real Google searches and funnel to your Amazon listings.
- **`/sitemap.xml`** listing every page (home, collections, products).
- **`/robots.txt`** telling search engines to crawl everything.
- **Product + collection JSON-LD** schema so Google can show rich results.
- Site-wide Open Graph tags so links look good when shared.

These update themselves whenever you add products — no maintenance.

## Step 1 — Deploy
Push to GitHub. Vercel auto-deploys. Then confirm these load:
- https://aayascreation.vercel.app/sitemap.xml
- https://aayascreation.vercel.app/collections/jhumka-earrings (or any from the sitemap)

## Step 2 — Tell Google about your site (this is what triggers ranking)
1. Go to https://search.google.com/search-console (free, sign in with Google).
2. Add property → **URL prefix** → `https://aayascreation.vercel.app`.
3. Verify ownership (easiest: the "HTML tag" method — add the meta tag to
   `src/app/layout.tsx` metadata `verification`, or use the DNS/Vercel method).
4. In Search Console → **Sitemaps** → submit: `sitemap.xml`.
5. Done. Google will start crawling and indexing your pages.

## What to expect (be realistic)
- Google indexing: a few days to ~2 weeks.
- Meaningful ranking + traffic: **2–4 months**. SEO compounds slowly but is free
  and permanent — unlike ads that stop the moment you stop paying.

## Custom domain later?
If you move to a custom domain, set `NEXT_PUBLIC_SITE_URL=https://yourdomain.com`
in Vercel's environment variables. Everything (sitemap, canonicals, schema)
updates automatically.

## Add more keyword pages later
Edit the `DEFS` array in `src/lib/categories.ts` to add new collection types
(e.g. "wedding earrings", "office wear earrings"). A collection page is created
automatically once 2+ products match it.
