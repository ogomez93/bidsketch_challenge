import { combineReducers } from 'redux'

import { configureStore, initialState } from 'lib/configure_store'

import { reducers, actions } from '../resources'

const appReducer = combineReducers(reducers)

const appStore = configureStore(appReducer, initialState, actions)

export { actions, actionTypes } from '../resources'
export default appStore
