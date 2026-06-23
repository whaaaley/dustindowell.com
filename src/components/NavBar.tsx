import { kebabCase } from 'change-case'
import { cva, type VariantProps } from 'class-variance-authority'
import { computed, defineComponent, type PropType } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

type ExternalLink = {
  href: string
  to?: never
  label: string
}

type InternalLink = {
  href?: never
  to: string
  label: string
}

type Link = ExternalLink | InternalLink

// The boxy blurple highlight for the active route, mirroring the original nav's active link.
// Hover only lightens non-active links; the active link keeps its dark-on-blurple text.
const navLinkVariants = cva([
  'rounded-md px-t3 py-t1 transition-colors',
], {
  variants: {
    active: {
      true: 'bg-brand-blurple text-dark-600',
      false: 'hover:text-zinc-200',
    },
  },
})

const NavBarLink = defineComponent({
  name: 'NavBarLink',
  props: {
    href: {
      type: String,
      default: undefined,
    },
    to: {
      type: String as PropType<string | undefined>,
      default: undefined,
    },
    label: {
      type: String,
      required: true,
    },
  },
  setup (props) {
    const route = useRoute()

    const isActive = computed(() => route.name === props.to || route.matched.some(record => record.name === props.to))
    const linkClass = computed(() => navLinkVariants({ active: isActive.value }))

    const testId = computed(() => `nav-${kebabCase(props.label)}`)

    return () => {
      if (props.href !== undefined) {
        return <a class={linkClass.value} data-testid={testId.value} href={props.href} rel='noopener noreferrer' target='_blank'>{props.label}</a>
      }

      return <RouterLink class={linkClass.value} data-testid={testId.value} to={{ name: props.to }}>{props.label}</RouterLink>
    }
  },
})

const navBarVariants = cva([
  'border-b border-zinc-800 py-t3',
], {
  variants: {
    theme: {
      dark: 'bg-black/20',
      light: 'bg-white/20',
    },
  },
  defaultVariants: {
    theme: 'dark',
  },
})

export type NavBarVariants = VariantProps<typeof navBarVariants>

export default defineComponent({
  name: 'NavBar',
  props: {
    theme: {
      type: String as PropType<NavBarVariants['theme']>,
      default: 'dark',
    },
    links: {
      type: Array as PropType<Link[]>,
      default: () => [],
    },
  },
  setup (props, { slots }) {
    const navBarClass = computed(() => (
      navBarVariants({
        theme: props.theme,
      })
    ))

    return () => (
      <header class={navBarClass.value}>
        <div class='mx-auto grid w-full max-w-7xl grid-cols-2 items-center justify-between px-t6 lg:flex'>
          {slots.logo && slots.logo()}
          <nav aria-label='Main menu' class='order-1 col-span-2 flex flex-wrap gap-t6 py-t4 text-sm font-bold text-zinc-400 lg:order-none'>
            {props.links.map((link: Link) => (
              <NavBarLink key={link.label} {...link}/>
            ))}
          </nav>
          {slots.actionSlot && (
            <div class='flex justify-end gap-t2'>
              {slots.actionSlot()}
            </div>
          )}
        </div>
      </header>
    )
  },
})
