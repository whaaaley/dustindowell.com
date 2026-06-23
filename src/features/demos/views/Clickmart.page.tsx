import { defineComponent } from 'vue'
import { env } from '~/env.ts'
import DemoContent from './DemoContent'

export default defineComponent({
  name: 'ClickmartDemo',
  setup () {
    const info = {
      category: 'Web Apps',
      title: 'Clickmart',
      tagline: 'A mock storefront UI with departments, a market, and a carousel.',
      liveUrl: `${env.CLIENT_DEMOS_URL}/clickmart/`,
      repoUrl: 'https://github.com/dustin-demos/clickm.art',
      aspect: 'tall' as const,
    }

    return () => (
      <DemoContent {...info}>
        <p class='text-zinc-300'>
          A mock storefront I built in July 2021 while working at Alqen, a store-automation platform. It has a department sidebar, a product market, a carousel, and account pages, all front-end scaffolding with no backend. Built on my own pocket framework with Superfine and an esbuild + sass toolchain.
        </p>

      </DemoContent>
    )
  },
})
