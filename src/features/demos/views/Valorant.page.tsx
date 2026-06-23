import { defineComponent } from 'vue'
import { env } from '~/env.ts'
import DemoContent from './DemoContent'

export default defineComponent({
  name: 'ValorantDemo',
  setup () {
    const info = {
      category: 'Web Apps',
      title: 'Valorant Blog',
      tagline: 'A flat-file CMS for editing a Valorant tips blog.',
      liveUrl: `${env.CLIENT_DEMOS_URL}/valorant-blog/editor`,
      views: [
        { label: 'Editor', src: `${env.CLIENT_DEMOS_URL}/valorant-blog/editor` },
        { label: 'Home', src: `${env.CLIENT_DEMOS_URL}/valorant-blog/`, zoom: '90' },
      ],
      repoUrl: 'https://github.com/dustin-demos/valorant-editor',
      aspect: 'tall' as const,
    }

    return () => (
      <DemoContent {...info}>
        <p class='text-zinc-300'>
          An online friend wanted a blog for Valorant tips, so in March 2021 I messed around with a small flat-file, JSON-based CMS for it, mostly for fun. I'd used CMSs like that before.
        </p>
        <p class='text-zinc-300'>
          I ended up spending all my time on the drag-and-drop editor and never finished the rest, so they never got the blog. Built with pocket and Superfine on an esbuild and sass toolchain.
        </p>
        <h2 class='text-2xl font-bold text-white'>How to use</h2>
        <p class='text-zinc-300'>
          The Editor lets you build the page: add sections, drag them to reorder, and add headings and text. The Home view shows how the resulting tips page renders.
        </p>
      </DemoContent>
    )
  },
})
