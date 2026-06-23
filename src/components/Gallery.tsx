import { cva, type VariantProps } from 'class-variance-authority'
import { computed, defineComponent, type PropType, ref, Transition, watch } from 'vue'

// Ported from the original PDP product gallery: one large featured image with a
// clickable thumbnail strip below. Selecting a thumbnail cross-fades the featured image
// via Vue's Transition with Tailwind opacity classes, matching the site's transition style.

export type GalleryImage = {
  src: string
  alt: string
}

const thumbnailVariants = cva([
  'aspect-square overflow-hidden rounded-md border-2 transition-transform hover:-translate-y-0.5',
], {
  variants: {
    active: {
      true: 'border-brand-blurple opacity-100',
      false: 'border-transparent opacity-70',
    },
  },
})

export type ThumbnailVariants = VariantProps<typeof thumbnailVariants>

export const galleryProps = {
  images: {
    type: Array as PropType<GalleryImage[]>,
    default: () => [],
  },
}

export default defineComponent({
  name: 'Gallery',
  props: galleryProps,
  setup (props) {
    const activeIndex = ref(0)

    // Reset to the first image when the image set changes (e.g. navigating between projects).
    watch(() => props.images, () => {
      activeIndex.value = 0
    })

    const active = computed(() => props.images[activeIndex.value])

    const thumbnailClass = (index: number) => thumbnailVariants({ active: index === activeIndex.value })

    const handleSelect = (index: number) => {
      activeIndex.value = index
    }

    return () => {
      const featured = active.value
      if (!featured) return null

      return (
        <div class='grid gap-t6'>
          <div class='relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-zinc-900'>
            <Transition name='fade-slow'>
              <img key={featured.src} alt={featured.alt} class='absolute inset-0 size-full object-cover object-top' loading='eager' src={featured.src}/>
            </Transition>
            <div class='absolute bottom-t2 right-t2 z-[3] max-w-[50%] truncate rounded-md bg-black/70 px-t2 py-t1 text-xs text-white'>
              {featured.alt}
            </div>
          </div>
          {props.images.length > 1 && (
            <div class='grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-t3'>
              {props.images.map((image, index) => (
                <button key={image.src} aria-label={`View ${image.alt}`} class={thumbnailClass(index)} type='button' onClick={() => handleSelect(index)}>
                  <img alt={image.alt} class='size-full object-cover' loading='lazy' src={image.src}/>
                </button>
              ))}
            </div>
          )}
        </div>
      )
    }
  },
})
