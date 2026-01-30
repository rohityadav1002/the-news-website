import Link from "next/link";
import { MobileMenu } from "./MobileMenu";

interface Category {
  name: string;
  slug: string;
}

export function SiteNav({ categories }: { categories: Category[] }) {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: "rgba(10,10,10,0.8)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <div
              className="w-10 h-10 flex items-center justify-center"
              style={{
                border: "1px solid #b8860b",
                backgroundColor: "rgba(184,134,11,0.1)",
              }}
            >
              <span
                className="font-mono text-sm font-bold"
                style={{ color: "#b8860b" }}
              >
                OC
              </span>
            </div>
            <span className="font-display text-xl tracking-wide hidden sm:block">
              The Order of Change
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {categories.slice(0, 4).map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="font-mono text-xs uppercase tracking-wider hover:text-[#b8860b] transition-colors"
                style={{ color: "#a1a1aa" }}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/subscribe"
              className="hidden sm:inline-flex font-mono text-xs uppercase tracking-wider px-5 py-2.5 transition-all duration-300 hover:bg-[#b8860b] hover:text-[#0a0a0a]"
              style={{ border: "1px solid #b8860b", color: "#b8860b" }}
            >
              Subscribe
            </Link>
            <MobileMenu categories={categories} />
          </div>
        </div>
      </div>
    </nav>
  );
}
