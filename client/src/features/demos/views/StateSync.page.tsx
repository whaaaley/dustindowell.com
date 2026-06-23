import { defineComponent } from 'vue'
import { env } from '~/env.ts'
import DemoContent from './DemoContent'

export default defineComponent({
  name: 'StateSyncDemo',
  setup () {
    const info = {
      category: 'Web Apps',
      title: 'State Sync',
      tagline: 'A proof of concept for syncing state across differently-sized frames over a broadcast channel.',
      liveUrl: `${env.CLIENT_DEMOS_URL}/state-sync/`,
      repoUrl: 'https://github.com/dustin-demos/state-sync-demo',
      zoom: '75' as const,
    }

    return () => (
      <DemoContent {...info}>
        <p class='text-zinc-300'>
          A proof of concept I built in February 2021. At the time I was using design tools that show a site at several sizes at once and sync interactions between the previews, but they ran everything through a server and felt sluggish because of it.
        </p>
        <p class='text-zinc-300'>
          I figured there ought to be a better way to keep those previews in sync, so I tried using a broadcast channel to share events between iframes directly. It worked great, but I never built it out, so it stayed a proof of concept.
        </p>
        <p class='text-zinc-300'>
          Like my other personal projects from this era, it runs on pocket and Superfine rather than a larger framework.
        </p>

      </DemoContent>
    )
  },
})
