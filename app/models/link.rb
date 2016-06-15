class Link < ActiveRecord::Base

  belongs_to :next_activity, 
      class_name: 'Activity', 
      counter_cache: 'previous_links_count',
      primary_key: :id, 
      foreign_key: :next_activity_id

  belongs_to :previous_activity, 
      class_name: 'Activity', 
      counter_cache: 'next_links_count',
      primary_key: :id, 
      foreign_key: :previous_activity_id

  validates :previous_activity, :next_activity, presence: true
  validates :next_activity, uniqueness: { scope: :previous_activity } 
  validate :no_cyclical_dependencies

  def no_cyclical_dependencies
    intersection = previous_activities & next_activities
    if intersection.present?
      errors.add(:next_activity, "A cyclical graph was detected.")
    end
  end

  def previous_activities
    previous_activity.all_previous_activities + [ previous_activity ]
  end

  def next_activities
    next_activity.all_next_activities + [ next_activity ]
  end
end
