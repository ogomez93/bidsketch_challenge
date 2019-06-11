import React from 'react';
import { connect } from 'react-redux';

import { selectors } from 'resources/document';

import Checkbox from './Checkbox';

const DocumentPage = ({ boxes, page }) => (
  <div className="page-container">
    <div className="page">
      Page number: {page.pageNumber}
      {boxes.map(box =>
        <Checkbox box={box} key={`box-${box.checkboxNumber}-page-${box.pageNumber}`} />
      )}
    </div>
  </div>
);

const mapState = state => ({
  boxes: selectors.getCurrentPageBoxesArray(state),
  page: selectors.getCurrentPage(state)
});

export default connect(mapState)(DocumentPage);
