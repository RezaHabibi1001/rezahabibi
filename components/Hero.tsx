import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { site } from "@/content/site";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

export default function Hero() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-5 pt-4 sm:px-10 sm:pt-8">
      <div className="hero-panel grid overflow-hidden rounded-[28px] md:grid-cols-[1.1fr_0.9fr]">
        <div className="rise relative flex flex-col justify-center gap-6 px-6 py-10 sm:px-12 sm:py-16 lg:px-16">
          <h1 className="leading-[1.08]">
            <span
              style={i(0)}
              className="block font-serif text-4xl text-head sm:text-5xl lg:text-6xl"
            >
              Hi, I&rsquo;m {site.firstName},
            </span>
            <span
              style={i(1)}
              className="text-gradient-primary block font-display text-4xl font-medium sm:text-5xl lg:text-6xl"
            >
              {site.role}
            </span>
          </h1>
          <p
            style={i(2)}
            className="max-w-xl font-display text-base leading-relaxed text-ink/90 sm:text-lg"
          >
            {site.intro}
          </p>
          <div
            style={i(3)}
            className="flex flex-wrap items-center gap-x-6 gap-y-4 font-ui text-sm"
          >
            <Link href="/resume" className="btn btn-primary">
              View my resume <span className="arrow">&rarr;</span>
            </Link>
            <span className="flex items-center gap-2 text-muted">
              <span className="accent-dot" aria-hidden />
              {site.location}
            </span>
          </div>
        </div>
        <div className="relative flex items-end justify-center px-6 pt-8 sm:px-10 md:min-h-[460px]">
          <div
            className="pointer-events-none absolute bottom-0 left-1/2 z-0 w-[min(118%,34rem)] -translate-x-1/2"
            aria-hidden
          >
            <div className="relative aspect-[2/1] w-full">
              <div className="absolute inset-0 rounded-t-full bg-gradient-to-b from-accent-soft/35 via-accent/18 to-primary/10" />
              <div className="absolute inset-[6%] rounded-t-full border border-accent/20 bg-gradient-to-b from-brand/80 via-accent-tint/70 to-transparent" />
              <div className="absolute -inset-x-[8%] bottom-0 h-[70%] rounded-t-full bg-primary/10 blur-2xl" />
            </div>
          </div>
          <div className="rise relative z-10 w-full max-w-[420px] drop-shadow-[0_28px_48px_rgba(46,35,24,0.22)]">
            <Image
              style={i(2)}
              src="/og-portrait.jpeg"
              alt={`Portrait of ${site.name}`}
              width={640}
              height={626}
              priority
              sizes="(min-width: 768px) 420px, 90vw"
              className="block h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
