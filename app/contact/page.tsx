import type { Metadata } from "next";
import type { CSSProperties } from "react";
import ContactForm from "@/components/ContactForm";
import CopyButton from "@/components/CopyButton";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import { site } from "@/content/site";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const description = `Contact ${site.name}, ${site.role.toLowerCase()} in ${site.location}. Email ${site.email} or send a message about a backend role or API project.`;

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description,
  path: "/contact",
  keywords: ["contact", "hire backend developer", "get in touch"],
});

const i = (n: number) => ({ "--i": n }) as CSSProperties;

const channels = site.socials.filter((s) => s.label === "LinkedIn" || s.label === "GitHub");

export default function ContactPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-[1440px] px-5 pb-24 pt-10 sm:px-10 sm:pt-16">
      <JsonLd
        data={graph(
          webPageSchema("/contact", `Contact — ${site.name}`, description),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        )}
      />

      <div className="flex flex-col gap-14 lg:flex-row lg:gap-16 xl:gap-24">
        <section aria-labelledby="page-title" className="rise flex min-w-0 flex-1 flex-col gap-7 lg:max-w-xl">
          <span style={i(0)} className="eyebrow">
            Contact
          </span>
          <h1
            id="page-title"
            style={i(1)}
            className="text-gradient font-serif text-5xl leading-[1.05] text-balance sm:text-6xl lg:text-7xl"
          >
            Let&rsquo;s talk about your backend.
          </h1>
          <p
            style={i(2)}
            className="max-w-md font-display text-lg leading-relaxed text-pretty text-ink/90"
          >
            Hiring for a backend role, or have an API that needs building? Tell me a little about it
            and I&rsquo;ll get back to you.
          </p>

          <ul style={i(3)} aria-label="Other ways to reach me" className="mt-1 flex flex-col gap-2.5">
            <li className="flex items-center gap-3 rounded-[20px] border border-line bg-surface px-4 py-4 sm:px-5">
              <span className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="font-ui text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                  Email
                </span>
                <a
                  href={`mailto:${site.email}`}
                  className="break-all font-display text-lg text-head transition-colors duration-200 hover:text-primary"
                >
                  {site.email}
                </a>
              </span>
              <CopyButton value={site.email} label="Copy" />
            </li>
            <li>
              <a
                href={`tel:${site.phoneHref}`}
                className="flex items-center justify-between gap-3 rounded-[20px] border border-line bg-surface px-4 py-4 text-head transition-[border-color,background-color] duration-200 hover:border-accent/30 hover:bg-accent-tint sm:px-5"
              >
                <span className="flex flex-col gap-1">
                  <span className="font-ui text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                    Phone
                  </span>
                  <span className="font-display text-lg">{site.phone}</span>
                </span>
                <span aria-hidden className="text-muted">
                  →
                </span>
              </a>
            </li>
            <li className="grid grid-cols-2 gap-2.5">
              {channels.map((channel) => (
                <a
                  key={channel.label}
                  href={channel.href}
                  className="flex min-h-14 items-center justify-between rounded-[20px] border border-line bg-surface px-4 font-display text-base text-head transition-[border-color,background-color] duration-200 hover:border-accent/30 hover:bg-accent-tint sm:px-5"
                >
                  {channel.label}
                  <span aria-hidden className="text-muted">
                    ↗
                  </span>
                </a>
              ))}
            </li>
          </ul>

          <dl style={i(4)} className="grid grid-cols-2 gap-x-6">
            <div className="border-t border-line py-4">
              <dt className="font-ui text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                Based in
              </dt>
              <dd className="mt-1.5 font-display text-base text-head">{site.location}</dd>
            </div>
            <div className="border-t border-line py-4">
              <dt className="font-ui text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                Time zone
              </dt>
              <dd className="mt-1.5 font-display text-base text-head">{site.timezone}</dd>
            </div>
          </dl>
        </section>

        <section aria-labelledby="form-title" className="min-w-0 flex-[1.2]">
          <Reveal index={1} className="assistant-card rounded-[28px] p-6 sm:p-8 lg:p-10">
            <ContactForm />
          </Reveal>
        </section>
      </div>
    </main>
  );
}
