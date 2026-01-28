import Link from "next/link";

// ═══════════════════════════════════════════════════════════════════════════
// MOCK DATA — Will be replaced with CMS data
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
    publicBio: "Former international correspondent on geopolitics and global affairs.",
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
// COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-[#1c1c1c]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-8 h-8 border border-[#b8860b] flex items-center justify-center">
              <span className="text-[#b8860b] font-mono text-xs">OC</span>
            </div>
            <span className="font-display text-lg tracking-wide hidden sm:block">
              The Order of Change
            </span>
          </Link>

          {/* Categories */}
          <div className="hidden lg:flex items-center gap-8">
            {categories.slice(0, 4).map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="font-mono text-xs uppercase tracking-exhibition text-[#a1a1aa] hover-gold"
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {/* Subscribe */}
          <Link
            href="/subscribe"
            className="font-mono text-xs uppercase tracking-exhibition px-4 py-2 border border-[#b8860b] text-[#b8860b] hover:bg-[#b8860b] hover:text-[#0a0a0a] transition-all duration-300"
          >
            Subscribe
          </Link>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden pt-20">
      {/* Geometric accent - top left */}
      <div className="absolute top-32 left-12 w-px h-40 bg-gradient-to-b from-transparent via-[#8b6914] to-transparent opacity-30 animate-fade-in delay-500" />

      {/* Geometric accent - top right */}
      <div className="absolute top-40 right-20 w-20 h-px bg-gradient-to-r from-transparent via-[#8b6914] to-transparent opacity-30 animate-fade-in delay-600" />

      <div className="text-center px-6 relative z-10">
        {/* Tagline above */}
        <p className="font-mono text-xs uppercase tracking-exhibition text-[#a1a1aa] mb-8 animate-fade-in-up">
          Analysis for those who see clearly
        </p>

        {/* Main title */}
        <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-normal tracking-tight mb-6 animate-fade-in-up delay-100">
          <span className="italic">The Order</span>
          <br />
          <span className="text-[#b8860b]">of Change</span>
        </h1>

        {/* Subtitle */}
        <p className="font-display text-xl sm:text-2xl italic text-[#a1a1aa] mb-12 animate-fade-in-up delay-200">
          See the shift.
        </p>

        {/* Scroll indicator */}
        <div className="animate-fade-in delay-700">
          <div className="w-px h-16 bg-gradient-to-b from-[#b8860b] to-transparent mx-auto mb-2" />
          <span className="font-mono text-[10px] uppercase tracking-exhibition text-[#52525b]">
            Scroll
          </span>
        </div>
      </div>

      {/* Bottom geometric line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2a2a2a] to-transparent" />
    </section>
  );
}

function FeaturedArticle() {
  return (
    <section className="py-32 px-6 lg:px-12 relative spotlight">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16 animate-fade-in-up">
          <span className="font-mono text-[10px] uppercase tracking-exhibition text-[#b8860b]">
            Featured Analysis
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-[#2a2a2a] to-transparent" />
        </div>

        {/* Featured card */}
        <Link href={`/article/${featuredArticle.slug}`} className="block group">
          <article className="gallery-frame hover-illuminate animate-fade-in-up delay-100">
            <div className="gallery-frame-inner p-8 lg:p-16">
              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <span className="font-mono text-[10px] uppercase tracking-exhibition text-[#b8860b]">
                  {featuredArticle.category.name}
                </span>
                <span className="text-[#2a2a2a]">|</span>
                <span className="font-mono text-[10px] uppercase tracking-exhibition text-[#52525b]">
                  {featuredArticle.publishedAt}
                </span>
                <span className="text-[#2a2a2a]">|</span>
                <span className="font-mono text-[10px] uppercase tracking-exhibition text-[#52525b]">
                  {featuredArticle.readTime}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal mb-4 group-hover:text-[#b8860b] transition-colors duration-500">
                {featuredArticle.title}
              </h2>

              {/* Subtitle */}
              <p className="font-display text-xl italic text-[#a1a1aa] mb-8">
                {featuredArticle.subtitle}
              </p>

              {/* Excerpt */}
              <p className="text-[#a1a1aa] max-w-3xl mb-8 leading-relaxed">
                {featuredArticle.excerpt}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 border border-[#2a2a2a] flex items-center justify-center">
                  <span className="font-mono text-xs text-[#52525b]">
                    {featuredArticle.author.penName.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-mono text-sm">{featuredArticle.author.penName}</p>
                </div>
              </div>
            </div>
          </article>
        </Link>
      </div>
    </section>
  );
}

function LatestArticles() {
  return (
    <section className="py-32 px-6 lg:px-12 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16 animate-fade-in-up">
          <span className="font-mono text-[10px] uppercase tracking-exhibition text-[#b8860b]">
            Latest
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-[#2a2a2a] to-transparent" />
        </div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Large card - spans 7 columns */}
          <div className="lg:col-span-7 animate-fade-in-up delay-100">
            <ArticleCard article={latestArticles[0]} size="large" />
          </div>

          {/* Stacked cards - spans 5 columns */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8">
            <div className="animate-fade-in-up delay-200">
              <ArticleCard article={latestArticles[1]} size="medium" />
            </div>
            <div className="animate-fade-in-up delay-300">
              <ArticleCard article={latestArticles[2]} size="medium" />
            </div>
          </div>

          {/* Full width card at bottom */}
          <div className="lg:col-span-12 animate-fade-in-up delay-400">
            <ArticleCard article={latestArticles[3]} size="wide" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ArticleCard({
  article,
  size = "medium"
}: {
  article: typeof latestArticles[0];
  size?: "large" | "medium" | "wide";
}) {
  const isLarge = size === "large";
  const isWide = size === "wide";

  return (
    <Link href={`/article/${article.slug}`} className="block group h-full">
      <article className={`gallery-frame hover-illuminate hover-lift h-full ${isWide ? '' : ''}`}>
        <div className={`gallery-frame-inner h-full ${isLarge ? 'p-8 lg:p-12' : isWide ? 'p-6 lg:p-8' : 'p-6'}`}>
          {/* Meta */}
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[10px] uppercase tracking-exhibition text-[#b8860b]">
              {article.category.name}
            </span>
            <span className="font-mono text-[10px] text-[#52525b]">
              {article.readTime}
            </span>
          </div>

          {/* Title */}
          <h3 className={`font-display font-normal mb-3 group-hover:text-[#b8860b] transition-colors duration-500 ${
            isLarge ? 'text-2xl lg:text-3xl' : isWide ? 'text-xl lg:text-2xl' : 'text-xl'
          }`}>
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className={`text-[#a1a1aa] mb-6 leading-relaxed ${isLarge ? '' : 'line-clamp-2'}`}>
            {article.excerpt}
          </p>

          {/* Footer */}
          <div className={`flex items-center justify-between mt-auto pt-4 border-t border-[#1c1c1c] ${isWide ? 'flex-row' : ''}`}>
            <span className="font-mono text-xs text-[#a1a1aa]">{article.author.penName}</span>
            <span className="font-mono text-[10px] text-[#52525b]">{article.publishedAt}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function AuthorsSection() {
  return (
    <section className="py-32 px-6 lg:px-12 relative spotlight-gold">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16 animate-fade-in-up">
          <span className="font-mono text-[10px] uppercase tracking-exhibition text-[#b8860b]">
            The Columnists
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-[#2a2a2a] to-transparent" />
        </div>

        {/* Authors grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {authors.map((author, index) => (
            <Link
              key={author.slug}
              href={`/author/${author.slug}`}
              className={`group animate-fade-in-up delay-${(index + 1) * 100}`}
            >
              <article className="text-center">
                {/* Avatar placeholder */}
                <div className="w-24 h-24 mx-auto mb-6 border border-[#2a2a2a] flex items-center justify-center group-hover:border-[#b8860b] transition-colors duration-500">
                  <span className="font-display text-3xl italic text-[#52525b] group-hover:text-[#b8860b] transition-colors duration-500">
                    {author.penName.charAt(0)}
                  </span>
                </div>

                {/* Name */}
                <h3 className="font-display text-2xl mb-2 group-hover:text-[#b8860b] transition-colors duration-500">
                  {author.penName}
                </h3>

                {/* Voice type */}
                <p className="font-mono text-[10px] uppercase tracking-exhibition text-[#b8860b] mb-3">
                  {author.voiceType}
                </p>

                {/* Bio */}
                <p className="text-sm text-[#a1a1aa] mb-2">
                  {author.publicBio}
                </p>

                {/* Location */}
                <p className="font-mono text-[10px] uppercase tracking-exhibition text-[#52525b]">
                  {author.publicLocation}
                </p>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoriesSection() {
  return (
    <section className="py-32 px-6 lg:px-12 border-t border-[#1c1c1c]">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16 animate-fade-in-up">
          <span className="font-mono text-[10px] uppercase tracking-exhibition text-[#b8860b]">
            Explore
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-[#2a2a2a] to-transparent" />
        </div>

        {/* Categories as large links */}
        <div className="space-y-4">
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className={`block group animate-fade-in-up delay-${(index + 1) * 100}`}
            >
              <div className="flex items-center justify-between py-6 border-b border-[#1c1c1c] group-hover:border-[#b8860b] transition-colors duration-500">
                <h3 className="font-display text-2xl lg:text-3xl group-hover:text-[#b8860b] transition-colors duration-500">
                  {category.name}
                </h3>
                <span className="font-mono text-sm text-[#52525b] group-hover:text-[#b8860b] transition-colors duration-500">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-16 px-6 lg:px-12 border-t border-[#1c1c1c]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Logo & tagline */}
          <div className="text-center lg:text-left">
            <Link href="/" className="inline-block mb-2">
              <span className="font-display text-xl">The Order of Change</span>
            </Link>
            <p className="font-mono text-[10px] uppercase tracking-exhibition text-[#52525b]">
              See the shift.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8">
            <Link href="/about" className="font-mono text-xs uppercase tracking-exhibition text-[#a1a1aa] hover-gold">
              About
            </Link>
            <Link href="/subscribe" className="font-mono text-xs uppercase tracking-exhibition text-[#a1a1aa] hover-gold">
              Subscribe
            </Link>
            <Link href="/contact" className="font-mono text-xs uppercase tracking-exhibition text-[#a1a1aa] hover-gold">
              Contact
            </Link>
          </div>

          {/* Copyright */}
          <p className="font-mono text-[10px] text-[#52525b]">
            © 2026
          </p>
        </div>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════════════

export default function Home() {
  return (
    <>
      {/* Grain overlay for museum texture */}
      <div className="grain" />

      <Navigation />

      <main>
        <HeroSection />
        <FeaturedArticle />
        <LatestArticles />
        <AuthorsSection />
        <CategoriesSection />
      </main>

      <Footer />
    </>
  );
}
