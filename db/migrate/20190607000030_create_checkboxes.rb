class CreateCheckboxes < ActiveRecord::Migration[5.1]
  def change
    create_table :checkboxes do |t|
      t.integer :checkbox_number
      t.integer :page_number
      t.boolean :checked
      t.references :page, foreign_key: true, null: false
    end
  end
end
