// path: app/sitemap.ts
import { MetadataRoute } from "next";
import { getVisibleSections, getAllConcepts } from "@/lib/concepts";

// Update this once you have your real Vercel URL (same value as SITE_URL in layout.tsx)
const SITE_URL = "https://hummingraph.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const sections = getVisibleSections();
  const concepts = getAllConcepts();

  const sectionUrls = sections.map((s) => ({
    url: `${SITE_URL}/${s.id}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const conceptUrls = concepts.map((c) => ({
    url: `${SITE_URL}/${c.section}/${c.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/concept-map`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/compare`, changeFrequency: "monthly", priority: 0.5 },
    ...sectionUrls,
    ...conceptUrls,
  ];
}
