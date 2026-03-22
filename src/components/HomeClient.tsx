"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { formatDate } from "@/lib/utils";

// ═══════════════════════════════════════════════════════════════════════════
// TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════

export interface HomeArticle {
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  publishedAt?: string;
  author: {
    penName: string;
    slug: string;
    avatar?: string;
  };
  category: {
    name: string;
    slug: string;
  };
  image?: string;
  imageAlt?: string;
}

export interface HomeAuthor {
  penName: string;
  slug: string;
  publicBio?: string;
  publicLocation?: string;
  voiceType?: string;
  avatar?: string;
}

export interface HomeCategory {
  name: string;
  slug: string;
}

interface HomeClientProps {
  articles: HomeArticle[];
  authors: HomeAuthor[];
  categories: HomeCategory[];
}

// ═══════════════════════════════════════════════════════════════════════════
// EDITORIAL CONTENT (not from DB)
// ═══════════════════════════════════════════════════════════════════════════

const heroImage = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80";
const globeImage = "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=1200&q=80";


const editorialQuotes = [
  {
    text: "The real story is never in the headlines. It's in the footnotes of the deals no one reports.",
    author: "V. Rao",
  },
  {
    text: "Markets don't lie. They just speak a language most people refuse to learn.",
    author: "A. Sterling",
  },
  {
    text: "The best analysis doesn't tell you what to think. It gives you the tools to see clearly.",
    author: "M. Chen",
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════
// ANIMATION HOOKS
// ═══════════════════════════════════════════════════════════════════════════

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

// ═══════════════════════════════════════════════════════════════════════════
// ANIMATION COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isInView } = useInView(0.1);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}


function ArticleImage({ src, alt, fill = true, className = "" }: { src?: string; alt?: string; fill?: boolean; className?: string }) {
  if (!src) {
    return (
      <div
        className={`absolute inset-0 ${className}`}
        style={{
          background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #0f0f0f 100%)",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 flex items-center justify-center" style={{ border: "1px solid #2a2a2a" }}>
            <span className="font-mono text-sm" style={{ color: "#2a2a2a" }}>OC</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt || ""}
      fill={fill}
      className={`object-cover ${className}`}
    />
  );
}

function AuthorAvatar({ src, name, size = 48 }: { src?: string; name: string; size?: number }) {
  if (!src) {
    const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2);
    return (
      <div
        className="rounded-full flex items-center justify-center"
        style={{
          width: size,
          height: size,
          backgroundColor: "rgba(184,134,11,0.15)",
          border: "2px solid #2a2a2a",
        }}
      >
        <span className="font-mono text-xs font-bold" style={{ color: "#b8860b" }}>{initials}</span>
      </div>
    );
  }

  return (
    <div className="rounded-full overflow-hidden" style={{ width: size, height: size, border: "2px solid #2a2a2a" }}>
      <Image src={src} alt={name} width={size} height={size} className="object-cover" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function HomeClient({ articles, authors, categories }: HomeClientProps) {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % editorialQuotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const featuredArticle = articles[0] || null;
  const latestArticles = articles.slice(1);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt="Global perspective"
            fill
            className="object-cover"
            priority
            style={{ animation: "slowZoom 20s ease-in-out infinite alternate" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.7) 50%, rgba(10,10,10,1) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(circle at center, transparent 0%, rgba(10,10,10,0.5) 100%)" }} />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[
            { left: "10%", top: "20%", duration: 8, delay: 0 },
            { left: "25%", top: "45%", duration: 12, delay: 1 },
            { left: "40%", top: "15%", duration: 10, delay: 2 },
            { left: "55%", top: "60%", duration: 7, delay: 0.5 },
            { left: "70%", top: "30%", duration: 14, delay: 3 },
            { left: "85%", top: "50%", duration: 9, delay: 1.5 },
            { left: "15%", top: "70%", duration: 11, delay: 2.5 },
            { left: "35%", top: "85%", duration: 13, delay: 4 },
            { left: "60%", top: "10%", duration: 6, delay: 0.8 },
            { left: "80%", top: "75%", duration: 15, delay: 3.5 },
          ].map((particle, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                backgroundColor: "rgba(184,134,11,0.3)",
                left: particle.left,
                top: particle.top,
                animation: `float ${particle.duration}s ease-in-out infinite`,
                animationDelay: `${particle.delay}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <p
            className="font-mono text-sm uppercase tracking-[0.3em] mb-8"
            style={{ color: "#b8860b", animation: "fadeInUp 1s ease forwards", animationDelay: "0.2s", opacity: 0 }}
          >
            Geopolitical Analysis
          </p>

          <h1
            className="font-display text-6xl sm:text-7xl lg:text-9xl font-normal tracking-tight mb-8"
            style={{ animation: "fadeInUp 1s ease forwards", animationDelay: "0.4s", opacity: 0 }}
          >
            <span className="italic">The Order</span>
            <br />
            <span style={{ color: "#b8860b" }}>of Change</span>
          </h1>

          <p
            className="font-display text-xl sm:text-2xl italic mb-12 max-w-2xl mx-auto"
            style={{ color: "rgba(250,250,249,0.8)", animation: "fadeInUp 1s ease forwards", animationDelay: "0.6s", opacity: 0 }}
          >
            See beyond the headlines. Understand the forces reshaping the global order.
          </p>

          <Link
            href="#featured"
            className="inline-flex items-center gap-3 font-mono text-sm uppercase tracking-wider px-8 py-4 transition-all duration-300 hover:bg-[#b8860b] hover:text-[#0a0a0a]"
            style={{ border: "1px solid #b8860b", color: "#b8860b", animation: "fadeInUp 1s ease forwards", animationDelay: "0.8s", opacity: 0 }}
          >
            <span>Explore Analysis</span>
            <span className="animate-bounce">↓</span>
          </Link>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-12" style={{ background: "linear-gradient(to bottom, #b8860b, transparent)", animation: "pulse 2s ease-in-out infinite" }} />
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section id="featured" className="py-24 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection>
              <div className="flex items-center gap-4 mb-12">
                <span className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: "#b8860b" }}>
                  Featured Analysis
                </span>
                <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, #2a2a2a, transparent)" }} />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <Link href={`/article/${featuredArticle.slug}`} className="block group">
                <article className="relative overflow-hidden" style={{ backgroundColor: "#0f0f0f" }}>
                  <div className="grid lg:grid-cols-2 gap-0">
                    <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[600px] overflow-hidden">
                      <ArticleImage
                        src={featuredArticle.image}
                        alt={featuredArticle.imageAlt || featuredArticle.title}
                        className="transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 0%, rgba(15,15,15,0.3) 100%)" }} />
                    </div>

                    <div className="p-8 lg:p-16 flex flex-col justify-center">
                      <div className="flex flex-wrap items-center gap-4 mb-6">
                        <span className="font-mono text-xs uppercase tracking-wider px-3 py-1" style={{ backgroundColor: "rgba(184,134,11,0.2)", color: "#b8860b" }}>
                          {featuredArticle.category.name}
                        </span>
                      </div>

                      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl mb-6 group-hover:text-[#b8860b] transition-colors duration-300">
                        {featuredArticle.title}
                      </h2>

                      {featuredArticle.subtitle && (
                        <p className="font-display text-lg italic mb-6" style={{ color: "#a1a1aa" }}>
                          {featuredArticle.subtitle}
                        </p>
                      )}

                      <p className="mb-8 leading-relaxed" style={{ color: "#a1a1aa" }}>
                        {featuredArticle.excerpt}
                      </p>

                      <div className="flex items-center gap-4">
                        <AuthorAvatar src={featuredArticle.author.avatar} name={featuredArticle.author.penName} />
                        <div>
                          <p className="font-mono text-sm">{featuredArticle.author.penName}</p>
                          <p className="font-mono text-xs" style={{ color: "#52525b" }}>{formatDate(featuredArticle.publishedAt)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ border: "1px solid #b8860b" }} />
                </article>
              </Link>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Quote Section */}
      <section className="py-24 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(184,134,11,0.03) 0%, transparent 50%, rgba(184,134,11,0.03) 100%)" }} />

        <div className="absolute top-1/2 left-0 w-32 h-px" style={{ background: "linear-gradient(to right, transparent, #b8860b)", transform: "translateY(-50%)" }} />
        <div className="absolute top-1/2 right-0 w-32 h-px" style={{ background: "linear-gradient(to left, transparent, #b8860b)", transform: "translateY(-50%)" }} />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="relative h-48 flex items-center justify-center">
            {editorialQuotes.map((quote, index) => (
              <div
                key={index}
                className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-700"
                style={{
                  opacity: currentQuote === index ? 1 : 0,
                  transform: currentQuote === index ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
                }}
              >
                <p className="font-display text-2xl lg:text-3xl italic mb-6 px-8" style={{ color: "#fafaf9" }}>
                  &ldquo;{quote.text}&rdquo;
                </p>
                <p className="font-mono text-sm uppercase tracking-wider" style={{ color: "#b8860b" }}>
                  {quote.author}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 mt-8">
            {editorialQuotes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuote(index)}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: currentQuote === index ? "#b8860b" : "#2a2a2a",
                  transform: currentQuote === index ? "scale(1.5)" : "scale(1)",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      {latestArticles.length > 0 && (
        <section className="py-24 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection>
              <div className="flex items-center gap-4 mb-12">
                <span className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: "#b8860b" }}>
                  Latest Analysis
                </span>
                <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, #2a2a2a, transparent)" }} />
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {latestArticles.map((article, index) => (
                <AnimatedSection key={article.slug} delay={index * 150} className="flex">
                  <Link href={`/article/${article.slug}`} className="block group flex-1">
                    <article className="relative overflow-hidden h-full flex flex-col" style={{ backgroundColor: "#0f0f0f" }}>
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <ArticleImage
                          src={article.image}
                          alt={article.imageAlt || article.title}
                          className="transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,15,15,1) 0%, rgba(15,15,15,0.3) 50%, transparent 100%)" }} />
                        <div className="absolute top-4 left-4">
                          <span className="font-mono text-[10px] uppercase tracking-wider px-3 py-1.5" style={{ backgroundColor: "rgba(10,10,10,0.8)", color: "#b8860b", backdropFilter: "blur(4px)" }}>
                            {article.category.name}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="font-display text-2xl mb-3 group-hover:text-[#b8860b] transition-colors duration-300">
                          {article.title}
                        </h3>
                        <p className="mb-6 leading-relaxed line-clamp-2" style={{ color: "#a1a1aa" }}>
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between pt-4 mt-auto" style={{ borderTop: "1px solid #1c1c1c" }}>
                          <div className="flex items-center gap-3">
                            <AuthorAvatar src={article.author.avatar} name={article.author.penName} size={32} />
                            <span className="font-mono text-xs" style={{ color: "#a1a1aa" }}>{article.author.penName}</span>
                          </div>
                          <span className="font-mono text-xs" style={{ color: "#52525b" }}>{formatDate(article.publishedAt)}</span>
                        </div>
                      </div>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ border: "1px solid #b8860b" }} />
                    </article>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Global Perspective Section */}
      <section className="py-24 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={globeImage}
            alt="Global perspective"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0" style={{ background: "radial-gradient(circle at center, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.95) 100%)" }} />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <span className="font-mono text-xs uppercase tracking-[0.3em] block mb-6" style={{ color: "#b8860b" }}>
                Global Coverage
              </span>
              <h2 className="font-display text-4xl lg:text-5xl mb-6">
                Analysis Without Borders
              </h2>
              <p className="text-lg leading-relaxed mb-8" style={{ color: "#a1a1aa" }}>
                Our analysts are positioned across Asia, the Gulf, and Europe, giving you perspectives that Western media often misses. We follow the money, question the narratives, and connect the dots across regions.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {["Asia-Pacific", "Middle East", "Europe", "Americas", "Africa"].map((region) => (
                  <span key={region} className="font-mono text-xs uppercase tracking-wider px-4 py-2" style={{ backgroundColor: "rgba(184,134,11,0.1)", color: "#b8860b", border: "1px solid rgba(184,134,11,0.3)" }}>
                    {region}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Authors Section */}
      {authors.length > 0 && (
        <section className="py-24 px-6 lg:px-12" style={{ backgroundColor: "#0f0f0f" }}>
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-16">
                <span className="font-mono text-xs uppercase tracking-[0.3em] block mb-4" style={{ color: "#b8860b" }}>
                  The Voices Behind the Analysis
                </span>
                <h2 className="font-display text-4xl lg:text-5xl">Our Columnists</h2>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {authors.map((author, index) => (
                <AnimatedSection key={author.slug} delay={index * 150} className="flex">
                  <Link href={`/author/${author.slug}`} className="group flex-1">
                    <article className="text-center h-full flex flex-col items-center">
                      <div className="relative w-40 h-40 mx-auto mb-8 rounded-full overflow-hidden flex items-center justify-center" style={{ border: "3px solid #2a2a2a" }}>
                        {author.avatar ? (
                          <>
                            <Image
                              src={author.avatar}
                              alt={author.penName}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: "rgba(184,134,11,0.2)" }} />
                          </>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: "rgba(184,134,11,0.1)" }}>
                            <span className="font-mono text-3xl font-bold" style={{ color: "#b8860b" }}>
                              {author.penName.split(" ").map(n => n[0]).join("")}
                            </span>
                          </div>
                        )}
                      </div>

                      <h3 className="font-display text-2xl mb-2 group-hover:text-[#b8860b] transition-colors duration-300">
                        {author.penName}
                      </h3>
                      {author.voiceType && (
                        <p className="font-mono text-xs uppercase tracking-wider mb-4" style={{ color: "#b8860b" }}>
                          {author.voiceType}
                        </p>
                      )}
                      {author.publicBio && (
                        <p className="text-sm mb-3 max-w-xs mx-auto line-clamp-3" style={{ color: "#a1a1aa" }}>
                          {author.publicBio}
                        </p>
                      )}
                      {author.publicLocation && (
                        <p className="font-mono text-xs uppercase tracking-wider mt-auto" style={{ color: "#52525b" }}>
                          {author.publicLocation}
                        </p>
                      )}
                    </article>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="py-32 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(184,134,11,0.15) 0%, transparent 70%)" }} />

        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px w-full"
              style={{
                top: `${20 + i * 15}%`,
                background: "linear-gradient(90deg, transparent, rgba(184,134,11,0.1), transparent)",
                animation: `slideRight ${8 + i * 2}s linear infinite`,
              }}
            />
          ))}
        </div>

        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <span className="font-mono text-xs uppercase tracking-[0.3em] block mb-6" style={{ color: "#b8860b" }}>
              Stay Informed
            </span>
            <h2 className="font-display text-4xl lg:text-5xl mb-6">
              See the shift before it happens
            </h2>
            <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: "#a1a1aa" }}>
              Join readers who want to understand the forces reshaping geopolitics, markets, and power.
            </p>
            <Link
              href="/subscribe"
              className="inline-flex items-center gap-3 font-mono text-sm uppercase tracking-wider px-10 py-5 transition-all duration-300 bg-[#b8860b] text-[#0a0a0a] hover:bg-[#d4a00a] hover:scale-105"
            >
              <span>Subscribe Now</span>
              <span>→</span>
            </Link>
          </div>
        </AnimatedSection>
      </section>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slowZoom {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.6;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.2);
          }
        }

        @keyframes slideRight {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(100%);
          }
        }
      `}</style>
    </>
  );
}
