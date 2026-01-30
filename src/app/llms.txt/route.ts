import { getPublishedArticles, getAuthors, getCategories } from '@/lib/payload'

function getSiteUrl() {
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL
  return 'http://localhost:3000'
}

export async function GET() {
  const siteUrl = getSiteUrl()

  const [articles, authors, categories] = await Promise.all([
    getPublishedArticles(50),
    getAuthors(),
    getCategories(),
  ])

  const authorList = authors as unknown as { penName: string; slug: string; publicBio?: string; voiceType?: string }[]
  const categoryList = categories as unknown as { name: string; slug: string; description?: string }[]

  const voiceLabels: Record<string, string> = {
    critical: 'Critical Voice',
    pragmatic: 'Pragmatic Voice',
    neutral: 'Neutral Synthesizer',
  }

  const articleLines = articles
    .map((a) => {
      const author =
        typeof a.author === 'object' && a.author
          ? (a.author as { penName: string })
          : null
      const category =
        typeof a.category === 'object' && a.category
          ? (a.category as { name: string })
          : null
      const date = a.publishedAt
        ? new Date(a.publishedAt as string).toISOString().split('T')[0]
        : ''
      return `- [${a.title}](${siteUrl}/article/${a.slug}): ${a.excerpt}${author ? ` By ${author.penName}.` : ''}${category ? ` Category: ${category.name}.` : ''}${date ? ` Published: ${date}.` : ''}`
    })
    .join('\n')

  const authorLines = authorList
    .map((a) => {
      const voice = a.voiceType ? voiceLabels[a.voiceType] || a.voiceType : ''
      return `- [${a.penName}](${siteUrl}/author/${a.slug}): ${a.publicBio || 'Analyst'}${voice ? `. ${voice}.` : ''}`
    })
    .join('\n')

  const categoryLines = categoryList
    .map((c) => `- [${c.name}](${siteUrl}/category/${c.slug})${c.description ? `: ${c.description}` : ''}`)
    .join('\n')

  const content = `# The Order of Change

> Independent geopolitical analysis. See beyond the headlines. Understand the forces reshaping the global order.

The Order of Change provides expert analysis on geopolitics, power structures, capital markets, energy, and technology. Our columnists offer multiple perspectives on the same events, giving readers the tools to form their own conclusions.

## Columnists

${authorLines}

## Topics

${categoryLines}

## Articles

${articleLines}

## Links

- Homepage: ${siteUrl}
- RSS Feed: ${siteUrl}/feed.xml
- Subscribe: ${siteUrl}/subscribe
- Contact: ${siteUrl}/contact
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
