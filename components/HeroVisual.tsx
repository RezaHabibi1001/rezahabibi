"use client";

import { useEffect, useState } from "react";

// Stands in for a portrait: a live-looking API log. Swap for <Image> once a photo exists.
const LINES = [
  { m: "POST", p: "/graphql", s: 200, t: 18 },
  { m: "GET", p: "/api/v1/movies?page=2", s: 200, t: 9 },
  { m: "WS", p: "/rtc/room/42 produce", s: 101, t: 3 },
  { m: "POST", p: "/api/v1/encode", s: 202, t: 41 },
  { m: "GET", p: "/api/v1/orders/918", s: 200, t: 12 },
  { m: "PATCH", p: "/api/v1/ledger/77", s: 200, t: 15 },
  { m: "GET", p: "/health", s: 200, t: 1 },
];

export default function HeroVisual() {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = setTimeout(() => setCount(LINES.length), 0);
      return () => clearTimeout(id);
    }
    const id = setInterval(() => setCount((c) => (c >= 12 ? 3 : c + 1)), 1100);
    return () => clearInterval(id);
  }, []);

  const shown = Array.from({ length: Math.min(count, 7) }, (_, k) => LINES[(count - Math.min(count, 7) + k) % LINES.length]);

  return (
    <div className="relative flex min-h-[320px] items-end justify-center px-6 pb-0 pt-6 sm:px-10 md:min-h-[460px]">
      <div className="absolute right-10 top-10 h-40 w-40 rounded-full bg-accent/15 blur-3xl" aria-hidden />
      <div
        className="rise relative w-full max-w-md rounded-t-2xl bg-[#16181d] p-5 font-mono text-[12.5px] leading-6 text-[#dfe6f1] shadow-[0_30px_60px_-30px_rgb(0_0_0/0.5)]"
        aria-label="Illustration: API request log"
      >
        <div style={{ "--i": 2 } as React.CSSProperties} className="mb-4 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-[11px] text-[#7f8796]">nest start --watch</span>
        </div>
        <ul style={{ "--i": 3 } as React.CSSProperties} className="space-y-0.5">
          {shown.map((l, k) => (
            <li key={`${count}-${k}`} className={k === shown.length - 1 ? "log-new" : ""}>
              <span className="text-[#e45684]">{l.m.padEnd(5, " ")}</span> {l.p}{" "}
              <span className="text-[#7f8796]">
                {l.s} · {l.t}ms
              </span>
            </li>
          ))}
          <li>
            <span className="text-[#e45684]">$</span> <span className="caret">▍</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
