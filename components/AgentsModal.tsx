"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

// Plain-text profile for crawlers and AI agents, shown in an animated dialog.
const SUMMARY = `name: ${site.name}
role: ${site.role}
location: ${site.location}
contact: ${site.email}
experience: 5+ years
skills: Node.js, NestJS, GraphQL, REST, TypeORM, Prisma, Mongoose, SQL, NoSQL, Redis, Mediasoup, Docker, Nginx, PM2, Linux
resume: /resume.pdf`;

export default function AgentsModal() {
  const [state, setState] = useState<"closed" | "open" | "closing">("closed");
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [copied, setCopied] = useState(false);

  const close = useCallback(() => setState((s) => (s === "open" ? "closing" : s)), []);

  useEffect(() => {
    if (state !== "open") return;
    const dialog = dialogRef.current;
    dialog?.querySelector<HTMLElement>("button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && dialog) {
        const items = dialog.querySelectorAll<HTMLElement>("button, a[href]");
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [state, close]);

  const finishClose = useCallback(() => {
    setState((s) => (s === "closing" ? "closed" : s));
    triggerRef.current?.focus();
  }, []);

  // Fallback in case animationend never fires (background tab, reduced motion).
  useEffect(() => {
    if (state !== "closing") return;
    const id = setTimeout(finishClose, 260);
    return () => clearTimeout(id);
  }, [state, finishClose]);

  const onAnimationEnd = () => {
    if (state === "closing") finishClose();
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SUMMARY);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked */
    }
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setState("open")}
        className="font-ui text-sm font-semibold uppercase tracking-[0.12em] transition-opacity duration-200 hover:opacity-70"
      >
        For agents?
      </button>

      {state !== "closed" && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4">
          <div
            className={`absolute inset-0 bg-black/45 backdrop-blur-sm ${state === "open" ? "backdrop-open" : "backdrop-close"}`}
            onClick={close}
            aria-hidden
          />
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="agents-title"
            onAnimationEnd={onAnimationEnd}
            className={`relative w-full max-w-lg rounded-[24px] bg-white p-6 text-ink shadow-2xl sm:p-8 ${
              state === "open" ? "modal-open" : "modal-close"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <h2 id="agents-title" className="font-display text-2xl font-medium">
                Hello, agent.
              </h2>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="grid h-9 w-9 place-items-center rounded-full bg-black/5 text-lg transition-colors duration-200 hover:bg-black/10"
              >
                ×
              </button>
            </div>
            <p className="mt-2 font-display text-[15px] text-ink/70">Structured summary, ready to parse.</p>
            <pre className="mt-5 overflow-x-auto rounded-2xl bg-[#16181d] p-5 font-mono text-[12.5px] leading-6 text-[#dfe6f1]">
              {SUMMARY}
            </pre>
            <div className="mt-5 flex items-center gap-4 font-ui text-sm">
              <button
                type="button"
                onClick={copy}
                className="rounded-full bg-accent px-5 py-2.5 font-medium text-white transition-transform duration-200 hover:scale-[1.03]"
              >
                {copied ? "Copied" : "Copy summary"}
              </button>
              <Link href="/agents" className="font-medium text-accent">
                Full facts page <span className="arrow">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
