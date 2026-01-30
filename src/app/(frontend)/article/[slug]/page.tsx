import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getArticleBySlug, getRelatedArticles } from "@/lib/payload";
import { RichText } from "@/components/RichText";
import {
  ReadingProgress,
  ScrollNav,
  ShareButtons,
  StickyShareBar,
} from "@/components/ArticleComponents";
import { Blocks } from "@/components/Blocks";
import { formatDate, estimateReadTime, getImageUrl, type FeaturedImage } from "@/lib/utils";

// Type definitions
interface Author {
  id: string;
  penName: string;
  slug: string;
  publicBio?: string;
  publicLocation?: string;
  voiceType?: string;
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

interface Article {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  excerpt: string;
  content: unknown;
  layout?: unknown[];
  featuredImage?: FeaturedImage | string;
  author: Author | string;
  category: Category | string;
  status: string;
  publishedAt?: string;
  tags?: { tag: string }[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

// Dynamic rendering - fetch article on each request
// This avoids needing database access at build time
export const dynamic = 'force-dynamic';

// Generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found | The Order of Change",
    };
  }

  const author = typeof article.author === "object" ? article.author : null;

  const featuredImg = article.featuredImage;
  const ogImage =
    featuredImg && typeof featuredImg === "object" && featuredImg.url
      ? featuredImg.url
      : undefined;

  return {
    title: article.seo?.metaTitle || `${article.title} | The Order of Change`,
    description: article.seo?.metaDescription || article.excerpt,
    authors: author ? [{ name: author.penName }] : [],
    alternates: {
      canonical: `/article/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      authors: author ? [author.penName] : [],
      images: ogImage ? [ogImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}



export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = (await getArticleBySlug(slug)) as Article | null;

  if (!article) {
    notFound();
  }

  // Extract populated relationships
  const author = typeof article.author === "object" ? article.author : null;
  const category = typeof article.category === "object" ? article.category : null;
  const categoryId = typeof article.category === "object" ? article.category.id : article.category;

  // Get related articles from same category
  const relatedArticles = await getRelatedArticles(slug, categoryId, 3);

  const featuredImageUrl = getImageUrl(article.featuredImage);
  const authorImageUrl = author?.avatar
    ? getImageUrl(author.avatar)
    : null;

  const voiceTypeLabels: Record<string, string> = {
    critical: "Critical Voice",
    pragmatic: "Pragmatic Voice",
    neutral: "Neutral Synthesizer",
  };

  const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.NEXT_PUBLIC_SITE_URL || "https://orderofchange.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: featuredImageUrl ? [featuredImageUrl] : undefined,
    datePublished: article.publishedAt,
    author: author
      ? {
          "@type": "Person",
          name: author.penName,
          url: `${siteUrl}/author/${author.slug}`,
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "The Order of Change",
      url: siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/article/${article.slug}`,
    },
    articleSection: category?.name,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgress />
      <ScrollNav />
      <StickyShareBar title={article.title} />

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          {featuredImageUrl ? (
            <Image
              src={featuredImageUrl}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #0f0f0f 100%)",
              }}
            />
          )}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.7) 40%, rgba(10,10,10,0.3) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 lg:px-12 pb-16">
          {/* Category & Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {category && (
              <Link
                href={`/category/${category.slug}`}
                className="font-mono text-xs uppercase tracking-wider px-3 py-1.5 transition-colors hover:bg-[#b8860b] hover:text-[#0a0a0a]"
                style={{ backgroundColor: "rgba(184,134,11,0.2)", color: "#b8860b" }}
              >
                {category.name}
              </Link>
            )}
            {article.publishedAt && (
              <span className="font-mono text-xs" style={{ color: "#a1a1aa" }}>
                {formatDate(article.publishedAt)}
              </span>
            )}
            <span className="font-mono text-xs" style={{ color: "#a1a1aa" }}>
              •
            </span>
            <span className="font-mono text-xs" style={{ color: "#a1a1aa" }}>
              {estimateReadTime(article.content)}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Subtitle */}
          {article.subtitle && (
            <p className="font-display text-xl lg:text-2xl italic" style={{ color: "#a1a1aa" }}>
              {article.subtitle}
            </p>
          )}
        </div>
      </section>

      {/* Author Bar */}
      <section className="py-8 px-6 lg:px-12" style={{ borderBottom: "1px solid #1c1c1c" }}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {author && (
            <Link
              href={`/author/${author.slug}`}
              className="flex items-center gap-4 group"
            >
              <div
                className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center"
                style={{ border: "2px solid #2a2a2a", backgroundColor: authorImageUrl ? undefined : "rgba(184,134,11,0.15)" }}
              >
                {authorImageUrl ? (
                  <Image
                    src={authorImageUrl}
                    alt={author.penName}
                    width={56}
                    height={56}
                    className="object-cover"
                  />
                ) : (
                  <span className="font-mono text-sm font-bold" style={{ color: "#b8860b" }}>
                    {author.penName.split(" ").map(n => n[0]).join("")}
                  </span>
                )}
              </div>
              <div>
                <p className="font-mono text-sm group-hover:text-[#b8860b] transition-colors">
                  {author.penName}
                </p>
                {author.voiceType && (
                  <p className="font-mono text-xs" style={{ color: "#b8860b" }}>
                    {voiceTypeLabels[author.voiceType] || author.voiceType}
                  </p>
                )}
                {author.publicBio && (
                  <p className="font-mono text-xs" style={{ color: "#52525b" }}>
                    {author.publicBio}
                  </p>
                )}
              </div>
            </Link>
          )}

          <ShareButtons title={article.title} />
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <RichText content={article.content as never} />
        </div>

        {/* Layout Blocks */}
        {article.layout && article.layout.length > 0 && (
          <div className="py-8 px-6 lg:px-12">
            <Blocks blocks={article.layout as never[]} />
          </div>
        )}
      </article>

      {/* Article Footer - Author CTA */}
      {author && (
        <section className="py-16 px-6 lg:px-12" style={{ backgroundColor: "#0f0f0f" }}>
          <div className="max-w-3xl mx-auto">
            <div
              className="flex flex-col md:flex-row items-center gap-8 p-8"
              style={{ border: "1px solid #1c1c1c" }}
            >
              <Link
                href={`/author/${author.slug}`}
                className="flex-shrink-0"
              >
                <div
                  className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center"
                  style={{ border: "3px solid #b8860b", backgroundColor: authorImageUrl ? undefined : "rgba(184,134,11,0.15)" }}
                >
                  {authorImageUrl ? (
                    <Image
                      src={authorImageUrl}
                      alt={author.penName}
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  ) : (
                    <span className="font-mono text-2xl font-bold" style={{ color: "#b8860b" }}>
                      {author.penName.split(" ").map(n => n[0]).join("")}
                    </span>
                  )}
                </div>
              </Link>

              <div className="text-center md:text-left">
                <p
                  className="font-mono text-xs uppercase tracking-wider mb-2"
                  style={{ color: "#b8860b" }}
                >
                  About the Author
                </p>
                <Link href={`/author/${author.slug}`}>
                  <h3 className="font-display text-2xl mb-2 hover:text-[#b8860b] transition-colors">
                    {author.penName}
                  </h3>
                </Link>
                <p className="mb-4" style={{ color: "#a1a1aa" }}>
                  {author.publicBio}
                  {author.publicLocation && ` ${author.publicLocation}.`}
                </p>
                <Link
                  href={`/author/${author.slug}`}
                  className="inline-flex font-mono text-xs uppercase tracking-wider px-4 py-2 transition-all duration-300 hover:bg-[#b8860b] hover:text-[#0a0a0a]"
                  style={{ border: "1px solid #b8860b", color: "#b8860b" }}
                >
                  Read More by {author.penName} →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="py-20 px-6 lg:px-12 relative overflow-hidden">
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
            Don&apos;t Miss the Next Analysis
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

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-20 px-6 lg:px-12" style={{ borderTop: "1px solid #1c1c1c" }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <span
                className="font-mono text-xs uppercase tracking-[0.2em]"
                style={{ color: "#b8860b" }}
              >
                Continue Reading
              </span>
              <div
                className="flex-1 h-px"
                style={{ background: "linear-gradient(to right, #2a2a2a, transparent)" }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((related) => {
                const relatedAuthor =
                  typeof related.author === "object" ? related.author : null;
                const relatedCategory =
                  typeof related.category === "object" ? related.category : null;
                const relatedImageUrl = getImageUrl(related.featuredImage as FeaturedImage);

                return (
                  <Link key={related.id} href={`/article/${related.slug}`} className="group">
                    <article
                      className="relative overflow-hidden"
                      style={{ backgroundColor: "#0f0f0f" }}
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        {relatedImageUrl ? (
                          <Image
                            src={relatedImageUrl}
                            alt={related.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
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
                        {relatedCategory && (
                          <div className="absolute top-4 left-4">
                            <span
                              className="font-mono text-[10px] uppercase tracking-wider px-3 py-1.5"
                              style={{ backgroundColor: "rgba(10,10,10,0.8)", color: "#b8860b" }}
                            >
                              {relatedCategory.name}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-6">
                        <h3 className="font-display text-xl mb-2 group-hover:text-[#b8860b] transition-colors">
                          {related.title}
                        </h3>
                        <p className="text-sm line-clamp-2 mb-4" style={{ color: "#a1a1aa" }}>
                          {related.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          {relatedAuthor && (
                            <span className="font-mono text-xs" style={{ color: "#a1a1aa" }}>
                              {relatedAuthor.penName}
                            </span>
                          )}
                          <span className="font-mono text-xs" style={{ color: "#52525b" }}>
                            {estimateReadTime(related.content)}
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
          </div>
        </section>
      )}

    </>
  );
}
