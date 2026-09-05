import { defineComponent } from 'vue'
import thirdParty from './third-party.md?raw'
import Markdown from '~/components/markdown/Markdown.tsx'
import { useSeo } from '~/hooks/useSeo.ts'

export default defineComponent({
  name: 'LicensesPage',
  setup () {
    useSeo({ title: 'Licenses', description: 'Third-party software licenses for dustindowell.com.' })

    return () => (
      <div data-testid='page-licenses'>
        <Markdown content={thirdParty}/>
      </div>
    )
  },
})
