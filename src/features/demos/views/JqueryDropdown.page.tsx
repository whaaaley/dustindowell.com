// CodePen created: 2015-03-08
import { PhCodepenLogo } from '@phosphor-icons/vue'
import { defineComponent } from 'vue'
import { env } from '~/env.ts'
import DemoContent from './DemoContent'

export default defineComponent({
  name: 'JqueryDropdownDemo',
  setup () {
    const info = {
      category: 'CodePen',
      title: 'jQuery Dropdown Menu',
      tagline: 'A nested dropdown menu plugin built with jQuery.',
      liveUrl: `${env.CLIENT_DEMOS_URL}/codepen/nested-jquery-dropdown/`,
      repos: [
        { url: 'https://codepen.io/dustindowell/pen/YPOeed', label: 'CodePen', icon: PhCodepenLogo },
      ],
      aspect: 'square' as const,
      stats: [
        { created: '2015-03-25', loves: 0, views: 0 },
      ],
      statsUpdated: '2026-06-21',
    }

    return () => (
      <DemoContent {...info}>
        <p class='text-zinc-300'>
          I was learning jQuery in March 2015 (it was what everyone was using) and became obsessed with building a really good menu system. I had looked at a lot of them and didn't like any of them. I still don't like hover menus.
        </p>
        <p class='text-zinc-300'>
          So I built my own as a jQuery plugin. I didn't really have a concept of state management at the time, so on every click it would surgically reset everything (siblings, cousins, children) by stripping a CSS class. The DOM was the state. I even extended jQuery with custom selectors to make the traversal readable: <code class='rounded bg-zinc-800 px-1 font-mono text-sm text-zinc-300'>cousins</code>, <code class='rounded bg-zinc-800 px-1 font-mono text-sm text-zinc-300'>piblings</code>, and <code class='rounded bg-zinc-800 px-1 font-mono text-sm text-zinc-300'>niblings</code>. It was one of the first real libraries I built, and a big learning step.
        </p>
        <p class='text-zinc-300'>
          The template was originally written in Jade, which later became Pug.
        </p>
      </DemoContent>
    )
  },
})
