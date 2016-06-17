class LinkSerializer < ActiveModel::Serializer
  attributes :id, :description, :created_at

  belongs_to :next_activity
  belongs_to :previous_activity
end
