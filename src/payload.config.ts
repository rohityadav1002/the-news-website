import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  // Admin panel configuration
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  // Collections (content types)
  collections: [
    // Users collection (CMS authentication - internal)
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

    // Authors collection (public columnist personas)
    {
      slug: 'authors',
      admin: {
        useAsTitle: 'penName',
        description: 'Public columnist personas (V. Rao, A. Sterling, M. Chen)',
        defaultColumns: ['penName', 'voiceType', 'publicLocation'],
      },
      fields: [
        // Public Information (shown on website)
        {
          name: 'penName',
          type: 'text',
          required: true,
          admin: {
            description: 'e.g., V. Rao, A. Sterling, M. Chen',
          },
        },
        {
          name: 'publicBio',
          type: 'textarea',
          required: true,
          admin: {
            description: 'Short bio shown on the website',
          },
        },
        {
          name: 'publicLocation',
          type: 'text',
          required: true,
          admin: {
            description: 'e.g., "Based in Asia", "Based in the Gulf", "Based in Europe"',
          },
        },
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Author photo/avatar (optional)',
          },
        },
        // Voice Configuration
        {
          name: 'voiceType',
          type: 'select',
          required: true,
          options: [
            { label: 'Critical Voice', value: 'critical' },
            { label: 'Pragmatic Voice', value: 'pragmatic' },
            { label: 'Neutral Synthesizer', value: 'neutral' },
          ],
          admin: {
            description: 'The analytical perspective this author represents',
          },
        },
        {
          name: 'contentFocus',
          type: 'textarea',
          admin: {
            description: 'What type of content this author writes (for internal reference)',
          },
        },
        // Private Information (internal only - never shown publicly)
        {
          name: 'privateInfo',
          type: 'group',
          label: 'Private Information (Internal Only)',
          admin: {
            description: 'Background details for maintaining persona consistency',
          },
          fields: [
            {
              name: 'fullName',
              type: 'text',
              admin: {
                description: 'Full fictional name',
              },
            },
            {
              name: 'age',
              type: 'number',
            },
            {
              name: 'birthYear',
              type: 'number',
            },
            {
              name: 'gender',
              type: 'select',
              options: [
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
              ],
            },
            {
              name: 'ethnicity',
              type: 'text',
            },
            {
              name: 'birthplace',
              type: 'text',
            },
            {
              name: 'actualLocation',
              type: 'text',
              admin: {
                description: 'More specific location (internal)',
              },
            },
            {
              name: 'education',
              type: 'textarea',
            },
            {
              name: 'backgroundStory',
              type: 'richText',
              admin: {
                description: 'Full background story for persona consistency',
              },
            },
            {
              name: 'personality',
              type: 'textarea',
              admin: {
                description: 'Personality traits and writing style',
              },
            },
            {
              name: 'coreBeliefs',
              type: 'textarea',
              admin: {
                description: 'Core beliefs and worldview',
              },
            },
          ],
        },
      ],
    },

    // Media collection (images, files)
    {
      slug: 'media',
      upload: {
        staticDir: path.resolve(dirname, '../public/media'),
        mimeTypes: ['image/*'],
      },
      fields: [
        {
          name: 'alt',
          type: 'text',
          required: true,
        },
      ],
    },

    // Categories collection
    {
      slug: 'categories',
      admin: {
        useAsTitle: 'name',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },

    // Articles collection (news articles)
    {
      slug: 'articles',
      admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'author', 'status', 'category', 'publishedAt'],
      },
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
          admin: {
            description: 'URL-friendly version of the title',
          },
        },
        {
          name: 'excerpt',
          type: 'textarea',
          required: true,
          admin: {
            description: 'Brief summary shown in article listings',
          },
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
        },
        {
          name: 'featuredImage',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'author',
          type: 'relationship',
          relationTo: 'authors',
          required: true,
          admin: {
            description: 'Which columnist persona is writing this article',
          },
        },
        {
          name: 'category',
          type: 'relationship',
          relationTo: 'categories',
          required: true,
        },
        {
          name: 'status',
          type: 'select',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Published', value: 'published' },
            { label: 'Scheduled', value: 'scheduled' },
          ],
          defaultValue: 'draft',
          required: true,
        },
        {
          name: 'publishedAt',
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
            description: 'When this article goes live',
          },
        },
        {
          name: 'tags',
          type: 'array',
          fields: [
            {
              name: 'tag',
              type: 'text',
            },
          ],
        },
        // SEO fields
        {
          name: 'seo',
          type: 'group',
          label: 'SEO Settings',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              admin: {
                description: 'Custom title for search engines (optional)',
              },
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              admin: {
                description: 'Custom description for search engines (optional)',
              },
            },
          ],
        },
      ],
    },
  ],

  // Rich text editor
  editor: lexicalEditor(),

  // Secret for authentication
  secret: process.env.PAYLOAD_SECRET || '',

  // Database configuration
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),

  // Image processing
  sharp,

  // TypeScript type generation
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
