import { cva } from 'class-variance-authority'
import { computed, defineComponent, type PropType } from 'vue'

const sidebarButtonVariants = cva([
  'rounded-md px-t3 py-t2 text-left text-sm transition-colors',
], {
  variants: {
    active: {
      true: 'bg-zinc-800 text-white',
      false: 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200',
    },
  },
})

// Shared layout for the work, open source, blog, and demos pages.
// A sidebar lists items grouped by key; the detail slot renders the active item.
// Next/prev buttons (bottom-right) cycle through every item in list order.

// The page maps its own data to this concrete shape so the layout stays generic-free.
// id is the unique slug used for selection and navigation.
// group is the sidebar heading the item lives under; label is the button text.
export type SidebarItem = {
  id: string
  group: string
  label: string
}

// Groups items in first-seen order so the page controls grouping via item order.
const groupItems = (items: SidebarItem[]) => {
  const groups: Record<string, SidebarItem[]> = {}
  const order: string[] = []

  for (const item of items) {
    const bucket = groups[item.group] ?? []
    if (bucket.length === 0) order.push(item.group)
    bucket.push(item)
    groups[item.group] = bucket
  }

  return order.map((group) => {
    const bucket = groups[group] ?? []
    return { group, items: bucket }
  })
}

export default defineComponent({
  name: 'SidebarDetailLayout',
  props: {
    items: {
      type: Array as PropType<SidebarItem[]>,
      default: () => [],
    },
    activeId: {
      type: String,
      default: '',
    },
  },
  emits: [
    'select',
  ],
  setup (props, { emit, slots }) {
    const grouped = computed(() => groupItems(props.items))

    return () => (
      <div class='mx-auto flex w-full max-w-7xl gap-t12 px-t6 py-t12'>
        <aside class='w-60 shrink-0'>
          <div class='grid gap-t8'>
            {grouped.value.map(group => (
              <div key={group.group} class='grid gap-t3'>
                <h2 class='text-xs font-bold uppercase tracking-wider text-zinc-500'>{group.group}</h2>
                <div class='grid gap-t1'>
                  {group.items.map(item => (
                    <button key={item.id} aria-current={item.id === props.activeId ? 'page' : undefined} class={sidebarButtonVariants({ active: item.id === props.activeId })} data-testid={`sidebar-item-${item.id}`} type='button' onClick={() => { emit('select', item.id) }}>{item.label}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>
        <section class='min-h-[60vh] flex-1'>
          {slots.default && slots.default()}
        </section>
      </div>
    )
  },
})
