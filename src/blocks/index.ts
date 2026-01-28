import type { Block } from 'payload'

// Hero Block - Full-width hero sections with various styles
export const HeroBlock: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  labels: {
    singular: 'Hero',
    plural: 'Heroes',
  },
  fields: [
    {
      name: 'style',
      type: 'select',
      defaultValue: 'fullscreen',
      options: [
        { label: 'Fullscreen', value: 'fullscreen' },
        { label: 'Half Height', value: 'half' },
        { label: 'Minimal', value: 'minimal' },
      ],
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'subheading',
      type: 'text',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'overlayOpacity',
      type: 'number',
      min: 0,
      max: 100,
      defaultValue: 60,
      admin: {
        description: 'Darkness of the overlay (0-100)',
      },
    },
    {
      name: 'links',
      type: 'array',
      maxRows: 2,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'style',
          type: 'select',
          defaultValue: 'primary',
          options: [
            { label: 'Primary (Gold)', value: 'primary' },
            { label: 'Secondary (Outline)', value: 'secondary' },
          ],
        },
      ],
    },
  ],
}

// Content Block - Rich text content with optional columns
export const ContentBlock: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  labels: {
    singular: 'Content',
    plural: 'Content Blocks',
  },
  fields: [
    {
      name: 'columns',
      type: 'select',
      defaultValue: 'one',
      options: [
        { label: 'One Column', value: 'one' },
        { label: 'Two Columns', value: 'two' },
        { label: 'Three Columns', value: 'three' },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'contentRight',
      type: 'richText',
      admin: {
        condition: (_, siblingData) => siblingData?.columns === 'two' || siblingData?.columns === 'three',
      },
    },
    {
      name: 'contentThird',
      type: 'richText',
      admin: {
        condition: (_, siblingData) => siblingData?.columns === 'three',
      },
    },
  ],
}

// Media Block - Images and videos with captions
export const MediaBlock: Block = {
  slug: 'media',
  interfaceName: 'MediaBlock',
  labels: {
    singular: 'Media',
    plural: 'Media Blocks',
  },
  fields: [
    {
      name: 'position',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Full Width', value: 'fullWidth' },
      ],
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
}

// Call To Action Block - Promotional sections
export const CallToActionBlock: Block = {
  slug: 'callToAction',
  interfaceName: 'CallToActionBlock',
  labels: {
    singular: 'Call to Action',
    plural: 'Calls to Action',
  },
  fields: [
    {
      name: 'style',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Highlight (Gold Background)', value: 'highlight' },
        { label: 'Dark', value: 'dark' },
      ],
    },
    {
      name: 'eyebrow',
      type: 'text',
      admin: {
        description: 'Small text above the heading',
      },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'links',
      type: 'array',
      maxRows: 2,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'style',
          type: 'select',
          defaultValue: 'primary',
          options: [
            { label: 'Primary (Gold)', value: 'primary' },
            { label: 'Secondary (Outline)', value: 'secondary' },
          ],
        },
      ],
    },
  ],
}

// Archive Block - Display posts/articles grid
export const ArchiveBlock: Block = {
  slug: 'archive',
  interfaceName: 'ArchiveBlock',
  labels: {
    singular: 'Archive',
    plural: 'Archives',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'populateBy',
      type: 'select',
      defaultValue: 'collection',
      options: [
        { label: 'Collection', value: 'collection' },
        { label: 'Manual Selection', value: 'selection' },
      ],
    },
    {
      name: 'relationTo',
      type: 'select',
      defaultValue: 'articles',
      options: [
        { label: 'Articles', value: 'articles' },
      ],
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy === 'collection',
      },
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy === 'collection',
        description: 'Filter by categories (optional)',
      },
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 6,
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy === 'collection',
      },
    },
    {
      name: 'selectedArticles',
      type: 'relationship',
      relationTo: 'articles',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy === 'selection',
      },
    },
  ],
}

// Quote/Pullquote Block - For highlighting important quotes
export const QuoteBlock: Block = {
  slug: 'quote',
  interfaceName: 'QuoteBlock',
  labels: {
    singular: 'Quote',
    plural: 'Quotes',
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'attribution',
      type: 'text',
      admin: {
        description: 'Who said this quote',
      },
    },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default (Left Border)', value: 'default' },
        { label: 'Centered', value: 'centered' },
        { label: 'Large', value: 'large' },
      ],
    },
  ],
}

// Stats Block - Display statistics/numbers
export const StatsBlock: Block = {
  slug: 'stats',
  interfaceName: 'StatsBlock',
  labels: {
    singular: 'Stats',
    plural: 'Stats Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'stats',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: {
            description: 'e.g., "500K+" or "24/7"',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}

// Newsletter Block - Email signup form
export const NewsletterBlock: Block = {
  slug: 'newsletter',
  interfaceName: 'NewsletterBlock',
  labels: {
    singular: 'Newsletter',
    plural: 'Newsletter Blocks',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Stay informed',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'buttonText',
      type: 'text',
      defaultValue: 'Subscribe',
    },
  ],
}

// All blocks for layout builder
export const layoutBlocks = [
  HeroBlock,
  ContentBlock,
  MediaBlock,
  CallToActionBlock,
  ArchiveBlock,
  QuoteBlock,
  StatsBlock,
  NewsletterBlock,
]
