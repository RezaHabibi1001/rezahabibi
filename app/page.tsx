import AssistantPill from "@/components/AssistantPill";
import Hero from "@/components/Hero";
import JsonLd from "@/components/JsonLd";
import ProjectGrid from "@/components/ProjectGrid";
import Reveal from "@/components/Reveal";
import SystemsList from "@/components/SystemsList";
import { projects, site } from "@/content/site";
import { collectionSchema, graph, profilePageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  description: `${site.name} is a ${site.role.toLowerCase()} in ${site.location} with 6+ years building Node.js and NestJS APIs, real-time Mediasoup media servers and video encoding pipelines.`,
  path: "/",
  type: "profile",
});

export default function Home() {
  return (
    <main id="main">
      <JsonLd
        data={graph(
          profilePageSchema("/", `${site.name} — ${site.role}`),
          collectionSchema("/#work", "Projects", projects),
        )}
      />
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
