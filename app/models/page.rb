class Page < ApplicationRecord
  belongs_to :document
  has_many :checkboxes, dependent: :destroy

  accepts_nested_attributes_for :checkboxes
end
