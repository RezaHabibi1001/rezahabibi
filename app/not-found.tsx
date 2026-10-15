import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="main" className="mx-auto flex w-full max-w-[1440px] flex-col items-start gap-6 px-5 pb-32 pt-20 sm:px-10">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="font-serif text-5xl text-head sm:text-6xl">This page does not exist.</h1>
      <p className="max-w-xl font-display text-lg text-ink/70">The link may be old, or the address has a typo.</p>
      <Link href="/" className="font-ui text-sm font-semibold text-accent">
        Back to home <span className="arrow">&rarr;</span>
      </Link>
    </main>
  );
}
