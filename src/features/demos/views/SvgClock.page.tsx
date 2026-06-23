// CodePen created: 2016-01-01
import { PhCodepenLogo } from '@phosphor-icons/vue'
import { defineComponent } from 'vue'
import { env } from '~/env.ts'
import DemoContent from './DemoContent'

export default defineComponent({
  name: 'SvgClockDemo',
  setup () {
    const info = {
      category: 'CodePen',
      title: 'SVG Digital Clock',
      tagline: 'A digital clock with digits drawn in Illustrator, exported to SVG, and scripted with JavaScript.',
      liveUrl: `${env.CLIENT_DEMOS_URL}/codepen/svg-digital-clock/`,
      repos: [
        { url: 'https://codepen.io/dustindowell/pen/rxjxVp', label: 'CodePen', icon: PhCodepenLogo },
      ],
      aspect: 'landscape' as const,
      stats: [
        { created: '2016-01-01', loves: 15, views: 2241 },
      ],
      statsUpdated: '2026-06-21',
    }

    return () => (
      <DemoContent {...info}/>
    )
  },
})
