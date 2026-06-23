import { cva, type VariantProps } from 'class-variance-authority'
import { computed, defineComponent, type PropType } from 'vue'

// Generic pill toggle (a reusable library component, like Button).
// Geometry derives from the original dustindowell.com .switch; structure/a11y from onclick's Switch.
// Icons are NOT baked in: callers compose them around the toggle (see the homepage theme toggle).

const trackVariants = cva([
  'relative inline-flex shrink-0 cursor-pointer items-center rounded-full transition-colors duration-[120ms] ease-in-out',
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blurple/50',
], {
  variants: {
    active: {
      true: 'bg-brand-blurple',
      false: 'bg-dark-300',
    },
    size: {
      // Proportions derived from proven toggles (Mantine/Material): 2:1 track, thumb ~2/3 of height with breathing room.
      // sm: 48x24 track, 18 thumb, 3 padding (thumb 75%). lg: 72x36 track, 24 thumb, 6 padding (thumb 67%, the verbatim original).
      sm: 'h-t8 w-t16 p-t1',
      lg: 'h-t12 w-t24 p-1',
    },
    disabled: {
      true: 'cursor-not-allowed opacity-50',
      false: '',
    },
  },
  defaultVariants: {
    active: false,
    size: 'lg',
    disabled: false,
  },
})

const thumbVariants = cva([
  'pointer-events-none inline-block rounded-full bg-white shadow transition-transform duration-[120ms] ease-in-out',
], {
  variants: {
    size: {
      sm: 'size-t6',
      lg: 'size-7',
    },
    active: {
      true: '',
      false: 'translate-x-0',
    },
  },
  compoundVariants: [
    { active: true, size: 'sm', class: 'translate-x-t8' },
    { active: true, size: 'lg', class: 'translate-x-t12' },
  ],
  defaultVariants: {
    active: false,
    size: 'lg',
  },
})

export type ToggleVariants = VariantProps<typeof trackVariants>

export default defineComponent({
  name: 'Toggle',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    ariaLabel: {
      type: String,
      default: 'Toggle',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String as PropType<ToggleVariants['size']>,
      default: 'lg',
    },
  },
  emits: [
    'update:active',
  ],
  setup (props, { emit }) {
    const trackClass = computed(() => trackVariants({ active: props.active, size: props.size, disabled: props.disabled }))
    const thumbClass = computed(() => thumbVariants({ active: props.active, size: props.size }))

    const handleClick = () => {
      if (props.disabled) return

      emit('update:active', !props.active)
    }

    return () => (
      <button aria-checked={props.active} aria-label={props.ariaLabel} class={trackClass.value} disabled={props.disabled} role='switch' type='button' onClick={handleClick}>
        <span class={thumbClass.value}/>
      </button>
    )
  },
})
