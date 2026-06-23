import { PhDownload, PhEnvelope, PhMagnifyingGlass } from '@phosphor-icons/vue'
import { useHead } from '@unhead/vue'
import { defineComponent, ref } from 'vue'
import BannerHeadline from '~/components/BannerHeadline'
import ThemeToggle from '~/components/ThemeToggle'
import ShowcaseSubsection from './ShowcaseSubsection'
import Badge from '~/components/data/Badge'
import Button from '~/components/form/Button'
import Toggle from '~/components/form/Toggle'
import Gallery, { type GalleryImage } from '~/components/Gallery'

// Sample screenshots for the gallery showcase, drawn from the Compose project assets.
const galleryImages: GalleryImage[] = [
  { src: '/screenshots/compose/33_experiment_report_calendar.png', alt: 'Experiment report calendar' },
  { src: '/screenshots/compose/16_project_experiment_list.png', alt: 'Project experiment list' },
  { src: '/screenshots/compose/20_experiment_variants.png', alt: 'Experiment variants' },
  { src: '/screenshots/compose/22_experiment_targeting.png', alt: 'Experiment targeting' },
  { src: '/screenshots/compose/24_experiment_traffic.png', alt: 'Experiment traffic' },
  { src: '/screenshots/compose/32_experiment_report_chart.png', alt: 'Experiment report chart' },
  { src: '/screenshots/compose/35_experiment_report_winner.png', alt: 'Experiment report winner' },
  { src: '/screenshots/compose/06_org_billing.png', alt: 'Organization billing' },
  { src: '/screenshots/compose/12_project_snippets.png', alt: 'Project snippets' },
]

// Component playground (the onclick playground pattern, scoped to this site's components).
// Lets us eyeball Button variants, the banner headline, and badges in one place.
export default defineComponent({
  name: 'PlaygroundPage',
  setup () {
    useHead({ title: 'Playground | Dustin Dowell' })

    const toggleSm = ref(false)
    const toggleSmOn = ref(true)
    const toggleLg = ref(false)
    const toggleLgOn = ref(true)
    const themeToggle = ref(false)

    return () => (
      <div class='mx-auto grid max-w-7xl gap-t8 px-t6 py-t12'>
        <header class='grid gap-t3'>
          <p class='text-sm uppercase tracking-wider text-brand-blurple'>Component showcase</p>
          <h1 class='font-inter text-[48px] font-black uppercase leading-none text-white'>Playground</h1>
          <p class='max-w-3xl font-inter text-[14px] leading-[1.7142857143] text-zinc-300'>
            Every reusable component in one place, with its variants and states laid out for quick visual checks.
          </p>
        </header>
        <ShowcaseSubsection title='Toggle sizes'>
          <Toggle size='sm' v-model:active={toggleSm.value}/>
          <Toggle size='sm' v-model:active={toggleSmOn.value}/>
          <Toggle size='lg' v-model:active={toggleLg.value}/>
          <Toggle size='lg' v-model:active={toggleLgOn.value}/>
        </ShowcaseSubsection>
        <ShowcaseSubsection title='Toggle disabled'>
          <Toggle disabled active={false}/>
          <Toggle active disabled/>
        </ShowcaseSubsection>
        <ShowcaseSubsection title='Theme toggle'>
          <ThemeToggle v-model:active={themeToggle.value}/>
        </ShowcaseSubsection>
        <ShowcaseSubsection title='Button colors'>
          <Button color='primary' text='Primary'/>
          <Button color='ghost' text='Ghost'/>
          <Button color='outline' text='Outline'/>
          <Button color='brand-outline' text='Brand Outline'/>
        </ShowcaseSubsection>
        <ShowcaseSubsection title='Button sizes'>
          <Button size='xs' text='XS'/>
          <Button size='sm' text='SM'/>
          <Button size='md' text='MD'/>
          <Button size='lg' text='LG'/>
          <Button size='xl' text='XL'/>
        </ShowcaseSubsection>
        <ShowcaseSubsection title='Button weight'>
          <Button text='Light' weight='light'/>
          <Button text='Medium' weight='medium'/>
        </ShowcaseSubsection>
        <ShowcaseSubsection title='Button with icon'>
          <Button icon={PhEnvelope} text='Contact'/>
          <Button color='outline' icon={PhDownload} text='Resume'/>
          <Button color='ghost' icon={PhMagnifyingGlass} text='Search'/>
        </ShowcaseSubsection>
        <ShowcaseSubsection title='Button icon only'>
          <Button ariaLabel='Contact' icon={PhEnvelope}/>
          <Button ariaLabel='Search' color='outline' icon={PhMagnifyingGlass}/>
        </ShowcaseSubsection>
        <ShowcaseSubsection title='Badge'>
          <Badge>Default</Badge>
        </ShowcaseSubsection>
        <ShowcaseSubsection title='Gallery'>
          <div class='w-full max-w-2xl'>
            <Gallery images={galleryImages}/>
          </div>
        </ShowcaseSubsection>
        <ShowcaseSubsection title='Banner headline'>
          <div class='w-64 rounded-xl bg-brand-gradient p-t8'>
            <BannerHeadline variant='developer-designer-artist'/>
          </div>
          <div class='w-64 rounded-xl bg-brand-gradient p-t8'>
            <BannerHeadline variant='software-engineer'/>
          </div>
        </ShowcaseSubsection>
      </div>
    )
  },
})
