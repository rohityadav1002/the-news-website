import type { MetadataRoute } from 'next'
import { getAllArticleSlugs, getAuthors, getCategories } from '@/lib/payload'

export const dynamic = 'force-dynamic'

function getSiteUrl() {
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL
  return 'http://localhost:3000'
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl()

  const [articleSlugs, authors, categories] = await Promise.all([
    getAllArticleSlugs(),
    getAuthors(),
    getCategories(),
  ])

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${siteUrl}/subscribe`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  const articlePages: MetadataRoute.Sitemap = articleSlugs.map((slug) => ({
    url: `${siteUrl}/article/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const authorPages: MetadataRoute.Sitemap = (authors as unknown as { slug: string }[]).map(
    (author) => ({
      url: `${siteUrl}/author/${author.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    }),
  )

  const categoryPages: MetadataRoute.Sitemap = (categories as unknown as { slug: string }[]).map(
    (cat) => ({
      url: `${siteUrl}/category/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }),
  )

  return [...staticPages, ...articlePages, ...authorPages, ...categoryPages]
}
