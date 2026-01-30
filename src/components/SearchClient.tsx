"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

interface SearchResult {
  id: string;
  title: string;
  excerpt?: string;
  slug?: string;
  category?: string;
  doc?: {
    value?: string;
    relationTo?: string;
  };
}

export function SearchClient({
  initialResults,
  initialQuery,
}: {
  initialResults: SearchResult[];
  initialQuery: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState(initialResults);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setResults(initialResults);
  }, [initialResults]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    startTransition(() => {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    });
  }

  const currentQuery = searchParams.get("q") || "";

  return (
    <>
      {/* Search Input */}
      <section className="pt-32 pb-12 px-6 lg:px-12 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(184,134,11,0.08) 0%, transparent 60%)",
          }}
        />
        <div className="max-w-3xl mx-auto relative z-10">
          <p
            className="font-mono text-xs uppercase tracking-[0.3em] mb-6 text-center"
            style={{ color: "#b8860b" }}
          >
            Search
          </p>
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles..."
                autoFocus
                className="w-full px-6 py-4 pr-14 font-mono text-lg outline-none transition-all duration-300 focus:border-[#b8860b]"
                style={{
                  backgroundColor: "#0f0f0f",
                  border: "1px solid #2a2a2a",
                  color: "#fafaf9",
                }}
              />
              <button
                type="submit"
                disabled={isPending}
                className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-sm transition-colors hover:text-[#b8860b]"
                style={{ color: "#a1a1aa" }}
              >
                {isPending ? "..." : "→"}
              </button>
            </div>
          </form>
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

      {/* Results */}
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          {currentQuery && (
            <p className="font-mono text-xs uppercase tracking-wider mb-8" style={{ color: "#a1a1aa" }}>
              {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{currentQuery}&rdquo;
            </p>
          )}

          {!currentQuery && (
            <p className="text-center py-12" style={{ color: "#52525b" }}>
              Enter a search term to find articles.
            </p>
          )}

          {currentQuery && results.length === 0 && (
            <div className="text-center py-12">
              <p className="font-display text-xl mb-2">No results found</p>
              <p style={{ color: "#a1a1aa" }}>
                Try a different search term or browse our{" "}
                <Link href="/" className="hover:text-[#b8860b] transition-colors" style={{ color: "#b8860b" }}>
                  latest articles
                </Link>
                .
              </p>
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-8">
              {results.map((result) => {
                const articleSlug = result.slug || (result.doc?.value ? result.doc.value : result.id);
                return (
                  <Link
                    key={result.id}
                    href={`/article/${articleSlug}`}
                    className="block group"
                  >
                    <article
                      className="p-6 transition-all duration-300"
                      style={{ border: "1px solid #1c1c1c" }}
                    >
                      {result.category && (
                        <span
                          className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 mb-3 inline-block"
                          style={{
                            backgroundColor: "rgba(184,134,11,0.15)",
                            color: "#b8860b",
                          }}
                        >
                          {result.category}
                        </span>
                      )}
                      <h3 className="font-display text-xl mb-2 group-hover:text-[#b8860b] transition-colors">
                        {result.title}
                      </h3>
                      {result.excerpt && (
                        <p
                          className="text-sm line-clamp-2"
                          style={{ color: "#a1a1aa" }}
                        >
                          {result.excerpt}
                        </p>
                      )}
                    </article>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
