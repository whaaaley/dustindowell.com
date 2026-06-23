// CodePen created: 2015-03-28
import { PhCodepenLogo } from '@phosphor-icons/vue'
import { defineComponent } from 'vue'
import { env } from '~/env.ts'
import DemoContent from './DemoContent'

export default defineComponent({
  name: 'IosChatBubblesDemo',
  setup () {
    const info = {
      category: 'CodePen',
      title: 'iOS Chat Bubbles',
      tagline: 'CSS iOS-style chat bubbles as a Sass mixin.',
      liveUrl: `${env.CLIENT_DEMOS_URL}/codepen/ios-chat-bubbles/`,
      repos: [
        { url: 'https://codepen.io/dustindowell/pen/GgeWep', label: 'CodePen', icon: PhCodepenLogo },
      ],
      aspect: 'landscape' as const,
      stats: [
        { created: '2015-03-28', loves: 67, views: 7084 },
      ],
      statsUpdated: '2026-06-21',
    }

    return () => (
      <DemoContent {...info}/>
    )
  },
})
