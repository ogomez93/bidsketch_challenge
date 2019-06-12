import React from 'react';
import { connect } from 'react-redux';

import { actions, selectors } from 'resources/document';

import ProgressBar from './ProgressBar';

export class Header extends React.Component {
  startFillingDocument = () => this.props.startFillingDocument();

  submitDocument = () => this.props.submitDocument();

  startButton = () => (
    <button onClick={this.startFillingDocument} className="btn btn-rounded padded-h-wildcard start-button">
      Click to START
    </button>
  );

  submitButton = () => (
    <button onClick={this.submitDocument} className="btn btn-rounded padded-h-wildcard submit-button">
      Save & finish document
    </button>
  );

  render () {
    const { documentIsReady, startedFillingDocument } = this.props;

    return (
      <header className="header">
        <div className="row header-content">
          <span>
            Review & Complete document
          </span>
          { !startedFillingDocument && this.startButton() }
          { documentIsReady && this.submitButton() }
        </div>
        <ProgressBar />
      </header>
    );
  }
}

const mapState = state => ({
  startedFillingDocument: state.document.startedFillingDocument,
  documentIsReady: selectors.getAllBoxesAreChecked(state)
});

function submitDocument() {
  return (dispatch, getState) => {
    dispatch(actions.submitDocument());

    const state = getState();
    const document = selectors.getFormattedDocument(state);

    fetch('/documents', {
      method: 'POST',
      body: JSON.stringify({ document }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(() => dispatch(actions.requestSucceeded()))
    .catch(
      error => {
        console.log('catch', error);
        dispatch(actions.requestFailed({ error }))
      }
    );
  }
}

const mapDispatch = dispatch => ({
  startFillingDocument: () => dispatch(actions.startFillingDocument()),
  submitDocument: () => dispatch(submitDocument())
});

export default connect(mapState, mapDispatch)(Header);
