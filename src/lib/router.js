
import app from './pocket'
import router from '../stores/router'

export default ({ state, pages, rewrites, mount }) => {
  let route

  state.router = {
    id: null,
    query: null,
    to: '/'
  }

  app({
    state,
    view: (state, dispatch) => {
      return route.view(state, dispatch)
    },
    mount: (state, dispatch) => {
      const handler = () => {
        dispatch(router.actions.routerInit, rewrites)
        route = pages[state.router.to] || pages['/missing']
      }

      handler()

      window.addEventListener('pushstate', handler)
      window.addEventListener('popstate', handler)

      mount(state, dispatch)
    }
  })
}
