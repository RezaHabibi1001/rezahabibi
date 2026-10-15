import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import ProjectArt from "@/components/ProjectArt";
import Reveal from "@/components/Reveal";
import { projects } from "@/content/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: `${p.title} at ${p.company}`, description: p.blurb } : {};
}

const i = (n: number) => ({ "--i": n }) as CSSProperties;

export default async function CaseStudy({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const index = projects.findIndex((x) => x.slug === slug);
  if (index < 0) notFound();
  const p = projects[index];
  const next = projects[(index + 1) % projects.length];

  const intro = [
    { h: "Project overview", body: p.overview },
    { h: "Business goals", list: p.goals },
    { h: "The problem", body: p.problem },
    { h: "The solution", body: p.solution },
    { h: "The outcome", body: p.outcome },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="mx-auto w-full max-w-[1440px] px-5 pt-4 sm:px-10 sm:pt-8">
        <div className="overflow-hidden rounded-[28px]" style={{ background: p.bg, color: p.ink }}>
          <div className="rise grid gap-10 px-6 pt-10 sm:px-12 sm:pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:px-16">
            <div className="flex flex-col gap-6 lg:pb-16">
              <p style={i(0)} className="font-ui text-xs font-semibold uppercase tracking-[0.14em]">
                {p.company} · Case study
              </p>
              <h1 style={i(1)} className="font-display text-3xl font-medium leading-tight sm:text-5xl">
                {p.headline}
              </h1>
              <dl style={i(2)} className="grid grid-cols-2 gap-4 font-ui text-sm sm:grid-cols-3">
                <div>
                  <dt className="opacity-70">Role</dt>
                  <dd className="font-medium">{p.role}</dd>
                </div>
                <div>
                  <dt className="opacity-70">Timeline</dt>
                  <dd className="font-medium">{p.period}</dd>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <dt className="opacity-70">Stack</dt>
                  <dd className="font-medium">{p.stack.join(", ")}</dd>
                </div>
              </dl>
            </div>
            <div style={i(3)}>
              <ProjectArt kind={p.art} ink={p.ink} />
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto w-full max-w-[1100px] px-5 pt-20 sm:px-10 sm:pt-28">
        <Reveal as="h2" className="font-serif text-4xl text-head sm:text-5xl">
          Intro
        </Reveal>
        <div className="mt-10 flex flex-col divide-y divide-line">
          {intro.map((b, k) => (
            <Reveal key={b.h} index={k % 2} className="grid gap-3 py-8 md:grid-cols-[240px_1fr] md:gap-10">
              <h3 className="font-display text-lg font-medium" style={{ color: p.ink }}>
                {b.h}
              </h3>
              {b.list ? (
                <ul className="flex flex-col gap-2 font-display text-[16px] leading-relaxed text-ink/80">
                  {b.list.map((g) => (
                    <li key={g} className="flex gap-3">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {g}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="font-display text-[16px] leading-relaxed text-ink/80">{b.body}</p>
              )}
            </Reveal>
          ))}
        </div>
      </section>

      {/* Key decisions */}
      <section className="mx-auto w-full max-w-[1440px] px-5 pt-16 sm:px-10 sm:pt-24">
        <div className="flex flex-col gap-6">
          {p.decisions.map((d, k) => (
            <Reveal key={d.title}>
              <article
                className={`grid items-center gap-8 overflow-hidden rounded-[24px] bg-surface p-6 sm:p-10 lg:grid-cols-2 lg:gap-14 ${
                  k % 2 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="flex flex-col gap-4">
                  <span className="font-mono text-sm" style={{ color: p.ink }}>
                    0{k + 1}
                  </span>
                  <h3 className="font-display text-2xl font-medium text-head sm:text-3xl">{d.title}</h3>
                  <p className="font-display text-[16px] leading-relaxed text-ink/75">{d.text}</p>
                </div>
                <div className="card-art rounded-[18px] p-4" style={{ background: p.bg }}>
                  <ProjectArt kind={d.art} ink={p.ink} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Closing + next project */}
      <section className="mx-auto w-full max-w-[1440px] px-5 pb-24 pt-20 sm:px-10 sm:pt-28">
        <Reveal className="max-w-3xl">
          <h3 className="font-serif text-3xl text-head sm:text-4xl">{p.closing.title}</h3>
          <p className="mt-4 font-display text-[16px] leading-relaxed text-ink/75">{p.closing.text}</p>
        </Reveal>
        <Reveal className="mt-14">
          <Link
            href={`/${next.slug}`}
            className="card flex flex-col gap-2 rounded-[24px] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-10"
            style={{ background: next.bg, color: next.ink }}
          >
            <span className="font-ui text-xs font-semibold uppercase tracking-[0.14em]">Next case study</span>
            <span className="font-display text-2xl font-medium">
              {next.title} <span className="arrow">&rarr;</span>
            </span>
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
