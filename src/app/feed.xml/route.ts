import { getPublishedArticles } from '@/lib/payload'

function getSiteUrl() {
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL
  return 'http://localhost:3000'
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const siteUrl = getSiteUrl()
  const articles = await getPublishedArticles(50)

  const items = articles
    .map((article) => {
      const author =
        typeof article.author === 'object' && article.author
          ? (article.author as { penName: string })
          : null
      const category =
        typeof article.category === 'object' && article.category
          ? (article.category as { name: string })
          : null

      const pubDate = article.publishedAt
        ? new Date(article.publishedAt as string).toUTCString()
        : new Date().toUTCString()

      return `    <item>
      <title>${escapeXml(article.title as string)}</title>
      <link>${siteUrl}/article/${article.slug}</link>
      <guid isPermaLink="true">${siteUrl}/article/${article.slug}</guid>
      <description>${escapeXml(article.excerpt as string)}</description>
      <pubDate>${pubDate}</pubDate>${author ? `\n      <dc:creator>${escapeXml(author.penName)}</dc:creator>` : ''}${category ? `\n      <category>${escapeXml(category.name)}</category>` : ''}
    </item>`
    })
    .join('\n')

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>The Order of Change</title>
    <link>${siteUrl}</link>
    <description>Independent geopolitical analysis. See beyond the headlines. Understand the forces reshaping the global order.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
