import { PhCodepenLogo, PhEye, PhHeart } from '@phosphor-icons/vue'
import { defineComponent } from 'vue'
import { env } from '~/env.ts'
import Badge from '~/components/data/Badge'
import DemoContent, { isImpressiveStat } from './DemoContent'

export default defineComponent({
  name: 'FrameworkChallengeDemo',
  setup () {
    const info = {
      category: 'CodePen',
      title: 'Framework Challenge',
      tagline: 'The same challenge built three ways: Vue.js, React, and my own pocket framework.',
      liveUrl: `${env.CLIENT_DEMOS_URL}/codepen/challenge-vue-js/`,
      views: [
        { label: 'Vue.js', src: `${env.CLIENT_DEMOS_URL}/codepen/challenge-vue-js/` },
        { label: 'React', src: `${env.CLIENT_DEMOS_URL}/codepen/challenge-react/` },
        { label: 'Pocket', src: `${env.CLIENT_DEMOS_URL}/codepen/challenge-pocket-js/` },
      ],
      repos: [
        { url: 'https://codepen.io/dustindowell/pen/zYNbjay', label: 'Vue.js', icon: PhCodepenLogo },
        { url: 'https://codepen.io/dustindowell/pen/jOyJvZG', label: 'React', icon: PhCodepenLogo },
        { url: 'https://codepen.io/dustindowell/pen/VwPREqz', label: 'Pocket', icon: PhCodepenLogo },
      ],
      aspect: 'landscape' as const,
      statsUpdated: '2026-06-21',
    }

    const formatCreated = (iso: string) => {
      const [year, month, day] = iso.split('-').map(Number)
      const date = new Date(year, month - 1, day)

      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }

    const penStats = [
      { label: 'Vue.js', created: '2021-04-26', loves: 2, views: 44 },
      { label: 'React', created: '2021-04-26', loves: 3, views: 38 },
      { label: 'Pocket', created: '2021-04-26', loves: 1, views: 20 },
    ].filter(isImpressiveStat)

    const renderDefault = () => (
      <>
        <p class='text-zinc-300'>
          A job application challenge from April 2021 where the prompt was to render a selectable list of users and display the selected UUIDs. I submitted the Vue.js version, then built a React and pocket version too just to see them side by side.
        </p>
        <p class='text-zinc-300'>
          pocket is a tiny micro-framework I wrote myself, built on Superfine.
        </p>
      </>
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
