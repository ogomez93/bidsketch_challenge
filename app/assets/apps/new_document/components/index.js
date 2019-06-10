import React from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import Content from './Content';

export class Document extends React.Component {
  render () {
    const { documentHasBeenSubmitted } = this.props;

    if (documentHasBeenSubmitted) {
      return (
        <div className="container">Your document was successfully submitted!</div>
      )
    }

    return (
      <div className="container">
        <Header />
        <Content />
      </div>
    );
  }
}

const mapState = state => ({
  documentHasBeenSubmitted: state.document.documentHasBeenSubmitted
});

export default connect(mapState)(Document);
