import { experience, projects, site } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";

// llms.txt (https://llmstxt.org): a short Markdown index for AI crawlers.
export function GET() {
  const body = `# ${site.name}

> ${site.summary}

${site.name} is a ${site.role.toLowerCase()} based in ${site.location}. Contact: ${site.email}.

## Pages

- [Home](${absoluteUrl("/")}): overview, projects and internal systems
- [Work](${absoluteUrl("/work")}): all case studies
- [Resume](${absoluteUrl("/resume")}): experience, education and skills ([PDF](${absoluteUrl("/resume.pdf")}))
- [Facts for AI agents](${absoluteUrl("/agents")}): plain, verifiable facts

## Case studies

${projects.map((p) => `- [${p.title} at ${p.company}](${absoluteUrl(`/${p.slug}`)}): ${p.blurb}`).join("\n")}

## Experience

${experience.map((e) => `- ${e.company}, ${e.role}, ${e.period}: ${e.text}`).join("\n")}

## Skills

${site.skills.map((s) => `- ${s}`).join("\n")}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
