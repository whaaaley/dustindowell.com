import { cva, type VariantProps } from 'class-variance-authority'
import { computed, defineComponent, type PropType } from 'vue'

const sectionVariants = cva([
  'flex justify-center py-t12',
], {
  variants: {
    gradient: {
      linear: 'bg-gradient-to-t from-yellow-300/15 to-transparent',
      radial: 'bg-gradient-radial from-yellow-200/15 to-transparent',
      'radial-offset': 'bg-gradient-radial-offset from-yellow-300/15 to-transparent',
    },
    fixed: {
      true: 'bg-fixed',
      false: '',
    },
  },
  defaultVariants: {
    gradient: null,
    fixed: false,
  },
})

type SectionVariants = VariantProps<typeof sectionVariants>

export default defineComponent({
  name: 'Section',
  props: {
    gradient: {
      type: String as PropType<SectionVariants['gradient']>,
      default: 'none',
    },
    fixed: {
      type: Boolean,
      default: false,
    },
  },
  setup (props, { slots }) {
    const sectionClass = computed(() => (
      sectionVariants({
        gradient: props.gradient,
        fixed: props.fixed,
      })
    ))

    return () => (
      <div class={sectionClass.value}>
        <div class='grid w-full max-w-7xl gap-t12 px-t6'>
          {slots.default && slots.default()}
        </div>
      </div>
    )
  },
})
