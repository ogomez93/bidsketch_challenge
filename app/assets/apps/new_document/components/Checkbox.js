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

  render () {
    const { box, currentCheckboxNumber } = this.props;

    return (
      <input
        key={`box-${box.pageNumber}-${box.checkboxNumber}`}
        type="checkbox"
        className={box.checkboxNumber === currentCheckboxNumber ? 'active' : ''}
        onChange={this.toggleCheckBox}
        checked={box.checked}
      />
    );
  }
}

const mapState = state => ({
  currentCheckboxNumber: selectors.getCurrentCheckboxId(state)
});

const mapDispatch = dispatch => ({
  toggleCheckBox: ({ pageNumber, checkboxNumber }) => dispatch(actions.toggleCheckBox({ pageNumber, checkboxNumber }))
});

export default connect(mapState, mapDispatch)(DocumentPage);
