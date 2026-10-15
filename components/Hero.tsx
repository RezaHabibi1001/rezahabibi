import Link from "next/link";
import type { CSSProperties } from "react";
import { site } from "@/content/site";
import HeroVisual from "./HeroVisual";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

export default function Hero() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-5 pt-4 sm:px-10 sm:pt-8">
      <div className="grid overflow-hidden rounded-[28px] bg-hero md:grid-cols-[1.1fr_0.9fr]">
        <div className="rise flex flex-col justify-center gap-6 px-6 py-10 sm:px-12 sm:py-16 lg:px-16">
          <h1 className="leading-[1.08]">
            <span style={i(0)} className="block font-serif text-4xl text-ink sm:text-5xl lg:text-6xl">
              Hi, I&rsquo;m {site.firstName},
            </span>
            <span style={i(1)} className="block font-display text-4xl font-medium text-accent sm:text-5xl lg:text-6xl">
              {site.role}
            </span>
          </h1>
          <p style={i(2)} className="max-w-xl font-display text-base leading-relaxed text-ink/80 sm:text-lg">
            {site.intro}
          </p>
          <div style={i(3)} className="flex flex-wrap items-center gap-x-6 gap-y-3 font-ui text-sm">
            <Link href="/resume" className="font-medium text-accent">
              View my resume <span className="arrow">&rarr;</span>
            </Link>
            <span className="text-muted">{site.location}</span>
          </div>
        </div>
        <HeroVisual />
      </div>
    </section>
  );
}
