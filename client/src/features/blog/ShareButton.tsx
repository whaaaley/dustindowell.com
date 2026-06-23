import { defineComponent } from 'vue'
import Button from '~/components/form/Button'

export default defineComponent({
  name: 'ShareButton',
  props: {
    platform: {
      type: String,
      default: 'Bluesky',
    },
  },
  setup (props) {
    const share = () => {
      if (navigator.share) {
        void navigator.share({
          title: 'Check out this post!',
          url: window.location.href,
        })
      }
      else {
        alert('Sharing is not supported in this browser.')
      }
    }

    return () => (
      <Button onClick={share}>
        Reply on {props.platform}
      </Button>
    )
  },
})
