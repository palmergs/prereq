class AddStatusFlagToActivity < ActiveRecord::Migration
  def change
    add_column :activities, :status, :string, limit: 24, null: false, default: 'new'
    add_column :activities, :completed, :boolean, null: false, default: false
    add_index :activities, :completed
    add_index :activities, :status
  end
end
