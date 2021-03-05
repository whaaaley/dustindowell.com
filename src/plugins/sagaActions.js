
import saga from './saga'

export const rebuild = state => dispatch => {
  const { history, registry } = state.saga

  // for (let i = 0; i < history.length; ++i) {

  for (let i = 0; i < state.saga.index; ++i) {
    const [name, data] = history[i]
    dispatch(registry[name], data)
  }
}

export const reset = () => {
  saga.history = []

  window.localStorage.setItem('saga', JSON.stringify({ data: saga.history }))
  window.location.reload()

  return { saga }
}

export const toggle = (state, data) => {
  const x = data === true
    ? JSON.parse(window.localStorage.getItem('init')).data
    : state

  console.log('>>>>>>', x)

  x.saga.toggle = data

  return x
}

// export const enable = ({ sage }, data) => {
//   saga.enable =
//
//   return
// }
