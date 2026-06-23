// CodePen created: 2016-09-16
import { PhCodepenLogo } from '@phosphor-icons/vue'
import { defineComponent } from 'vue'
import { env } from '~/env.ts'
import DemoContent from './DemoContent'

export default defineComponent({
  name: 'VuePaginationDemo',
  setup () {
    const info = {
      category: 'CodePen',
      title: 'Vue Pagination',
      tagline: 'A pagination component built with Vue.',
      liveUrl: `${env.CLIENT_DEMOS_URL}/codepen/vue-pagination/`,
      repos: [
        { url: 'https://codepen.io/dustindowell/pen/wzWeLp', label: 'CodePen', icon: PhCodepenLogo },
      ],
      aspect: 'landscape' as const,
      stats: [
        { created: '2016-09-16', loves: 15, views: 4880 },
      ],
      statsUpdated: '2026-06-21',
    }

    return () => (
      <DemoContent {...info}>
        <p class='text-zinc-300'>
          I was helping someone understand how pagination could work in Vue 2, so I built this in September 2016 to walk them through it. Vue 2 was brand new at the time. This was built with 2.0.0-rc.7.
        </p>
      </DemoContent>
    )
  },
})
