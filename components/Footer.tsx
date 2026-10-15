import { site } from "@/content/site";
import AgentsModal from "./AgentsModal";
import Reveal from "./Reveal";

export default function Footer() {
  return (
    <footer className="bg-footer text-white">
      <div className="mx-auto w-full max-w-[1440px] px-5 pb-12 pt-20 sm:px-10 sm:pt-28">
        <Reveal className="flex flex-col gap-2">
          <p className="font-serif text-4xl sm:text-6xl">{site.name}</p>
          <p className="font-display text-lg text-white/75">{site.role}</p>
          <p className="font-display text-lg text-white/75">{site.location}</p>
        </Reveal>

        <Reveal index={1} className="mt-14 max-w-xl">
          <p className="font-display text-lg leading-relaxed text-white/85">
            Hiring for a backend role, or have an API that needs building? Get in touch.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-6 inline-block font-display text-2xl font-medium underline decoration-white/30 underline-offset-8 transition-colors duration-200 hover:decoration-accent sm:text-3xl"
          >
            {site.email}
          </a>
          <a href={`tel:${site.phoneHref}`} className="mt-3 block font-display text-lg text-white/80 hover:text-white">
            {site.phone}
          </a>
        </Reveal>

        <div className="mt-16 flex flex-col gap-6 border-t border-white/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap items-center gap-x-3 gap-y-2 font-ui text-sm font-semibold uppercase tracking-[0.12em]">
            {site.socials.map((s, k) => (
              <li key={s.label} className="flex items-center gap-3">
                {k > 0 && <span className="text-white/30">|</span>}
                <a href={s.href} className="transition-opacity duration-200 hover:opacity-70">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <AgentsModal />
        </div>

        <div className="mt-10 flex flex-col gap-2 font-ui text-xs text-white/55 sm:flex-row sm:justify-between">
          <span>© {site.year} {site.name}</span>
        </div>
      </div>
    </footer>
  );
}
