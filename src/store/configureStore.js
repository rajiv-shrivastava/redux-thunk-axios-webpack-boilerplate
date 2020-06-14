// This file merely configures the store for hot reloading.
// This boilerplate file is likely to be the same for each project that uses Redux.
// With Redux, the actual stores are in /reducers.

import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from '../reducers';
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { createPromise } from 'redux-promise-middleware'


const createStoreWithMiddleware = compose(
  // applyMiddleware(
  //   thunkMiddleware,
  //   promiseMiddleware({ promiseTypeSuffixes: ["LOADING", "SUCCESS", "ERROR"] })
  // )
  applyMiddleware(createPromise({ promiseTypeSuffixes: ["LOADING", "SUCCESS", "ERROR"] }), thunk, createLogger()),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

export default function configureStore() {
  const store = createStoreWithMiddleware(rootReducer);
  return store;
}