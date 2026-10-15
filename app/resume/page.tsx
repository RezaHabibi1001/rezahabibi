import type { Metadata } from "next";
import type { CSSProperties } from "react";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import { awards, certifications, education, experience, site } from "@/content/site";
import { breadcrumbSchema, educationCredential, graph, profilePageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: `Resume — ${site.role}`,
  description: `Resume of ${site.name}, ${site.role.toLowerCase()}: Hindukosh-Bridge, Microcis and Berang Technology, Computer Science at Herat University, and skills in NestJS, GraphQL, Redis and Mediasoup.`,
  path: "/resume",
  type: "profile",
  keywords: ["resume", "CV", "backend developer resume"],
});

const i = (n: number) => ({ "--i": n }) as CSSProperties;

function Block({ title, children, index = 0 }: { title: string; children: React.ReactNode; index?: number }) {
  return (
    <Reveal index={index} className="grid gap-4 border-t border-line py-10 md:grid-cols-[220px_1fr] md:gap-10">
      <h3 className="font-display text-lg font-medium text-accent">{title}</h3>
      <div>{children}</div>
    </Reveal>
  );
}

export default function ResumePage() {
  return (
    <main id="main" className="mx-auto w-full max-w-[1100px] px-5 pb-24 pt-10 sm:px-10 sm:pt-16">
      <JsonLd
        data={graph(
          profilePageSchema("/resume", `Resume — ${site.name}`),
          educationCredential(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Resume", path: "/resume" },
          ]),
        )}
      />
      <header className="rise flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 style={i(0)} className="font-serif text-5xl text-head sm:text-6xl">
            {site.name}
          </h1>
          <h2 style={i(1)} className="mt-2 font-display text-2xl font-medium text-accent">
            {site.role}
          </h2>
          <p style={i(2)} className="mt-4 font-ui text-sm text-muted">
            {site.location} · <a href={`mailto:${site.email}`} className="hover:text-ink">{site.email}</a> ·{" "}
            <a href={`tel:${site.phoneHref}`} className="hover:text-ink">{site.phone}</a>
          </p>
        </div>
        <a
          style={i(3)}
          href="/resume.pdf"
          download
          className="w-fit rounded-full bg-head px-6 py-3 font-ui text-sm font-medium text-white transition-transform duration-200 hover:scale-[1.03]"
        >
          Download PDF <span className="arrow">&darr;</span>
        </a>
      </header>

      <p className="mt-10 max-w-3xl font-display text-lg leading-relaxed text-ink/80">{site.summary}</p>

      <div className="mt-12">
        {experience.map((e, k) => (
          <Block key={e.company} title={e.period} index={k % 2}>
            <h3 className="font-display text-xl font-medium text-head">{e.company}</h3>
            <p className="font-ui text-sm text-muted">
              {e.role}, {e.place}
            </p>
            <p className="mt-3 font-display text-[16px] leading-relaxed text-ink/80">{e.text}</p>
          </Block>
        ))}

        <Block title="Education">
          <h3 className="font-display text-xl font-medium text-head">{education.school}</h3>
          <p className="font-ui text-sm text-muted">{education.period}</p>
          <p className="mt-3 font-display text-[16px] leading-relaxed text-ink/80">{education.text}</p>
        </Block>

        <Block title="Skills">
          <ul className="flex flex-wrap gap-2">
            {site.skills.map((s) => (
              <li key={s} className="rounded-full bg-surface px-4 py-2 font-ui text-sm text-ink">
                {s}
              </li>
            ))}
          </ul>
        </Block>

        {certifications.length > 0 && (
          <Block title="Certifications">
            <ul className="flex flex-col gap-2 font-display text-[16px] text-ink/80">
              {certifications.map((c) => (
                <li key={c.title}>
                  {c.title} · {c.issuer} · {c.year}
                </li>
              ))}
            </ul>
          </Block>
        )}

        {awards.length > 0 && (
          <Block title="Honors and awards">
            <ul className="flex flex-col gap-2 font-display text-[16px] text-ink/80">
              {awards.map((a) => (
                <li key={a.title}>
                  {a.title} · {a.year}
                </li>
              ))}
            </ul>
          </Block>
        )}
      </div>
    </main>
  );
}
