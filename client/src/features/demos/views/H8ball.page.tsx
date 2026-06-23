import { defineComponent } from 'vue'
import { env } from '~/env.ts'
import DemoContent from './DemoContent'

export default defineComponent({
  name: 'H8ballDemo',
  setup () {
    const info = {
      category: 'Web Apps',
      title: 'h8ball',
      tagline: 'A magic eight-ball that will destroy your hopes and dreams.',
      liveUrl: `${env.CLIENT_DEMOS_URL}/h8ball/`,
      repoUrl: 'https://github.com/dustin-demos/h8ball',
    }

    return () => (
      <DemoContent {...info}>
        <p class='text-zinc-300'>
          A magic eight-ball I first committed in February 2018 using Hyperapp 1.2.9. I wrote the code while showing my non-developer friend Kellyn how it works. She came up with most of the prompts and ideas.
        </p>
        <p class='text-zinc-300'>
          Websites were trending larger and larger in 2018, so for personal projects I liked using microframeworks. This project runs on Hyperapp 1.2.9, loaded from a CDN.
        </p>

      </DemoContent>
    )
  },
})
