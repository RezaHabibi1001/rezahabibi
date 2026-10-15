import type { Metadata } from "next";
import { site } from "@/content/site";

type PageSeo = {
  title?: string;
  description: string;
  path: string;
  type?: "website" | "article" | "profile";
  keywords?: string[];
  noindex?: boolean;
};

export const baseKeywords = [
  site.name,
  "backend developer",
  "Node.js developer",
  "NestJS developer",
  "GraphQL API",
  "REST API",
  "Mediasoup",
  "WebRTC",
  "video streaming backend",
  "Herat",
  "Afghanistan",
];

/** Real social profiles only; "#" placeholders are skipped. */
export const sameAs = site.socials.map((s) => s.href).filter((h) => h.startsWith("http"));

export const absoluteUrl = (path = "/") => new URL(path, site.url).toString();

/**
 * Per-page metadata with canonical URL, Open Graph and Twitter card.
 * OG images come from the nearest opengraph-image file, so none are set here.
 */
export function pageMetadata({ title, description, path, type = "website", keywords = [], noindex }: PageSeo): Metadata {
  const fullTitle = title ? `${title} — ${site.name}` : `${site.name} — ${site.role}`;
  return {
    title: title ?? { absolute: fullTitle },
    description,
    keywords: [...keywords, ...baseKeywords],
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      title: fullTitle,
      description,
      siteName: site.name,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}
