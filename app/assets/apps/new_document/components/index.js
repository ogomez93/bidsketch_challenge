import React from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import Content from './Content';
import DocumentSuccess from './DocumentSuccess';

export class Document extends React.Component {
  render () {
    const { documentHasBeenSubmitted } = this.props;

    return (
      <div>
        <Header />
        <Content />
        {documentHasBeenSubmitted && <DocumentSuccess />}
      </div>
    );
  }
}

const mapState = state => ({
  documentHasBeenSubmitted: state.document.documentHasBeenSubmitted
});

export default connect(mapState)(Document);
