class DocumentsController < ApplicationController
  def new
    render_react_app :new_document, DocumentManager::NewDocumentCreator.call
  end
end
