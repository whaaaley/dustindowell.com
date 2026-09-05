import { defineComponent } from 'vue'
import resume from './resume.md?raw'
import Markdown from '~/components/markdown/Markdown.tsx'
import { useSeo } from '~/hooks/useSeo.ts'

export default defineComponent({
  name: 'ResumePage',
  setup () {
    useSeo({ title: 'Dustin Dowell', description: 'Software Engineer in Des Moines, Iowa with 12+ years building web applications, dashboards, and cloud infrastructure.' })

    return () => (
      <div data-testid='page-resume'>
        <Markdown content={resume}/>
      </div>
    )
  },
})
