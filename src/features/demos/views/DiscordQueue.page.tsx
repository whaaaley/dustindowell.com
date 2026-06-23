import { defineComponent } from 'vue'
import { env } from '~/env.ts'
import DemoContent from './DemoContent'

export default defineComponent({
  name: 'DiscordQueueDemo',
  setup () {
    const info = {
      category: 'Web Apps',
      title: 'Discord Message Queue',
      tagline: 'Queue chat messages and send them on a timer.',
      liveUrl: `${env.CLIENT_DEMOS_URL}/discord-queue/`,
      repoUrl: 'https://github.com/dustin-demos/discord-message-queue',
    }

    return () => (
      <DemoContent {...info}>
        <p class='text-zinc-300'>
          A Twitch community I was part of in December 2020 had a Discord bot that handed out points for chatting. I built this to schedule messages: you point it at a channel, queue some up, and it sends them on a timer. Built with pocket and Superfine.
        </p>
        <h2 class='text-2xl font-bold text-white'>How to use</h2>
        <p class='text-zinc-300'>
          You supply your own Discord token and a channel ID, then queue some messages and set the interval to drip them out over time. The token stays in your browser and is sent straight to Discord, but treat it like a password if you try it.
        </p>
      </DemoContent>
    )
  },
})
