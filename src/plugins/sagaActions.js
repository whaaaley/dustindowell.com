
import saga from './saga'

export const reset = () => {
  saga.history = []

  sessionStorage.setItem('saga', JSON.stringify({ data: saga.history }))
  location.reload()

  return { saga }
}

export const replay = (state, x) => dispatch => {
  const { history, registry } = state.saga

  for (let i = 0; i < history.length; i++) {
    const [name, data] = history[i]
    dispatch(registry[name], data)
  }
}
