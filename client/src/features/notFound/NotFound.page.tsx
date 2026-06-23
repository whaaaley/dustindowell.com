import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'

export default defineComponent({
  name: 'NotFoundPage',
  setup () {
    return () => (
      <div class='flex min-h-[60vh] flex-col items-center justify-center gap-t4 px-t6 text-center'>
        <h1 class='text-6xl font-bold text-white'>404</h1>
        <p class='text-zinc-300'>This page does not exist.</p>
        <RouterLink class='text-brand-blurple hover:underline' to={{ name: 'home' }}>
          Back home
        </RouterLink>
      </div>
    )
  },
})
