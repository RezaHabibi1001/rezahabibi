import Link from "next/link";
import { site } from "@/content/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-brand/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-5 sm:px-10">
        <Link
          href="/"
          className="font-serif text-2xl transition-opacity duration-200 hover:opacity-75"
          aria-label={`${site.name} home`}
        >
          <span className="text-gradient">{site.monogram}</span>
        </Link>
        <ul className="flex items-center gap-7 font-ui text-sm font-medium">
          <li>
            <Link href="/work" className="nav-link">
              Work
            </Link>
          </li>
          <li>
            <Link href="/resume" className="nav-link">
              Resume
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
