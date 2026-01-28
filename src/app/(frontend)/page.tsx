import Link from "next/link";

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
  },
  {
    slug: "who-writes-the-algorithm",
    title: "Who Writes the Algorithm?",
    excerpt: "AI governance is the new frontier of geopolitical competition. The question is no longer if, but who.",
    author: { penName: "M. Chen", slug: "m-chen" },
    category: { name: "Technology & Control", slug: "technology-control" },
    publishedAt: "January 25, 2026",
    readTime: "10 min",
  },
  {
    slug: "the-dollar-paradox",
    title: "The Dollar Paradox",
    excerpt: "Everyone wants to de-dollarize. No one wants to go first. Understanding the trap.",
    author: { penName: "V. Rao", slug: "v-rao" },
    category: { name: "Capital & Markets", slug: "capital-markets" },
    publishedAt: "January 24, 2026",
    readTime: "14 min",
  },
  {
    slug: "manufacturing-consent-2026",
    title: "Manufacturing Consent, 2026 Edition",
    excerpt: "Chomsky's framework updated for an age of algorithmic amplification and synthetic voices.",
    author: { penName: "M. Chen", slug: "m-chen" },
    category: { name: "The Narrative", slug: "the-narrative" },
    publishedAt: "January 23, 2026",
    readTime: "11 min",
  },
];

const authors = [
  {
    penName: "V. Rao",
    slug: "v-rao",
    publicBio: "Independent analyst covering global power structures.",
    publicLocation: "Based in Asia",
    voiceType: "Critical Voice",
  },
  {
    penName: "A. Sterling",
    slug: "a-sterling",
    publicBio: "Strategic analyst and market observer.",
    publicLocation: "Based in the Gulf",
    voiceType: "Pragmatic Voice",
  },
  {
    penName: "M. Chen",
    slug: "m-chen",
    publicBio: "Former international correspondent on geopolitics.",
    publicLocation: "Based in Europe",
    voiceType: "Neutral Synthesizer",
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
      {/* Grain overlay */}
      <div className="grain" />

      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm"
        style={{ backgroundColor: 'rgba(10,10,10,0.9)', borderBottom: '1px solid #1c1c1c' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3">
              <div
                className="w-8 h-8 flex items-center justify-center"
                style={{ border: '1px solid #b8860b' }}
              >
                <span className="font-mono text-xs" style={{ color: '#b8860b' }}>OC</span>
              </div>
              <span className="font-display text-lg tracking-wide hidden sm:block">
                The Order of Change
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {categories.slice(0, 4).map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="font-mono text-xs uppercase tracking-exhibition hover-gold"
                  style={{ color: '#a1a1aa' }}
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            <Link
              href="/subscribe"
              className="font-mono text-xs uppercase tracking-exhibition px-4 py-2 transition-colors duration-300 hover:bg-[#b8860b] hover:text-[#0a0a0a]"
              style={{ border: '1px solid #b8860b', color: '#b8860b' }}
            >
              Subscribe
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center pt-20 px-6">
        <div className="text-center">
          <p
            className="font-mono text-xs uppercase tracking-exhibition mb-8"
            style={{ color: '#a1a1aa' }}
          >
            Analysis for those who see clearly
          </p>

          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-normal tracking-tight mb-6">
            <span className="italic">The Order</span>
            <br />
            <span style={{ color: '#b8860b' }}>of Change</span>
          </h1>

          <p
            className="font-display text-xl sm:text-2xl italic mb-16"
            style={{ color: '#a1a1aa' }}
          >
            See the shift.
          </p>

          <div className="flex flex-col items-center">
            <div
              className="w-px h-16 mb-2"
              style={{ background: 'linear-gradient(to bottom, #b8860b, transparent)' }}
            />
            <span
              className="font-mono text-[10px] uppercase tracking-exhibition"
              style={{ color: '#52525b' }}
            >
              Scroll
            </span>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span
              className="font-mono text-[10px] uppercase tracking-exhibition"
              style={{ color: '#b8860b' }}
            >
              Featured Analysis
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: 'linear-gradient(to right, #2a2a2a, transparent)' }}
            />
          </div>

          <Link href={`/article/${featuredArticle.slug}`} className="block group">
            <article
              className="gallery-frame hover-illuminate"
            >
              <div className="gallery-frame-inner p-8 lg:p-12">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span
                    className="font-mono text-[10px] uppercase tracking-exhibition"
                    style={{ color: '#b8860b' }}
                  >
                    {featuredArticle.category.name}
                  </span>
                  <span style={{ color: '#2a2a2a' }}>|</span>
                  <span
                    className="font-mono text-[10px] uppercase tracking-exhibition"
                    style={{ color: '#52525b' }}
                  >
                    {featuredArticle.publishedAt}
                  </span>
                  <span style={{ color: '#2a2a2a' }}>|</span>
                  <span
                    className="font-mono text-[10px] uppercase tracking-exhibition"
                    style={{ color: '#52525b' }}
                  >
                    {featuredArticle.readTime}
                  </span>
                </div>

                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl mb-4 group-hover:text-[#b8860b] transition-colors duration-300">
                  {featuredArticle.title}
                </h2>

                <p
                  className="font-display text-lg italic mb-6"
                  style={{ color: '#a1a1aa' }}
                >
                  {featuredArticle.subtitle}
                </p>

                <p
                  className="max-w-3xl mb-8 leading-relaxed"
                  style={{ color: '#a1a1aa' }}
                >
                  {featuredArticle.excerpt}
                </p>

                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 flex items-center justify-center"
                    style={{ border: '1px solid #2a2a2a' }}
                  >
                    <span className="font-mono text-xs" style={{ color: '#52525b' }}>
                      {featuredArticle.author.penName.charAt(0)}
                    </span>
                  </div>
                  <span className="font-mono text-sm">{featuredArticle.author.penName}</span>
                </div>
              </div>
            </article>
          </Link>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span
              className="font-mono text-[10px] uppercase tracking-exhibition"
              style={{ color: '#b8860b' }}
            >
              Latest
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: 'linear-gradient(to right, #2a2a2a, transparent)' }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {latestArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/article/${article.slug}`}
                className="block group"
              >
                <article className="gallery-frame hover-illuminate h-full">
                  <div className="gallery-frame-inner p-6 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="font-mono text-[10px] uppercase tracking-exhibition"
                        style={{ color: '#b8860b' }}
                      >
                        {article.category.name}
                      </span>
                      <span
                        className="font-mono text-[10px]"
                        style={{ color: '#52525b' }}
                      >
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="font-display text-xl mb-3 group-hover:text-[#b8860b] transition-colors duration-300">
                      {article.title}
                    </h3>

                    <p
                      className="mb-6 leading-relaxed flex-1"
                      style={{ color: '#a1a1aa' }}
                    >
                      {article.excerpt}
                    </p>

                    <div
                      className="flex items-center justify-between pt-4"
                      style={{ borderTop: '1px solid #1c1c1c' }}
                    >
                      <span className="font-mono text-xs" style={{ color: '#a1a1aa' }}>
                        {article.author.penName}
                      </span>
                      <span className="font-mono text-[10px]" style={{ color: '#52525b' }}>
                        {article.publishedAt}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Authors Section */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span
              className="font-mono text-[10px] uppercase tracking-exhibition"
              style={{ color: '#b8860b' }}
            >
              The Columnists
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: 'linear-gradient(to right, #2a2a2a, transparent)' }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {authors.map((author) => (
              <Link
                key={author.slug}
                href={`/author/${author.slug}`}
                className="group text-center"
              >
                <div
                  className="w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:border-[#b8860b] transition-colors duration-300"
                  style={{ border: '1px solid #2a2a2a' }}
                >
                  <span
                    className="font-display text-2xl italic group-hover:text-[#b8860b] transition-colors duration-300"
                    style={{ color: '#52525b' }}
                  >
                    {author.penName.charAt(0)}
                  </span>
                </div>

                <h3 className="font-display text-xl mb-2 group-hover:text-[#b8860b] transition-colors duration-300">
                  {author.penName}
                </h3>

                <p
                  className="font-mono text-[10px] uppercase tracking-exhibition mb-3"
                  style={{ color: '#b8860b' }}
                >
                  {author.voiceType}
                </p>

                <p className="text-sm mb-2" style={{ color: '#a1a1aa' }}>
                  {author.publicBio}
                </p>

                <p
                  className="font-mono text-[10px] uppercase tracking-exhibition"
                  style={{ color: '#52525b' }}
                >
                  {author.publicLocation}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section
        className="py-24 px-6 lg:px-12"
        style={{ borderTop: '1px solid #1c1c1c' }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span
              className="font-mono text-[10px] uppercase tracking-exhibition"
              style={{ color: '#b8860b' }}
            >
              Explore
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: 'linear-gradient(to right, #2a2a2a, transparent)' }}
            />
          </div>

          <div className="space-y-0">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="group block"
              >
                <div
                  className="flex items-center justify-between py-6 group-hover:border-[#b8860b] transition-colors duration-300"
                  style={{ borderBottom: '1px solid #1c1c1c' }}
                >
                  <h3 className="font-display text-2xl group-hover:text-[#b8860b] transition-colors duration-300">
                    {category.name}
                  </h3>
                  <span
                    className="font-mono group-hover:text-[#b8860b] transition-colors duration-300"
                    style={{ color: '#52525b' }}
                  >
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-16 px-6 lg:px-12"
        style={{ borderTop: '1px solid #1c1c1c' }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <Link href="/" className="font-display text-xl mb-2 inline-block">
                The Order of Change
              </Link>
              <p
                className="font-mono text-[10px] uppercase tracking-exhibition"
                style={{ color: '#52525b' }}
              >
                See the shift.
              </p>
            </div>

            <div className="flex items-center gap-8">
              <Link
                href="/about"
                className="font-mono text-xs uppercase tracking-exhibition hover-gold"
                style={{ color: '#a1a1aa' }}
              >
                About
              </Link>
              <Link
                href="/subscribe"
                className="font-mono text-xs uppercase tracking-exhibition hover-gold"
                style={{ color: '#a1a1aa' }}
              >
                Subscribe
              </Link>
              <Link
                href="/contact"
                className="font-mono text-xs uppercase tracking-exhibition hover-gold"
                style={{ color: '#a1a1aa' }}
              >
                Contact
              </Link>
            </div>

            <p className="font-mono text-[10px]" style={{ color: '#52525b' }}>
              © 2026
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
