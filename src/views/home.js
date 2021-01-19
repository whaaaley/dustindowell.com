
import { div, h, h1, p, svg, text } from '../lib/vnodes/html'

import link from './_link'
import main from './_main'

const Foo = (h, data) => h([text(data)])

const svgStyle = data => h('style')([text(data)])
const svgText = (props, data) => h('text')(props, [text(data)])

const Banner = () => {
  return svg({ viewBox: '0 0 52 26' }, [
    svgStyle('text { font: 800 10px/1 Goldbill; fill: #1f1f23; }'),
    svgText({ x: '0', y: '0.75em' }, 'DEVELOPER +'),
    svgText({ x: '0', y: '1.625em' }, 'DESIGNER +'),
    svgText({ x: '0', y: '2.5em' }, 'ARTIST')
  ])
}

const First = 'Hello, I\'m Dustin. I\'m a self taught developer, designer, ' +
  'and artist. I have a crazy huge passion for micro frameworks ' +
  'and minimal tooling.'

const Second = 'I\'m looking for interesting projects where I\'m allowed to ' +
  'write code that follows my ideologies. I\'m at my best when I have ' +
  'freedom to be creative and experimental. I love to write unique and ' +
  'effective software.'

const Home = (state, dispatch) => {
  const Link = link(state, dispatch)
  const { kb, ms } = state.benchmark

  return div({ class: 'home' }, [
    div({ class: 'card _topography' }, [
      div([
        Banner()
        // Foo(h1, 'Developer +\nDesigner +\nArtist')
      ]),
      div([
        Foo(p, First),
        Foo(p, Second),
        Link({ to: '/resume' }, 'Hire Me')
      ])
    ]),
    div({ class: 'footer' }, [
      text('performance benchmarks\n'),
      text(`index.html ${kb} kB - load time ${ms} ms\n`),
      text('©2021 Dustin Dowell')
    ])
  ])
}

export default {
  view: main(Home),
  init: () => {
    console.log('home')
  }
}
