
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
    error: null,
    loading: true,
    success: null
  }

  return { resume }
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
