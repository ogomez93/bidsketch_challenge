import React from 'react';
import { connect } from 'react-redux';

import { actions, selectors } from 'resources/document';

export class SidebarPage extends React.Component {
  selectPage = () => this.props.selectPage(this.props.page.pageNumber);

  render () {
    const { boxesCount, checkedBoxesCount, page } = this.props;
    const boxesCountText = boxesCount ? `${checkedBoxesCount} of ${boxesCount}` : '';
    const className = this.props.currentPageNumber === this.props.page.pageNumber ? 'active' : '';

    return (
      <li onClick={this.selectPage} className={className}>
        Page number {page.pageNumber}. { boxesCountText }
      </li>
    );
  }
}

const mapState = (state, props) => ({
  boxesCount: selectors.getPageBoxesCount(state, { pageNumber: props.page.pageNumber }),
  checkedBoxesCount: selectors.getPageCheckedBoxesCount(state, { pageNumber: props.page.pageNumber }),
  currentPageNumber: state.document.currentPageNumber
});

const mapDispatch = dispatch => ({
  selectPage: pageNumber => dispatch(actions.selectPage(pageNumber))
});

export default connect(mapState, mapDispatch)(SidebarPage);
