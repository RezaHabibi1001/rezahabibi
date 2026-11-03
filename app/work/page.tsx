import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import JsonLd from "@/components/JsonLd";
import ProjectGrid from "@/components/ProjectGrid";
import Reveal from "@/components/Reveal";
import { about, playground, projects, site } from "@/content/site";
import { breadcrumbSchema, collectionSchema, graph } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Work: backend case studies",
  description: `Backend case studies by ${site.name}: video encoding and live streaming, a Mediasoup real-time media server, and e-commerce and accounting APIs built with Node.js and NestJS.`,
  path: "/work",
  keywords: ["backend case study", "API design", "system design"],
});

const i = (n: number) => ({ "--i": n }) as CSSProperties;

export default function WorkPage() {
  return (
    <main id="main">
      <JsonLd
        data={graph(
          collectionSchema("/work", "Work", projects),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
          ]),
        )}
      />
      <section className="mx-auto w-full max-w-[1440px] px-5 pt-10 sm:px-10 sm:pt-16">
        <div className="rise">
          <span style={i(0)} className="eyebrow">
            Case studies
          </span>
          <h1
            style={i(1)}
            className="text-gradient mt-3 font-serif text-5xl sm:text-7xl"
          >
            Work
          </h1>
          <p
            style={i(2)}
            className="mt-4 max-w-2xl font-display text-lg leading-relaxed text-ink/90"
          >
            Backend systems for commerce, accounting, real-time media and video.
            Each case study covers the problem, the approach and the decisions
            that mattered.
          </p>
        </div>
      </section>

      <ProjectGrid heading="Projects I worked on" />

      {/* Fun time */}
      <section className="mx-auto mt-24 w-full max-w-[1440px] px-5 sm:px-10">
        <div className="fun-panel rounded-[28px] px-6 py-14 text-inverse-text sm:px-12 sm:py-20">
          <Reveal className="flex flex-col gap-3">
            <span className="eyebrow eyebrow-light">Playground</span>
            <h2 className="font-display text-3xl font-medium sm:text-4xl">
              My fun time
            </h2>
            <p className="max-w-2xl font-display text-[15px] leading-relaxed text-inverse-text/85">
              Small experiments I run to learn something properly, outside
              client work.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {playground.map((x, k) => (
              <Reveal key={x.title} index={k % 2}>
                <article
                  className="card flex h-full flex-col gap-3 rounded-[22px] p-7 text-ink sm:p-9"
                  style={{ background: x.bg }}
                >
                  <span className="font-mono text-xs opacity-80">
                    experiment/0{k + 1}
                  </span>
                  <h3 className="font-display text-2xl font-medium">
                    {x.title}
                  </h3>
                  <p className="font-display text-[15px] leading-relaxed text-ink/85">
                    {x.text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto w-full max-w-[1440px] px-5 pb-24 pt-28 sm:px-10 sm:pt-32">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <Reveal>
            <div className="hero-panel relative flex aspect-[4/5] max-w-sm items-end justify-center overflow-hidden rounded-[28px] px-6 pt-10">
              <div
                className="pointer-events-none absolute bottom-0 left-1/2 z-0 w-[min(118%,22rem)] -translate-x-1/2"
                aria-hidden
              >
                <div className="relative aspect-[2/1] w-full">
                  <div className="absolute inset-0 rounded-t-full bg-gradient-to-b from-accent-soft/35 via-accent/18 to-primary/10" />
                  <div className="absolute inset-[6%] rounded-t-full border border-accent/20 bg-gradient-to-b from-brand/80 via-accent-tint/70 to-transparent" />
                  <div className="absolute -inset-x-[8%] bottom-0 h-[70%] rounded-t-full bg-primary/10 blur-2xl" />
                </div>
              </div>
              <Image
                src="/og-portrait.jpeg"
                alt={`Portrait of ${site.name}`}
                width={640}
                height={626}
                sizes="(min-width: 1024px) 384px, 90vw"
                className="relative z-10 block h-auto w-full drop-shadow-[0_28px_48px_rgba(51,41,31,0.22)]"
              />
            </div>
          </Reveal>
          <Reveal index={1} className="flex flex-col gap-5">
            <span className="eyebrow">About</span>
            <h2 className="text-gradient font-display text-3xl font-medium sm:text-4xl">
              About me
            </h2>
            {about.map((t) => (
              <p
                key={t}
                className="font-display text-[16px] leading-relaxed text-ink/90"
              >
                {t}
              </p>
            ))}
            <Link
              href="/resume"
              className="font-ui text-sm font-semibold text-accent transition-colors duration-200 hover:text-accent-hover"
            >
              Read my resume <span className="arrow">&rarr;</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
