// CodePen created: 2014-12-17
import { PhCodepenLogo } from '@phosphor-icons/vue'
import { defineComponent } from 'vue'
import { env } from '~/env.ts'
import DemoContent from './DemoContent'

export default defineComponent({
  name: 'MessengerDemo',
  setup () {
    const info = {
      category: 'CodePen',
      title: 'Messenger CSS',
      tagline: 'A recreation of the Messenger chat UI.',
      liveUrl: `${env.CLIENT_DEMOS_URL}/codepen/messenger/`,
      repos: [
        { url: 'https://codepen.io/dustindowell/pen/ZYOeVZ', label: 'CodePen', icon: PhCodepenLogo },
      ],
      aspect: 'landscape' as const,
      bg: 'white' as const,
      stats: [
        { created: '2014-12-17', loves: 11, views: 2659 },
      ],
      statsUpdated: '2026-06-21',
    }

    return () => (
      <DemoContent {...info}>
        <p class='text-zinc-300'>
          A recreation of the Messenger interface I built in December 2014, down to the bubble shapes and tails. The conversation in it is a real one I had with an old friend.
        </p>
      </DemoContent>
    )
  },
})
