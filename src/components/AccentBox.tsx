import { cva, type VariantProps } from 'class-variance-authority'
import { computed, defineComponent, type PropType } from 'vue'

const accentBoxVariants = cva([
  'rounded-md border backdrop-blur',
], {
  variants: {
    accentBorder: {
      true: 'border-l-4',
    },
    theme: {
      primary: 'border-yellow-400/10 bg-yellow-400/5',
    },
  },
  compoundVariants: [
    {
      accentBorder: true,
      theme: 'primary',
      class: 'border-l-yellow-400',
    },
  ],
  defaultVariants: {
    accentBorder: false,
    theme: 'primary',
  },
})

type AccentBoxVariants = VariantProps<typeof accentBoxVariants>

export default defineComponent({
  name: 'AccentBox',
  props: {
    accentBorder: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String as PropType<AccentBoxVariants['theme']>,
      default: 'primary',
    },
  },
  setup (props, { slots }) {
    const accentBoxClasslist = computed(() => (
      accentBoxVariants({
        accentBorder: props.accentBorder,
        theme: props.theme,
      })
    ))

    return () => (
      <div class={accentBoxClasslist.value}>
        {slots.default && slots.default()}
      </div>
    )
  },
})
