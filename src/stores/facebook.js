
import * as fb from './facebookLib'

/**
 * Utilities
 */

const freeze = Object.freeze
const newState = (data, error, loading, success) =>
  ({ data, error, loading, success })

const init = freeze(newState(null, null, null, null))
const loading = freeze(newState(null, null, true, null))

/**
 * Internal actions and handlers
 */

const setLoading = (x, key) =>
  ({ facebook: { [key]: loading } })

const resHandler = (res, key) => {
  const state = res.error
    ? newState(null, res.error, null, false)
    : newState(res, null, null, true)
  return { facebook: { [key]: state } }
}

/**
 * Advanced requests
 */

// TODO: Create some state when getting media ids
// TODO: Error handling
const getMedia = async data => {
  const res = await fb.api(`${data.id}/media${data.query}`)
  const paging = res.paging

  // TODO: Fix this mess of a condition
  if (paging && paging.cursors && paging.cursors.after) {
    return await getMedia({
      id: data.id,
      query: `?after=${res.paging.cursors.after}`,
      media: data.media.concat(res.data)
    })
  }

  return data.media
}

const insightParams = {
  fields: 'name,values',
  metric: 'engagement,impressions,reach,saved'
}

// TODO: Error handling? At least keep them in state?
const getInsights = async data => {
  const media = await getMedia({
    id: data.id,
    query: '',
    media: []
  })

  const insights = []
  const promises = {}

  // make requests
  for (let i = media.length; i--;) {
    const id = media[i].id
    promises[id] = fb.api(`${id}/insights`, insightParams)
  }

  // format data
  for (const key in promises) {
    const res = await promises[key]

    // skip errors
    if (res.error) continue

    const post = {}

    // simplify stats
    for (let i = res.data.length; i--;) {
      const stat = res.data[i]

      post.id = key
      post[stat.name] = stat.values[0].value
    }

    insights.push(post)
  }

  return insights
}

/**
 *
 * Actions
 *
 */

const scope = 'instagram_basic,instagram_manage_insights,pages_read_engagement'
const loginParams = { scope }
const login = () => async dispatch => {
  dispatch(setLoading, 'login')
  return resHandler(await fb.login(loginParams), 'login')
}

// TODO: This could be better
export const logout = () => async () => {
  const res = await fb.logout()
  if (res.error === undefined) location.reload()
}

const mePath = 'me/?fields=first_name,picture'
const me = () => async dispatch => {
  dispatch(setLoading, 'me')
  return resHandler(await fb.api(mePath), 'me')
}

const accountsPath = 'me/accounts/?fields=category_list,name'
const accounts = () => async dispatch => {
  dispatch(setLoading, 'accounts')
  return resHandler(await fb.api(accountsPath), 'accounts')
}

const instagram = (x, data) => async dispatch => {
  const instagramPath = `${data.id}?fields=instagram_business_account`
  dispatch(setLoading, 'instagram')
  return resHandler(await fb.api(instagramPath), 'instagram')
}

const insights = () => async dispatch => {
  dispatch(setLoading, 'insights')
  return resHandler(await getInsights, 'instagram')
}

/**
 * Export store object
 */

export default {
  state: {
    facebook: {
      accounts: init,
      insights: init,
      instagram: init,
      login: init,
      me: init
    }
  },
  actions: {
    accounts,
    insights,
    instagram,
    login,
    me
  }
}
