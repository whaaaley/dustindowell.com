import { useHead } from '@unhead/vue'
import { computed, defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SidebarDetailLayout, { type SidebarItem } from '~/components/SidebarDetailLayout'
import TagList from '~/components/TagList'
import { useArticles } from '~/hooks/useArticles'
import { renderMdast } from '~/hooks/useMarkdown'

// Blog page: a sidebar lists posts grouped by year; selecting one shows the article.
// Next/prev buttons (bottom-right) let visitors page through posts in date order.
// Articles arrive sorted newest-first, so index 0 is the most recent post.
// First-seen grouping over that order yields newest-year-first headings.

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default defineComponent({
  name: 'BlogPage',
  setup () {
    const route = useRoute()
    const router = useRouter()
    const { articles } = useArticles()

    useHead({ title: 'Blog | Dustin Dowell' })

    const activeIndex = computed(() => {
      const slug = route.params.slug
      const found = articles.value.findIndex(([s]) => s === slug)
      return found === -1 ? 0 : found
    })

    const active = computed(() => articles.value[activeIndex.value])

    const items = computed<SidebarItem[]>(() => articles.value.map(([slug, entry]) => ({
      id: slug,
      group: new Date(entry.metadata.date).getFullYear().toString(),
      label: entry.metadata.title,
    })))

    const handleNavigate = (index: number) => {
      const count = articles.value.length
      if (count === 0) return

      const next = (index + count) % count
      const entry = articles.value[next]
      if (entry) void router.push({ name: 'article', params: { slug: entry[0] } })
    }

    const handleSelect = (slug: string) => {
      void router.push({ name: 'article', params: { slug } })
    }

    return () => {
      const current = active.value
      if (!current) return null

      const [activeSlug, article] = current
      const { metadata, mdast } = article

      return (
        <SidebarDetailLayout
          activeId={activeSlug}
          items={items.value}
          nounLabel='post'
          onNext={() => handleNavigate(activeIndex.value + 1)}
          onPrevious={() => handleNavigate(activeIndex.value - 1)}
          onSelect={handleSelect}
        >
          <div class='grid gap-t6'>
            <div class='grid gap-t2'>
              <p class='text-sm font-bold uppercase tracking-wider text-brand-blurple'>Blog</p>
              <h1 class='text-4xl font-bold text-white'>{metadata.title}</h1>
              <p class='text-sm text-zinc-400'>{formatDate(metadata.date)}</p>
              <TagList tags={metadata.tags}/>
            </div>
            <div class='markdown max-w-4xl'>
              {renderMdast(mdast)}
            </div>
          </div>
        </SidebarDetailLayout>
      )
    }
  },
})
