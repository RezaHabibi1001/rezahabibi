import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { palette } from "@/lib/palette";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.role}`,
    short_name: site.name,
    description: site.summary,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: palette.background,
    theme_color: palette.background,
    lang: "en",
    categories: ["portfolio", "technology"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
