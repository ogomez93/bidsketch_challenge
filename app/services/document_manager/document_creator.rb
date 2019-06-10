module DocumentManager
  class DocumentCreator < ApplicationService
    def initialize(params)
      @document = Document.new(params)
    end

    def call
      @document.save
    end
  end
end
