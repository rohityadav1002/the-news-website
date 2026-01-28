import Link from "next/link";
import Image from "next/image";

// ═══════════════════════════════════════════════════════════════════════════
// PLACEHOLDER IMAGES - Replace with AI-generated images later
// Using Unsplash for now (free, no API key needed for direct URLs)
// ═══════════════════════════════════════════════════════════════════════════

const images = {
  hero: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80", // Earth from space, digital
  featured: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&q=80", // Abstract financial/data
  articles: [
    "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80", // Mining/resources
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80", // AI/technology
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80", // Markets/trading
    "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80", // Media/narrative
  ],
  authors: [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", // Male portrait 1
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80", // Male portrait 2
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80", // Female portrait
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// MOCK DATA
// ═══════════════════════════════════════════════════════════════════════════

const featuredArticle = {
  slug: "the-new-architecture-of-control",
  title: "The New Architecture of Control",
  subtitle: "How financial infrastructure became the battlefield of the 21st century",
  excerpt: "The old tools of influence—sanctions, tariffs, trade deals—are giving way to something more fundamental. Control the rails on which money moves, and you control the game itself.",
  author: { penName: "V. Rao", slug: "v-rao" },
  category: { name: "Power Structures", slug: "power-structures" },
  publishedAt: "January 27, 2026",
  readTime: "12 min read",
  image: images.featured,
};

const latestArticles = [
  {
    slug: "the-lithium-triangle",
    title: "The Lithium Triangle",
    excerpt: "Argentina, Bolivia, Chile—and the quiet scramble reshaping South American politics.",
    author: { penName: "A. Sterling", slug: "a-sterling" },
    category: { name: "Energy & Resources", slug: "energy-resources" },
    publishedAt: "January 26, 2026",
    readTime: "8 min",
    image: images.articles[0],
  },
  {
    slug: "who-writes-the-algorithm",
    title: "Who Writes the Algorithm?",
    excerpt: "AI governance is the new frontier of geopolitical competition. The question is no longer if, but who.",
    author: { penName: "M. Chen", slug: "m-chen" },
    category: { name: "Technology & Control", slug: "technology-control" },
    publishedAt: "January 25, 2026",
    readTime: "10 min",
    image: images.articles[1],
  },
  {
    slug: "the-dollar-paradox",
    title: "The Dollar Paradox",
    excerpt: "Everyone wants to de-dollarize. No one wants to go first. Understanding the trap.",
    author: { penName: "V. Rao", slug: "v-rao" },
    category: { name: "Capital & Markets", slug: "capital-markets" },
    publishedAt: "January 24, 2026",
    readTime: "14 min",
    image: images.articles[2],
  },
  {
    slug: "manufacturing-consent-2026",
    title: "Manufacturing Consent, 2026 Edition",
    excerpt: "Chomsky's framework updated for an age of algorithmic amplification and synthetic voices.",
    author: { penName: "M. Chen", slug: "m-chen" },
    category: { name: "The Narrative", slug: "the-narrative" },
    publishedAt: "January 23, 2026",
    readTime: "11 min",
    image: images.articles[3],
  },
];

const authors = [
  {
    penName: "V. Rao",
    slug: "v-rao",
    publicBio: "Independent analyst covering global power structures.",
    publicLocation: "Based in Asia",
    voiceType: "Critical Voice",
    image: images.authors[0],
  },
  {
    penName: "A. Sterling",
    slug: "a-sterling",
    publicBio: "Strategic analyst and market observer.",
    publicLocation: "Based in the Gulf",
    voiceType: "Pragmatic Voice",
    image: images.authors[1],
  },
  {
    penName: "M. Chen",
    slug: "m-chen",
    publicBio: "Former international correspondent on geopolitics.",
    publicLocation: "Based in Europe",
    voiceType: "Neutral Synthesizer",
    image: images.authors[2],
  },
];

const categories = [
  { name: "Geopolitics", slug: "geopolitics" },
  { name: "Capital & Markets", slug: "capital-markets" },
  { name: "Power Structures", slug: "power-structures" },
  { name: "Energy & Resources", slug: "energy-resources" },
  { name: "Technology & Control", slug: "technology-control" },
  { name: "The Narrative", slug: "the-narrative" },
];

// ═══════════════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════════════

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0a', color: '#fafaf9' }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: 'rgba(10,10,10,0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
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

            <div className="hidden lg:flex items-center gap-8">
              {categories.slice(0, 4).map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="font-mono text-xs uppercase tracking-wider hover:text-[#b8860b] transition-colors"
                  style={{ color: '#a1a1aa' }}
                >
                  {cat.name}
                </Link>
              ))}
            </div>

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

      {/* Hero Section - Full Visual Impact */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={images.hero}
            alt="Global perspective"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient overlays for depth */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.7) 50%, rgba(10,10,10,1) 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, transparent 0%, rgba(10,10,10,0.5) 100%)' }} />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <p className="font-mono text-sm uppercase tracking-[0.3em] mb-8" style={{ color: '#b8860b' }}>
            Geopolitical Analysis
          </p>

          <h1 className="font-display text-6xl sm:text-7xl lg:text-9xl font-normal tracking-tight mb-8">
            <span className="italic">The Order</span>
            <br />
            <span style={{ color: '#b8860b' }}>of Change</span>
          </h1>

          <p className="font-display text-xl sm:text-2xl italic mb-12 max-w-2xl mx-auto" style={{ color: 'rgba(250,250,249,0.8)' }}>
            See beyond the headlines. Understand the forces reshaping the global order.
          </p>

          <Link
            href="#featured"
            className="inline-flex items-center gap-3 font-mono text-sm uppercase tracking-wider px-8 py-4 transition-all duration-300 hover:bg-[#b8860b] hover:text-[#0a0a0a]"
            style={{ border: '1px solid #b8860b', color: '#b8860b' }}
          >
            <span>Explore Analysis</span>
            <span>↓</span>
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-12" style={{ background: 'linear-gradient(to bottom, #b8860b, transparent)' }} />
        </div>
      </section>

      {/* Featured Article - Large Visual */}
      <section id="featured" className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: '#b8860b' }}>
              Featured Analysis
            </span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, #2a2a2a, transparent)' }} />
          </div>

          <Link href={`/article/${featuredArticle.slug}`} className="block group">
            <article className="relative overflow-hidden" style={{ backgroundColor: '#0f0f0f' }}>
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image Side */}
                <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[600px] overflow-hidden">
                  <Image
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 0%, rgba(15,15,15,0.3) 100%)' }} />
                </div>

                {/* Content Side */}
                <div className="p-8 lg:p-16 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <span className="font-mono text-xs uppercase tracking-wider px-3 py-1" style={{ backgroundColor: 'rgba(184,134,11,0.2)', color: '#b8860b' }}>
                      {featuredArticle.category.name}
                    </span>
                    <span className="font-mono text-xs" style={{ color: '#52525b' }}>
                      {featuredArticle.readTime}
                    </span>
                  </div>

                  <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl mb-6 group-hover:text-[#b8860b] transition-colors duration-300">
                    {featuredArticle.title}
                  </h2>

                  <p className="font-display text-lg italic mb-6" style={{ color: '#a1a1aa' }}>
                    {featuredArticle.subtitle}
                  </p>

                  <p className="mb-8 leading-relaxed" style={{ color: '#a1a1aa' }}>
                    {featuredArticle.excerpt}
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden" style={{ border: '2px solid #2a2a2a' }}>
                      <Image
                        src={images.authors[0]}
                        alt={featuredArticle.author.penName}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-mono text-sm">{featuredArticle.author.penName}</p>
                      <p className="font-mono text-xs" style={{ color: '#52525b' }}>{featuredArticle.publishedAt}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover border effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ border: '1px solid #b8860b' }} />
            </article>
          </Link>
        </div>
      </section>

      {/* Latest Articles - Visual Grid */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: '#b8860b' }}>
              Latest Analysis
            </span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, #2a2a2a, transparent)' }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {latestArticles.map((article, index) => (
              <Link key={article.slug} href={`/article/${article.slug}`} className="block group">
                <article className="relative overflow-hidden h-full" style={{ backgroundColor: '#0f0f0f' }}>
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(15,15,15,1) 0%, rgba(15,15,15,0.3) 50%, transparent 100%)' }} />

                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <span className="font-mono text-[10px] uppercase tracking-wider px-3 py-1.5" style={{ backgroundColor: 'rgba(10,10,10,0.8)', color: '#b8860b', backdropFilter: 'blur(4px)' }}>
                        {article.category.name}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-display text-2xl mb-3 group-hover:text-[#b8860b] transition-colors duration-300">
                      {article.title}
                    </h3>

                    <p className="mb-6 leading-relaxed line-clamp-2" style={{ color: '#a1a1aa' }}>
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid #1c1c1c' }}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <Image
                            src={images.authors[index % 3]}
                            alt={article.author.penName}
                            width={32}
                            height={32}
                            className="object-cover"
                          />
                        </div>
                        <span className="font-mono text-xs" style={{ color: '#a1a1aa' }}>
                          {article.author.penName}
                        </span>
                      </div>
                      <span className="font-mono text-xs" style={{ color: '#52525b' }}>
                        {article.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Hover border */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ border: '1px solid #b8860b' }} />
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Authors Section - Visual */}
      <section className="py-24 px-6 lg:px-12" style={{ backgroundColor: '#0f0f0f' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-mono text-xs uppercase tracking-[0.3em] block mb-4" style={{ color: '#b8860b' }}>
              The Voices Behind the Analysis
            </span>
            <h2 className="font-display text-4xl lg:text-5xl">Our Columnists</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {authors.map((author) => (
              <Link key={author.slug} href={`/author/${author.slug}`} className="group">
                <article className="text-center">
                  {/* Author Image */}
                  <div className="relative w-40 h-40 mx-auto mb-8 rounded-full overflow-hidden" style={{ border: '3px solid #2a2a2a' }}>
                    <Image
                      src={author.image}
                      alt={author.penName}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: 'rgba(184,134,11,0.2)' }} />
                  </div>

                  <h3 className="font-display text-2xl mb-2 group-hover:text-[#b8860b] transition-colors duration-300">
                    {author.penName}
                  </h3>

                  <p className="font-mono text-xs uppercase tracking-wider mb-4" style={{ color: '#b8860b' }}>
                    {author.voiceType}
                  </p>

                  <p className="text-sm mb-3 max-w-xs mx-auto" style={{ color: '#a1a1aa' }}>
                    {author.publicBio}
                  </p>

                  <p className="font-mono text-xs uppercase tracking-wider" style={{ color: '#52525b' }}>
                    {author.publicLocation}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: '#b8860b' }}>
              Explore Topics
            </span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, #2a2a2a, transparent)' }} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="group relative overflow-hidden p-8 text-center transition-all duration-300"
                style={{ backgroundColor: '#0f0f0f', border: '1px solid #1c1c1c' }}
              >
                <h3 className="font-display text-lg lg:text-xl group-hover:text-[#b8860b] transition-colors duration-300">
                  {category.name}
                </h3>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ border: '1px solid #b8860b' }} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-32 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(184,134,11,0.1) 0%, transparent 70%)' }} />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <span className="font-mono text-xs uppercase tracking-[0.3em] block mb-6" style={{ color: '#b8860b' }}>
            Stay Informed
          </span>
          <h2 className="font-display text-4xl lg:text-5xl mb-6">
            See the shift before it happens
          </h2>
          <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: '#a1a1aa' }}>
            Join readers who want to understand the forces reshaping geopolitics, markets, and power.
          </p>
          <Link
            href="/subscribe"
            className="inline-flex items-center gap-3 font-mono text-sm uppercase tracking-wider px-10 py-5 transition-all duration-300 bg-[#b8860b] text-[#0a0a0a] hover:bg-[#d4a00a]"
          >
            <span>Subscribe Now</span>
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 lg:px-12" style={{ borderTop: '1px solid #1c1c1c' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 flex items-center justify-center" style={{ border: '1px solid #b8860b' }}>
                  <span className="font-mono text-sm font-bold" style={{ color: '#b8860b' }}>OC</span>
                </div>
                <span className="font-display text-xl">The Order of Change</span>
              </Link>
              <p className="max-w-sm" style={{ color: '#a1a1aa' }}>
                Independent geopolitical analysis for those who want to understand the forces reshaping our world.
              </p>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider mb-6" style={{ color: '#b8860b' }}>Topics</h4>
              <ul className="space-y-3">
                {categories.slice(0, 4).map((cat) => (
                  <li key={cat.slug}>
                    <Link href={`/category/${cat.slug}`} className="text-sm hover:text-[#b8860b] transition-colors" style={{ color: '#a1a1aa' }}>
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider mb-6" style={{ color: '#b8860b' }}>Company</h4>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-sm hover:text-[#b8860b] transition-colors" style={{ color: '#a1a1aa' }}>About</Link></li>
                <li><Link href="/subscribe" className="text-sm hover:text-[#b8860b] transition-colors" style={{ color: '#a1a1aa' }}>Subscribe</Link></li>
                <li><Link href="/contact" className="text-sm hover:text-[#b8860b] transition-colors" style={{ color: '#a1a1aa' }}>Contact</Link></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: '1px solid #1c1c1c' }}>
            <p className="font-mono text-xs" style={{ color: '#52525b' }}>
              © 2026 The Order of Change. All rights reserved.
            </p>
            <p className="font-mono text-xs italic" style={{ color: '#52525b' }}>
              See the shift.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
