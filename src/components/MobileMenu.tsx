"use client";

import { useState } from "react";
import Link from "next/link";

interface Category {
  name: string;
  slug: string;
}

export function MobileMenu({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger button — visible below lg */}
      <button
        onClick={() => setOpen(!open)}
        className=" flex flex-col gap-1.5 w-8 h-8 items-center justify-center"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        <span
          className="block w-5 h-px transition-all duration-300"
          style={{
            backgroundColor: "#b8860b",
            transform: open ? "rotate(45deg) translateY(3.5px)" : "none",
          }}
        />
        <span
          className="block w-5 h-px transition-all duration-300"
          style={{
            backgroundColor: "#b8860b",
            opacity: open ? 0 : 1,
          }}
        />
        <span
          className="block w-5 h-px transition-all duration-300"
          style={{
            backgroundColor: "#b8860b",
            transform: open ? "rotate(-45deg) translateY(-3.5px)" : "none",
          }}
        />
      </button>

      {/* Mobile menu overlay */}
      {open && (
        <div
          className="fixed inset-0 top-20 z-40 "
          style={{
            backgroundColor: "rgba(10,10,10,0.98)",
            backdropFilter: "blur(12px)",
          }}
        >
          <nav className="flex flex-col items-center gap-8 pt-16 px-6">
            {categories.slice(0, 6).map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                onClick={() => setOpen(false)}
                className="font-mono text-sm uppercase tracking-wider hover:text-[#b8860b] transition-colors"
                style={{ color: "#a1a1aa" }}
              >
                {cat.name}
              </Link>
            ))}

            <div
              className="w-16 h-px my-4"
              style={{ backgroundColor: "#2a2a2a" }}
            />

            <Link
              href="/search"
              onClick={() => setOpen(false)}
              className="font-mono text-sm uppercase tracking-wider hover:text-[#b8860b] transition-colors"
              style={{ color: "#a1a1aa" }}
            >
              Search
            </Link>

            <Link
              href="/about"
              onClick={() => setOpen(false)}
              className="font-mono text-sm uppercase tracking-wider hover:text-[#b8860b] transition-colors"
              style={{ color: "#a1a1aa" }}
            >
              About
            </Link>

            <Link
              href="/subscribe"
              onClick={() => setOpen(false)}
              className="font-mono text-xs uppercase tracking-wider px-8 py-3 mt-4 transition-all duration-300 bg-[#b8860b] text-[#0a0a0a] hover:bg-[#d4a00a]"
            >
              Subscribe
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
