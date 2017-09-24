// dispatched action types indicating a change in the session
export const SESSION_CHANGED = '@session/SESSION_CHANGED'

export default (state = { authenticated: false }, action = {}) => {
  switch (action.type) {
    case SESSION_CHANGED:
      return {
        ...action.auth
      }
    default:
      return state
  }
}
