import { defineComponent } from 'vue'
import { env } from '~/env.ts'
import DemoContent from './DemoContent'

export default defineComponent({
  name: 'DvdDemo',
  setup () {
    const info = {
      category: 'Web Apps',
      title: 'DVD Video',
      tagline: 'The bouncing DVD-logo screensaver, no JavaScript involved.',
      liveUrl: `${env.CLIENT_DEMOS_URL}/dvd/`,
      repoUrl: 'https://github.com/dustin-demos/client-demos-container/tree/main/demos/orphans/dvd',
      aspect: 'wide' as const,
    }

    return () => (
      <DemoContent {...info}>
        <p class='text-zinc-300'>
          A bouncing DVD-logo screensaver I made in February 2019 for a Twitch streamer who wanted one and couldn't find a version that just worked.
        </p>
        <p class='text-zinc-300'>
          It's just a couple of keyframe animations and nothing else, which makes it about as hard to break as a web page gets.
        </p>

      </DemoContent>
    )
  },
})
