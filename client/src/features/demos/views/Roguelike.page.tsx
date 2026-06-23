import { defineComponent } from 'vue'
import { env } from '~/env.ts'
import DemoContent from './DemoContent'

export default defineComponent({
  name: 'RoguelikeDemo',
  setup () {
    const info = {
      category: 'Games',
      title: 'Roguelike',
      tagline: 'A Vue-powered web roguelike built with friends in 2016.',
      liveUrl: `${env.CLIENT_DEMOS_URL}/roguelike/`,
      repoUrl: 'https://github.com/dustin-demos/roguelike',
    }

    return () => (
      <DemoContent {...info}>
        <p class='text-zinc-300'>
          A web roguelike I first committed in October 2016, built with my friends Brandon and Connor just for fun: Brandon knew roguelikes, I knew Vue, and we never really expected to finish it.
        </p>
        <p class='text-zinc-300'>
          Built with Vue 2.0.1, loaded from a CDN and released just weeks earlier. The build ran on gulp and browserify, which was the popular way to bundle in 2016.
        </p>
        <h2 class='text-2xl font-bold text-white'>How to use</h2>
        <p class='text-zinc-300'>
          Click the game so it has keyboard focus, then use the up, down, left, and right arrow keys to move. The '@' is you. Walls block movement. Each load generates a fresh map, so refresh for a new layout.
        </p>
      </DemoContent>
    )
  },
})
