// CodePen created: 2016-09-23
import { PhCodepenLogo } from '@phosphor-icons/vue'
import { defineComponent } from 'vue'
import { env } from '~/env.ts'
import DemoContent from './DemoContent'

export default defineComponent({
  name: 'EmojiDemo',
  setup () {
    const info = {
      category: 'CodePen',
      title: 'Crying Emoji',
      tagline: 'A big crying-face emoji, shapes and gradients only.',
      liveUrl: `${env.CLIENT_DEMOS_URL}/codepen/emoji/`,
      repos: [
        { url: 'https://codepen.io/dustindowell/pen/XjMMQo', label: 'CodePen', icon: PhCodepenLogo },
      ],
      aspect: 'landscape' as const,
      stats: [
        { created: '2016-09-23', loves: 0, views: 50 },
      ],
      statsUpdated: '2026-06-21',
    }

    return () => (
      <DemoContent {...info}/>
    )
  },
})
