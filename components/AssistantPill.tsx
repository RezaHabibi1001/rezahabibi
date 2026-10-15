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
    <div className="relative overflow-hidden rounded-[22px] bg-pill">
      <AuroraCanvas className="opacity-60" />
      <div className="relative flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center gap-4">
          <span className="beat grid h-12 w-12 shrink-0 place-items-center rounded-full bg-terminal font-mono text-sm text-[#8fb6ff]">
            {"{ }"}
          </span>
          <div>
            <p className="font-display text-lg font-medium text-ink">
              Meet my API sidekick <span className="text-brand">{name.toUpperCase()}</span>
            </p>
            <p className="min-h-5 font-ui text-sm text-ink/60" aria-hidden>
              {typed}
              <span className="caret">|</span>
            </p>
          </div>
        </div>
        <Link
          href="/ask"
          className="ring self-start rounded-full bg-white px-5 py-2.5 font-ui text-sm font-medium text-brand shadow-sm transition-transform duration-200 hover:scale-[1.03] sm:self-auto"
        >
          Ask {name} <span className="nudge inline-block">&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
