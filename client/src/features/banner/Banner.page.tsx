import { defineComponent } from 'vue'
import Markdown from '~/components/markdown/Markdown.tsx'
import { useSeo } from '~/hooks/useSeo.ts'

const content = [
  '# Dustin Dowell',
  '',
  'SOFTWARE ENGINEER',
  '',
  'Des Moines, Iowa ✦ dustindowell.com',
].join('\n')

export default defineComponent({
  name: 'BannerPage',
  setup () {
    useSeo({ title: 'Banner', description: 'Social preview image source.', noindex: true })

    return () => (
      <div class='flex h-[630px] w-300 items-center bg-black px-24 text-white [&_.markdown]:text-[2.4em]' data-testid='page-banner'>
        <Markdown content={content}/>
      </div>
    )
  },
})
