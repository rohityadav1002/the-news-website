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
      _status: { equals: draft ? 'draft' : 'published' },
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
        _status: { equals: 'published' },
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
      _status: { equals: 'published' },
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
      _status: { equals: 'published' },
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
      _status: { equals: 'published' },
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

export async function getAuthorBySlug(slug: string) {
  const payload = await getPayloadClient()

  const authors = await payload.find({
    collection: 'authors',
    where: {
      slug: { equals: slug },
    },
    depth: 1,
    limit: 1,
  })

  return authors.docs[0] || null
}

export async function getArticlesByAuthor(authorId: string, limit = 50) {
  const payload = await getPayloadClient()

  const articles = await payload.find({
    collection: 'articles',
    where: {
      author: { equals: authorId },
      _status: { equals: 'published' },
    },
    depth: 2,
    limit,
    sort: '-publishedAt',
  })

  return articles.docs
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
      _status: { equals: draft ? 'draft' : 'published' },
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

// Get paginated articles by category
export async function getPaginatedArticles(category: string, page: number, perPage = 12) {
  const payload = await getPayloadClient()

  const articles = await payload.find({
    collection: 'articles',
    where: {
      _status: { equals: 'published' },
      'category.slug': { equals: category },
    },
    depth: 2,
    limit: perPage,
    page,
    sort: '-publishedAt',
  })

  return {
    docs: articles.docs,
    totalPages: articles.totalPages,
    page: articles.page || 1,
    totalDocs: articles.totalDocs,
  }
}

// Get paginated articles by author
export async function getPaginatedArticlesByAuthor(authorId: string, page: number, perPage = 12) {
  const payload = await getPayloadClient()

  const articles = await payload.find({
    collection: 'articles',
    where: {
      author: { equals: authorId },
      _status: { equals: 'published' },
    },
    depth: 2,
    limit: perPage,
    page,
    sort: '-publishedAt',
  })

  return {
    docs: articles.docs,
    totalPages: articles.totalPages,
    page: articles.page || 1,
    totalDocs: articles.totalDocs,
  }
}

// Get articles by tag
export async function getArticlesByTag(tag: string, limit = 50) {
  const payload = await getPayloadClient()

  const articles = await payload.find({
    collection: 'articles',
    where: {
      _status: { equals: 'published' },
      'tags.tag': { equals: tag },
    },
    depth: 2,
    limit,
    sort: '-publishedAt',
  })

  return articles.docs
}

// Get all unique tags
export async function getAllTags() {
  const payload = await getPayloadClient()

  const articles = await payload.find({
    collection: 'articles',
    where: { _status: { equals: 'published' } },
    depth: 0,
    limit: 1000,
  })

  const tagCounts: Record<string, number> = {}
  for (const article of articles.docs) {
    const tags = article.tags as { tag: string }[] | undefined
    if (tags) {
      for (const t of tags) {
        if (t.tag) {
          tagCounts[t.tag] = (tagCounts[t.tag] || 0) + 1
        }
      }
    }
  }

  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
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
