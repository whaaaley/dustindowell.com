
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
    error: data.message,
    loading: null,
    success: false
  }
}

export const getIssues = x => dispatch => {
  fetch('https://api.github.com/issues')
    .then(res => res.json())
    .then(data => {
      dispatch(success, data)
    })
    .catch(error => {
      dispatch(failure, error)
    })

  dispatch(loading)
}
