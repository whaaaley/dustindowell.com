import { defineComponent } from 'vue'
import DemoContent from './DemoContent'

export default defineComponent({
  name: 'AmazonPriceCheckDemo',
  setup () {
    const info = {
      category: 'Web Apps',
      title: 'Amazon Price Check',
      tagline: 'Look up an Amazon product by ASIN and see its current price.',
      liveUrl: 'https://amzn-price-check.fly.dev/',
      repoUrl: 'https://github.com/dustin-demos/amazon-price-check',
      aspect: 'landscape' as const,
    }

    return () => (
      <DemoContent {...info}>
        <p class='text-zinc-300'>
          A price tracker I built in August 2021 with pocket and Superfine, originally deployed on Vercel. You give it an Amazon product by ASIN and it retrieves the current price. It saved each price check to a database, but that backend is no longer running, so the history no longer persists. It also used to find the price through a search engine, and for the demo it goes straight to Amazon instead.
        </p>
      </DemoContent>
    )
  },
})
