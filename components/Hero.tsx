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
        <div className="relative flex items-end justify-center px-6 pt-4 sm:px-10 md:min-h-[460px]">
          <div
            className="absolute bottom-0 left-1/2 h-3/4 w-3/4 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
            aria-hidden
          />
          <div
            className="absolute right-8 top-10 h-32 w-32 rounded-full bg-primary-soft/10 blur-2xl sm:right-14"
            aria-hidden
          />
          <div className="rise relative w-full max-w-[420px] drop-shadow-[0_24px_40px_rgba(49,46,129,0.14)]">
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
