class CreatePages < ActiveRecord::Migration[5.1]
  def change
    create_table :pages do |t|
      t.integer :page_number
      t.references :document, foreign_key: true, null: false
    end
  end
end
