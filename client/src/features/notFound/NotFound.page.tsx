import { defineComponent } from 'vue'
import Markdown from '~/components/markdown/Markdown.tsx'
import { useSeo } from '~/hooks/useSeo.ts'

const content = [
  '## PAGE NOT FOUND',
  '',
  'The page you are looking for does not exist. [Back to the resume](/) ✦ [See the work](/work)',
].join('\n')

export default defineComponent({
  name: 'NotFoundPage',
  setup () {
    useSeo({ title: 'Page Not Found', description: 'The page you are looking for does not exist.', noindex: true })

    return () => (
      <div data-testid='page-not-found'>
        <Markdown content={content}/>
      </div>
    )
  },
})
