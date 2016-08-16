class ActivitySerializer < ActiveModel::Serializer
  attributes :id, :name, :description,
      :activity_at, :pin, :duration_secs, 
      :created_at

  has_many :children
  belongs_to :parent

  has_many :next_links
  has_many :previous_links

end
