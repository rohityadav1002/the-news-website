import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { getAuthors, getCategories } from "@/lib/payload";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About | The Order of Change",
  description:
    "Independent geopolitical analysis from multiple perspectives. Meet the voices behind the analysis.",
  openGraph: {
    title: "About | The Order of Change",
    description:
      "Independent geopolitical analysis from multiple perspectives.",
    type: "website",
  },
};

const voiceLabels: Record<string, string> = {
  critical: "Critical Voice",
  pragmatic: "Pragmatic Voice",
  neutral: "Neutral Synthesizer",
};

const voiceDescriptions: Record<string, string> = {
  critical:
    "Questions power, follows the money, and exposes the narratives behind global events.",
  pragmatic:
    "Analyzes outcomes over intentions, focuses on results and strategic positioning.",
  neutral:
    "Synthesizes competing viewpoints and provides context without agenda.",
};

interface Author {
  penName: string;
  slug: string;
  publicBio?: string;
  publicLocation?: string;
  voiceType?: string;
  avatar?: { url?: string };
}

interface Category {
  name: string;
  slug: string;
}

export default async function AboutPage() {
  const [authors, categories] = await Promise.all([
    getAuthors(),
    getCategories(),
  ]);

  const authorList = authors as unknown as Author[];
  const categoryList = categories as unknown as Category[];

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#0a0a0a", color: "#fafaf9" }}
    >
      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: "rgba(10,10,10,0.9)",
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
              {categoryList.slice(0, 4).map((cat) => (
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

            <Link
              href="/subscribe"
              className="font-mono text-xs uppercase tracking-wider px-5 py-2.5 transition-all duration-300 hover:bg-[#b8860b] hover:text-[#0a0a0a]"
              style={{ border: "1px solid #b8860b", color: "#b8860b" }}
            >
              Subscribe
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 lg:px-12 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(184,134,11,0.08) 0%, transparent 60%)",
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p
            className="font-mono text-xs uppercase tracking-[0.3em] mb-6"
            style={{ color: "#b8860b" }}
          >
            About
          </p>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl mb-8">
            <span className="italic">The Order</span>{" "}
            <span style={{ color: "#b8860b" }}>of Change</span>
          </h1>
          <p
            className="font-display text-xl lg:text-2xl italic max-w-2xl mx-auto"
            style={{ color: "#a1a1aa" }}
          >
            Independent geopolitical analysis for those who want to see beyond
            the headlines.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div
          className="h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, #2a2a2a, transparent)",
          }}
        />
      </div>

      {/* Mission */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span
              className="font-mono text-xs uppercase tracking-[0.2em]"
              style={{ color: "#b8860b" }}
            >
              Our Mission
            </span>
            <div
              className="flex-1 h-px"
              style={{
                background: "linear-gradient(to right, #2a2a2a, transparent)",
              }}
            />
          </div>

          <div className="space-y-6" style={{ color: "#a1a1aa" }}>
            <p className="text-lg leading-relaxed">
              The Order of Change exists because the most important stories in
              geopolitics are rarely the ones making headlines. They are in the
              trade agreements signed at midnight, the pipeline routes redrawn on
              maps few will see, and the quiet shifts in capital that reshape
              nations before anyone notices.
            </p>
            <p className="text-lg leading-relaxed">
              We are not a breaking news operation. We do not chase clicks or
              manufacture outrage. We are in the business of influence: tracing
              how power moves, who benefits, and what it means for the global
              order.
            </p>
            <p className="text-lg leading-relaxed">
              Our analysts cover the same events from different angles. Where one
              sees overreach, another sees strategy. Where one sees chaos,
              another sees a pattern. We believe the reader is smart enough to
              hold both perspectives and draw their own conclusions.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial Approach */}
      <section
        className="py-20 px-6 lg:px-12"
        style={{ backgroundColor: "#0f0f0f" }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span
              className="font-mono text-xs uppercase tracking-[0.2em]"
              style={{ color: "#b8860b" }}
            >
              Editorial Approach
            </span>
            <div
              className="flex-1 h-px"
              style={{
                background: "linear-gradient(to right, #2a2a2a, transparent)",
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Multiple Perspectives",
                text: "Every major event is covered from at least two editorial voices. We do not tell you what to think. We give you the tools to see clearly.",
              },
              {
                title: "Facts First",
                text: "Every claim is sourced. Every number is cited. We use real data from official records, government filings, and verified reports. Opinion is labeled. Facts stand alone.",
              },
              {
                title: "Follow the Influence",
                text: "We trace how power moves between nations, institutions, and individuals. We are not financial news. We are not partisan media. We track influence.",
              },
            ].map((item) => (
              <div key={item.title}>
                <h3
                  className="font-display text-xl mb-4"
                  style={{ color: "#fafaf9" }}
                >
                  {item.title}
                </h3>
                <p className="leading-relaxed" style={{ color: "#a1a1aa" }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Columnists */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span
              className="font-mono text-xs uppercase tracking-[0.3em] block mb-4"
              style={{ color: "#b8860b" }}
            >
              The Voices Behind the Analysis
            </span>
            <h2 className="font-display text-4xl lg:text-5xl">
              Our Columnists
            </h2>
          </div>

          <div className="space-y-12">
            {authorList.map((author) => {
              const avatarUrl = author.avatar?.url || null;
              const initials = author.penName
                .split(" ")
                .map((n) => n[0])
                .join("");

              return (
                <Link
                  key={author.slug}
                  href={`/author/${author.slug}`}
                  className="group"
                >
                  <article
                    className="flex flex-col md:flex-row items-center md:items-start gap-8 p-8 transition-all duration-300"
                    style={{
                      backgroundColor: "#0f0f0f",
                      border: "1px solid #1c1c1c",
                    }}
                  >
                    <div
                      className="w-28 h-28 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center"
                      style={{
                        border: "3px solid #2a2a2a",
                        backgroundColor: avatarUrl
                          ? undefined
                          : "rgba(184,134,11,0.1)",
                      }}
                    >
                      {avatarUrl ? (
                        <Image
                          src={avatarUrl}
                          alt={author.penName}
                          width={112}
                          height={112}
                          className="object-cover"
                        />
                      ) : (
                        <span
                          className="font-mono text-2xl font-bold"
                          style={{ color: "#b8860b" }}
                        >
                          {initials}
                        </span>
                      )}
                    </div>

                    <div className="text-center md:text-left">
                      <h3 className="font-display text-2xl mb-1 group-hover:text-[#b8860b] transition-colors duration-300">
                        {author.penName}
                      </h3>
                      {author.voiceType && (
                        <p
                          className="font-mono text-xs uppercase tracking-wider mb-3"
                          style={{ color: "#b8860b" }}
                        >
                          {voiceLabels[author.voiceType] || author.voiceType}
                        </p>
                      )}
                      {author.voiceType &&
                        voiceDescriptions[author.voiceType] && (
                          <p
                            className="mb-3 leading-relaxed"
                            style={{ color: "#a1a1aa" }}
                          >
                            {voiceDescriptions[author.voiceType]}
                          </p>
                        )}
                      {author.publicBio && (
                        <p style={{ color: "#71717a" }}>{author.publicBio}</p>
                      )}
                      {author.publicLocation && (
                        <p
                          className="font-mono text-xs uppercase tracking-wider mt-3"
                          style={{ color: "#52525b" }}
                        >
                          {author.publicLocation}
                        </p>
                      )}
                    </div>

                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{ border: "1px solid #b8860b" }}
                    />
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Topics */}
      <section
        className="py-20 px-6 lg:px-12"
        style={{ backgroundColor: "#0f0f0f" }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span
              className="font-mono text-xs uppercase tracking-[0.2em]"
              style={{ color: "#b8860b" }}
            >
              What We Cover
            </span>
            <div
              className="flex-1 h-px"
              style={{
                background: "linear-gradient(to right, #2a2a2a, transparent)",
              }}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categoryList.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="group relative overflow-hidden p-8 text-center transition-all duration-300"
                style={{
                  backgroundColor: "#0a0a0a",
                  border: "1px solid #1c1c1c",
                }}
              >
                <h3 className="font-display text-lg lg:text-xl group-hover:text-[#b8860b] transition-colors duration-300">
                  {cat.name}
                </h3>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ border: "1px solid #b8860b" }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                  style={{ backgroundColor: "#b8860b" }}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="py-24 px-6 lg:px-12 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(184,134,11,0.1) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <span
            className="font-mono text-xs uppercase tracking-[0.3em] block mb-4"
            style={{ color: "#b8860b" }}
          >
            Stay Informed
          </span>
          <h2 className="font-display text-3xl lg:text-4xl mb-4">
            See the shift before it happens
          </h2>
          <p className="mb-8" style={{ color: "#a1a1aa" }}>
            Join readers who want to understand the forces reshaping geopolitics,
            markets, and power.
          </p>
          <Link
            href="/subscribe"
            className="inline-flex items-center gap-3 font-mono text-sm uppercase tracking-wider px-8 py-4 transition-all duration-300 bg-[#b8860b] text-[#0a0a0a] hover:bg-[#d4a00a]"
          >
            <span>Subscribe Free</span>
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-12 px-6 lg:px-12"
        style={{ borderTop: "1px solid #1c1c1c" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3">
            <div
              className="w-8 h-8 flex items-center justify-center"
              style={{ border: "1px solid #b8860b" }}
            >
              <span
                className="font-mono text-xs font-bold"
                style={{ color: "#b8860b" }}
              >
                OC
              </span>
            </div>
            <span className="font-display text-lg">The Order of Change</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/about"
              className="font-mono text-xs uppercase tracking-wider"
              style={{ color: "#b8860b" }}
            >
              About
            </Link>
            <Link
              href="/subscribe"
              className="font-mono text-xs uppercase tracking-wider hover:text-[#b8860b] transition-colors"
              style={{ color: "#a1a1aa" }}
            >
              Subscribe
            </Link>
            <Link
              href="/contact"
              className="font-mono text-xs uppercase tracking-wider hover:text-[#b8860b] transition-colors"
              style={{ color: "#a1a1aa" }}
            >
              Contact
            </Link>
          </div>
          <p className="font-mono text-xs" style={{ color: "#52525b" }}>
            &copy; 2026 The Order of Change
          </p>
        </div>
      </footer>
    </div>
  );
}
