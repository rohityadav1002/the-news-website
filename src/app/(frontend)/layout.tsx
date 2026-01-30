import type { Metadata } from "next";
import "./globals.css";
import { getCategories } from "@/lib/payload";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "The Order of Change | Geopolitical Analysis",
  description: "Analysis for those who see clearly. Independent geopolitical analysis covering power structures, capital flows, and the forces reshaping the global order.",
  openGraph: {
    title: "The Order of Change",
    description: "See the shift. Independent geopolitical analysis.",
    type: "website",
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

  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] text-[#fafaf9] antialiased">
        <SiteNav categories={categories} />
        {children}
        <SiteFooter categories={categories} />
      </body>
    </html>
  );
}
