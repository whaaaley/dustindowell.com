import { defineComponent } from 'vue'
import { env } from '~/env.ts'
import DemoContent from './DemoContent'

export default defineComponent({
  name: 'ReasonableDemo',
  setup () {
    const info = {
      category: 'Web Apps',
      title: 'Reasonable',
      tagline: 'A visual node editor for building workflows.',
      liveUrl: `${env.CLIENT_DEMOS_URL}/reasonable/editor`,
      views: [
        { label: 'Editor', src: `${env.CLIENT_DEMOS_URL}/reasonable/editor` },
        { label: 'Home', src: `${env.CLIENT_DEMOS_URL}/reasonable/` },
      ],
      repoUrl: 'https://github.com/dustin-demos/reasonable',
      repos: [
        { url: 'https://github.com/dustin-demos/reasonable', label: 'GitHub' },
        { url: 'https://github.com/dustin-demos/reasonable-backup', label: 'GitHub (Original)' },
      ],
      aspect: 'tall' as const,
      bg: 'white' as const,
    }

    return () => (
      <DemoContent {...info}>
        <p class='text-zinc-300'>
          In October 2023 everyone was talking about AI workflows, but there weren't many stable tools for building them, so I started a proof of concept of my own, with the idea of running each workflow by topological sort over the node graph.
        </p>
        <p class='text-zinc-300'>
          The real focus was the interface, which I built entirely from scratch in Vue 3 and Vite. The dragging, moving nodes around the canvas, and the SVG connections between them were all written by me.
        </p>
        <h2 class='text-2xl font-bold text-white'>How to use</h2>
        <p class='text-zinc-300'>
          It runs entirely client-side, with the workflow run simulated so you can see the flow. Drag to pan, scroll to zoom, and Run Workflow to step through the nodes. The Show Data button reveals the node, handle, and edge state.
        </p>
      </DemoContent>
    )
  },
})
