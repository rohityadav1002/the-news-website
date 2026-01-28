import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { layoutBlocks } from './blocks'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Helper to get server URL
const getServerURL = () => {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL
  return 'http://localhost:3000'
}

export default buildConfig({
  // ═══════════════════════════════════════════════════════════════════
  // ADMIN PANEL CONFIGURATION
  // ═══════════════════════════════════════════════════════════════════
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname),
    },
    // Live Preview - See changes as you type
    livePreview: {
      url: ({ data, collectionConfig }) => {
        const baseUrl = getServerURL()
        if (collectionConfig?.slug === 'articles') {
          return `${baseUrl}/article/${data?.slug || ''}`
        }
        if (collectionConfig?.slug === 'pages') {
          return `${baseUrl}/${data?.slug === 'home' ? '' : data?.slug || ''}`
        }
        return baseUrl
      },
      collections: ['articles', 'pages'],
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // COLLECTIONS
  // ═══════════════════════════════════════════════════════════════════
  collections: [
    // ─────────────────────────────────────────────────────────────────
    // Users (CMS Authentication)
    // ─────────────────────────────────────────────────────────────────
    {
      slug: 'users',
      auth: true,
      admin: {
        useAsTitle: 'name',
        description: 'Internal users who can log into the CMS',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'role',
          type: 'select',
          options: [
            { label: 'Admin', value: 'admin' },
            { label: 'Editor', value: 'editor' },
            { label: 'Writer', value: 'writer' },
          ],
          defaultValue: 'writer',
          required: true,
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────
    // Authors (Public Columnist Personas)
    // ─────────────────────────────────────────────────────────────────
    {
      slug: 'authors',
      admin: {
        useAsTitle: 'penName',
        description: 'Public columnist personas (V. Rao, A. Sterling, M. Chen)',
        defaultColumns: ['penName', 'voiceType', 'publicLocation'],
      },
      fields: [
        {
          name: 'penName',
          type: 'text',
          required: true,
          admin: { description: 'e.g., V. Rao, A. Sterling, M. Chen' },
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
          admin: { description: 'URL-friendly identifier' },
        },
        {
          name: 'publicBio',
          type: 'textarea',
          required: true,
          admin: { description: 'Short bio shown on the website' },
        },
        {
          name: 'publicLocation',
          type: 'text',
          required: true,
          admin: { description: 'e.g., "Based in Asia", "Based in the Gulf"' },
        },
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'voiceType',
          type: 'select',
          required: true,
          options: [
            { label: 'Critical Voice', value: 'critical' },
            { label: 'Pragmatic Voice', value: 'pragmatic' },
            { label: 'Neutral Synthesizer', value: 'neutral' },
          ],
        },
        {
          name: 'contentFocus',
          type: 'textarea',
          admin: { description: 'What type of content this author writes (internal)' },
        },
        {
          name: 'privateInfo',
          type: 'group',
          label: 'Private Information (Internal Only)',
          admin: { description: 'Background details for persona consistency' },
          fields: [
            { name: 'fullName', type: 'text' },
            { name: 'age', type: 'number' },
            { name: 'birthYear', type: 'number' },
            {
              name: 'gender',
              type: 'select',
              options: [
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
              ],
            },
            { name: 'ethnicity', type: 'text' },
            { name: 'birthplace', type: 'text' },
            { name: 'actualLocation', type: 'text' },
            { name: 'education', type: 'textarea' },
            { name: 'backgroundStory', type: 'richText' },
            { name: 'personality', type: 'textarea' },
            { name: 'coreBeliefs', type: 'textarea' },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────
    // Media (Images & Files)
    // ─────────────────────────────────────────────────────────────────
    {
      slug: 'media',
      upload: {
        staticDir: path.resolve(dirname, '../public/media'),
        mimeTypes: ['image/*'],
        imageSizes: [
          { name: 'thumbnail', width: 400, height: 300 },
          { name: 'card', width: 768, height: 512 },
          { name: 'hero', width: 1920, height: 1080 },
        ],
        focalPoint: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'text',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────
    // Categories
    // ─────────────────────────────────────────────────────────────────
    {
      slug: 'categories',
      admin: {
        useAsTitle: 'name',
      },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'slug', type: 'text', required: true, unique: true },
        { name: 'description', type: 'textarea' },
      ],
    },

    // ─────────────────────────────────────────────────────────────────
    // Pages (Static pages with layout builder)
    // ─────────────────────────────────────────────────────────────────
    {
      slug: 'pages',
      admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
        livePreview: {
          url: ({ data }) => `${getServerURL()}/${data?.slug === 'home' ? '' : data?.slug || ''}`,
        },
      },
      // Versioning temporarily disabled - enable after schema migration
      // versions: {
      //   drafts: {
      //     autosave: { interval: 100 },
      //     schedulePublish: true,
      //   },
      //   maxPerDoc: 50,
      // },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
          admin: { description: 'URL path (use "home" for homepage)' },
        },
        {
          name: 'status',
          type: 'select',
          defaultValue: 'draft',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Published', value: 'published' },
          ],
        },
        {
          name: 'heroType',
          type: 'select',
          defaultValue: 'none',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Low Impact', value: 'lowImpact' },
            { label: 'Medium Impact', value: 'mediumImpact' },
            { label: 'High Impact', value: 'highImpact' },
          ],
        },
        {
          name: 'heroImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (_, siblingData) => siblingData?.heroType !== 'none',
          },
        },
        {
          name: 'content',
          type: 'richText',
        },
        // Layout blocks temporarily disabled - enable after schema migration
        // {
        //   name: 'layout',
        //   type: 'blocks',
        //   blocks: layoutBlocks,
        // },
        {
          name: 'publishedAt',
          type: 'date',
          admin: {
            date: { pickerAppearance: 'dayAndTime' },
          },
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────
    // Articles (News/Blog Posts)
    // ─────────────────────────────────────────────────────────────────
    {
      slug: 'articles',
      admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'author', 'status', 'category', 'publishedAt'],
        livePreview: {
          url: ({ data }) => `${getServerURL()}/article/${data?.slug || ''}`,
        },
      },
      // Versioning temporarily disabled - enable after schema migration
      // versions: {
      //   drafts: {
      //     autosave: { interval: 100 },
      //     schedulePublish: true,
      //   },
      //   maxPerDoc: 50,
      // },
      fields: [
        {
          type: 'tabs',
          tabs: [
            {
              label: 'Content',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'slug',
                  type: 'text',
                  required: true,
                  unique: true,
                  admin: { description: 'URL-friendly version of the title' },
                },
                {
                  name: 'subtitle',
                  type: 'text',
                  admin: { description: 'Secondary headline' },
                },
                {
                  name: 'excerpt',
                  type: 'textarea',
                  required: true,
                  admin: { description: 'Brief summary for listings' },
                },
                {
                  name: 'featuredImage',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'content',
                  type: 'richText',
                  required: true,
                },
                // Layout blocks temporarily disabled - enable after schema migration
                // {
                //   name: 'layout',
                //   type: 'blocks',
                //   blocks: layoutBlocks,
                //   admin: { description: 'Optional: Add layout blocks after main content' },
                // },
              ],
            },
            {
              label: 'Meta',
              fields: [
                {
                  name: 'author',
                  type: 'relationship',
                  relationTo: 'authors',
                  required: true,
                },
                {
                  name: 'category',
                  type: 'relationship',
                  relationTo: 'categories',
                  required: true,
                },
                {
                  name: 'relatedArticles',
                  type: 'relationship',
                  relationTo: 'articles',
                  hasMany: true,
                  maxRows: 3,
                  admin: { description: 'Manual selection of related articles' },
                },
                {
                  name: 'status',
                  type: 'select',
                  defaultValue: 'draft',
                  required: true,
                  options: [
                    { label: 'Draft', value: 'draft' },
                    { label: 'Published', value: 'published' },
                    { label: 'Scheduled', value: 'scheduled' },
                  ],
                },
                {
                  name: 'tags',
                  type: 'array',
                  fields: [{ name: 'tag', type: 'text' }],
                },
                {
                  name: 'publishedAt',
                  type: 'date',
                  admin: {
                    date: { pickerAppearance: 'dayAndTime' },
                    description: 'When this article goes live',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════
  // GLOBALS (Site-wide settings)
  // ═══════════════════════════════════════════════════════════════════
  globals: [
    {
      slug: 'header',
      label: 'Header',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'navItems',
          type: 'array',
          maxRows: 6,
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'url', type: 'text', required: true },
          ],
        },
        {
          name: 'ctaButton',
          type: 'group',
          fields: [
            { name: 'label', type: 'text', defaultValue: 'Subscribe' },
            { name: 'url', type: 'text', defaultValue: '/subscribe' },
          ],
        },
      ],
    },
    {
      slug: 'footer',
      label: 'Footer',
      fields: [
        {
          name: 'tagline',
          type: 'text',
          defaultValue: 'Independent geopolitical analysis for those who want to understand.',
        },
        {
          name: 'columns',
          type: 'array',
          maxRows: 4,
          fields: [
            { name: 'title', type: 'text', required: true },
            {
              name: 'links',
              type: 'array',
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'url', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          name: 'socialLinks',
          type: 'array',
          fields: [
            {
              name: 'platform',
              type: 'select',
              options: [
                { label: 'Twitter/X', value: 'twitter' },
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'YouTube', value: 'youtube' },
                { label: 'RSS', value: 'rss' },
              ],
            },
            { name: 'url', type: 'text', required: true },
          ],
        },
        {
          name: 'copyright',
          type: 'text',
          defaultValue: '© 2026 The Order of Change. All rights reserved.',
        },
      ],
    },
    {
      slug: 'siteSettings',
      label: 'Site Settings',
      fields: [
        { name: 'siteName', type: 'text', defaultValue: 'The Order of Change' },
        { name: 'siteDescription', type: 'textarea' },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
        {
          name: 'analytics',
          type: 'group',
          fields: [
            { name: 'googleAnalyticsId', type: 'text' },
            { name: 'plausibleDomain', type: 'text' },
          ],
        },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════
  // PLUGINS
  // ═══════════════════════════════════════════════════════════════════
  plugins: [
    // SEO Plugin - Adds meta fields to collections
    seoPlugin({
      collections: ['articles', 'pages'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `${doc.title} | The Order of Change`,
      generateDescription: ({ doc }) => doc.excerpt || doc.title,
      generateImage: ({ doc }) => doc.featuredImage,
      generateURL: ({ doc, collectionSlug }) => {
        const baseUrl = getServerURL()
        if (collectionSlug === 'articles') return `${baseUrl}/article/${doc.slug}`
        if (collectionSlug === 'pages') return `${baseUrl}/${doc.slug === 'home' ? '' : doc.slug}`
        return baseUrl
      },
    }),

    // Search Plugin - Full-text search
    searchPlugin({
      collections: ['articles'],
      defaultPriorities: {
        articles: 10,
      },
      searchOverrides: {
        fields: ({ defaultFields }) => [
          ...defaultFields,
          {
            name: 'excerpt',
            type: 'text',
          },
          {
            name: 'category',
            type: 'text',
          },
        ],
      },
      beforeSync: ({ originalDoc, searchDoc }) => {
        return {
          ...searchDoc,
          excerpt: originalDoc.excerpt,
          category: typeof originalDoc.category === 'object'
            ? originalDoc.category.name
            : originalDoc.category,
        }
      },
    }),

    // Redirects Plugin - Manage URL redirects
    redirectsPlugin({
      collections: ['articles', 'pages'],
      overrides: {
        admin: {
          group: 'Settings',
        },
      },
    }),
  ],

  // ═══════════════════════════════════════════════════════════════════
  // EDITOR & DATABASE
  // ═══════════════════════════════════════════════════════════════════
  editor: lexicalEditor(),

  secret: process.env.PAYLOAD_SECRET || '',

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),

  sharp,

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
