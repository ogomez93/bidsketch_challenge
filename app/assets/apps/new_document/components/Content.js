import React from 'react';

import Sidebar from './Sidebar';
import DocumentPage from './DocumentPage';

const Content = () => (
  <div className="container">
    <div className="row">
      <div className="col-1/6">
        <Sidebar />
      </div>

      <div className="col-1/6">
        <DocumentPage />
      </div>
    </div>
  </div>
);

export default Content;
