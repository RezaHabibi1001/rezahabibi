import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="main" className="mx-auto flex w-full max-w-[1440px] flex-col items-start gap-6 px-5 pb-32 pt-20 sm:px-10">
      <p className="eyebrow">404</p>
      <h1 className="text-gradient font-serif text-5xl sm:text-6xl">This page does not exist.</h1>
      <p className="max-w-xl font-display text-lg text-ink/75">The link may be old, or the address has a typo.</p>
      <Link href="/" className="btn btn-primary">
        Back to home <span className="arrow">&rarr;</span>
      </Link>
    </main>
  );
}
