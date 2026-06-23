import { cva, type VariantProps } from 'class-variance-authority'
import { computed, defineComponent, type PropType } from 'vue'

// Slotted page shell for the marketing site, modeled on governance's PageShell.
// The site is top-nav (not a sidebar dashboard), so the shell exposes header/main/footer slots.
const wrapperVariants = cva([
  'flex min-h-screen flex-col bg-dark-500 text-zinc-100 transition-colors',
], {
  variants: {
    fullWidth: {
      false: '',
      true: '',
    },
  },
  defaultVariants: {
    fullWidth: false,
  },
})

export type WrapperVariants = VariantProps<typeof wrapperVariants>

export default defineComponent({
  name: 'PageShell',
  props: {
    fullWidth: {
      type: Boolean as PropType<WrapperVariants['fullWidth']>,
      default: false,
    },
  },
  setup (props, { slots }) {
    const wrapperClass = computed(() => (
      wrapperVariants({ fullWidth: props.fullWidth })
    ))

    return () => (
      <div class={wrapperClass.value}>
        {slots.header && slots.header()}
        <main class='flex-1'>
          {slots.main && slots.main()}
        </main>
        {slots.footer && slots.footer()}
      </div>
    )
  },
})
