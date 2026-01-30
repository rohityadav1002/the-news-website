import { Metadata } from "next";
import { searchArticles } from "@/lib/payload";
import { SearchClient } from "@/components/SearchClient";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Search | The Order of Change",
  description: "Search articles on The Order of Change.",
  openGraph: {
    title: "Search | The Order of Change",
    description: "Search articles on The Order of Change.",
    type: "website",
  },
};

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

async function SearchResults({ query }: { query: string }) {
  let results: SearchResult[] = [];

  if (query) {
    try {
      results = (await searchArticles(query, 20)) as unknown as SearchResult[];
    } catch {
      results = [];
    }
  }

  return <SearchClient initialResults={results} initialQuery={query} />;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;

  return (
    <Suspense
      fallback={
        <div className="pt-32 pb-16 px-6 lg:px-12 text-center">
          <p className="font-mono text-sm" style={{ color: "#a1a1aa" }}>
            Loading...
          </p>
        </div>
      }
    >
      <SearchResults query={q} />
    </Suspense>
  );
}
