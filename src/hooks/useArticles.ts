import { kebabCase } from 'change-case'
import nlp from 'compromise/one'
import { type Root } from 'mdast'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { z } from 'zod'
import { extractFrontmatter, parseMarkdown } from '~/hooks/useMarkdown'

const frontmatterSchema = z.object({
  title: z.string(),
  date: z.string(),
  author: z.string(),
  tags: z.array(z.string()),
})

const articleSchema = z.object({
  mdast: z.custom<Root>(),
  metadata: frontmatterSchema.extend({
    wordCount: z.number(),
    readingTime: z.number(),
    slug: z.string(),
  }),
})

export type Article = z.infer<typeof articleSchema>
export type Metadata = Article['metadata']

type Articles = (readonly [string, Article])[]

const articles = ref<Articles>([])
let loaded = false

export const loadArticles = async () => {
  const modules = import.meta.glob<string>('../features/blog/articles/*.md', { query: '?raw', import: 'default' })

  const entries = Object.entries(modules)
  const contents = await Promise.all(entries.map(([, fn]) => fn()))

  return entries.map((_, index) => {
    const content = contents[index]

    if (!content) {
      throw new Error('No content found for the requested path')
    }

    const mdast = parseMarkdown(content)
    const frontmatter = extractFrontmatter(mdast)
    const validFrontmatter = frontmatterSchema.parse(frontmatter)
    const slug = kebabCase(validFrontmatter.title)

    const doc = nlp(content)
    const wordCount = doc.wordCount()
    const readingTime = Math.ceil(wordCount / 200)

    const validArticle = articleSchema.parse({
      mdast,
      metadata: {
        ...validFrontmatter,
        slug,
        wordCount,
        readingTime,
      },
    })

    return [slug, validArticle] as const
  })
}

export const ensureArticlesLoaded = async () => {
  // Articles already loaded
  if (loaded) {
    return
  }

  const loadedArticles = await loadArticles()
  loadedArticles.sort(([, a], [, b]) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime())
  articles.value = loadedArticles
  loaded = true
}

export const useArticles = () => {
  const route = useRoute()

  const currentArticle = computed(() => {
    const slug = route.params.slug
    const article = articles.value.find(([s]) => s === slug)

    if (!article) {
      return null
    }

    return article[1]
  })

  const currentMdast = computed(() => currentArticle.value?.mdast)
  const currentMetadata = computed(() => currentArticle.value?.metadata)

  return {
    articles,

    currentArticle,
    currentMdast,
    currentMetadata,
  }
}
