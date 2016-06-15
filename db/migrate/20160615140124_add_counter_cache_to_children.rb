class AddCounterCacheToChildren < ActiveRecord::Migration
  def change
    add_column :activities, :child_count, :integer, default: 0, null: false
    add_index :activities, :child_count
  end
end
