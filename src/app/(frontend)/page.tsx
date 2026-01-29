import { Metadata } from "next";
import { getPublishedArticles, getAuthors, getCategories } from "@/lib/payload";
import { HomeClient } from "@/components/HomeClient";
import type { HomeArticle, HomeAuthor, HomeCategory } from "@/components/HomeClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "The Order of Change | Geopolitical Analysis",
  description:
    "See beyond the headlines. Understand the forces reshaping the global order. Independent geopolitical analysis covering power structures, capital markets, energy, and technology.",
};

function formatVoiceType(voiceType?: string): string {
  switch (voiceType) {
    case "critical":
      return "Critical Voice";
    case "pragmatic":
      return "Pragmatic Voice";
    case "neutral":
      return "Neutral Synthesizer";
    default:
      return voiceType || "";
  }
}

export default async function Home() {
  const [articles, authors, categories] = await Promise.all([
    getPublishedArticles(10),
    getAuthors(),
    getCategories(),
  ]);

  const homeArticles: HomeArticle[] = articles.map((article) => {
    const author =
      typeof article.author === "object" && article.author
        ? article.author
        : null;
    const category =
      typeof article.category === "object" && article.category
        ? article.category
        : null;
    const image =
      typeof article.featuredImage === "object" && article.featuredImage
        ? article.featuredImage
        : null;

    return {
      slug: article.slug as string,
      title: article.title as string,
      subtitle: (article.subtitle as string) || undefined,
      excerpt: article.excerpt as string,
      publishedAt: (article.publishedAt as string) || undefined,
      author: {
        penName: (author?.penName as string) || "Unknown",
        slug: (author?.slug as string) || "",
        avatar:
          typeof author?.avatar === "object" && author?.avatar
            ? (author.avatar.url as string)
            : undefined,
      },
      category: {
        name: (category?.name as string) || "Uncategorized",
        slug: (category?.slug as string) || "",
      },
      image: image?.url as string | undefined,
      imageAlt: (image?.alt as string) || undefined,
    };
  });

  const homeAuthors: HomeAuthor[] = authors.map((author) => ({
    penName: author.penName as string,
    slug: author.slug as string,
    publicBio: (author.publicBio as string) || undefined,
    publicLocation: (author.publicLocation as string) || undefined,
    voiceType: formatVoiceType(author.voiceType as string),
    avatar:
      typeof author.avatar === "object" && author.avatar
        ? (author.avatar.url as string)
        : undefined,
  }));

  const homeCategories: HomeCategory[] = categories.map((cat) => ({
    name: cat.name as string,
    slug: cat.slug as string,
  }));

  return (
    <HomeClient
      articles={homeArticles}
      authors={homeAuthors}
      categories={homeCategories}
    />
  );
}
