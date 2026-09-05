import { defineComponent } from 'vue'
import { productPath, products } from './products.ts'
import Markdown from '~/components/markdown/Markdown.tsx'
import { useSeo } from '~/hooks/useSeo.ts'

const content = [
  '## WORK',
  '',
  ...products.flatMap(product => [
    `### [${product.title.toUpperCase()}](${productPath(product)})`,
    '',
    `${product.category} ✦ ${product.dates}`,
    '',
    product.tagline,
    '',
  ]),
].join('\n')

export default defineComponent({
  name: 'WorkPage',
  setup () {
    useSeo({ title: 'Work', description: 'Products Dustin Dowell has built, with screenshots and notes on each.' })

    return () => (
      <div data-testid='page-work'>
        <Markdown content={content}/>
      </div>
    )
  },
})
