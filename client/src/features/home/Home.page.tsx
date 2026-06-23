import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import FeaturedProjects from './FeaturedProjects'
import BannerHeadline from '~/components/BannerHeadline'
import Button from '~/components/form/Button'

// Recreates the original dustindowell.com home card verbatim:
// 480px card, 36px-padded gradient banner with the hand-drawn SVG headline, weight-300 18px/2 copy, outlined button.
// The theme toggle lives in the global footer, not here.
export default defineComponent({
  name: 'HomePage',
  setup () {
    const router = useRouter()

    return () => (
      <div class='grid gap-t12 py-t12'>
        <div class='home-card mx-auto w-full max-w-[480px] rounded-xl bg-dark-400 transition-colors'>
          <div class='rounded-[12px_12px_6px_6px] bg-gradient-to-tr from-white from-[-30%] via-brand-blue to-brand-purple p-t12'>
            <BannerHeadline variant='developer-designer-artist'/>
          </div>
          <div class='grid gap-t4 px-t12 pb-t12 pt-0'>
            <p class='home-copy indent-t8 text-lg font-light leading-loose text-light-500'>
              I build web apps that automate workflows and boost productivity. I prioritize
              maintainability and reducing friction over everything else.
            </p>
            <p class='home-copy indent-t8 text-lg font-light leading-loose text-light-500'>
              I'm looking for projects where I can apply this and create platforms that make work
              and services easier for everyone.
            </p>
            <Button classOverride='mx-auto' color='brand-outline' size='xl' text='Hire Me' weight='light' onClick={() => router.push({ name: 'resume' })}/>
          </div>
        </div>
        <FeaturedProjects/>
      </div>
    )
  },
})
