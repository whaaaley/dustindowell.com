
import { div, h1, h2, p, text } from '../lib/vnodes/html'

import main from './_main'

// import * as actions from './actions'
//
// const Blog = register => {
//   const foo = register('blog.foo', (state, data) => {
//     state.foo.bar = data.foo
//     return { foo: state.foo }
//   })
//
//   return (state, dispatch) => {
//     const Link = link(state, dispatch)
//
//     return div({
//       onclick: () => {
//         dispatch(foo, { foo: 'bar' })
//       }
//     })
//   }
// }

const Text = (tag, data) => tag([text(data)])

const Blog = () => (state, dispatch) => {
  return div({ class: 'blog' }, [
    div({ class: 'blog-post _topography' }, [
      Text(h1, 'You don\'t need a JWT library 2020'),
      Text(h2, (new Date() + '').split('GMT')[0]),
      Text(p, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
    ]),
    div({ class: 'blog-post _topography' }, [
      Text(h1, 'You don\'t need CORS Middleware 2019'),
      Text(h2, (new Date() + '').split('GMT')[0]),
      Text(p, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
    ]),
    div({ class: 'blog-post _topography' }, [
      Text(h1, 'Writing A Browser Reload Server 2019'),
      Text(h2, (new Date() + '').split('GMT')[0]),
      Text(p, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
    ]),
    div({ class: 'blog-post _topography' }, [
      Text(h1, 'WebApp Rendering Strategies 2019'),
      Text(h2, (new Date() + '').split('GMT')[0]),
      Text(p, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
    ]),
    div({ class: 'blog-post' }, [
      text('yes')
    ]),
    div({ class: 'blog-post' }, [
      text('yes')
    ]),
    div({ class: 'blog-post' }, [
      text('yes')
    ]),
    div({ class: 'blog-post' }, [
      text('yes')
    ])
  ])
}

export default {
  view: (actions, register) => main(Blog(actions, register)),
  onroute: () => () => {}
}
