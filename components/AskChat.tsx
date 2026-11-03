"use client";

import { useEffect, useRef, useState } from "react";
import { faq, site } from "@/content/site";
import AuroraCanvas from "./AuroraCanvas";

type Msg = { from: "me" | "bot"; text: string };

// Keyword match against the canned FAQ. No network call.
function answer(input: string) {
  const words = input.toLowerCase().match(/[a-z0-9]+/g) ?? [];
  let best: (typeof faq)[number] | null = null;
  let score = 0;
  for (const f of faq) {
    // Whole-word prefix match, so "streaming" hits "stream" but "docker" does not hit "do".
    const s = f.keys.filter((k) => words.some((w) => w.startsWith(k) && w.length - k.length <= 4)).length;
    if (s > score) {
      score = s;
      best = f;
    }
  }
  return best
    ? best.a
    : `I only know what is on ${site.firstName}'s resume. Try one of the suggestions, or email ${site.email}.`;
}

export default function AskChat() {
  const { name } = site.assistant;
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "bot", text: `Hi, I am ${name}. Ask me about ${site.firstName}'s backend work, stack or experience.` },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, thinking]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t || thinking) return;
    setMsgs((m) => [...m, { from: "me", text: t }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setMsgs((m) => [...m, { from: "bot", text: answer(t) }]);
      setThinking(false);
    }, 650);
  };

  return (
    <div className="assistant-card relative flex h-[min(720px,calc(100svh-180px))] flex-col overflow-hidden rounded-[28px]">
      <AuroraCanvas className="opacity-35" />

      <div className="relative flex items-center gap-4 border-b border-raised/60 px-5 py-4 sm:px-8">
        <span className="beat grid h-11 w-11 shrink-0 place-items-center rounded-full bg-terminal font-mono text-sm text-accent-pressed">
          {"{ }"}
        </span>
        <div>
          <p className="font-display text-lg font-medium text-head">{name}</p>
          <p className="font-ui text-xs text-ink/85">Answers from {site.firstName}&rsquo;s resume</p>
        </div>
      </div>

      <div ref={listRef} className="relative flex flex-1 flex-col gap-3 overflow-y-auto px-5 py-6 sm:px-8" aria-live="polite">
        {msgs.map((m, k) => (
          <p
            key={k}
            className={`log-new max-w-[85%] rounded-2xl px-4 py-3 font-display text-[15px] leading-relaxed ${
              m.from === "me"
                ? "chat-bubble-user self-end"
                : "self-start border border-line bg-raised text-ink shadow-sm"
            }`}
          >
            {m.text}
          </p>
        ))}
        {thinking && (
          <p className="think self-start rounded-2xl border border-line bg-raised px-4 py-3 text-brand-ink" aria-label="Thinking">
            <span>●</span> <span>●</span> <span>●</span>
          </p>
        )}
      </div>

      <div className="relative flex flex-col gap-3 border-t border-raised/60 px-5 py-4 sm:px-8">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {faq.map((f) => (
            <button
              key={f.q}
              type="button"
              onClick={() => send(f.q)}
              className="shrink-0 rounded-full border border-brand-ink/20 bg-raised/70 px-4 py-1.5 font-ui text-sm text-brand-ink transition-colors duration-200 hover:border-brand-ink/40 hover:bg-raised"
            >
              {f.q}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex gap-2"
        >
          <label htmlFor="ask-input" className="sr-only">
            Your question
          </label>
          <input
            id="ask-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask ${name} something…`}
            className="min-w-0 flex-1 rounded-full border border-control-border bg-raised px-5 py-3 font-ui text-sm text-ink outline-none transition-shadow duration-200 placeholder:text-faint focus:border-accent focus:ring-2 focus:ring-accent/30"
          />
          <button type="submit" className="btn btn-primary shrink-0">
            Send <span className="arrow">&rarr;</span>
          </button>
        </form>
      </div>
    </div>
  );
}
