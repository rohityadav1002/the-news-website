import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getPayloadClient, getPublishedArticles, getCategories } from "@/lib/payload";

// Type definitions
interface Author {
  id: string;
  penName: string;
  avatar?: {
    url?: string;
  };
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
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

// Get category by slug
async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const payload = await getPayloadClient();

  const categories = await payload.find({
    collection: 'categories',
    where: {
      slug: { equals: slug },
    },
    limit: 1,
  });

  return (categories.docs[0] as Category) || null;
}

// Get articles by category
async function getArticlesByCategory(categorySlug: string): Promise<Article[]> {
  const articles = await getPublishedArticles(100, categorySlug);
  return articles as Article[];
}

// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category Not Found | The Order of Change",
    };
  }

  return {
    title: `${category.name} | The Order of Change`,
    description: category.description || `Explore ${category.name} analysis and insights from The Order of Change`,
    openGraph: {
      title: `${category.name} | The Order of Change`,
      description: category.description || `Explore ${category.name} analysis and insights`,
      type: "website",
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

function getImageUrl(image: FeaturedImage | string | undefined): string | null {
  if (!image) return null;
  if (typeof image === "string") return image;
  return image.url || null;
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const articles = await getArticlesByCategory(slug);
  const allCategories = await getCategories();

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-12 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at top, rgba(184,134,11,0.08) 0%, transparent 60%)",
          }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p
            className="font-mono text-xs uppercase tracking-[0.3em] mb-6"
            style={{ color: "#b8860b" }}
          >
            Category
          </p>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl mb-6">{category.name}</h1>
          {category.description && (
            <p className="font-display text-xl italic max-w-2xl mx-auto" style={{ color: "#a1a1aa" }}>
              {category.description}
            </p>
          )}
          <p className="font-mono text-sm mt-8" style={{ color: "#52525b" }}>
            {articles.length} {articles.length === 1 ? "article" : "articles"}
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="h-px" style={{ background: "linear-gradient(to right, transparent, #2a2a2a, transparent)" }} />
      </div>

      {/* Articles Grid */}
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {articles.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-display text-2xl mb-4" style={{ color: "#a1a1aa" }}>
                No articles yet in this category
              </p>
              <p className="font-mono text-sm" style={{ color: "#52525b" }}>
                Check back soon for new analysis
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, index) => {
                const author = typeof article.author === "object" ? article.author : null;
                const imageUrl = getImageUrl(article.featuredImage as FeaturedImage);
                const authorImageUrl = author?.avatar?.url || null;

                return (
                  <Link key={article.id} href={`/article/${article.slug}`} className="group">
                    <article
                      className="relative overflow-hidden h-full"
                      style={{ backgroundColor: "#0f0f0f" }}
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={article.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            priority={index < 3}
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #0f0f0f 100%)" }}>
                            <div className="w-12 h-12 flex items-center justify-center" style={{ border: "1px solid #2a2a2a" }}>
                              <span className="font-mono text-xs" style={{ color: "#2a2a2a" }}>OC</span>
                            </div>
                          </div>
                        )}
                        <div
                          className="absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(to top, rgba(15,15,15,1) 0%, rgba(15,15,15,0.3) 50%, transparent 100%)",
                          }}
                        />
                      </div>

                      <div className="p-6">
                        <h2 className="font-display text-xl lg:text-2xl mb-3 group-hover:text-[#b8860b] transition-colors duration-300">
                          {article.title}
                        </h2>
                        {article.subtitle && (
                          <p
                            className="font-display text-sm italic mb-3"
                            style={{ color: "#b8860b" }}
                          >
                            {article.subtitle}
                          </p>
                        )}
                        <p
                          className="mb-6 leading-relaxed line-clamp-3"
                          style={{ color: "#a1a1aa" }}
                        >
                          {article.excerpt}
                        </p>
                        <div
                          className="flex items-center justify-between pt-4"
                          style={{ borderTop: "1px solid #1c1c1c" }}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center" style={{ backgroundColor: authorImageUrl ? undefined : "rgba(184,134,11,0.15)", border: authorImageUrl ? undefined : "1px solid #2a2a2a" }}>
                              {authorImageUrl ? (
                                <Image
                                  src={authorImageUrl}
                                  alt={author?.penName || "Author"}
                                  width={32}
                                  height={32}
                                  className="object-cover"
                                />
                              ) : (
                                <span className="font-mono text-[10px] font-bold" style={{ color: "#b8860b" }}>
                                  {(author?.penName || "?").split(" ").map(n => n[0]).join("")}
                                </span>
                              )}
                            </div>
                            <div>
                              <span className="font-mono text-xs block" style={{ color: "#a1a1aa" }}>
                                {author?.penName || "Staff"}
                              </span>
                              {article.publishedAt && (
                                <span className="font-mono text-[10px]" style={{ color: "#52525b" }}>
                                  {formatDate(article.publishedAt)}
                                </span>
                              )}
                            </div>
                          </div>
                          <span className="font-mono text-xs" style={{ color: "#52525b" }}>
                            {estimateReadTime(article.content)}
                          </span>
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

      {/* Other Categories */}
      <section className="py-16 px-6 lg:px-12" style={{ backgroundColor: "#0f0f0f" }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: "#b8860b" }}>
              Explore Other Topics
            </span>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, #2a2a2a, transparent)" }} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {(allCategories as Category[])
              .filter((cat) => cat.slug !== slug)
              .map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="group relative overflow-hidden p-8 text-center transition-all duration-300"
                  style={{ backgroundColor: "#0a0a0a", border: "1px solid #1c1c1c" }}
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
          <h2 className="font-display text-3xl lg:text-4xl mb-4">See the shift before it happens</h2>
          <p className="mb-8" style={{ color: "#a1a1aa" }}>
            Join readers who want to understand the forces reshaping geopolitics, markets, and power.
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

    </>
  );
}
