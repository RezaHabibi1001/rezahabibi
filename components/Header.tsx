import Link from "next/link";
import { site } from "@/content/site";

export default function Header() {
  return (
    <header className="relative z-40 bg-white">
      <nav className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-5 sm:px-10">
        <Link
          href="/"
          className="font-serif text-2xl text-ink transition-opacity duration-200 hover:opacity-60"
          aria-label={`${site.name} home`}
        >
          {site.monogram}
        </Link>
        <ul className="flex items-center gap-6 font-ui text-sm text-ink">
          <li>
            <Link href="/work" className="transition-colors duration-200 hover:text-accent">
              Work
            </Link>
          </li>
          <li>
            <Link href="/resume" className="transition-colors duration-200 hover:text-accent">
              Resume
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
