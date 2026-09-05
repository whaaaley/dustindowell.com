import { defineComponent } from 'vue'
import Markdown from '~/components/markdown/Markdown.tsx'
import { useSeo } from '~/hooks/useSeo.ts'
import { nav } from '~/layouts/Website.layout.tsx'

const content = [
  '# Dustin Dowell',
  '',
  'SOFTWARE ENGINEER',
  '',
  nav,
].join('\n')

export default defineComponent({
  name: 'HomePage',
  setup () {
    useSeo({ title: 'Dustin Dowell', description: 'Software Engineer in Des Moines, Iowa.', noindex: true })

    return () => (
      <main class='flex min-h-screen items-center justify-center bg-black px-page-px text-white' data-testid='page-home'>
        <div class='md:zoom-[2] [&_.markdown_p+p]:text-zinc-300'>
          <Markdown content={content}/>
        </div>
      </main>
    )
  },
})
