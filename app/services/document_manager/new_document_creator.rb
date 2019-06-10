module DocumentManager
  class NewDocumentCreator < ApplicationService
    def call
      @checkbox_number_assigner = 0
      new_document
    end

    def new_document
      {
        document: {
          pages: {
            '1': new_document_page(1),
            '2': new_document_page(2),
            '3': new_document_empty_page(3),
            '4': new_document_empty_page(4),
            '5': new_document_empty_page(5)
          },
          startedFillingDocument: false,
          currentPageNumber: '1',
          currentCheckboxNumber: '1',
          documentHasBeenSubmitted: false,
          sending: false
        }
      }
    end

    def new_checkbox_number
      @checkbox_number_assigner += 1
    end

    def new_document_page(page_number)
      first_box_number = new_checkbox_number
      second_box_number = new_checkbox_number
      {
        pageNumber: page_number.to_s,
        checkboxes: {
          "#{first_box_number}": page_checkbox(first_box_number, page_number),
          "#{second_box_number}": page_checkbox(second_box_number, page_number)
        }
      }
    end

    def page_checkbox(box_number, page_number)
      {
        checkboxNumber: box_number.to_s,
        checked: false,
        pageNumber: page_number.to_s
      }
    end

    def new_document_empty_page(page_number)
      { pageNumber: page_number.to_s }
    end
  end
end
