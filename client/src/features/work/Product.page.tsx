import { computed, defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import { findProduct } from './products.ts'
import Slider from '~/components/gallery/Slider.tsx'
import Markdown from '~/components/markdown/Markdown.tsx'
import { splitOnMarker } from '~/utils/content.utils.ts'

export default defineComponent({
  name: 'ProductPage',
  setup () {
    const route = useRoute()
    const product = computed(() => findProduct(String(route.params.slug)))
    const parts = computed(() => (product.value ? splitOnMarker(product.value.body, 'slider') : []))
    const activeIndex = ref(0)

    const renderSlider = () => {
      if (!product.value || product.value.images.length === 0) {
        return null
      }
      const handleSelect = (index: number) => {
        activeIndex.value = index
      }
      return <Slider activeIndex={activeIndex.value} images={product.value.images} size='full' onSelect={handleSelect}/>
    }

    return () => (
      <div class='grid content-start gap-page-line'>
        {parts.value.flatMap((part, index) => [
          index > 0 && renderSlider(),
          <Markdown key={index} content={part}/>,
        ])}
      </div>
    )
  },
})
