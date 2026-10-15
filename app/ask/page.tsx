import type { Metadata } from "next";
import AskChat from "@/components/AskChat";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `${site.assistant.name} — ask about my backend work`,
  description: site.assistant.tagline,
};

export default function AskPage() {
  return (
    <main className="mx-auto w-full max-w-[960px] px-5 pb-24 pt-8 sm:px-10 sm:pt-12">
      <h1 className="rise mb-6 font-display text-3xl font-medium text-head sm:text-4xl">
        <span className="block">
          {site.assistant.name}, {site.firstName}&rsquo;s API sidekick
        </span>
      </h1>
      <AskChat />
    </main>
  );
}
