import promise from 'redux-promise'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'

const middleware = [thunk, promise]

const rootElement = document.getElementById('root')
export let initialState = {}
if (rootElement) {
  initialState = JSON.parse(rootElement.dataset.initialState)
  delete rootElement.dataset.initialState
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
