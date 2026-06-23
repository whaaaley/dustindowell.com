import { defineComponent, type PropType } from 'vue'
import NavLink, { type NavLinkProps } from './NavLink'

export default defineComponent({
  name: 'NavSection',
  props: {
    label: {
      type: String,
      default: null,
    },
    links: {
      type: Array as PropType<NavLinkProps[]>,
      required: true,
    },
  },
  setup (props) {
    return () => (
      <div class='grid gap-t3'>
        {props.label && (
          <h2 class='text-xs font-bold uppercase tracking-wider text-zinc-500'>{props.label}</h2>
        )}
        <div class='grid gap-t1'>
          {props.links.map(link => <NavLink key={link.to} label={link.label} month={link.month} to={link.to}/>)}
        </div>
      </div>
    )
  },
})
