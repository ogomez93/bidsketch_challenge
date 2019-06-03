export const actionTypes = {
  CHANGE: 'shared/person/CHANGE'
}

export function reducer (state = {}, action = {}) {
  switch (action.type) {
    case actionTypes.CHANGE:
      return {
        ...state,
        ...action.data
      }
    default:
      return state
  }
}

// Action Creators

const changePerson = data => ({ type: actionTypes.CHANGE, data })

export const actions = {
  changePerson
}

// Selectors
export const selectors = { }
