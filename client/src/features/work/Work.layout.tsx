import { computed, defineComponent } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { findProduct, type Product } from './products.ts'
import Markdown from '~/components/markdown/Markdown.tsx'
import NotFoundPage from '~/features/notFound/NotFound.page.tsx'
import { useSeo } from '~/hooks/useSeo.ts'

const header = (product: Product) => [
  `## ${product.title.toUpperCase()}`,
  '',
  product.tagline,
  '',
  `${product.category} ✦ ${product.dates}`,
].join('\n')

export default defineComponent({
  name: 'WorkLayout',
  setup () {
    const route = useRoute()
    const product = computed(() => findProduct(String(route.params.slug)))

    useSeo({
      title: product.value?.title ?? 'Page Not Found',
      description: product.value?.tagline ?? 'The page you are looking for does not exist.',
      noindex: !product.value,
    })

    return () => {
      if (!product.value) {
        return <NotFoundPage/>
      }
      return (
        <div class='grid content-start gap-page-line' data-testid='page-product'>
          <Markdown content={header(product.value)}/>
          <RouterView/>
        </div>
      )
    }
  },
})
