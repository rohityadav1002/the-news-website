import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function getPayloadClient() {
  return await getPayload({ config: configPromise })
}

export async function getArticleBySlug(slug: string, draft = false) {
  const payload = await getPayloadClient()

  const articles = await payload.find({
    collection: 'articles',
    where: {
      slug: { equals: slug },
      // Use _status for versioned collections
      status: { equals: draft ? 'draft' : 'published' },
    },
    depth: 2,
    limit: 1,
    draft,
  })

  return articles.docs[0] || null
}

export async function getPublishedArticles(limit = 10, category?: string) {
  const payload = await getPayloadClient()

  if (category) {
    const articles = await payload.find({
      collection: 'articles',
      where: {
        status: { equals: 'published' },
        'category.slug': { equals: category },
      },
      depth: 2,
      limit,
      sort: '-publishedAt',
    })
    return articles.docs
  }

  const articles = await payload.find({
    collection: 'articles',
    where: {
      status: { equals: 'published' },
    },
    depth: 2,
    limit,
    sort: '-publishedAt',
  })

  return articles.docs
}

export async function getRelatedArticles(currentSlug: string, categoryId: string, limit = 3) {
  const payload = await getPayloadClient()

  const articles = await payload.find({
    collection: 'articles',
    where: {
      slug: { not_equals: currentSlug },
      category: { equals: categoryId },
      status: { equals: 'published' },
    },
    depth: 2,
    limit,
    sort: '-publishedAt',
  })

  return articles.docs
}

export async function getAllArticleSlugs() {
  const payload = await getPayloadClient()

  const articles = await payload.find({
    collection: 'articles',
    where: {
      status: { equals: 'published' },
    },
    depth: 0,
    limit: 1000,
  })

  return articles.docs.map((article) => article.slug)
}

export async function getAuthors() {
  const payload = await getPayloadClient()

  const authors = await payload.find({
    collection: 'authors',
    depth: 1,
    limit: 100,
  })

  return authors.docs
}

export async function getCategories() {
  const payload = await getPayloadClient()

  const categories = await payload.find({
    collection: 'categories',
    limit: 100,
  })

  return categories.docs
}

// Get page by slug
export async function getPageBySlug(slug: string, draft = false) {
  const payload = await getPayloadClient()

  const pages = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: slug },
      status: { equals: draft ? 'draft' : 'published' },
    },
    depth: 2,
    limit: 1,
    draft,
  })

  return pages.docs[0] || null
}

// Get globals
export async function getHeader() {
  const payload = await getPayloadClient()
  return await payload.findGlobal({ slug: 'header', depth: 1 })
}

export async function getFooter() {
  const payload = await getPayloadClient()
  return await payload.findGlobal({ slug: 'footer', depth: 1 })
}

export async function getSiteSettings() {
  const payload = await getPayloadClient()
  return await payload.findGlobal({ slug: 'siteSettings', depth: 1 })
}

// Search articles
export async function searchArticles(query: string, limit = 10) {
  const payload = await getPayloadClient()

  const results = await payload.find({
    collection: 'search',
    where: {
      or: [
        { title: { like: query } },
        { excerpt: { like: query } },
      ],
    },
    limit,
  })

  return results.docs
}
