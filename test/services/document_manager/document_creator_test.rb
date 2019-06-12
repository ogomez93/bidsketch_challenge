require 'test_helper'

class DocumentManager::DocumentCreatorTest < ActiveSupport::TestCase
  test "calling the DocumentCreator with some parameters creates a document" do
    assert_equal 0, Document.count
    params = { name: 'New document' }
    DocumentManager::DocumentCreator.call(params)
    assert_equal params[:name], Document.first.name
    assert_equal 1, Document.count
  end

  test "calling the DocumentCreator without parameters creates an empty document" do
    assert_equal 0, Document.count
    DocumentManager::DocumentCreator.call
    assert_nil Document.first.name
    assert_equal 1, Document.count
  end

  test "calling the DocumentCreator with incorrect parameters raises an exception and doesn't create a Document" do
    assert_equal 0, Document.count
    params = { incorrect_param: 'Incorrect value' }
    exception = assert_raises(Exception) { DocumentManager::DocumentCreator.call(params) }
    assert_equal "unknown attribute 'incorrect_param' for Document.", exception.message
    assert_equal 0, Document.count
  end

  test "calling the DocumentCreator with pages params creates a Document and as many pages as specified" do
    assert_equal 0, Document.count
    assert_equal 0, Page.count
    params = { pages_attributes: [{ page_number: 1 }, { page_number: 2 }] }
    DocumentManager::DocumentCreator.call(params)
    assert_equal 1, Document.count
    assert_equal 2, Document.first.pages.count
    assert_equal 2, Page.count
    assert_equal Page.all, Document.first.pages
  end

  test "calling the DocumentCreator with wrong pages params raises an exception and doesn't create a Document nor its pages" do
    assert_equal 0, Document.count
    assert_equal 0, Page.count
    params = { pages_attributes: [{ wrong_page_attribute: 'wrong page value' }, { wrong_page_attribute: 'still wrong value' }] }
    exception = assert_raises(Exception) { DocumentManager::DocumentCreator.call(params) }
    assert_equal "unknown attribute 'wrong_page_attribute' for Page.", exception.message
    assert_equal 0, Document.count
    assert_equal 0, Page.count
  end

  test "calling the DocumentCreator with pages and checkboxes params creates a Document with as many checkboxes in as many pages as specified" do
    assert_equal 0, Document.count
    assert_equal 0, Page.count
    params = {
      pages_attributes: [
        { page_number: 1,
          checkboxes_attributes: [
            {
              page_number: 1,
              checkbox_number: 1,
              checked: true
            },
            {
              page_number: 1,
              checkbox_number: 1,
              checked: false
            }
          ]
        },
        { page_number: 2 }
      ]
    }
    DocumentManager::DocumentCreator.call(params)
    document = Document.first
    first_page = document.pages.first
    second_page = document.pages.second
    assert_equal 1, Document.count
    assert_equal 2, document.pages.count
    assert_equal 2, Page.count
    assert_equal 2, Checkbox.count
    assert_equal Page.all, document.pages
    assert_equal Checkbox.all, document.checkboxes
    assert_equal 2, first_page.checkboxes.count
    assert_equal 0, second_page.checkboxes.count
  end

  test "calling the DocumentCreator with wrong checkboxes params raises an exception and doesn't create a Document nor its pages neither their checkboxes" do
    assert_equal 0, Document.count
    assert_equal 0, Page.count
    assert_equal 0, Checkbox.count
    params = {
      pages_attributes: [
        { page_number: 1,
          checkboxes_attributes: [
            { wrong_checkbox_attribute: 'value' },
            { wrong_checkbox_attribute: 'value' }
          ]
        },
        { page_number: 2 }
      ]
    }
    exception = assert_raises(Exception) { DocumentManager::DocumentCreator.call(params) }
    assert_equal "unknown attribute 'wrong_checkbox_attribute' for Checkbox.", exception.message
    assert_equal 0, Document.count
    assert_equal 0, Page.count
    assert_equal 0, Checkbox.count
  end
end
