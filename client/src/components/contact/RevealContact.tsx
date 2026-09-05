import { computed, defineComponent, type PropType, ref } from 'vue'

export type ContactKind = 'email' | 'phone'

const schemes: Record<ContactKind, string> = {
  email: 'mailto:',
  phone: 'tel:',
}

export default defineComponent({
  name: 'RevealContact',
  props: {
    kind: {
      type: String as PropType<ContactKind>,
      required: true,
    },
    encoded: {
      type: String,
      required: true,
    },
    encodedHref: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      required: true,
    },
  },
  setup (props) {
    const revealed = ref(false)

    const value = computed(() => (revealed.value ? atob(props.encoded) : ''))
    const href = computed(() => `${schemes[props.kind]}${atob(props.encodedHref || props.encoded)}`)

    const handleReveal = () => {
      revealed.value = true
    }

    return () => (revealed.value
      ? <a data-testid={`contact-${props.kind}`} href={href.value}>{value.value}</a>
      : <button class='underline decoration-zinc-500 underline-offset-2 hover:decoration-white' data-testid={`reveal-${props.kind}`} type='button' onClick={handleReveal}>{props.label}</button>
    )
  },
})
