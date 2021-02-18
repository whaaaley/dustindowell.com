
/**
 * Syntax sugar for reusable business logic.
 * @module stores
 */

export default init => {
  const { state, actions, stores } = init

  /**
   * This plugin places state and actions from a stores object into the global
   * scope in each respective location.
   */

  for (const key in stores) {
    state[key] = stores[key].state
    actions[key] = stores[key].actions
  }

  /**
   * Clean up custom init properties this plugin exposes.
   */

  delete init.stores

  return init
}
