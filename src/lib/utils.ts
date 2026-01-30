export function formatDate(dateString: string): string {
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
