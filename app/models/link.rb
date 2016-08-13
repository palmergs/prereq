class Link < ActiveRecord::Base

  belongs_to :next_activity,
      class_name: 'Activity',
      counter_cache: 'previous_links_count',
      inverse_of: :previous_links,
      primary_key: :id,
      foreign_key: :next_activity_id

  belongs_to :previous_activity,
      class_name: 'Activity',
      counter_cache: 'next_links_count',
      inverse_of: :next_links,
      primary_key: :id,
      foreign_key: :previous_activity_id

  validates :previous_activity, :next_activity, presence: true
  validates :next_activity, uniqueness: { scope: :previous_activity }
  validate :no_cyclical_dependencies

  before_save do
    self.description = "" if self.description.nil?
  end

  def no_cyclical_dependencies
    intersection = previous_activities & next_activities
    if intersection.present?
      errors.add(:next_activity, "A cyclical graph was detected.")
    end
  end

  def previous_activities
    if previous_activity
      previous_activity.all_previous_activities + [ previous_activity ]
    else
      Set.new
    end
  end

  def next_activities
    if next_activity
      next_activity.all_next_activities + [ next_activity ]
    else
      Set.new
    end
  end
end
