import { PhArrowSquareOut, PhEye, PhGithubLogo, PhHeart } from '@phosphor-icons/vue'
import { kebabCase } from 'change-case'
import { cva, type VariantProps } from 'class-variance-authority'
import { computed, defineComponent, type Component, type PropType, ref } from 'vue'
import Badge from '~/components/data/Badge'
import Button from '~/components/form/Button'

// Aspect ratios for the preview box; named so Tailwind picks them up at build time.
const frameVariants = cva([
  'overflow-hidden rounded-md border border-zinc-700',
], {
  variants: {
    aspect: {
      wide: 'aspect-video',
      landscape: 'aspect-[4/3]',
      square: 'aspect-square',
      portrait: 'aspect-[3/4]',
      tall: 'aspect-[2/3]',
    },
    // White suits light apps and avoids the dark-to-white flash while an app loads.
    bg: {
      dark: 'bg-zinc-900',
      white: 'bg-white',
    },
  },
  defaultVariants: {
    aspect: 'landscape',
    bg: 'dark',
  },
})

// Scale the embedded iframe by inflating both dimensions by 1/scale, so the scaled-down content fills the box with no gap or overflow.
const iframeVariants = cva([
  'origin-top-left border-0',
], {
  variants: {
    zoom: {
      full: 'h-full w-full',
      90: 'h-[111.11%] w-[111.11%] scale-90',
      75: 'h-[133.33%] w-[133.33%] scale-75',
      50: 'h-[200%] w-[200%] scale-50',
    },
  },
  defaultVariants: {
    zoom: 'full',
  },
})

type FrameVariants = VariantProps<typeof frameVariants>
type IframeVariants = VariantProps<typeof iframeVariants>

// One embedded preview. Pages with a single preview can use liveUrl instead.
type Frame = {
  src: string
  title?: string
  aspect?: FrameVariants['aspect']
  zoom?: IframeVariants['zoom']
}

// CodePen stats snapshot; displayed beneath the iframe as a small metadata strip.
type PenStats = {
  label?: string
  created: string
  loves: number
  views: number
}

// Only surface stats worth bragging about; a pen with a handful of loves reads worse than no stats at all.
export const isImpressiveStat = (stat: PenStats): boolean => (
  stat.loves > 10
)

// A source link. Pages with one repo can use repoUrl instead.
type Repo = {
  url: string
  label: string
  icon?: Component
}

// A switchable preview source shown in the nav bar above the iframe.
type View = {
  label: string
  src: string
  zoom?: IframeVariants['zoom']
}

const formatCreated = (iso: string) => {
  const [year, month, day] = iso.split('-').map(Number)
  const date = new Date(year, month - 1, day)

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

// Metadata strip shown beneath a CodePen iframe.
const PenStatsRow = defineComponent({
  name: 'PenStatsRow',
  props: {
    stat: {
      type: Object as PropType<PenStats>,
      required: true,
    },
  },
  setup (props) {
    return () => (
      <div class='flex flex-wrap items-center gap-t2'>
        {props.stat.label && (
          <Badge tone='lighter' size='xs'>{props.stat.label}</Badge>
        )}
        <Badge tone='lighter' size='xs'>{formatCreated(props.stat.created)}</Badge>
        <Badge tone='lighter' size='xs' icon={PhHeart}>{props.stat.loves.toLocaleString()}</Badge>
        <Badge tone='lighter' size='xs' icon={PhEye}>{props.stat.views.toLocaleString()}</Badge>
      </div>
    )
  },
})

// Nav-bar tab above the iframe; highlights the active view.
const viewTabVariants = cva([
  'rounded-md px-t3 py-t1 text-sm transition-colors',
], {
  variants: {
    active: {
      true: 'bg-zinc-800 text-white',
      false: 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200',
    },
  },
})

// Consistent layout for every demo page: header (category / title / tagline),
// the demo's copy via the default slot, an embedded live preview, then a GitHub link.
export default defineComponent({
  name: 'DemoContent',
  props: {
    category: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    tagline: {
      type: String,
      required: true,
    },
    liveUrl: {
      type: String,
      required: true,
    },
    repoUrl: {
      type: String,
      default: undefined,
    },
    aspect: {
      type: String as PropType<FrameVariants['aspect']>,
      default: 'landscape',
    },
    // Scale the embedded preview down to fit more of a wide layout into the box.
    zoom: {
      type: String as PropType<IframeVariants['zoom']>,
      default: 'full',
    },
    // Background behind the iframe; use white for light apps to avoid a load flash.
    bg: {
      type: String as PropType<FrameVariants['bg']>,
      default: 'dark',
    },
    // Multiple previews; when omitted, a single frame is built from liveUrl/aspect/zoom.
    frames: {
      type: Array as PropType<Frame[]>,
      default: undefined,
    },
    // Multiple source links; when omitted, a single GitHub link is built from repoUrl.
    repos: {
      type: Array as PropType<Repo[]>,
      default: undefined,
    },
    // CodePen stats per pen; shown beneath each iframe in order.
    stats: {
      type: Array as PropType<PenStats[]>,
      default: undefined,
    },
    // ISO date the stats were last captured, shown as a disclaimer below the stats.
    statsUpdated: {
      type: String,
      default: undefined,
    },
    // Switchable iframe sources shown as a nav bar above the preview; first is the default.
    views: {
      type: Array as PropType<View[]>,
      default: undefined,
    },
  },
  setup (props, { slots }) {
    const activeView = ref(props.views ? props.views[0].src : props.liveUrl)

    // The active view, when the nav bar is in use; otherwise there is no view.
    const currentView = computed(() => {
      if (!props.views) {
        return null
      }

      const [match] = props.views.filter(candidate => candidate.src === activeView.value)

      return match ?? null
    })

    const resolvedFrames = computed<Frame[]>(() => {
      if (props.frames) {
        return props.frames
      }

      // A view can override the zoom (e.g. a busy Home page shown smaller than the editor).
      const view = currentView.value
      const zoom = view && view.zoom ? view.zoom : props.zoom

      return [{ src: activeView.value, title: props.title, aspect: props.aspect, zoom }]
    })

    const resolvedRepos = computed<Repo[]>(() => {
      if (props.repos) {
        return props.repos
      }

      if (!props.repoUrl) {
        return []
      }

      return [{ url: props.repoUrl, label: 'GitHub' }]
    })

    const handleViewSelect = (src: string) => {
      activeView.value = src
    }

    return () => (
      <div class='grid gap-t6'>
        <div class='grid gap-t2'>
          <div class='flex h-8 items-end justify-between gap-t4'>
            <p class='text-sm font-bold uppercase tracking-wider text-brand-blurple'>{props.category}</p>
            <div class='flex shrink-0 flex-wrap justify-end gap-t2'>
              <a href={activeView.value} rel='noopener noreferrer' target='_blank'>
                <Button color='outline' icon={PhArrowSquareOut} size='sm' text='Open'/>
              </a>
              {resolvedRepos.value.map(repo => (
                <a key={repo.url} href={repo.url} rel='noopener noreferrer' target='_blank'>
                  <Button color='outline' icon={repo.icon ?? PhGithubLogo} size='sm' text={repo.label}/>
                </a>
              ))}
            </div>
          </div>
          <h1 class='text-4xl font-bold text-white'>{props.title}</h1>
          <p class='text-lg text-zinc-300'>{props.tagline}</p>
        </div>
        <div class='grid max-w-4xl gap-t4'>
          {slots.default && slots.default()}
        </div>
        {props.views && (
          <div class='flex gap-t1'>
            {props.views.map(view => (
              <button key={view.src} class={viewTabVariants({ active: activeView.value === view.src })} data-testid={`view-tab-${kebabCase(view.label)}`} type='button' onClick={() => { handleViewSelect(view.src) }}>
                {view.label}
              </button>
            ))}
          </div>
        )}
        {resolvedFrames.value.map((frame, index) => {
          const stat = props.stats ? props.stats[index] : undefined

          return (
            <div key={index} class='grid gap-t4'>
              <div class={frameVariants({ aspect: frame.aspect, bg: props.bg })}>
                <iframe class={iframeVariants({ zoom: frame.zoom })} data-testid='demo-frame' src={frame.src} title={frame.title ?? props.title}/>
              </div>
              {stat && isImpressiveStat(stat) && (
                <div class='flex items-center justify-between gap-t4'>
                  <PenStatsRow stat={stat}/>
                  {props.statsUpdated && (
                    <p class='shrink-0 text-xs text-zinc-600'>Stats last updated {formatCreated(props.statsUpdated)}.</p>
                  )}
                </div>
              )}
            </div>
          )
        })}
        {slots.footer && (
          <div class='mt-t2 flex items-start justify-between gap-t4'>
            {slots.footer()}
            {props.statsUpdated && (
              <p class='shrink-0 text-xs text-zinc-600'>Stats last updated {formatCreated(props.statsUpdated)}.</p>
            )}
          </div>
        )}
      </div>
    )
  },
})
