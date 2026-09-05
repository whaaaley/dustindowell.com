import { cva, type VariantProps } from 'class-variance-authority'
import { computed, defineComponent, type PropType } from 'vue'

export type SliderImage = {
  src: string
  medium: string
  thumb: string
  alt: string
}

export const sliderVariants = cva([
  'grid w-full gap-page-half p-image-margin',
], {
  variants: {
    size: {
      sm: 'max-w-sm',
      md: 'max-w-2xl',
      lg: 'max-w-5xl',
      full: 'max-w-none',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export const thumbnailVariants = cva([
  'block aspect-4/3 min-h-0 w-full shrink overflow-hidden border transition-opacity',
], {
  variants: {
    active: {
      true: 'border-white opacity-100',
      false: 'border-transparent opacity-50 hover:opacity-80',
    },
  },
  defaultVariants: {
    active: false,
  },
})

export const arrowVariants = cva([
  'px-page-half text-page-h1 leading-none text-zinc-400 hover:text-white',
])

export type SliderVariants = VariantProps<typeof sliderVariants>
export type ThumbnailVariants = VariantProps<typeof thumbnailVariants>

const SliderThumbnail = defineComponent({
  name: 'SliderThumbnail',
  props: {
    image: {
      type: Object as PropType<SliderImage>,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    active: {
      type: Boolean as PropType<ThumbnailVariants['active']>,
      default: false,
    },
  },
  emits: {
    select: (index: number) => Number.isInteger(index),
    keydown: (event: KeyboardEvent) => event instanceof KeyboardEvent,
  },
  setup (props, { emit }) {
    const thumbnailClass = computed(() => (
      thumbnailVariants({ active: props.active })
    ))

    const handleClick = () => {
      emit('select', props.index)
    }

    const handleKeydown = (event: KeyboardEvent) => {
      emit('keydown', event)
    }

    return () => (
      <button aria-label={`Show image ${props.index + 1}`} aria-pressed={props.active ?? false} class={thumbnailClass.value} type='button' onClick={handleClick} onKeydown={handleKeydown}>
        <img alt='' class='block size-full object-cover object-top' height={204} loading='lazy' src={props.image.thumb} width={272}/>
      </button>
    )
  },
})

export default defineComponent({
  name: 'Slider',
  props: {
    images: {
      type: Array as PropType<SliderImage[]>,
      required: true,
    },
    activeIndex: {
      type: Number,
      default: 0,
    },
    size: {
      type: String as PropType<SliderVariants['size']>,
      default: 'md',
    },
    thumbnails: {
      type: Boolean,
      default: true,
    },
  },
  emits: {
    select: (index: number) => Number.isInteger(index),
  },
  setup (props, { emit }) {
    const count = computed(() => props.images.length)
    const active = computed(() => props.images[props.activeIndex] ?? props.images[0])

    const sliderClass = computed(() => (
      sliderVariants({ size: props.size })
    ))

    const arrowClass = computed(() => (
      arrowVariants()
    ))

    const handleSelect = (index: number) => {
      emit('select', (index + count.value) % count.value)
    }

    const handlePrevious = () => {
      handleSelect(props.activeIndex - 1)
    }

    const handleNext = () => {
      handleSelect(props.activeIndex + 1)
    }

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        handlePrevious()
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        handleNext()
      }
    }

    const renderThumbnails = () => (
      <div class='relative w-[14%] shrink-0 md:w-[10%]'>
        <div aria-label='Thumbnails' class='absolute inset-0 flex flex-col gap-image-gap overflow-hidden' role='group'>
          {props.images.map((image, index) => (
            <SliderThumbnail key={image.src} active={index === props.activeIndex} image={image} index={index} onKeydown={handleKeydown} onSelect={handleSelect}/>
          ))}
        </div>
      </div>
    )

    return () => (
      <div aria-roledescription='carousel' class={sliderClass.value} role='region'>
        <div class='flex gap-image-gutter'>
          {props.thumbnails && renderThumbnails()}
          <div class='aspect-4/3 min-w-0 flex-1 overflow-hidden border border-zinc-800 bg-zinc-900'>
            <img alt={active.value.alt} class='size-full object-contain' fetchpriority='high' height={1024} sizes='(min-width: 1440px) 1100px, 80vw' src={active.value.src} srcset={`${active.value.medium} 900w, ${active.value.src} 1366w`} width={1366}/>
          </div>
        </div>
        <div class='flex items-center justify-between text-page-body text-zinc-300'>
          <button aria-label='Previous image' class={arrowClass.value} type='button' onClick={handlePrevious} onKeydown={handleKeydown}>←</button>
          <span aria-live='polite'>{props.activeIndex + 1} / {count.value} ✦ {active.value.alt}</span>
          <button aria-label='Next image' class={arrowClass.value} type='button' onClick={handleNext} onKeydown={handleKeydown}>→</button>
        </div>
      </div>
    )
  },
})
