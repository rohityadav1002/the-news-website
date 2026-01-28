"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

// ═══════════════════════════════════════════════════════════════════════════
// MOCK DATA - Will be replaced with CMS data
// ═══════════════════════════════════════════════════════════════════════════

const article = {
  slug: "the-new-architecture-of-control",
  title: "The New Architecture of Control",
  subtitle: "How financial infrastructure became the battlefield of the 21st century",
  excerpt: "The old tools of influence—sanctions, tariffs, trade deals—are giving way to something more fundamental. Control the rails on which money moves, and you control the game itself.",
  image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1600&q=80",
  author: {
    penName: "V. Rao",
    slug: "v-rao",
    bio: "Independent analyst covering global power structures. Based in Asia.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    voiceType: "Critical Voice",
  },
  category: { name: "Power Structures", slug: "power-structures" },
  publishedAt: "January 27, 2026",
  readTime: "12 min read",
  content: [
    {
      type: "paragraph",
      text: "In the old world of geopolitics, power was measured in aircraft carriers, nuclear warheads, and barrels of oil. These metrics still matter. But a quieter transformation has occurred beneath the surface—one that will define the next century of international relations.",
    },
    {
      type: "paragraph",
      text: "The battlefield has shifted. Today, the most consequential struggles for dominance are being fought not in the South China Sea or the plains of Eastern Europe, but in the architecture of financial infrastructure itself. SWIFT codes, correspondent banking relationships, payment rails, and settlement systems—these unglamorous technical systems have become the new terrain of great power competition.",
    },
    {
      type: "heading",
      text: "The Weaponization of Finance",
    },
    {
      type: "paragraph",
      text: "When the United States and its allies froze Russia's central bank reserves in February 2022, they crossed a threshold that cannot be uncrossed. For the first time in modern history, a major power saw its accumulated savings—the product of decades of trade surpluses—rendered inaccessible with the stroke of a pen.",
    },
    {
      type: "pullquote",
      text: "The message was received clearly in Beijing, Riyadh, and New Delhi: the rules-based international order has rules that can change overnight.",
      attribution: null,
    },
    {
      type: "paragraph",
      text: "The implications extended far beyond Russia. Every nation with substantial dollar reserves—which is to say, nearly every nation—was forced to reconsider a fundamental assumption about the nature of money itself. Is a dollar held in a correspondent bank account truly yours? Or is it, in the final analysis, a conditional claim that exists only at the pleasure of Washington?",
    },
    {
      type: "paragraph",
      text: "This is not an abstract question. It is reshaping how central banks think about reserve management, how corporations structure their treasury operations, and how entire economies position themselves in the global financial system.",
    },
    {
      type: "heading",
      text: "The Infrastructure Race",
    },
    {
      type: "paragraph",
      text: "The response has been predictable but no less significant. China has accelerated the development of its Cross-Border Interbank Payment System (CIPS). Russia has promoted its System for Transfer of Financial Messages (SPFS). India has pushed its Unified Payments Interface (UPI) as a model for the developing world. Central Bank Digital Currencies are being pursued with new urgency.",
    },
    {
      type: "paragraph",
      text: "These are not merely technical projects. They are attempts to build alternative architectures of financial power—systems that can operate outside the reach of Western sanctions, or at minimum provide bargaining leverage when negotiations turn difficult.",
    },
    {
      type: "pullquote",
      text: "Control the rails on which money moves, and you control the game itself. This is the lesson every major power has now internalized.",
      attribution: null,
    },
    {
      type: "paragraph",
      text: "The United States understands this dynamic perfectly well. The Treasury Department has become, in many ways, more important to American foreign policy than the State Department. The ability to deny adversaries access to the dollar system—and the threat to do so—has become the primary instrument of coercive diplomacy.",
    },
    {
      type: "heading",
      text: "The Limits of Financial Coercion",
    },
    {
      type: "paragraph",
      text: "But every tool has its limits. The more frequently financial weapons are deployed, the stronger the incentive for others to develop alternatives. Each sanctions regime, however justified in isolation, contributes to a broader erosion of dollar centrality.",
    },
    {
      type: "paragraph",
      text: "This is the paradox Washington faces. The very power that makes financial coercion effective also plants the seeds of its own obsolescence. It is a wasting asset, diminished with each use.",
    },
    {
      type: "paragraph",
      text: "The Chinese understand this. Their strategy is not to directly challenge the dollar's dominance—not yet—but to quietly build alternatives that reduce their vulnerability. The Belt and Road Initiative, whatever its mixed record of individual projects, can be understood as an attempt to create economic relationships that operate partially outside the dollar system.",
    },
    {
      type: "heading",
      text: "What Comes Next",
    },
    {
      type: "paragraph",
      text: "We are likely moving toward a world of fragmented financial infrastructure—not the complete displacement of the dollar system, but the emergence of parallel architectures that provide partial insulation from Western financial pressure.",
    },
    {
      type: "paragraph",
      text: "This fragmentation will have costs. Reduced interoperability means higher transaction costs, less efficient capital allocation, and new opportunities for regulatory arbitrage. It may also create new forms of instability as systems designed in isolation interact in unexpected ways.",
    },
    {
      type: "pullquote",
      text: "The question is not whether the old order will persist. It will not. The question is what replaces it, and who will shape the rules of the new architecture.",
      attribution: null,
    },
    {
      type: "paragraph",
      text: "The architects of the post-war financial order—Bretton Woods, the IMF, the World Bank—understood that infrastructure creates path dependencies. Once systems are established, once habits form around them, they become difficult to dislodge. The current generation of policymakers, in Beijing and Washington alike, understands this too.",
    },
    {
      type: "paragraph",
      text: "The race to build the financial infrastructure of the 21st century is underway. It will not be won by the country with the largest military or the biggest economy, but by those who best understand that in a networked world, architecture is power.",
    },
  ],
};

const relatedArticles = [
  {
    slug: "the-dollar-paradox",
    title: "The Dollar Paradox",
    excerpt: "Everyone wants to de-dollarize. No one wants to go first.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    author: { penName: "V. Rao" },
    category: { name: "Capital & Markets" },
    readTime: "14 min",
  },
  {
    slug: "the-lithium-triangle",
    title: "The Lithium Triangle",
    excerpt: "Argentina, Bolivia, Chile—and the quiet scramble reshaping South American politics.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
    author: { penName: "A. Sterling" },
    category: { name: "Energy & Resources" },
    readTime: "8 min",
  },
  {
    slug: "who-writes-the-algorithm",
    title: "Who Writes the Algorithm?",
    excerpt: "AI governance is the new frontier of geopolitical competition.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    author: { penName: "M. Chen" },
    category: { name: "Technology & Control" },
    readTime: "10 min",
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(Math.min(scrollPercent, 100));
    };

    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[60]" style={{ backgroundColor: '#1c1c1c' }}>
      <div
        className="h-full transition-all duration-150"
        style={{ width: `${progress}%`, backgroundColor: '#b8860b' }}
      />
    </div>
  );
}

function ShareButton({ platform, url, title }: { platform: string; url: string; title: string }) {
  const shareUrls: Record<string, string> = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
  };

  const icons: Record<string, string> = {
    twitter: "𝕏",
    linkedin: "in",
    email: "✉",
  };

  return (
    <a
      href={shareUrls[platform]}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 flex items-center justify-center transition-all duration-300 hover:bg-[#b8860b] hover:text-[#0a0a0a]"
      style={{ border: '1px solid #2a2a2a', color: '#a1a1aa' }}
      title={`Share on ${platform}`}
    >
      <span className="text-sm">{icons[platform]}</span>
    </a>
  );
}

function PullQuote({ text }: { text: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="my-16 py-12 px-8 relative"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
        borderLeft: '3px solid #b8860b',
        backgroundColor: 'rgba(184,134,11,0.03)',
      }}
    >
      <p className="font-display text-2xl lg:text-3xl italic leading-relaxed" style={{ color: '#fafaf9' }}>
        &ldquo;{text}&rdquo;
      </p>

      {/* Share quote button */}
      <button
        onClick={() => {
          const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${text}" — ${article.author.penName}, The Order of Change`)}&url=${encodeURIComponent(window.location.href)}`;
          window.open(shareUrl, '_blank');
        }}
        className="mt-6 font-mono text-[10px] uppercase tracking-wider px-4 py-2 transition-all duration-300 hover:bg-[#b8860b] hover:text-[#0a0a0a]"
        style={{ border: '1px solid #2a2a2a', color: '#a1a1aa' }}
      >
        Share Quote →
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════════════

export default function ArticlePage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0a', color: '#fafaf9' }}>
      <ReadingProgress />

      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: isScrolled ? 'rgba(10,10,10,0.95)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.1)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center" style={{ border: '1px solid #b8860b', backgroundColor: 'rgba(184,134,11,0.1)' }}>
                <span className="font-mono text-sm font-bold" style={{ color: '#b8860b' }}>OC</span>
              </div>
              <span className="font-display text-xl tracking-wide hidden sm:block">
                The Order of Change
              </span>
            </Link>

            <Link
              href="/subscribe"
              className="font-mono text-xs uppercase tracking-wider px-5 py-2.5 transition-all duration-300 hover:bg-[#b8860b] hover:text-[#0a0a0a]"
              style={{ border: '1px solid #b8860b', color: '#b8860b' }}
            >
              Subscribe
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.7) 40%, rgba(10,10,10,0.3) 100%)' }} />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 lg:px-12 pb-16">
          {/* Category & Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Link
              href={`/category/${article.category.slug}`}
              className="font-mono text-xs uppercase tracking-wider px-3 py-1.5 transition-colors hover:bg-[#b8860b] hover:text-[#0a0a0a]"
              style={{ backgroundColor: 'rgba(184,134,11,0.2)', color: '#b8860b' }}
            >
              {article.category.name}
            </Link>
            <span className="font-mono text-xs" style={{ color: '#a1a1aa' }}>{article.publishedAt}</span>
            <span className="font-mono text-xs" style={{ color: '#a1a1aa' }}>•</span>
            <span className="font-mono text-xs" style={{ color: '#a1a1aa' }}>{article.readTime}</span>
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Subtitle */}
          <p className="font-display text-xl lg:text-2xl italic" style={{ color: '#a1a1aa' }}>
            {article.subtitle}
          </p>
        </div>
      </section>

      {/* Author Bar */}
      <section className="py-8 px-6 lg:px-12" style={{ borderBottom: '1px solid #1c1c1c' }}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <Link href={`/author/${article.author.slug}`} className="flex items-center gap-4 group">
            <div className="w-14 h-14 rounded-full overflow-hidden" style={{ border: '2px solid #2a2a2a' }}>
              <Image
                src={article.author.image}
                alt={article.author.penName}
                width={56}
                height={56}
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-mono text-sm group-hover:text-[#b8860b] transition-colors">{article.author.penName}</p>
              <p className="font-mono text-xs" style={{ color: '#b8860b' }}>{article.author.voiceType}</p>
              <p className="font-mono text-xs" style={{ color: '#52525b' }}>{article.author.bio}</p>
            </div>
          </Link>

          {/* Share buttons */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-wider mr-2" style={{ color: '#52525b' }}>Share</span>
            <ShareButton platform="twitter" url={shareUrl} title={article.title} />
            <ShareButton platform="linkedin" url={shareUrl} title={article.title} />
            <ShareButton platform="email" url={shareUrl} title={article.title} />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          {article.content.map((block, index) => {
            if (block.type === "paragraph") {
              return (
                <p
                  key={index}
                  className="text-lg leading-[1.9] mb-8"
                  style={{ color: '#d4d4d4' }}
                >
                  {block.text}
                </p>
              );
            }

            if (block.type === "heading") {
              return (
                <h2
                  key={index}
                  className="font-display text-3xl mt-16 mb-8"
                  style={{ color: '#fafaf9' }}
                >
                  {block.text}
                </h2>
              );
            }

            if (block.type === "pullquote") {
              return <PullQuote key={index} text={block.text} />;
            }

            return null;
          })}
        </div>
      </article>

      {/* Article Footer - Author CTA */}
      <section className="py-16 px-6 lg:px-12" style={{ backgroundColor: '#0f0f0f' }}>
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 p-8" style={{ border: '1px solid #1c1c1c' }}>
            <Link href={`/author/${article.author.slug}`} className="flex-shrink-0">
              <div className="w-24 h-24 rounded-full overflow-hidden" style={{ border: '3px solid #b8860b' }}>
                <Image
                  src={article.author.image}
                  alt={article.author.penName}
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>
            </Link>

            <div className="text-center md:text-left">
              <p className="font-mono text-xs uppercase tracking-wider mb-2" style={{ color: '#b8860b' }}>
                About the Author
              </p>
              <Link href={`/author/${article.author.slug}`}>
                <h3 className="font-display text-2xl mb-2 hover:text-[#b8860b] transition-colors">
                  {article.author.penName}
                </h3>
              </Link>
              <p className="mb-4" style={{ color: '#a1a1aa' }}>
                {article.author.bio} Known for sharp analysis of power structures and following the money where others fear to look.
              </p>
              <Link
                href={`/author/${article.author.slug}`}
                className="inline-flex font-mono text-xs uppercase tracking-wider px-4 py-2 transition-all duration-300 hover:bg-[#b8860b] hover:text-[#0a0a0a]"
                style={{ border: '1px solid #b8860b', color: '#b8860b' }}
              >
                Read More by {article.author.penName} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(184,134,11,0.1) 0%, transparent 70%)' }} />

        <div className="max-w-2xl mx-auto text-center relative z-10">
          <span className="font-mono text-xs uppercase tracking-[0.3em] block mb-4" style={{ color: '#b8860b' }}>
            Don&apos;t Miss the Next Analysis
          </span>
          <h2 className="font-display text-3xl lg:text-4xl mb-4">
            See the shift before it happens
          </h2>
          <p className="mb-8" style={{ color: '#a1a1aa' }}>
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
      <section className="py-20 px-6 lg:px-12" style={{ borderTop: '1px solid #1c1c1c' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: '#b8860b' }}>
              Continue Reading
            </span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, #2a2a2a, transparent)' }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArticles.map((related) => (
              <Link key={related.slug} href={`/article/${related.slug}`} className="group">
                <article className="relative overflow-hidden" style={{ backgroundColor: '#0f0f0f' }}>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={related.image}
                      alt={related.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(15,15,15,1) 0%, rgba(15,15,15,0.3) 50%, transparent 100%)' }} />
                    <div className="absolute top-4 left-4">
                      <span className="font-mono text-[10px] uppercase tracking-wider px-3 py-1.5" style={{ backgroundColor: 'rgba(10,10,10,0.8)', color: '#b8860b' }}>
                        {related.category.name}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-display text-xl mb-2 group-hover:text-[#b8860b] transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-sm line-clamp-2 mb-4" style={{ color: '#a1a1aa' }}>
                      {related.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs" style={{ color: '#a1a1aa' }}>{related.author.penName}</span>
                      <span className="font-mono text-xs" style={{ color: '#52525b' }}>{related.readTime}</span>
                    </div>
                  </div>

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ border: '1px solid #b8860b' }} />
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Share Bar (appears on scroll) */}
      <div
        className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2 transition-all duration-300"
        style={{
          opacity: isScrolled ? 1 : 0,
          transform: isScrolled ? 'translateY(-50%)' : 'translateY(-50%) translateX(-20px)',
          pointerEvents: isScrolled ? 'auto' : 'none',
        }}
      >
        <ShareButton platform="twitter" url={shareUrl} title={article.title} />
        <ShareButton platform="linkedin" url={shareUrl} title={article.title} />
        <ShareButton platform="email" url={shareUrl} title={article.title} />
      </div>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-12" style={{ borderTop: '1px solid #1c1c1c' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center" style={{ border: '1px solid #b8860b' }}>
              <span className="font-mono text-xs font-bold" style={{ color: '#b8860b' }}>OC</span>
            </div>
            <span className="font-display text-lg">The Order of Change</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link href="/about" className="font-mono text-xs uppercase tracking-wider hover:text-[#b8860b] transition-colors" style={{ color: '#a1a1aa' }}>
              About
            </Link>
            <Link href="/subscribe" className="font-mono text-xs uppercase tracking-wider hover:text-[#b8860b] transition-colors" style={{ color: '#a1a1aa' }}>
              Subscribe
            </Link>
            <Link href="/contact" className="font-mono text-xs uppercase tracking-wider hover:text-[#b8860b] transition-colors" style={{ color: '#a1a1aa' }}>
              Contact
            </Link>
          </div>

          <p className="font-mono text-xs" style={{ color: '#52525b' }}>
            © 2026 The Order of Change
          </p>
        </div>
      </footer>
    </div>
  );
}
