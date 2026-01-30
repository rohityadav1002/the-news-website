import type { Metadata } from "next";
import "./globals.css";
import { getCategories } from "@/lib/payload";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { getSiteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "The Order of Change | Geopolitical Analysis",
  description: "Analysis for those who see clearly. Independent geopolitical analysis covering power structures, capital flows, and the forces reshaping the global order.",
  metadataBase: new URL(getSiteUrl()),
  openGraph: {
    title: "The Order of Change",
    description: "See the shift. Independent geopolitical analysis.",
    type: "website",
    siteName: "The Order of Change",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Order of Change",
    description: "See the shift. Independent geopolitical analysis.",
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
};

interface Category {
  name: string;
  slug: string;
}

export default async function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = (await getCategories()) as unknown as Category[];

  const siteUrl = getSiteUrl();

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: "The Order of Change",
    url: siteUrl,
    description:
      "Independent geopolitical analysis covering power structures, capital flows, and the forces reshaping the global order.",
    foundingDate: "2026",
  };

  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] text-[#fafaf9] antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-wider"
          style={{ backgroundColor: "#b8860b", color: "#0a0a0a" }}
        >
          Skip to content
        </a>
        <SiteNav categories={categories} />
        <main id="main-content">
          {children}
        </main>
        <SiteFooter categories={categories} />
      </body>
    </html>
  );
}
