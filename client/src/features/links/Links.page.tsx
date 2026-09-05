import { defineComponent } from 'vue'
import RevealContact from '~/components/contact/RevealContact.tsx'
import Markdown from '~/components/markdown/Markdown.tsx'
import { useSeo } from '~/hooks/useSeo.ts'

const heading = [
  '# Dustin Dowell',
  '',
  'SOFTWARE ENGINEER',
].join('\n')

const links = [
  '[Resume](/) ✦ [Work](/work) ✦ [Download Resume](/dustin-dowell-resume.pdf)',
  '',
  '[onclick.coop](https://onclick.coop) ✦ [GitHub](https://github.com/whaaaley) ✦ [LinkedIn](https://www.linkedin.com/in/dustindowell) ✦ [Bluesky](https://bsky.app/profile/whaleydev.bsky.social)',
].join('\n')

const star = () => <>{' '}<span class='star'>✦</span>{String.fromCharCode(160)}</>

export default defineComponent({
  name: 'LinksPage',
  setup () {
    useSeo({ title: 'Links', description: 'Links to Dustin Dowell, Software Engineer in Des Moines, Iowa.', noindex: true })

    return () => (
      <main class='flex min-h-screen items-center justify-center bg-black px-page-px text-white' data-testid='page-links'>
        <div class='grid md:zoom-[2]'>
          <Markdown content={heading}/>
          <div class='markdown text-zinc-300' data-testid='links-contact'>
            <p>
              Des Moines, Iowa
              {star()}
              <RevealContact encoded='ZHVzdGluZG93ZWxsMjJAZ21haWwuY29t' kind='email' label='Show Email'/>
              {star()}
              <RevealContact encoded='NTE1LTY4OS01NjQ4' encodedHref='KzE1MTU2ODk1NjQ4' kind='phone' label='Show Phone'/>
            </p>
          </div>
          <div class='pt-page-half text-zinc-300'>
            <Markdown content={links}/>
          </div>
        </div>
      </main>
    )
  },
})
