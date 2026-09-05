import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import RevealContact from '~/components/contact/RevealContact.tsx'
import Markdown from '~/components/markdown/Markdown.tsx'

const header = [
  '# [Dustin Dowell](/)',
  '',
  'SOFTWARE ENGINEER',
].join('\n')

const nav = '[Resume](/) ✦ [Work](/work) ✦ [Download PDF](/dustin-dowell-resume.pdf)'

const footer = `© ${new Date().getFullYear()} Dustin Dowell ✦ [Third-party licenses](/licenses)`

const star = () => <>{' '}<span class='star'>✦</span>{String.fromCharCode(160)}</>

export default defineComponent({
  name: 'WebsiteLayout',
  setup () {
    return () => (
      <div class='mx-auto grid min-h-screen w-full max-w-page grid-rows-[auto_1fr_auto] gap-page-line px-page-px pt-page-pt pb-page-pb'>
        <header class='flex flex-wrap items-end justify-between gap-x-page-line gap-y-page-half' data-testid='site-header'>
          <div class='grid'>
            <Markdown content={header}/>
            <div class='markdown text-zinc-300 print:text-zinc-600' data-testid='site-contact'>
              <p>
                Des Moines, Iowa
                {star()}
                <RevealContact encoded='ZHVzdGluZG93ZWxsMjJAZ21haWwuY29t' kind='email' label='Show email'/>
                {star()}
                <RevealContact encoded='NTE1LTY4OS01NjQ4' encodedHref='KzE1MTU2ODk1NjQ4' kind='phone' label='Show phone'/>
              </p>
            </div>
          </div>
          <nav aria-label='Site' class='text-zinc-300 print:hidden' data-testid='site-nav'>
            <Markdown content={nav}/>
          </nav>
        </header>
        <main data-testid='site-main'>
          <RouterView/>
        </main>
        <footer class='text-right text-zinc-300 print:hidden' data-testid='site-footer'>
          <Markdown content={footer}/>
        </footer>
      </div>
    )
  },
})
