class CreateLinks < ActiveRecord::Migration
  def change
    create_table :links do |t|
      t.integer :previous_activity_id, null: false, index: true
      t.integer :next_activity_id, null: false, index: true
      t.text :description, null: false, default: ''

      t.timestamps null: false
    end
  end
end
