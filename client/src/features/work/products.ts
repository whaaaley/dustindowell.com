import { type SliderImage } from '~/components/gallery/Slider.tsx'
import { extractFrontmatter, parseMarkdown } from '~/hooks/useMarkdown.ts'

export type Product = {
  slug: string
  title: string
  category: string
  dates: string
  tagline: string
  order: number
  images: SliderImage[]
  body: string
}

const files = import.meta.glob('./products/*.md', { query: '?raw', import: 'default', eager: true })

const isRecord = (value: unknown): value is Record<string, unknown> => (
  typeof value === 'object' && value !== null
)

const readString = (data: Record<string, unknown>, key: string): string => {
  const value = data[key]
  return typeof value === 'string' ? value : ''
}

const readImages = (value: unknown): SliderImage[] => {
  if (!Array.isArray(value)) {
    return []
  }
  return value.filter(isRecord).map(image => ({
    src: readString(image, 'src'),
    alt: readString(image, 'alt'),
  }))
}

const stripFrontmatter = (content: string) => content.replace(/^---\n[\s\S]*?\n---\n/, '')

const toProduct = (path: string, content: string): Product => {
  const data = extractFrontmatter(parseMarkdown(content))
  const frontmatter = isRecord(data) ? data : {}
  const order = frontmatter.order
  return {
    slug: path.replace(/^.*\//, '').replace(/\.md$/, ''),
    title: readString(frontmatter, 'title'),
    category: readString(frontmatter, 'category'),
    dates: readString(frontmatter, 'dates'),
    tagline: readString(frontmatter, 'tagline'),
    order: typeof order === 'number' ? order : Number.MAX_SAFE_INTEGER,
    images: readImages(frontmatter.images),
    body: stripFrontmatter(content).trim(),
  }
}

export const products: Product[] = Object.entries(files)
  .flatMap(([path, content]) => (typeof content === 'string' ? [toProduct(path, content)] : []))
  .sort((a, b) => a.order - b.order)

export const findProduct = (slug: string): Product | undefined => products.find(product => product.slug === slug)

export const productPath = (product: Product) => `/work/${product.slug}`
