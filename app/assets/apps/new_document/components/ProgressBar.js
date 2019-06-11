import React from 'react';
import { connect } from 'react-redux';

import { selectors } from 'resources/document';

const ProgressBar = ({ allBoxes, checkedBoxes }) => (
  <div className="row progress-bar">
    <div className={`col-${checkedBoxes}/${allBoxes} progress`} />
  </div>
);


const mapState = state => ({
  allBoxes: selectors.getAllCheckboxesCount(state),
  checkedBoxes: selectors.getCheckedBoxesCount(state)
});

export default connect(mapState)(ProgressBar);
