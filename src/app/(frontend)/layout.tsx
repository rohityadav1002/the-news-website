import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Order of Change | Geopolitical Analysis",
  description: "Analysis for those who see clearly. Independent geopolitical analysis covering power structures, capital flows, and the forces reshaping the global order.",
  openGraph: {
    title: "The Order of Change",
    description: "See the shift. Independent geopolitical analysis.",
    type: "website",
  },
};

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] text-[#fafaf9] antialiased">
        {children}
      </body>
    </html>
  );
}
