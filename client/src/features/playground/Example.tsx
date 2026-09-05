import { defineComponent, type PropType } from 'vue'
import StateBox from '~/components/feedback/StateBox.tsx'

export default defineComponent({
  name: 'Example',
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    testId: {
      type: String,
      required: true,
    },
    state: {
      type: Object as PropType<Record<string, unknown>>,
      required: true,
    },
  },
  setup (props, { slots }) {
    return () => (
      <section class='grid gap-page-half' data-testid={props.testId}>
        <h3 class='text-page-h2 font-black tracking-[0.5px]'>{props.title}</h3>
        <p class='text-page-body text-zinc-400'>{props.description}</p>
        {slots.default && slots.default()}
        <StateBox state={props.state}/>
      </section>
    )
  },
})
