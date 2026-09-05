import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'StateBox',
  props: {
    state: {
      type: Object as PropType<Record<string, unknown>>,
      required: true,
    },
  },
  setup (props) {
    return () => (
      <pre class='border border-zinc-800 bg-zinc-950 p-page-half text-page-body text-zinc-300' data-testid='state-box'>
        {JSON.stringify(props.state, null, 2)}
      </pre>
    )
  },
})
