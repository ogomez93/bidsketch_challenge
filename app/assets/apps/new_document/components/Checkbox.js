import React from 'react';
import { connect } from 'react-redux';

import { actions, selectors } from 'resources/document';

export class DocumentPage extends React.Component {
  toggleCheckBox = () => {
    const { box, toggleCheckBox } = this.props;
    toggleCheckBox({
      pageNumber: box.pageNumber,
      checkboxNumber: box.checkboxNumber
    });
  }

  isCurrent = () => {
    const { box, currentCheckboxNumber, documentIsReady, startedFillingDocument } = this.props;
    return startedFillingDocument && !documentIsReady && box.checkboxNumber === currentCheckboxNumber;
  }

  getClassName = () => this.isCurrent() ? 'current' : '';

  renderBubble = () => this.isCurrent() && (
    <div className="current-checkbox-bubble" onClick={this.toggleCheckBox}>
      Click to CHECK
      <div className="current-checkbox-bubble-triangle" />
    </div>
  );

  render () {
    const { box } = this.props;

    return (
      <div className="checkbox-container">
        {this.renderBubble()}
        <input
          key={`box-${box.pageNumber}-${box.checkboxNumber}`}
          type="checkbox"
          className={this.getClassName()}
          onChange={this.toggleCheckBox}
          checked={box.checked}
        />
      </div>
    );
  }
}

const mapState = state => ({
  currentCheckboxNumber: selectors.getCurrentCheckboxId(state),
  startedFillingDocument: selectors.getStartedFillingDocument(state),
  documentIsReady: selectors.getAllBoxesAreChecked(state)
});

const mapDispatch = dispatch => ({
  toggleCheckBox: ({ pageNumber, checkboxNumber }) => dispatch(actions.toggleCheckBox({ pageNumber, checkboxNumber }))
});

export default connect(mapState, mapDispatch)(DocumentPage);
