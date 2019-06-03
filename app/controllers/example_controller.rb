class ExampleController < ApplicationController
  def show
    render_react_app :example,
      person: { name: 'William Williamson' },
      documents: {
        '1': {
          id: '1',
          name: 'First Document',
          status: 'complete'
        },
        '2': {
          id: 2,
          name: 'Second Document',
          status: 'sent'
        }
      }
  end
end
