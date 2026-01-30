import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getArticlesByTag } from "@/lib/payload";
import { formatDate, getImageUrl, type FeaturedImage } from "@/lib/utils";

export const dynamic = "force-dynamic";

interface Author {
  penName: string;
  slug: string;
}

interface Category {
  name: string;
  slug: string;
}

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: unknown;
  featuredImage?: FeaturedImage | string;
  author: Author | string;
  category: Category | string;
  publishedAt?: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tag = decodeURIComponent(slug);
  return {
    title: `${tag} | The Order of Change`,
    description: `Articles tagged with "${tag}" on The Order of Change.`,
    openGraph: {
      title: `${tag} | The Order of Change`,
      description: `Articles tagged with "${tag}".`,
      type: "website",
    },
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tag = decodeURIComponent(slug);
  const articles = (await getArticlesByTag(tag)) as Article[];

  if (articles.length === 0) {
    notFound();
  }

  return (
    <>
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
            Tag
          </p>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl mb-4">
            {tag}
          </h1>
          <p className="font-mono text-sm" style={{ color: "#a1a1aa" }}>
            {articles.length} article{articles.length !== 1 ? "s" : ""}
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

      {/* Articles */}
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => {
              const author =
                typeof article.author === "object" ? article.author : null;
              const category =
                typeof article.category === "object" ? article.category : null;
              const imageUrl = getImageUrl(article.featuredImage as FeaturedImage);

              return (
                <Link
                  key={article.id}
                  href={`/article/${article.slug}`}
                  className="group"
                >
                  <article
                    className="relative overflow-hidden"
                    style={{ backgroundColor: "#0f0f0f" }}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div
                          className="absolute inset-0 flex items-center justify-center"
                          style={{
                            background:
                              "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #0f0f0f 100%)",
                          }}
                        >
                          <div
                            className="w-12 h-12 flex items-center justify-center"
                            style={{ border: "1px solid #2a2a2a" }}
                          >
                            <span
                              className="font-mono text-xs"
                              style={{ color: "#2a2a2a" }}
                            >
                              OC
                            </span>
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
                      {category && (
                        <div className="absolute top-4 left-4">
                          <span
                            className="font-mono text-[10px] uppercase tracking-wider px-3 py-1.5"
                            style={{
                              backgroundColor: "rgba(10,10,10,0.8)",
                              color: "#b8860b",
                            }}
                          >
                            {category.name}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <h3 className="font-display text-xl mb-2 group-hover:text-[#b8860b] transition-colors">
                        {article.title}
                      </h3>
                      <p
                        className="text-sm line-clamp-2 mb-4"
                        style={{ color: "#a1a1aa" }}
                      >
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        {author && (
                          <span
                            className="font-mono text-xs"
                            style={{ color: "#a1a1aa" }}
                          >
                            {author.penName}
                          </span>
                        )}
                        {article.publishedAt && (
                          <span
                            className="font-mono text-xs"
                            style={{ color: "#52525b" }}
                          >
                            {formatDate(article.publishedAt)}
                          </span>
                        )}
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
    </>
  );
}
