class AddCounterCacheToActivities < ActiveRecord::Migration
  def change
    add_column :activities, :previous_links_count, :integer, default: 0, null: false
    add_column :activities, :next_links_count, :integer, default: 0, null: false
    add_index :activities, :previous_links_count
    add_index :activities, :next_links_count
  end
end
