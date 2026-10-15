import AssistantPill from "@/components/AssistantPill";
import Hero from "@/components/Hero";
import ProjectGrid from "@/components/ProjectGrid";
import Reveal from "@/components/Reveal";
import SystemsList from "@/components/SystemsList";

export default function Home() {
  return (
    <main>
      <Hero />

      <section className="mx-auto w-full max-w-[1440px] px-5 pt-8 sm:px-10 sm:pt-11">
        <Reveal>
          <AssistantPill />
        </Reveal>
      </section>

      <ProjectGrid id="work" heading="Projects I have built" />
      <SystemsList />
    </main>
  );
}
