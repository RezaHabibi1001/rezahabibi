import { projects } from "@/content/site";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";

export default function ProjectGrid({ heading, id }: { heading: string; id?: string }) {
  return (
    <section id={id} className="mx-auto w-full max-w-[1440px] scroll-mt-20 px-5 pt-20 sm:px-10 sm:pt-24">
      <Reveal as="h2" className="font-display text-3xl font-medium text-head sm:text-4xl">
        {heading}
      </Reveal>
      <div className="mt-8 grid gap-6 sm:mt-10 lg:grid-cols-2">
        {projects.map((p, k) => (
          <Reveal key={p.slug} index={k % 2} className={k === 0 ? "lg:col-span-2" : ""}>
            <ProjectCard project={p} featured={k === 0} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
