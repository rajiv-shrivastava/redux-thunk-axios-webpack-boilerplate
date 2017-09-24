export default (stateFactory, initialState) => {
  // console.log('StateMachine initialized', initialState)
  let currentState = createState(initialState)
  return proxyToCurrentState()

  function createState (state) {
    return stateFactory(state, function transition (newState) {
      // console.log('StateMachine transitioned', state, '=>', newState)
      currentState = createState(newState)
    })
  }

  function proxyToCurrentState () {
    if (typeof currentState === 'function') {
      return (...args) => currentState(...args)
    } else {
      return Object.keys(currentState).reduce((memo, key) => {
        memo[key] = function (...args) {
          return currentState[key](...args)
        }
        return memo
      }, {})
    }
  }
}
