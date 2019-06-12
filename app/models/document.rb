class Document < ApplicationRecord
  has_many :pages, dependent: :destroy
  has_many :checkboxes, through: :pages, dependent: :destroy

  accepts_nested_attributes_for :pages
end
