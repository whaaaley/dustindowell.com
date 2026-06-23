import { defineComponent, type PropType } from 'vue'
import Surface from '~/components/Surface'

// Featured project cards, recreated from the original dustindowell.com work page:
// a 16:9 screenshot, title, date, and description, with a hover lift and image zoom.

type FeaturedProject = {
  title: string
  dates: string
  image: string
  description: string[]
}

const projects: FeaturedProject[] = [
  {
    title: 'Governance: Cooperative Management Platform',
    dates: '2025 - Present',
    image: '/screenshots/governance/01_overview.png',
    description: [
      'A meeting governance platform for cooperatives.',
      'Supports scheduling events, managing agendas, taking minutes, tracking tasks, member management, and billing.',
      'Built on Vue 3, tRPC, Drizzle, and Supabase.',
    ],
  },
  {
    title: 'Compose: A/B Testing Platform',
    dates: 'Sep 2022 - Jun 2025',
    image: '/screenshots/compose/33_experiment_report_calendar.png',
    description: [
      'A/B testing platform with industry-first pay-as-you-go pricing and no contracts.',
      'Enables no-code split testing while automatically tracking revenue, engagement, and conversion rates with statistical significance calculations.',
    ],
  },
  {
    title: 'Alqen: E-Comm Automation Platform',
    dates: 'Jun 2021 - Jun 2022',
    image: '/screenshots/alqen/02_statistics_overview.png',
    description: [
      'E-commerce automation platform for Amazon and Walmart sellers.',
      'Handles inventory management, order fulfillment, and payment processing.',
      'Helps sellers find profitable products while reducing manual intervention across multiple channels.',
    ],
  },
  {
    title: 'Access Publishing: Vehicle Marketplaces',
    dates: 'Feb 2016 - Nov 2019',
    image: '/screenshots/access/01_accesspublishing_thumbnail.png',
    description: [
      'Suite of specialized vehicle and equipment marketplaces including AccessTrucks, SleeperTrader, and MachineryAccess.',
      'These platforms aggregate inventory from truck and machinery dealers nationwide for potential buyers.',
    ],
  },
]

const FeatureCard = defineComponent({
  name: 'FeatureCard',
  props: {
    project: {
      type: Object as PropType<FeaturedProject>,
      required: true,
    },
  },
  setup (props) {
    return () => (
      <Surface tone='dark-400'>
        <div class='group overflow-hidden'>
          <div class='aspect-video overflow-hidden bg-zinc-800'>
            <img alt={props.project.title} class='size-full object-cover object-top transition-transform duration-300 group-hover:scale-105' loading='lazy' src={props.project.image}/>
          </div>
          <div class='p-t6'>
            <h3 class='mb-t1 text-lg font-bold text-white'>{props.project.title}</h3>
            <p class='mb-t3 text-sm text-zinc-400'>{props.project.dates}</p>
            <p class='text-sm leading-relaxed text-zinc-300'>{props.project.description.join(' ')}</p>
          </div>
        </div>
      </Surface>
    )
  },
})

export default defineComponent({
  name: 'FeaturedProjects',
  setup () {
    return () => (
      <section class='mx-auto grid w-full max-w-5xl gap-t8 px-t6 pb-t12'>
        <div class='grid gap-t2'>
          <h2 class='text-2xl font-extrabold text-white'>Featured Projects</h2>
          <p class='text-zinc-300'>Full-stack applications I've built from concept to production.</p>
        </div>
        <div class='grid gap-t8 md:grid-cols-2'>
          {projects.map(project => <FeatureCard key={project.title} project={project}/>)}
        </div>
      </section>
    )
  },
})
