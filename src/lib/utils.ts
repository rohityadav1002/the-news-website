export function formatDate(dateString?: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Extract actual text from Lexical rich text content
function extractText(node: unknown): string {
  if (!node || typeof node !== "object") return "";
  const n = node as Record<string, unknown>;
  if (typeof n.text === "string") return n.text;
  if (Array.isArray(n.children)) {
    return n.children.map(extractText).join(" ");
  }
  if (n.root && typeof n.root === "object") {
    return extractText(n.root);
  }
  return "";
}

export function estimateReadTime(content: unknown): string {
  const text = extractText(content);
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 230));
  return `${minutes} min read`;
}

export interface FeaturedImage {
  url?: string;
  alt?: string;
}

export function getImageUrl(
  image: FeaturedImage | string | undefined
): string | null {
  if (!image) return null;
  if (typeof image === "string") return image;
  return image.url || null;
}

// Voice type labels and descriptions — single source of truth
export const voiceTypeLabels: Record<string, string> = {
  critical: "Critical Voice",
  pragmatic: "Pragmatic Voice",
  neutral: "Neutral Synthesizer",
};

export const voiceTypeDescriptions: Record<string, string> = {
  critical:
    "Questions power, follows the money, and exposes the narratives behind global events.",
  pragmatic:
    "Focuses on practical implications and real-world outcomes of geopolitical shifts.",
  neutral:
    "Synthesizes multiple perspectives into balanced, comprehensive analysis.",
};

export function getVoiceLabel(voiceType?: string): string {
  if (!voiceType) return "";
  return voiceTypeLabels[voiceType] || voiceType;
}

// Site URL — single source of truth
export function getSiteUrl(): string {
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.NEXT_PUBLIC_SITE_URL)
    return process.env.NEXT_PUBLIC_SITE_URL;
  return "https://orderofchange.com";
}
