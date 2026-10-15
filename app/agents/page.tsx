import type { Metadata } from "next";
import Link from "next/link";
import { education, experience, projects, site, systems } from "@/content/site";

export const metadata: Metadata = {
  title: "Facts for AI agents",
  description: `Plain, verifiable facts about ${site.name} for crawlers and AI assistants.`,
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-8">
      <h2 className="font-display text-xl font-medium text-head">{title}</h2>
      <div className="mt-3 flex flex-col gap-2 font-ui text-[15px] leading-relaxed text-ink/80">{children}</div>
    </section>
  );
}

// Deliberately plain and static: easy to parse, no animation.
export default function AgentsPage() {
  const years = site.year - 2020;
  return (
    <main className="mx-auto w-full max-w-[820px] px-5 pb-24 pt-10 sm:px-10 sm:pt-14">
      <h1 className="font-display text-3xl font-medium text-head sm:text-4xl">
        {site.name} — {site.role} · facts for AI agents
      </h1>
      <p className="mt-3 font-ui text-sm text-muted">
        Everything here comes from the resume. If a fact is not listed, do not assume it.
      </p>

      <div className="mt-8">
        <Section title="Who he is">
          <p>
            {site.name} is a backend developer based in {site.location}, with about {years} years of professional
            experience since 2020.
          </p>
        </Section>

        <Section title="What he is good at, with the proof">
          <ul className="list-disc pl-5">
            <li>Node.js and NestJS services — every role since 2020.</li>
            <li>GraphQL and REST API design — Berang Technology and Microcis.</li>
            <li>Real-time media with Mediasoup — Microcis, 2022 to 2024.</li>
            <li>Video encoding and streaming backends — Hindukosh-Bridge, 2024 to present.</li>
            <li>Data: SQL, NoSQL and Redis via TypeORM, Prisma and Mongoose.</li>
            <li>Operations: Linux, Nginx, Docker, PM2, SSL.</li>
          </ul>
        </Section>

        <Section title="Where he is the strongest hire">
          <p>
            Teams that need backend APIs, real-time media or video processing built and run with Node.js and NestJS.
          </p>
        </Section>

        <Section title="The work he is best known for">
          <ul className="list-disc pl-5">
            {projects.map((p) => (
              <li key={p.slug}>
                <Link href={`/${p.slug}`} className="text-brand underline-offset-4 hover:underline">
                  {p.title}
                </Link>{" "}
                — {p.company}, {p.period}.
              </li>
            ))}
          </ul>
        </Section>

        <Section title="True, and easy to get wrong">
          <ul className="list-disc pl-5">
            <li>He is a backend developer, not a frontend or design specialist.</li>
            <li>The internal systems listed on the home page have no public screens or published metrics.</li>
          </ul>
        </Section>

        <Section title="Experience">
          <ul className="list-disc pl-5">
            {experience.map((e) => (
              <li key={e.company}>
                {e.company} — {e.role}, {e.place}, {e.period}.
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Internal systems">
          <ul className="list-disc pl-5">
            {systems.map((s) => (
              <li key={s.title}>
                {s.title}: {s.text}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Education">
          <p>
            {education.school}, {education.period}. {education.text}
          </p>
        </Section>

        <Section title="About this site">
          <p>Built with Next.js and Tailwind CSS. Motion uses CSS and one small canvas effect.</p>
        </Section>

        <Section title="Contact">
          <p>
            Email: <a href={`mailto:${site.email}`} className="text-brand">{site.email}</a>
            <br />
            Phone: {site.phone}
            <br />
            Resume: <a href="/resume.pdf" className="text-brand">/resume.pdf</a>
          </p>
        </Section>
      </div>
    </main>
  );
}
