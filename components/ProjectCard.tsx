import Link from "next/link";
import type { Project } from "@/content/site";
import ProjectArt from "./ProjectArt";

export default function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <Link
      href={`/${project.slug}`}
      className={`card flex h-full flex-col overflow-hidden rounded-[24px] ${featured ? "lg:grid lg:grid-cols-2 lg:items-end" : ""}`}
      style={{ background: project.bg, color: project.ink }}
    >
      <div className={`flex flex-col gap-3 px-6 pt-7 sm:px-9 sm:pt-9 ${featured ? "lg:self-center lg:pb-9" : ""}`}>
        <div className="flex items-center justify-between gap-4 font-ui text-xs font-medium uppercase tracking-[0.12em] opacity-80">
          <span>{project.company}</span>
          <span className="shrink-0">{project.period}</span>
        </div>
        <h3 className="font-display text-2xl font-medium leading-tight sm:text-[28px]">{project.title}</h3>
        <p className="max-w-lg font-display text-[15px] leading-relaxed text-ink/75">{project.blurb}</p>
        <ul className="mt-1 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <li key={s} className="rounded-full bg-white/60 px-3 py-1 font-ui text-xs font-medium">
              {s}
            </li>
          ))}
        </ul>
        <span className="mt-2 font-ui text-sm font-semibold">
          View case study <span className="arrow">&rarr;</span>
        </span>
      </div>
      <div className={`mt-8 flex flex-1 items-end overflow-hidden px-6 sm:px-9 ${featured ? "lg:pt-9" : ""}`}>
        <div className="card-art w-full origin-bottom">
          <ProjectArt kind={project.art} ink={project.ink} />
        </div>
      </div>
    </Link>
  );
}
