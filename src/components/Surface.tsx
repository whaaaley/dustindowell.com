import { cva, type VariantProps } from 'class-variance-authority'
import { computed, defineComponent, type PropType } from 'vue'

const statusColorMap = {
  success: 'emerald',
  info: 'sky',
  warn: 'yellow',
  error: 'rose',
} as const

export const surfaceVariants = cva([
  'border',
], {
  variants: {
    color: {
      // Base
      primary: 'border-primary/30 bg-primary/10 text-primary',
      ghost: 'border-0 bg-transparent',

      // Standard colors
      rose: 'border-rose-500/30 bg-rose-500/15 text-rose-400',
      yellow: 'border-amber-500/30 bg-amber-500/15 text-amber-300',
      emerald: 'border-emerald-500/30 bg-emerald-500/15 text-emerald-300',
      sky: 'border-sky-500/30 bg-sky-500/15 text-sky-300',

      // Additional colors
      cyan: 'border-cyan-500/30 bg-cyan-500/15 text-cyan-300',
      red: 'border-red-500/30 bg-red-500/15 text-red-400',
      violet: 'border-violet-500/30 bg-violet-500/15 text-violet-300',
    },
    shadow: {
      true: 'shadow-2xl',
    },
    tone: {
      dark: 'border-zinc-800 bg-zinc-950',
      light: 'border-zinc-800 bg-zinc-900',
      lighter: 'border-zinc-700 bg-zinc-800',
    },
    // Rounded by default at rounded-md; tones override below. Pass `square` to opt out.
    square: {
      true: '',
      false: 'rounded-md',
    },
  },
  compoundVariants: [
    { square: false, tone: 'dark', class: 'rounded-xl' },
    { square: false, tone: 'light', class: 'rounded-lg' },
    { square: false, tone: 'lighter', class: 'rounded-md' },
  ],
  defaultVariants: {
    shadow: false,
    tone: 'dark',
    square: false,
  },
})

type SurfaceVariants = VariantProps<typeof surfaceVariants>
type SurfaceStatus = keyof typeof statusColorMap

export type SurfaceColor = NonNullable<SurfaceVariants['color']>
export type SurfaceTone = NonNullable<SurfaceVariants['tone']>

export const surfaceProps = {
  color: {
    type: String as PropType<SurfaceColor>,
    default: null,
  },
  shadow: {
    type: Boolean as PropType<SurfaceVariants['shadow']>,
    default: false,
  },
  status: {
    type: String as PropType<SurfaceStatus>,
    default: null,
  },
  tone: {
    type: String as PropType<SurfaceTone>,
    default: 'dark',
  },
  square: {
    type: Boolean,
    default: false,
  },
} as const

export default defineComponent({
  name: 'Surface',
  props: surfaceProps,
  setup (props, { slots }) {
    // Vue's defineComponent props can't express discriminated unions, so mutual exclusion between color, tone, and status is enforced at runtime.
    // tone is excluded from the check because it has a default value ('dark'), which would make it always truthy.
    if (import.meta.env.DEV) {
      const activeProps = [props.status && 'status', props.color && 'color'].filter(Boolean)
      if (activeProps.length > 1) {
        console.warn(`[Surface] status and color are mutually exclusive. Active: ${activeProps.join(', ')}. Priority: status > color > tone.`)
      }
    }

    const getColorConfig = () => {
      // Priority: status > color > tone
      if (props.status) {
        return {
          color: statusColorMap[props.status],
          tone: null,
        }
      }

      if (props.color) {
        return {
          color: props.color,
          tone: null,
        }
      }

      return {
        color: null,
        tone: props.tone,
      }
    }

    const surfaceClass = computed(() => (
      surfaceVariants({
        shadow: props.shadow,
        square: props.square,
        ...getColorConfig(),
      })
    ))

    return () => (
      <div class={surfaceClass.value}>
        {slots.default && slots.default()}
      </div>
    )
  },
})
