
import { div, h, p, svg, text } from '../lib/vnodes/html'

import link from './_link'
import main from './_main'

const Text = (h, data) => h([text(data)])

const First = 'Hello, I\'m Dustin. I\'m a self taught developer, designer, ' +
  'and artist. I have a crazy huge passion for micro frameworks ' +
  'and minimal tooling.'

const Second = 'I\'m looking for interesting projects where I\'m allowed to ' +
  'write code that follows my ideologies. I\'m at my best when I have ' +
  'freedom to be creative and experimental. I love to write unique and ' +
  'effective software.'

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

// const HistoryPanel = history => {
//   const target = []
//
//   for (let i = 0; i < history.length; i++) {
//     const [name, data] = history[i]
//     const json = JSON.stringify(data, null, 2)
//
//     target.push(div([text(name + '\n'), text(json)]))
//   }
//
//   return div({ class: 'history-panel -attach' }, target)
// }

const Home = register => {
  // <- register actions here ->

  return (state, dispatch) => {
    const Link = link(state, dispatch)

    const { kb, ms } = state.benchmark
    const { year } = state.footer

    return div({ class: 'home' }, [
      // HistoryPanel(state.history),
      div({ class: 'card' }, [
        Banner(),
        div([
          Text(p, First),
          Text(p, Second),
          Link({ to: '/resume' }, 'Hire Me')
        ])
      ]),
      div({ class: 'footer' }, [
        text('performance benchmarks\n'),
        text(`index.html ${kb} kB - load time ${ms} ms\n`),
        text('©' + year + ' Dustin Dowell')
      ])
    ])
  }
}

export default {
  view: register => main(Home(register)),
  onroute: () => () => {
    console.log('hello from home')
  }
}
