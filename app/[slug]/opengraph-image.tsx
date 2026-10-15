import { projects } from "@/content/site";
import { renderOg } from "@/lib/og";

export const alt = "Case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug) ?? projects[0];
  return renderOg({
    eyebrow: `${p.company} · Case study`,
    title: p.title,
    subtitle: p.stack.join(" · "),
    bg: p.bg,
    ink: p.ink,
    withPortrait: false,
  });
}
