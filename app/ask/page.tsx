import type { Metadata } from "next";
import AskChat from "@/components/AskChat";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: `Ask ${site.assistant.name} about my backend work`,
  description: `Chat with ${site.assistant.name} for quick answers about ${site.name}'s experience, stack, databases, real-time media and deployment skills.`,
  path: "/ask",
});

export default function AskPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-[960px] px-5 pb-24 pt-8 sm:px-10 sm:pt-12">
      <h1 className="rise mb-6 font-display text-3xl font-medium text-head sm:text-4xl">
        <span className="block">
          {site.assistant.name}, {site.firstName}&rsquo;s API sidekick
        </span>
      </h1>
      <AskChat />
    </main>
  );
}
