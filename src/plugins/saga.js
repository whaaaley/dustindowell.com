
import * as sagaActions from './sagaActions'

/**
 * blah blah blah serializes actions blah blah blah
 * @module saga
 */

export default init => {
  const { state, actions, mount } = init

  const json = sessionStorage.getItem('saga')
  const history = json === null ? [] : JSON.parse(json).data

  state.saga = {
    history: history
  }

  actions.saga = {
    replay: sagaActions.replay,
    reset: sagaActions.reset
  }

  sessionStorage.setItem('init', JSON.stringify({ data: state }))

  /**
   * Add actions to the registry object and local storage.
   *
   * The `define` function returns an action that, when dispatched, updates
   * saga's history object, stores a copy of saga's history object to local
   * storage, and calls and returns the result of the action passed to it.
   *
   * By recording every action dispatched by the app we can easily reproduce
   * bugs and implement features like time-travel and end-to-end testing.
   *
   * @function define
   */

  const registry = {}

  const define = (name, action) => {
    registry[name] = action

    console.log('Registered >>', name)

    return (state, data) => {
      const { history } = state.saga

      history.push([name, data])
      sessionStorage.setItem('saga', JSON.stringify({ data: history }))

      // console.log('History >>', name, data)

      return action(state, data)
    }
  }

  /**
   * This is the logic to expose the `actions` property on the init object. The
   * actions object is sugar to define reusable actions.
   *
   * Defining all your actions in your view can pose mangability problems in
   * some cases. For example, if you're using a router you may want to use your
   * actions across different pages.
   *
   * The actions object offers a centralized place to put actions to avoid
   * defining your actions multiple times throughout your app.
   */

  const wired = {}

  for (const scope in actions) {
    const item = actions[scope]

    if (typeof item === 'function') {
      wired[scope] = item
    } else {
      wired[scope] = {}

      for (const name in item) {
        wired[scope][name] = define(name, item[name])
      }
    }
  }

  /**
   * Mutate init
   */

  init.mount = mount(wired, define)

  /**
   * Clean up custom init properties this plugin exposes.
   */

  delete init.actions

  return init
}
