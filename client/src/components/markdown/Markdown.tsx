import { defineComponent } from 'vue'
import { useMarkdown } from '~/hooks/useMarkdown.ts'

export default defineComponent({
  name: 'Markdown',
  props: {
    content: {
      type: String,
      required: true,
    },
  },
  setup (props) {
    const { vnodes } = useMarkdown(props)

    return () => (
      <div class='markdown'>
        {vnodes.value}
      </div>
    )
  },
})
