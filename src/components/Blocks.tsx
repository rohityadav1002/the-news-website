import Link from "next/link";

// Block type definitions
interface QuoteBlock {
  blockType: "quote";
  quote: string;
  attribution?: string;
}

interface StatItem {
  value: string;
  label: string;
}

interface StatsBlock {
  blockType: "stats";
  heading?: string;
  stats?: StatItem[];
}

interface CTALink {
  label: string;
  url: string;
}

interface CallToActionBlock {
  blockType: "callToAction";
  eyebrow?: string;
  heading: string;
  description?: string;
  links?: CTALink[];
}

interface HeroBlock {
  blockType: "hero";
  heading: string;
  subheading?: string;
  image?: { url?: string };
}

interface ContentBlock {
  blockType: "content";
  content: unknown;
}

interface MediaBlock {
  blockType: "media";
  media?: { url?: string; alt?: string };
  caption?: string;
}

type Block =
  | QuoteBlock
  | StatsBlock
  | CallToActionBlock
  | HeroBlock
  | ContentBlock
  | MediaBlock;

// Quote Block Component
function QuoteBlockRenderer({ block }: { block: QuoteBlock }) {
  return (
    <blockquote
      className="my-16 px-8 py-12 relative"
      style={{ backgroundColor: "#0f0f0f" }}
    >
      <div
        className="absolute top-0 left-0 w-1 h-full"
        style={{ backgroundColor: "#b8860b" }}
      />
      <p
        className="font-display text-2xl lg:text-3xl italic mb-6"
        style={{ color: "#fafaf9" }}
      >
        &ldquo;{block.quote}&rdquo;
      </p>
      {block.attribution && (
        <cite
          className="font-mono text-sm uppercase tracking-wider not-italic"
          style={{ color: "#b8860b" }}
        >
          — {block.attribution}
        </cite>
      )}
    </blockquote>
  );
}

// Stats Block Component
function StatsBlockRenderer({ block }: { block: StatsBlock }) {
  return (
    <div
      className="my-16 py-12 px-8"
      style={{ backgroundColor: "#0f0f0f" }}
    >
      {block.heading && (
        <h3
          className="font-mono text-xs uppercase tracking-[0.2em] text-center mb-10"
          style={{ color: "#b8860b" }}
        >
          {block.heading}
        </h3>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {block.stats?.map((stat, index) => (
          <div key={index} className="text-center">
            <div
              className="font-display text-4xl lg:text-5xl mb-2"
              style={{ color: "#b8860b" }}
            >
              {stat.value}
            </div>
            <div
              className="font-mono text-xs uppercase tracking-wider"
              style={{ color: "#a1a1aa" }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Call to Action Block Component
function CallToActionBlockRenderer({ block }: { block: CallToActionBlock }) {
  return (
    <div
      className="my-16 py-16 px-8 text-center relative overflow-hidden"
      style={{ backgroundColor: "#0f0f0f" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(184,134,11,0.1) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10">
        {block.eyebrow && (
          <span
            className="font-mono text-xs uppercase tracking-[0.3em] block mb-4"
            style={{ color: "#b8860b" }}
          >
            {block.eyebrow}
          </span>
        )}
        <h3 className="font-display text-3xl lg:text-4xl mb-4">
          {block.heading}
        </h3>
        {block.description && (
          <p className="mb-8 max-w-xl mx-auto" style={{ color: "#a1a1aa" }}>
            {block.description}
          </p>
        )}
        {block.links && block.links.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4">
            {block.links.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                className="inline-flex items-center gap-3 font-mono text-sm uppercase tracking-wider px-8 py-4 transition-all duration-300 bg-[#b8860b] text-[#0a0a0a] hover:bg-[#d4a00a]"
              >
                <span>{link.label}</span>
                <span>→</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Hero Block Component
function HeroBlockRenderer({ block }: { block: HeroBlock }) {
  return (
    <div
      className="my-16 py-20 px-8 text-center relative overflow-hidden"
      style={{
        backgroundColor: "#0f0f0f",
        backgroundImage: block.image?.url ? `url(${block.image.url})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(10,10,10,0.8)" }}
      />
      <div className="relative z-10">
        <h2 className="font-display text-4xl lg:text-5xl mb-4">{block.heading}</h2>
        {block.subheading && (
          <p className="font-display text-xl italic" style={{ color: "#a1a1aa" }}>
            {block.subheading}
          </p>
        )}
      </div>
    </div>
  );
}

// Main Blocks Renderer
export function Blocks({ blocks }: { blocks: Block[] }) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="max-w-3xl mx-auto">
      {blocks.map((block, index) => {
        switch (block.blockType) {
          case "quote":
            return <QuoteBlockRenderer key={index} block={block} />;
          case "stats":
            return <StatsBlockRenderer key={index} block={block} />;
          case "callToAction":
            return <CallToActionBlockRenderer key={index} block={block} />;
          case "hero":
            return <HeroBlockRenderer key={index} block={block} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
