import { defineComponent, type PropType } from 'vue'

// The hand-drawn home banner headline, recreated as a component (the onclick way of treating SVG/logo art).
// The SVG is written by hand so the three lines stay responsive; the alt-equivalent lives on the title prop for a11y.
const bannerLines: Record<string, string[]> = {
  'developer-designer-artist': ['DEVELOPER +', 'DESIGNER +', 'ARTIST'],
  'software-engineer': ['SOFTWARE', 'ENGINEER'],
}

export default defineComponent({
  name: 'BannerHeadline',
  props: {
    variant: {
      type: String as PropType<keyof typeof bannerLines>,
      default: 'developer-designer-artist',
    },
  },
  setup (props) {
    return () => {
      const lines = bannerLines[props.variant] ?? bannerLines['developer-designer-artist']
      const viewHeight = lines.length * 8.625 + 1
      return (
        <svg aria-label={lines.join(' ')} class='block w-full' role='img' viewBox={`0 0 52 ${viewHeight}`}>
          <style>{'text { font: 800 10px/1 Goldbill, sans-serif; }'}</style>
          {lines.map((line, index) => (
            <text key={line} class='fill-dark-500' y={`${0.75 + index * 0.875}em`}>{line}</text>
          ))}
        </svg>
      )
    }
  },
})
