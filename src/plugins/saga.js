
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

export default ({ state, actions, view, mount }) => {
  const json = window.localStorage.getItem('saga-history')
  state.history = json === null ? [] : JSON.parse(json).data
  state.registry = []

  // console.log(state.history)

  const register = (name, action) => {
    state.registry.push([name, action])
    // actions[name] = action
    console.log('Registered >>', name)

    return (state, data) => {
      state.history.push([name, data])
      setItem('saga-history', { data: state.history })
      console.log('History >>', name, data)

      return action(state, data)
    }
  }

  return {
    state,
    view: view(register),
    mount: mount(register)
  }
}
