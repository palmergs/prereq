class Activity < ActiveRecord::Base
  has_many :previous_links,
      class_name: 'Link', 
      counter_cache: 'previous_links_count',
      primary_key: :id,
      foreign_key: :next_activity_id

  has_many :previous_activities, 
      class_name: 'Activity', 
      through: :previous_links 

  has_many :next_links, 
      class_name: 'Link', 
      counter_cache: 'next_links_count',
      primary_key: :id,
      foreign_key: :previous_activity_id

  has_many :next_activities, 
      class_name: 'Activity', 
      through: :next_links

  validates :name, presence: true

  scope :no_previous_links, -> {
    where(previous_links_count: 0)    
  }

  scope :no_next_links, -> {
    where(next_links_count: 0)
  }

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
