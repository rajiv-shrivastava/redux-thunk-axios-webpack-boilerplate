/* global __NODE_ENV__, __DEVELOPMENT__ */

import {createStore, compose, applyMiddleware} from 'redux'
import {routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers/index'


const storeEnhancer = compose(
  applyMiddleware(thunk,createLogger()),
  // compose with https://github.com/zalmoxisus/redux-devtools-extension (Chrome Extension) if available
  window.devToolsExtension ? window.devToolsExtension() : f => f
)

const store = createStore(rootReducer, storeEnhancer)

export default store

function createLogger () {
  return ({ getState }) => (next) => (action) => {
    if (__DEVELOPMENT__) {
      console.log('Action', action.type, action)
    }
    return next(action)
  }
}