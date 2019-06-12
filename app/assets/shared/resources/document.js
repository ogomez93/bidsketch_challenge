import { createSelector } from 'reselect'

import { LOCAL_STORAGE_STATE_KEY } from '../constants';

export const actionTypes = {
  START_FILLING: 'shared/pages/START_FILLING',
  SELECT_PAGE: 'shared/pages/SELECT_PAGE',
  TOGGLE_CHECK_BOX: 'shared/pages/TOGGLE_CHECK_BOX',
  SUBMIT_DOCUMENT: 'shared/pages/SUBMIT_DOCUMENT',
  REQUEST_SUCCEEDED: 'shared/pages/REQUEST_SUCCEEDED',
  REQUEST_FAILED: 'shared/pages/REQUEST_FAILED',
};

function updateCheckbox(checkboxState = {}, action = {}) {
  switch (action.type) {
    case actionTypes.TOGGLE_CHECK_BOX:
      return { ...checkboxState, checked: !checkboxState.checked };
    default:
      return checkboxState;
  }
}

function updatePage (pageState = {}, action = {}) {
  switch (action.type) {
    case actionTypes.TOGGLE_CHECK_BOX:
      return {
        ...pageState,
        checkboxes: {
          ...pageState.checkboxes,
          [action.data.checkboxNumber]: updateCheckbox(pageState.checkboxes[action.data.checkboxNumber], action)
        }
      };
    default:
      return pageState;
  }
}

function getNextUncheckedBox(state = {}, action = {}) {
  if (getAllBoxesAreChecked(state)) {
    return action.data;
  }
  
  const allBoxes = getAllCheckboxes(state);
  const currentBoxIndex = allBoxes.findIndex(box => box.checkboxNumber === action.data.checkboxNumber);
  // if the current box isn't checked then it's going to be after the state changes
  if (allBoxes[currentBoxIndex].checked) {
    return allBoxes[currentBoxIndex];
  }
  let nextUncheckedBoxIndex = currentBoxIndex + 1;
  // start from the beginning if the current box was the last one
  if (allBoxes[nextUncheckedBoxIndex] === undefined) {
    nextUncheckedBoxIndex = 0;
  }

  const reorderedCheckboxes = [ ...allBoxes.slice(nextUncheckedBoxIndex), ...allBoxes.slice(0, nextUncheckedBoxIndex) ];
  let nextUncheckedBox;
  for (let box of reorderedCheckboxes) {
    if (!box.checked) {
      nextUncheckedBox = box;
      break;
    }
  }
  return nextUncheckedBox;
}

function resetLocalStorage() {
  localStorage.removeItem(LOCAL_STORAGE_STATE_KEY);
}

function saveStateToLocalStorage (state) {
  localStorage.setItem(LOCAL_STORAGE_STATE_KEY, JSON.stringify({ document: state }));
}

export function reducer (state = {}, action = {}) {
  let newState = {};
  let nextUncheckedBox;
  switch (action.type) {
    case actionTypes.START_FILLING:
      newState = {
        ...state,
        startedFillingDocument: true,
        currentPageNumber: '1',
        currentCheckboxNumber: '1',
      };
      saveStateToLocalStorage(newState);
      return newState;

    case actionTypes.SELECT_PAGE:
      newState = {
        ...state,
        currentPageNumber: action.data.pageNumber
      };
      saveStateToLocalStorage(newState);
      return newState;

    case actionTypes.TOGGLE_CHECK_BOX:
      nextUncheckedBox = getNextUncheckedBox({ document: state }, action);
      newState = {
        ...state,
        currentPageNumber: nextUncheckedBox.pageNumber,
        currentCheckboxNumber: nextUncheckedBox.checkboxNumber,
        startedFillingDocument: true,
        pages: {
          ...state.pages,
          [action.data.pageNumber]: updatePage(state.pages[action.data.pageNumber], action)
        }
      };
      saveStateToLocalStorage(newState);
      return newState;

    case actionTypes.SUBMIT_DOCUMENT:
      return {
        ...state,
        sending: true
      };

    case actionTypes.REQUEST_SUCCEEDED:
      resetLocalStorage();
      return {
        ...state,
        documentHasBeenSubmitted: true,
        sending: false
      };

    case actionTypes.REQUEST_FAILED:
      return {
        ...state,
        documentHasBeenSubmitted: false,
        sending: false,
        error: action.data.error
      };

    default:
      return state;
  }
}

// Action Creators

const startFillingDocument = () => ({ type: actionTypes.START_FILLING });
const selectPage = pageNumber => ({
  type: actionTypes.SELECT_PAGE,
  data: { pageNumber }
});
const toggleCheckBox = ({ pageNumber, checkboxNumber }) => ({
  type: actionTypes.TOGGLE_CHECK_BOX,
  data: { pageNumber, checkboxNumber }
});
const submitDocument = () => ({ type: actionTypes.SUBMIT_DOCUMENT });
const requestSucceeded = () => ({ type: actionTypes.REQUEST_SUCCEEDED });
const requestFailed = () => ({ type: actionTypes.REQUEST_FAILED });

export const actions = {
  startFillingDocument,
  selectPage,
  toggleCheckBox,
  submitDocument,
  requestSucceeded,
  requestFailed
};

// Selectors
const getState = state => state;
const getDocument = ({ document }) => document;
const getStartedFillingDocument = state => getDocument(state).startedFillingDocument;
const getCurrentCheckboxId = state => getDocument(state).currentCheckboxNumber;
const getCurrentPageId = state => getDocument(state).currentPageNumber;
const getAllPages = state => getDocument(state).pages;
const getCurrentPage = state => getAllPages(state)[getCurrentPageId(state)];
const getCurrentPageBoxes = state => getCurrentPage(state).checkboxes || {};
const getCurrentPageBoxesArray = state => Object.values(getCurrentPageBoxes(state));
const getAllPagesArray = state => Object.values(getAllPages(state));
const getPageById = (state, props) => getAllPages(state)[props.pageNumber];
const getPageBoxes = (state, props) => getPageById(state, props).checkboxes || {};
const getPageBoxesArray = (state, props) => Object.values(getPageBoxes(state, props));
const getPageBoxesCount = (state, props) => getPageBoxesArray(state, props).length;
const getPageCheckedBoxesCount = createSelector(
  getPageBoxesArray, boxes => {
    return boxes.filter(box => box.checked).length;
  }
);
const getAllCheckboxes = createSelector(
  getAllPagesArray, pages => {
    let checkboxes = [];
    pages.forEach(page => {
      if (page.checkboxes) checkboxes = [ ...checkboxes, ...Object.values(page.checkboxes) ];
    });
    return checkboxes;
  }
);
const getAllCheckboxesCount = (state) => getAllCheckboxes(state).length;
const getCheckedBoxes = createSelector(
  getAllCheckboxes, boxes => boxes.filter(box => box.checked)
);
const getCheckedBoxesCount = (state) => getCheckedBoxes(state).length;
const getAllBoxesAreChecked = createSelector(
  getAllCheckboxes, getCheckedBoxes, (all, checked) => all.length === checked.length
);
const getFormattedPageBoxes = createSelector(
  getPageById, page => {
    if (!page.checkboxes) return {};
    return Object.values(page.checkboxes).map(box => {
      return {
        page_number: box.pageNumber,
        checked: box.checked,
        checkbox_number: box.checkboxNumber
      };
    });
  }
);
const getFormattedPageBoxesArray = (state, props) => Object.values(getFormattedPageBoxes(state, props));
const getFormattedDocument = createSelector(
  getAllPagesArray, getState, (pages, state) => {
    let document = {};
    document.pages_attributes = pages.map(page => {
      let formattedPage = { page_number: page.pageNumber };
      formattedPage.checkboxes_attributes = getFormattedPageBoxesArray(state, page);
      return formattedPage;
    });
    return document;
  }
);

export const selectors = {
  getDocument,
  getStartedFillingDocument,
  getCurrentCheckboxId,
  getCurrentPageId,
  getAllPages,
  getCurrentPage,
  getCurrentPageBoxes,
  getCurrentPageBoxesArray,
  getAllPagesArray,
  getPageById,
  getPageBoxes,
  getPageBoxesArray,
  getPageBoxesCount,
  getPageCheckedBoxesCount,
  getAllCheckboxes,
  getAllCheckboxesCount,
  getCheckedBoxes,
  getCheckedBoxesCount,
  getAllBoxesAreChecked,
  getFormattedDocument
};
