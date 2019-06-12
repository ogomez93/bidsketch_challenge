Rails.application.routes.default_url_options[:host] = Rails.application.secrets.host
Rails.application.routes.default_url_options[:protocol] = Rails.application.secrets.scheme
Rails.application.routes.default_url_options[:trailing_slash] = true
Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get 'style_guide', to: 'style_guide#show', as: :style_guide
  get 'new_document', to: 'documents#new', as: :new_document
  post 'documents', to: 'documents#create'
end
