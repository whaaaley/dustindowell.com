import { cva } from 'class-variance-authority'
import { computed, defineComponent } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const linkVariants = cva([
  'block cursor-pointer rounded-md px-t3 py-t2 text-sm transition-colors',
], {
  variants: {
    active: {
      true: 'bg-zinc-800 text-white',
      false: 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200',
    },
  },
})

export type NavLinkProps = {
  to: string
  label: string
  month?: string
}

export default defineComponent({
  name: 'NavLink',
  props: {
    to: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    month: {
      type: String,
      default: null,
    },
  },
  setup (props) {
    const route = useRoute()

    const isActive = computed(() => route.name === props.to || route.matched.some(record => record.name === props.to))
    const linkClass = computed(() => linkVariants({ active: isActive.value }))

    return () => (
      <RouterLink class={linkClass.value} data-testid={`sidebar-item-${props.to}`} to={{ name: props.to }}>
        {props.month && <span class='mr-t2 inline-block w-7 text-xs text-zinc-500'>{props.month}</span>}
        {props.label}
      </RouterLink>
    )
  },
})
