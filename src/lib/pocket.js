
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

const collect = (root, render) => {
  let batch = [{}, root.state]

  const schedule = enqueue(() => {
    root.state = Object.assign.apply(Object, batch)
    batch = [{}, root.state]
    render(root.state)
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
  const root = { state }
  const prompt = collect(root, render)

  const dispatch = (action, data) => {
    const result = action(root.state, data)

    console.log(
      'Dispatch >>',
      action.name || '(anon)',
      typeof result === 'function' ? '(effect)' : result
    )

    if (typeof result === 'function') {
      const effect = result(dispatch)

      if (effect && effect.then) {
        return effect.then(prompt)
      }
    } else {
      prompt(result)
    }
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

  // console.log('Init >>', init)

  const dispatch = pocket(init.state, state => {
    console.log('--- Patch ---')
    patch(node, init.view(state, dispatch))
  })

  init.mount(init.state, dispatch)
}
