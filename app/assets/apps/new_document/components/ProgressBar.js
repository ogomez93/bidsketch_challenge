import React from 'react';
import { connect } from 'react-redux';

import { selectors } from 'resources/document';

export class ProgressBar extends React.Component {
  progressText = () => this.props.checkedBoxes && `${this.props.checkedBoxes}/${this.props.allBoxes}`;

  isFull = () => this.props.checkedBoxes === this.props.allBoxes && 'full';

  render () {
    const { allBoxes, checkedBoxes } = this.props;

    return (
      <div className="row progress-bar">
        <div className={`col-${checkedBoxes}/${allBoxes} progress`}>
          <div className="progress-bar-triangle" />
          <div className={`progress-bar-text ${this.isFull()}`}>{this.progressText()}</div>
        </div>
      </div>
    );
  }
}


const mapState = state => ({
  allBoxes: selectors.getAllCheckboxesCount(state),
  checkedBoxes: selectors.getCheckedBoxesCount(state)
});

export default connect(mapState)(ProgressBar);
