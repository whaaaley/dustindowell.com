
import facebook from './facebook'
const fb = facebook.actions

const next = (state, data) => {
  state.prompt.step = state.prompt.step + 1
  return state.prompt
}

const select = (state, data) => {
  state.prompt.accountID = data
  return state.prompt
}

const error = (state, data) => {
  state.prompt.step = 0
  return state.prompt
}

const continueWith = (state, data) => async dispatch => {
  await dispatch(fb.login)
  await dispatch(fb.me)

  if (state.login.success && state.me.success) {
    dispatch(next)
  } else {
    dispatch(error)
  }
}

const confirmIdentity = (state, data) => async dispatch => {
  await dispatch(fb.accounts)

  if (state.accounts.success) {
    dispatch(next)
  } else {
    dispatch(error)
  }
}

const confirmAccount = (state, data) => async dispatch => {
  await dispatch(fb.instagram)

  if (state.instagram.success) {
    dispatch(next)
  } else {
    dispatch(error)
  }
}

export default {
  state: {
    prompt: {
      step: 1,
      accountID: null
    }
  },
  actions: {
    next,
    select,
    error,
    continueWith,
    confirmIdentity,
    confirmAccount
  }
}
