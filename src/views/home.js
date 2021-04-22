
import { div, h, p, source, svg, text, video } from '../lib/vnodes/html'

import Link from './_link'
import main from './_main'

const Text = (h, data) => h([text(data)])

const First = 'Hello, I\'m Dustin. I\'m a self taught developer, designer, ' +
  'and artist. I have a crazy huge passion for micro frameworks ' +
  'and minimal tooling. I love to write apps that are small, fast, and ' +
  'accessible.'

const Second = 'I\'m looking for interesting projects where I\'m allowed to ' +
  'write mordern, acessible, high quality code that\'s tailored to the needs ' +
  'of a specific app. I love to write unique and effective software.'

const svgStyle = data => h('style')([text(data)])
const svgText = (props, data) => h('text')(props, [text(data)])

const Banner = () => {
  return div({ class: 'banner' }, [
    svg({ viewBox: '0 0 52 26' }, [
      svgStyle('text { font: 800 10px/1 Goldbill, sans-serif; fill: #1f1f23; }'),
      svgText({ y: '0.75em' }, 'DEVELOPER +'),
      svgText({ y: '1.625em' }, 'DESIGNER +'),
      svgText({ y: '2.5em' }, 'ARTIST')
    ])
  ])
}

const LightSwitch = data => {
  const classList = data.theme
    ? 'switch -light'
    : 'switch -dark'

  return div({ class: classList, onclick: data.onclick }, [
    div()
  ])
}

const Home = (state, dispatch) => {
  const { kb, ms } = state.benchmark
  const { year } = state.footer

  return div({ class: 'home' }, [
    // HistoryPanel(state.history),
    div({ class: 'card' }, [
      Banner(),
      video({ autoplay: true, loop: true, muted: true }, [
        source({ src: '/cache/lighthouse.webm', type: 'video/webm' }),
        source({ src: '/cache/lighthouse.mp4', type: 'video/mp4' })
      ]),
      div({ class: 'body' }, [
        Text(p, First),
        Text(p, Second),
        Link({ to: '/resume' }, 'Hire Me')
      ])
    ]),
    LightSwitch({
      theme: state.theme,
      onclick: () => {
        dispatch(state => {
          state.theme = !state.theme
          return { state }
        })
      }
    }),
    div({ class: 'footer' }, [
      text('performance benchmarks\n'),
      text(`index.html ${kb} kB - load time ${ms} ms\n`),
      text('© ' + year + ' Dustin Dowell')
    ])
  ])
}

export default {
  view: main(Home),
  onroute: () => {}
}
