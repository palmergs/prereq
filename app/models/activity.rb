class Activity < ActiveRecord::Base
  include Concerns::IsScopedByLike

  NEW_ACTIVITY = 'new'
  WORKING = 'working'
  REVIEWING = 'reviewing'
  COMPLETED = 'complete'
  CANCELED = 'canceled'
  ON_HOLD = 'on hold'
  ALL_STATUS = [ NEW_ACTIVITY, WORKING, REVIEWING, COMPLETED, CANCELED, ON_HOLD ]

  PIN_START = -1
  PIN_UNDEFINED = 0
  PIN_END = 1

  has_many :previous_links,
      class_name: 'Link',
      counter_cache: 'previous_links_count',
      primary_key: :id,
      foreign_key: :next_activity_id,
      dependent: :destroy

  has_many :previous_activities,
      class_name: 'Activity',
      through: :previous_links

  has_many :next_links,
      class_name: 'Link',
      counter_cache: 'next_links_count',
      primary_key: :id,
      foreign_key: :previous_activity_id,
      dependent: :destroy

  has_many :next_activities,
      class_name: 'Activity',
      through: :next_links

  belongs_to :parent, class_name: 'Activity',
      primary_key: :id,
      counter_cache: 'child_count',
      foreign_key: :parent_id,
      inverse_of: :children

  has_many :children, class_name: 'Activity',
      primary_key: :id,
      counter_cache: 'child_count',
      foreign_key: :parent_id,
      inverse_of: :parent

  validates :name, presence: true

  scope :no_previous_links, -> {
    where(previous_links_count: 0)
  }

  scope :no_next_links, -> {
    where(next_links_count: 0)
  }

  scope :exclude_activity, ->(id) {
    if id.present?
      id = Array(id).map(&:to_i)
      where('activities.id not in (?)', id)
    end
  }

  scope :by_search, ->(q) {
    if q.present?
      where('activities.name ilike ?', "%#{ sanitize_for_like(q) }%")
    end
  }

  scope :ordered_by_match_length, ->(asc) {
    if ['asc', 'desc'].include?(asc.to_s.downcase)
      select('activities.*, char_length(activities.name) as name_length').order("name_length #{ asc.to_s }")
    end
  }

  before_create do
    self.status = NEW_ACTIVITY
  end

  before_save do
    self.description = "" if description.nil?
    self.status = WORKING unless ALL_STATUS.include?(status)
  end

  before_destroy do
    Activity.where(parent_id: self.id).update_all(parent_id: nil)
  end

  # Event Time methods
  def days
    return nil unless duration_secs
    hours / 24
  end

  def hours
    return nil unless duration_secs
    minutes / 60
  end

  def minutes
    return nil unless duration_secs
    duration_secs / 60
  end

  def seconds
    return nil unless duration_secs
    duration_secs
  end

  def start_at
    return nil unless activity_at

    if pin == PIN_START
      activity_at
    elsif pin == PIN_END && duration_secs
      activity_at - duration_secs.seconds
    else
      nil
    end
  end

  def end_at
    return nil unless activity_at
    if pin == PIN_END
      activity_at
    elsif pin == PIN_START && duration_secs
      activity_at + duration_secs.seconds
    else
      nil
    end
  end

  # Graph methods

  def all_next_activities
    next_activities.inject(Set.new) do |set, a|
      set + [ a ] + a.all_next_activities
    end
  end

  def all_previous_activities
    previous_activities.inject(Set.new) do |set, a|
      set + [ a ] + a.all_previous_activities
    end
  end

  def previous_completed?
    return true if previous_activities.empty?

    previous_activities.all? do |a|
      a.completed?
    end
  end

  def children_completed?
    return true if children.empty?

    children.all? do |c|
      c.completed?
    end
  end

  def self.kahn_algorithm left_edges
    list = []
    seen = Set.new
    set = left_edges.to_set
    while set.present?
      a = set.first and set.delete(a)
      list << a
      a.next_links.each do |link|
        b = link.next_activity
        links = b.previous_links.to_set - seen
        set << b if links.count == 1
        seen << link
      end
    end
    list
  end

end
