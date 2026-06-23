import { defineComponent, type PropType } from 'vue'

// Shared tag chips used by the work, blog, and open-source detail views so every page renders tags identically.
export default defineComponent({
  name: 'TagList',
  props: {
    tags: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  setup (props) {
    return () => {
      if (props.tags.length === 0) {
        return null
      }

      return (
        <div class='flex flex-wrap gap-t2'>
          {props.tags.map(tag => (
            <span key={tag} class='rounded-full bg-zinc-800 px-t3 py-t1 text-xs text-zinc-300'>{tag}</span>
          ))}
        </div>
      )
    }
  },
})
