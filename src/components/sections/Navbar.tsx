"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/data/portfolio";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActiveLink = (href: string) => {
    if (href.startsWith("/#")) {
      return false;
    }
    return pathname === href;
  };

  return (
    <header className="fixed left-0 top-6 z-40 w-full px-4 md:px-8 md:top-8">
      <nav className="nav-shell mx-auto w-full max-w-7xl">
        <div className="flex items-center justify-between gap-4 px-5 py-4 md:px-7 md:py-5">
          <Link href="/#top" className="nav-brand text-sm font-semibold tracking-[0.32em] text-cyan-200">
          PORTFOLIO
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link-chip ${isActiveLink(item.href) ? "nav-link-chip-active" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/#contact"
              className="nav-connect hidden rounded-full border border-cyan-300/30 px-5 py-2.5 text-sm text-cyan-200 transition hover:bg-cyan-300/15 md:inline-flex"
            >
              Let us connect
            </Link>

            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-cyan-200 transition hover:border-cyan-300/50 md:hidden"
              aria-label="Toggle navigation menu"
            >
              <span className="relative block h-4 w-5">
                <span className={`absolute left-0 h-0.5 w-5 bg-current transition-all ${isMenuOpen ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 top-1.5 h-0.5 w-5 bg-current transition-opacity ${isMenuOpen ? "opacity-0" : "opacity-100"}`} />
                <span className={`absolute left-0 h-0.5 w-5 bg-current transition-all ${isMenuOpen ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </div>

        <div className={`px-5 pb-5 md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
          <div className="rounded-2xl border border-white/10 bg-black/30 p-3 backdrop-blur-xl">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block rounded-xl px-4 py-3 text-sm text-zinc-200 transition hover:bg-cyan-400/10 hover:text-cyan-200 ${
                  isActiveLink(item.href) ? "bg-cyan-400/12 text-cyan-100" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 inline-flex w-full items-center justify-center rounded-xl border border-cyan-300/40 px-4 py-3 text-sm text-cyan-200 transition hover:bg-cyan-300/15"
            >
              Let us connect
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

