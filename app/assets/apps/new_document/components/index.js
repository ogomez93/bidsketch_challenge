import React from 'react';
import { connect } from 'react-redux';

import { actions, selectors } from 'resources/document';

export class Document extends React.Component {
  render () {
    return (
      <div className="container">
        Hello world
      </div>
    );
  }
}

const mapState = state => ({

});

const mapDispatch = dispatch => ({
  
});

export default connect(mapState, mapDispatch)(Document);
