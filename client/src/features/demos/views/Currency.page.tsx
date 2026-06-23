import { defineComponent } from 'vue'
import { env } from '~/env.ts'
import DemoContent from './DemoContent'

export default defineComponent({
  name: 'CurrencyDemo',
  setup () {
    const info = {
      category: 'Web Apps',
      title: 'Currency Exchange',
      tagline: 'A currency converter I built as a job-application code challenge.',
      liveUrl: `${env.CLIENT_DEMOS_URL}/currency/`,
      repoUrl: 'https://github.com/dustin-demos/currency',
      aspect: 'landscape' as const,
    }

    return () => (
      <DemoContent {...info}>
        <p class='text-zinc-300'>
          I built this in May 2021 as a job-application code challenge, so I used the standard stack, Vue 3 with a plain Vite build. It fetches live exchange rates from the client using the Swop API, which has a free dev tier.
        </p>

      </DemoContent>
    )
  },
})
