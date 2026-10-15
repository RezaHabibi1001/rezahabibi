import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import ProjectGrid from "@/components/ProjectGrid";
import Reveal from "@/components/Reveal";
import { about, playground, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Work: backend case studies",
  description: `Case studies and experiments by ${site.name}, ${site.role}.`,
};

const i = (n: number) => ({ "--i": n }) as CSSProperties;

export default function WorkPage() {
  return (
    <main>
      <section className="mx-auto w-full max-w-[1440px] px-5 pt-10 sm:px-10 sm:pt-16">
        <div className="rise">
          <h1 style={i(0)} className="font-serif text-5xl text-head sm:text-7xl">
            Work
          </h1>
          <p style={i(1)} className="mt-4 max-w-2xl font-display text-lg leading-relaxed text-ink/70">
            Backend systems for commerce, accounting, real-time media and video. Each case study covers the problem,
            the approach and the decisions that mattered.
          </p>
        </div>
      </section>

      <ProjectGrid heading="Projects I worked on" />

      {/* Fun time */}
      <section className="mx-auto mt-24 w-full max-w-[1440px] px-5 sm:px-10">
        <div className="rounded-[28px] bg-fun px-6 py-14 text-white sm:px-12 sm:py-20">
          <Reveal className="flex flex-col gap-3">
            <h2 className="font-display text-3xl font-medium sm:text-4xl">My fun time</h2>
            <p className="max-w-2xl font-display text-[15px] leading-relaxed text-white/65">
              Small experiments I run to learn something properly, outside client work.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {playground.map((x, k) => (
              <Reveal key={x.title} index={k % 2}>
                <article className="card flex h-full flex-col gap-3 rounded-[22px] p-7 text-ink sm:p-9" style={{ background: x.bg }}>
                  <span className="font-mono text-xs opacity-60">experiment/0{k + 1}</span>
                  <h3 className="font-display text-2xl font-medium">{x.title}</h3>
                  <p className="font-display text-[15px] leading-relaxed text-ink/70">{x.text}</p>
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
            <div className="flex aspect-[4/5] max-w-sm items-end overflow-hidden rounded-[28px] bg-hero px-6 pt-10">
              <Image
                src="/portrait.webp"
                alt={`Portrait of ${site.name}`}
                width={640}
                height={626}
                sizes="(min-width: 1024px) 384px, 90vw"
                className="block h-auto w-full"
              />
            </div>
          </Reveal>
          <Reveal index={1} className="flex flex-col gap-5">
            <h2 className="font-display text-3xl font-medium text-head sm:text-4xl">About me</h2>
            {about.map((t) => (
              <p key={t} className="font-display text-[16px] leading-relaxed text-ink/75">
                {t}
              </p>
            ))}
            <Link href="/resume" className="font-ui text-sm font-semibold text-accent">
              Read my resume <span className="arrow">&rarr;</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
