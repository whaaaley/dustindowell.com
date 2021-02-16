
import { patch } from 'superfine'

/**
 * Debounce wrapper around window.requestAnimationFrame
 * @function enqueue
 */

const enqueue = render => {
  let lock = false

  const callback = () => {
    lock = false
    render()
  }

  return () => {
    if (!lock) {
      lock = true
      window.requestAnimationFrame(callback)
    }
  }
}

/**
 * Collect state changes for batch updates
 * @function collect
 */

const collect = (state, render) => {
  // let batch = [{}, state]
  let batch = [state]

  const schedule = enqueue(() => {
    Object.assign.apply(Object, batch)
    // batch = [{}, state]
    batch = [state]
    render()
  })

  return result => {
    batch.push(result)
    schedule()
  }
}

/**
 * Minimalist state manager with agressive optimization
 * @function pocket
 */

const pocket = (state, render) => {
  const schedule = collect(state, render)

  const dispatch = (action, data) => {
    const result = action(state, data)

    if (typeof result === 'function') {
      const effect = result(dispatch)

      if (effect && effect.then) {
        effect.then(schedule)
      }
    } else {
      schedule(result)
    }

    console.log('dispatch >>', action.name || '<anon>', result)
  }

  return dispatch
}

/**
 * Initialize the app
 * @module pocket
 */

const node = document.getElementById('app')

export default (plugins, init) => {
  for (let i = 0; i < plugins.length; i++) {
    init = plugins[i](init)
  }

  console.log('init >>', init)

  const { state, view, mount } = init

  const dispatch = pocket(state, () => {
    patch(node, view(state, dispatch))
  })

  mount(state, dispatch)
}
