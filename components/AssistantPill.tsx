"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { faq, site } from "@/content/site";
import AuroraCanvas from "./AuroraCanvas";

const PROMPTS = faq.map((f) => f.q);

// Typewriter that cycles through sample questions.
function useTyped(list: string[]) {
  const [text, setText] = useState("");
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = setTimeout(() => setText(list[0]), 0);
      return () => clearTimeout(id);
    }
    let item = 0;
    let pos = 0;
    let deleting = false;
    let id: ReturnType<typeof setTimeout>;
    const tick = () => {
      const word = list[item];
      pos += deleting ? -1 : 1;
      setText(word.slice(0, pos));
      let wait = deleting ? 28 : 55;
      if (!deleting && pos === word.length) {
        deleting = true;
        wait = 1600;
      } else if (deleting && pos === 0) {
        deleting = false;
        item = (item + 1) % list.length;
        wait = 300;
      }
      id = setTimeout(tick, wait);
    };
    id = setTimeout(tick, 600);
    return () => clearTimeout(id);
  }, [list]);
  return text;
}

export default function AssistantPill() {
  const typed = useTyped(PROMPTS);
  const { name } = site.assistant;

  return (
    <div className="assistant-card relative overflow-hidden rounded-[22px]">
      <AuroraCanvas className="opacity-40" />
      <div className="relative flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center gap-4">
          <span className="beat grid h-12 w-12 shrink-0 place-items-center rounded-full bg-terminal font-mono text-sm text-[#f0deb4]">
            {"{ }"}
          </span>
          <div>
            <p className="font-display text-lg font-medium text-head">
              Meet my API sidekick <span className="text-brand-ink">{name.toUpperCase()}</span>
            </p>
            <p className="min-h-5 font-ui text-sm text-ink/85" aria-hidden>
              {typed}
              <span className="caret text-accent">|</span>
            </p>
          </div>
        </div>
        <Link href="/ask" className="btn btn-primary ring self-start sm:self-auto">
          Ask {name} <span className="nudge inline-block">&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
