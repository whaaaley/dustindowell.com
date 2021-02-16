
const setItem = (name, data) =>
  window.localStorage.setItem(name, JSON.stringify(data))

export const rebuild = state => dispatch => {
  const { history, registry } = state.saga

  for (let i = 0; i < history.length; ++i) {
    const [name, data] = history[i]
    dispatch(registry[name], data)
  }
}

export const clear = () => {
  const history = []
  setItem('saga-history', { data: history })

  return {
    saga: { history }
  }
}

export default ({ state, view, mount }) => {
  const json = window.localStorage.getItem('saga-history')

  state.registry = []
  state.history = json === null ? [] : JSON.parse(json).data

  const register = (name, action) => {
    state.registry.push([name, action])

    if (PROD === false) {
      console.log('registered >>', name)
    }

    return (state, data) => {
      state.history.push([name, data])
      setItem('saga-history', { data: state.history })

      if (PROD === false) {
        console.log('history >>', name, data)
      }

      return action(state, data)
    }
  }

  return {
    state,
    view: view(register),
    mount: mount(register)
  }
}
