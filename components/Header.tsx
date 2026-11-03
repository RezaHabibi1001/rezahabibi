"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";

const links = [
  { href: "/work", label: "Work" },
  { href: "/resume", label: "Resume" },
] as const;

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();
  const contactActive = isActive(pathname, "/contact");

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-5 sm:px-10">
        <Link
          href="/"
          className="inline-flex items-center transition-opacity duration-200 hover:opacity-80"
          aria-label={`${site.name} home`}
          aria-current={pathname === "/" ? "page" : undefined}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-gradient-to-br from-inverse to-accent font-serif text-sm font-semibold tracking-tight text-inverse-text shadow-[0_8px_18px_-12px_rgb(42_41_31_/_0.7)]">
            {site.monogram}
          </span>
        </Link>
        <ul className="flex items-center gap-5 font-ui text-sm font-medium sm:gap-7">
          {links.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="nav-link"
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href="/contact"
              aria-current={contactActive ? "page" : undefined}
              className={`btn px-3.5 py-2.5 text-sm sm:px-4 ${
                contactActive
                  ? "btn-primary"
                  : "btn-secondary"
              }`}
            >
              <span className="sm:hidden">Contact</span>
              <span className="hidden sm:inline">Get in touch</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
