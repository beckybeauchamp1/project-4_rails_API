class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.string :title, unique: true, null: false
      t.references :event, index: true, foreign_key: true
      t.timestamps null: false
    end
  end
end
