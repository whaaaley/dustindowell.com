import { PhMoon, PhSun } from '@phosphor-icons/vue'
import { cva } from 'class-variance-authority'
import { computed, defineComponent, type PropType } from 'vue'
import Toggle, { type ToggleVariants } from '~/components/form/Toggle'

// The generic Toggle flanked by a sun and moon icon that light up by state.
// Used both on the home card (size lg) and in the nav action slot (size sm).

const sunVariants = cva('transition-colors', {
  variants: {
    active: {
      true: 'text-zinc-500',
      false: 'text-pastel-yellow',
    },
    size: {
      sm: 'size-t5',
      lg: 'size-t6',
    },
  },
  defaultVariants: {
    active: false,
    size: 'lg',
  },
})

const moonVariants = cva('transition-colors', {
  variants: {
    active: {
      true: 'text-brand-blue',
      false: 'text-zinc-500',
    },
    size: {
      sm: 'size-t5',
      lg: 'size-t6',
    },
  },
  defaultVariants: {
    active: false,
    size: 'lg',
  },
})

export default defineComponent({
  name: 'ThemeToggle',
  props: {
    active: {
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
    const sunClass = computed(() => sunVariants({ active: props.active, size: props.size }))
    const moonClass = computed(() => moonVariants({ active: props.active, size: props.size }))

    return () => (
      <div class='flex items-center gap-t3'>
        <PhSun class={sunClass.value} weight='fill'/>
        <Toggle active={props.active} ariaLabel='Toggle light and dark theme' size={props.size} onUpdate:active={(value: boolean) => emit('update:active', value)}/>
        <PhMoon class={moonClass.value} weight='fill'/>
      </div>
    )
  },
})
