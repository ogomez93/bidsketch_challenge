import React from 'react';
import { connect } from 'react-redux';

import { selectors } from 'resources/document';

const ProgressBar = ({ allBoxes, checkedBoxes }) => (
  <div className="row">
    <div className={`col-${checkedBoxes}/${allBoxes}`}>
      {checkedBoxes} / {allBoxes}
    </div>
  </div>
);


const mapState = state => ({
  allBoxes: selectors.getAllCheckboxesCount(state),
  checkedBoxes: selectors.getCheckedBoxesCount(state)
});

export default connect(mapState)(ProgressBar);
