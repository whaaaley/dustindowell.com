
const success = (x, data) => {
  const resume = {
    data,
    error: null,
    loading: null,
    success: true
  }

  return { resume }
}

const failure = (x, data) => {
  const resume = {
    data: null,
    error: data.message,
    loading: null,
    success: false
  }

  return { resume }
}

const loading = (x, data) => {
  const resume = {
    data: null,
    error: data.message,
    loading: null,
    success: false
  }

  return { resume }
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
