import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAuthorBySlug, getArticlesByAuthor, getAuthors } from "@/lib/payload";

// Type definitions
interface Author {
  id: string;
  penName: string;
  slug: string;
  publicBio?: string;
  publicLocation?: string;
  voiceType?: string;
  contentFocus?: string;
  avatar?: {
    url?: string;
    alt?: string;
  };
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface FeaturedImage {
  url?: string;
  alt?: string;
}

interface Article {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  excerpt: string;
  content: unknown;
  featuredImage?: FeaturedImage | string;
  author: Author | string;
  category: Category | string;
  publishedAt?: string;
}

export const dynamic = 'force-dynamic';

// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug) as Author | null;

  if (!author) {
    return {
      title: "Author Not Found | The Order of Change",
    };
  }

  return {
    title: `${author.penName} | The Order of Change`,
    description: author.publicBio || `Read analysis from ${author.penName} at The Order of Change`,
    openGraph: {
      title: `${author.penName} | The Order of Change`,
      description: author.publicBio || `Read analysis from ${author.penName}`,
      type: "profile",
    },
  };
}

// Helper functions
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function estimateReadTime(content: unknown): string {
  const contentStr = JSON.stringify(content);
  const wordCount = contentStr.split(/\s+/).length / 3;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min read`;
}

function getImageUrl(image: FeaturedImage | string | undefined): string {
  if (!image) return "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1600&q=80";
  if (typeof image === "string") return image;
  return image.url || "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1600&q=80";
}

const voiceTypeLabels: Record<string, { label: string; description: string }> = {
  critical: {
    label: "Critical Voice",
    description: "Challenges conventional narratives and questions established power structures",
  },
  pragmatic: {
    label: "Pragmatic Voice",
    description: "Focuses on practical implications and real-world outcomes",
  },
  neutral: {
    label: "Neutral Synthesizer",
    description: "Synthesizes multiple perspectives into balanced analysis",
  },
};

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug) as Author | null;

  if (!author) {
    notFound();
  }

  const articles = await getArticlesByAuthor(author.id) as Article[];
  const allAuthors = await getAuthors() as Author[];
  const otherAuthors = allAuthors.filter((a) => a.slug !== slug);

  const authorImageUrl = author.avatar?.url ||
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80";

  const voiceInfo = author.voiceType ? voiceTypeLabels[author.voiceType] : null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0a0a", color: "#fafaf9" }}>
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
                style={{ border: "1px solid #b8860b", backgroundColor: "rgba(184,134,11,0.1)" }}
              >
                <span className="font-mono text-sm font-bold" style={{ color: "#b8860b" }}>
                  OC
                </span>
              </div>
              <span className="font-display text-xl tracking-wide hidden sm:block">
                The Order of Change
              </span>
            </Link>

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

      {/* Author Hero */}
      <section className="pt-32 pb-16 px-6 lg:px-12 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at top, rgba(184,134,11,0.08) 0%, transparent 60%)",
          }}
        />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
            {/* Author Image */}
            <div className="flex-shrink-0">
              <div
                className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden"
                style={{ border: "4px solid #b8860b" }}
              >
                <Image
                  src={authorImageUrl}
                  alt={author.penName}
                  width={192}
                  height={192}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
            </div>

            {/* Author Info */}
            <div className="text-center md:text-left flex-1">
              <p
                className="font-mono text-xs uppercase tracking-[0.3em] mb-4"
                style={{ color: "#b8860b" }}
              >
                Columnist
              </p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl mb-4">
                {author.penName}
              </h1>

              {voiceInfo && (
                <div className="mb-6">
                  <span
                    className="inline-block font-mono text-xs uppercase tracking-wider px-4 py-2 mb-2"
                    style={{ backgroundColor: "rgba(184,134,11,0.15)", color: "#b8860b" }}
                  >
                    {voiceInfo.label}
                  </span>
                  <p className="font-mono text-sm" style={{ color: "#52525b" }}>
                    {voiceInfo.description}
                  </p>
                </div>
              )}

              {author.publicBio && (
                <p
                  className="font-display text-lg italic mb-4 max-w-xl"
                  style={{ color: "#a1a1aa" }}
                >
                  {author.publicBio}
                </p>
              )}

              {author.publicLocation && (
                <p className="font-mono text-sm" style={{ color: "#52525b" }}>
                  {author.publicLocation}
                </p>
              )}

              <p className="font-mono text-sm mt-6" style={{ color: "#52525b" }}>
                {articles.length} {articles.length === 1 ? "article" : "articles"} published
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div
          className="h-px"
          style={{ background: "linear-gradient(to right, transparent, #2a2a2a, transparent)" }}
        />
      </div>

      {/* Articles Section */}
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: "#b8860b" }}>
              Articles by {author.penName}
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: "linear-gradient(to right, #2a2a2a, transparent)" }}
            />
          </div>

          {articles.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-display text-2xl mb-4" style={{ color: "#a1a1aa" }}>
                No articles published yet
              </p>
              <p className="font-mono text-sm" style={{ color: "#52525b" }}>
                Check back soon for new analysis
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {articles.map((article, index) => {
                const category = typeof article.category === "object" ? article.category : null;
                const imageUrl = getImageUrl(article.featuredImage as FeaturedImage);

                return (
                  <Link key={article.id} href={`/article/${article.slug}`} className="group block">
                    <article
                      className="relative overflow-hidden"
                      style={{ backgroundColor: "#0f0f0f" }}
                    >
                      <div className="grid md:grid-cols-3 gap-0">
                        <div className="relative aspect-[16/10] md:aspect-auto md:h-full overflow-hidden">
                          <Image
                            src={imageUrl}
                            alt={article.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            priority={index < 2}
                          />
                          <div
                            className="absolute inset-0 md:hidden"
                            style={{
                              background:
                                "linear-gradient(to top, rgba(15,15,15,1) 0%, transparent 100%)",
                            }}
                          />
                        </div>

                        <div className="md:col-span-2 p-6 md:p-8 flex flex-col justify-center">
                          <div className="flex flex-wrap items-center gap-4 mb-4">
                            {category && (
                              <span
                                className="font-mono text-[10px] uppercase tracking-wider px-3 py-1.5"
                                style={{ backgroundColor: "rgba(184,134,11,0.2)", color: "#b8860b" }}
                              >
                                {category.name}
                              </span>
                            )}
                            {article.publishedAt && (
                              <span className="font-mono text-xs" style={{ color: "#52525b" }}>
                                {formatDate(article.publishedAt)}
                              </span>
                            )}
                            <span className="font-mono text-xs" style={{ color: "#52525b" }}>
                              {estimateReadTime(article.content)}
                            </span>
                          </div>

                          <h2 className="font-display text-2xl lg:text-3xl mb-3 group-hover:text-[#b8860b] transition-colors duration-300">
                            {article.title}
                          </h2>

                          {article.subtitle && (
                            <p
                              className="font-display text-base italic mb-3"
                              style={{ color: "#b8860b" }}
                            >
                              {article.subtitle}
                            </p>
                          )}

                          <p
                            className="leading-relaxed line-clamp-2 md:line-clamp-3"
                            style={{ color: "#a1a1aa" }}
                          >
                            {article.excerpt}
                          </p>

                          <div className="mt-6">
                            <span
                              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider group-hover:text-[#b8860b] transition-colors"
                              style={{ color: "#a1a1aa" }}
                            >
                              Read Article
                              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                          </div>
                        </div>
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
          )}
        </div>
      </section>

      {/* Other Authors */}
      {otherAuthors.length > 0 && (
        <section className="py-16 px-6 lg:px-12" style={{ backgroundColor: "#0f0f0f" }}>
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <span
                className="font-mono text-xs uppercase tracking-[0.2em]"
                style={{ color: "#b8860b" }}
              >
                Other Columnists
              </span>
              <div
                className="flex-1 h-px"
                style={{ background: "linear-gradient(to right, #2a2a2a, transparent)" }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherAuthors.map((otherAuthor) => {
                const otherAuthorImage = otherAuthor.avatar?.url ||
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80";
                const otherVoiceInfo = otherAuthor.voiceType
                  ? voiceTypeLabels[otherAuthor.voiceType]
                  : null;

                return (
                  <Link key={otherAuthor.slug} href={`/author/${otherAuthor.slug}`} className="group">
                    <article className="text-center">
                      <div
                        className="relative w-28 h-28 mx-auto mb-6 rounded-full overflow-hidden transition-all duration-300 group-hover:scale-105"
                        style={{ border: "3px solid #2a2a2a" }}
                      >
                        <Image
                          src={otherAuthorImage}
                          alt={otherAuthor.penName}
                          fill
                          className="object-cover"
                        />
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ backgroundColor: "rgba(184,134,11,0.2)" }}
                        />
                      </div>

                      <h3 className="font-display text-xl mb-2 group-hover:text-[#b8860b] transition-colors duration-300">
                        {otherAuthor.penName}
                      </h3>

                      {otherVoiceInfo && (
                        <p
                          className="font-mono text-xs uppercase tracking-wider mb-3"
                          style={{ color: "#b8860b" }}
                        >
                          {otherVoiceInfo.label}
                        </p>
                      )}

                      {otherAuthor.publicLocation && (
                        <p className="font-mono text-xs" style={{ color: "#52525b" }}>
                          {otherAuthor.publicLocation}
                        </p>
                      )}
                    </article>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="py-24 px-6 lg:px-12 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, rgba(184,134,11,0.1) 0%, transparent 70%)",
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
            Get {author.penName}&apos;s latest analysis
          </h2>
          <p className="mb-8" style={{ color: "#a1a1aa" }}>
            Subscribe to receive new articles directly in your inbox.
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
      <footer className="py-12 px-6 lg:px-12" style={{ borderTop: "1px solid #1c1c1c" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3">
            <div
              className="w-8 h-8 flex items-center justify-center"
              style={{ border: "1px solid #b8860b" }}
            >
              <span className="font-mono text-xs font-bold" style={{ color: "#b8860b" }}>
                OC
              </span>
            </div>
            <span className="font-display text-lg">The Order of Change</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/about"
              className="font-mono text-xs uppercase tracking-wider hover:text-[#b8860b] transition-colors"
              style={{ color: "#a1a1aa" }}
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
            © 2026 The Order of Change
          </p>
        </div>
      </footer>
    </div>
  );
}
