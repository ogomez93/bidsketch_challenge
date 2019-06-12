class DocumentsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def new
    render_react_app :new_document, DocumentManager::NewDocumentCreator.call
  end

  def create
    if DocumentManager::DocumentCreator.call(document_params)
      render status: '200', json: { message: 'success' }.to_json
    else
      render :json, error: "Couldn't save the document."
    end
  end

  private

  def document_params
    params.require(:document).permit!
  end
end
