
const success = (state, data) => {
  state.resume = {
    data,
    error: null,
    loading: null,
    success: true
  }
}

const failure = (state, data) => {
  state.resume = {
    data: null,
    error: data.message,
    loading: null,
    success: false
  }
}

const loading = (state, data) => {
  state.resume = {
    data: null,
    error: null,
    loading: true,
    success: null
  }
}

export const fetchResume = x => dispatch => {
  fetch('/resume-vnodes.json', { method: 'GET' })
    .then(res => res.json())
    .then(data => {
      dispatch(success, data)
    })
    .catch(err => {
      dispatch(failure, err)
    })

  dispatch(loading)
}
