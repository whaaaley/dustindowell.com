
/**
 * Merge a new state-like object to state.
 * @function merge
 */

export const merge = state => data => {
  const result = {}

  for (const key in data) {
    Object.assign(result, state[key], data[key])
  }

  return result
}
