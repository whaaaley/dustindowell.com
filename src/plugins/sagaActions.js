
const setItem = (name, data) =>
  window.localStorage.setItem(name, JSON.stringify(data))

/**
 *
 */

export const rebuild = state => dispatch => {
  const { history, registry } = state.saga

  for (let i = 0; i < history.length; ++i) {
    const [name, data] = history[i]
    dispatch(registry[name], data)
  }
}

/**
 *
 */

export const clear = () => {
  const history = []
  setItem('saga', { data: history })

  return {
    saga: { history }
  }
}
