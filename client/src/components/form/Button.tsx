import { cva, type VariantProps } from 'class-variance-authority'
import { type Component, computed, defineComponent, h, type PropType } from 'vue'

const buttonVariants = cva([
  'flex items-center justify-center whitespace-nowrap transition-all',
], {
  variants: {
    color: {
      // Filled accent (blurple, via --primary).
      primary: [
        'bg-primary text-primary-text hover:bg-primary-hover',
      ],
      // Quiet text-only button.
      ghost: 'text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100',
      // Neutral bordered button.
      outline: 'border border-zinc-600 bg-zinc-900 text-zinc-300 hover:border-zinc-500 hover:bg-zinc-800',
      // Original dustindowell.com home button: 2px outline in the light blue-white, fills on hover.
      'brand-outline': 'border-2 border-light-500 text-light-500 hover:bg-light-500 hover:text-dark-500',
    },
    weight: {
      light: 'font-light',
      medium: 'font-medium',
    },
    disabled: {
      true: 'cursor-not-allowed opacity-50',
      false: '',
    },
    hasIcon: {
      true: '',
      false: '',
    },
    hasSlot: {
      true: '',
      false: '',
    },
    size: {
      xs: 'h-7.5 gap-t2 rounded-md text-xs',
      sm: 'h-8 gap-t2 rounded-md text-sm',
      md: 'h-10 gap-t3 rounded-md text-sm',
      lg: 'h-12 gap-t3 rounded-lg text-base',
      xl: 'h-13 gap-t4 rounded-lg text-lg',
    },
  },
  compoundVariants: [
    // Icon-only buttons use width instead of padding
    { size: 'xs', hasIcon: true, hasSlot: false, class: 'w-7.5' },
    { size: 'sm', hasIcon: true, hasSlot: false, class: 'w-8' },
    { size: 'md', hasIcon: true, hasSlot: false, class: 'w-10' },
    { size: 'lg', hasIcon: true, hasSlot: false, class: 'w-12' },
    { size: 'xl', hasIcon: true, hasSlot: false, class: 'w-14' },

    // Buttons with icon and text get adjusted left padding
    { size: 'xs', hasIcon: true, hasSlot: true, class: 'px-t4' },
    { size: 'sm', hasIcon: true, hasSlot: true, class: 'pl-t3 pr-t4' },
    { size: 'md', hasIcon: true, hasSlot: true, class: 'pl-t4 pr-t5' },
    { size: 'lg', hasIcon: true, hasSlot: true, class: 'pl-t4 pr-t6' },
    { size: 'xl', hasIcon: true, hasSlot: true, class: 'pl-t5 pr-t7' },

    // Text-only buttons use padding instead of size
    { size: 'xs', hasIcon: false, hasSlot: true, class: 'px-t4' },
    { size: 'sm', hasIcon: false, hasSlot: true, class: 'px-t4' },
    { size: 'md', hasIcon: false, hasSlot: true, class: 'px-t5' },
    { size: 'lg', hasIcon: false, hasSlot: true, class: 'px-t6' },
    { size: 'xl', hasIcon: false, hasSlot: true, class: 'px-t8' },
  ],
  defaultVariants: {
    color: 'primary',
    disabled: false,
    hasIcon: false,
    hasSlot: true,
    size: 'md',
    weight: 'medium',
  },
})

const iconVariants = cva([], {
  variants: {
    hasSlot: {
      true: '',
      false: '',
    },
    size: {
      // Micro adjustments to sharpen blurry icons
      xs: 'size-t5 translate-x-[-0.1px] translate-y-[-0.75px]',
      sm: 'size-t6 translate-x-[-0.15px] translate-y-[-0.15px]',
      md: 'size-t7 translate-x-[-0.25px] translate-y-[-0.25px]',
      lg: 'size-t8',
      xl: 'size-t9 translate-x-[-0.1px] translate-y-[-0.1px]',
    },
  },
  compoundVariants: [
    { size: 'xs', hasSlot: false, class: 'size-3.5' },
    { size: 'sm', hasSlot: false, class: 'size-4' },
    { size: 'md', hasSlot: false, class: 'size-5' },
    { size: 'lg', hasSlot: false, class: 'size-6' },
    { size: 'xl', hasSlot: false, class: 'size-7' },
  ],
})

export type ButtonVariants = VariantProps<typeof buttonVariants>
export type IconVariants = VariantProps<typeof iconVariants>

export default defineComponent({
  name: 'Button',
  props: {
    ariaLabel: {
      type: String,
      default: undefined,
    },
    classOverride: {
      type: String,
      default: '',
    },
    color: {
      type: String as PropType<ButtonVariants['color']>,
      default: 'primary',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String as PropType<ButtonVariants['size']>,
      default: 'md',
    },
    weight: {
      type: String as PropType<ButtonVariants['weight']>,
      default: 'medium',
    },
    icon: {
      type: [Object, Function] as PropType<Component>,
      default: null,
    },
    text: {
      type: String,
      default: null,
    },
  },
  emits: [
    'click',
  ],
  setup (props, { emit, slots }) {
    const hasContent = computed(() => !!slots.default || props.text != null)

    const buttonClass = computed(() => (
      buttonVariants({
        color: props.color,
        disabled: props.disabled,
        hasIcon: !!props.icon,
        hasSlot: hasContent.value,
        size: props.size,
        weight: props.weight,
      })
    ))

    const iconClass = computed(() => (
      iconVariants({
        hasSlot: hasContent.value,
        size: props.size,
      })
    ))

    const handleClick = (e: MouseEvent) => {
      if (props.disabled) {
        e.preventDefault()
        return
      }

      emit('click', e)
    }

    return () => (
      <button aria-label={props.ariaLabel} class={[buttonClass.value, props.classOverride]} disabled={props.disabled} type='button' onClick={handleClick}>
        {props.icon && h(props.icon, { class: iconClass.value })}
        {slots.default ? slots.default() : props.text}
      </button>
    )
  },
})
