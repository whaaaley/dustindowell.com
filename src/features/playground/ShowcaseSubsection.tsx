import { defineComponent } from 'vue'

// Groups a set of component examples under a labelled heading (the onclick playground pattern).
export default defineComponent({
  name: 'ShowcaseSubsection',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup (props, { slots }) {
    return () => (
      <div class='grid gap-t4'>
        <h3 class='text-zinc-300'>{props.title}</h3>
        <div class='flex flex-wrap items-center gap-t4 rounded-lg border border-zinc-700 bg-dark-400 p-t6'>
          {slots.default && slots.default()}
        </div>
      </div>
    )
  },
})
