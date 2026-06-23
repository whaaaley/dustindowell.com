// CodePen created: 2016-11-04
import { PhCodepenLogo, PhEye, PhHeart } from '@phosphor-icons/vue'
import { defineComponent } from 'vue'
import { env } from '~/env.ts'
import Badge from '~/components/data/Badge'
import DemoContent, { isImpressiveStat } from './DemoContent'

export default defineComponent({
  name: 'VueQueueDemo',
  setup () {
    const info = {
      category: 'CodePen',
      title: 'Vue Queue Items',
      tagline: 'The same queue UI built three ways, each with a different approach to state management.',
      liveUrl: `${env.CLIENT_DEMOS_URL}/codepen/vue-queue-3/`,
      views: [
        { label: 'Vuex', src: `${env.CLIENT_DEMOS_URL}/codepen/vue-queue-3/` },
        { label: 'Local State', src: `${env.CLIENT_DEMOS_URL}/codepen/vue-queue-2/` },
        { label: 'Events', src: `${env.CLIENT_DEMOS_URL}/codepen/vue-queue-1/` },
      ],
      repos: [
        { url: 'https://codepen.io/dustindowell/pen/MbWGNa', label: 'Vuex', icon: PhCodepenLogo },
        { url: 'https://codepen.io/dustindowell/pen/ObJmVG', label: 'Local State', icon: PhCodepenLogo },
        { url: 'https://codepen.io/dustindowell/pen/ObJXzm', label: 'Events', icon: PhCodepenLogo },
      ],
      aspect: 'landscape' as const,
      bg: 'white' as const,
      statsUpdated: '2026-06-21',
    }

    const formatCreated = (iso: string) => {
      const [year, month, day] = iso.split('-').map(Number)
      const date = new Date(year, month - 1, day)

      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }

    const penStats = [
      { label: 'Vuex', created: '2016-11-04', loves: 4, views: 3161 },
      { label: 'Local State', created: '2016-11-04', loves: 0, views: 75 },
      { label: 'Events', created: '2016-11-03', loves: 0, views: 736 },
    ].filter(isImpressiveStat)

    const renderDefault = () => (
      <p class='text-zinc-300'>
        Three versions of the same queuing component I built in November 2016, each with a different state management approach in Vue 2: one using events, one using local state, and one using Vuex.
      </p>
    )

    const renderFooter = () => (
      <div class='grid gap-t2'>
        {penStats.map(stat => (
          <div key={stat.label} class='flex flex-wrap items-center gap-t2'>
            <Badge tone='lighter' size='xs'>{stat.label}</Badge>
            <Badge tone='lighter' size='xs'>{formatCreated(stat.created)}</Badge>
            <Badge tone='lighter' size='xs' icon={PhHeart}>{stat.loves.toLocaleString()}</Badge>
            <Badge tone='lighter' size='xs' icon={PhEye}>{stat.views.toLocaleString()}</Badge>
          </div>
        ))}
      </div>
    )

    // Omit the footer slot entirely when no pen clears the loves bar, so DemoContent renders nothing there.
    const slots = penStats.length
      ? { default: renderDefault, footer: renderFooter }
      : { default: renderDefault }

    return () => (
      <DemoContent {...info} v-slots={slots}/>
    )
  },
})
