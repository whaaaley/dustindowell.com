import { defineComponent } from 'vue'
import Wordmark from '~/components/brand/Wordmark.tsx'
import { useSeo } from '~/hooks/useSeo.ts'

const star = () => <>{' '}<span class='star'>✦</span>{String.fromCharCode(160)}</>

export default defineComponent({
  name: 'BannerPage',
  setup () {
    useSeo({ title: 'Banner', description: 'Social preview image source.', noindex: true })

    return () => (
      <div class='flex h-[630px] w-300 items-center justify-center overflow-hidden bg-black text-white' data-testid='page-banner'>
        <div class='markdown zoom-[2]'>
          <h1><Wordmark/></h1>
          <p>SOFTWARE ENGINEER</p>
          <p class='text-zinc-400'>
            Des Moines, Iowa
            {star()}
            dustindowell.com
          </p>
        </div>
      </div>
    )
  },
})
