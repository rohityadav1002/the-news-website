import Link from "next/link";

interface Category {
  name: string;
  slug: string;
}

export function SiteFooter({ categories }: { categories: Category[] }) {
  return (
    <footer
      className="py-16 px-6 lg:px-12"
      style={{ borderTop: "1px solid #1c1c1c" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 flex items-center justify-center"
                style={{ border: "1px solid #b8860b" }}
              >
                <span
                  className="font-mono text-sm font-bold"
                  style={{ color: "#b8860b" }}
                >
                  OC
                </span>
              </div>
              <span className="font-display text-xl">The Order of Change</span>
            </Link>
            <p className="max-w-sm" style={{ color: "#a1a1aa" }}>
              Independent geopolitical analysis for those who want to understand
              the forces reshaping our world.
            </p>
          </div>

          <div>
            <h4
              className="font-mono text-xs uppercase tracking-wider mb-6"
              style={{ color: "#b8860b" }}
            >
              Topics
            </h4>
            <ul className="space-y-3">
              {categories.slice(0, 4).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-sm hover:text-[#b8860b] transition-colors"
                    style={{ color: "#a1a1aa" }}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="font-mono text-xs uppercase tracking-wider mb-6"
              style={{ color: "#b8860b" }}
            >
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm hover:text-[#b8860b] transition-colors"
                  style={{ color: "#a1a1aa" }}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/subscribe"
                  className="text-sm hover:text-[#b8860b] transition-colors"
                  style={{ color: "#a1a1aa" }}
                >
                  Subscribe
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm hover:text-[#b8860b] transition-colors"
                  style={{ color: "#a1a1aa" }}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="text-sm hover:text-[#b8860b] transition-colors"
                  style={{ color: "#52525b" }}
                >
                  Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid #1c1c1c" }}
        >
          <p className="font-mono text-xs" style={{ color: "#52525b" }}>
            &copy; 2026 The Order of Change. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="font-mono text-xs hover:text-[#b8860b] transition-colors"
              style={{ color: "#52525b" }}
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="font-mono text-xs hover:text-[#b8860b] transition-colors"
              style={{ color: "#52525b" }}
            >
              Terms
            </Link>
            <p
              className="font-mono text-xs italic"
              style={{ color: "#52525b" }}
            >
              See the shift.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
