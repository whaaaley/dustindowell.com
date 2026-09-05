import { defineComponent } from 'vue'
import SliderShowcase from './SliderShowcase.tsx'
import { useSeo } from '~/hooks/useSeo.ts'

export default defineComponent({
  name: 'PlaygroundPage',
  setup () {
    useSeo({ title: 'Playground', description: 'Component playground.', noindex: true })

    return () => (
      <div class='grid gap-page-line'>
        <h2 class='text-page-h1 font-black tracking-[0.5px]'>PLAYGROUND</h2>
        <SliderShowcase/>
      </div>
    )
  },
})
