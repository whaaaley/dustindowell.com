import { computed, type ComputedRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { type SidebarItem } from '~/components/SidebarDetailLayout'

// Shared driver for the Work, Open Source, and Personal pages.
// Each differs only in its data array, route name, and the noun it pages through, so the sidebar plus next/prev paging plus slug routing live here once.

// The minimum shape every list record must expose for the sidebar and routing to work.
type SidebarRecord = {
  slug: string
  category: string
  title: string
}

type SidebarDetail<Record> = {
  active: ComputedRef<Record | undefined>
  items: ComputedRef<SidebarItem[]>
  handleSelect: (slug: string) => void
  handleNext: () => void
  handlePrevious: () => void
}

export const useSidebarDetail = <Record extends SidebarRecord>(records: Record[], routeName: string): SidebarDetail<Record> => {
  const route = useRoute()
  const router = useRouter()

  const activeIndex = computed(() => {
    const found = records.findIndex(record => record.slug === route.params.slug)

    return found === -1 ? 0 : found
  })

  const active = computed(() => records[activeIndex.value])
  const items = computed(() => records.map(record => ({ id: record.slug, group: record.category, label: record.title })))

  const handleSelect = (slug: string) => {
    void router.push({ name: routeName, params: { slug } })
  }

  // Wrap around both ends so paging never lands on an empty index.
  const goTo = (index: number) => {
    const next = (index + records.length) % records.length
    const record = records[next]

    if (record) handleSelect(record.slug)
  }

  const handleNext = () => goTo(activeIndex.value + 1)
  const handlePrevious = () => goTo(activeIndex.value - 1)

  return { active, items, handleSelect, handleNext, handlePrevious }
}
