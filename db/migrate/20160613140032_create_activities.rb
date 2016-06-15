class CreateActivities < ActiveRecord::Migration
  def change
    create_table :activities do |t|
      t.string :name, null: false
      t.text :description, null: false, default: ''
      t.integer :parent_id, index: true

      t.timestamps null: false
    end
  end
end
