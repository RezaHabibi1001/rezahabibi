"use client";

import { useEffect, useRef, type ElementType, type ReactNode, type CSSProperties } from "react";

type Props = {
  as?: ElementType;
  index?: number;
  className?: string;
  children: ReactNode;
};

// Adds `.in` once the element scrolls into view; `index` staggers siblings.
export default function Reveal({ as: Tag = "div", index = 0, className = "", children }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`seq ${className}`} style={{ "--i": index } as CSSProperties}>
      {children}
    </Tag>
  );
}
