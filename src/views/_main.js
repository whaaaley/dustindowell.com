
import { a, div, main, nav, text } from '../lib/vnodes/html'
import Link from './_link'

const Text = (h, data) => h([text(data)])

const Main = slot => (state, dispatch) => {
  const Slot = slot(state, dispatch)
  const classList = state.theme ? '-light' : '-dark'

  return div({ class: classList }, [
    nav([
      Text(div, 'D'),
      Link({ to: '/' }, 'Home'),
      Link({ to: '/apps' }, 'Portfolio'),
      a({ href: 'https://github.com/whaaaley?tab=repositories', target: '_blank' }, [
        text('GitHub')
      ]),
      Link({ to: '/resume' }, 'Resume')
    ]),
    main([
      Slot
    ])
  ])
}

export default Main
