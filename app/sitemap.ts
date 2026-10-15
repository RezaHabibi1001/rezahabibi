import type { MetadataRoute } from "next";
import { projects, site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/work", "/resume", "/ask", "/agents", ...projects.map((p) => `/${p.slug}`)];
  return pages.map((p) => ({ url: `${site.url}${p}` }));
}
