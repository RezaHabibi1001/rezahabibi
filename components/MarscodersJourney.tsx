import Image from "next/image";
import { marscoders } from "@/content/site";
import Reveal from "./Reveal";

export default function MarscodersJourney() {
  return (
    <section
      id="marscoders"
      className="mx-auto w-full max-w-[1440px] scroll-mt-20 px-5 pt-20 sm:px-10 sm:pt-24"
      aria-labelledby="marscoders-heading"
    >
      <Reveal className="flex flex-col gap-3">
        <span className="eyebrow">{marscoders.eyebrow}</span>
        <h2
          id="marscoders-heading"
          className="text-gradient heading-accent font-display text-3xl font-medium sm:text-4xl"
        >
          {marscoders.heading}
        </h2>
        <p className="mt-1 max-w-[640px] font-display text-[15px] leading-relaxed text-ink/90 sm:text-base">
          {marscoders.intro}
        </p>
      </Reveal>

      <Reveal index={1} className="mt-8 sm:mt-10">
        <article className="overflow-hidden rounded-[28px] border border-line shadow-[var(--shadow-card)]">
          <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div className="relative flex flex-col justify-between gap-8 overflow-hidden bg-inverse px-6 py-8 sm:px-10 sm:py-10">
              <div
                className="pointer-events-none absolute inset-0"
                aria-hidden
                style={{
                  background:
                    "radial-gradient(520px 280px at 88% 0%, rgb(var(--rgb-accent) / 0.22), transparent 68%), radial-gradient(420px 240px at 8% 100%, rgb(var(--rgb-accent-pressed) / 0.14), transparent 70%)",
                }}
              />
              <div className="relative flex flex-col gap-7">
                <Image
                  src={marscoders.logo}
                  alt={`${marscoders.name} logo`}
                  width={304}
                  height={105}
                  className="h-auto w-[min(100%,220px)] sm:w-[240px]"
                  sizes="(min-width: 640px) 240px, 220px"
                />
                <div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <p className="font-ui text-xs font-semibold uppercase tracking-[0.14em] text-accent-pressed">
                      {marscoders.role}
                    </p>
                    <span className="inline-flex items-center gap-2 rounded-full bg-inverse-text/10 px-2.5 py-1 font-ui text-[11px] font-semibold uppercase tracking-[0.12em] text-inverse-text/90 ring-1 ring-inverse-text/15">
                      <span className="accent-dot" aria-hidden />
                      {marscoders.status}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-medium text-inverse-text sm:text-[28px]">
                    {marscoders.name}
                  </h3>
                  <p className="mt-3 max-w-md font-display text-[15px] leading-relaxed text-inverse-text/85">
                    {marscoders.companyBlurb}
                  </p>
                </div>
              </div>
              <a
                href={marscoders.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary relative w-fit"
              >
                Visit marscoders.tech <span className="arrow">&rarr;</span>
              </a>
            </div>

            <div
              className="flex flex-col justify-center gap-6 px-6 py-8 sm:px-10 sm:py-10"
              style={{ backgroundImage: "var(--gradient-card)" }}
            >
              <p className="font-ui text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                What I contribute now
              </p>
              <ul className="flex flex-col gap-5">
                {marscoders.contributions.map((item) => (
                  <li key={item.title} className="flex gap-3.5">
                    <span className="mt-2 accent-dot" aria-hidden />
                    <div>
                      <h4 className="font-display text-lg font-medium leading-snug text-head">
                        {item.title}
                      </h4>
                      <p className="mt-1.5 font-display text-sm leading-relaxed text-ink/90">
                        {item.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </Reveal>
    </section>
  );
}
