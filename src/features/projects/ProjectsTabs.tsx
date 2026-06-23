import { computed, defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Button from '~/components/form/Button'

// Shared tab bar across the Work, Open Source, and Demos child routes.
// Styled like onclick's table FilterTabs: a row of ghost buttons sized up for page tabs.
// Active tab keeps the ghost hover background; selecting one navigates to that section's index route.

type ProjectTab = { label: string, route: string, prefixes: string[] }

const tabs: ProjectTab[] = [
  { label: 'Work', route: 'work-index', prefixes: ['work-index', 'work-project'] },
  // Hidden until there's enough open source work to show.
  // { label: 'Open Source', route: 'open-source', prefixes: ['open-source'] },
  { label: 'Demos', route: 'demos', prefixes: ['demos', 'demo-'] },
  { label: 'Personal', route: 'personal', prefixes: ['personal'] },
]

export default defineComponent({
  name: 'ProjectsTabs',
  setup () {
    const route = useRoute()
    const router = useRouter()

    const matchesTab = (tab: ProjectTab) => {
      const name = String(route.name ?? '')

      return tab.prefixes.some(prefix => name === prefix || name.startsWith(prefix))
    }

    const colors = computed(() => Object.fromEntries(
      tabs.map(tab => [tab.label, matchesTab(tab) ? 'primary' : 'ghost']),
    ))

    const handleSelect = (tab: ProjectTab) => {
      void router.push({ name: tab.route })
    }

    return () => (
      <div class='flex gap-t2'>
        {tabs.map(tab => (
          <Button key={tab.label} color={colors.value[tab.label]} size='sm' onClick={() => handleSelect(tab)}>
            {tab.label}
          </Button>
        ))}
      </div>
    )
  },
})
