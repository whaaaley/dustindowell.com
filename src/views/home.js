
import { div, h, p, source, svg, text, video } from '../lib/vnodes/html'

import Link from './_link'
import main from './_main'

const Tooltip = props => {
  const classList = props.class
    ? 'home-tooltip ' + props.class
    : 'home-tooltip'

  return div({ class: classList }, [
    text(props.content)
  ])
}

const Text = (h, data) => h([text(data)])

const First = 'Hello, I\'m Dustin. I\'m a self taught developer, designer, ' +
  'and artist. I have a crazy huge passion for micro frameworks ' +
  'and minimal tooling. I love to write apps that are small, fast, and ' +
  'accessible.'

const Second = 'I\'m looking for interesting projects where I\'m allowed to ' +
  'write modern, accessible, high quality code that\'s tailored to the needs ' +
  'of a specific app. I love to write unique and effective software.'

const svgStyle = data => h('style')([text(data)])
const svgText = (props, data) => h('text')(props, [text(data)])

const Banner = () => {
  return div({ class: 'banner', alt: 'Developer + Designer + Artist' }, [
    svg({ viewBox: '0 0 52 26' }, [
      svgStyle('text { font: 800 10px/1 Goldbill, sans-serif; fill: #1f1f23; }'),
      svgText({ y: '0.75em' }, 'DEVELOPER +'),
      svgText({ y: '1.625em' }, 'DESIGNER +'),
      svgText({ y: '2.5em' }, 'ARTIST')
    ]),
    Tooltip({
      content: 'This SVG heading was written by hand to ensure responsiveness. A11y and SEO performance is maintained by using an alt attribute on the SVG.'
    })
  ])
}

const LightSwitch = data => {
  const classList = data.theme
    ? 'switch -light'
    : 'switch -dark'

  return div({ class: 'switch-container' }, [
    div({ class: classList, onclick: data.onclick }, [
      div()
    ]),
    Tooltip({
      content: 'This project uses CSS custom properties! One of the things custom properties allows you to do is theme web apps. Check it out!'
    })
  ])
}

const Home = (state, dispatch) => {
  const { kb, ms } = state.benchmark
  const { year } = state.footer

  return div({ class: 'home' }, [
    div({ class: 'card' }, [
      Banner(),
      div([
        video({ autoplay: true, loop: true, muted: true }, [
          source({ src: '/cache/lighthouse.webm', type: 'video/webm' }),
          source({ src: '/cache/lighthouse.mp4', type: 'video/mp4' })
        ]),
        Tooltip({
          class: '-left',
          content: 'This video uses the webm video format. It\'s file size clocks in at tiny 216 kB. By contrast the backup mp4 is gigantic 2097 kB.'
        }),
        Tooltip({
          class: '-right',
          content: 'Performance optimization is one of my favorite things to do. I\'ve spent thousands of hours researching and testing the best ways to optimize my web applications.'
        })
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
      div({ class: 'footer-text' }, [
        text('performance benchmarks\n'),
        text(`index.html ${kb} kB - load time ${ms} ms\n`),
        text('© Dustin Dowell, ' + year)
      ]),
      Tooltip({
        class: '-left',
        content: `This app's HTML, CSS, and JS is only ${kb} kB after being unzipped! With gzip compression it's around ${Math.round(kb / 3)} kB! That's impressive considering this app uses flux architecture and virtual DOM for the view layer. For comparison React alone is 40 kB gzipped and Vue is 21 kB gzipped.`
      })
    ])
  ])
}

export default {
  view: main(Home),
  onroute: () => {}
}
