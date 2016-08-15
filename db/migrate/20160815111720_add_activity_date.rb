class AddActivityDate < ActiveRecord::Migration
  def change
    add_column :activities, :activity_at, :datetime
    add_column :activities, :pin, :integer, default: 0, null: false 
    add_column :activities, :duration_secs, :integer

    add_index :activities, :activity_at
    add_index :activities, :duration_secs
  end
end
