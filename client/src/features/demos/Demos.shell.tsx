import { useHead } from '@unhead/vue'
import { computed, defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import { demoLinks } from './demoLinks.ts'
import NavSection from '~/components/NavSection'

// Shell for the demos section: a sidebar of demo RouterLinks (grouped by category)
// plus a RouterView for the active demo page. Active state comes from the router.
export default defineComponent({
  name: 'DemosShell',
  setup () {
    useHead({ title: 'Demos | Dustin Dowell' })

    const sections = computed(() => {
      const groups: Record<string, { to: string, label: string, month: string }[]> = {}
      const order: string[] = []
      for (const link of demoLinks) {
        if (!groups[link.year]) {
          groups[link.year] = []
          order.push(link.year)
        }
        groups[link.year].push({ to: link.route, label: link.title, month: link.month })
      }
      return order.map(year => ({ year, links: groups[year] }))
    })

    return () => (
      <div class='mx-auto flex w-full max-w-7xl gap-t12 px-t6 py-t12'>
        <aside class='w-60 shrink-0'>
          <div class='grid gap-t8'>
            {sections.value.map(section => (
              <NavSection key={section.year} label={section.year} links={section.links}/>
            ))}
          </div>
        </aside>
        <section class='min-w-0 flex-1'>
          <RouterView/>
        </section>
      </div>
    )
  },
})
