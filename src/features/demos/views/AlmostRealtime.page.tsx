import { defineComponent } from 'vue'
import DemoContent from './DemoContent'

export default defineComponent({
  name: 'AlmostRealtimeDemo',
  setup () {
    return () => (
      <DemoContent
        category='Web Apps'
        liveUrl='https://almost-realtime-chat.fly.dev/'
        repoUrl='https://github.com/dustin-demos/almost-realtime-chat-container'
        tagline='A chat app using HTTP to send messages and SSE to sync them from server to client.'
        title='Almost Realtime'
      >
        <p class='text-zinc-300'>
          A small group chat I built in February 2019. Messages are sent over plain HTTP POST. The message and client lists are pushed back to every connected browser over Server-Sent Events.
        </p>
        <p class='text-zinc-300'>
          The server (Node, micro) pinned Node 10.15.0 and was effectively finished within a week. It was originally deployed on Netlify and Heroku's free tier.
        </p>

      </DemoContent>
    )
  },
})
