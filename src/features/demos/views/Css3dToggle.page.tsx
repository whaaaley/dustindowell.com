// CodePen created: 2016-09-03
import { PhCodepenLogo } from '@phosphor-icons/vue'
import { defineComponent } from 'vue'
import { env } from '~/env.ts'
import DemoContent from './DemoContent'

export default defineComponent({
  name: 'Css3dToggleDemo',
  setup () {
    const info = {
      category: 'CodePen',
      title: '3D Toggle Button',
      tagline: 'A toggle switch with a chunky 3D press.',
      liveUrl: `${env.CLIENT_DEMOS_URL}/codepen/css-3d-toggle-button/`,
      repos: [
        { url: 'https://codepen.io/dustindowell/pen/dpyxdx', label: 'CodePen', icon: PhCodepenLogo },
      ],
      aspect: 'landscape' as const,
      stats: [
        { created: '2016-09-03', loves: 7, views: 644 },
      ],
      statsUpdated: '2026-06-21',
    }

    return () => (
      <DemoContent {...info}/>
    )
  },
})
