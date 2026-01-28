import { Fragment } from 'react'

// Types for Lexical nodes
interface TextNode {
  type: 'text'
  text: string
  format?: number
  detail?: number
  mode?: string
  style?: string
}

interface LinkNode {
  type: 'link'
  children: LexicalNode[]
  fields: {
    url?: string
    linkType?: string
  }
}

interface ParagraphNode {
  type: 'paragraph'
  children: LexicalNode[]
}

interface HeadingNode {
  type: 'heading'
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  children: LexicalNode[]
}

interface ListNode {
  type: 'list'
  listType: 'bullet' | 'number'
  children: ListItemNode[]
}

interface ListItemNode {
  type: 'listitem'
  children: LexicalNode[]
  value?: number
}

interface QuoteNode {
  type: 'quote'
  children: LexicalNode[]
}

interface UploadNode {
  type: 'upload'
  relationTo: string
  value: {
    url?: string
    alt?: string
    filename?: string
  }
}

interface LinebreakNode {
  type: 'linebreak'
}

type LexicalNode =
  | TextNode
  | LinkNode
  | ParagraphNode
  | HeadingNode
  | ListNode
  | ListItemNode
  | QuoteNode
  | UploadNode
  | LinebreakNode

interface LexicalContent {
  root: {
    children: LexicalNode[]
  }
}

// Text format bitmask constants from Lexical
const IS_BOLD = 1
const IS_ITALIC = 2
const IS_UNDERLINE = 8
const IS_CODE = 16
const IS_STRIKETHROUGH = 4

function RenderText({ node }: { node: TextNode }) {
  let text: React.ReactNode = node.text

  const format = node.format || 0

  if (format & IS_BOLD) {
    text = <strong>{text}</strong>
  }
  if (format & IS_ITALIC) {
    text = <em>{text}</em>
  }
  if (format & IS_UNDERLINE) {
    text = <u>{text}</u>
  }
  if (format & IS_STRIKETHROUGH) {
    text = <s>{text}</s>
  }
  if (format & IS_CODE) {
    text = (
      <code
        className="font-mono text-sm px-1.5 py-0.5 rounded"
        style={{ backgroundColor: 'rgba(184,134,11,0.1)', color: '#b8860b' }}
      >
        {text}
      </code>
    )
  }

  return <>{text}</>
}

function RenderChildren({ children }: { children: LexicalNode[] }) {
  return (
    <>
      {children?.map((child, index) => (
        <RenderNode key={index} node={child} />
      ))}
    </>
  )
}

function RenderNode({ node }: { node: LexicalNode }) {
  switch (node.type) {
    case 'text':
      return <RenderText node={node} />

    case 'linebreak':
      return <br />

    case 'link':
      return (
        <a
          href={node.fields?.url || '#'}
          className="underline transition-colors hover:text-[#b8860b]"
          target={node.fields?.linkType === 'custom' ? '_blank' : undefined}
          rel={node.fields?.linkType === 'custom' ? 'noopener noreferrer' : undefined}
        >
          <RenderChildren children={node.children} />
        </a>
      )

    case 'paragraph':
      // Check if this paragraph only contains empty text
      const isEmpty = !node.children?.length ||
        (node.children.length === 1 &&
         node.children[0].type === 'text' &&
         !(node.children[0] as TextNode).text?.trim())

      if (isEmpty) {
        return <div className="h-4" />
      }

      return (
        <p className="text-lg leading-[1.9] mb-8" style={{ color: '#d4d4d4' }}>
          <RenderChildren children={node.children} />
        </p>
      )

    case 'heading':
      const HeadingTag = node.tag
      const headingStyles: Record<string, string> = {
        h1: 'font-display text-4xl mt-16 mb-8',
        h2: 'font-display text-3xl mt-16 mb-8',
        h3: 'font-display text-2xl mt-12 mb-6',
        h4: 'font-display text-xl mt-10 mb-4',
        h5: 'font-display text-lg mt-8 mb-4',
        h6: 'font-display text-base mt-6 mb-4',
      }
      return (
        <HeadingTag className={headingStyles[node.tag]} style={{ color: '#fafaf9' }}>
          <RenderChildren children={node.children} />
        </HeadingTag>
      )

    case 'list':
      if (node.listType === 'number') {
        return (
          <ol className="list-decimal list-inside mb-8 space-y-2" style={{ color: '#d4d4d4' }}>
            {node.children?.map((item, index) => (
              <li key={index} className="text-lg leading-[1.9]">
                <RenderChildren children={(item as ListItemNode).children} />
              </li>
            ))}
          </ol>
        )
      }
      return (
        <ul className="list-disc list-inside mb-8 space-y-2" style={{ color: '#d4d4d4' }}>
          {node.children?.map((item, index) => (
            <li key={index} className="text-lg leading-[1.9]">
              <RenderChildren children={(item as ListItemNode).children} />
            </li>
          ))}
        </ul>
      )

    case 'quote':
      return (
        <blockquote
          className="my-16 py-12 px-8 relative"
          style={{
            borderLeft: '3px solid #b8860b',
            backgroundColor: 'rgba(184,134,11,0.03)',
          }}
        >
          <div className="font-display text-2xl lg:text-3xl italic leading-relaxed" style={{ color: '#fafaf9' }}>
            <RenderChildren children={node.children} />
          </div>
        </blockquote>
      )

    case 'upload':
      if (node.value?.url) {
        return (
          <figure className="my-12">
            <img
              src={node.value.url}
              alt={node.value.alt || ''}
              className="w-full rounded"
            />
            {node.value.alt && (
              <figcaption className="mt-3 text-center text-sm" style={{ color: '#a1a1aa' }}>
                {node.value.alt}
              </figcaption>
            )}
          </figure>
        )
      }
      return null

    default:
      return null
  }
}

export function RichText({ content }: { content: LexicalContent | null | undefined }) {
  if (!content?.root?.children) {
    return null
  }

  return (
    <div className="rich-text">
      {content.root.children.map((node, index) => (
        <RenderNode key={index} node={node as LexicalNode} />
      ))}
    </div>
  )
}
