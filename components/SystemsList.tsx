import { systems } from "@/content/site";
import Reveal from "./Reveal";

export default function SystemsList() {
  return (
    <>
      <section className="mx-auto w-full max-w-[1440px] px-4 pt-20 sm:px-10 sm:pt-24">
        <Reveal>
          <h2 className="font-display text-xl font-medium text-head">Internal systems I built</h2>
          <p className="mt-4 max-w-[620px] font-display text-[15px] leading-relaxed text-foreground">
            Services built inside the roles above for Berang, Microcis and Hindukosh-Bridge. They run behind the
            products, so there are no screens to show. Each card names the problem it solves.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-4 pb-24 pt-8 sm:px-10 sm:pt-10">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {systems.map((s, k) => (
            <Reveal
              as="article"
              key={s.title}
              index={k}
              className="flex min-h-[220px] flex-col justify-between rounded-xl bg-pill p-6 text-[#303030]"
            >
              <div>
                <div className="mb-5 flex h-9 items-center">
                  <span className="font-ui text-[13px] font-semibold uppercase tracking-[0.14em] text-[#303030]/70">
                    {s.company}
                  </span>
                </div>
                <h3 className="font-display text-[22px] font-medium leading-[1.35]">{s.title}</h3>
                <p className="mt-4 font-display text-sm leading-5">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
