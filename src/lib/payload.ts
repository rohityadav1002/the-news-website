import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function getPayloadClient() {
  return await getPayload({ config: configPromise })
}

export async function getArticleBySlug(slug: string) {
  const payload = await getPayloadClient()

  const articles = await payload.find({
    collection: 'articles',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
    depth: 2, // Populate author, category, and media relationships
    limit: 1,
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
