import { systems } from "@/content/site";
import Reveal from "./Reveal";

export default function SystemsList() {
  return (
    <>
      <section className="mx-auto w-full max-w-[1440px] px-4 pt-20 sm:px-10 sm:pt-24">
        <Reveal className="flex flex-col gap-3">
          <span className="eyebrow">Behind the scenes</span>
          <h2 className="text-gradient font-display text-xl font-medium sm:text-2xl">Internal systems I built</h2>
          <p className="mt-1 max-w-[620px] font-display text-[15px] leading-relaxed text-ink/90">
            Services built inside the roles above for Berang, Microcis and Hindukosh-Bridge. They run behind the
            products, so there are no screens to show. Each card names the problem it solves.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-4 pb-24 pt-8 sm:px-10 sm:pt-10">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {systems.map((s, k) => (
            <Reveal key={s.title} index={k} className="h-full">
              <article className="system-card flex min-h-[220px] flex-col justify-between rounded-2xl p-6">
                <div>
                  <div className="mb-5 flex items-center gap-2.5">
                    <span className="accent-dot" aria-hidden />
                    <span className="font-ui text-[13px] font-semibold uppercase tracking-[0.14em] text-muted">
                      {s.company}
                    </span>
                  </div>
                  <h3 className="font-display text-[22px] font-medium leading-[1.35] text-head">{s.title}</h3>
                  <p className="mt-4 font-display text-sm leading-5 text-ink/90">{s.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
