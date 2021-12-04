
import Link from './_link'

import { html, text } from '@onclick/superstatic'
const { a, div, main, nav } = html

const Main = slot => (state, dispatch) => {
  const Slot = slot(state, dispatch)

  return function () {
    const classList = state.theme ? '-light' : '-dark'

    return div({ class: classList }, [
      nav([
        div({}, [
          text('D')
        ]),
        Link({ to: '/' }, 'Home'),
        Link({ to: '/apps' }, 'Portfolio'),
        a({ href: 'https://github.com/whaaaley?tab=repositories', target: '_blank' }, [
          text('GitHub')
        ]),
        Link({ to: '/resume' }, 'Resume')
      ]),
      main([
        Slot()
      ])
    ])
  }
}

export default Main
