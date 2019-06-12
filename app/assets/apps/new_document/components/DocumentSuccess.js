import React from 'react';

const DocumentSuccess = () => (
  <div className="document-success-container">
    <div className="document-success-content">
      <div>
        Your document was successfully submitted!
      </div>

      <div>
        Click <a href="/new_document" className="reload-link">here</a> to reload the page and fill another document.
      </div>
    </div>
  </div>
)

export default DocumentSuccess;
