import promise from 'redux-promise'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'

import { LOCAL_STORAGE_STATE_KEY } from '../constants'

const middleware = [thunk, promise]

const rootElement = document.getElementById('root')
export let initialState = {}
if (rootElement) {
  initialState = JSON.parse(rootElement.dataset.initialState)
  delete rootElement.dataset.initialState
}
const localStorageState = localStorage.getItem(LOCAL_STORAGE_STATE_KEY)
if (localStorageState !== null) {
  initialState = JSON.parse(localStorageState)
}

export function configureStore (rootReducer, state = initialState, actionCreators = {}) {
  const composeEnhancers = ['development', 'staging'].includes(process.env.NODE_ENV) && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionCreators })
    : compose
  return (
    createStore(
      rootReducer,
      state,
      composeEnhancers(applyMiddleware(...middleware))
    )
  )
}
