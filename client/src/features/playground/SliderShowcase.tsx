import { defineComponent, reactive } from 'vue'
import Example from './Example.tsx'
import Slider, { type SliderImage, type SliderVariants } from '~/components/gallery/Slider.tsx'

type State = { activeIndex: number }

const images: SliderImage[] = [
  { src: '/screenshots/compose/16_project_experiment_list.webp', thumb: '/screenshots/compose/thumbs/16_project_experiment_list.webp', alt: 'Experiment list' },
  { src: '/screenshots/compose/20_experiment_variants.webp', thumb: '/screenshots/compose/thumbs/20_experiment_variants.webp', alt: 'Experiment variants' },
  { src: '/screenshots/compose/22_experiment_targeting.webp', thumb: '/screenshots/compose/thumbs/22_experiment_targeting.webp', alt: 'Experiment targeting' },
  { src: '/screenshots/compose/31_experiment_report.webp', thumb: '/screenshots/compose/thumbs/31_experiment_report.webp', alt: 'Experiment report' },
  { src: '/screenshots/compose/35_experiment_report_winner.webp', thumb: '/screenshots/compose/thumbs/35_experiment_report_winner.webp', alt: 'Experiment winner' },
]

const sizes: NonNullable<SliderVariants['size']>[] = ['sm', 'md', 'lg']

export default defineComponent({
  name: 'SliderShowcase',
  setup () {
    const sizeStates = Object.fromEntries(sizes.map(size => [size, reactive<State>({ activeIndex: 0 })]))
    const bareState = reactive<State>({ activeIndex: 0 })
    const preseededState = reactive<State>({ activeIndex: 2 })
    const keyboardState = reactive<State>({ activeIndex: 0 })

    const bind = (state: State) => ({
      activeIndex: state.activeIndex,
      onSelect: (index: number) => { state.activeIndex = index },
    })

    return () => (
      <div class='grid gap-page-line'>
        <h2 class='text-page-h1 font-black tracking-[0.5px]'>SLIDER</h2>
        {sizes.map(size => (
          <Example key={size} description={`size="${size}" with thumbnails`} state={sizeStates[size]} testId={`slider-size-${size}`} title={`Size ${size}`}>
            <Slider images={images} size={size} {...bind(sizeStates[size])}/>
          </Example>
        ))}
        <Example description='thumbnails={false}: arrows and keyboard only' state={bareState} testId='slider-bare' title='No thumbnails'>
          <Slider images={images} thumbnails={false} {...bind(bareState)}/>
        </Example>
        <Example description='activeIndex seeded to 2 marks the third thumbnail on first paint' state={preseededState} testId='slider-preseeded' title='Pre-seeded'>
          <Slider images={images} {...bind(preseededState)}/>
        </Example>
        <Example description='Focus an arrow or thumbnail, then ArrowLeft and ArrowRight move through the images, wrapping at both ends' state={keyboardState} testId='slider-keyboard' title='Keyboard'>
          <Slider images={images} {...bind(keyboardState)}/>
        </Example>
      </div>
    )
  },
})
