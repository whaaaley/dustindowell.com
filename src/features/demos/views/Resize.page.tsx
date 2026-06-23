import { defineComponent } from 'vue'
import { env } from '~/env.ts'
import DemoContent from './DemoContent'

export default defineComponent({
  name: 'ResizeDemo',
  setup () {
    const info = {
      category: 'Web Apps',
      title: 'Resize',
      tagline: 'An aspect-ratio calculator I built for cropping and resizing art.',
      liveUrl: `${env.CLIENT_DEMOS_URL}/resize/`,
      repoUrl: 'https://github.com/dustin-demos/resize.gg',
    }

    return () => (
      <DemoContent {...info}>
        <p class='text-zinc-300'>
          An aspect-ratio calculator I built for myself in February 2021. Cropping art for my Instagram at odd canvas sizes, then resizing to a square or 8x10, meant doing the math by hand, so I made a tool to do it.
        </p>
        <p class='text-zinc-300'>
          Websites were trending larger and larger in 2021, so for personal projects I liked using microframeworks. This runs on pocket, a tiny one I wrote myself, built on Superfine.
        </p>
        <p class='text-zinc-300'>
          The build side was the same instinct. Webpack was heavy and Vite had only just come out, so I was all in on esbuild, writing my own plugins and running them through a little build server I made.
        </p>
        <h2 class='text-2xl font-bold text-white'>How to use</h2>
        <p class='text-zinc-300'>
          Enter a width and height to get the aspect ratio, then enter a new width or height to find the matching dimension that keeps the same ratio.
        </p>
      </DemoContent>
    )
  },
})
