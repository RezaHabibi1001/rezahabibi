import type { MetadataRoute } from "next";
import { projects } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";

// Bump when content changes meaningfully; a fixed date keeps the sitemap static.
const UPDATED = new Date("2026-10-15");

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (
    path: string,
    priority: number,
    changeFrequency: "monthly" | "yearly",
    images?: string[],
  ): MetadataRoute.Sitemap[number] => ({
    url: absoluteUrl(path),
    lastModified: UPDATED,
    changeFrequency,
    priority,
    ...(images ? { images } : {}),
  });

  return [
    page("/", 1, "monthly", [absoluteUrl("/portrait.webp")]),
    page("/work", 0.9, "monthly"),
    page("/resume", 0.8, "monthly"),
    ...projects.map((p) => page(`/${p.slug}`, 0.8, "yearly")),
    page("/ask", 0.5, "yearly"),
    page("/agents", 0.5, "monthly"),
  ];
}
