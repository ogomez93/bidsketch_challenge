require 'test_helper'

class DocumentManager::NewDocumentCreatorTest < ActiveSupport::TestCase
  test 'calling the NewDocumentCreator returns a document' do
    document = {
      document: {
        pages: {
          '1': {
            pageNumber: '1',
            checkboxes: {
              '1': {
                checkboxNumber: '1',
                checked: false,
                pageNumber: '1'
              },
              '2': {
                checkboxNumber: '2',
                checked: false,
                pageNumber: '1'
              }
            }
          },
          '2': {
            pageNumber: '2',
            checkboxes: {
              '3': {
                checkboxNumber: '3',
                checked: false,
                pageNumber: '2'
              },
              '4': {
                checkboxNumber: '4',
                checked: false,
                pageNumber: '2'
              }
            }
          },
          '3': {pageNumber: '3' },
          '4': { pageNumber: '4' },
          '5': { pageNumber: '5' }
        },
        startedFillingDocument: false,
        currentPageNumber: '1',
        currentCheckboxNumber: '1',
        documentHasBeenSubmitted: false,
        sending: false
      }
    }
    assert_equal document, DocumentManager::NewDocumentCreator.call
  end
end
