import { defineComponent } from 'vue'
import { licensePath, licenses } from './licenses.ts'
import Markdown from '~/components/markdown/Markdown.tsx'
import { useSeo } from '~/hooks/useSeo.ts'

const content = [
  '## LICENSES',
  '',
  'Third-party packages used to build this site. Each page carries the license notice shipped with the package.',
  '',
  ...licenses.flatMap(license => [
    `### [${license.name}](${licensePath(license)})`,
    '',
    `${license.version} ✦ ${license.license}`,
    '',
  ]),
].join('\n')

export default defineComponent({
  name: 'LicensesPage',
  setup () {
    useSeo({ title: 'Licenses', description: 'Third-party software licenses for dustindowell.com.' })

    return () => (
      <div data-testid='page-licenses'>
        <Markdown content={content}/>
      </div>
    )
  },
})
