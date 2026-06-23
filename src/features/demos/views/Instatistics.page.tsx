import { defineComponent } from 'vue'
import { env } from '~/env.ts'
import DemoContent from './DemoContent'

export default defineComponent({
  name: 'InstatisticsDemo',
  setup () {
    const info = {
      category: 'Web Apps',
      title: 'Instatistics',
      tagline: 'Instagram hashtag combination analytics to maximize post reach.',
      liveUrl: `${env.CLIENT_DEMOS_URL}/instatistics/overview`,
      views: [
        { label: 'Overview', src: `${env.CLIENT_DEMOS_URL}/instatistics/overview` },
        { label: 'Hashtags', src: `${env.CLIENT_DEMOS_URL}/instatistics/hashtags` },
        { label: 'Sources', src: `${env.CLIENT_DEMOS_URL}/instatistics/sources` },
        { label: 'Landing', src: `${env.CLIENT_DEMOS_URL}/instatistics/` },
      ],
      repoUrl: 'https://github.com/dustin-demos/insights',
      aspect: 'landscape' as const,
    }

    return () => (
      <DemoContent {...info}>
        <p class='text-zinc-300'>
          An Instagram analytics dashboard I built between March and June 2021. I have a personal art account, and hashtags used to be the primary way to grow an account on Instagram. I wanted to find hashtag combinations with the most reach and least overlap. Originally I was doing analysis in Google Sheets with Apps Script. It was difficult to make updates and maintain.
        </p>
        <p class='text-zinc-300'>
          I turned those spreadsheet scripts into an app. I would import my Instagram posts and cross-reference every pair of posts that share a hashtag to compute an average reach per combination. The Hashtags view ranks them so I would copy the best set directly into my next post.
        </p>
        <p class='text-zinc-300'>
          Originally deployed on Netlify. I built it with pocket and Superfine, my hand-rolled micro-framework, and the line chart is something I wrote myself using SVG.
        </p>
        <h2 class='text-2xl font-bold text-white'>How to use</h2>
        <p class='text-zinc-300'>
          Go to Sources and click "Load Sample Data" to populate the app with example posts. From there, go to Hashtags to see the combination rankings. Click any tag in the table to add it to your selected set, then use the Copy button to copy the full set to your clipboard.
        </p>
      </DemoContent>
    )
  },
})
