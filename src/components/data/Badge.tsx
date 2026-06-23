import { cva, type VariantProps } from 'class-variance-authority'
import { type Component, computed, defineComponent, h, type PropType } from 'vue'

const statusColorMap = {
  success: 'emerald',
  info: 'sky',
  warn: 'yellow',
  error: 'rose',

  // Stripe invoice statuses
  paid: 'emerald',
  // open: 'yellow', // conflicts with proposals, going with sky
  uncollectible: 'rose',
  void: 'rose',

  // Stripe subscription statuses
  active: 'emerald',
  trialing: 'sky',
  past_due: 'yellow',
  unpaid: 'rose',
  canceled: 'rose',
  incomplete: 'yellow',
  incomplete_expired: 'rose',
  paused: 'yellow',

  // Governance proposal statuses
  open: 'sky',
  closed: 'emerald',
  withdrawn: 'yellow',
} as const

const badgeVariants = cva([
  'inline-flex place-items-center font-medium',
], {
  variants: {
    color: {
      primary: '',
      ghost: 'bg-transparent text-zinc-300',
      rose: '',
      yellow: '',
      emerald: '',
      sky: '',
      red: '',
      cyan: '',
      violet: '',
    },
    solid: {
      true: '',
      false: '',
    },
    size: {
      xs: 'h-t8 gap-1.5 rounded-full px-2 text-xs',
      sm: 'h-t8 gap-1.5 rounded-md px-t2 text-sm',
      md: 'h-t10 gap-1.5 rounded-lg px-t3 text-sm',
      lg: 'h-t12 gap-2 rounded-full px-t4 text-base',
    },
    tone: {
      dark: 'border border-zinc-800 bg-zinc-950 text-zinc-200',
      light: 'border border-zinc-700 bg-zinc-900 text-zinc-300',
      lighter: 'border border-zinc-600 bg-zinc-800 text-zinc-300',
    },
  },
  compoundVariants: [
    // Default (solid: false)
    // Base
    { color: 'primary', solid: false, class: 'border border-primary/20 bg-primary/10 text-primary' },

    // Standard colors
    { color: 'rose', solid: false, class: 'border border-rose-500/30 bg-rose-500/15 text-rose-400' },
    { color: 'yellow', solid: false, class: 'border border-amber-500/30 bg-amber-500/15 text-amber-300' },
    { color: 'emerald', solid: false, class: 'border border-emerald-500/30 bg-emerald-500/15 text-emerald-300' },
    { color: 'sky', solid: false, class: 'border border-sky-500/30 bg-sky-500/15 text-sky-300' },

    // Additional colors
    { color: 'red', solid: false, class: 'border border-red-500/30 bg-red-500/15 text-red-400' },
    { color: 'cyan', solid: false, class: 'border border-cyan-500/30 bg-cyan-500/15 text-cyan-300' },
    { color: 'violet', solid: false, class: 'border border-violet-500/30 bg-violet-500/15 text-violet-300' },

    // Solid (solid: true)
    // Base
    { color: 'primary', solid: true, class: 'border-transparent bg-primary text-primary-text' },

    // Standard colors
    { color: 'rose', solid: true, class: 'border-transparent bg-rose-500 text-white' },
    { color: 'yellow', solid: true, class: 'border-transparent bg-yellow-400 text-black' },
    { color: 'emerald', solid: true, class: 'border-transparent bg-emerald-500 text-white' },
    { color: 'sky', solid: true, class: 'border-transparent bg-sky-500 text-white' },

    // Additional colors
    { color: 'red', solid: true, class: 'border-transparent bg-red-500 text-white' },
    { color: 'cyan', solid: true, class: 'border-transparent bg-cyan-500 text-white' },
    { color: 'violet', solid: true, class: 'border-transparent bg-violet-500 text-white' },
  ],
  defaultVariants: {
    color: 'sky',
    size: 'sm',
    solid: false,
  },
})

const iconVariants = cva([], {
  variants: {
    size: {
      xs: 'size-3.5',
      sm: 'size-4',
      md: 'size-4',
      lg: 'size-5',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})

// `draft` renders as a muted tone (no color); other statuses map through statusColorMap.
type BadgeStatus = keyof typeof statusColorMap | 'draft'
type BadgeVariants = VariantProps<typeof badgeVariants>

type BadgeColorConfig = {
  color?: BadgeVariants['color']
  tone?: BadgeVariants['tone']
}

export type BadgeColor = NonNullable<BadgeVariants['color']>
export type BadgeTone = NonNullable<BadgeVariants['tone']>
export type BadgeSize = NonNullable<BadgeVariants['size']>

export default defineComponent({
  name: 'Badge',
  props: {
    color: {
      type: String as PropType<BadgeVariants['color']>,
      default: 'sky',
    },
    icon: {
      type: Object as PropType<Component>,
      default: null,
    },
    size: {
      type: String as PropType<BadgeVariants['size']>,
      default: 'sm',
    },
    solid: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String as PropType<BadgeStatus>,
      default: null,
    },
    tone: {
      type: String as PropType<BadgeVariants['tone']>,
      default: null,
    },
  },
  setup (props, { slots }) {
    // Runtime check: Vue's defineComponent props can't express discriminated unions,
    // so mutual exclusion between color, tone, and status must be enforced at runtime
    if (import.meta.env.DEV) {
      const activeProps = [props.status && 'status', props.tone && 'tone', props.color !== 'sky' && 'color'].filter(Boolean)
      if (activeProps.length > 1) {
        console.warn(`[Badge] status, tone, and color are mutually exclusive. Active: ${activeProps.join(', ')}. Priority: status > tone > color.`)
      }
    }

    const getColorConfig = (): BadgeColorConfig => {
      if (props.status === 'draft') {
        return { tone: 'light', color: null }
      }

      if (props.status) {
        return { color: statusColorMap[props.status], tone: null }
      }

      if (props.tone) {
        return { tone: props.tone, color: null }
      }

      return { color: props.color }
    }

    const badgeClass = computed(() => (
      badgeVariants({
        ...getColorConfig(),
        size: props.size,
        solid: props.solid,
      })
    ))

    const iconClass = computed(() => (
      iconVariants({ size: props.size })
    ))

    return () => (
      <div class={badgeClass.value}>
        {props.icon && h(props.icon, { class: iconClass.value })}
        {slots.default && slots.default()}
      </div>
    )
  },
})
