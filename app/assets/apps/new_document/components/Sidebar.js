import React from 'react';
import { connect } from 'react-redux';

import { selectors } from 'resources/document';

import SidebarPage from './SidebarPage';

const Sidebar = ({ pages }) => (
  <div className="sidebar">
    { pages.map(page => <SidebarPage key={`page-${page.pageNumber}`} page={page} />) }

    <div className="vertical-separator" />
  </div>
);

const mapState = state => ({
  pages: selectors.getAllPagesArray(state)
});

export default connect(mapState)(Sidebar);
