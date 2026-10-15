import { site } from "@/content/site";
import { renderOg } from "@/lib/og";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    eyebrow: "Portfolio",
    title: `Hi, I'm ${site.firstName}, ${site.role}`,
    subtitle: "Node.js · NestJS · GraphQL · Mediasoup · video pipelines",
  });
}
