import { computed, defineComponent, onMounted, ref } from 'vue'
import { useTheme } from '~/hooks/useTheme'
import ThemeToggle from './ThemeToggle'

// Global footer shown on every page.
// Holds copyright, the light/dark theme toggle, and live page metrics.
export default defineComponent({
  name: 'SiteFooter',
  setup () {
    const { isLight, setLight } = useTheme()
    const kb = ref<number | null>(null)
    const ms = ref<number | null>(null)
    const year = new Date().getFullYear()

    // The toggle's active (moon) side is dark; flipping it off goes light.
    const themeActive = computed(() => !isLight.value)

    const handleToggle = (value: boolean) => {
      setLight(!value)
    }

    const metrics = computed(() => {
      const parts: string[] = []

      if (kb.value !== null) parts.push(`${kb.value} kB`)
      if (ms.value !== null) parts.push(`load time ${ms.value} ms`)

      return parts.join(' · ')
    })

    onMounted(() => {
      // performance is browser-only; onMounted never runs during SSG so this is safe at build time.
      const [nav] = performance.getEntriesByType('navigation')

      if (nav) {
        ms.value = Math.round(nav.loadEventEnd - nav.startTime)
        // transferSize is the over-the-wire byte count of the document.
        if (nav.transferSize > 0) kb.value = Math.round(nav.transferSize / 1024)
      }
    })

    return () => (
      <footer class='border-t border-zinc-800 transition-colors'>
        <div class='mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-t4 px-t6 py-t8 text-sm font-light text-zinc-400'>
          <span>© {year} Dustin Dowell</span>
          <ThemeToggle active={themeActive.value} data-testid='theme-toggle' size='sm' onUpdate:active={handleToggle}/>
          <span>{metrics.value || ' '}</span>
        </div>
      </footer>
    )
  },
})
