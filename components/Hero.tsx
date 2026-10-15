import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { site } from "@/content/site";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

export default function Hero() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-5 pt-4 sm:px-10 sm:pt-8">
      <div className="grid overflow-hidden rounded-[28px] bg-hero md:grid-cols-[1.1fr_0.9fr]">
        <div className="rise flex flex-col justify-center gap-6 px-6 py-10 sm:px-12 sm:py-16 lg:px-16">
          <h1 className="leading-[1.08]">
            <span
              style={i(0)}
              className="block font-serif text-4xl text-ink sm:text-5xl lg:text-6xl"
            >
              Hi, I&rsquo;m {site.firstName},
            </span>
            <span
              style={i(1)}
              className="block font-display text-4xl font-medium text-accent sm:text-5xl lg:text-6xl"
            >
              {site.role}
            </span>
          </h1>
          <p
            style={i(2)}
            className="max-w-xl font-display text-base leading-relaxed text-ink/80 sm:text-lg"
          >
            {site.intro}
          </p>
          <div
            style={i(3)}
            className="flex flex-wrap items-center gap-x-6 gap-y-3 font-ui text-sm"
          >
            <Link href="/resume" className="font-medium text-accent">
              View my resume <span className="arrow">&rarr;</span>
            </Link>
            <span className="text-muted">{site.location}</span>
          </div>
        </div>
        <div className="relative flex items-end justify-center px-6 pt-4 sm:px-10 md:min-h-[460px]">
          <div
            className="absolute bottom-0 left-1/2 h-3/4 w-3/4 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
            aria-hidden
          />
          <div className="rise relative w-full max-w-[420px]">
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
