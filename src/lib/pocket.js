
export default (state, render) => {
  let lock = false

  const callback = () => {
    lock = false
    render(state, dispatch)
  }

  const update = data => {
    Object.assign(state, data)

    if (!lock) {
      lock = true
      window.requestAnimationFrame(callback)
    }
  }

  const dispatch = (action, data) => {
    let result = action(state, dispatch)

    if (typeof result === 'function') {
      result = result(data)
    }

    if (result && result.then !== undefined) {
      result.then(data => update(data))
    } else {
      update(result)
    }
  }

  return dispatch
}
