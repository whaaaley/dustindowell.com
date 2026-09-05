import { type SliderImage } from '~/components/gallery/Slider.tsx'
import { extractFrontmatter, parseMarkdown } from '~/hooks/useMarkdown.ts'
import { isRecord, readNumber, readString, slugFromPath, stripFrontmatter } from '~/utils/content.utils.ts'

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

const readImages = (value: unknown): SliderImage[] => {
  if (!Array.isArray(value)) {
    return []
  }
  return value.filter(isRecord).map(image => ({
    src: readString(image, 'src'),
    alt: readString(image, 'alt'),
  }))
}

const toProduct = (path: string, content: string): Product => {
  const data = extractFrontmatter(parseMarkdown(content))
  const frontmatter = isRecord(data) ? data : {}
  return {
    slug: slugFromPath(path),
    title: readString(frontmatter, 'title'),
    category: readString(frontmatter, 'category'),
    dates: readString(frontmatter, 'dates'),
    tagline: readString(frontmatter, 'tagline'),
    order: readNumber(frontmatter, 'order', Number.MAX_SAFE_INTEGER),
    images: readImages(frontmatter.images),
    body: stripFrontmatter(content).trim(),
  }
}

export const products: Product[] = Object.entries(files)
  .flatMap(([path, content]) => (typeof content === 'string' ? [toProduct(path, content)] : []))
  .sort((a, b) => a.order - b.order)

export const findProduct = (slug: string): Product | undefined => products.find(product => product.slug === slug)

export const productPath = (product: Product) => `/work/${product.slug}`
