import { PhArrowClockwise, PhArrowRight, PhDotsThree } from '@phosphor-icons/vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { computed, defineComponent, type PropType } from 'vue'

const frameVariants = cva([
  'overflow-hidden rounded-lg border shadow-lg',
], {
  variants: {
    variant: {
      light: 'border-zinc-200 bg-white',
      dark: 'border-zinc-700 bg-zinc-800',
    },
  },
  defaultVariants: {
    variant: 'dark',
  },
})

const headerVariants = cva([
  'flex items-center justify-between border-b px-4 py-3',
], {
  variants: {
    variant: {
      light: 'border-zinc-200 bg-zinc-50',
      dark: 'border-zinc-700 bg-zinc-900',
    },
  },
  defaultVariants: {
    variant: 'dark',
  },
})

const buttonVariants = cva([
  'rounded p-1 transition-colors',
], {
  variants: {
    variant: {
      light: 'bg-zinc-200 hover:bg-zinc-300',
      dark: 'bg-zinc-700 hover:bg-zinc-600',
    },
  },
  defaultVariants: {
    variant: 'dark',
  },
})

const textVariants = cva([], {
  variants: {
    variant: {
      light: 'text-zinc-700',
      dark: 'text-zinc-300',
    },
  },
  defaultVariants: {
    variant: 'dark',
  },
})

const addressBarVariants = cva([
  'rounded-md border px-3 py-1 text-sm',
], {
  variants: {
    variant: {
      light: 'border-zinc-300 bg-white text-zinc-700',
      dark: 'border-zinc-600 bg-zinc-800 text-zinc-300',
    },
  },
  defaultVariants: {
    variant: 'dark',
  },
})

export type BrowserFrameVariants = VariantProps<typeof frameVariants>

export default defineComponent({
  name: 'BrowserFrame',
  props: {
    title: {
      type: String as PropType<string>,
      default: 'Untitled',
    },
    url: {
      type: String as PropType<string>,
      default: 'https://example.com',
    },
    showAddressBar: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    showButtons: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    variant: {
      type: String as PropType<BrowserFrameVariants['variant']>,
      default: 'dark',
    },
  },
  setup (props, { slots }) {
    const frameClass = computed(() => frameVariants({ variant: props.variant }))
    const headerClass = computed(() => headerVariants({ variant: props.variant }))
    const buttonClass = computed(() => buttonVariants({ variant: props.variant }))
    const textClass = computed(() => textVariants({ variant: props.variant }))
    const addressBarClass = computed(() => addressBarVariants({ variant: props.variant }))

    return () => (
      <div class={frameClass.value}>
        {/* Browser Header */}
        <div class={headerClass.value}>
          <div class='flex items-center gap-2'>
            {props.showButtons && (
              <div class='flex gap-2'>
                <div class='size-3 rounded-full bg-red-500'/>
                <div class='size-3 rounded-full bg-yellow-500'/>
                <div class='size-3 rounded-full bg-green-500'/>
              </div>
            )}
          </div>
          {props.showAddressBar && (
            <div class='mx-4 flex-1'>
              <div class={addressBarClass.value}>
                <div class='flex items-center gap-2'>
                  <PhArrowRight class='size-4'/>
                  <span class='font-mono'>{props.url}</span>
                </div>
              </div>
            </div>
          )}
          <div class='flex items-center gap-2'>
            <button class={buttonClass.value}>
              <PhArrowClockwise class='size-4'/>
            </button>
            <button class={buttonClass.value}>
              <PhDotsThree class='size-4'/>
            </button>
          </div>
        </div>
        {/* Browser Content */}
        <div class='relative'>
          {(slots.default && slots.default()) || (
            <div class={`flex min-h-96 items-center justify-center p-8 ${textClass.value}`}>
              <div class='text-center'>
                <h3 class='mb-2 text-lg font-semibold'>{props.title}</h3>
                <p class='text-sm opacity-60'>Browser content goes here</p>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  },
})
