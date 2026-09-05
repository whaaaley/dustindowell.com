import { defineComponent } from 'vue'
import Wordmark from '~/components/brand/Wordmark.tsx'
import Markdown from '~/components/markdown/Markdown.tsx'
import { useSeo } from '~/hooks/useSeo.ts'

const links = '[Resume](/) ✦ [Work](/work) ✦ [GitHub](https://github.com/whaaaley) ✦ [LinkedIn](https://www.linkedin.com/in/dustindowell) ✦ [Bluesky](https://bsky.app/profile/whaleydev.bsky.social)'

export default defineComponent({
  name: 'LinksPage',
  setup () {
    useSeo({ title: 'Links', description: 'Links to Dustin Dowell, Software Engineer in Des Moines, Iowa.', noindex: true })

    return () => (
      <main class='flex min-h-screen items-center justify-center bg-black px-page-px text-white' data-testid='page-links'>
        <div class='markdown md:zoom-[2]'>
          <h1><Wordmark/></h1>
          <p>SOFTWARE ENGINEER</p>
          <nav aria-label='Links' class='text-zinc-300' data-testid='links-nav'>
            <Markdown content={links}/>
          </nav>
        </div>
      </main>
    )
  },
})
