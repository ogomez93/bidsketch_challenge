import { createSelector } from 'reselect'

export const actionTypes = {
  ADD: 'shared/documents/ADD',
  CHANGE: 'shared/documents/CHANGE',
  REMOVE: 'shared/documents/REMOVE'
}

function resource (state = {}, action = {}) {
  switch (action.type) {
    case actionTypes.CHANGE:
      return { ...state, ...action.data }
    default:
      return state
  }
}

export function reducer (state = {}, action = {}) {
  switch (action.type) {
    case actionTypes.ADD:
      return {
        ...state,
        [action.data.id]: action.data
      }
    case actionTypes.CHANGE:
      return {
        ...state,
        [action.data.id]: resource(state[action.data.id], action)
      }
    case actionTypes.REMOVE:
      const { [action.id]: removedResource, ...newState } = state
      return newState
    default:
      return state
  }
}

// Action Creators

const addDocument = data => ({ type: actionTypes.ADD, data })
const changeDocument = data => ({ type: actionTypes.CHANGE, data })
const removeDocument = id => ({ type: actionTypes.REMOVE, id })

export const actions = {
  addDocument,
  changeDocument,
  removeDocument
}

// Selectors
const getDocuments = ({ documents }) => documents
export const getCompleteDocumentIds = createSelector(
  getDocuments, documents => {
    return Object.keys(documents).filter(id => documents[id].status === 'complete')
  }
)
export const selectors = {
  getCompleteDocumentIds
}
