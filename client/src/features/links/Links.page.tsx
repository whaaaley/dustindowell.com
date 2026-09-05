import { defineComponent } from 'vue'
import Markdown from '~/components/markdown/Markdown.tsx'
import { useSeo } from '~/hooks/useSeo.ts'

const content = [
  '# Dustin Dowell',
  '',
  'SOFTWARE ENGINEER',
  '',
  '[Resume](/) ✦ [Work](/work) ✦ [Download Resume](/dustin-dowell-resume.pdf) ✦ [GitHub](https://github.com/whaaaley) ✦ [LinkedIn](https://www.linkedin.com/in/dustindowell)',
].join('\n')

export default defineComponent({
  name: 'LinksPage',
  setup () {
    useSeo({ title: 'Links', description: 'Links to Dustin Dowell, Software Engineer in Des Moines, Iowa.', noindex: true })

    return () => (
      <main class='flex min-h-screen items-center justify-center bg-black px-page-px text-white' data-testid='page-links'>
        <div class='md:zoom-[2] [&_.markdown_p+p]:text-zinc-300'>
          <Markdown content={content}/>
        </div>
      </main>
    )
  },
})
