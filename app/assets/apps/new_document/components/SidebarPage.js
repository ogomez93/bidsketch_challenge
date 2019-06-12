import React from 'react';
import { connect } from 'react-redux';

import { actions, selectors } from 'resources/document';

import CheckItem from 'images/docsketch/icon-check-complete.svg';

export class SidebarPage extends React.Component {
  selectPage = () => this.props.selectPage(this.props.page.pageNumber);

  pageContent = () => {
    const { boxesCount, checkedBoxesCount } = this.props;
    if (!boxesCount) return;
    if (checkedBoxesCount < boxesCount) {
      return (
        <div className="incomplete-page">
          {checkedBoxesCount} of {boxesCount}
        </div>
      )
    }
    return <img src={CheckItem} alt="" className="complete-page"/>
  }

  render () {
    const activeIfIsCurrent = this.props.currentPageNumber === this.props.page.pageNumber ? 'active' : '';

    return (
      <div onClick={this.selectPage} className={`sidebar-page ${activeIfIsCurrent}`}>
        <div className="sidebar-page-content">
          { this.pageContent() }
        </div>
      </div>
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
